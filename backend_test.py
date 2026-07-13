#!/usr/bin/env python3
"""
Backend API Testing for Developer Portfolio App
Tests Emergent Google Auth and owner-only CRUD operations
"""

import requests
import json
import subprocess
import time
from datetime import datetime

# Load backend URL from frontend/.env
BASE_URL = "https://dev-portfolio-hub-200.preview.emergentagent.com"
API_BASE = f"{BASE_URL}/api"

# Test results tracking
test_results = {
    "passed": [],
    "failed": [],
    "warnings": []
}

def log_pass(test_name):
    print(f"✅ PASS: {test_name}")
    test_results["passed"].append(test_name)

def log_fail(test_name, reason):
    print(f"❌ FAIL: {test_name}")
    print(f"   Reason: {reason}")
    test_results["failed"].append(f"{test_name}: {reason}")

def log_warning(test_name, reason):
    print(f"⚠️  WARNING: {test_name}")
    print(f"   Reason: {reason}")
    test_results["warnings"].append(f"{test_name}: {reason}")

def create_test_user(is_owner=True):
    """Create a test user and session in MongoDB"""
    timestamp = int(time.time() * 1000)
    user_id = f"test-user-{timestamp}"
    session_token = f"test_session_{timestamp}"
    email = f"test.user.{timestamp}@example.com"
    
    mongo_script = f"""
use('test_database');
var userId = '{user_id}';
var sessionToken = '{session_token}';
db.users.insertOne({{
  user_id: userId,
  email: '{email}',
  name: 'Test Owner User',
  picture: 'https://via.placeholder.com/150',
  is_owner: {str(is_owner).lower()},
  created_at: new Date()
}});
db.user_sessions.insertOne({{
  user_id: userId,
  session_token: sessionToken,
  expires_at: new Date(Date.now() + 7*24*60*60*1000),
  created_at: new Date()
}});
print('Created user: ' + userId);
print('Session token: ' + sessionToken);
"""
    
    try:
        result = subprocess.run(
            ["mongosh", "--quiet", "--eval", mongo_script],
            capture_output=True,
            text=True,
            timeout=10
        )
        if result.returncode == 0:
            print(f"✓ Created test user: {user_id} (is_owner={is_owner})")
            print(f"✓ Session token: {session_token}")
            return user_id, session_token, email
        else:
            print(f"✗ Failed to create test user: {result.stderr}")
            return None, None, None
    except Exception as e:
        print(f"✗ Error creating test user: {e}")
        return None, None, None

def cleanup_test_user(user_id):
    """Remove test user and session from MongoDB"""
    if not user_id:
        return
    
    mongo_script = f"""
use('test_database');
db.users.deleteOne({{ user_id: '{user_id}' }});
db.user_sessions.deleteMany({{ user_id: '{user_id}' }});
print('Cleaned up user: {user_id}');
"""
    
    try:
        subprocess.run(
            ["mongosh", "--quiet", "--eval", mongo_script],
            capture_output=True,
            text=True,
            timeout=10
        )
        print(f"✓ Cleaned up test user: {user_id}")
    except Exception as e:
        print(f"✗ Error cleaning up test user: {e}")

def cleanup_test_post(post_id):
    """Remove test post from MongoDB"""
    if not post_id:
        return
    
    mongo_script = f"""
use('test_database');
db.posts.deleteOne({{ id: '{post_id}' }});
print('Cleaned up post: {post_id}');
"""
    
    try:
        subprocess.run(
            ["mongosh", "--quiet", "--eval", mongo_script],
            capture_output=True,
            text=True,
            timeout=10
        )
        print(f"✓ Cleaned up test post: {post_id}")
    except Exception as e:
        print(f"✗ Error cleaning up test post: {e}")

def cleanup_test_project(project_id):
    """Remove test project from MongoDB"""
    if not project_id:
        return
    
    mongo_script = f"""
use('test_database');
db.projects.deleteOne({{ id: '{project_id}' }});
print('Cleaned up project: {project_id}');
"""
    
    try:
        subprocess.run(
            ["mongosh", "--quiet", "--eval", mongo_script],
            capture_output=True,
            text=True,
            timeout=10
        )
        print(f"✓ Cleaned up test project: {project_id}")
    except Exception as e:
        print(f"✗ Error cleaning up test project: {e}")

