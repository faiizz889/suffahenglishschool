/* ==========================================================================
   SUFFAH ENGLISH SCHOOL — ZERO-JUMP NAVBAR, CINEMA VIDEO & GALLERY (script.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');
  const slidingPill = document.getElementById('navSlidingPill');

  // ZERO-JUMP ACTIVE LINK & SLIDING PILL ENGINE
  const rawPage = window.location.pathname.split('/').pop();
  const currentPage = (!rawPage || rawPage === '') ? 'index.html' : rawPage;

  let activeLink = null;

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
      activeLink = link;
    } else {
      link.classList.remove('active');
    }
  });

  if (!activeLink && navLinks.length > 0) {
    activeLink = navLinks[0];
    activeLink.classList.add('active');
  }

  const movePillTo = (targetLink, immediate = false) => {
    if (!slidingPill || !targetLink || window.innerWidth <= 860) return;
    const menuRect = navMenu.getBoundingClientRect();
    const linkRect = targetLink.getBoundingClientRect();
    const leftOffset = linkRect.left - menuRect.left;

    if (immediate) {
      slidingPill.style.transition = 'none';
    } else {
      slidingPill.style.transition = 'left 0.25s cubic-bezier(0.16, 1, 0.3, 1), width 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease';
    }

    slidingPill.style.width = `${linkRect.width}px`;
    slidingPill.style.left = `${leftOffset}px`;
    slidingPill.classList.add('ready');
    navMenu.classList.add('pill-enabled');

    if (immediate) {
      requestAnimationFrame(() => {
        slidingPill.style.transition = '';
      });
    }
  };

  movePillTo(activeLink, true);
  window.addEventListener('resize', () => movePillTo(activeLink, true));

  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => movePillTo(link, false));
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      activeLink = link;
      movePillTo(link, false);
    });
  });

  if (navMenu) {
    navMenu.addEventListener('mouseleave', () => movePillTo(activeLink, false));
  }

  // Position pill on the true active tab immediately without jumping from Home
  movePillTo(activeLink, true);
  window.addEventListener('resize', () => movePillTo(activeLink, true));

  // Smooth hover & instant click feedback
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => movePillTo(link, false));
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      activeLink = link;
      movePillTo(link, false);
    });
  });

  if (navMenu) {
    navMenu.addEventListener('mouseleave', () => movePillTo(activeLink, false));
  }

  // 2. Sticky Header Scroll State
  const updateHeader = () => {
    if (!header) return;
    if (window.scrollY > 25) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // 3. Mobile / Tablet Hamburger Drawer
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

  // 4. HERO YOUTUBE CINEMA MODAL (Plays Full Video with Sound on Click)
  const YOUTUBE_VIDEO_ID = 'ec_1Gl5H5m4';
  const archPlayTrigger = document.getElementById('archPlayTrigger');
  const heroWatchBtn = document.getElementById('heroWatchBtn');
  const cinemaModal = document.getElementById('videoCinemaModal');
  const cinemaCloseBtn = document.getElementById('cinemaCloseBtn');
  const cinemaBackdrop = document.getElementById('cinemaBackdrop');
  const cinemaIframeContainer = document.getElementById('cinemaIframeContainer');

  const openCinemaModal = () => {
    if (!cinemaModal || !cinemaIframeContainer) return;
    cinemaIframeContainer.innerHTML = `
      <iframe
        src="https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1&si=D7wruvLHnaGHt35M"
        title="Suffah English School Official Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen>
      </iframe>
    `;
    cinemaModal.classList.add('open');
    cinemaModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeCinemaModal = () => {
    if (!cinemaModal || !cinemaIframeContainer) return;
    cinemaModal.classList.remove('open');
    cinemaModal.setAttribute('aria-hidden', 'true');
    cinemaIframeContainer.innerHTML = ''; // Stops video audio immediately on close
    document.body.style.overflow = '';
  };

  if (archPlayTrigger) {
    archPlayTrigger.addEventListener('click', openCinemaModal);
    archPlayTrigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCinemaModal();
      }
    });
  }
  if (heroWatchBtn) heroWatchBtn.addEventListener('click', openCinemaModal);
  if (cinemaCloseBtn) cinemaCloseBtn.addEventListener('click', closeCinemaModal);
  if (cinemaBackdrop) cinemaBackdrop.addEventListener('click', closeCinemaModal);

  // 5. Scroll Reveal Animation Observer
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    reveals.forEach(el => revealObserver.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  // 6. Auto-Rotating Hero Carousel + Folder Filter + Popup Lightbox (for gallery.html)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const masonryItems = document.querySelectorAll('.masonry-item');
  const heroCarouselTrack = document.getElementById('heroAutoCarousel');
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxStage = document.getElementById('lightboxStage');
  const lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(mediaEl) {
    if (!lightbox || !lightboxStage) return;
    lightboxStage.innerHTML = '';
    const fullMedia = mediaEl.cloneNode(true);
    if (fullMedia.tagName.toLowerCase() === 'video') {
      fullMedia.controls = true;
      fullMedia.autoplay = true;
      fullMedia.muted = false;
    }
    lightboxStage.appendChild(fullMedia);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  }

  if (heroCarouselTrack && masonryItems.length > 0) {
    const buildSlides = () => {
      masonryItems.forEach(item => {
        const media = item.querySelector('img, video');
        if (!media) return;
        const slide = document.createElement('div');
        slide.className = 'hero-slide-card';
        const clone = media.cloneNode(true);
        if (clone.tagName.toLowerCase() === 'video') {
          clone.muted = true;
          clone.loop = true;
          clone.playsInline = true;
          clone.autoplay = true;
        }
        slide.appendChild(clone);
        slide.addEventListener('click', () => openLightbox(media));
        heroCarouselTrack.appendChild(slide);
      });
    };
    buildSlides();
    buildSlides();
  }

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterValue = btn.getAttribute('data-filter');

        masonryItems.forEach(item => {
          const itemCategory = item.getAttribute('data-category');
          item.classList.remove('filter-pop');
          if (filterValue === 'all' || filterValue === itemCategory) {
            item.style.display = 'block';
            void item.offsetWidth;
            item.classList.add('filter-pop');
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  masonryItems.forEach(item => {
    item.addEventListener('click', () => {
      const media = item.querySelector('img, video');
      if (media) openLightbox(media);
    });
  });

  if (lightbox && lightboxClose) {
    const closeBox = () => {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      lightboxStage.innerHTML = '';
    };
    lightboxClose.addEventListener('click', closeBox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeBox();
    });
  }

  // Global Escape Key Handler for Modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCinemaModal();
      if (lightbox && lightbox.classList.contains('open')) {
        lightbox.classList.remove('open');
        lightboxStage.innerHTML = '';
      }
    }
  });

  // 7. Contact Form Submission Feedback
  const contactForm = document.getElementById('schoolContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = document.getElementById('formStatus');
      if (status) {
        status.style.display = 'flex';
        contactForm.reset();
        setTimeout(() => { status.style.display = 'none'; }, 6000);
      }
    });
  }
});