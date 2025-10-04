// Wrap in DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {

  /* ===== Smooth scroll for nav links ===== */
  document.querySelectorAll('nav a').forEach(a => {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ===== Dark mode toggle (persist) ===== */
  const darkToggle = document.getElementById('darkToggle');
  const body = document.body;
  // Load preference
  if (localStorage.getItem('unal_dark') === '1') {
    body.classList.add('dark-mode');
    darkToggle.setAttribute('aria-pressed', 'true');
    darkToggle.textContent = '⚪';
  }
  darkToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('unal_dark', isDark ? '1' : '0');
    darkToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    darkToggle.textContent = isDark ? '⚪' : '⚫';
  });

  /* ===== Timeline toggles ===== */
  document.querySelectorAll('.timeline .week').forEach(week => {
    week.addEventListener('click', () => week.classList.toggle('active'));
  });

  /* ===== Quiz logic ===== */
  document.querySelectorAll('.quiz-buttons button').forEach(btn => {
    btn.addEventListener('click', () => {
      const ans = btn.getAttribute('data-answer');
      const result = document.getElementById('quizResult');
      if (ans === 'ignorance' || ans === 'lack-education') {
        result.textContent = 'Correct! Education and ignorance are key factors.';
        result.style.color = 'green';
      } else {
        result.textContent = 'Not quite — think about social roots such as lack of information.';
        result.style.color = '#c5192d';
      }
    });
  });

  /* ===== Accessibility small enhancement: focus outlines visible on keyboard nav ===== */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') document.documentElement.classList.add('show-focus-outline');
  });

}); // DOMContentLoaded end