print("="*80)
print("BACKEND API TESTING - Developer Portfolio App")
print("="*80)
print(f"Base URL: {BASE_URL}")
print(f"API Base: {API_BASE}")
print()

# ============================================================================
# TEST 1: PUBLIC ENDPOINTS (no auth required)
# ============================================================================
print("\n" + "="*80)
print("TEST 1: PUBLIC ENDPOINTS (No Authentication)")
print("="*80)

# Test 1.1: GET /api/posts
print("\n[1.1] Testing GET /api/posts (should return seeded posts)")
try:
    response = requests.get(f"{API_BASE}/posts", timeout=10)
    if response.status_code == 200:
        posts = response.json()
        if isinstance(posts, list) and len(posts) >= 4:
            log_pass(f"GET /api/posts returns {len(posts)} posts")
            # Verify structure
            if posts and all(key in posts[0] for key in ['id', 'slug', 'title', 'body']):
                log_pass("Posts have correct structure (id, slug, title, body)")
            else:
                log_fail("Posts structure", "Missing required fields")
        else:
            log_fail("GET /api/posts", f"Expected at least 4 posts, got {len(posts) if isinstance(posts, list) else 'non-list'}")
    else:
        log_fail("GET /api/posts", f"Expected 200, got {response.status_code}: {response.text}")
except Exception as e:
    log_fail("GET /api/posts", f"Request failed: {e}")

# Test 1.2: GET /api/posts/{slug}
print("\n[1.2] Testing GET /api/posts/realtime-dashboards (specific post by slug)")
try:
    response = requests.get(f"{API_BASE}/posts/realtime-dashboards", timeout=10)
    if response.status_code == 200:
        post = response.json()
        if post.get('slug') == 'realtime-dashboards' and 'body' in post:
            log_pass("GET /api/posts/{slug} returns correct post with markdown body")
        else:
            log_fail("GET /api/posts/{slug}", "Post missing slug or body field")
    else:
        log_fail("GET /api/posts/{slug}", f"Expected 200, got {response.status_code}: {response.text}")
except Exception as e:
    log_fail("GET /api/posts/{slug}", f"Request failed: {e}")

# Test 1.3: GET /api/projects
print("\n[1.3] Testing GET /api/projects (should return seeded projects)")
try:
    response = requests.get(f"{API_BASE}/projects", timeout=10)
    if response.status_code == 200:
        projects = response.json()
        if isinstance(projects, list) and len(projects) >= 14:
            log_pass(f"GET /api/projects returns {len(projects)} projects")
            # Verify structure
            if projects and all(key in projects[0] for key in ['id', 'title', 'description']):
                log_pass("Projects have correct structure (id, title, description)")
            else:
                log_fail("Projects structure", "Missing required fields")
        else:
            log_fail("GET /api/projects", f"Expected at least 14 projects, got {len(projects) if isinstance(projects, list) else 'non-list'}")
    else:
        log_fail("GET /api/projects", f"Expected 200, got {response.status_code}: {response.text}")
except Exception as e:
    log_fail("GET /api/projects", f"Request failed: {e}")

# ============================================================================
# TEST 2: AUTH PROTECTION (401 without token)
# ============================================================================
print("\n" + "="*80)
print("TEST 2: AUTH PROTECTION (Must return 401 without token)")
print("="*80)

# Test 2.1: GET /api/auth/me without token
print("\n[2.1] Testing GET /api/auth/me without token (should return 401)")
try:
    response = requests.get(f"{API_BASE}/auth/me", timeout=10)
    if response.status_code == 401:
        log_pass("GET /api/auth/me returns 401 without token")
    else:
        log_fail("GET /api/auth/me", f"Expected 401, got {response.status_code}")
except Exception as e:
    log_fail("GET /api/auth/me", f"Request failed: {e}")

