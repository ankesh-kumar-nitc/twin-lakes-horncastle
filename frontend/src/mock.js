// Mock data for Twin Lakes Horncastle clone

export const IMAGES = {
  hero: 'https://media.base44.com/images/public/6a234b12c3499be6f1340dd5/ee9cd6094_generated_42ae327a.png',
  dayTicket: 'https://media.base44.com/images/public/6a234b12c3499be6f1340dd5/d675ffaea_generated_fdeaf67d.png',
  syndicate: 'https://media.base44.com/images/public/6a234b12c3499be6f1340dd5/a825e6ead_generated_de714755.png',
  camping: 'https://media.base44.com/images/public/6a234b12c3499be6f1340dd5/69d1cc173_generated_9947827d.png',
  lodge: 'https://media.base44.com/images/public/6a234b12c3499be6f1340dd5/3aa1506ac_generated_f092c628.png',
  restaurant: 'https://media.base44.com/images/public/6a234b12c3499be6f1340dd5/d7c4aaef3_generated_b6f122ef.png',
  reception: 'https://media.base44.com/images/public/6a234b12c3499be6f1340dd5/5de53dc29_generated_1f208823.png'
};

export const OFFERINGS = [
  { title: 'Exclusive Fisheries', desc: 'Hire the whole lake for your group — The Mystery Pool, exclusively yours for the session.', img: IMAGES.dayTicket, link: '/day-ticket-fishing' },
  { title: 'Syndicate Lake', desc: 'Exclusive, low-pressure fishing for dedicated anglers seeking trophy catches.', img: IMAGES.syndicate, link: '/syndicate-lake' },
  { title: 'Camping', desc: 'Pitch up alongside the lakes for an authentic waterside experience.', img: IMAGES.camping, link: '/stay-and-dine' },
  { title: 'Lakeside Lodge', desc: 'Comfortable lakeside lodges for the complete angling and leisure retreat.', img: IMAGES.lodge, link: '/stay-and-dine', comingSoon: true },
  { title: 'Onsite Bar & Restaurant', desc: 'Locally sourced cuisine served with views across the water.', img: IMAGES.restaurant, link: '/stay-and-dine', comingSoon: true },
  { title: 'Reception Hall', desc: 'A stunning venue for weddings, celebrations, and corporate events.', img: IMAGES.reception, link: '/events', comingSoon: true }
];

export const ROOMS = [
  { id: 'small-1', name: 'Small Cabin 1', size: 'small', capacity: 2, price: 120, desc: 'Cosy cabin sleeping up to 2 guests.' },
  { id: 'small-2', name: 'Small Cabin 2', size: 'small', capacity: 2, price: 120, desc: 'Cosy cabin sleeping up to 2 guests.' },
  { id: 'big-1', name: 'Big Lodge 1', size: 'big', capacity: 4, price: 220, desc: 'Spacious lodge with fireplace, sleeps up to 4.' },
  { id: 'big-2', name: 'Big Lodge 2', size: 'big', capacity: 4, price: 220, desc: 'Spacious lodge with fireplace, sleeps up to 4.' }
];

// Mock booked dates (Date objects strings)
export const MOCK_BOOKED = {
  'small-1': ['2026-08-05', '2026-08-06', '2026-08-15'],
  'small-2': ['2026-08-10', '2026-08-11'],
  'big-1': ['2026-08-01', '2026-08-02', '2026-08-03', '2026-08-20'],
  'big-2': ['2026-08-12']
};

export const SYNDICATE = {
  totalSlots: 25,
  currentMembers: 23,
  waitingListMax: 10,
  waitingListCount: 4,
  annualFee: 350,
  duration: 365
};

export const DAY_TICKET = {
  base: { hours: 48, price: 200 },
  extension: { hours: 24, price: 100 },
  totalPegs: 12
};

export const MYSTERY_POOL_GALLERY = [
  '/gallery/mystery-pool/session-01.jpg'
];

export const SYNDICATE_GALLERY = [
  '/gallery/syndicate/img01.jpg',
  '/gallery/syndicate/img02.jpg',
  '/gallery/syndicate/img03.jpg',
  '/gallery/syndicate/img04.jpg',
  '/gallery/syndicate/img05.jpg',
  '/gallery/syndicate/img06.jpg',
  '/gallery/syndicate/img07.jpg',
  '/gallery/syndicate/img08.jpg'
];

export const WHATSAPP = {
  mysteryPool: '447886357181',
  syndicate: '447538762032'
};

export const GOOGLE_REVIEWS = [
  { name: 'James Whitmore', rating: 5, date: '2 weeks ago', text: 'Absolutely stunning venue. The lakes are pristine, well-stocked and the lodges are top-notch. Best fishing trip I have had in years.', avatar: 'JW' },
  { name: 'Sophie Bennett', rating: 5, date: '1 month ago', text: 'We stayed for a weekend celebration and everything from the food to the reception hall was flawless. Highly recommend.', avatar: 'SB' },
  { name: 'Michael Turner', rating: 5, date: '3 weeks ago', text: 'The syndicate lake is a dream — pristine conditions, uncrowded banks and truly specimen fish. Worth every penny.', avatar: 'MT' },
  { name: 'Emily Carter', rating: 4, date: '2 months ago', text: 'Beautiful lakeside setting, warm hospitality and a lovely restaurant. Will be back with the family.', avatar: 'EC' },
  { name: 'David Hughes', rating: 5, date: '5 days ago', text: 'Booked a day ticket — well-marked pegs, plenty of specimen carp and a friendly bailiff. First class operation.', avatar: 'DH' },
  { name: 'Rachel Morgan', rating: 5, date: '1 week ago', text: 'The lodge was so cosy — waking up to mist rolling over the water was magical. Cannot wait to return.', avatar: 'RM' }
];

export const GOOGLE_SUMMARY = { rating: 4.3, totalReviews: 44 };
