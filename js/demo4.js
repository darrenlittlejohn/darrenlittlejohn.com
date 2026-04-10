const themes = {
  coolMorning: { name:'Cool Morning', bg:'#eff6fb', surface:'#ffffff', surface2:'#e9f2f8', text:'#16324a', muted:'#627b8c', line:'rgba(22,50,74,.12)', accent:'#557f9d', accent2:'#91aec0', accent3:'#dbe6ee', sidebar:'#fbfdff' },
  warmAfternoon: { name:'Warm Afternoon', bg:'#fbf4ea', surface:'#fffdf9', surface2:'#f8efe3', text:'#4b372b', muted:'#8a6f5f', line:'rgba(75,55,43,.12)', accent:'#b07a53', accent2:'#d7aa7d', accent3:'#efe0cb', sidebar:'#fffaf4' },
  cozyEvening: { name:'Cozy Evening', bg:'#151c25', surface:'#1c2733', surface2:'#243241', text:'#edf2f6', muted:'#9caab7', line:'rgba(255,255,255,.08)', accent:'#7b92a8', accent2:'#a6b49b', accent3:'#d3d9df', sidebar:'#121922' }
};

function applyTheme(name) {
  const t = themes[name];
  if (!t) return;
  const root = document.documentElement;
  root.style.setProperty('--bg', t.bg);
  root.style.setProperty('--surface', t.surface);
  root.style.setProperty('--surface-2', t.surface2);
  root.style.setProperty('--text', t.text);
  root.style.setProperty('--muted', t.muted);
  root.style.setProperty('--line', t.line);
  root.style.setProperty('--accent', t.accent);
  root.style.setProperty('--accent-2', t.accent2);
  root.style.setProperty('--accent-3', t.accent3);
  root.style.setProperty('--sidebar-bg', t.sidebar);
  root.style.setProperty('--sidebar-text', t.text);
  root.style.setProperty('--card-bg', t.surface);
  
  const sw1 = document.getElementById('sw1');
  const sw2 = document.getElementById('sw2');
  const sw3 = document.getElementById('sw3');
  if (sw1) sw1.style.background = t.accent;
  if (sw2) sw2.style.background = t.accent2;
  if (sw3) sw3.style.background = t.accent3;
  
  const label = document.getElementById('themeCurrentLabel');
  if (label) label.textContent = t.name;
  
  document.querySelectorAll('.palette-chip').forEach(btn => btn.classList.toggle('active', btn.dataset.theme === name));
  try { localStorage.setItem('demo4-theme', name); } catch(e) {}
}

function buildPaletteGrid() {
  const grid = document.getElementById('paletteGrid');
  if (!grid) return;
  grid.innerHTML = Object.entries(themes).map(([key, t]) => `
    <button type="button" class="palette-chip" data-theme="${key}" aria-label="Choose ${t.name}">
      <div class="name">${t.name}</div>
      <div class="mini-swatches">
        <span style="background:${t.accent}"></span>
        <span style="background:${t.accent2}"></span>
        <span style="background:${t.accent3}"></span>
      </div>
    </button>
  `).join('');
  grid.querySelectorAll('.palette-chip').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      applyTheme(btn.dataset.theme);
    });
  });
}