# Test 2.2: POST /api/posts without token
print("\n[2.2] Testing POST /api/posts without token (should return 401)")
try:
    payload = {
        "title": "Test Post",
        "excerpt": "Test excerpt",
        "body": "# Test body",
        "tag": "Engineering"
    }
    response = requests.post(f"{API_BASE}/posts", json=payload, timeout=10)
    if response.status_code == 401:
        log_pass("POST /api/posts returns 401 without token")
    else:
        log_fail("POST /api/posts", f"Expected 401, got {response.status_code}")
except Exception as e:
    log_fail("POST /api/posts", f"Request failed: {e}")

# Test 2.3: PUT /api/posts/{id} without token
print("\n[2.3] Testing PUT /api/posts/dummy-id without token (should return 401)")
try:
    payload = {"title": "Updated", "excerpt": "Updated", "body": "Updated"}
    response = requests.put(f"{API_BASE}/posts/dummy-id", json=payload, timeout=10)
    if response.status_code == 401:
        log_pass("PUT /api/posts/{id} returns 401 without token")
    else:
        log_fail("PUT /api/posts/{id}", f"Expected 401, got {response.status_code}")
except Exception as e:
    log_fail("PUT /api/posts/{id}", f"Request failed: {e}")

# Test 2.4: DELETE /api/posts/{id} without token
print("\n[2.4] Testing DELETE /api/posts/dummy-id without token (should return 401)")
try:
    response = requests.delete(f"{API_BASE}/posts/dummy-id", timeout=10)
    if response.status_code == 401:
        log_pass("DELETE /api/posts/{id} returns 401 without token")
    else:
        log_fail("DELETE /api/posts/{id}", f"Expected 401, got {response.status_code}")
except Exception as e:
    log_fail("DELETE /api/posts/{id}", f"Request failed: {e}")

# Test 2.5: POST /api/projects without token
print("\n[2.5] Testing POST /api/projects without token (should return 401)")
try:
    payload = {
        "title": "Test Project",
        "description": "Test description",
        "tech": ["Python"],
        "color": "#4a86f0"
    }
    response = requests.post(f"{API_BASE}/projects", json=payload, timeout=10)
    if response.status_code == 401:
        log_pass("POST /api/projects returns 401 without token")
    else:
        log_fail("POST /api/projects", f"Expected 401, got {response.status_code}")
except Exception as e:
    log_fail("POST /api/projects", f"Request failed: {e}")

# Test 2.6: PUT /api/projects/{id} without token
print("\n[2.6] Testing PUT /api/projects/dummy-id without token (should return 401)")
try:
    payload = {"title": "Updated", "description": "Updated"}
    response = requests.put(f"{API_BASE}/projects/dummy-id", json=payload, timeout=10)
    if response.status_code == 401:
        log_pass("PUT /api/projects/{id} returns 401 without token")
    else:
        log_fail("PUT /api/projects/{id}", f"Expected 401, got {response.status_code}")
except Exception as e:
    log_fail("PUT /api/projects/{id}", f"Request failed: {e}")

# Test 2.7: DELETE /api/projects/{id} without token
print("\n[2.7] Testing DELETE /api/projects/dummy-id without token (should return 401)")
try:
    response = requests.delete(f"{API_BASE}/projects/dummy-id", timeout=10)
    if response.status_code == 401:
        log_pass("DELETE /api/projects/{id} returns 401 without token")
    else:
        log_fail("DELETE /api/projects/{id}", f"Expected 401, got {response.status_code}")
except Exception as e:
    log_fail("DELETE /api/projects/{id}", f"Request failed: {e}")

# ============================================================================
# TEST 3: OWNER CRUD WITH VALID SESSION
# ============================================================================
print("\n" + "="*80)
print("TEST 3: OWNER CRUD WITH VALID SESSION")
print("="*80)

# Create test owner user
print("\n[3.0] Creating test owner user in MongoDB...")
owner_user_id, owner_token, owner_email = create_test_user(is_owner=True)

if not owner_token:
    log_fail("Test setup", "Failed to create owner test user")
