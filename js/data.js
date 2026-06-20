/* =========================================================
   DATA STORE — Bakso Mantap Jaya
   Ubah data di sini untuk menyesuaikan dengan data asli.
   ========================================================= */

/* ---------- MENU DATA ---------- */
const MENU_DATA = [

  /* ===== MAKANAN ===== */
  {
    id: 'bk-daging',
    category: 'makanan',
    name: 'Bakso Daging',
    price: 15000,
    emoji: '🍢',
    desc: 'Bakso daging sapi kenyal, kuah kaldu gurih, disajikan panas.',
    badge: '',
  },
  {
    id: 'bk-urat',
    category: 'makanan',
    name: 'Bakso Urat',
    price: 15000,
    emoji: '🍢',
    desc: 'Bakso urat sapi bertekstur, kuah bening gurih.',
    badge: '',
  },
  {
    id: 'bk-daging-urat',
    category: 'makanan',
    name: 'Bakso Daging & Urat',
    price: 17000,
    emoji: '🍢',
    desc: 'Kombinasi bakso daging + urat dalam satu mangkok.',
    badge: 'Populer',
  },
  {
    id: 'bk-telur',
    category: 'makanan',
    name: 'Bakso Telur',
    price: 18000,
    emoji: '🥚',
    desc: 'Bakso besar berisi telur puyuh, kuah kaldu spesial.',
    badge: '',
  },
  {
    id: 'bk-komplit',
    category: 'makanan',
    name: 'Bakso Komplit',
    price: 11000,
    emoji: '🍲',
    desc: 'Paket lengkap — ada bakso, tahu, dan pelengkap. *Mohon konfirmasi harga ke pemilik.',
    badge: '⚠️ Konfirmasi',
  },
  {
    id: 'mie-ayam',
    category: 'makanan',
    name: 'Mie Ayam',
    price: 16000,
    emoji: '🍜',
    desc: 'Mie kuning kenyal, topping ayam cincang berbumbu.',
    badge: 'Best Seller',
  },
  {
    id: 'mie-ayam-bk',
    category: 'makanan',
    name: 'Mie Ayam Bakso',
    price: 16000,
    emoji: '🍜',
    desc: 'Mie ayam lengkap dengan tambahan bakso sapi kenyal.',
    badge: 'Favorit',
  },
  {
    id: 'mie-ayam-ceker',
    category: 'makanan',
    name: 'Mie Ayam Ceker',
    price: 16000,
    emoji: '🍜',
    desc: 'Mie ayam dengan ceker ayam empuk. *Harga sementara, mohon konfirmasi.',
    badge: '⚠️ Konfirmasi',
  },

  /* ===== TAMBAHAN ===== */
  {
    id: 'biji-daging',
    category: 'tambahan',
    name: 'Bijian Bakso Daging',
    price: 4000,
    emoji: '🥩',
    desc: 'Tambah bakso daging ekstra per biji.',
    badge: '',
  },
  {
    id: 'biji-urat',
    category: 'tambahan',
    name: 'Bijian Bakso Urat',
    price: 4000,
    emoji: '🥩',
    desc: 'Tambah bakso urat ekstra per biji.',
    badge: '',
  },
  {
    id: 'biji-telur',
    category: 'tambahan',
    name: 'Bijian Bakso Telur',
    price: 5000,
    emoji: '🥚',
    desc: 'Tambah bakso telur ekstra per biji.',
    badge: '',
  },
  {
    id: 'biji-tahu',
    category: 'tambahan',
    name: 'Bijian Tahu Bakso',
    price: 5000,
    emoji: '🟡',
    desc: 'Tahu isi bakso yang gurih dan lembut.',
    badge: '',
  },
  {
    id: 'soun',
    category: 'tambahan',
    name: 'Soun',
    price: 5000,
    emoji: '🍝',
    desc: 'Tambahan soun (bihun) lembut.',
    badge: '',
  },
  {
    id: 'sate-tetelan',
    category: 'tambahan',
    name: 'Sate Tetelan',
    price: 6000,
    emoji: '🍡',
    desc: 'Sate tetelan daging berbumbu, cocok jadi pelengkap.',
    badge: 'Khas',
  },
  {
    id: 'lontong',
    category: 'tambahan',
    name: 'Lontong',
    price: 4000,
    emoji: '🟩',
    desc: 'Lontong pulen, bisa dijadikan pengganti mie.',
    badge: '',
  },
  {
    id: 'krupuk-tengiri',
    category: 'tambahan',
    name: 'Krupuk Tengiri',
    price: 2000,
    emoji: '🐟',
    desc: 'Kerupuk ikan tengiri renyah.',
    badge: '',
  },
  {
    id: 'krupuk-bandung',
    category: 'tambahan',
    name: 'Krupuk Bandung',
    price: 1000,
    emoji: '🍘',
    desc: 'Kerupuk bandung tipis dan renyah.',
    badge: '',
  },

  /* ===== MINUMAN ===== */
  {
    id: 'es-lumut',
    category: 'minuman',
    name: 'Es Lumut',
    price: 9000,
    emoji: '🥤',
    desc: 'Minuman segar khas dengan cincau/lumut, manis dan menyegarkan.',
    badge: 'Khas',
  },
  {
    id: 'es-teh-manis',
    category: 'minuman',
    name: 'Es Teh / Teh Panas (Manis)',
    price: 5000,
    emoji: '🍵',
    desc: 'Teh manis, bisa es atau panas, favorit semua umur.',
    badge: '',
  },
  {
    id: 'es-teh-tawar',
    category: 'minuman',
    name: 'Es Teh / Teh Panas (Tawar)',
    price: 4000,
    emoji: '🍵',
    desc: 'Teh tawar segar, cocok untuk yang tidak suka terlalu manis.',
    badge: '',
  },
  {
    id: 'es-jeruk-manis',
    category: 'minuman',
    name: 'Es Jeruk / Jeruk Panas (Manis)',
    price: 7000,
    emoji: '🍊',
    desc: 'Jeruk manis segar, bisa es atau hangat.',
    badge: '',
  },
  {
    id: 'es-jeruk-tawar',
    category: 'minuman',
    name: 'Es Jeruk / Jeruk Panas (Tawar)',
    price: 6000,
    emoji: '🍊',
    desc: 'Jeruk murni tanpa gula, segar alami.',
    badge: '',
  },
  {
    id: 'air-mineral',
    category: 'minuman',
    name: 'Air Mineral',
    price: 4000,
    emoji: '💧',
    desc: 'Air mineral botol 600ml.',
    badge: '',
  },
  {
    id: 'air-mineral-dingin',
    category: 'minuman',
    name: 'Air Mineral Dingin',
    price: 5000,
    emoji: '🧊',
    desc: 'Air mineral botol dingin langsung dari kulkas.',
    badge: '',
  },
  {
    id: 'es-batu',
    category: 'minuman',
    name: 'Es Batu',
    price: 2000,
    emoji: '🧊',
    desc: 'Es batu ekstra untuk minuman Anda.',
    badge: '',
  },
];

