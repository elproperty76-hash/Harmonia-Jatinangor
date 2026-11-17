export interface UnitType {
  id: string;
  code: string;
  name: string;
  category: string;
  unitCount: string;
  unitCodes: string;
  landArea: string;
  buildingArea: string;
  bedrooms: number;
  bathrooms: number;
  floors: string;
  extras: string[];
  description: string;
  exteriorImage: string;
  roomImage: string;
  floorplanImage: string;
  price: number;
  priceFormatted: string;
  rentPerRoom: number;
  monthlyGross: number;
  monthlyOpex: number;
  monthlyNet: number;
  yearlyNetManaged: number;
  yearlyNetSelf: number;
  roiManaged: string;
  capitalGain: string;
  totalRoi: string;
  accentColor: string;
}

export const CONTACT_CONFIG = {
  whatsappRaw: '082310433799',
  whatsappDisplay: '0823-1043-3799',
  whatsappIntl: '6282310433799',
  adminEmail: 'el.property76@gmail.com',
  developer: 'Isykariman Property Syariah',
  producer: 'Harmonia Student House',
  location: 'Jl. Cikuda, Jatinangor, Kab. Sumedang',
};

export function buildWhatsAppUrl(customMessage?: string): string {
  const defaultMsg =
    'Halo Tim Harmonia Student House Jatinangor, saya ingin konsultasi investasi unit Rukost / Apartkost.';
  return `https://wa.me/${CONTACT_CONFIG.whatsappIntl}?text=${encodeURIComponent(
    customMessage || defaultMsg
  )}`;
}

