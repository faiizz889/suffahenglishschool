/* ==========================================================================
   SUFFAH ENGLISH SCHOOL — INTERACTIVE UX & PHYSICS ENGINE (script.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // 1. Dynamic Floating Glass Header on Scroll
  const updateHeader = () => {
    if (window.scrollY > 25) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // 2. Responsive Mobile/Tablet Glass Drawer
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('open');
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !expanded);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 3. Auto-Highlight Current Page in Navbar
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // 4. Apple Pro Cursor Spotlight Glow on Bento Cards
  const spotlightCards = document.querySelectorAll('.bento-card');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 5. 3D Perspective Tilt Physics on Hero Emblem Card
  const tiltCards = document.querySelectorAll('.pro-3d-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      if (window.innerWidth < 860) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / 18).toFixed(2);
      const rotateY = (x / 18).toFixed(2);
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  });

  // 6. Smooth IntersectionObserver Scroll Reveal
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach(el => revealObserver.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  // 7. Interactive Gallery Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        galleryCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || filter === category) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 8. Contact Form Interactive Feedback
  const contactForm = document.getElementById('schoolContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = document.getElementById('formStatus');
      status.style.display = 'block';
      status.textContent = 'JazakAllah Khair! Your inquiry has been received by Suffah English School.';
      contactForm.reset();
      setTimeout(() => { status.style.display = 'none'; }, 6000);
    });
  }
});