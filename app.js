const groups = [
  {
    name: '男生',
    cls: 'boy',
    items: [
      { type: '上衣', src: 'assets/boy-shirt.webp', name: '黑色長袖襯衫', detail: '素面、無裝飾', query: '男 黑色 素面\n長袖 襯衫' },
      { type: '下身', src: 'assets/boy-pants.webp', name: '黑色西裝長褲', detail: '褲長至腳踝附近', query: '男 黑色 西裝褲' },
      { type: '襪子', src: 'assets/boy-socks.webp', name: '黑色中長襪', detail: '穿鞋後不可露出腳踝<br>不可穿船型襪', query: '男 黑色 中筒襪' },
      { type: '鞋子', src: 'assets/boy-shoes.webp', name: '黑色皮鞋', detail: '素面、正式款<br>不可穿運動鞋', query: '男 黑色 皮鞋\n正式 皮鞋' }
    ],
    checks: [
      '黑色長袖襯衫（素面、無裝飾）',
      '黑色西裝長褲（長度至腳踝附近）',
      '黑色中長襪（不可露出腳踝、不可穿船型襪）',
      '黑色皮鞋（素面、正式款、不可穿運動鞋）'
    ]
  },
  {
    name: '女生',
    cls: 'girl',
    items: [
      { type: '上衣', src: 'assets/girl-shirt.webp', name: '黑色短袖襯衫', detail: '素面、無裝飾', query: '女 黑色 素面\n短袖 襯衫' },
      {
        type: '下身',
        src: 'assets/girl-pants.webp',
        name: '黑色長褲',
        detail: '褲長及腳踝<br><span class="choice">長褲、長裙擇一</span>',
        query: '女 黑色 長褲',
        variants: [
          { name: '黑色長褲', detail: '褲長及腳踝<br><span class="choice">長褲、長裙擇一</span>', query: '女 黑色 長褲', src: 'assets/girl-pants.webp', alt: '黑色長褲款式示意', className: '' },
          { name: '黑色素面長裙', detail: '長度接近腳踝<br><span class="choice">長褲、長裙擇一</span>', query: '女 黑色 素面 長裙', src: 'assets/girl-skirt.webp', alt: '黑色素面長裙款式示意', className: 'skirt-photo' }
        ]
      },
      { type: '襪子', src: 'assets/girl-socks.webp', name: '黑色長筒襪', detail: '（到小腿肚）<br>或黑色褲襪', query: '女 黑色 長筒襪\n或 黑色 褲襪' },
      { type: '鞋子', src: 'assets/girl-shoes.webp', name: '黑皮鞋／黑包鞋', detail: '素面、低調款<br>不可穿運動鞋', query: '女 黑色 皮鞋\n黑色 包鞋' }
    ],
    checks: [
      '黑色短袖襯衫（素面、無裝飾）',
      '黑色長褲（褲長及腳踝）或黑色長裙（長度接近腳踝），擇一',
      '黑色長筒襪（到小腿肚）或黑色褲襪',
      '黑皮鞋／黑包鞋（素面、低調款、不可穿運動鞋）'
    ]
  }
];

const displayGroups = [
  groups.find(group => group.cls === 'girl'),
  groups.find(group => group.cls === 'boy')
];

function art(name, extra = '') {
  return `<span class="art art--${name} art--ink ${extra}" aria-hidden="true"></span>`;
}

const brands = ['NET', 'GU', 'UNIQLO'];

function searchUrl(query, brand) {
  const suffix = brand ? ` ${brand}` : '';
  return 'https://www.google.com/search?q=' + encodeURIComponent(query.replace(/\n/g, ' ') + suffix);
}

function link(query, brand) {
  const label = brand || '不限品牌';
  const cls = brand === 'GU'
    ? 'gu'
    : brand === 'UNIQLO'
      ? 'uniqlo'
      : !brand
        ? 'other'
        : brand === 'La New' || brand === '阿瘦'
          ? 'shoe'
          : '';

  return `<a class="button ${cls}" data-brand="${brand}" target="_blank" rel="noopener noreferrer" aria-label="搜尋 ${query.replace(/\n/g, ' ')} ${label}（另開分頁）" href="${searchUrl(query, brand)}">搜尋 ${label}</a>`;
}

