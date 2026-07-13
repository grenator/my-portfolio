from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request, Response
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import logging
import requests
from pathlib import Path
from pydantic import BaseModel
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta

from seed_data import SEED_POSTS, SEED_PROJECTS

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

EMERGENT_SESSION_URL = "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data"


# ---------------- Models ----------------
class User(BaseModel):
    user_id: str
    email: str
    name: str
    picture: Optional[str] = None
    is_owner: bool = False


class LinkItem(BaseModel):
    label: str
    url: str


class PostBase(BaseModel):
    title: str
    excerpt: str = ""
    body: str = ""
    tag: str = "General"
    color: str = "#4a86f0"
    read_time: str = "3 min"
    date: Optional[str] = None


class Post(PostBase):
    id: str
    slug: str
    created_at: datetime
    updated_at: datetime


class ProjectBase(BaseModel):
    title: str
    description: str = ""
    tech: List[str] = []
    color: str = "#4a86f0"
    date: str = ""
    links: List[LinkItem] = []
    featured: bool = False


class Project(ProjectBase):
    id: str


# ---------------- Helpers ----------------
def now_utc():
    return datetime.now(timezone.utc)


def slugify(title: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")
    return s or uuid.uuid4().hex[:8]


async def get_session_token(request: Request) -> Optional[str]:
    token = request.cookies.get("session_token")
    if token:
        return token
    auth = request.headers.get("Authorization")
    if auth and auth.startswith("Bearer "):
        return auth.split(" ", 1)[1]
    return None


async def get_current_user(request: Request) -> Optional[User]:
    token = await get_session_token(request)
    if not token:
        return None
    session = await db.user_sessions.find_one({"session_token": token}, {"_id": 0})
    if not session:
        return None
    expires_at = session["expires_at"]
    if isinstance(expires_at, str):
        expires_at = datetime.fromisoformat(expires_at)
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    if expires_at < now_utc():
        return None
    user_doc = await db.users.find_one({"user_id": session["user_id"]}, {"_id": 0})
    if not user_doc:
        return None
    return User(**user_doc)


async def require_owner(request: Request) -> User:
    user = await get_current_user(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    if not user.is_owner:
        raise HTTPException(status_code=403, detail="Owner access required")
    return user


# ---------------- Auth Routes ----------------
class SessionRequest(BaseModel):
    session_id: str


@api_router.post("/auth/session")
async def process_session(payload: SessionRequest, response: Response):
    try:
        resp = requests.get(
            EMERGENT_SESSION_URL,
            headers={"X-Session-ID": payload.session_id},
            timeout=15,
        )
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Auth service error: {e}")

    if resp.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid session")

    data = resp.json()
    email = data.get("email")
    name = data.get("name") or email
    picture = data.get("picture")
    session_token = data.get("session_token")
    if not email or not session_token:
        raise HTTPException(status_code=502, detail="Incomplete auth data")

    existing = await db.users.find_one({"email": email}, {"_id": 0})
    if existing:
        user_id = existing["user_id"]
        is_owner = existing.get("is_owner", False)
        await db.users.update_one(
            {"user_id": user_id},
            {"$set": {"name": name, "picture": picture}},
        )
    else:
        user_id = f"user_{uuid.uuid4().hex[:12]}"
        # First user to ever sign in becomes the site owner
        total_users = await db.users.count_documents({})
        is_owner = total_users == 0
        await db.users.insert_one({
            "user_id": user_id,
            "email": email,
            "name": name,
            "picture": picture,
            "is_owner": is_owner,
            "created_at": now_utc(),
        })

    expires_at = now_utc() + timedelta(days=7)
    await db.user_sessions.insert_one({
        "user_id": user_id,
        "session_token": session_token,
        "expires_at": expires_at,
        "created_at": now_utc(),
    })

    response.set_cookie(
        key="session_token",
        value=session_token,
        httponly=True,
        secure=True,
        samesite="none",
        path="/",
        max_age=7 * 24 * 60 * 60,
    )

    return {"user_id": user_id, "email": email, "name": name, "picture": picture, "is_owner": is_owner}


@api_router.get("/auth/me", response_model=User)
async def auth_me(request: Request):
    user = await get_current_user(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return user


@api_router.post("/auth/logout")
async def logout(request: Request, response: Response):
    token = await get_session_token(request)
    if token:
        await db.user_sessions.delete_one({"session_token": token})
    response.delete_cookie("session_token", path="/", samesite="none", secure=True)
    return {"ok": True}


# ---------------- Blog Routes ----------------
@api_router.get("/posts", response_model=List[Post])
async def list_posts():
    posts = await db.posts.find({}, {"_id": 0}).sort("date", -1).to_list(500)
    return [Post(**p) for p in posts]


@api_router.get("/posts/{slug}", response_model=Post)
async def get_post(slug: str):
    post = await db.posts.find_one({"slug": slug}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return Post(**post)


@api_router.post("/posts", response_model=Post)
async def create_post(payload: PostBase, owner: User = Depends(require_owner)):
    pid = uuid.uuid4().hex
    base_slug = slugify(payload.title)
    slug = base_slug
    i = 1
    while await db.posts.find_one({"slug": slug}):
        slug = f"{base_slug}-{i}"
        i += 1
    doc = payload.dict()
    doc["date"] = doc.get("date") or now_utc().strftime("%Y-%m-%d")
    doc.update({"id": pid, "slug": slug, "created_at": now_utc(), "updated_at": now_utc()})
    await db.posts.insert_one(doc)
    doc.pop("_id", None)
    return Post(**doc)


@api_router.put("/posts/{pid}", response_model=Post)
async def update_post(pid: str, payload: PostBase, owner: User = Depends(require_owner)):
    existing = await db.posts.find_one({"id": pid}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Post not found")
    update = payload.dict()
    update["date"] = update.get("date") or existing.get("date")
    update["updated_at"] = now_utc()
    await db.posts.update_one({"id": pid}, {"$set": update})
    merged = {**existing, **update}
    return Post(**merged)


@api_router.delete("/posts/{pid}")
async def delete_post(pid: str, owner: User = Depends(require_owner)):
    res = await db.posts.delete_one({"id": pid})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"ok": True}


# ---------------- Project Routes ----------------
@api_router.get("/projects", response_model=List[Project])
async def list_projects():
    projects = await db.projects.find({}, {"_id": 0}).to_list(500)
    return [Project(**p) for p in projects]


@api_router.post("/projects", response_model=Project)
async def create_project(payload: ProjectBase, owner: User = Depends(require_owner)):
    pid = uuid.uuid4().hex
    doc = payload.dict()
    doc["id"] = pid
    await db.projects.insert_one(doc)
    doc.pop("_id", None)
    return Project(**doc)


@api_router.put("/projects/{pid}", response_model=Project)
async def update_project(pid: str, payload: ProjectBase, owner: User = Depends(require_owner)):
    existing = await db.projects.find_one({"id": pid}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Project not found")
    update = payload.dict()
    await db.projects.update_one({"id": pid}, {"$set": update})
    return Project(**{**existing, **update, "id": pid})


@api_router.delete("/projects/{pid}")
async def delete_project(pid: str, owner: User = Depends(require_owner)):
    res = await db.projects.delete_one({"id": pid})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"ok": True}


# ---------------- Seed ----------------
@app.on_event("startup")
async def seed_db():
    if await db.posts.count_documents({}) == 0:
        for p in SEED_POSTS:
            doc = dict(p)
            doc["id"] = uuid.uuid4().hex
            doc["created_at"] = now_utc()
            doc["updated_at"] = now_utc()
            await db.posts.insert_one(doc)
        logging.info("Seeded blog posts")
    if await db.projects.count_documents({}) == 0:
        for p in SEED_PROJECTS:
            doc = dict(p)
            doc["id"] = uuid.uuid4().hex
            await db.projects.insert_one(doc)
        logging.info("Seeded projects")


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origin_regex=".*",
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
