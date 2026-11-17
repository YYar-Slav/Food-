(() => {
  'use strict';

  const key = 'piddubtsi-feedback-v1';
  const form = document.getElementById('feedback-form');
  const list = document.getElementById('feedback-list');
  const count = document.getElementById('feedback-count');
  const status = document.getElementById('feedback-status');

  if (!form || !list) return;

  let reviews = [];

  try {
    const data = JSON.parse(localStorage.getItem(key) || '[]');

    if (Array.isArray(data)) {
      reviews = data.filter(r =>
        r &&
        typeof r.author === 'string' &&
        typeof r.message === 'string' &&
        Number.isInteger(r.rating) &&
        r.rating >= 1 &&
        r.rating <= 5
      );
    }
  } catch (e) {
    status.textContent = 'Не вдалося прочитати збережені відгуки.';
  }

  function render() {
    list.replaceChildren();
    count.textContent = String(reviews.length);

    if (!reviews.length) {
      const p = document.createElement('p');
      p.className = 'feedback-empty';
      p.textContent = 'Поки що немає відгуків. Будьте першими!';
      list.append(p);
      return;
    }

    for (const r of [...reviews].reverse()) {
      const card = document.createElement('article');
      card.className = 'review-card';

      const top = document.createElement('div');
      top.className = 'review-top';

      const author = document.createElement('strong');
      author.textContent = r.author;

      const date = document.createElement('small');
      date.textContent = r.date || '';
      top.append(author, date);

      const stars = document.createElement('div');
      stars.className = 'review-stars';
      stars.textContent = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);

      const kind = document.createElement('small');
      kind.textContent = r.kind || 'Відгук';

      const message = document.createElement('p');
      message.textContent = r.message;

      card.append(top, stars, kind, message);
      list.append(card);
    }
  }

  form.addEventListener('submit', e => {
    e.preventDefault();

    const author = form.author.value.trim();
    const message = form.message.value.trim();
    const rating = Number(form.rating.value);

    if (!author || !message || !Number.isInteger(rating) || rating < 1 || rating > 5) {
      status.textContent = 'Заповніть ім’я та повідомлення.';
      return;
    }

    const review = {
      author: author.slice(0, 60),
      message: message.slice(0, 1200),
      kind: form.kind.value,
      rating,
      date: new Date().toLocaleDateString('uk-UA')
    };

    try {
      localStorage.setItem(key, JSON.stringify([...reviews, review]));
      reviews.push(review);
      form.reset();
      status.textContent = 'Дякуємо за ваш відгук!';
      render();
    } catch (err) {
      status.textContent = 'Не вдалося зберегти відгук. Спробуйте ще раз.';
    }
  });

  render();
})();
