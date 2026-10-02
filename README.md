# Zazami Online Store 🇲🇾

> **Platform E-Dagang Barangan Tempatan Malaysia dengan Pusat Pengurusan & CMS Peniaga serta Sistem Pembayaran Selamat Bersepadu.**

Zazami Online Store ialah aplikasi web e-dagang moden dan pantas yang dibina khusus untuk memartabatkan produk-produk buatan Malaysia (sambal tradisi, batik sutera Terengganu, madu kelulut asli, dodol Melaka, kerepek Banting, kraftangan mengkuang, herba bidara, dan banyak lagi). Dilengkapi dengan pengalaman membeli-belah berinspirasikan Shopee Malaysia, sistem pembayaran pelbagai saluran yang selamat, dan **Portal CMS Pengurusan Penuh (Content Management System)** untuk pemilik kedai.

---

## 🌟 Ciri-Ciri Utama

### 🛒 1. Pengalaman Pelanggan (Storefront)
- **Tawaran Kilat (Flash Deals)**: Kaunter masa berdetik langsung dengan harga diskaun khas untuk produk terhad.
- **Katalog Produk Tempatan**: Penapisan mengikut kategori (*Makanan & Kudapan, Pakaian & Batik, Kesihatan & Herba, Kraftangan & Seni, Minuman Tempatan*) serta penapisan mengikut **Negeri Asal** (*Selangor, Terengganu, Melaka, Kelantan, Pahang, Sabah, Perak, Kedah, Johor*).
- **Carian Masa Nyata**: Kotak carian pintar dengan cadangan kata kunci popular barangan tradisi Malaysia.
- **Halaman Perincian Produk (PDP)**: Paparan imej resolusi tinggi, penilaian bintang sebenar, ulasan pelanggan Malaysia, status stok, dan maklumat penjual sah.
- **Troli & Baucar Diskaun**: Kiraan kos automatik, amaran ambang penghantaran percuma Semenanjung (RM30+), dan penebusan baucar segera (`BEBASPOS`, `ZAZAMIBARU`, `LOKAL15`).
- **Senarai Keinginan (Wishlist)**: Simpan produk kegemaran dengan satu klik.

### 🔒 2. Sistem Pembayaran Selamat (Secure Payment Gateway)
- **FPX Perbankan Dalam Talian**: Maybank2u, CIMB Clicks, Bank Islam, Public Bank, RHB Now, Hong Leong Connect, AmOnline, Affin Bank dengan simulasi pengesahan TAC (2FA).
- **DuitNow QR Kebangsaan**: Paparan QR standard PayNet / Bank Negara Malaysia dengan simulasi imbas dan bayar terus.
- **Kad Debit & Kredit**: Visa & Mastercard disulitkan 256-bit SSL dengan simulasi pengesahan 3D Secure / OTP.
- **E-Dompet Tempatan**: Touch 'n Go eWallet, GrabPay, dan ShopeePay.
- **Bayar Waktu Terima (Cash On Delivery / COD)**: Bayaran tunai terus kepada kurier.
- **Jaminan Pembeli Zazami**: Polisi pemulangan percuma 15 hari dan jaminan wang dikembalikan.
- **Resit Pembayaran Rasmi & Slip Kurier**: Cetak atau simpan resit bayaran serta nombor rujukan unik.

### 📦 3. Penjejakan Pesanan (Order Tracking)
- Penjejak masa nyata fasa logistik (*Pesanan Disahkan -> Dibungkus -> Diserah ke Kurier Pos Laju / J&T -> Dalam Penghantaran -> Selesai*).
- Carian menggunakan Nombor Pesanan (`ZZM-...`) atau Nombor Tracking (`MYPOS-...`).

### 🛠️ 4. Pusat Pengurusan & CMS Peniaga (Admin CMS Portal)
- Akses bila-bila masa melalui butang **"Pusat Peniaga & CMS"** di navigasi atas, footer, atau butang terapung.
- **Papan Pemuka Analitik (Dashboard)**: Jumlah hasil jualan (RM), jumlah tempahan, status stok rendah (≤30 unit), dan pesanan masuk terkini.
- **Pengurusan Produk (CRUD)**:
  - Tambah produk tempatan baharu dengan nama, harga, harga asal, stok, negeri, imej, spesifikasi, dan tanda Flash Sale.
  - Sunting maklumat produk sedia ada.
  - Kemaskini stok cepat (+/- 5 unit terus dalam jadual).
  - Padam produk daripada katalog.
- **Pengurusan Pesanan & Logistik**:
  - Lihat semua tempahan pelanggan berserta alamat dan nombor telefon.
  - Kemaskini status pesanan (*Dibayar -> Sedang Dibungkus -> Diserah ke Kurier -> Selesai*).
  - Cetak slip pembungkusan kurier (packing slip).
- **Pengurusan Baucar & Promosi**:
  - Tambah kod baucar diskaun baharu (peratusan %, amaun tetap RM, atau percuma pos).
  - Padam atau nyahaktifkan baucar.
- **Sandaran Data (Export & Import JSON)**:
  - Muat turun semua data kedai (produk, pesanan, baucar) ke fail `.json` untuk sandaran selamat.
  - Muat naik dan pulihkan data daripada fail sandaran.
  - Pilihan untuk set semula ke data asal (Factory Reset).

---

## 💻 Teknologi (Tech Stack)

