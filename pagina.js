document.addEventListener('DOMContentLoaded', () => {

  /* ===== Smooth scroll for nav links ===== */
  document.querySelectorAll('nav a').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ===== Dark mode toggle (persist) ===== */
  const darkToggle = document.getElementById('darkToggle');
  const body = document.body;
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
  const quizQuestions = [
    { question: "What is the main basis of stereotypes?", options: [
      { text: "Ignorance", correct: true },
      { text: "Lack of education", correct: true },
      { text: "Malice", correct: false }
    ]},
    { question: "What does SDG 4.7 focus on?", options: [
      { text: "Access to free healthcare", correct: false },
      { text: "Education for sustainable development", correct: true },
      { text: "Reducing pollution", correct: false }
    ]},
    { question: "Which skill is promoted by ESD?", options: [
      { text: "Critical thinking", correct: true },
      { text: "Speed reading", correct: false },
      { text: "Physical fitness", correct: false }
    ]},
    { question: "Why is ESD important in universities?", options: [
      { text: "To prepare students for sustainability challenges", correct: true },
      { text: "To increase tuition fees", correct: false },
      { text: "To reduce class sizes", correct: false }
    ]},
    { question: "Which of these is part of SDG 4.7 targets?", options: [
      { text: "Gender equality", correct: true },
      { text: "Building sports stadiums", correct: false },
      { text: "Tax reform", correct: false }
    ]},
    { question: "How does education contribute to sustainable development?", options: [
      { text: "Equips learners with skills and knowledge to act responsibly", correct: true },
      { text: "Only provides certificates", correct: false },
      { text: "Focuses solely on memorization", correct: false }
    ]},
    { question: "Which approach does ESD promote?", options: [
      { text: "Holistic approach covering cognitive, socio-emotional, and behavioral skills", correct: true },
      { text: "Only lectures and exams", correct: false },
      { text: "One-size-fits-all teaching", correct: false }
    ]}
  ];

  let currentQuestion = 0;
  const quizQuestionEl = document.getElementById('quiz-question');
  const quizButtonsEl = document.getElementById('quiz-buttons');
  const quizResultEl = document.getElementById('quizResult');
  const nextBtn = document.getElementById('nextQuestion');

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function showQuestion(index) {
    const q = quizQuestions[index];
    quizQuestionEl.textContent = `Question ${index + 1}/${quizQuestions.length}: ${q.question}`;
    quizButtonsEl.innerHTML = '';
    quizResultEl.textContent = '';
    nextBtn.style.display = 'none';

    const shuffledOptions = shuffleArray([...q.options]);
    shuffledOptions.forEach(opt => {
      const btn = document.createElement('button');
      btn.textContent = opt.text;
      btn.addEventListener('click', () => checkAnswer(opt.correct));
      quizButtonsEl.appendChild(btn);
    });
  }

  function checkAnswer(isCorrect) {
    quizResultEl.textContent = isCorrect ? 'Correct!' : 'Incorrect, think about SDG 4.7 principles.';
    quizResultEl.style.color = isCorrect ? 'green' : '#c5192d';
    nextBtn.style.display = 'inline-block';
  }

  nextBtn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
      showQuestion(currentQuestion);
    } else {
      quizQuestionEl.textContent = "Quiz completed! Well done!";
      quizButtonsEl.innerHTML = '';
      nextBtn.style.display = 'none';
      quizResultEl.textContent = '';
    }
  });

  showQuestion(currentQuestion);

  /* ===== Accessibility: focus outline visible on keyboard nav ===== */
  document.addEventListener('keydown', e => {
    if (e.key === 'Tab') document.documentElement.classList.add('show-focus-outline');
  });

});
