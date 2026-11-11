# Creator Passports

A GitHub-authenticated creator passport directory for developers.

## Features
- Searchable developer directory
- Verified creator badges
- GitHub OAuth sign-in
- SQLite-backed persistence
- Public profile pages
- Profile editing for signed-in users
- Reset to demo creators

## Requirements
- Node.js 18+
- A GitHub OAuth app

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a GitHub OAuth app at https://github.com/settings/developers

3. Set environment variables:
   ```bash
   export GITHUB_CLIENT_ID="your-client-id"
   export GITHUB_CLIENT_SECRET="your-client-secret"
   export APP_URL="http://localhost:3000"
   export SESSION_SECRET="your-session-secret"
   ```

4. Start the app:
   ```bash
   npm start
   ```

5. Open:
   ```bash
   http://localhost:3000
   ```

## Profile route
- Visit `/profile/:githubUsername` to view a public creator profile page.

## API endpoints
- `GET /api/creators` — list all creator passports
- `GET /api/creator/:username` — fetch a single creator record
- `GET /api/session` — current signed-in GitHub user
- `POST /api/profile` — update the signed-in creator profile
- `POST /api/reset` — restore demo creators
- `POST /api/logout` — sign the user out

## Notes
This is a solid MVP foundation for creator verification and GitHub-linked developer identities. It is ready for future improvements like organization membership checks, admin approval flows, and richer profile pages.
