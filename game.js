const questions = [
  {
    q: 'Який напій найкраще втамовує спрагу щодня?',
    a: ['Енергетик', 'Солодка газована вода', 'Чиста питна вода', 'Дуже солодкий чай'],
    c: 2,
    why: 'Звичайна питна вода — найкращий щоденний вибір для втамування спраги.'
  },
  {
    q: 'Що означає різноманітне харчування?',
    a: ['Їсти лише одну улюблену страву', 'Обирати продукти з різних груп', 'Пропускати сніданок', 'Їсти тільки фрукти'],
    c: 1,
    why: 'Різноманітний раціон допомагає отримувати різні поживні речовини.'
  },
  {
    q: 'Що краще зробити перед тим, як їсти?',
    a: ['Не мити руки', 'Помити руки з милом', 'Торкнутися телефону', 'Залишити їжу відкритою'],
    c: 1,
    why: 'Миття рук допомагає зменшити ризик потрапляння мікробів до їжі.'
  }
];

let idx = 0;
let score = 0;
let locked = false;

const qEl = document.getElementById('question');
const aEl = document.getElementById('answers');
const feedback = document.getElementById('feedback');
const next = document.getElementById('next');

function show() {
  locked = false;
  document.getElementById('counter').textContent = `ЗАПИТАННЯ ${idx + 1} З ${questions.length}`;
  document.getElementById('progress').style.width = (idx / questions.length * 100) + '%';

  let q = questions[idx];
  qEl.textContent = q.q;
  feedback.textContent = '';
  next.hidden = true;
  aEl.innerHTML = '';

  q.a.forEach((a, i) => {
    let b = document.createElement('button');
    b.className = 'answer';
    b.textContent = a;
    b.onclick = () => answer(i, b);
    aEl.append(b);
  });
}

function answer(i, btn) {
  if (locked) return;

  locked = true;
  let q = questions[idx];

  [...aEl.children].forEach((b, j) => {
    b.disabled = true;
    if (j === q.c) b.classList.add('correct');
  });

  if (i === q.c) {
    score++;
    feedback.textContent = 'Правильно! ' + q.why;
  } else {
    btn.classList.add('wrong');
    feedback.textContent = 'Не зовсім. ' + q.why;
  }

  next.hidden = false;
  next.textContent = idx === questions.length - 1
    ? 'Побачити результат →'
    : 'Наступне запитання →';
}

next.onclick = () => {
  idx++;
  if (idx < questions.length) show();
  else finish();
};

function finish() {
  document.getElementById('quiz').hidden = true;
  document.getElementById('result').hidden = false;
  document.getElementById('progress').style.width = '100%';

  const message = score === questions.length
    ? 'Чудово! Ти справжній знавець здорового харчування!'
    : score >= 2
      ? 'Гарний результат! Ще трохи практики — і буде відмінно.'
      : 'Дякуємо за гру! Тепер ти знаєш трохи більше про здорове харчування.';

  document.getElementById('score').textContent = `Твій результат: ${score} із ${questions.length}. ${message}`;
}

document.getElementById('restart').onclick = () => {
  idx = 0;
  score = 0;
  document.getElementById('quiz').hidden = false;
  document.getElementById('result').hidden = true;
  show();
};

const navbtn = document.getElementById('navbtn');
if (navbtn) {
  navbtn.onclick = () => document.getElementById('nav').classList.toggle('open');
}

show();
