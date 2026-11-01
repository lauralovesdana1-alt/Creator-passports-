const express = require('express');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;
const APP_URL = process.env.APP_URL || 'http://localhost:3000';
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || 'your_github_client_id';
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || 'your_github_client_secret';
const SESSION_SECRET = process.env.SESSION_SECRET || 'creator-passport-secret';
const DB_DIR = path.join(__dirname, 'data');
const DB_PATH = path.join(DB_DIR, 'creator-passports.db');

const DEMO_CREATORS = [
  {
    id: 'creator-dana-20391',
    name: 'Dana Reed',
    githubUsername: 'lauralovesdana1-alt',
    bio: 'Builds developer tools, growth systems, and elegant product experiences.',
    skills: ['React', 'Node', 'UX', 'GitHub API'],
    verified: true,
    avatarUrl: 'https://github.com/lauralovesdana1-alt.png?size=160'
  },
  {
    id: 'creator-oliver-40198',
    name: 'Oliver Grant',
    githubUsername: 'olivergrant',
    bio: 'Platform engineer focused on open-source tooling and scalable internal APIs.',
    skills: ['Go', 'DevOps', 'Kubernetes', 'CI/CD'],
    verified: true,
    avatarUrl: 'https://github.com/olivergrant.png?size=160'
  },
  {
    id: 'creator-sanya-78501',
    name: 'Sanya Patel',
    githubUsername: 'sanyapatel',
    bio: 'Designs developer experiences and product architecture for creator communities.',
    skills: ['TypeScript', 'Design Systems', 'Frontend', 'AI'],
    verified: false,
    avatarUrl: 'https://github.com/sanyapatel.png?size=160'
  },
  {
    id: 'creator-jamie-90317',
    name: 'Jamie Collins',
    githubUsername: 'jamiecollins',
    bio: 'Shipping developer experiences that combine performance, trust, and clarity.',
    skills: ['Rust', 'Systems', 'Performance', 'Security'],
    verified: true,
    avatarUrl: 'https://github.com/jamiecollins.png?size=160'
  }
];

const db = new sqlite3.Database(DB_PATH, (error) => {
  if (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }

  console.log('Connected to SQLite database.');
});

function ensureDatabaseDir() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
}

function runSql(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function onRun(error) {
      if (error) {
        reject(error);
        return;
      }
      resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

function getSql(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (error, row) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(row || null);
    });
  });
}

function allSql(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (error, rows) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(rows || []);
    });
  });
}

async function initializeDatabase() {
  ensureDatabaseDir();

  await runSql(`
    CREATE TABLE IF NOT EXISTS creators (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      github_user_id INTEGER UNIQUE,
      github_username TEXT UNIQUE,
      display_name TEXT,
      avatar_url TEXT,
      bio TEXT DEFAULT '',
      website TEXT DEFAULT '',
      skills TEXT DEFAULT '[]',
      verified INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await seedDefaultCreators();
}

async function seedDefaultCreators() {
  const existing = await allSql('SELECT COUNT(*) AS total FROM creators');
  const total = Number(existing[0]?.total || 0);

  if (total > 0) {
    return;
  }

  for (const creator of DEMO_CREATORS) {
    await runSql(
      `INSERT INTO creators (github_username, display_name, avatar_url, bio, skills, verified)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        creator.githubUsername,
        creator.name,
        creator.avatarUrl,
        creator.bio,
        JSON.stringify(creator.skills || []),
        creator.verified ? 1 : 0
      ]
    );
  }
}

async function upsertGitHubCreator(userPayload) {
  const payload = {
    github_user_id: Number(userPayload.id),
    github_username: userPayload.login,
    display_name: userPayload.name || userPayload.login,
    avatar_url: userPayload.avatar_url || '',
    bio: userPayload.bio || '',
    website: userPayload.blog || '',
    skills: JSON.stringify([]),
    verified: 1
  };

  await runSql(
    `INSERT INTO creators (github_user_id, github_username, display_name, avatar_url, bio, website, skills, verified)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(github_user_id) DO UPDATE SET
       github_username = excluded.github_username,
       display_name = excluded.display_name,
       avatar_url = excluded.avatar_url,
       bio = excluded.bio,
       website = excluded.website,
       skills = excluded.skills,
       verified = excluded.verified,
       updated_at = CURRENT_TIMESTAMP`,
    [
      payload.github_user_id,
      payload.github_username,
      payload.display_name,
      payload.avatar_url,
      payload.bio,
      payload.website,
      payload.skills,
      payload.verified
    ]
  );

  return await getSql('SELECT * FROM creators WHERE github_user_id = ?', [payload.github_user_id]);
}

