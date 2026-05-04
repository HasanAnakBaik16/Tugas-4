/* ===================================
   AutoCar — script.js
   =================================== */

// ── 1. Navbar scroll effect ──────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ── 2. Hamburger menu ────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  const isOpen = navLinks.classList.contains('open');
  spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)'  : '';
  spans[1].style.opacity   = isOpen ? '0' : '1';
  spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '1';
    });
  });
});

// ── 3. Active nav link on scroll ─────────────────────────
const sections = document.querySelectorAll('section[id], footer[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
    });
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObs.observe(s));

// ── 4. Scroll reveal ─────────────────────────────────────
const revEls = document.querySelectorAll('.reveal, .reveal-right');
const revObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('visible');
    revObs.unobserve(e.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
revEls.forEach(el => revObs.observe(el));

// ── 5. Filter tabs ────────────────────────────────────────
const tabs  = document.querySelectorAll('.tab');
const cards = document.querySelectorAll('.car-card');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.dataset.filter;
    cards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      if (match) {
        card.classList.remove('hidden');
        card.style.animation = 'cardIn 0.35s ease both';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ── 6. Car card hover — red glow pulse ───────────────────
cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = '0 8px 40px rgba(192,57,43,0.22)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = '';
  });
});

// ── 7. Contact form ───────────────────────────────────────
const form  = document.getElementById('contactForm');
const toast = document.getElementById('toast');
let toastTimer;

form.addEventListener('submit', e => {
  e.preventDefault();
  showToast('✓ Message sent successfully!');
  form.reset();
});

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ── 8. Star rating interaction ───────────────────────────
document.querySelectorAll('.car-card').forEach(card => {
  const stars = card.querySelectorAll('.star');
  stars.forEach((star, i) => {
    star.style.cursor = 'pointer';
    star.addEventListener('click', () => {
      stars.forEach((s, j) => {
        s.classList.toggle('filled', j <= i);
      });
    });
    star.addEventListener('mouseenter', () => {
      stars.forEach((s, j) => s.style.color = j <= i ? '#f39c12' : '');
    });
    star.addEventListener('mouseleave', () => {
      stars.forEach(s => s.style.color = '');
    });
  });
});

// ── 9. Parallax subtle on hero ───────────────────────────
const heroCarWrap = document.querySelector('.hero-car-wrap');
if (heroCarWrap) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroCarWrap.style.transform = `translateY(${scrolled * 0.12}px)`;
    }
  }, { passive: true });
}
