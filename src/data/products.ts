import { Product, Voucher, BankOption } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_zazami_store_1790908262577.jpg';

export const FPX_BANKS: BankOption[] = [
  { id: 'mb2u', name: 'Maybank2u', shortName: 'Maybank', logoColor: '#FFC800' },
  { id: 'cimb', name: 'CIMB Clicks', shortName: 'CIMB', logoColor: '#ED1C24' },
  { id: 'bimb', name: 'Bank Islam', shortName: 'Bank Islam', logoColor: '#B22222' },
  { id: 'pbb', name: 'Public Bank Online', shortName: 'Public Bank', logoColor: '#C4161C' },
  { id: 'rhb', name: 'RHB Now', shortName: 'RHB Bank', logoColor: '#00539B' },
  { id: 'hlb', name: 'Hong Leong Connect', shortName: 'Hong Leong', logoColor: '#003366' },
  { id: 'ambank', name: 'AmOnline', shortName: 'AmBank', logoColor: '#E4002B' },
  { id: 'bsn', name: 'myBSN', shortName: 'BSN', logoColor: '#00828A' },
  { id: 'affin', name: 'Affin Always', shortName: 'Affin Bank', logoColor: '#1A428A' },
];

export const EWALLETS = [
  { id: 'tng', name: 'Touch \'n Go eWallet', desc: 'Bayar serta-merta melalui TNG eWallet' },
  { id: 'grabpay', name: 'GrabPay Malaysia', desc: 'Dapatkan GrabRewards points' },
  { id: 'shopeepay', name: 'ShopeePay Malaysia', desc: 'Baki e-dompet ShopeePay' },
];

