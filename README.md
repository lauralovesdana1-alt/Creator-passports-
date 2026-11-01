const STORAGE_KEY = 'creator-passports-v1';
const DEFAULT_CREATORS = [
  {
    id: 'creator-dana-20391',
    name: 'Dana Reed',
    githubUsername: 'lauralovesdana1-alt',
    bio: 'Builds developer tools, growth systems, and elegant product experiences.',
    skills: ['React', 'Node', 'UX', 'GitHub API'],
    verified: true
  },
  {
    id: 'creator-oliver-40198',
    name: 'Oliver Grant',
    githubUsername: 'olivergrant',
    bio: 'Platform engineer focused on open-source tooling and scalable internal APIs.',
    skills: ['Go', 'DevOps', 'Kubernetes', 'CI/CD'],
    verified: true
  },
  {
    id: 'creator-sanya-78501',
    name: 'Sanya Patel',
    githubUsername: 'sanyapatel',
    bio: 'Designs developer experiences and product architecture for creator communities.',
    skills: ['TypeScript', 'Design Systems', 'Frontend', 'AI'],
    verified: false
  },
  {
    id: 'creator-jamie-90317',
    name: 'Jamie Collins',
    githubUsername: 'jamiecollins',
    bio: 'Shipping developer experiences that combine performance, trust, and clarity.',
    skills: ['Rust', 'Systems', 'Performance', 'Security'],
    verified: true
  }
];

const creatorGrid = document.querySelector('#creatorGrid');
const searchInput = document.querySelector('#searchInput');
const creatorForm = document.querySelector('#creatorForm');
const resultCount = document.querySelector('#resultCount');
const scrollToFormButton = document.querySelector('#scrollToForm');
const resetDemoButton = document.querySelector('#resetDemo');

let creators = loadCreators();

function loadCreators() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [...DEFAULT_CREATORS];
    }

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length ? parsed : [...DEFAULT_CREATORS];
  } catch (error) {
    console.warn('Unable to read saved creators:', error);
    return [...DEFAULT_CREATORS];
  }
}

function persistCreators() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(creators));
  } catch (error) {
    console.warn('Unable to save creators:', error);
  }
}

function normalizeSkills(value) {
  return value
    .split(',')
    .map((skill) => skill.trim())
    .filter(Boolean);
}

function generateCreatorId(username) {
  const cleanName = (username || 'developer')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 12) || 'developer';

  const suffix = Math.random().toString(36).slice(2, 7);
  return `creator-${cleanName}-${suffix}`;
}

function safeAvatar(username) {
  const trimmed = (username || '').trim();
  if (!trimmed) {
    return 'https://ui-avatars.com/api/?name=Developer&background=7c9cff&color=fff';
  }

  return `https://github.com/${trimmed}.png?size=160`;
}

function skillList(skills) {
  return (skills || []).map((skill) => `<span class="tag">${skill}</span>`).join('');
}

function getVisibleCreators() {
  const query = (searchInput?.value || '').trim().toLowerCase();

  if (!query) {
    return creators;
  }

  return creators.filter((creator) => {
    const haystack = [
      creator.name,
      creator.githubUsername,
      creator.bio,
      (creator.skills || []).join(' '),
      creator.id
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(query);
  });
}

function renderCreators(list) {
  if (!creatorGrid) return;

  resultCount.textContent = `${list.length} creator${list.length === 1 ? '' : 's'}`;

  if (!list.length) {
    creatorGrid.innerHTML = `
      <div class="empty-state">
        <h3>No creators found</h3>
        <p>Try a different name, GitHub handle, or skill.</p>
      </div>
    `;
    return;
  }

  creatorGrid.innerHTML = list
    .map(
      (creator) => `
        <article class="creator-card">
          <div class="card-top">
            <img
              src="${safeAvatar(creator.githubUsername)}"
              alt="${creator.name}"
              onerror="this.onerror=null;this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(creator.name || 'Developer')}&background=7c9cff&color=fff';"
            />
            <div>
              <div class="identity-row">
                <h3>${creator.name}</h3>
                ${creator.verified ? '<span class="verified-badge">Verified</span>' : '<span class="unverified-badge">Unverified</span>'}
              </div>
              <p class="username">@${creator.githubUsername}</p>
            </div>
          </div>

          <div class="creator-id-box">
            <span>Creator ID</span>
            <strong>${creator.id}</strong>
          </div>

          <p class="bio">${creator.bio}</p>

          <div class="tags">
            ${skillList(creator.skills || [])}
          </div>
        </article>
      `
    )
    .join('');
}

function updateView() {
  renderCreators(getVisibleCreators());
}

function handleFormSubmit(event) {
  event.preventDefault();

  if (!creatorForm) return;

  const formData = new FormData(creatorForm);
  const name = formData.get('name').toString().trim();
  const githubUsername = formData.get('githubUsername').toString().trim();
  const bio = formData.get('bio').toString().trim() || 'Developer building meaningful experiences for the open web.';
  const skills = normalizeSkills(formData.get('skills').toString());
  const verified = formData.get('verified') === 'on';

  if (!name || !githubUsername || !skills.length) {
    return;
  }

  const newCreator = {
    id: generateCreatorId(githubUsername),
    name,
    githubUsername,
    bio,
    skills,
    verified
  };

  creators = [newCreator, ...creators];
  persistCreators();
  creatorForm.reset();
  searchInput.value = '';
  updateView();

  const formSection = document.querySelector('#passportFormSection');
  if (formSection) {
    formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function resetDemoData() {
  creators = [...DEFAULT_CREATORS];
  persistCreators();
  if (searchInput) {
    searchInput.value = '';
  }
  updateView();
}

if (searchInput) {
  searchInput.addEventListener('input', updateView);
}

if (creatorForm) {
  creatorForm.addEventListener('submit', handleFormSubmit);
}

if (scrollToFormButton) {
  scrollToFormButton.addEventListener('click', () => {
    const formSection = document.querySelector('#passportFormSection');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

if (resetDemoButton) {
  resetDemoButton.addEventListener('click', resetDemoData);
}

updateView();

window.addEventListener('error', (event) => {
  console.error('Runtime error:', event.error || event.message);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled rejection:', event.reason);
});

console.log('GitHub Creator Passports initialized successfully.');

if (!creatorGrid || !searchInput || !creatorForm || !resultCount) {
  console.error('Required creator passport UI elements are missing.');
}
































































































































































































































































































































































































































































































































































































































="












































































































































































































n














































































































n
























n


























































" ;










































































































n
































"}]} ,