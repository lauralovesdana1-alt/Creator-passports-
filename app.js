:root {
  --bg: #0b1020;
  --bg-soft: #121a2d;
  --panel: rgba(17, 25, 40, 0.9);
  --panel-border: rgba(148, 163, 184, 0.16);
  --text: #e5eefb;
  --muted: #9fb0d1;
  --primary: #7c9cff;
  --primary-strong: #5d7df5;
  --success: #3edc91;
  --warning: #fbbf24;
  --shadow: 0 18px 40px rgba(15, 23, 42, 0.35);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  font-family: "Inter", sans-serif;
  background:
    radial-gradient(circle at top, rgba(124, 156, 255, 0.18), transparent 30%),
    linear-gradient(180deg, #070d18 0%, #0a1221 100%);
  color: var(--text);
}

img {
  max-width: 100%;
  display: block;
}

button,
input,
textarea {
  font: inherit;
}

.page-shell {
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  padding: 32px 0 56px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 24px;
}

.eyebrow {
  margin: 0 0 8px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.72rem;
  color: var(--muted);
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1 {
  margin-bottom: 0;
  font-size: clamp(2rem, 3vw, 3rem);
}

.layout {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 24px;
  margin-bottom: 28px;
}

.panel {
  background: var(--panel);
  border: 1px solid var(--panel-border);
  border-radius: 22px;
  box-shadow: var(--shadow);
  padding: 22px;
}

.panel-heading {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
}

.panel-heading h2,
.results-header h2 {
  margin: 0;
  font-size: 1.4rem;
}

.chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  border-radius: 999px;
  border: 1px solid rgba(124, 156, 255, 0.35);
  background: rgba(124, 156, 255, 0.08);
  color: #cfe1ff;
  font-size: 0.75rem;
  font-weight: 700;
}

.chip.success {
  border-color: rgba(62, 220, 145, 0.35);
  background: rgba(62, 220, 145, 0.08);
  color: #d3ffe9;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--muted);
  font-size: 0.92rem;
}

.field input,
.field textarea {
  width: 100%;
  resize: vertical;
  padding: 0.9rem 1rem;
  border-radius: 14px;
  border: 1px solid rgba(148, 163, 184, 0.22);
  background: rgba(15, 23, 42, 0.8);
  color: var(--text);
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.field input:focus,
.field textarea:focus {
  border-color: rgba(124, 156, 255, 0.8);
  box-shadow: 0 0 0 4px rgba(124, 156, 255, 0.12);
}

.input-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 16px;
}

.check-row {
  margin: 18px 0 22px;
}

.checkbox-wrap {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--text);
}

.checkbox-wrap input {
  width: 18px;
  height: 18px;
  accent-color: var(--primary);
}

.primary-btn {
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-strong) 100%);
  color: white;
  padding: 0.9rem 1.1rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 10px 22px rgba(93, 125, 245, 0.35);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.primary-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 28px rgba(115, 139, 255, 0.42);
}

.results {
  background: rgba(8, 14, 24, 0.82);
  border: 1px solid var(--panel-border);
  border-radius: 22px;
  padding: 24px;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}

.results-header span {
  color: var(--muted);
  font-size: 0.9rem;
}

.creator-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 18px;
}

.creator-card {
  background: rgba(17, 25, 40, 0.9);
  border: 1px solid var(--panel-border);
  border-radius: 18px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.card-top {
  display: flex;
  gap: 12px;
  align-items: center;
}

.card-top img {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(124, 156, 255, 0.5);
}

.identity-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.identity-row h3 {
  margin: 0;
  font-size: 1.05rem;
}

.username {
  margin: 4px 0 0;
  color: var(--muted);
  font-size: 0.87rem;
}

.verified-badge,
.unverified-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 4px 8px;
  font-size: 0.68rem;
  font-weight: 700;
}

.verified-badge {
  background: rgba(62, 220, 145, 0.12);
  border: 1px solid rgba(62, 220, 145, 0.4);
  color: #bfffe0;
}

.unverified-badge {
  background: rgba(251, 191, 36, 0.08);
  border: 1px solid rgba(251, 191, 36, 0.28);
  color: #ffe6a3;
}

.creator-id-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(124, 156, 255, 0.08);
  border: 1px solid rgba(124, 156, 255, 0.18);
  color: var(--muted);
}

.creator-id-box strong {
  color: var(--text);
  font-size: 0.8rem;
  word-break: break-all;
  text-align: right;
}

.bio {
  margin: 0;
  color: #d7e0f6;
  line-height: 1.6;
  min-height: 72px;
}

.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  display: inline-flex;
  padding: 6px 9px;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.25);
  background: rgba(15, 23, 42, 0.7);
  color: #dfeafe;
  font-size: 0.72rem;
}

.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 32px 16px;
  color: var(--muted);
  border: 1px dashed rgba(148, 163, 184, 0.25);
  border-radius: 16px;
  background: rgba(15, 23, 42, 0.38);
}

.empty-state h3 {
  margin-bottom: 8px;
  color: var(--text);
}

@media (max-width: 780px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .topbar,
  .results-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .input-grid {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  .primary-btn {
    transition: none;
  }
}