export const MALAYSIAN_STATES = [
  'Kuala Lumpur',
  'Selangor',
  'Johor',
  'Pulau Pinang',
  'Perak',
  'Melaka',
  'Negeri Sembilan',
  'Pahang',
  'Terengganu',
  'Kelantan',
  'Kedah',
  'Perlis',
  'Sabah',
  'Sarawak',
  'Putrajaya',
  'Labuan',
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Sambal Bilis Garing Rangup Berapi Warisan',
    malayName: 'Sambal Ikan Bilis Garing Pedas Manja Tradisi Banting',
    category: 'makanan',
    categoryLabel: 'Makanan & Kudapan',
    price: 18.90,
    originalPrice: 25.00,
    discountPercent: 24,
    rating: 4.9,
    reviewCount: 384,
    soldCount: 3410,
    location: 'Banting, Selangor',
    state: 'Selangor',
    description: 'Sambal ikan bilis garing asli warisan Melayu dihasilkan daripada ikan bilis mata biru terpilih gred A dari Pulau Pangkor. Dimasak perlahan tanpa bahan pengawet sintetik, sangat rangup, harum dengan bawang goreng rangup dan cili kering kampung terpilih.',
    ingredientsOrDetails: [
      'Ikan Bilis Mata Biru Pangkor (Gred A)',
      'Cili Kering Kampung Asli',
      'Bawang Merah & Bawang Putih Goreng Rangup',
      'Minyak Sawit Berkualiti Tinggi & Garam Bukit',
      'Tanpa MSG dan Pengawet Tiruan',
      'Jangka Hayat: 9 Bulan (Suhu Bilik)'
    ],
    weight: '220g sebotol',
    stock: 145,
    image: '/src/assets/images/product_sambal_bilis_1790908276264.jpg',
    sellerName: 'Dapur Warisan Opah Banting',
    sellerRating: 4.9,
    isFlashSale: true,
    isHalal: true,
    isLocalHeritage: true,
    reviews: [
      {
        id: 'rev-1',
        userName: 'Ahmad Faiz',
        rating: 5,
        date: '2 hari lalu',
        comment: 'Ikan bilis betul-betul rangup dan banyak, tak kedekut! Makan dengan nasi panas telur mata pun dah cukup lazat. Memang terbaik produk tempatan.',
        variant: 'Pedas Standard (220g)'
      },
      {
        id: 'rev-2',
        userName: 'Nurul Hidayah',
        rating: 5,
        date: 'Seminggu lalu',
        comment: 'Packaging kemas tiada tumpah minyak langsung. Seller pos laju dan selamat sampai ke Penang.',
        variant: 'Pedas Standard (220g)'
      }
    ]
  },
  {
    id: 'prod-2',
    name: 'Kemeja Batik Lukis Sutera Moden Terengganu',
    malayName: 'Kemeja Batik Eksklusif Buatan Tangan Pengrajin Terengganu',
    category: 'pakaian',
    categoryLabel: 'Pakaian & Batik',
    price: 89.00,
    originalPrice: 139.00,
    discountPercent: 36,
    rating: 5.0,
    reviewCount: 192,
    soldCount: 890,
    location: 'Kuala Terengganu',
    state: 'Terengganu',
    description: 'Kemeja batik tenun kapas-sutera sejuk dengan corak lukis canting tangan asli dari bengkel pengrajin Kuala Terengganu. Lembut di kulit, tidak mudah renyuk, potongan moden slim-fit sesuai untuk majlis rasmi, hari Jumaat dan kenduri kahwin.',
    ingredientsOrDetails: [
      'Fabrik 100% Kapas Sutera Premium Terengganu',
      'Teknik Canting & Celup Warna Tradisional',
      'Kolar Berstruktur Kemas & Butang Cengkerang Asli',
      'Potongan Reguler / Moden Comfort Fit',
      'Tidak Panas & Sangat Sesuai Cuaca Tropika Malaysia'
    ],
    weight: '280g',
    stock: 42,
    image: '/src/assets/images/product_batik_malaysia_1790908290726.jpg',
    sellerName: 'Atelier Batik Terengganu Asli',
    sellerRating: 5.0,
    isFlashSale: true,
    isHalal: true,
    isLocalHeritage: true,
    reviews: [
      {
        id: 'rev-3',
        userName: 'Mohd Razif Shah',
        rating: 5,
        date: '3 hari lalu',
        comment: 'Kain sangat berkualiti tinggi dan sejuk. Jahitan kemas setaraf butik ternama. Bangga menyokong pengrajin Terengganu!',
        variant: 'Saiz L (Navy Blue Motif Bunga Raya)'
      }
    ]
  },
  {
    id: 'prod-3',
    name: 'Madu Kelulut Asli Hutan Hujan Tropika 350g',
    malayName: 'Madu Lebah Kelulut Liar Organik Bebas Gula Tambahan',
    category: 'kesihatan',
    categoryLabel: 'Kesihatan & Herba',
    price: 45.00,
    originalPrice: 65.00,
    discountPercent: 30,
    rating: 4.9,
    reviewCount: 265,
    soldCount: 1720,
    location: 'Jerantut, Pahang',
    state: 'Pahang',
    description: 'Madu kelulut (Trigona itama) perahan sejuk dari ladang ternakan organik pinggir Hutan Simpan Pahang. Rasa masam manis semulajadi yang kaya dengan antioksidan propolis tinggi, asid fenolik dan bioflavonoid untuk menguatkan sistem imun badan.',
    ingredientsOrDetails: [
      '100% Madu Kelulut Asli Tulen',
      'Telah Diuji Makmal Bebas Campuran Gula / Sukrosa',
      'Kaya Propolis & Antioksidan Semulajadi',
      'Pensijilan Ladang Organik Jabatan Pertanian Malaysia',
      'Simpan di tempat teduh bersuhu bilik'
    ],
    weight: '350g (Botol Kaca Amber)',
    stock: 88,
    image: '/src/assets/images/product_madu_kelulut_1790908302009.jpg',
    sellerName: 'Kelulut Emas Lembah Pahang',
    sellerRating: 4.9,
    isFlashSale: false,
    isHalal: true,
    isLocalHeritage: true,
    reviews: [
      {
        id: 'rev-4',
        userName: 'Datin Zubaidah',
        rating: 5,
        date: 'Semalam',
        comment: 'Rasa masam manis khas kelulut asli, pekat dan harum. Anak-anak dan suami amalkan satu sudu setiap pagi sebelum sarapan.',
        variant: 'Botol Kaca 350g'
      }
    ]
  },
  {
    id: 'prod-4',
    name: 'Dodol Asli Melaka Kuali Tembaga Daun Upas',
    malayName: 'Dodol Tradisi Santan Segar Melaka Tanpa Pewarna',
    category: 'makanan',
    categoryLabel: 'Makanan & Kudapan',
    price: 15.00,
    originalPrice: 20.00,
    discountPercent: 25,
    rating: 4.8,
    reviewCount: 312,
    soldCount: 2450,
    location: 'Alor Gajah, Melaka',
    state: 'Melaka',
    description: 'Dodol tradisi Melaka dikacau perlahan selama 8 jam menggunakan kuali tembaga warisan di atas kayu api getah. Menggunakan 100% santan kelapa tua segar dan gula melaka asli dari nira kelapa, kenyal dan berlemak harum.',
    ingredientsOrDetails: [
      'Tepung Pulut Kampung Gred Satu',
      'Gula Melaka Nira Kelapa Asli',
      'Pati Santan Segar Kelapa Tua',
      'Daun Pandan Segar & Secubit Garam',
      'Tekstur Kenyal Lembut Tidak Melekat Gigi'
    ],
    weight: '400g pack vakum',
    stock: 120,
    image: '/src/assets/images/product_sambal_bilis_1790908276264.jpg',
    sellerName: 'Dodol Warisan Opah Melaka',
    sellerRating: 4.8,
    isFlashSale: true,
    isHalal: true,
    isLocalHeritage: true,
    reviews: [
      {
        id: 'rev-5',
        userName: 'Kamarul Ariffin',
        rating: 5,
        date: '4 hari lalu',
        comment: 'Rasa gula melaka asli bukan gula merah pasir. Lemak manis cukup rasa.',
        variant: 'Dodol Asli Melaka (400g)'
      }
    ]
  },
  {
    id: 'prod-5',
    name: 'Kopi Tenom Robusta Sabah Warisan Campuran Mentega',
    malayName: 'Serbuk Kopi Kampung Tenom Panggang Tradisional',
    category: 'minuman',
    categoryLabel: 'Minuman Tempatan',
    price: 16.50,
    originalPrice: 22.00,
    discountPercent: 25,
    rating: 4.9,
    reviewCount: 420,
    soldCount: 4120,
    location: 'Tenom, Sabah',
    state: 'Sabah',
    description: 'Biji kopi Robusta terpilih dari lembah Tenom, Sabah, dipanggang secara tradisional dengan mentega tulen untuk menghasilkan aroma berasap (smoky) yang memukau dan rasa kopi pekat likat.',
    ingredientsOrDetails: [
      'Biji Kopi Robusta Tenom Gred Premium',
      'Mentega Tulen & Karamel Tradisi',
      'Aroma Pekat & Kurang Asiditi',
      'Sesuai untuk Kopi O, Kopi Susu & Ais Kopi Kaw'
    ],
    weight: '250g (Pek Zip Lock Kedap Udara)',
    stock: 95,
    image: '/src/assets/images/hero_zazami_store_1790908262577.jpg',
    sellerName: 'Kopi Kampung Warisan Borneo',
    sellerRating: 4.9,
    isFlashSale: false,
    isHalal: true,
    isLocalHeritage: true,
    reviews: [
      {
        id: 'rev-6',
        userName: 'Siti Aminah',
        rating: 5,
        date: '5 hari lalu',
        comment: 'Waktu bancuh satu rumah bau wangi kopi Tenom. Kaw sangat bila letak susu pekat!',
        variant: 'Serbuk Halus 250g'
      }
    ]
  },
  {
    id: 'prod-6',
    name: 'Beg Mengkuang Anyaman Tangan Kraftangan Tempatan',
    malayName: 'Tote Bag Mengkuang Tradisi Hiasan Tali Kulit Moden',
    category: 'kraftangan',
    categoryLabel: 'Kraftangan & Seni',
    price: 38.00,
    originalPrice: 55.00,
    discountPercent: 31,
    rating: 4.9,
    reviewCount: 110,
    soldCount: 640,
    location: 'Hulu Langat, Selangor',
    state: 'Selangor',
    description: 'Anyaman daun mengkuang asli oleh komuniti suri rumah pengrajin tempatan. Diwarnakan dengan pewarna semulajadi dedaun dan dilengkapkan pemegang tali kulit kukuh, mesra alam dan sangat estetik untuk pasar malam atau pejabat.',
    ingredientsOrDetails: [
      '100% Daun Mengkuang Liar Kering',
      'Pemegang Tali Kulit Sintetik Premium Berjahit',
      'Lapisan Dalam Kanvas Berzip Selamat',
      'Dimensi: 32cm x 26cm x 12cm',
      'Tahan Lasak & Menampung Berat Sehingga 6kg'
    ],
    weight: '350g',
    stock: 35,
    image: '/src/assets/images/hero_zazami_store_1790908262577.jpg',
    sellerName: 'Kraftangan Komuniti Lembah',
    sellerRating: 4.9,
    isFlashSale: true,
    isHalal: true,
    isLocalHeritage: true,
    reviews: [
      {
        id: 'rev-7',
        userName: 'Farah Nadia',
        rating: 5,
        date: '2 minggu lalu',
        comment: 'Cantik sangat! Bawa pergi kerja ramai kawan puji. Ringan tapi muat iPad dan botol air.',
        variant: 'Natural Mengkuang Brown'
      }
    ]
  },
  {
    id: 'prod-7',
    name: 'Keropok Lekor Losong Terengganu Rangup (Vacuum Pack)',
    malayName: 'Keropok Lekor Asli Ekstra Ikan Tamban Segar',
    category: 'makanan',
    categoryLabel: 'Makanan & Kudapan',
    price: 21.00,
    originalPrice: 28.00,
    discountPercent: 25,
    rating: 4.9,
    reviewCount: 520,
    soldCount: 5380,
    location: 'Losong, Kuala Terengganu',
    state: 'Terengganu',
    description: 'Keropok lekor asli Kampung Losong dengan nisbah ikan tamban segar lebih banyak berbanding sagu. Dibungkus vakum separa masak untuk mengekalkan kesegaran isi ikan dan dihantar bersama pencicah sos cili pedas manis khas Terengganu.',
    ingredientsOrDetails: [
      'Isi Ikan Tamban Segar 80%',
      'Tepung Sagu Kampung 20%',
      'Percuma 1 Botol Sos Pencicah Asli Losong',
      'Pek Vakum 500g (Kira-kira 25 batang lekor)',
      'Boleh digoreng atau dimasak dalam air fryer'
    ],
    weight: '500g + 150ml Sos',
    stock: 160,
    image: '/src/assets/images/product_sambal_bilis_1790908276264.jpg',
    sellerName: 'Lekor Nelayan Losong Asli',
    sellerRating: 4.9,
    isFlashSale: true,
    isHalal: true,
    isLocalHeritage: true,
    reviews: [
      {
        id: 'rev-8',
        userName: 'Hafizuddin',
        rating: 5,
        date: '3 hari lalu',
        comment: 'Ikan terasa padu bukan macam lekor tepung pasar malam. Sos pencicah dia memang legend.',
        variant: 'Pek Vakum 500g'
      }
    ]
  },
  {
    id: 'prod-8',
    name: 'Minyak Kelapa Dara Organik Perahan Sejuk 200ml',
    malayName: 'Virgin Coconut Oil (VCO) Ekstra Tulen',
    category: 'kesihatan',
    categoryLabel: 'Kesihatan & Herba',
    price: 26.00,
    originalPrice: 35.00,
    discountPercent: 26,
    rating: 4.8,
    reviewCount: 148,
    soldCount: 1190,
    location: 'Bagan Datuk, Perak',
    state: 'Perak',
    description: 'Dihasilkan daripada kelapa segar matang Bagan Datuk menggunakan teknik perahan sejuk tanpa haba kimia. Jernih seperti air, beraroma kelapa segar lembut, tinggi asid laurik untuk kesihatan jantung, rambut dan kulit.',
    ingredientsOrDetails: [
      '100% Minyak Kelapa Dara Perahan Sejuk',
      'Tanpa Bahan Kimia Pemutih / Peluntur',
      'Tinggi Asid Laurik & Medium Chain Triglycerides (MCT)',
      'Sesuai diminum langsung atau disapu pada rambut dan kulit'
    ],
    weight: '200ml',
    stock: 74,
    image: '/src/assets/images/product_madu_kelulut_1790908302009.jpg',
    sellerName: 'Al-Mubarak BioHerbs',
    sellerRating: 4.8,
    isFlashSale: false,
    isHalal: true,
    isLocalHeritage: true,
    reviews: [
      {
        id: 'rev-9',
        userName: 'Dr. Noraini',
        rating: 5,
        date: 'Seminggu lalu',
        comment: 'Kualiti VCO yang sangat bersih, tiada bau hapak langsung. Bagus untuk masalah kulit kering.',
        variant: 'Botol Kaca 200ml'
      }
    ]
  },
  {
    id: 'prod-9',
    name: 'Songket Tenun Tangan Asli Bunga Tabur Kelantan',
    malayName: 'Kain Songket Tradisional Tenun Benang Emas',
    category: 'pakaian',
    categoryLabel: 'Pakaian & Batik',
    price: 155.00,
    originalPrice: 220.00,
    discountPercent: 29,
    rating: 5.0,
    reviewCount: 88,
    soldCount: 420,
    location: 'Kota Bharu, Kelantan',
    state: 'Kelantan',
    description: 'Kain pasang songket warisan tenunan tangan pengrajin Kota Bharu dengan motif bunga tabur klasik bersulamkan benang metalik emas. Kemas dan berseri untuk samping baju melayu nikah atau busana tradisional.',
    ingredientsOrDetails: [
      'Tenunan Tangan Tradisional Kek Kayu Kelantan',
      'Benang Emas Logam Tahan Luntur',
      'Ukuran Samping: 2.25 Meter (Standard Dewasa)',
      'Sesuai Digayakan Bersama Baju Melayu Teluk Belanga / Cekak Musang'
    ],
    weight: '450g',
    stock: 22,
    image: '/src/assets/images/product_batik_malaysia_1790908290726.jpg',
    sellerName: 'Tenunan Songket Diraja Kelantan',
    sellerRating: 5.0,
    isFlashSale: false,
    isHalal: true,
    isLocalHeritage: true,
    reviews: [
      {
        id: 'rev-10',
        userName: 'Ustaz Azhar',
        rating: 5,
        date: '10 hari lalu',
        comment: 'Tenunan sangat kemas dan padat. Benang emas tak tajam mencucuk. Alhamdulillah puas hati.',
        variant: 'Emerald Green + Gold Thread'
      }
    ]
  },
  {
    id: 'prod-10',
    name: 'Kerepek Ubi Kayu Pedas Basah Banting 500g',
    malayName: 'Kerepek Ubi Warisan Banting Bersalut Sambal Karamel',
    category: 'makanan',
    categoryLabel: 'Makanan & Kudapan',
    price: 13.50,
    originalPrice: 18.00,
    discountPercent: 25,
    rating: 4.9,
    reviewCount: 680,
    soldCount: 7420,
    location: 'Banting, Selangor',
    state: 'Selangor',
    description: 'Kerepek ubi kayu segar nipis rangup yang disalut karamel sambal manis pedas basah pekat tradisi Banting. Tidak liat, rangup krup-krap bila dikunyah, resepi turun-temurun sejak 1984.',
    ingredientsOrDetails: [
      'Ubi Kayu Tempatan Segar Ladang',
      'Cili Kering, Gula Pasir & Asam Jawa',
      'Bawang Merah & Garam',
      'Pek Balang Kedap Udara 500g'
    ],
    weight: '500g',
    stock: 210,
    image: '/src/assets/images/product_sambal_bilis_1790908276264.jpg',
    sellerName: 'Kerepek Legend Banting',
    sellerRating: 4.9,
    isFlashSale: true,
    isHalal: true,
    isLocalHeritage: true,
    reviews: [
      {
        id: 'rev-11',
        userName: 'Zul Zulkifli',
        rating: 5,
        date: '2 hari lalu',
        comment: 'Ubi nipis dan sambalnya pekat menyalut elok. Tak sampai sehari dah habis sebalang!',
        variant: 'Balang 500g'
      }
    ]
  },
  {
    id: 'prod-11',
    name: 'Sabun Herba Daun Bidara & Susu Kambing Asli',
    malayName: 'Sabun Mandian Terapi Tradisional Ekstrak Daun Bidara',
    category: 'kesihatan',
    categoryLabel: 'Kesihatan & Herba',
    price: 12.00,
    originalPrice: 16.00,
    discountPercent: 25,
    rating: 4.8,
    reviewCount: 195,
    soldCount: 2100,
    location: 'Jitra, Kedah',
    state: 'Kedah',
    description: 'Sabun herba buatan tangan menggunakan pati ekstrak daun bidara (sidr) segar dipadukan dengan susu kambing organik dan minyak zaitun tulen. Lembut untuk kulit sensitif dan melegakan ketegangan seharian.',
    ingredientsOrDetails: [
      'Pati Ekstrak Daun Bidara (Ziziphus mauritiana)',
      'Susu Kambing Organik Segar',
      'Minyak Zaitun & Minyak Kelapa',
      'Bebas Paraben, SLS dan Pewarna Sintetik'
    ],
    weight: '100g',
    stock: 90,
    image: '/src/assets/images/product_madu_kelulut_1790908302009.jpg',
    sellerName: 'Herba Warisan Kedah',
    sellerRating: 4.8,
    isFlashSale: false,
    isHalal: true,
    isLocalHeritage: true,
    reviews: [
      {
        id: 'rev-12',
        userName: 'Siti Maryam',
        rating: 5,
        date: 'Semalam',
        comment: 'Kulit rasa bersih dan lembut, tak mengeringkan. Bau herba sangat menenangkan fikiran.',
        variant: 'Buku Sabun 100g'
      }
    ]
  },
  {
    id: 'prod-12',
    name: 'Kicap Manis Meletup Warisan Muar 500ml',
    malayName: 'Pati Kicap Soya Perapan Kayu Tradisi Johor',
    category: 'makanan',
    categoryLabel: 'Makanan & Kudapan',
    price: 8.50,
    originalPrice: 11.50,
    discountPercent: 26,
    rating: 4.9,
    reviewCount: 390,
    soldCount: 3890,
    location: 'Muar, Johor',
    state: 'Johor',
    description: 'Kicap lemak manis istimewa Muar diperam secara semulajadi di dalam tempayan tanah liat tradisional selama berbulan-bulan. Pekat, likat dan beraroma harum kacang soya organik bukan GMO.',
    ingredientsOrDetails: [
      'Kacang Soya Bukan GMO Terpilih',
      'Karamel Gula Merah Tradisi',
      'Garam Laut & Tepung Gandum',
      'Air Bertapis Bersih'
    ],
    weight: '500ml',
    stock: 140,
    image: '/src/assets/images/product_sambal_bilis_1790908276264.jpg',
    sellerName: 'Kicap Warisan Muar',
    sellerRating: 4.9,
    isFlashSale: false,
    isHalal: true,
    isLocalHeritage: true,
    reviews: [
      {
        id: 'rev-13',
        userName: 'Cikgu Rahman',
        rating: 5,
        date: '4 hari lalu',
        comment: 'Kicap paling sedap buat cicah pisang goreng dan tauhu bakar. Pekat manis bukan rasa garam semata-mata.',
        variant: 'Botol 500ml'
      }
    ]
  }
];

export const AVAILABLE_VOUCHERS: Voucher[] = [
  {
    id: 'vouch-1',
    code: 'BEBASPOS',
    title: 'Penghantaran Percuma Seluruh Malaysia',
    description: 'Diskaun kos penghantaran RM6 untuk pembelian RM30 ke atas',
    discountType: 'free_shipping',
    value: 6,
    minSpend: 30,
    tag: 'BAUCAR POS'
  },
  {
    id: 'vouch-2',
    code: 'ZAZAMIBARU',
    title: 'Baucar Pelanggan Baru Zazami',
    description: 'Diskaun serta-merta RM10 untuk pesanan pertama anda',
    discountType: 'fixed',
    value: 10,
    minSpend: 40,
    tag: 'PELANGGAN BARU'
  },
  {
    id: 'vouch-3',
    code: 'LOKAL15',
    title: 'Kempen Beli Barangan Malaysia',
    description: 'Potongan 15% untuk semua kraftangan dan makanan tempatan',
    discountType: 'percentage',
    value: 15,
    minSpend: 50,
    maxDiscount: 20,
    tag: 'BUATAN MALAYSIA'
  }
];
