// code.js
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navList    = document.querySelector('.nav-list');
    menuToggle.addEventListener('click', () => {
      navList.classList.toggle('active');
    });

    // Smooth scroll + instant underline on click
    let manualNav = false;
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            manualNav = true;
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => { manualNav = false; updateSpy(); }, 600);
          }
        }
        // underline
        document.querySelectorAll('.nav-link.active').forEach(a => a.classList.remove('active'));
        this.classList.add('active');
        navList.classList.remove('active');
      });
    });

    // Sticky header & back‑to‑top
    const header    = document.querySelector('header');
    const backToTop = document.getElementById('back-to-top');
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      header.classList.toggle('sticky', y > 50);
      backToTop.classList.toggle('visible', y > 300);
      updateSpy();
    });

    // Scroll‑spy
    const sections = document.querySelectorAll('section[id]');
    function updateSpy() {
      if (manualNav) return;
      const mid = window.scrollY + window.innerHeight / 2;
      let currentId = '';
      sections.forEach(sec => {
        const top = sec.offsetTop;
        const bottom = top + sec.offsetHeight;
        if (mid >= top && mid < bottom) currentId = sec.id;
      });
      if (currentId) {
        document.querySelectorAll('.nav-link.active').forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${currentId}"]`);
        if (active) active.classList.add('active');
      }
    }
    updateSpy();

    // Dark mode
    document.getElementById('dark-mode-toggle').addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });

    // Footer year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Contact form validation
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name  = form.name.value.trim();
      const email = form.email.value.trim();
      const msg   = form.message.value.trim();
      if (name && /\S+@\S+\.\S+/.test(email) && msg.length >= 15) {
        alert(`Thank you, ${name}. We’ll be in touch shortly.`);
        form.reset();
      } else {
        alert('Please enter valid details and at least 15 characters in your message.');
      }
    });
  });
})();
