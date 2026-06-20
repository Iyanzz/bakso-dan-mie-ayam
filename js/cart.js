/* =========================================================
   CART MODULE — Bakso Mantap Jaya
   Handles: cart state, add/remove, subtotal, ongkir, totals
   ========================================================= */

/* ---- STATE ---- */
let cart = {};          // { menuId: { item, qty } }
let selectedZone = null;  // current zone object or null
let selectedMetode = 'delivery'; // 'delivery' | 'pickup'

/* =========================================================
   CART CRUD
   ========================================================= */

/** Add 1 unit of item to cart */
function addToCart(itemId) {
  const item = MENU_DATA.find(m => m.id === itemId);
  if (!item) return;

  if (cart[itemId]) {
    cart[itemId].qty += 1;
  } else {
    cart[itemId] = { item, qty: 1 };
  }
  renderCart();
  updateCartBadge();
  syncSummary();
  animateFab();
}

/** Remove 1 unit; remove key if qty reaches 0 */
function removeFromCart(itemId) {
  if (!cart[itemId]) return;
  cart[itemId].qty -= 1;
  if (cart[itemId].qty <= 0) delete cart[itemId];
  renderCart();
  updateCartBadge();
  syncSummary();
}

/** Get current qty for an item */
function getQty(itemId) {
  return cart[itemId] ? cart[itemId].qty : 0;
}

/** Total number of unique items (for badge) */
function totalCartQty() {
  return Object.values(cart).reduce((sum, e) => sum + e.qty, 0);
}

/** Subtotal of all items */
function calcSubtotal() {
  return Object.values(cart).reduce((sum, e) => sum + e.item.price * e.qty, 0);
}

/** Ongkir based on current state */
function calcOngkir() {
  if (selectedMetode === 'pickup') return 0;
  if (!selectedZone) return 0;
  return selectedZone.ongkir;
}

/** Grand total */
function calcTotal() {
  return calcSubtotal() + calcOngkir();
}

/* =========================================================
   RENDER CART PANEL
   ========================================================= */
function renderCart() {
  const list   = document.getElementById('cartList');
  const empty  = document.getElementById('cartEmpty');
  const footer = document.getElementById('cartFooter');
  const items  = Object.values(cart);

  if (!items.length) {
    list.innerHTML   = '';
    empty.style.display  = 'block';
    footer.style.display = 'none';
    return;
  }

  empty.style.display  = 'none';
  footer.style.display = 'block';

  list.innerHTML = items.map(({ item, qty }) => `
    <li class="cart-item">
      <span class="cart-item-emoji">${item.emoji}</span>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${formatRp(item.price)} / porsi</div>
      </div>
      <div class="cart-item-actions">
        <button class="cart-item-qty-btn" onclick="removeFromCart('${item.id}')" aria-label="Kurang">−</button>
        <span class="cart-item-qty">${qty}</span>
        <button class="cart-item-qty-btn" onclick="addToCart('${item.id}')" aria-label="Tambah">+</button>
      </div>
      <span class="cart-item-subtotal">${formatRp(item.price * qty)}</span>
    </li>
  `).join('');

  // Update totals in cart panel
  const subtotal = calcSubtotal();
  const ongkir   = calcOngkir();
  const total    = calcTotal();

  document.getElementById('cartSubtotal').textContent = formatRp(subtotal);
  document.getElementById('cartTotal').textContent    = formatRp(total);

  const ongkirLine = document.getElementById('ongkirLine');
  if (ongkir > 0) {
    ongkirLine.style.display = 'flex';
    document.getElementById('cartOngkir').textContent    = formatRp(ongkir);
    document.getElementById('ongkirZoneName').textContent = selectedZone ? selectedZone.name : '';
  } else {
    ongkirLine.style.display = 'none';
  }
}

/* =========================================================
   CHECKOUT SUMMARY SYNC
   ========================================================= */
function syncSummary() {
  const items = Object.values(cart);
  const summaryItems = document.getElementById('summaryItems');
  const sumEmpty = '<div class="summary-empty">Belum ada item. Tambahkan menu dulu!</div>';

  if (!items.length) {
    summaryItems.innerHTML = sumEmpty;
  } else {
    summaryItems.innerHTML = items.map(({ item, qty }) => `
      <div class="summary-item">
        <span class="summary-item-name">${item.emoji} ${item.name} ×${qty}</span>
        <span class="summary-item-price">${formatRp(item.price * qty)}</span>
      </div>
    `).join('');
  }

  const subtotal = calcSubtotal();
  const ongkir   = calcOngkir();
  const total    = calcTotal();

  document.getElementById('sumSubtotal').textContent = formatRp(subtotal);
  document.getElementById('sumTotal').textContent    = formatRp(total);

  const sumOngkirLine = document.getElementById('sumOngkirLine');
  if (ongkir > 0) {
    sumOngkirLine.style.display = 'flex';
    document.getElementById('sumOngkir').textContent    = formatRp(ongkir);
    document.getElementById('sumZoneName').textContent  = selectedZone ? selectedZone.name : '';
  } else {
    sumOngkirLine.style.display = 'none';
  }
}

/* =========================================================
   CART PANEL TOGGLE
   ========================================================= */
function toggleCart() {
  const panel   = document.getElementById('cartPanel');
  const overlay = document.getElementById('cartOverlay');
  const isOpen  = panel.classList.contains('open');
  if (isOpen) {
    closeCart();
  } else {
    openCart();
  }
}

function openCart() {
  document.getElementById('cartPanel').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  renderCart();
}