function variantButtons(place) {
  return `<div class="${place === 'photo' ? 'variant-picker' : 'search-variant'}" aria-label="選擇女生下身款式"><button type="button" data-variant="0" aria-pressed="true">長褲</button><button type="button" data-variant="1" aria-pressed="false">長裙</button></div>`;
}

document.querySelector('#main').innerHTML = displayGroups.map(group => `
<section class="group ${group.cls}" aria-labelledby="${group.cls}-title">
  <div class="band">
    ${art(group.cls === 'girl' ? 'dress' : 'suit', 'band-icon')}
    <h2 id="${group.cls}-title">${group.name}</h2>
    <p>整體要求：<span>全黑、素面、無裝飾</span></p>
  </div>
  <div class="cards">
    ${group.items.map((item, index) => `
      <article class="card" data-item="${index}">
        <h3>${item.type}</h3>
        <div class="photo">
          <img src="${item.variants ? item.variants[0].src : item.src}" alt="${item.name}款式示意">
          ${group.cls === 'girl' && item.type === '襪子' ? '<span class="sock-or" aria-hidden="true">或</span>' : ''}
          ${item.variants ? '<span class="photo-status" role="status" aria-live="polite" hidden></span>' + variantButtons('photo') : ''}
        </div>
        <div class="desc"><b>${item.name}</b><small>${item.detail}</small></div>
      </article>`).join('')}
  </div>
  <div class="search">
    <h3 class="section">${art('search-' + group.cls, 'section-icon')}<span>建議搜尋關鍵字 <small>（點擊按鈕即可搜尋）</small></span></h3>
    <div class="searchgrid">
      ${group.items.map((item, index) => `
        <div class="searchcard" data-item="${index}">
          <div class="search-head">${item.variants ? variantButtons('search') : item.type}</div>
          <div class="keywords">${item.query}</div>
          ${(group.cls === 'boy' && index === 3 ? ['', 'La New', '阿瘦'] : brands).map(brand => link(item.query, brand)).join('')}
        </div>`).join('')}
    </div>
  </div>
  <div class="check">
    <h3 class="section">${art('clipboard-' + group.cls, 'section-icon')}<span>演出前穿著確認（${group.name}）</span></h3>
    ${group.checks.map((text, index) => `<label><input type="checkbox" id="${group.cls}-${index}"><span>${text}</span></label>`).join('')}
  </div>
</section>`).join('');

const lowerItem = groups.find(group => group.cls === 'girl').items.find(item => item.variants);
let displayedLowerVariant = 0;
let variantRequestId = 0;

function setLowerVariant(index) {
  const variant = lowerItem.variants[index];
  if (!variant || index === displayedLowerVariant) return;

  const requestId = ++variantRequestId;
  const card = document.querySelector('.girl .card[data-item="1"]');
  const photo = card.querySelector('.photo');
  const status = photo.querySelector('.photo-status');

  status.textContent = '照片載入中…';
  status.hidden = false;

  const incoming = new Image();
  incoming.alt = variant.alt;
  incoming.className = variant.className || '';
  incoming.decoding = 'async';

  incoming.onload = () => {
    if (requestId !== variantRequestId) return;

    const current = photo.querySelector('img');
    current.replaceWith(incoming);

    const searchCard = document.querySelector('.girl .searchcard[data-item="1"]');
    card.querySelector('.desc b').textContent = variant.name;
    card.querySelector('.desc small').innerHTML = variant.detail;
    searchCard.querySelector('.keywords').textContent = variant.query;

    searchCard.querySelectorAll('a.button').forEach(anchor => {
      const brand = anchor.dataset.brand;
      anchor.href = searchUrl(variant.query, brand);
      anchor.setAttribute('aria-label', `搜尋 ${variant.query.replace(/\n/g, ' ')} ${brand || '不限品牌'}（另開分頁）`);
    });

    document.querySelectorAll('[data-variant]').forEach(button => {
      button.setAttribute('aria-pressed', String(Number(button.dataset.variant) === index));
    });

    displayedLowerVariant = index;
    status.hidden = true;
  };

  incoming.onerror = () => {
    if (requestId !== variantRequestId) return;
    status.textContent = '照片暫時無法載入，請再點選一次。';
  };

  incoming.src = variant.src;
}

document.querySelectorAll('[data-variant]').forEach(button => {
  button.addEventListener('click', () => setLowerVariant(Number(button.dataset.variant)));
});