export const UNIT_TYPES: UnitType[] = [
  {
    id: 'apartkost-4',
    code: 'TYPE KENCANA · C1–C8',
    name: 'Apartkost 4 Kamar',
    category: 'Apartkost',
    unitCount: '8 Unit Tersedia',
    unitCodes: 'C1 – C8',
    landArea: '31 m²',
    buildingArea: '61 m²',
    bedrooms: 4,
    bathrooms: 4,
    floors: '2 Lantai (Tangga Bersama)',
    extras: ['Full Furnish', 'Dapur Bersama', 'Smart Doorlock', 'Ruang Shaft Pipa'],
    description:
      'Konsep dua unit dalam satu bangunan menghadirkan pilihan kepemilikan yang lebih fleksibel dengan satu tangga bersama di tengah dan pembagian ruang yang efisien.',
    exteriorImage: '/images/unit-apartkost-ext.webp',
    roomImage: '/images/unit-apartkost-room.webp',
    floorplanImage: '/images/denah-apartkost.webp',
    price: 666_000_000,
    priceFormatted: 'Rp 666.000.000',
    rentPerRoom: 1_300_000,
    monthlyGross: 5_200_000,
    monthlyOpex: 1_000_000,
    monthlyNet: 4_200_000,
    yearlyNetManaged: 50_400_000,
    yearlyNetSelf: 62_400_000,
    roiManaged: '7,57%',
    capitalGain: '5,00%',
    totalRoi: '12,57%',
    accentColor: '#0E7490',
  },
  {
    id: 'rukost-4',
    code: 'TYPE KENCANA · B1–B3',
    name: 'Rumah Kost 4 Kamar',
    category: 'Rukost Mandiri',
    unitCount: '3 Unit Tersedia',
    unitCodes: 'B1 – B3',
    landArea: '40 m²',
    buildingArea: '77 m²',
    bedrooms: 4,
    bathrooms: 4,
    floors: '2 Lantai (Akses Pribadi)',
    extras: ['Full Furnish', 'Akses & Tangga Pribadi', 'Smart Doorlock', 'Privasi Penuh'],
    description:
      'Setiap unit rumah kost memiliki akses masuk dan tangga pribadi, dengan seluruh 4 kamar berada dalam satu kepemilikan untuk privasi dan keleluasaan pengelolaan penuh.',
    exteriorImage: '/images/unit-rukost4-ext.webp',
    roomImage: '/images/unit-rukost4-room.webp',
    floorplanImage: '/images/denah-rukost4.webp',
    price: 888_000_000,
    priceFormatted: 'Rp 888.000.000',
    rentPerRoom: 1_700_000,
    monthlyGross: 6_800_000,
    monthlyOpex: 1_000_000,
    monthlyNet: 5_800_000,
    yearlyNetManaged: 69_600_000,
    yearlyNetSelf: 81_600_000,
    roiManaged: '7,84%',
    capitalGain: '5,00%',
    totalRoi: '12,84%',
    accentColor: '#7C3AED',
  },
  {
    id: 'mezzanine-4',
    code: 'TYPE KALYCA · A1–A2',
    name: 'Rukost 4 Kamar Mezzanine',
    category: 'Rukost Mezzanine',
    unitCount: '2 Unit Tersedia',
    unitCodes: 'A1 – A2',
    landArea: '40 m²',
    buildingArea: '90 m²',
    bedrooms: 4,
    bathrooms: 4,
    floors: '2 Lantai + Mezzanine',
    extras: ['Full Furnish', 'Ruang Vertikal Mezzanine', 'Sewa Tertinggi/Kamar', 'Akses Mandiri'],
    description:
      'Menghadirkan konsep rumah kost dengan kamar mezzanine yang memaksimalkan ruang secara vertikal. Dirancang fungsional dan premium dengan nilai sewa hingga Rp 2 juta/kamar.',
    exteriorImage: '/images/unit-mezzanine-ext.webp',
    roomImage: '/images/unit-mezzanine-room.webp',
    floorplanImage: '/images/denah-mezzanine.webp',
    price: 999_000_000,
    priceFormatted: 'Rp 999.000.000',
    rentPerRoom: 2_000_000,
    monthlyGross: 8_000_000,
    monthlyOpex: 1_000_000,
    monthlyNet: 7_000_000,
    yearlyNetManaged: 84_400_000,
    yearlyNetSelf: 96_000_000,
    roiManaged: '8,41%',
    capitalGain: '5,00%',
    totalRoi: '13,41%',
    accentColor: '#DC2626',
  },
  {
    id: 'rukost-6',
    code: 'TYPE KENCANA · D1–D3',
    name: 'Rumah Kost 6 Kamar',
    category: 'Rukost 3 Lantai',
    unitCount: '3 Unit Tersedia',
    unitCodes: 'D1 – D3',
    landArea: '40 m²',
    buildingArea: '116 m²',
    bedrooms: 6,
    bathrooms: 6,
    floors: '3 Lantai',
    extras: ['Full Furnish', '6 Kamar Produktif', 'ROI Tertinggi 14,41%', 'Akses Mandiri'],
    description:
      'Kapasitas maksimal 6 kamar dalam bangunan 3 lantai yang dirancang efisien untuk memaksimalkan arus kas bulanan hingga Rp 8,7 juta net per bulan.',
    exteriorImage: '/images/unit-rukost6-ext.webp',
    roomImage: '/images/unit-rukost6-room.webp',
    floorplanImage: '/images/denah-rukost6.webp',
    price: 1_111_000_000,
    priceFormatted: 'Rp 1.111.000.000',
    rentPerRoom: 1_700_000,
    monthlyGross: 10_200_000,
    monthlyOpex: 1_500_000,
    monthlyNet: 8_700_000,
    yearlyNetManaged: 104_400_000,
    yearlyNetSelf: 122_400_000,
    roiManaged: '9,41%',
    capitalGain: '5,00%',
    totalRoi: '14,41%',
    accentColor: '#D97706',
  },
];

export const CAMPUS_ACCESS = [
  { name: 'UNPAD Jatinangor', time: '± 5 Menit', note: 'Ring 1 Kampus Utama' },
  { name: 'ITB Jatinangor', time: '± 6 Menit', note: 'Akses Cepat Mahasiswa' },
  { name: 'IKOPIN Jatinangor', time: '± 7 Menit', note: 'Kawasan Pendidikan' },
];

export const FACILITY_ACCESS = [
  { name: 'Area Kuliner', time: '± 1 Menit' },
  { name: 'Pusat Perbelanjaan', time: '± 3 Menit' },
  { name: 'Gerbang Tol', time: '± 10 Menit' },
  { name: 'Stasiun Kereta', time: '± 18 Menit' },
];

export const ADVANTAGES = [
  {
    title: 'One Gate System',
    desc: 'Sistem keamanan kawasan dengan akses satu gerbang terpantau.',
  },
  {
    title: 'Full Furnish Siap Huni',
    desc: '12 item furnitur & elektronik lengkap termasuk AC, Smart TV & Water Heater.',
  },
  {
    title: 'Target Market 55.000+ Mahasiswa',
    desc: '7.000+ mahasiswa baru setiap tahun di Ring 1 UNPAD, ITB & IKOPIN.',
  },
  {
    title: 'Proyeksi ROI Hingga 14,41%',
    desc: 'Kombinasi cashflow sewa kost tahunan dan estimasi capital gain 5%/tahun.',
  },
  {
    title: 'Parkir Umum Luas',
    desc: 'Area parkir mobil & motor yang lega untuk menunjang kenyamanan penghuni.',
  },
  {
    title: 'CCTV & Security 24 Jam',
    desc: 'Pengawasan kamera CCTV kawasan serta petugas keamanan siaga 24 jam.',
  },
];

