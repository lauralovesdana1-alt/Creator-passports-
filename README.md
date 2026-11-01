# GitHub Creator Passports

A lightweight MVP for creating and browsing developer creator IDs tied to GitHub profiles.

## Features
- Unique creator IDs for developers
- GitHub-based profile cards
- Search by name, username, or skill
- Verified creator status
- Add a new creator passport from the browser

## Run locally
Open `index.html` directly in a browser, or serve the folder with a small local server:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000

## Project structure
- `index.html` — app shell and forms
- `styles.css` — styling for the creator passport dashboard
- `app.js` — sample data, rendering logic, and ID generation
