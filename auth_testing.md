# Auth-Gated App Testing Playbook

## Step 1: Create Test User & Session
mongosh --eval "
use('test_database');
var userId = 'test-user-' + Date.now();
var sessionToken = 'test_session_' + Date.now();
db.users.insertOne({
  user_id: userId,
  email: 'test.user.' + Date.now() + '@example.com',
  name: 'Test User',
  picture: 'https://via.placeholder.com/150',
  is_owner: true,
  created_at: new Date()
});
db.user_sessions.insertOne({
  user_id: userId,
  session_token: sessionToken,
  expires_at: new Date(Date.now() + 7*24*60*60*1000),
  created_at: new Date()
});
print('Session token: ' + sessionToken);
print('User ID: ' + userId);
"

## Step 2: Test Backend API
curl -X GET "$BASE/api/auth/me" -H "Authorization: Bearer TOKEN"
curl -X POST "$BASE/api/posts" -H "Content-Type: application/json" -H "Authorization: Bearer TOKEN" -d '{"title":"T","excerpt":"e","body":"# hi","tag":"Eng"}'

## Step 3: Browser Testing
Set cookie session_token (httpOnly, secure, sameSite None, path /) then navigate.

## Notes
- Owner = first user to log in (is_owner=true). Only owner can create/edit/delete posts & projects.
- All queries exclude MongoDB _id with {"_id": 0} projection.