function setupMobileLayout() {
  const isProjectPage = window.location.pathname.includes('/projects/');
  document.body.classList.toggle('project-page', isProjectPage);
  document.body.classList.toggle('home-page', !isProjectPage);

  const sidebar = document.querySelector('.sidebar');
  const shell = document.querySelector('.shell');
  const main = document.querySelector('.main');
  const ticker = document.querySelector('.ticker');
  const nav = document.querySelector('.nav');
  const themeToggle = document.getElementById('themeToggle');
  const themePanel = document.getElementById('themePanel');
  if (!sidebar || !nav) return;
  const originalSidebarParent = sidebar.parentElement;
  const originalSidebarNext = sidebar.nextElementSibling;

  let menuToggle = document.getElementById('sidebarMenuToggle');
  if (!menuToggle) {
    menuToggle = document.createElement('button');
    menuToggle.type = 'button';
    menuToggle.id = 'sidebarMenuToggle';
    menuToggle.className = 'theme-toggle sidebar-menu-toggle';
    menuToggle.textContent = 'Menu';
    menuToggle.setAttribute('aria-expanded', 'false');
    sidebar.insertBefore(menuToggle, nav);
  }

  const mql = window.matchMedia('(max-width: 720px)');
  const applyMobileState = () => {
    if (mql.matches) {
      document.body.classList.add('mobile-layout');
      document.body.classList.toggle('project-mobile', isProjectPage);
      document.body.classList.toggle('home-mobile', !isProjectPage);
      if (!isProjectPage && main && ticker && sidebar.parentElement !== main) {
        ticker.insertAdjacentElement('afterend', sidebar);
      }
      nav.classList.add('is-collapsed');
      menuToggle.setAttribute('aria-expanded', 'false');
      if (themePanel) themePanel.style.display = 'none';
      if (themeToggle) themeToggle.setAttribute('aria-expanded', 'false');
    } else {
      document.body.classList.remove('mobile-layout', 'project-mobile', 'home-mobile');
      if (sidebar.parentElement !== originalSidebarParent) {
        if (originalSidebarNext && originalSidebarNext.parentElement === originalSidebarParent) {
          originalSidebarParent.insertBefore(sidebar, originalSidebarNext);
        } else {
          originalSidebarParent.appendChild(sidebar);
        }
      }
      nav.classList.remove('is-collapsed');
      menuToggle.setAttribute('aria-expanded', 'true');
      if (themePanel) themePanel.style.display = 'block';
      if (themeToggle) themeToggle.setAttribute('aria-expanded', 'true');
    }
  };

  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('is-collapsed');
    const isExpanded = !nav.classList.contains('is-collapsed');
    menuToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
  });

  applyMobileState();
  if (mql.addEventListener) {
    mql.addEventListener('change', applyMobileState);
  } else {
    mql.addListener(applyMobileState);
  }
}

function updateClock() {
  const clockEl = document.getElementById('clock');
  const clockSubEl = document.getElementById('clockSub');
  if (!clockEl || !clockSubEl) return;
  
  const now = new Date();
  const time = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'America/Denver'
  }).format(now);
  const date = new Intl.DateTimeFormat('en-US', {
      weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', timeZone: 'America/Denver'
  }).format(now);
  
  clockEl.textContent = time;
  clockSubEl.innerHTML = `${date}<br>Mountain Time (Denver)`;
}

// Initializations
buildPaletteGrid();
setupMobileLayout();

const themeToggle = document.getElementById('themeToggle');
const themePanel = document.getElementById('themePanel');
if (themeToggle && themePanel) {
  themeToggle.addEventListener('click', () => {
    const isOpen = themePanel.style.display === 'block';
    themePanel.style.display = isOpen ? 'none' : 'block';
    themeToggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
  });
}

let saved = 'coolMorning';
try { saved = localStorage.getItem('demo4-theme') || 'coolMorning'; } catch(e) {}
applyTheme(saved);
updateClock();
setInterval(updateClock, 1000);

// Smooth Scrolling & Active Link Highlighting
document.querySelectorAll('.nav-link, .cta').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Update URL hash without jumping
        history.pushState(null, null, href);
      }
    }
  });
});

// Scroll Spy for Nav
const observerOptions = {
  root: null,
  rootMargin: '-20% 0px -70% 0px',
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      document.querySelectorAll('.nav-link').forEach(nav => {
        nav.classList.toggle('active', nav.getAttribute('href') === `#${id}`);
      });
    }
  });
}, observerOptions);

document.querySelectorAll('section[id]').forEach(section => {
  observer.observe(section);
});

// Thought Leadership image rotator (top card)
const zenHeroImage = document.getElementById('zenHeroImage');
if (zenHeroImage) {
  const zenFrames = [
    { src: 'assets/img/brain_of_data_analyst.png', alt: 'The Zen of Data Analysis - Brain of Data Analyst' },
    { src: 'assets/img/zen_001.png', alt: 'The Zen of Data Analysis - Zen Graphic 1' },
    { src: 'assets/img/zen_002.png', alt: 'The Zen of Data Analysis - Zen Graphic 2' },
    { src: 'assets/img/zen_003.png', alt: 'The Zen of Data Analysis - Zen Graphic 3' }
  ];
  let zenIndex = 0;
  setInterval(() => {
    zenIndex = (zenIndex + 1) % zenFrames.length;
    zenHeroImage.src = zenFrames[zenIndex].src;
    zenHeroImage.alt = zenFrames[zenIndex].alt;
  }, 3200);
}
