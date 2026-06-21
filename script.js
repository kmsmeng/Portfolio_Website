document.addEventListener('DOMContentLoaded', () => {

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const navButtons = document.querySelectorAll('[data-nav]');
  const views = document.querySelectorAll('.view');

  function showView(name) {
    views.forEach(v => v.classList.toggle('active', v.id === 'view-' + name));
    navButtons.forEach(btn => {
      if (btn.classList.contains('path')) {
        btn.classList.toggle('active', btn.dataset.nav === name);
      }
    });
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    history.replaceState(null, '', '#/' + (name === 'about' ? '' : name));
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showView(btn.dataset.nav);
    });
  });

  const initial = (location.hash || '').replace('#/', '');
  const valid = ['about', 'work', 'research', 'interests', 'resume', 'contact'];
  showView(valid.includes(initial) ? initial : 'about');

});