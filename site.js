const weekEl = document.getElementById('week');

if (weekEl) {
  const AGE_INDEX = 1;
  let selectedDay = 0;

  const daysEl = document.getElementById('days');
  const dishlist = document.getElementById('dishlist');

  function renderDays() {
    daysEl.innerHTML = '';

    MENU[weekEl.value].forEach((d, i) => {
      const b = document.createElement('button');
      b.className = 'daybtn' + (i === selectedDay ? ' active' : '');
      b.textContent = d.day;

      b.onclick = () => {
        selectedDay = i;
        render();
      };

      daysEl.appendChild(b);
    });
  }

  function renderMenu() {
    const d = MENU[weekEl.value][selectedDay];
    document.getElementById('daytitle').textContent = d.day;

    let total = 0;
    dishlist.innerHTML = '';

    d.dishes.forEach(dish => {
      const grams = dish[1][AGE_INDEX];
      total += grams;

      const row = document.createElement('div');
      row.className = 'dishrow';

      const name = document.createElement('div');
      name.innerHTML = '<div class="dishname"></div><div class="dishkind">Маса порції</div>';
      name.querySelector('.dishname').textContent = dish[0];

      const amount = document.createElement('span');
      amount.className = 'grams';
      amount.textContent = grams + ' г';

      const add = document.createElement('button');
      add.className = 'addbtn';
      add.textContent = '+';
      add.title = 'Додати до конструктора';
      add.onclick = () => {
        alert('Перейди до каталогу страв, щоб переглянути всі позиції меню.');
      };

      row.append(name, amount, add);
      dishlist.appendChild(row);
    });

    document.getElementById('total').textContent = total + ' г';
  }

  function render() {
    renderDays();
    renderMenu();
  }

  weekEl.onchange = () => {
    selectedDay = 0;
    render();
  };

  render();
}

const navbtn = document.getElementById('navbtn');
if (navbtn) {
  navbtn.onclick = () => document.getElementById('nav').classList.toggle('open');
}
