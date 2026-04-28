/* ===================================================
   RAXIOR — Main JavaScript
   Interactivity, animations, and form handling
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Mobile Menu ----
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileLinks = mobileNav.querySelectorAll('a');

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

  // ---- Header Shrink on Scroll ----
  const header = document.getElementById('site-header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = y;
  }, { passive: true });

  // ---- Active Nav Highlight ----
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

  sections.forEach(section => navObserver.observe(section));

  // ---- Scroll Reveal Animations ----
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  // ---- Animated Counters ----
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
    counterObserver.observe(statValues[0].closest('.hero-stats'));
  }

  function animateCounters() {
    statValues.forEach(el => {
      const text = el.getAttribute('data-target');
      const isPercent = text.includes('%');
      const isSlash = text.includes('/');

      if (isSlash) {
        // "24/7" — just reveal immediately
        el.textContent = text;
        return;
      }

      const numericPart = parseInt(text.replace(/[^0-9]/g, ''));
      const suffix = text.replace(/[0-9]/g, '');
      let current = 0;
      const duration = 1500;
      const step = Math.ceil(numericPart / (duration / 16));
      const timer = setInterval(() => {
        current += step;
        if (current >= numericPart) {
          current = numericPart;
          clearInterval(timer);
        }
        el.textContent = current + suffix;
      }, 16);
    });
  }

  // ---- Hero Glow Parallax (mouse tracking) ----
  const heroGlow = document.getElementById('hero-glow');
  if (heroGlow) {
    const hero = document.querySelector('.hero');
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 40;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 40;
      heroGlow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
  }

  // ---- Contact Form ----
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      // Reset errors
      contactForm.querySelectorAll('.form-error').forEach(err => err.style.display = 'none');
      contactForm.querySelectorAll('input, textarea').forEach(inp => inp.classList.remove('error'));

      // Validate name
      const name = contactForm.querySelector('#contact-name');
      if (!name.value.trim()) {
        showError(name, 'Please enter your name');
        valid = false;
      }

      // Validate email
      const email = contactForm.querySelector('#contact-email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailRegex.test(email.value)) {
        showError(email, 'Please enter a valid email');
        valid = false;
      }

      // Validate message
      const message = contactForm.querySelector('#contact-message');
      if (!message.value.trim()) {
        showError(message, 'Please enter your message');
        valid = false;
      }

      if (valid) {
        // Show success state
        contactForm.style.display = 'none';
        formSuccess.classList.add('show');

        // Reset after 5s
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
    if (errorEl) {
      errorEl.textContent = msg;
      errorEl.style.display = 'block';
    }
  }

  // ---- Smooth scroll for all anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Testimonial drag scroll ----
  const scrollContainer = document.querySelector('.testimonials-scroll');
  if (scrollContainer) {
    let isDown = false;
    let startX, scrollLeft;

    scrollContainer.addEventListener('mousedown', (e) => {
      isDown = true;
      scrollContainer.style.cursor = 'grabbing';
      startX = e.pageX - scrollContainer.offsetLeft;
      scrollLeft = scrollContainer.scrollLeft;
    });
    scrollContainer.addEventListener('mouseleave', () => { isDown = false; scrollContainer.style.cursor = 'grab'; });
    scrollContainer.addEventListener('mouseup', () => { isDown = false; scrollContainer.style.cursor = 'grab'; });
    scrollContainer.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollContainer.offsetLeft;
      scrollContainer.scrollLeft = scrollLeft - (x - startX) * 1.5;
    });
    scrollContainer.style.cursor = 'grab';
  }

  // ---- Canvas Particle Background in Hero ----
  const canvas = document.getElementById('hero-particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animFrame;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.4 + 0.1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(135, 220, 87, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 60; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(135, 220, 87, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animFrame = requestAnimationFrame(animate);
    }
    animate();
  }
});
