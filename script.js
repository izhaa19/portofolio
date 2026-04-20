// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const observerOptions = {
  rootMargin: '-40% 0px -55% 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(item => item.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

// ===== FADE UP ANIMATION =====
const fadeElements = document.querySelectorAll(
  '.timeline-content, .edu-card, .portfolio-card, .cert-card, .contact-card, .about-skills, .about-text'
);

fadeElements.forEach(el => el.classList.add('fade-up'));

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(el => fadeObserver.observe(el));

// ===== STAGGERED ANIMATION FOR GRIDS =====
const gridContainers = document.querySelectorAll(
  '.portfolio-grid, .cert-grid, .contact-grid'
);

gridContainers.forEach(container => {
  const children = container.querySelectorAll('.fade-up');
  const containerObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      children.forEach((child, i) => {
        setTimeout(() => {
          child.classList.add('visible');
        }, i * 100);
      });
      containerObserver.unobserve(container);
    }
  }, { threshold: 0.1 });
  containerObserver.observe(container);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== CERTIFICATE LIGHTBOX =====
function openCert(url) {
  const modal = document.getElementById('certModal');
  const frame = document.getElementById('certModalFrame');
  frame.src = url;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCert(e) {
  if (!e || e.target === document.getElementById('certModal') || e.currentTarget.classList.contains('cert-modal-close')) {
    const modal = document.getElementById('certModal');
    const frame = document.getElementById('certModalFrame');
    modal.classList.remove('active');
    frame.src = '';
    document.body.style.overflow = '';
  }
}

// Close with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCert();
});
