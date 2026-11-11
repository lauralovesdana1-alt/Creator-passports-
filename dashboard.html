<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Creator Dashboard</title>
    <style>
      :root {
        --bg: #0a1221;
        --panel: rgba(17,25,40,0.92);
        --border: rgba(148,163,184,0.2);
        --text: #edf4ff;
        --muted: #acc0e0;
        --primary: #7c9cff;
        --success: #3ddc97;
      }

      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: Inter, Arial, sans-serif;
        background: radial-gradient(circle at top, rgba(124,156,255,0.18), transparent 30%), linear-gradient(180deg, #070d18, #0a1221);
        color: var(--text);
      }

      .page {
        max-width: 1100px;
        margin: 0 auto;
        padding: 32px 20px 60px;
      }

      .topbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
        margin-bottom: 24px;
      }

      .title h1 { margin: 0 0 6px; }
      .title p { margin: 0; color: var(--muted); }

      .actions { display: flex; gap: 12px; align-items: center; }
      button {
        border: none;
        border-radius: 12px;
        padding: 0.85rem 1.1rem;
        font-weight: 700;
        cursor: pointer;
      }
      .primary { background: linear-gradient(135deg, var(--primary), #5d7df5); color: white; }
      .secondary { background: rgba(148, 163, 184, 0.08); color: var(--text); border: 1px solid var(--border); }

      .layout {
        display: grid;
        grid-template-columns: 1.2fr 0.8fr;
        gap: 24px;
      }

      .panel {
        background: var(--panel);
        border: 1px solid var(--border);
        border-radius: 20px;
        padding: 24px;
      }

      .field {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 18px;
        color: var(--muted);
      }

      input, textarea {
        width: 100%;
        border-radius: 14px;
        border: 1px solid rgba(148,163,184,0.22);
        background: rgba(15,23,42,0.8);
        color: var(--text);
        padding: 0.9rem 1rem;
        font: inherit;
      }

      textarea { min-height: 110px; resize: vertical; }

      .checkbox-row {
        display: flex;
        align-items: center;
        gap: 10px;
        margin: 10px 0 20px;
      }

      .preview {
        display: flex;
        flex-direction: column;
        gap: 18px;
      }

      .avatar {
        width: 88px;
        height: 88px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid rgba(124, 156, 255, 0.45);
      }

      .badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 6px 10px;
        border-radius: 999px;
        width: fit-content;
        font-size: 0.72rem;
        font-weight: 700;
      }
      .verified { background: rgba(61,220,151,0.16); border: 1px solid rgba(61,220,151,0.35); color: #bfffe0; }
      .unverified { background: rgba(251,191,36,0.10); border: 1px solid rgba(251,191,36,0.25); color: #ffe6a3; }

      .tags { display: flex; flex-wrap: wrap; gap: 8px; }
      .tag {
        padding: 7px 10px; border-radius: 999px; background: rgba(124,156,255,0.08); border: 1px solid rgba(124,156,255,0.22); color: #dfeafe; font-size: 0.76rem;
      }
      .muted { color: var(--muted); }

      @media (max-width: 860px) {
        .layout { grid-template-columns: 1fr; }
        .topbar { flex-direction: column; align-items: flex-start; }
      }
    </style>
  </head>
  <body>
    <div class="page">
      <div class="topbar">
        <div class="title">
          <h1>Creator dashboard</h1>
          <p>Manage your public passport profile</p>
        </div>
        <div class="actions">
          <button class="secondary" id="backBtn" type="button">Back to directory</button>
          <button class="secondary" id="signOutBtn" type="button">Sign out</button>
        </div>
      </div>

      <div class="layout">
        <section class="panel">
          <form id="dashboardForm">
            <label class="field">
              <span>Display name</span>
              <input id="displayName" name="name" type="text" required />
            </label>

            <label class="field">
              <span>GitHub username</span>
              <input id="githubUsername" name="githubUsername" type="text" readonly />
            </label>

            <label class="field">
              <span>Avatar URL</span>
              <input id="avatarUrl" name="avatarUrl" type="url" placeholder="https://github.com/yourname.png" />
            </label>

            <label class="field">
              <span>Website</span>
              <input id="website" name="website" type="url" placeholder="https://your-site.com" />
            </label>

            <label class="field">
              <span>Bio</span>
              <textarea id="bio" name="bio" placeholder="Tell the world what you build..."></textarea>
            </label>

            <label class="field">
              <span>Skills</span>
              <input id="skills" name="skills" type="text" placeholder="react, node, design systems" />
            </label>

            <label class="checkbox-row">
              <input id="verified" type="checkbox" />
              <span>Mark my profile as verified</span>
            </label>

            <button class="primary" type="submit">Save profile</button>
          </form>
        </section>

        <aside class="panel preview">
          <div class="profile-header">
            <img id="previewAvatar" class="avatar" src="" alt="Profile avatar" />
            <div>
              <h2 id="previewName">Your name</h2>
              <p class="muted" id="previewUsername">@username</p>
            </div>
          </div>

          <div id="previewBadge" class="badge verified">Verified Creator</div>
          <p id="previewBio" class="muted">Your bio will appear here.</p>
          <p id="previewWebsite" class="muted"></p>
          <div id="previewSkills" class="tags"></div>
        </aside>
      </div>
    </div>

    <script>
      const form = document.getElementById('dashboardForm');
      const nameInput = document.getElementById('displayName');
      const githubUsernameInput = document.getElementById('githubUsername');
      const avatarInput = document.getElementById('avatarUrl');
      const websiteInput = document.getElementById('website');
      const bioInput = document.getElementById('bio');
      const skillsInput = document.getElementById('skills');
      const verifiedInput = document.getElementById('verified');
      const backBtn = document.getElementById('backBtn');
      const signOutBtn = document.getElementById('signOutBtn');

      function updatePreview() {
        const name = nameInput.value.trim() || 'Your name';
        const username = githubUsernameInput.value.trim() || 'username';
        const bio = bioInput.value.trim() || 'Your bio will appear here.';
        const avatar = avatarInput.value.trim() || `https://github.com/${username}.png?size=160`;
        const website = websiteInput.value.trim();
        const skills = skillsInput.value.split(',').map((s) => s.trim()).filter(Boolean);

        document.getElementById('previewName').textContent = name;
        document.getElementById('previewUsername').textContent = '@' + username;
        document.getElementById('previewBio').textContent = bio;
        document.getElementById('previewAvatar').src = avatar;
        document.getElementById('previewBadge').textContent = verifiedInput.checked ? 'Verified Creator' : 'Unverified';
        document.getElementById('previewBadge').className = `badge ${verifiedInput.checked ? 'verified' : 'unverified'}`;
        document.getElementById('previewWebsite').innerHTML = website
          ? `Website: <a href="${website}" style="color:#bfd2ff" target="_blank" rel="noreferrer">${website}</a>`
          : 'Website: not provided';

        const tagContainer = document.getElementById('previewSkills');
        tagContainer.innerHTML = skills.length
          ? skills.map((skill) => `<span class="tag">${skill}</span>`).join('')
          : '<span class="muted">Add skills to showcase your work</span>';
      }

      async function loadSessionAndProfile() {
        const sessionRes = await fetch('/api/session');
        const sessionData = await sessionRes.json();
        const user = sessionData.user;

        if (!user) {
          window.location.href = '/auth/github';
          return;
        }

        githubUsernameInput.value = user.github_username || '';
        nameInput.value = user.display_name || user.github_username || '';

        const profileRes = await fetch(`/api/creator/${encodeURIComponent(user.github_username)}`);
        if (profileRes.ok) {
          const profile = await profileRes.json();
          nameInput.value = profile.name || user.display_name || user.github_username;
          bioInput.value = profile.bio || '';
          websiteInput.value = profile.website || '';
          avatarInput.value = profile.avatarUrl || '';
          skillsInput.value = (profile.skills || []).join(', ');
          verifiedInput.checked = Boolean(profile.verified);
          updatePreview();
          return;
        }

        updatePreview();
      }

      form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const payload = {
          name: nameInput.value.trim(),
          bio: bioInput.value.trim(),
          website: websiteInput.value.trim(),
          skills: skillsInput.value.split(',').map((s) => s.trim()).filter(Boolean),
          avatarUrl: avatarInput.value.trim(),
          verified: verifiedInput.checked
        };

        const response = await fetch('/api/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          alert('Unable to save profile.');
          return;
        }

        const result = await response.json();
        if (result.avatarUrl) avatarInput.value = result.avatarUrl;
        updatePreview();
        alert('Profile saved successfully.');
      });

      nameInput.addEventListener('input', updatePreview);
      bioInput.addEventListener('input', updatePreview);
      websiteInput.addEventListener('input', updatePreview);
      skillsInput.addEventListener('input', updatePreview);
      avatarInput.addEventListener('input', updatePreview);
      verifiedInput.addEventListener('change', updatePreview);

      backBtn.addEventListener('click', () => window.location.href = '/');
      signOutBtn.addEventListener('click', async () => {
        await fetch('/api/logout', { method: 'POST' });
        window.location.href = '/';
      });

      loadSessionAndProfile();
    </script>
  </body>
</html>
