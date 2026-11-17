const grid = document.getElementById('dishgrid');
const search = document.getElementById('search');

const PHOTOS = {
  'Салат з капусти та моркви': ['01/salat-kapusta-morkva'],
  "Макенчиз з м'ясом птиці": ['08/makenchyz.png'],
  'Сік фруктовий пастеризований': ['01/sik'],
  'Фрукти свіжі сезонні (яблука)': ['01/yabluko', '02/yabluko', '03/yabluko', '04/yabluko', '06/yabluko', '07/yabluko'],
  'Салат з буряка з сиром': ['04/salat-buryak-syr', '05/salat-buryak-syr'],
  'Шніцель рибний': ['08/shnitsel-rybnyi.png'],
  'Рагу з картоплі та овочів': ['08/rahu-kartoplya-ovochi.png'],
  'Компот із сухофруктів': ['03/kompot'],
  'Хліб цільнозерновий': ['01/khlib', '05/khlib', '07/khlib'],
  'Овочі запечені': ['06/ovochi-zapecheni'],
  'Львівський сирник з морквою': ['06/lvivskyi-syrnyk'],
  'Каша гречана розсипчаста': ['01/hrechka', '06/hrechka'],
  'Сметана': ['06/smetana', '04/smetana'],
  'Компот з плодів заморожених': ['05/kompot', '04/kompot', '06/kompot'],
  'Фрукти свіжі сезонні (банани)': ['05/banan'],
  'Боли з курки': ['07/polpetta'],
  'Сочевиця тушкована з овочами': ['07/sochevytsya'],
  'Чай': ['07/chai'],
  'Какао з молоком': ['02/kakao'],
  'Овочі натуральні сезонні (огірок солоний)': ['03/ohirky-marynovani'],
  'Шніцель з курки': ['03/shnitsel'],
  'Каша пшенична розсипчаста': ['03/pshenychna-kasha'],
  'Биточок з курки': ['05/kuryachyi-bytok'],
  'Вареники ліниві з сиром': ['04/linyvi-varenyky'],
  'Салат з капусти та кукурудзи': ['02/salat-kapusta-kukurudza'],
  'Котлета по-міланськи з сиром': ['01/kotleta-z-syrom'],
  'Запіканка з сиру кисломолочного з ваніллю': ['02/zapikanka'],
  'Макаронні вироби з маслом вершковим': ['02/makarony'],
  'Картопляне пюре': ['04/kartoplyane-pyure', '07/pyure'],
  'Картопляне пюре з горошком': ['05/pyure-z-horoshkom'],
  'Бутерброд з сиром': ['03/buterbrod-z-syrom'],
  'Підлива': ['02/pidlyva'],
  'Салат зі свіжих огірків': ['07/salat-ohirky']
};

const EXTRA_DISHES = [
  { name: 'Картопляне пюре' },
  { name: 'Картопляне пюре з горошком' },
  { name: 'Бутерброд з сиром' },
  { name: 'Підлива' },
  { name: 'Салат зі свіжих огірків' }
];

function photoPath(photo) {
  return 'assets/dish-photos/menu-' + photo + (photo.endsWith('.png') ? '' : '.jpg');
}

function createPhotoSlot(dish) {
  const slot = document.createElement('div');
  slot.className = 'photo-slot';
  const photos = PHOTOS[dish.name] || [];
  if (!photos.length) {
    const placeholder = document.createElement('div');
    placeholder.className = 'placeholder';
    placeholder.setAttribute('aria-hidden', 'true');
    placeholder.textContent = '🍽️';
    slot.append(placeholder);
    return slot;
  }

  slot.classList.add('has-photo');
  const img = document.createElement('img');
  img.alt = dish.name;
  img.loading = 'lazy';
  img.decoding = 'async';
  img.src = photoPath(photos[0]);
  slot.append(img);

  if (photos.length > 1) {
    let active = 0;
    const count = document.createElement('span');
    count.className = 'photo-count';
    count.setAttribute('aria-live', 'polite');
    const prev = document.createElement('button');
    const next = document.createElement('button');
    prev.type = next.type = 'button';
    prev.className = 'photo-arrow photo-prev';
    next.className = 'photo-arrow photo-next';
    prev.textContent = '‹';
    next.textContent = '›';
    prev.setAttribute('aria-label', 'Попереднє фото: ' + dish.name);
    next.setAttribute('aria-label', 'Наступне фото: ' + dish.name);

    function showPhoto(index) {
      active = (index + photos.length) % photos.length;
      img.src = photoPath(photos[active]);
      count.textContent = (active + 1) + ' / ' + photos.length;
    }

    prev.addEventListener('click', () => showPhoto(active - 1));
    next.addEventListener('click', () => showPhoto(active + 1));
    showPhoto(0);
    slot.append(prev, next, count);
  }

  return slot;
}

function renderCatalog() {
  const term = search.value.trim().toLocaleLowerCase('uk');
  grid.replaceChildren();
  const list = [...DISHES, ...EXTRA_DISHES].filter(dish =>
    PHOTOS[dish.name]?.length > 0 && dish.name.toLocaleLowerCase('uk').includes(term)
  );

  list.forEach(dish => {
    const card = document.createElement('article');
    card.className = 'dish-card';
    const info = document.createElement('div');
    info.className = 'dish-info';
    const h = document.createElement('h3');
    h.textContent = dish.name;
    info.append(h);

    if (dish.week && dish.grams) {
      const meta = document.createElement('div');
      meta.className = 'dish-meta';
      const tag = document.createElement('span');
      tag.className = 'pill';
      tag.textContent = 'Тиждень ' + dish.week;
      const grams = document.createElement('span');
      grams.className = 'pill';
      grams.textContent = 'Порція: ' + dish.grams[1] + ' г';
      meta.append(tag, grams);
      info.append(meta);
    }

    card.append(createPhotoSlot(dish), info);
    grid.append(card);
  });

  if (!list.length) {
    const empty = document.createElement('p');
    empty.className = 'empty';
    empty.textContent = 'Нічого не знайдено. Спробуй іншу назву.';
    grid.append(empty);
  }
}

search.addEventListener('input', renderCatalog);
renderCatalog();

const navbtn = document.getElementById('navbtn');
if (navbtn) navbtn.onclick = () => document.getElementById('nav').classList.toggle('open');
