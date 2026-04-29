/* ===================================================
   RAXIOR — Advanced Animation Engine
   Mouse tracking, 3D tilt, magnetic effects, particles,
   text splitting, parallax, and mobile touch effects
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ======== GLOBAL MOUSE POSITION ========
  const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const smoothMouse = { x: mouse.x, y: mouse.y };
  const isMobile = window.matchMedia('(max-width: 1024px)').matches || 'ontouchstart' in window;

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  // Smooth mouse lerp loop
  function lerp(a, b, t) { return a + (b - a) * t; }

  function updateSmoothMouse() {
    smoothMouse.x = lerp(smoothMouse.x, mouse.x, 0.08);
    smoothMouse.y = lerp(smoothMouse.y, mouse.y, 0.08);
    requestAnimationFrame(updateSmoothMouse);
  }
  updateSmoothMouse();

  // ======== MAGNETIC BUTTONS ========
  document.querySelectorAll('.btn, .social-link, .step-circle').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => { btn.style.transition = ''; }, 500);
    });
  });

  // ======== 3D TILT CARDS ========
  document.querySelectorAll('.service-card, .testimonial-card, .stat-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - y) * 20;
      const rotateY = (x - 0.5) * 20;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      // Move the internal glow
      card.style.setProperty('--glow-x', `${x * 100}%`);
      card.style.setProperty('--glow-y', `${y * 100}%`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => { card.style.transition = ''; }, 600);
    });
  });

  // ======== SPLIT TEXT ANIMATION ========
  document.querySelectorAll('.split-text').forEach(el => {
    const text = el.textContent;
    el.innerHTML = '';
    el.setAttribute('aria-label', text);
    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.className = 'char';
      span.style.transitionDelay = `${i * 0.03}s`;
      el.appendChild(span);
    });
  });

  // ======== HERO TEXT PARALLAX ON MOUSE ========
  const heroContent = document.querySelector('.hero-content');
  if (heroContent && !isMobile) {
    const layers = heroContent.querySelectorAll('.hero-chip, h1, .subtitle, .hero-buttons, .hero-stats');
    function updateHeroParallax() {
      const cx = (smoothMouse.x / window.innerWidth - 0.5);
      const cy = (smoothMouse.y / window.innerHeight - 0.5);
      layers.forEach((layer, i) => {
        const depth = (i + 1) * 4;
        layer.style.transform = `translate(${cx * depth}px, ${cy * depth}px)`;
      });
      requestAnimationFrame(updateHeroParallax);
    }
    updateHeroParallax();
  }

  // ======== HERO GLOW MOUSE TRACKING ========
  const heroGlow = document.getElementById('hero-glow');
  if (heroGlow && !isMobile) {
    function updateGlow() {
      heroGlow.style.transform = `translate(${smoothMouse.x - window.innerWidth / 2}px, ${smoothMouse.y - window.innerHeight / 2}px)`;
      requestAnimationFrame(updateGlow);
    }
    updateGlow();
  }

  // ======== GLOBAL MOUSE SPOTLIGHT ========
  if (!isMobile) {
    const spotlight = document.getElementById('mouse-spotlight');
    if (spotlight) {
      function updateSpotlight() {
        spotlight.style.transform = `translate(${smoothMouse.x}px, ${smoothMouse.y}px)`;
        requestAnimationFrame(updateSpotlight);
      }
      updateSpotlight();
    }
  }

  // ======== ENHANCED PARTICLE NETWORK ========
  const canvas = document.getElementById('hero-particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = isMobile ? 40 : 80;
    const mouseRadius = 150;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseSize = Math.random() * 2 + 0.5;
        this.size = this.baseSize;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.hue = Math.random() * 30 + 90; // green spectrum
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Mouse repulsion
        if (!isMobile) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRadius) {
            const force = (mouseRadius - dist) / mouseRadius;
            this.x -= dx * force * 0.03;
            this.y -= dy * force * 0.03;
            this.size = this.baseSize + force * 3;
          } else {
            this.size = lerp(this.size, this.baseSize, 0.05);
          }
        }

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 80%, 55%, ${this.opacity})`;
        ctx.fill();
        // Glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 80%, 55%, ${this.opacity * 0.1})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => { p.update(); p.draw(); });

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const opacity = 0.08 * (1 - dist / 150);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(135, 220, 87, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Mouse connection lines
      if (!isMobile) {
        particles.forEach(p => {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRadius * 1.5) {
            const opacity = 0.15 * (1 - dist / (mouseRadius * 1.5));
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(109, 191, 62, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      }

      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // ======== SCROLL-BASED PARALLAX FOR ALL SECTIONS ========
  const parallaxElements = document.querySelectorAll('.about-image-wrap, .cta-watermark, .hero-watermark');
  function updateScrollParallax() {
    const scrollY = window.scrollY;
    parallaxElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const speed = 0.1;
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.style.transform = `translateY(${(rect.top - window.innerHeight / 2) * speed}px)`;
      }
    });
  }
  window.addEventListener('scroll', updateScrollParallax, { passive: true });

  // ======== HORIZONTAL SCROLL PROGRESS BAR ========
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      progressBar.style.transform = `scaleX(${scrolled})`;
    }, { passive: true });
  }

  // ======== MOBILE MENU ========
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = mobileNav ? mobileNav.querySelectorAll('a') : [];

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ======== HEADER SHRINK ========
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }, { passive: true });

  // ======== ACTIVE NAV HIGHLIGHT ========
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.header-nav a, .mobile-nav a');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' });
  sections.forEach(s => navObserver.observe(s));

  // ======== SCROLL REVEAL WITH STAGGER ========
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);

        // Also trigger split-text children
        entry.target.querySelectorAll('.split-text').forEach(st => st.classList.add('animate'));
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  // Standalone split-text reveals
  const splitObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        splitObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.split-text').forEach(el => splitObserver.observe(el));

  // ======== ANIMATED COUNTERS ========
  const statValues = document.querySelectorAll('.stat-value');
  let countersAnimated = false;
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        animateCounters();
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  if (statValues.length > 0) {
    const statsContainer = statValues[0].closest('.hero-stats');
    if (statsContainer) counterObserver.observe(statsContainer);
  }

  function animateCounters() {
    statValues.forEach(el => {
      const text = el.getAttribute('data-target');
      if (text.includes('/')) { el.textContent = text; return; }
      const numericPart = parseInt(text.replace(/[^0-9]/g, ''));
      const suffix = text.replace(/[0-9]/g, '');
      let current = 0;
      const duration = 2000;
      const startTime = performance.now();

      function tick(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutExpo
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        current = Math.round(numericPart * eased);
        el.textContent = current + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  // ======== WORK ITEMS — IMAGE PARALLAX ON HOVER ========
  document.querySelectorAll('.work-item').forEach(item => {
    const img = item.querySelector('.work-thumb img');
    if (!img) return;
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      img.style.transform = `scale(1.1) translate(${x * -20}px, ${y * -20}px)`;
    });
    item.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
      img.style.transition = 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => { img.style.transition = ''; }, 700);
    });
  });

  // ======== CONTACT FORM ========
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      contactForm.querySelectorAll('.form-error').forEach(err => err.style.display = 'none');
      contactForm.querySelectorAll('input, textarea').forEach(inp => inp.classList.remove('error'));

      const name = contactForm.querySelector('#contact-name');
      if (!name.value.trim()) { showError(name, 'Please enter your name'); valid = false; }
      const email = contactForm.querySelector('#contact-email');
      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { showError(email, 'Please enter a valid email'); valid = false; }
      const message = contactForm.querySelector('#contact-message');
      if (!message.value.trim()) { showError(message, 'Please enter your message'); valid = false; }

      if (valid) {
        contactForm.style.display = 'none';
        formSuccess.classList.add('show');
        setTimeout(() => {
          contactForm.reset();
          contactForm.style.display = 'flex';
          formSuccess.classList.remove('show');
        }, 5000);
      }
    });
  }

  function showError(input, msg) {
    input.classList.add('error');
    const errorEl = input.parentElement.querySelector('.form-error');
    if (errorEl) { errorEl.textContent = msg; errorEl.style.display = 'block'; }
  }

  // ======== SMOOTH SCROLL ========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ======== TESTIMONIAL DRAG SCROLL ========
  const scrollContainer = document.querySelector('.testimonials-scroll');
  if (scrollContainer) {
    let isDown = false, startX, scrollLeft;
    scrollContainer.addEventListener('mousedown', (e) => { isDown = true; scrollContainer.style.cursor = 'grabbing'; startX = e.pageX - scrollContainer.offsetLeft; scrollLeft = scrollContainer.scrollLeft; });
    scrollContainer.addEventListener('mouseleave', () => { isDown = false; scrollContainer.style.cursor = 'grab'; });
    scrollContainer.addEventListener('mouseup', () => { isDown = false; scrollContainer.style.cursor = 'grab'; });
    scrollContainer.addEventListener('mousemove', (e) => { if (!isDown) return; e.preventDefault(); scrollContainer.scrollLeft = scrollLeft - (e.pageX - scrollContainer.offsetLeft - startX) * 1.5; });
    scrollContainer.style.cursor = 'grab';
  }

  // ======== MOBILE TILT (GYROSCOPE) ========
  if (isMobile && window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (e) => {
      const tiltX = e.gamma ? e.gamma / 45 : 0; // left-right
      const tiltY = e.beta ? (e.beta - 45) / 45 : 0; // front-back
      document.querySelectorAll('.service-card, .stat-card').forEach(card => {
        card.style.transform = `perspective(800px) rotateY(${tiltX * 8}deg) rotateX(${-tiltY * 8}deg)`;
      });
      // Hero parallax on gyro
      const heroH1 = document.querySelector('.hero h1');
      if (heroH1) {
        heroH1.style.transform = `translate(${tiltX * 10}px, ${tiltY * 10}px)`;
      }
    }, { passive: true });
  }

  // ======== SECTION BORDER GLOW ON SCROLL ========
  document.querySelectorAll('.service-card').forEach(card => {
    const glowObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          card.classList.add('border-glow-animate');
        }
      });
    }, { threshold: 0.5 });
    glowObserver.observe(card);
  });

  // ======== TYPING EFFECT FOR HERO CHIP ========
  const heroChipText = document.querySelector('.hero-chip .text-label-mono');
  if (heroChipText) {
    const phrases = ['Future-Ready Systems', 'AI-Powered Solutions', 'Cinematic Engineering', 'Scale Without Limits'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const current = phrases[phraseIndex];
      if (isDeleting) {
        heroChipText.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        heroChipText.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }

      let delay = isDeleting ? 30 : 60;

      if (!isDeleting && charIndex === current.length) {
        delay = 2500;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 500;
      }

      setTimeout(typeEffect, delay);
    }
    setTimeout(typeEffect, 2000);
  }

  // ======== FLOATING ORBS BACKGROUND (Multiple sections) ========
  document.querySelectorAll('.section-dark, .contact-section').forEach(section => {
    for (let i = 0; i < 3; i++) {
      const orb = document.createElement('div');
      orb.className = 'floating-orb';
      orb.style.cssText = `
        position: absolute;
        width: ${200 + Math.random() * 300}px;
        height: ${200 + Math.random() * 300}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(135,220,87,${0.03 + Math.random() * 0.04}) 0%, transparent 70%);
        filter: blur(${40 + Math.random() * 40}px);
        pointer-events: none;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: floatOrb ${10 + Math.random() * 15}s ease-in-out infinite alternate;
        animation-delay: ${-Math.random() * 10}s;
      `;
      section.style.position = 'relative';
      section.style.overflow = 'hidden';
      section.appendChild(orb);
    }
  });

  // ======== MARQUEE SPEED ON HOVER ========
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    const marqueeWrap = marqueeTrack.closest('.marquee-wrap');
    marqueeWrap.addEventListener('mouseenter', () => {
      marqueeTrack.style.animationDuration = '40s';
    });
    marqueeWrap.addEventListener('mouseleave', () => {
      marqueeTrack.style.animationDuration = '20s';
    });
  }

  // ======== TECH STACK — SCRAMBLE TEXT ON HOVER ========
  document.querySelectorAll('.tech-stack-logos span').forEach(span => {
    const original = span.textContent;
    const chars = '!@#$%^&*()_+-=<>?/{}[]|~';
    let interval;

    span.addEventListener('mouseenter', () => {
      let iterations = 0;
      clearInterval(interval);
      interval = setInterval(() => {
        span.textContent = original
          .split('')
          .map((char, idx) => {
            if (idx < iterations) return original[idx];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
        if (iterations >= original.length) clearInterval(interval);
        iterations += 1 / 2;
      }, 30);
    });

    span.addEventListener('mouseleave', () => {
      clearInterval(interval);
      span.textContent = original;
    });
  });

  // ======== SMOOTH SECTION BACKGROUND SHIFT ========
  const bgSections = document.querySelectorAll('section');
  const bgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
      } else {
        entry.target.classList.remove('section-visible');
      }
    });
  }, { threshold: 0.1 });
  bgSections.forEach(s => bgObserver.observe(s));

  // ======== RIPPLE EFFECT ON CLICK ========
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.className = 'btn-ripple';
      const rect = this.getBoundingClientRect();
      ripple.style.left = (e.clientX - rect.left) + 'px';
      ripple.style.top = (e.clientY - rect.top) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 800);
    });
  });

});