export const OCCUPANCY_STRATEGIES = [
  {
    title: 'Hadir di Platform Kost',
    desc: 'Pemasaran aktif di platform terkemuka seperti Mamikos untuk menjangkau calon penyewa.',
  },
  {
    title: 'Promosi Media Sosial',
    desc: 'Kampanye kamar tersedia secara berkelanjutan melalui kanal media sosial tertarget.',
  },
  {
    title: 'Peningkatan Layanan Kost',
    desc: 'Standar manajemen kost berpengalaman sejak 2021 untuk retensi & kepuasan penghuni.',
  },
  {
    title: 'Shuttle ke Kampus',
    desc: 'Fasilitas shuttle guna memudahkan mobilitas mahasiswa dari kawasan ke kampus.',
  },
];

export const BUILDING_SPECS = [
  {
    category: 'Struktur',
    items: [
      'Besi D12 berkualitas standar konstruksi bertingkat',
      'Semen Gresik / Semen Padang / Setara',
      'Dak lantai dengan Wiremesh dan Bondek 0.75mm',
    ],
  },
  {
    category: 'Arsitektur',
    items: [
      'Dinding Bata Ringan 7.5 cm',
      'Keramik 60×60 & 30×90 Matt Surface Gray ex. Sandimas/Setara',
      'Pintu Kamar Solid Engineering + Smart Doorlock ex. ClenP/Setara',
      'Pintu Kamar Mandi uPVC, Kusen Aluminium ex. Inkalum + kaca 5mm',
      'Cat Interior Dulux Putih & Eksterior Weathershield Putih',
      'Railing tangga besi hollow 40/40 & 40/60 + Ruang Shaft pipa (Apartkost)',
    ],
  },
  {
    category: 'Sanitair & Atap',
    items: [
      'Pipa Air Bersih PVC AW & Air Kotor/Hujan Tipe D ex. Rucika',
      'Closet Duduk ex. Vlok 680/Setara, Shower Set & Floordrain ex. Onda',
      'Toren 1.000 Liter ex. Profil Tank & Biotank ex. Biofill/Setara',
      'Atap Multiroof Pasir Dark Gray dengan Rangka Baja Ringan C 0.75',
    ],
  },
];

export const INTERIOR_ITEMS = [
  { no: '01', item: 'Lemari Pakaian', dim: '50 × 60 × 190 cm', spec: 'Plywood 9mm–18mm' },
  { no: '02', item: 'Meja Belajar', dim: '80 × 60 × 75 cm', spec: 'Plywood 9mm–18mm, hollow' },
  { no: '03', item: 'Kursi Belajar', dim: 'Ukuran Standar', spec: 'Ergonomis' },
  { no: '04', item: 'Dipan', dim: '200 × 90 × 30 cm', spec: 'Kayu Pallete fin. Plitur' },
  { no: '05', item: 'Kasur', dim: '200 × 90 × 30 cm', spec: 'Royal Foam Grand' },
  { no: '06', item: 'AC', dim: '1/2 PK', spec: 'MIDEA / setara' },
  { no: '07', item: 'Smart TV', dim: '32 Inch', spec: 'CooCaa' },
  { no: '08', item: 'Water Heater', dim: '10 Liter', spec: 'Ariston' },
  { no: '09', item: 'Bantal & Guling', dim: '1 Set', spec: 'Standar Hotel' },
  { no: '10', item: 'Sprei + Bed Cover', dim: '1 Set', spec: 'Katun Nyaman' },
  { no: '11', item: 'Curtain / Tirai', dim: 'Custom Jendela', spec: 'Blackout Minimalis' },
];

export const OPEX_INCLUDES = [
  'Biaya Iklan & Pemasaran Unit',
  'Biaya IPL Kawasan & Keamanan',
  'Biaya Utilitas (Wi-Fi / Internet)',
  'Biaya House Keeping Berkala',
  'Biaya Perawatan / Maintenance',
];

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}
