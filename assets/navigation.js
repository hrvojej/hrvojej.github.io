(() => {
  const root = document.documentElement;
  const menu = document.querySelector('.project-menu');
  if (!menu) return;
  const summary = menu.querySelector('summary');
  let framePending = false;

  function updateHeader() {
    const compact = root.classList.contains('header-is-compact');
    if (window.scrollY > 72) root.classList.add('header-is-compact');
    else if (window.scrollY <= 20 && compact) root.classList.remove('header-is-compact');
    framePending = false;
  }

  window.addEventListener('scroll', () => {
    if (!framePending) {
      framePending = true;
      window.requestAnimationFrame(updateHeader);
    }
  }, { passive: true });
  window.addEventListener('pageshow', updateHeader);
  updateHeader();

  document.addEventListener('click', (event) => {
    if (menu.open && !menu.contains(event.target)) menu.open = false;
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      summary.focus();
      event.preventDefault();
    }
  });
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) menu.open = false;
  });
  menu.addEventListener('focusout', (event) => {
    if (event.relatedTarget && !menu.contains(event.relatedTarget)) menu.open = false;
  });
})();
