(function () {
  // ── Founder modal (vanilla JS, no Bootstrap) ──
  const overlay   = document.getElementById('founderOverlay');
  const openBtns  = [
    document.getElementById('openFounderModal'),
    document.getElementById('openFounderModal2')
  ];
  const closeBtn  = document.getElementById('closeFounderModal');

  function openModal()  { overlay.classList.add('open');    overlay.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
  function closeModal() { overlay.classList.remove('open'); overlay.setAttribute('aria-hidden','true');  document.body.style.overflow=''; }

  openBtns.forEach(btn => btn && btn.addEventListener('click', openModal));
  closeBtn && closeBtn.addEventListener('click', closeModal);
  overlay && overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // ── Copy pip command ──
  const copyBtn = document.getElementById('copyBtn');
  const pipCmd  = document.getElementById('pipCmd');
  const status  = document.getElementById('copyStatus');
  if (copyBtn && pipCmd) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(pipCmd.textContent.trim());
        status.textContent = '✓ Copied!';
        setTimeout(() => status.textContent = '', 1500);
      } catch(e) { status.textContent = 'Please copy manually.'; }
    });
  }

  // ── Scroll fade-in ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
})();
