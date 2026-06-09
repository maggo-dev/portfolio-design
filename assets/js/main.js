'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================
  // Custom Cursor with Lerp (smooth following)
  // =========================================================
  const cursor = document.getElementById('cursor');
  const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let cx = mx, cy = my;

  if (cursor && hasHover) {
    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
    }, { passive: true });

    function renderCursor() {
      cx += (mx - cx) * 0.15;
      cy += (my - cy) * 0.15;
      cursor.style.transform = `translate(calc(${cx}px - 50%), calc(${cy}px - 50%))`;
      requestAnimationFrame(renderCursor);
    }

    requestAnimationFrame(renderCursor);

    // Hover states for cursor
    document.querySelectorAll('.hover-target').forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('active'), { passive: true });
      el.addEventListener('mouseleave', () => cursor.classList.remove('active'), { passive: true });
    });
  }

  // =========================================================
  // Header: Auto-hide on scroll down, show on scroll up
  // =========================================================
  const header = document.getElementById('main-header');
  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateHeader() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Hide header on scroll down, show on scroll up
    if (currentScrollY > lastScrollY && currentScrollY > 120) {
      header?.classList.add('hidden');
    } else {
      header?.classList.remove('hidden');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  // =========================================================
  // Mobile Menu Toggle
  // =========================================================
  const menuToggle = document.getElementById('menu-toggle');
  const headerNav = document.getElementById('header-nav');

  if (menuToggle && headerNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = headerNav.classList.toggle('open');
      menuToggle.textContent = isOpen ? 'close' : 'menu';
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when clicking a nav link
    headerNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        headerNav.classList.remove('open');
        menuToggle.textContent = 'menu';
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // =========================================================
  // Smooth Scroll for Anchor Links
  // =========================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header?.offsetHeight || 60;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // =========================================================
  // Intersection Observer for Scroll Reveal Animations
  // =========================================================
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
      observer.observe(el);
    });
  } else {
    // Immediately show all reveal elements when reduced motion preferred
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('visible');
    });
  }

  // =========================================================
  // Loader Blob — Smooth Mouse Follow
  // =========================================================
  const loaderCard = document.querySelector('.loader-card');
  const loader = document.querySelector('.loader-card .loader');

  if (loaderCard && loader && hasHover) {
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let isHovering = false;
    const maxOffset = 25;
    const lerpFactor = 0.08;

    loaderCard.addEventListener('mousemove', (e) => {
      const rect = loaderCard.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      targetX = nx * maxOffset;
      targetY = ny * maxOffset;
      isHovering = true;
    }, { passive: true });

    loaderCard.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
      isHovering = false;
    }, { passive: true });

    function animateLoader() {
      currentX += (targetX - currentX) * lerpFactor;
      currentY += (targetY - currentY) * lerpFactor;

      // Snap to 0 when very close (avoids infinite micro-updates)
      if (!isHovering && Math.abs(currentX) < 0.1 && Math.abs(currentY) < 0.1) {
        currentX = 0;
        currentY = 0;
      }

      loader.style.transform = `translate(${currentX}px, ${currentY}px)`;
      requestAnimationFrame(animateLoader);
    }

    requestAnimationFrame(animateLoader);
  }
});
