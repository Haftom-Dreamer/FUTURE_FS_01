

'use strict';

/* --------- Navbar scroll effect --------- */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNavLink();
});

/* --------- Mobile menu toggle --------- */
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

/* Close mobile menu when a link is clicked */
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* --------- Active nav link on scroll --------- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNavLink() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

/* --------- Typewriter Effect --------- */
const roles = [
  'Full-Stack Developer',
  'Mobile App Developer',
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typedText');

function typeWriter() {
  if (!typedEl) return;
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    typedEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeWriter, 1800);
      return;
    }
  } else {
    typedEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeWriter, isDeleting ? 60 : 90);
}

/* --------- Scroll Reveal (Intersection Observer) --------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      /* Animate skill bars when their panel is visible */
      const fills = entry.target.querySelectorAll('.skill-fill');
      fills.forEach(fill => fill.classList.add('animated'));
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* --------- Skill Tabs --------- */
const skillTabs = document.querySelectorAll('.skill-tab');
const skillPanels = document.querySelectorAll('.skills-panel');

skillTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    skillTabs.forEach(t => t.classList.remove('active'));
    skillPanels.forEach(p => p.classList.remove('active'));

    tab.classList.add('active');
    const panel = document.getElementById(`panel-${target}`);
    if (panel) {
      panel.classList.add('active');
      /* Trigger bar animations */
      panel.querySelectorAll('.skill-fill').forEach(fill => {
        fill.classList.remove('animated');
        /* Force reflow to restart animation */
        void fill.offsetWidth;
        setTimeout(() => fill.classList.add('animated'), 50);
      });
    }
  });
});

/* Animate skill bars in the initially active panel */
function initSkillBars() {
  const activePanel = document.querySelector('.skills-panel.active');
  if (activePanel) {
    activePanel.querySelectorAll('.skill-fill').forEach(fill => {
      fill.classList.add('animated');
    });
  }
}

/* --------- Parallax orbs on mouse move --------- */
const orb1 = document.querySelector('.hero-orb-1');
const orb2 = document.querySelector('.hero-orb-2');

document.addEventListener('mousemove', (e) => {
  if (!orb1 || !orb2) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  orb1.style.transform = `translate(${x * 0.6}px, ${y * 0.6}px)`;
  orb2.style.transform = `translate(${-x * 0.4}px, ${-y * 0.4}px)`;
});

/* --------- Contact Form --------- */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = '⚠️ Please fill in all required fields.';
      formStatus.style.color = '#f97316';
      formStatus.style.display = 'block';
      return;
    }

    /* Simulate async send */
    const submitBtn = contactForm.querySelector('.form-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    setTimeout(() => {
      formStatus.textContent = '✅ Message sent! I\'ll get back to you soon.';
      formStatus.style.color = '#22c55e';
      formStatus.style.display = 'block';
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Message`;

      setTimeout(() => { formStatus.style.display = 'none'; }, 5000);
    }, 1200);
  });
}

/* --------- Smooth scroll for all anchor links --------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = navbar.offsetHeight + 16;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* --------- Project card hover parallax --------- */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    card.style.transform = `translateY(-8px) rotateX(${-y * 0.4}deg) rotateY(${x * 0.4}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
  });
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s ease, border-color 0.35s, box-shadow 0.35s';
  });
});

/* --------- Counter animation for hero stats --------- */
function animateCounter(el, target) {
  let count = 0;
  const step = Math.ceil(target / 40);
  const timer = setInterval(() => {
    count += step;
    if (count >= target) {
      count = target;
      clearInterval(timer);
    }
    el.textContent = count;
  }, 40);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.hero-stat-num');
      nums.forEach(num => {
        const text = num.innerHTML;
        const match = text.match(/(\d+)/);
        if (match) {
          const target = parseInt(match[1]);
          const suffix = text.replace(/\d+/, '');
          num.innerHTML = `<span class="count">0</span>${suffix}`;
          animateCounter(num.querySelector('.count'), target);
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

/* --------- Init --------- */
document.addEventListener('DOMContentLoaded', () => {
  /* Start typing after a short delay */
  setTimeout(typeWriter, 600);
  /* Animate hero reveals immediately */
  document.querySelectorAll('#hero .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 120);
  });
  /* Init skill bars */
  setTimeout(initSkillBars, 300);
});
