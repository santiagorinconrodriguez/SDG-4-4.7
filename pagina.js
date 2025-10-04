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
    darkToggle.textContent = '☀️';
  }
  darkToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('unal_dark', isDark ? '1' : '0');
    darkToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    darkToggle.textContent = isDark ? '☀️' : '🌙';
  });

  /* ===== Timeline toggles ===== */
  document.querySelectorAll('.timeline .week').forEach(week => {
    week.addEventListener('click', () => week.classList.toggle('active'));
  });

  /* ===== Login: shake on wrong credentials & fun move ===== */
  const loginBtn = document.getElementById('loginBtn');
  const loginReset = document.getElementById('loginReset');
  const loginBox = document.getElementById('loginBox');
  loginBtn.addEventListener('click', () => {
    const user = document.getElementById('user').value.trim();
    const pass = document.getElementById('pass').value.trim();
    const okUser = 'unal', okPass = '1234'; // demo credentials
    if (user === okUser && pass === okPass) {
      alert('Welcome to the UNAL project dashboard! 🎉');
    } else {
      // add shake class
      loginBox.classList.remove('shake'); // restart
      void loginBox.offsetWidth;
      loginBox.classList.add('shake');
      // small random horizontal nudge for extra "moving window" feel
      const dx = (Math.random() * 18 - 9).toFixed(1) + 'px';
      loginBox.style.transform = `translateX(${dx})`;
      setTimeout(() => loginBox.style.transform = 'translateX(0)', 420);
    }
  });
  loginReset.addEventListener('click', () => {
    document.getElementById('user').value = '';
    document.getElementById('pass').value = '';
  });

  /* ===== Quiz logic ===== */
  document.querySelectorAll('.quiz-buttons button').forEach(btn => {
    btn.addEventListener('click', () => {
      const ans = btn.getAttribute('data-answer');
      const result = document.getElementById('quizResult');
      if (ans === 'ignorance' || ans === 'lack-education') {
        result.textContent = 'Correct! Education and ignorance are key factors. 🎉';
        result.style.color = 'green';
      } else {
        result.textContent = 'Not quite — think about social roots such as lack of information.';
        result.style.color = '#c5192d';
      }
    });
  });

  /* ===== Modal (Register) ===== */
  const openModal = document.getElementById('openModal');
  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modalClose');
  const submitReg = document.getElementById('submitReg');
  const regMessage = document.getElementById('regMessage');

  openModal.addEventListener('click', () => {
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    regMessage.textContent = '';
  });
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  function closeModal() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  }
  submitReg.addEventListener('click', () => {
    const name = document.getElementById('regName').value.trim();
    const fac = document.getElementById('regFaculty').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    if (!name || !fac || !email) {
      regMessage.textContent = 'Please fill all fields.';
      regMessage.style.color = '#c5192d';
      return;
    }
    // Fake "submit" feedback
    regMessage.textContent = `Thanks ${name}! We sent a confirmation to ${email} (demo).`;
    regMessage.style.color = 'green';
    setTimeout(closeModal, 1200);
  });

  /* ===== Accessibility small enhancement: focus outlines visible on keyboard nav ===== */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') document.documentElement.classList.add('show-focus-outline');
  });

}); // DOMContentLoaded end