else:
    headers = {"Authorization": f"Bearer {owner_token}"}
    
    # Test 3.1: GET /api/auth/me with valid token
    print("\n[3.1] Testing GET /api/auth/me with valid owner token")
    try:
        response = requests.get(f"{API_BASE}/auth/me", headers=headers, timeout=10)
        if response.status_code == 200:
            user = response.json()
            if user.get('is_owner') == True and user.get('user_id') == owner_user_id:
                log_pass("GET /api/auth/me returns owner user with is_owner=true")
            else:
                log_fail("GET /api/auth/me", f"User data incorrect: is_owner={user.get('is_owner')}, user_id={user.get('user_id')}")
        else:
            log_fail("GET /api/auth/me", f"Expected 200, got {response.status_code}: {response.text}")
    except Exception as e:
        log_fail("GET /api/auth/me", f"Request failed: {e}")
    
    # Test 3.2: POST /api/posts (create with auto-slug)
    print("\n[3.2] Testing POST /api/posts (create with auto-generated slug)")
    created_post_id = None
    created_post_slug = None
    try:
        payload = {
            "title": "My Amazing Test Post About FastAPI Development",
            "excerpt": "This is a comprehensive test of the blog post creation endpoint",
            "body": "# Introduction\n\nThis is a **markdown** test post.\n\n## Features\n\n- Auto slug generation\n- Markdown support\n- Owner-only access",
            "tag": "Testing"
        }
        response = requests.post(f"{API_BASE}/posts", json=payload, headers=headers, timeout=10)
        if response.status_code == 200:
            post = response.json()
            created_post_id = post.get('id')
            created_post_slug = post.get('slug')
            if created_post_id and created_post_slug:
                log_pass(f"POST /api/posts creates post with id={created_post_id}, slug={created_post_slug}")
                # Verify slug is auto-generated from title
                if 'amazing' in created_post_slug or 'test' in created_post_slug:
                    log_pass("Slug auto-generated from title")
                else:
                    log_warning("Slug generation", f"Slug '{created_post_slug}' doesn't seem to match title")
            else:
                log_fail("POST /api/posts", "Response missing id or slug")
        else:
            log_fail("POST /api/posts", f"Expected 200, got {response.status_code}: {response.text}")
    except Exception as e:
        log_fail("POST /api/posts", f"Request failed: {e}")
    
    # Test 3.3: GET /api/posts/{slug} for newly created post
    if created_post_slug:
        print(f"\n[3.3] Testing GET /api/posts/{created_post_slug} (newly created post)")
        try:
            response = requests.get(f"{API_BASE}/posts/{created_post_slug}", timeout=10)
            if response.status_code == 200:
                post = response.json()
                if post.get('slug') == created_post_slug and post.get('id') == created_post_id:
                    log_pass(f"GET /api/posts/{created_post_slug} returns newly created post")
                else:
                    log_fail("GET /api/posts/{slug}", "Post data doesn't match created post")
            else:
                log_fail("GET /api/posts/{slug}", f"Expected 200, got {response.status_code}: {response.text}")
        except Exception as e:
            log_fail("GET /api/posts/{slug}", f"Request failed: {e}")
    
    # Test 3.4: PUT /api/posts/{id} (update)
    if created_post_id:
        print(f"\n[3.4] Testing PUT /api/posts/{created_post_id} (update post)")
        try:
            payload = {
                "title": "Updated Test Post Title",
                "excerpt": "Updated excerpt",
                "body": "# Updated\n\nThis post has been **updated**.",
                "tag": "Updated"
            }
            response = requests.put(f"{API_BASE}/posts/{created_post_id}", json=payload, headers=headers, timeout=10)
            if response.status_code == 200:
                post = response.json()
                if post.get('title') == "Updated Test Post Title":
                    log_pass(f"PUT /api/posts/{created_post_id} updates post successfully")
                else:
                    log_fail("PUT /api/posts/{id}", f"Title not updated: {post.get('title')}")
            else:
                log_fail("PUT /api/posts/{id}", f"Expected 200, got {response.status_code}: {response.text}")
        except Exception as e:
            log_fail("PUT /api/posts/{id}", f"Request failed: {e}")
    
    # Test 3.5: DELETE /api/posts/{id}
    if created_post_id:
        print(f"\n[3.5] Testing DELETE /api/posts/{created_post_id}")
        try:
            response = requests.delete(f"{API_BASE}/posts/{created_post_id}", headers=headers, timeout=10)
            if response.status_code == 200:
                log_pass(f"DELETE /api/posts/{created_post_id} deletes post successfully")
                
                # Verify post is deleted (GET should return 404)
                print(f"[3.5b] Verifying post is deleted (GET should return 404)")
                response = requests.get(f"{API_BASE}/posts/{created_post_slug}", timeout=10)
                if response.status_code == 404:
                    log_pass(f"GET /api/posts/{created_post_slug} returns 404 after deletion")
                else:
                    log_fail("Post deletion verification", f"Expected 404, got {response.status_code}")
            else:
                log_fail("DELETE /api/posts/{id}", f"Expected 200, got {response.status_code}: {response.text}")
        except Exception as e:
            log_fail("DELETE /api/posts/{id}", f"Request failed: {e}")
    
    # Test 3.6: POST /api/projects (create)
    print("\n[3.6] Testing POST /api/projects (create project)")
    created_project_id = None
    try:
        payload = {
            "title": "Test Project - Portfolio Backend",
            "description": "A comprehensive test of the project creation endpoint with FastAPI",
            "tech": ["Python", "FastAPI", "MongoDB", "Docker"],
            "color": "#4a86f0",
            "date": "2024",
            "links": [
                {"label": "GitHub", "url": "https://github.com/test/project"},
                {"label": "Live Demo", "url": "https://test.example.com"}
            ],
            "featured": True
        }
        response = requests.post(f"{API_BASE}/projects", json=payload, headers=headers, timeout=10)
        if response.status_code == 200:
            project = response.json()
            created_project_id = project.get('id')
            if created_project_id and project.get('title') == payload['title']:
                log_pass(f"POST /api/projects creates project with id={created_project_id}")
            else:
                log_fail("POST /api/projects", "Response missing id or title mismatch")
        else:
            log_fail("POST /api/projects", f"Expected 200, got {response.status_code}: {response.text}")
    except Exception as e:
        log_fail("POST /api/projects", f"Request failed: {e}")
    
    # Test 3.7: PUT /api/projects/{id} (update)
    if created_project_id:
        print(f"\n[3.7] Testing PUT /api/projects/{created_project_id} (update project)")
        try:
            payload = {
                "title": "Updated Test Project",
                "description": "This project has been updated",
                "tech": ["Python", "FastAPI", "PostgreSQL"],
                "color": "#a855f7",
                "featured": False
            }
            response = requests.put(f"{API_BASE}/projects/{created_project_id}", json=payload, headers=headers, timeout=10)
            if response.status_code == 200:
                project = response.json()
                if project.get('title') == "Updated Test Project":
                    log_pass(f"PUT /api/projects/{created_project_id} updates project successfully")
                else:
                    log_fail("PUT /api/projects/{id}", f"Title not updated: {project.get('title')}")
            else:
                log_fail("PUT /api/projects/{id}", f"Expected 200, got {response.status_code}: {response.text}")
        except Exception as e:
            log_fail("PUT /api/projects/{id}", f"Request failed: {e}")
    
    # Test 3.8: DELETE /api/projects/{id}
    if created_project_id:
        print(f"\n[3.8] Testing DELETE /api/projects/{created_project_id}")
        try:
            response = requests.delete(f"{API_BASE}/projects/{created_project_id}", headers=headers, timeout=10)
            if response.status_code == 200:
                log_pass(f"DELETE /api/projects/{created_project_id} deletes project successfully")
                
                # Verify project is deleted (should not appear in list)
                print(f"[3.8b] Verifying project is deleted")
                response = requests.get(f"{API_BASE}/projects", timeout=10)
                if response.status_code == 200:
                    projects = response.json()
                    if not any(p.get('id') == created_project_id for p in projects):
                        log_pass("Project no longer appears in GET /api/projects after deletion")
                    else:
                        log_fail("Project deletion verification", "Project still appears in list")
            else:
                log_fail("DELETE /api/projects/{id}", f"Expected 200, got {response.status_code}: {response.text}")
        except Exception as e:
            log_fail("DELETE /api/projects/{id}", f"Request failed: {e}")
    
    # Cleanup owner user
    print("\n[3.9] Cleaning up test owner user...")
    cleanup_test_user(owner_user_id)