/* ---------- DELIVERY ZONES ---------- */
/*
  ⚠️ SAMARAN — Update dengan data wilayah & ongkir asli sebelum rilis.
  Format: { id, name, ongkir }
  ongkir: 0 = gratis, >0 = harga dalam Rupiah
*/
const DELIVERY_ZONES = [
  { id: 'blora-kota',    name: 'Blora Kota',         ongkir: 5000  },
  { id: 'jepon',         name: 'Kec. Jepon',          ongkir: 5000  },
  { id: 'bogorejo',      name: 'Kec. Bogorejo',       ongkir: 8000  },
  { id: 'tunjungan',     name: 'Kec. Tunjungan',      ongkir: 8000  },
  { id: 'banjarejo',     name: 'Kec. Banjarejo',      ongkir: 10000 },
  { id: 'ngawen',        name: 'Kec. Ngawen',         ongkir: 10000 },
  { id: 'japah',         name: 'Kec. Japah',          ongkir: 12000 },
  { id: 'randublatung',  name: 'Kec. Randublatung',   ongkir: 12000 },
  { id: 'cepu',          name: 'Kec. Cepu',           ongkir: 12000 },
];

/* ---------- BUSINESS CONFIG ---------- */
const BUSINESS = {
  name:       'Bakso Mantap Jaya',
  whatsapp:   '6281234567890',      // Format: 62xxxxxxxxx (tanpa +)
  instagram:  'baksomantapjaya',
  tiktok:     'bakso.mantap.jaya',
  address:    'Jl. Contoh Raya No 1, Blora, Jawa Tengah',
  gmapsEmbed: 'https://maps.google.com/maps?q=Blora,+Jawa+Tengah&t=&z=14&ie=UTF8&iwloc=&output=embed',
  hours:      'Setiap Hari, 08.00 – 21.00 WIB',
};

/* ---------- CATEGORY CONFIG ---------- */
const CATEGORIES = {
  makanan:  { label: 'Makanan',   icon: 'fas fa-bowl-food' },
  tambahan: { label: 'Tambahan',  icon: 'fas fa-plus-circle' },
  minuman:  { label: 'Minuman',   icon: 'fas fa-glass-water' },
};