async function getAllCreators() {
  const rows = await allSql(`
    SELECT id, github_user_id, github_username, display_name, avatar_url, bio, website, skills, verified, created_at, updated_at
    FROM creators
    ORDER BY updated_at DESC
  `);

  return rows.map((row) => ({
    id: row.github_username ? `creator-${row.github_username}` : `creator-${row.id}`,
    githubUsername: row.github_username,
    name: row.display_name || row.github_username,
    bio: row.bio || 'Developer building meaningful experiences for the open web.',
    website: row.website || '',
    skills: safeParseSkills(row.skills),
    verified: Boolean(row.verified),
    avatarUrl: row.avatar_url || `https://github.com/${row.github_username}.png?size=160`
  }));
}

function safeParseSkills(value) {
  try {
    const parsed = JSON.parse(value || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

async function updateCurrentProfile(req, res) {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Authentication required.' });
  }

  const { name, bio, website, skills, verified } = req.body || {};

  const safeSkills = Array.isArray(skills)
    ? skills.map((skill) => String(skill).trim()).filter(Boolean)
    : [];

  const record = await getSql('SELECT * FROM creators WHERE github_user_id = ?', [req.session.user.github_user_id]);

  if (!record) {
    return res.status(404).json({ message: 'Creator profile not found.' });
  }

  await runSql(
    `UPDATE creators
     SET display_name = ?, bio = ?, website = ?, skills = ?, verified = ?, updated_at = CURRENT_TIMESTAMP
     WHERE github_user_id = ?`,
    [
      String(name || req.session.user.display_name || req.session.user.github_username).trim(),
      String(bio || '').trim(),
      String(website || '').trim(),
      JSON.stringify(safeSkills),
      verified ? 1 : 0,
      req.session.user.github_user_id
    ]
  );

  const updated = await getSql('SELECT * FROM creators WHERE github_user_id = ?', [req.session.user.github_user_id]);
  return res.json({
    id: `creator-${updated.github_username}`,
    githubUsername: updated.github_username,
    name: updated.display_name || updated.github_username,
    bio: updated.bio || 'Developer building meaningful experiences for the open web.',
    website: updated.website || '',
    skills: safeParseSkills(updated.skills),
    verified: Boolean(updated.verified),
    avatarUrl: updated.avatar_url || `https://github.com/${updated.github_username}.png?size=160`
  });
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: 'lax'
    }
  })
);

app.get('/auth/github', (req, res) => {
  if (!GITHUB_CLIENT_ID || GITHUB_CLIENT_ID === 'your_github_client_id') {
    return res.status(500).send('GitHub OAuth is not configured. Set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in your environment.');
  }

  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: `${APP_URL}/auth/github/callback`,
    scope: 'read:user user:email',
    allow_signup: 'true'
  });

  res.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
});

app.get('/auth/github/callback', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('GitHub login failed: missing authorization code.');
  }

  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'creator-passports-app'
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: `${APP_URL}/auth/github/callback`
      })
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      return res.status(400).send('GitHub login failed: access token missing.');
    }

    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github+json',
        'User-Agent': 'creator-passports-app'
      }
    });

    const user = await userResponse.json();

    if (!user || !user.id) {
      return res.status(400).send('GitHub login failed: profile unavailable.');
    }

    const created = await upsertGitHubCreator(user);

    req.session.user = {
      github_user_id: created.github_user_id,
      github_username: created.github_username,
      display_name: created.display_name || created.github_username,
      avatar_url: created.avatar_url || '',
      bio: created.bio || ''
    };

    return res.redirect('/');
  } catch (error) {
    console.error('GitHub OAuth callback failed:', error);
    return res.status(500).send('GitHub login failed due to an internal error.');
  }
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ ok: true });
  });
});

app.get('/api/session', (req, res) => {
  res.json({ user: req.session.user || null });
});

app.get('/api/creators', async (req, res) => {
  try {
    const creators = await getAllCreators();
    res.json(creators);
  } catch (error) {
    console.error('Failed to load creators:', error);
    res.status(500).json({ message: 'Unable to load creators.' });
  }
});

app.post('/api/profile', async (req, res) => {
  await updateCurrentProfile(req, res);
});

app.post('/api/reset', async (req, res) => {
  await runSql('DELETE FROM creators');

  for (const creator of DEMO_CREATORS) {
    await runSql(
      `INSERT INTO creators (github_username, display_name, avatar_url, bio, skills, verified)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        creator.githubUsername,
        creator.name,
        creator.avatarUrl,
        creator.bio,
        JSON.stringify(creator.skills || []),
        creator.verified ? 1 : 0
      ]
    );
  }

  const creators = await getAllCreators();
  res.json(creators);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

async function startServer() {
  await initializeDatabase();
  app.listen(PORT, () => {
    console.log(`Creator Passports app running at http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Server startup error:', error);
  process.exit(1);
});
