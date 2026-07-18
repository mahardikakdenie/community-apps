export const TEAL = '#00C5A1';
export const ORANGE = '#FF6235';
export const YELLOW = '#FFD23F';
export const NAVY = '#0D1B2A';
export const LIGHT = '#F4FAF8';

export const events = [
  {
    id: 1, title: 'Futsal GBK Open', category: 'Futsal',
    time: 'Sabtu, 19 Jul • 08:00', venue: 'GBK Sports Hall',
    slots: 8, total: 20, price: 'Rp 35.000',
    color: ORANGE, bg: '#FFF1ED', emoji: '⚽',
  },
  {
    id: 2, title: 'MLBB Community Cup', category: 'MLBB',
    time: 'Sabtu, 19 Jul • 14:00', venue: 'Warkomp Kemang',
    slots: 16, total: 32, price: 'Gratis',
    color: TEAL, bg: '#E6FAF6', emoji: '🎮',
  },
  {
    id: 3, title: 'Congklak Championship', category: 'Congklak',
    time: 'Minggu, 20 Jul • 10:00', venue: 'Taman Menteng',
    slots: 12, total: 24, price: 'Rp 10.000',
    color: '#C77A00', bg: '#FFF8E1', emoji: '🎯',
  },
  {
    id: 4, title: 'Badminton GOR Kelapa', category: 'Badminton',
    time: 'Minggu, 20 Jul • 07:00', venue: 'GOR Kelapa Gading',
    slots: 4, total: 16, price: 'Rp 25.000',
    color: '#7B5EA7', bg: '#F3EEFF', emoji: '🏸',
  },
];

export const cafes = [
  {
    id: 1,
    name: 'Kopi Nusantara',
    type: 'Warung Kopi',
    area: 'Menteng, Jakarta Pusat',
    distance: '0.8 km',
    rating: 4.8,
    reviews: 312,
    hours: '06:00 – 23:00',
    tags: ['Wi-Fi Cepat', 'AC', 'Stop Kontak'],
    partner: true,
    discount: '20% untuk member HJP',
    capacity: 40,
    img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=200&fit=crop&auto=format',
    emoji: '☕',
    events: ['MLBB Community Cup', 'Dev Meetup'],
    membersHere: [
      { id: 101, name: 'Budi', emoji: '🧑‍💻' },
      { id: 102, name: 'Siti', emoji: '👩‍🎨' },
      { id: 103, name: 'Reza', emoji: '🧑‍🚀' },
    ],
  },
  {
    id: 2,
    name: 'Depot Suroboyo',
    type: 'Warung Makan',
    area: 'Kebayoran, Jakarta Selatan',
    distance: '1.4 km',
    rating: 4.6,
    reviews: 189,
    hours: '07:00 – 22:00',
    tags: ['Parkir Motor', 'AC', 'Live Music'],
    partner: true,
    discount: '15% untuk member HJP',
    capacity: 60,
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=200&fit=crop&auto=format',
    emoji: '🍜',
    events: ['Futsal After-Party'],
    membersHere: [
      { id: 104, name: 'Dewi', emoji: '👩‍⚕️' },
    ],
  },
  {
    id: 3,
    name: 'Warkomp Kemang',
    type: 'Warung Komputer',
    area: 'Kemang, Jakarta Selatan',
    distance: '2.1 km',
    rating: 4.7,
    reviews: 245,
    hours: '10:00 – 02:00',
    tags: ['Gaming PC', 'Wi-Fi 100Mbps', 'PS5'],
    partner: true,
    discount: '10% + 1 jam gratis untuk member HJP',
    capacity: 30,
    img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=200&fit=crop&auto=format',
    emoji: '🖥️',
    events: ['MLBB Community Cup'],
    membersHere: [
      { id: 105, name: 'Adit', emoji: '🧑‍🎓' },
      { id: 106, name: 'Lina', emoji: '👩‍💻' },
    ],
  },
  {
    id: 4,
    name: 'Kafe Mentari',
    type: 'Kafe',
    area: 'Cikini, Jakarta Pusat',
    distance: '1.9 km',
    rating: 4.2,
    reviews: 87,
    hours: '08:00 – 21:00',
    tags: ['Wi-Fi', 'Quiet Zone'],
    partner: false,
    discount: null,
    capacity: 25,
    img: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400&h=200&fit=crop&auto=format',
    emoji: '🌿',
    events: [],
    membersHere: [],
  },
  {
    id: 5,
    name: 'Warung Pak Beno',
    type: 'Warung Nasi',
    area: 'Tebet, Jakarta Selatan',
    distance: '3.2 km',
    rating: 4.4,
    reviews: 134,
    hours: '06:00 – 20:00',
    tags: ['Murah', 'Parkir Motor'],
    partner: false,
    discount: null,
    capacity: 20,
    img: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&h=200&fit=crop&auto=format',
    emoji: '🍚',
    events: [],
    membersHere: [],
  },
  {
    id: 6,
    name: 'Kedai Kang Asep',
    type: 'Kedai Kopi',
    area: 'Mampang, Jakarta Selatan',
    distance: '2.7 km',
    rating: 4.3,
    reviews: 56,
    hours: '07:00 – 22:00',
    tags: ['Outdoor', 'Live Music'],
    partner: false,
    discount: null,
    capacity: 35,
    img: 'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=400&h=200&fit=crop&auto=format',
    emoji: '🎵',
    events: [],
    membersHere: [
      { id: 107, name: 'Andi', emoji: '🧑‍🌾' },
    ],
  },
];

export const mapPins = [
  { id: 1, x: 38, y: 32, label: 'Futsal', color: ORANGE, emoji: '⚽' },
  { id: 2, x: 62, y: 54, label: 'MLBB', color: TEAL, emoji: '🎮' },
  { id: 3, x: 25, y: 58, label: 'Congklak', color: '#C77A00', emoji: '🎯' },
  { id: 4, x: 74, y: 28, label: 'Badminton', color: '#7B5EA7', emoji: '🏸' },
  { id: 5, x: 50, y: 72, label: 'Lari Pagi', color: ORANGE, emoji: '🏃' },
];

export const ticketsData = [
  {
    id: 1, title: 'Futsal GBK Open', date: 'Sabtu, 19 Jul 2026',
    time: '08:00 – 10:00', venue: 'GBK Sports Hall',
    status: 'Confirmed' as const, color: ORANGE, emoji: '⚽', code: 'HJP-001928',
  },
  {
    id: 2, title: 'MLBB Community Cup', date: 'Sabtu, 19 Jul 2026',
    time: '14:00 – 18:00', venue: 'Warkomp Kemang',
    status: 'Pending' as const, color: TEAL, emoji: '🎮', code: 'HJP-001764',
  },
];

export type Ticket = typeof ticketsData[number];
