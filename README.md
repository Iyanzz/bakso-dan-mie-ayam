# 🍜 Bakso Mantap Jaya — Website Order Online

Website pemesanan online untuk warung **Bakso & Mie Ayam**, dengan fitur keranjang belanja, kalkulasi ongkir otomatis, dan integrasi WhatsApp untuk konfirmasi order.

> ⚠️ **Data bersifat SAMARAN** — Nama bisnis, nomor WhatsApp, alamat, dan data lainnya adalah data contoh/demo. Ganti dengan data asli sebelum website dirilis ke publik.

---

## ✅ Fitur yang Sudah Selesai

| Fitur | Status |
|---|---|
| Hero section dengan animasi & CTA | ✅ |
| Menu lengkap (Makanan, Tambahan, Minuman) — 26 item | ✅ |
| Filter menu per kategori (tabs) | ✅ |
| Keranjang belanja (add/remove, qty control) | ✅ |
| Cart panel slide-in dari kanan | ✅ |
| Sticky FAB cart button dengan badge qty | ✅ |
| Pilih metode: Delivery / Pickup | ✅ |
| Dropdown wilayah delivery + ongkir otomatis | ✅ |
| Validasi area tidak terlayani (redirect WA toko) | ✅ |
| Form checkout: nama, HP, alamat, catatan | ✅ |
| Ringkasan pesanan: subtotal + ongkir + total | ✅ |
| Generate pesan WhatsApp otomatis & redirect wa.me | ✅ |
| Validasi form sebelum kirim ke WhatsApp | ✅ |
| Section Area Delivery (tampilkan daftar wilayah & ongkir) | ✅ |
| Section Lokasi & Kontak (Google Maps embed, jam buka, sosmed) | ✅ |
| Navbar sticky + scroll effect + mobile hamburger | ✅ |
| Responsive mobile-first (480px, 768px, 900px) | ✅ |
| Animasi scroll fade-in pada section cards | ✅ |
| Footer lengkap | ✅ |

---

## 📁 Struktur File

```
/
├── index.html          — Halaman utama (single-page)
├── css/
│   └── style.css       — Semua styling (warm tone, mobile-first)
├── js/
│   ├── data.js         — Data menu, zona delivery, konfigurasi bisnis
│   ├── cart.js         — Logic keranjang, ongkir, WhatsApp sender
│   └── main.js         — Render menu, tabs, area grid, navbar, init
└── README.md
```

---

## 🌐 Entry Points

| Path | Deskripsi |
|---|---|
| `/` atau `index.html` | Halaman utama |
| `#menu` | Langsung scroll ke menu |
| `#area-delivery` | Langsung scroll ke area delivery |
| `#checkout` | Langsung scroll ke form checkout |
| `#lokasi` | Langsung scroll ke lokasi & kontak |

---

## ⚙️ Cara Kustomisasi Data

Semua data bisnis dan menu tersimpan di satu file: **`js/data.js`**

### 1. Data Bisnis (`BUSINESS`)
```js
const BUSINESS = {
  name:      'Bakso Mantap Jaya',     // Nama toko
  whatsapp:  '6281234567890',          // Format 62xxxxxxxxx (tanpa +)
  instagram: 'baksomantapjaya',
  tiktok:    'bakso.mantap.jaya',
  address:   'Jl. Contoh Raya No 1, Blora',
  gmapsEmbed: '...',                   // URL embed Google Maps
  hours:     'Setiap Hari, 08.00 – 21.00 WIB',
};
```

### 2. Menu (`MENU_DATA`)
Setiap item punya struktur:
```js
{
  id:       'unik-id',        // ID unik (lowercase, no spasi)
  category: 'makanan',        // 'makanan' | 'tambahan' | 'minuman'
  name:     'Nama Menu',
  price:    15000,             // Harga dalam Rupiah (angka, bukan string)
  emoji:    '🍜',             // Emoji representasi produk
  desc:     'Deskripsi...',
  badge:    'Best Seller',    // Opsional: 'Best Seller' | 'Favorit' | 'Populer' | 'Khas' | '' | '⚠️ Konfirmasi'
}
```

### 3. Zona Delivery (`DELIVERY_ZONES`)
```js
{ id: 'blora-kota', name: 'Blora Kota', ongkir: 5000 }
// Tambah/hapus zona sesuai area layanan nyata
```

---

## ⚠️ Checklist Sebelum Rilis

- [ ] Ganti No. WhatsApp dengan nomor aktif toko (`BUSINESS.whatsapp` di `data.js`)
- [ ] Ganti akun Instagram & TikTok dengan yang aktif
- [ ] Ganti alamat toko dan update embed Google Maps dengan koordinat asli
- [ ] Konfirmasi harga **Bakso Komplit** (Rp11.000 — kemungkinan salah tulis)
- [ ] Konfirmasi harga **Mie Ayam Ceker** (sementara disamakan Rp16.000)
- [ ] Update daftar **wilayah delivery & ongkir** sesuai kesepakatan toko
- [ ] Tambahkan **foto produk** nyata (close-up, minimal 8–10 foto) — ganti emoji dengan tag `<img>`
- [ ] Tambahkan/update jam operasional jika berbeda per hari
- [ ] Update **copyright year** di footer jika perlu

---

## 🚀 Template Pesan WhatsApp

Pesan yang dikirim ke toko mengikuti format:
```
Halo Bakso Mantap Jaya, saya ingin pesan:

*Pesanan:*
- Bakso Daging x2 = Rp30.000
- Mie Ayam x1 = Rp16.000

Metode  : Delivery 🛵
Wilayah : Blora Kota
Alamat  : Jl. Mawar No.5, RT 01/02, Blora
Nama    : Budi Santoso
No. HP  : 08123456789
Catatan : Kuah terpisah, tanpa seledri

---
Subtotal: Rp46.000
Ongkir  : Rp5.000
*Total  : Rp51.000*

Mohon konfirmasi pesanan saya. Terima kasih 🙏
```

---

## 🎨 Design System

| Token | Nilai | Penggunaan |
|---|---|---|
| `--red` | `#d62828` | Warna primer utama |
| `--orange` | `#f77f00` | Aksen hangat |
| `--cream` | `#fffaf5` | Background utama |
| `--warm-bg` | `#fff8f0` | Background section alternatif |
| Font Heading | Rubik 700–900 | Judul & harga |
| Font Body | Nunito 400–800 | Teks umum |

---

## 📌 Rekomendasi Pengembangan Selanjutnya

1. **Foto produk** — Ganti emoji placeholder dengan foto close-up produk asli (format WebP, max 200kb per foto)
2. **Koordinat Maps** — Update embed Google Maps ke koordinat toko yang tepat
3. **Jam operasional** — Tampilkan status "Buka / Tutup" secara real-time berdasarkan jam
4. **Ulasan pelanggan** — Tambahkan section testimoni/rating
5. **Promo banner** — Tambahkan section promo atau diskon harian
6. **PWA** — Tambahkan manifest.json & service worker agar bisa di-install di HP

---

*Website ini adalah static site (HTML + CSS + JS murni), tidak membutuhkan server atau database.*
