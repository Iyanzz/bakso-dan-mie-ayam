/* =========================================================
   MAIN MODULE — Bakso Mantap Jaya
   Handles: render menu, tabs, area section, navbar, init
   ========================================================= */

/* =========================================================
   MENU RENDER
   ========================================================= */
let currentCategory = 'makanan';

function renderMenu(category) {
  currentCategory = category;
  const grid  = document.getElementById('menuGrid');
  const items = MENU_DATA.filter(m => m.category === category);

  grid.innerHTML = items.map(item => `
    <article class="menu-card fade-in" id="card-${item.id}">
      <div class="menu-card-img">
        <span class="menu-img-emoji">${item.emoji}</span>
        ${item.badge ? `<div class="menu-card-badge ${getBadgeClass(item.badge)}">${item.badge}</div>` : ''}
      </div>
      <div class="menu-card-body">
        <h3 class="menu-card-name">${item.name}</h3>
        <p class="menu-card-desc">${item.desc}</p>
        <div class="menu-card-price">${formatRp(item.price)}</div>
        <div class="qty-control" id="qty-${item.id}">
          <button class="qty-btn" onclick="handleQtyMinus('${item.id}')" aria-label="Kurang">−</button>
          <span class="qty-val" id="qtyVal-${item.id}">0</span>
          <button class="qty-btn" onclick="handleQtyPlus('${item.id}')" aria-label="Tambah">+</button>
        </div>
        <button
          class="btn-add-cart"
          id="btnAdd-${item.id}"
          onclick="handleAddToCart('${item.id}')"
        >
          <i class="fas fa-plus"></i> Tambah ke Keranjang
        </button>
      </div>
    </article>
  `).join('');

  // Sync qty display from existing cart state
  items.forEach(item => syncCardQty(item.id));
}

function getBadgeClass(badge) {
  if (!badge) return '';
  if (badge.includes('Konfirmasi')) return 'badge-warn';
  if (badge === 'Best Seller') return 'badge-bestseller';
  if (badge === 'Favorit')    return 'badge-favorit';
  if (badge === 'Populer')    return 'badge-populer';
  if (badge === 'Khas')       return 'badge-khas';
  return '';
}

function filterMenu(category) {
  // Update active tab
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cat === category);
  });
  renderMenu(category);
}

/* =========================================================
   QTY CONTROL ON MENU CARDS
   ========================================================= */
function handleQtyPlus(itemId) {
  addToCart(itemId);
  syncCardQty(itemId);
}

function handleQtyMinus(itemId) {
  removeFromCart(itemId);
  syncCardQty(itemId);
}

function handleAddToCart(itemId) {
  // If qty is still 0, add 1 first
  if (getQty(itemId) === 0) {
    addToCart(itemId);
  }
  syncCardQty(itemId);

  // Visual feedback
  const btn = document.getElementById(`btnAdd-${itemId}`);
  if (btn) {
    btn.classList.add('added');
    btn.innerHTML = '<i class="fas fa-check"></i> Ditambahkan!';
    setTimeout(() => {
      btn.classList.remove('added');
      btn.innerHTML = '<i class="fas fa-plus"></i> Tambah ke Keranjang';
    }, 1500);
  }
}

/** Sync the qty display on a menu card from cart state */
function syncCardQty(itemId) {
  const qtyValEl = document.getElementById(`qtyVal-${itemId}`);
  if (qtyValEl) {
    qtyValEl.textContent = getQty(itemId);
  }
}

/* =========================================================
   AREA DELIVERY SECTION RENDER
   ========================================================= */
function renderAreaGrid() {
  const grid = document.getElementById('areaGrid');
  if (!grid) return;

  const zoneEmojis = ['🏙️','🏘️','🌆','🏡','🌇','🌃','🌉','🏠','🌄'];

  grid.innerHTML = DELIVERY_ZONES.map((zone, i) => `
    <div class="area-card">
      <div class="area-card-icon">${zoneEmojis[i % zoneEmojis.length]}</div>
      <div class="area-card-name">${zone.name}</div>
      <div class="area-card-ongkir">Ongkir ${formatRp(zone.ongkir)}</div>
    </div>
  `).join('');
}

/* =========================================================
   NAVBAR SCROLL & MOBILE TOGGLE
   ========================================================= */
function handleNavbarScroll() {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

function toggleNav() {
  const links = document.getElementById('navLinks');
  const ham   = document.getElementById('hamburger');
  links.classList.toggle('open');
  ham.classList.toggle('open');
}

// Close mobile nav on link click
function closeMobileNav() {
  document.getElementById('navLinks').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

/* =========================================================
   INJECT MENU CARD BADGE STYLES
   ========================================================= */
function injectBadgeStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .menu-card-badge {
      position: absolute;
      top: 10px; left: 10px;
      padding: 3px 10px;
      border-radius: 50px;
      font-size: 0.7rem;
      font-weight: 800;
      font-family: 'Rubik', sans-serif;
      letter-spacing: 0.3px;
      z-index: 2;
    }
    .badge-bestseller { background: #d62828; color: #fff; }
    .badge-favorit    { background: #f77f00; color: #fff; }
    .badge-populer    { background: #e67e22; color: #fff; }
    .badge-khas       { background: #7c4a1e; color: #fff; }
    .badge-warn       { background: #f0ad4e; color: #5a3e00; }
  `;
  document.head.appendChild(style);
}

/* =========================================================
   SMOOTH SCROLL FOR NAV LINKS
   ========================================================= */
function initSmoothNav() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        closeMobileNav();
        const offset = 70;
        const top    = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* =========================================================
   INTERSECTION OBSERVER — fade-in on scroll
   ========================================================= */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity    = '1';
        entry.target.style.transform  = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.area-card, .info-card, .form-card, .summary-card').forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

/* =========================================================
   INIT
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  // Inject badge styles
  injectBadgeStyles();

  // Render menu (default: makanan)
  renderMenu('makanan');

  // Populate delivery zone dropdown
  populateZoneDropdown();

  // Render area delivery section
  renderAreaGrid();

  // Navbar scroll behavior
  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll(); // run once

  // Smooth nav
  initSmoothNav();

  // Scroll animations
  setTimeout(initScrollAnimations, 100);

  // Close mobile nav when clicking outside
  document.addEventListener('click', e => {
    const nav   = document.getElementById('navLinks');
    const ham   = document.getElementById('hamburger');
    if (!nav.contains(e.target) && !ham.contains(e.target)) {
      nav.classList.remove('open');
      ham.classList.remove('open');
    }
  });

  console.log('🍜 Bakso Mantap Jaya — Website loaded successfully!');
});