# ============================================================================
# TEST 4: NON-OWNER RESTRICTION (403)
# ============================================================================
print("\n" + "="*80)
print("TEST 4: NON-OWNER RESTRICTION (Must return 403)")
print("="*80)

# Create test non-owner user
print("\n[4.0] Creating test non-owner user in MongoDB...")
non_owner_user_id, non_owner_token, non_owner_email = create_test_user(is_owner=False)

if not non_owner_token:
    log_warning("Test 4", "Failed to create non-owner test user - skipping non-owner restriction tests")
else:
    headers = {"Authorization": f"Bearer {non_owner_token}"}
    
    # Test 4.1: GET /api/auth/me with non-owner token
    print("\n[4.1] Testing GET /api/auth/me with non-owner token")
    try:
        response = requests.get(f"{API_BASE}/auth/me", headers=headers, timeout=10)
        if response.status_code == 200:
            user = response.json()
            if user.get('is_owner') == False:
                log_pass("GET /api/auth/me returns non-owner user with is_owner=false")
            else:
                log_fail("GET /api/auth/me", f"Expected is_owner=false, got {user.get('is_owner')}")
        else:
            log_fail("GET /api/auth/me", f"Expected 200, got {response.status_code}: {response.text}")
    except Exception as e:
        log_fail("GET /api/auth/me", f"Request failed: {e}")
    
    # Test 4.2: POST /api/posts with non-owner token (should return 403)
    print("\n[4.2] Testing POST /api/posts with non-owner token (should return 403)")
    try:
        payload = {
            "title": "Non-owner Test Post",
            "excerpt": "This should fail",
            "body": "# Should not work",
            "tag": "Test"
        }
        response = requests.post(f"{API_BASE}/posts", json=payload, headers=headers, timeout=10)
        if response.status_code == 403:
            log_pass("POST /api/posts returns 403 for non-owner user")
        else:
            log_fail("POST /api/posts non-owner", f"Expected 403, got {response.status_code}: {response.text}")
    except Exception as e:
        log_fail("POST /api/posts non-owner", f"Request failed: {e}")
    
    # Test 4.3: POST /api/projects with non-owner token (should return 403)
    print("\n[4.3] Testing POST /api/projects with non-owner token (should return 403)")
    try:
        payload = {
            "title": "Non-owner Test Project",
            "description": "This should fail",
            "tech": ["Python"]
        }
        response = requests.post(f"{API_BASE}/projects", json=payload, headers=headers, timeout=10)
        if response.status_code == 403:
            log_pass("POST /api/projects returns 403 for non-owner user")
        else:
            log_fail("POST /api/projects non-owner", f"Expected 403, got {response.status_code}: {response.text}")
    except Exception as e:
        log_fail("POST /api/projects non-owner", f"Request failed: {e}")
    
    # Cleanup non-owner user
    print("\n[4.4] Cleaning up test non-owner user...")
    cleanup_test_user(non_owner_user_id)

# ============================================================================
# FINAL SUMMARY
# ============================================================================
print("\n" + "="*80)
print("TEST SUMMARY")
print("="*80)
print(f"\n✅ PASSED: {len(test_results['passed'])} tests")
for test in test_results['passed']:
    print(f"   • {test}")

if test_results['warnings']:
    print(f"\n⚠️  WARNINGS: {len(test_results['warnings'])} warnings")
    for warning in test_results['warnings']:
        print(f"   • {warning}")

if test_results['failed']:
    print(f"\n❌ FAILED: {len(test_results['failed'])} tests")
    for failure in test_results['failed']:
        print(f"   • {failure}")
else:
    print("\n🎉 ALL TESTS PASSED!")

print("\n" + "="*80)
print(f"Total: {len(test_results['passed'])} passed, {len(test_results['failed'])} failed, {len(test_results['warnings'])} warnings")
print("="*80)
