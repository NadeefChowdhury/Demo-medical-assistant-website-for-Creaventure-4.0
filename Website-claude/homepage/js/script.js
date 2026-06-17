// ── script.js ──────────────────────────────────────────────
// Shared JS for the Healthcare Dashboard

document.addEventListener('DOMContentLoaded', () => {

  // ── Mobile sidebar toggle ───────────────────────────────
  const hamburger = document.querySelector('.hamburger');
  const sidebar   = document.querySelector('.sidebar');
  const overlay   = document.querySelector('.overlay');

  if (hamburger && sidebar && overlay) {
    hamburger.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    });
  }

  // ── Medicine check toggle ───────────────────────────────
  document.querySelectorAll('.check-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.medicine-item');
      if (item) {
        item.classList.toggle('taken');
        const icon = btn.querySelector('i');
        if (icon) {
          icon.className = item.classList.contains('taken')
            ? 'fa-solid fa-check'
            : 'fa-regular fa-circle';
        }
        updateMedicineProgress();
      }
    });
  });

  function updateMedicineProgress() {
    const total  = document.querySelectorAll('.medicine-item').length;
    const taken  = document.querySelectorAll('.medicine-item.taken').length;
    const remain = total - taken;

    const bar   = document.querySelector('.medicine-progress-bar .fill');
    const badge = document.querySelector('.taken-badge');
    const label = document.querySelector('.remaining-label');

    if (bar)   bar.style.width = total ? `${(taken / total) * 100}%` : '0%';
    if (badge) badge.textContent = `${taken}/${total} taken`;
    if (label) label.textContent = `${remain} remaining`;
  }

  // ── Live date in navbar ──────────────────────────────────
  const datePill = document.querySelector('.date-pill');
  if (datePill) {
    const now = new Date();
    const opts = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
    datePill.textContent = now.toLocaleDateString('en-GB', opts).replace(',', '');
  }

  // ── Active nav highlight ─────────────────────────────────
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item').forEach(item => {
    const link = item.getAttribute('data-page');
    if (link && page.includes(link)) {
      item.classList.add('active');
    }
  });
});