function closeCart() {
  document.getElementById('cartPanel').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* =========================================================
   BADGE & FAB
   ========================================================= */
function updateCartBadge() {
  const qty = totalCartQty();
  document.getElementById('cartBadge').textContent = qty;
}

function animateFab() {
  const fab = document.getElementById('cartFab');
  fab.classList.remove('pulse-once');
  void fab.offsetWidth; // reflow
  fab.classList.add('pulse-once');
}

/* =========================================================
   DELIVERY ZONE HANDLING
   ========================================================= */
function populateZoneDropdown() {
  const select = document.getElementById('selectZone');
  DELIVERY_ZONES.forEach(zone => {
    const opt = document.createElement('option');
    opt.value = zone.id;
    opt.textContent = `${zone.name} — Ongkir ${formatRp(zone.ongkir)}`;
    select.appendChild(opt);
  });
  // Add "Lainnya" option
  const other = document.createElement('option');
  other.value = 'lainnya';
  other.textContent = 'Wilayah lain (tidak ada di daftar)';
  select.appendChild(other);
}

function onZoneChange() {
  const val       = document.getElementById('selectZone').value;
  const ongkirInfo = document.getElementById('ongkirInfo');
  const outOfArea  = document.getElementById('outOfAreaMsg');

  if (!val) {
    selectedZone = null;
    ongkirInfo.style.display = 'none';
    outOfArea.style.display  = 'none';
  } else if (val === 'lainnya') {
    selectedZone = null;
    ongkirInfo.style.display = 'none';
    outOfArea.style.display  = 'flex';
  } else {
    const zone = DELIVERY_ZONES.find(z => z.id === val);
    selectedZone = zone || null;
    outOfArea.style.display  = 'none';
    if (zone) {
      ongkirInfo.style.display = 'flex';
      document.getElementById('ongkirInfoText').textContent =
        `Ongkos kirim ke ${zone.name}: ${formatRp(zone.ongkir)}`;
    }
  }
  renderCart();
  syncSummary();
}

function onMetodeChange() {
  selectedMetode = document.querySelector('input[name="metode"]:checked').value;
  const deliveryZoneWrap = document.getElementById('deliveryZoneWrap');
  const pickupInfo       = document.getElementById('pickupInfo');
  const alamatWrap       = document.getElementById('alamatWrap');

  if (selectedMetode === 'delivery') {
    deliveryZoneWrap.style.display = 'block';
    pickupInfo.style.display       = 'none';
    alamatWrap.style.display       = 'block';
  } else {
    deliveryZoneWrap.style.display = 'none';
    pickupInfo.style.display       = 'flex';
    alamatWrap.style.display       = 'none';
    // Reset zone when switching to pickup
    selectedZone = null;
    document.getElementById('selectZone').value = '';
    document.getElementById('ongkirInfo').style.display = 'none';
    document.getElementById('outOfAreaMsg').style.display = 'none';
  }
  renderCart();
  syncSummary();
}

/* =========================================================
   WHATSAPP ORDER SENDER
   ========================================================= */
function sendWhatsApp() {
  const msgEl = document.getElementById('checkoutValidationMsg');
  msgEl.style.display = 'none';

  const items = Object.values(cart);

  // Validation: cart not empty
  if (!items.length) {
    showValidationMsg('⚠️ Keranjang masih kosong. Silakan pilih menu terlebih dahulu.');
    return;
  }

  const metode = selectedMetode;

  // Validation: zone if delivery
  if (metode === 'delivery') {
    const zoneVal = document.getElementById('selectZone').value;
    if (!zoneVal || zoneVal === 'lainnya') {
      showValidationMsg('⚠️ Silakan pilih wilayah tujuan pengiriman yang valid.');
      return;
    }
  }

  // Validation: customer data
  const nama    = document.getElementById('inputNama').value.trim();
  const hp      = document.getElementById('inputHP').value.trim();
  const alamat  = document.getElementById('inputAlamat').value.trim();
  const catatan = document.getElementById('inputCatatan').value.trim();

  if (!nama) { showValidationMsg('⚠️ Nama lengkap wajib diisi.'); return; }
  if (!hp)   { showValidationMsg('⚠️ No. HP / WhatsApp wajib diisi.'); return; }
  if (metode === 'delivery' && !alamat) {
    showValidationMsg('⚠️ Alamat lengkap wajib diisi untuk delivery.');
    return;
  }

  // Build message
  const subtotal = calcSubtotal();
  const ongkir   = calcOngkir();
  const total    = calcTotal();

  const itemLines = items.map(({ item, qty }) =>
    `- ${item.name} x${qty} = ${formatRp(item.price * qty)}`
  ).join('\n');

  const zoneName   = selectedZone ? selectedZone.name : '';
  const ongkirLine = metode === 'delivery' ? `Ongkir  : ${formatRp(ongkir)}` : 'Ongkir  : Gratis (Pickup)';

  const message = `Halo ${BUSINESS.name}, saya ingin pesan:

*Pesanan:*
${itemLines}

Metode  : ${metode === 'delivery' ? 'Delivery 🛵' : 'Ambil di Toko 🏪'}
${metode === 'delivery' ? `Wilayah : ${zoneName}
Alamat  : ${alamat}` : ''}
Nama    : ${nama}
No. HP  : ${hp}
Catatan : ${catatan || '-'}

---
Subtotal: ${formatRp(subtotal)}
${ongkirLine}
*Total  : ${formatRp(total)}*

Mohon konfirmasi pesanan saya. Terima kasih 🙏`;

  const encoded = encodeURIComponent(message);
  const url     = `https://wa.me/${BUSINESS.whatsapp}?text=${encoded}`;
  window.open(url, '_blank');
}

function showValidationMsg(msg) {
  const el = document.getElementById('checkoutValidationMsg');
  el.innerHTML = msg;
  el.style.display = 'flex';
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/* =========================================================
   UTILS
   ========================================================= */
function formatRp(amount) {
  return 'Rp' + amount.toLocaleString('id-ID');
}
