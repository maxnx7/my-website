(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navList    = document.querySelector('.nav-list');
    menuToggle.addEventListener('click', () => {
      navList.classList.toggle('active');
    });

    // Smooth scroll + scroll‑spy
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
        navList.classList.remove('active');
      });
    });

    // Highlight active link on scroll
    const header    = document.querySelector('header');
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      // Sticky header
      header.classList.toggle('sticky', scrollY > 50);
      // Back‑to‑top
      backToTop.classList.toggle('visible', scrollY > 300);
      // Scroll‑spy
      document.querySelectorAll('section[id]').forEach(section => {
        const top    = section.offsetTop - 120;
        const bottom = top + section.offsetHeight;
        const id     = section.id;
        if (scrollY >= top && scrollY < bottom) {
          document.querySelector('.nav-link.active').classList.remove('active');
          document.querySelector(`.nav-link[href="#${id}"]`).classList.add('active');
        }
      });
    });

    // Back‑to‑top click
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Dark mode toggle
    const darkToggle = document.getElementById('dark-mode-toggle');
    darkToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });

    // Current year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Contact form validation
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name  = form.name.value.trim();
      const email = form.email.value.trim();
      const msg   = form.message.value.trim();
      if (name && /\S+@\S+\.\S+/.test(email) && msg.length >= 15) {
        alert(`Thank you, ${name}. We’ll review your enquiry and be in touch shortly.`);
        form.reset();
      } else {
        alert('Please provide a valid email and at least 15 characters in your message.');
      }
    });
  });
})();
