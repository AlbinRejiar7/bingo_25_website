const header = document.querySelector('.site-header');
const navMenu = document.querySelector('.nav-menu');
const navToggle = document.querySelector('.nav-toggle');
const legalTabs = document.querySelectorAll('.tab');
const legalPanels = document.querySelectorAll('.legal-panel');
const revealItems = document.querySelectorAll('.reveal');
const tocToggles = document.querySelectorAll('.toc-toggle');

const setHeaderState = () => {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 12);
};

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const switchTab = (tabName) => {
  legalTabs.forEach((tab) => {
    const isActive = tab.dataset.tab === tabName;
    tab.classList.toggle('is-active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
  });

  legalPanels.forEach((panel) => {
    const isActive = panel.dataset.panel === tabName;
    panel.classList.toggle('is-active', isActive);
  });
};

legalTabs.forEach((tab) => {
  tab.addEventListener('click', () => switchTab(tab.dataset.tab));
});

const navTargets = document.querySelectorAll('[data-tab-target]');
navTargets.forEach((link) => {
  link.addEventListener('click', () => {
    const target = link.getAttribute('data-tab-target');
    if (target) {
      const legalSection = document.getElementById('legal');
      if (legalSection) {
        switchTab(target);
        setTimeout(() => {
          legalSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 10);
      }
    }
  });
});

tocToggles.forEach((button) => {
  const target = button.getAttribute('aria-controls');
  const toc = target ? document.getElementById(target) : null;
  if (!toc) return;

  button.addEventListener('click', () => {
    const isOpen = toc.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(isOpen));
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => observer.observe(item));
window.addEventListener('scroll', setHeaderState, { passive: true });
setHeaderState();