- **Frontend**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **CSS / Rekaan**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Ikon**: [Lucide React](https://lucide.dev/)
- **Animasi**: [Motion](https://motion.dev/)
- **Storan Data**: Web LocalStorage API dengan sokongan Sandaran JSON

---

## 🚀 Panduan Pemasangan & Menjalankan Projek

### Keperluan Asas:
- [Node.js](https://nodejs.org/) versi 18.0 atau ke atas
- Pengurus pakej `npm` (atau `pnpm` / `yarn`)

### Langkah-langkah:

1. **Klon Repositori:**
   ```bash
   git clone https://github.com/<username-anda>/zazami-online-store.git
   cd zazami-online-store
   ```

2. **Pasang Dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan Pelayan Pembangunan (Development Server):**
   ```bash
   npm run dev
   ```
   Buka pelayar web anda di `http://localhost:3000`.

4. **Bina untuk Pengeluaran (Production Build):**
   ```bash
   npm run build
   ```
   Fail binaan sedia ada akan dijana di dalam folder `dist/`.

---

## 📤 Panduan Menerbitkan ke GitHub (Publish to GitHub)

Untuk memuat naik kod ini ke akaun GitHub anda:

1. **Cipta Repositori Baharu di GitHub**:
   - Pergi ke [github.com/new](https://github.com/new)
   - Masukkan nama repositori: `zazami-online-store`
   - Pilih **Public** atau **Private**
   - *Jangan tick* "Initialize with README" kerana projek ini sudah mempunyai README lengkap.
   - Klik **Create repository**.

2. **Mulakan Git dan Muat Naik dari Terminal Anda**:
   ```bash
   # Masuk ke folder projek
   cd zazami-online-store

   # Inisialisasi Git
   git init

   # Tambah semua fail
   git add .

   # Buat commit pertama
   git commit -m "feat: Pelancaran Zazami Online Store dengan CMS dan pembayaran selamat"

   # Tukar nama branch utama ke main
   git branch -M main

   # Sambungkan ke repositori GitHub anda (gantikan <username-anda>)
   git remote add origin https://github.com/<username-anda>/zazami-online-store.git

   # Tolak kod ke GitHub
   git push -u origin main
   ```

---

## 🌐 Pilihan Penerbitan Langsung (Deploy ke Web)

Anda boleh menerbitkan Zazami Online Store secara percuma melalui platform-platform berikut:

### 1. Vercel
1. Pergi ke [vercel.com](https://vercel.com/) dan log masuk dengan akaun GitHub anda.
2. Klik **Add New Project** dan pilih repositori `zazami-online-store`.
3. Framework Preset: **Vite**.
4. Klik **Deploy** — laman anda akan beroperasi dalam masa kurang dari 1 minit!

### 2. Netlify
1. Log masuk ke [netlify.com](https://www.netlify.com/).
2. Pilih **Import from Git** -> **GitHub** -> `zazami-online-store`.
3. Build Command: `npm run build`
4. Publish directory: `dist`
5. Klik **Deploy Site**.

### 3. GitHub Pages
1. Pasang alat gh-pages: `npm install -D gh-pages`
2. Tambah konfigurasi `base` dalam `vite.config.ts`: `base: '/zazami-online-store/'`
3. Tambah skrip deploy dalam `package.json`: `"deploy": "vite build && gh-pages -d dist"`
4. Jalankan: `npm run deploy`

---

## 📁 Struktur Direktori Projek

```text
zazami-online-store/
├── .env.example              # Contoh pembolehubah persekitaran
├── .gitignore                # Fail yang dikecualikan daripada Git
├── index.html                # Entry point HTML dengan meta tags SEO & fon rasmi
├── metadata.json             # Maklumat profil aplikasi
├── package.json              # Dependensi dan skrip projek
├── README.md                 # Dokumentasi penuh projek (fail ini)
├── tsconfig.json             # Konfigurasi TypeScript
├── vite.config.ts            # Konfigurasi Vite & Tailwind CSS
└── src/
    ├── App.tsx               # Komponen utama menghubungkan Kedai & CMS
    ├── index.css             # Gaya global Tailwind CSS
    ├── main.tsx              # Titik masuk aplikasi React
    ├── assets/
    │   └── images/           # Aset visual berkualiti tinggi produk tempatan & hero
    ├── components/
    │   ├── CartDrawer.tsx    # Laci troli pembelian & pengiraan baucar
    │   ├── CheckoutModal.tsx # Gerbang pembayaran selamat (FPX, DuitNow, Kad, E-Wallet)
    │   ├── FlashDeals.tsx    # Tawaran kilat dengan kaunter masa berdetik
    │   ├── Footer.tsx        # Footer e-dagang rasmi & pautan CMS
    │   ├── HeroBanner.tsx    # Sepanduk kempen barangan tempatan Malaysia
    │   ├── Navbar.tsx        # Navigasi utama, bar carian, & butang CMS
    │   ├── OrderTrackerModal.tsx # Penjejak kurier Pos Laju / J&T masa nyata
    │   ├── ProductCard.tsx   # Kad produk tempatan mengikut disiplin rekaan
    │   ├── ProductModal.tsx  # Pandangan terperinci produk (PDP) & ulasan
    │   ├── TrustBadges.tsx   # Seksyen jaminan keselamatan & pulangan wang
    │   ├── VouchersModal.tsx # Dompet baucar promosi
    │   ├── WishlistModal.tsx # Senarai barang disimpan
    │   └── admin/
    │       └── AdminCMSModal.tsx # Portal CMS penuh (Produk, Pesanan, Baucar, Tetapan)
    ├── data/
    │   └── products.ts       # Data awal produk tempatan, bank FPX, & baucar
    └── types/
        └── index.ts          # Definisi jenis data TypeScript
```

---

## 📄 Lesen & Hak Cipta

Dikeluarkan di bawah lesen **MIT License**. Hak cipta terpelihara © 2026 **Zazami Online Store**.  
Dibina dengan bangga untuk menyokong ekosistem produk tempatan dan usahawan PKS Malaysia 🇲🇾.
