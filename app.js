const body = document.body;
const themeToggle = document.querySelector('#theme-toggle');
const menuToggle = document.querySelector('#menu-toggle');
const nav = document.querySelector('.main-nav');
const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
const copyEmail = document.querySelector('#copy-email');

const savedTheme = localStorage.getItem('perfil-theme');
if (savedTheme === 'dark') body.classList.add('dark');

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  localStorage.setItem('perfil-theme', body.classList.contains('dark') ? 'dark' : 'light');
});

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    projectCards.forEach((card) => {
      const shouldShow = filter === 'all' || card.dataset.category === filter;
      card.hidden = !shouldShow;
    });
  });
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  formStatus.textContent = 'Mensaje preparado. Te responderé muy pronto.';
  contactForm.reset();
});

copyEmail.addEventListener('click', async (event) => {
  event.preventDefault();
  const email = 'diego.cabezas.docente@gmail.com';
  try {
    await navigator.clipboard.writeText(email);
    copyEmail.innerHTML = 'Email copiado <span>✓</span>';
    setTimeout(() => { copyEmail.innerHTML = `${email} <span>↗</span>`; }, 2200);
  } catch {
    window.location.href = `mailto:${email}`;
  }
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach((section) => sectionObserver.observe(section));

const cursorGlow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (event) => {
  cursorGlow.style.transform = `translate(${event.clientX - 100}px, ${event.clientY - 100}px)`;
});
