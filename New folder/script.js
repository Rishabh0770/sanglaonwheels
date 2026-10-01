/* ============================================================
   Sangla On Wheels — script.js (shared across all pages)
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Year in footer ── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Sticky navbar background on scroll ── */
  const nav = document.getElementById('siteNav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ── Mobile menu ── */
  const burger = document.getElementById('navBurger');
  const mobilePanel = document.getElementById('navMobile');
  if (burger && mobilePanel) {
    burger.addEventListener('click', () => {
      const open = mobilePanel.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mobilePanel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mobilePanel.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    }));
  }

  /* ── Scroll reveal ── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  }

  /* ── Generic modal open/close (data-modal-target / data-modal-close) ── */
  document.querySelectorAll('[data-modal-target]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = document.getElementById(btn.getAttribute('data-modal-target'));
      if (modal) { modal.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
    });
  });
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    const close = () => { modal.classList.remove('is-open'); document.body.style.overflow = ''; };
    modal.querySelectorAll('[data-modal-close]').forEach(btn => btn.addEventListener('click', close));
    modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('is-open')) close(); });
  });

  /* ── Enquiry / contact / callback form UX (front-end demo, no backend yet) ── */
  document.querySelectorAll('form[data-demo-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const successId = form.getAttribute('data-success-target');
      const successEl = successId ? document.getElementById(successId) : null;
      if (successEl) {
        successEl.classList.add('show');
        setTimeout(() => successEl.classList.remove('show'), 6000);
      }
      form.reset();
      const modal = form.closest('.modal-overlay');
      if (modal) setTimeout(() => { modal.classList.remove('is-open'); document.body.style.overflow = ''; }, 900);
    });
  });

});

/* ============================================================
   WHATSAPP QUICK LINK HELPER
   ============================================================ */
function openWhatsApp(message) {
  const phone = '918894101001';
  const msg = message || "Hi, I'd like to know more about your Himalayan travel packages.";
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
}