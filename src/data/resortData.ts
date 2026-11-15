export interface RoomCategory {
  id: string;
  index: string;
  category: 'Luxury Villa' | 'Bungalow' | 'Family Deluxe' | 'Mud House' | 'Wooden Cabana';
  name: string;
  shortName: string;
  size: string;
  occupancy: string;
  maxAdults: number;
  maxChildren: number;
  priceLkr: number;
  priceFormatted: string;
  description: string;
  amenities: string[];
  panels: {
    label: string;
    subtitle: string;
    image: string;
  }[];
  thumbnail: string;
}

export interface StickyShowcaseCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  hotspots: {
    id: string;
    label: string;
    detail: string;
    x: string;
    y: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  time: string;
  image: string;
}

export interface GuestReview {
  id: string;
  guest: string;
  origin: string;
  stayType: string;
  rating: string;
  quote: string;
}

// All 15 enhanced local resort photographs (public/images/resort/resort-01..15.jpg)
export const RESORT_PHOTOS = {
  cabanaSide: `${import.meta.env.BASE_URL}images/resort/resort-01.jpg`,
  cabanaFront: `${import.meta.env.BASE_URL}images/resort/resort-02.jpg`,
  cabanaBalconyDeck: `${import.meta.env.BASE_URL}images/resort/resort-03.jpg`,
  cabanaHillside: `${import.meta.env.BASE_URL}images/resort/resort-04.jpg`,
  cabanaBedroom: `${import.meta.env.BASE_URL}images/resort/resort-05.jpg`,
  earthenDiningNook: `${import.meta.env.BASE_URL}images/resort/resort-06.jpg`,
  luxuryDoubleSuite: `${import.meta.env.BASE_URL}images/resort/resort-07.jpg`,
  luxuryWindowLounge: `${import.meta.env.BASE_URL}images/resort/resort-08.jpg`,
  panoramicValleyGlass: `${import.meta.env.BASE_URL}images/resort/resort-09.jpg`,
  mudHouseBedroom: `${import.meta.env.BASE_URL}images/resort/resort-10.jpg`,
  mudHouseExterior: `${import.meta.env.BASE_URL}images/resort/resort-11.jpg`,
  mudHouseLounge: `${import.meta.env.BASE_URL}images/resort/resort-12.jpg`,
  verandaLanterns: `${import.meta.env.BASE_URL}images/resort/resort-13.jpg`,
  elevatedValleyBalcony: `${import.meta.env.BASE_URL}images/resort/resort-14.jpg`,
  mountainDiningPavilion: `${import.meta.env.BASE_URL}images/resort/resort-15.jpg`,
};

export const HERO_IMAGES = {
  mainMistyMountain: RESORT_PHOTOS.cabanaFront,
  pineSilhouetteMist: RESORT_PHOTOS.panoramicValleyGlass,
  finaleMountain: RESORT_PHOTOS.cabanaHillside,
};

export const STICKY_CARDS: StickyShowcaseCard[] = [
  {
    id: 'viewing-deck',
    title: 'Panoramic Viewing Deck & Living Spaces',
    subtitle: 'Elevated 1,450m above sea level',
    description:
      'Wake to silver ribbons of mist drifting through pine valleys. Our elevated timber decks and floor-to-ceiling glass suites open seamlessly onto uninterrupted Diyatalawa horizons.',
    image: RESORT_PHOTOS.panoramicValleyGlass,
    hotspots: [
      {
        id: 'misty-valley',
        label: 'Misty Valley View',
        detail: '270Â° panoramic vistas across the Haputale & Diyatalawa pine ridges.',
        x: '32%',
        y: '36%',
      },
      {
        id: 'pine-breeze',
        label: 'Cool Pine Breeze',
        detail: 'Natural mountain cross-ventilation keeping interiors crisp at 16Â°Câ€“22Â°C.',
        x: '68%',
        y: '46%',
      },
    ],
  },
  {
    id: 'natural-spring',
    title: 'The Natural Spring & Rope Swing',
    subtitle: 'Untouched 3-acre highland sanctuary',
    description:
      'Follow mossy stone pathways down to our crystal-clear highland spring and hillside rope swingâ€”tucked beneath towering pine canopies and lush emerald terraces.',
    image: RESORT_PHOTOS.cabanaHillside,
    hotspots: [
      {
        id: 'highland-spring',
        label: 'Pure Highland Spring',
        detail: 'Mineral-rich mountain stream flowing gently along our terraced gardens.',
        x: '35%',
        y: '62%',
      },
      {
        id: 'lush-estate',
        label: '3-Acre Lush Estate',
        detail: 'Private walking trails framed by wild ferns, palms, and pine groves.',
        x: '70%',
        y: '34%',
      },
    ],
  },
  {
    id: 'campfire-stargazing',
    title: 'Campfire, BBQ & Stargazing',
    subtitle: 'Dusk rituals in pure highland silence',
    description:
      'As twilight deepens over Uva Province, gather around warm lantern-lit earthen alcoves and crackling cedarwood bonfires for live BBQ grills, hot Ceylon tea, and starlight.',
    image: RESORT_PHOTOS.earthenDiningNook,
    hotspots: [
      {
        id: 'bonfire',
        label: 'Crackling Bonfire',
        detail: 'Evening firepit sessions lit nightly with seasoned highland timber.',
        x: '46%',
        y: '60%',
      },
      {
        id: 'ceylon-tea',
        label: 'Sunset Ceylon Tea',
        detail: 'Single-estate Uva high-grown tea brewed fresh with jaggery & savouries.',
        x: '73%',
        y: '42%',
      },
    ],
  },
];

export const EXPERIENCES_DATA: ExperienceItem[] = [
  {
    id: 'sri-lankan-curries',
    tag: 'Culinary Heritage',
    title: 'Authentic Sri Lankan Curries',
    description:
      'Clay-pot village rice and heirloom highland curries slow-cooked with roasted Uva spices, jackfruit, and garden greens.',
    time: 'Lunch & Dinner',
    image: RESORT_PHOTOS.earthenDiningNook,
  },
  {
    id: 'mountain-view-dining',
    tag: 'Signature Dining',
    title: 'Mountain View Dining',
    description:
      'Open-air second-story veranda breakfasts and candlelit highland dinners overlooking cloud-wrapped valleys of Diyatalawa.',
    time: '07:00 â€“ 22:00',
    image: RESORT_PHOTOS.mountainDiningPavilion,
  },
  {
    id: 'campfire-bbq',
    tag: 'After Dusk',
    title: 'Campfire BBQ & Grills',
    description:
      'Charcoal-seared meats, spiced mountain trout, and smoky vegetable skewers served beside warm lantern-lit stone verandas.',
    time: 'Nightly at 19:00',
    image: RESORT_PHOTOS.verandaLanterns,
  },
  {
    id: 'sunset-ceylon-tea',
    tag: 'Highland Ritual',
    title: 'Sunset Ceylon Tea Experience',
    description:
      'Aromatic Uva seasonal teas served on handcrafted live-edge timber balconies as golden-hour mist rolls over the pines.',
    time: 'Daily at 16:30',
    image: RESORT_PHOTOS.cabanaBalconyDeck,
  },
  {
    id: 'lawn-cricket',
    tag: 'Estate Recreation',
    title: 'Highland Lawn Cricket',
    description:
      'Friendly family matches on our manicured emerald terrace lawns framed by lush hillside cabanas and cool mountain air.',
    time: 'Morning & Afternoon',
    image: RESORT_PHOTOS.cabanaSide,
  },
  {
    id: 'evening-badminton',
    tag: 'Outdoor Leisure',
    title: 'Evening Badminton',
    description:
      'Spirited twilight rallies amidst fragrant pine trees before unwinding on your private highland balcony.',
    time: '17:00 â€“ 20:00',
    image: RESORT_PHOTOS.elevatedValleyBalcony,
  },
];

export const ROOMS_DATA: RoomCategory[] = [
  {
    id: 'luxury-cabana',
    index: '01',
    category: 'Luxury Villa',
    name: 'Luxury Villa â€“ Luxury Cabana',
    shortName: 'Luxury Cabana',
    size: '150 mÂ²',
    occupancy: '12 Adults, 4 Children',
    maxAdults: 12,
    maxChildren: 4,
    priceLkr: 38000,
    priceFormatted: 'LKR 38,000',
    description:
      'Our flagship two-story timber-and-stone highland residence designed for large families and retreats. Features panoramic live-edge wood decks, spacious quarters, and sweeping valley vistas.',
    amenities: [
      'Mountain View',
      'Private Balcony',
      'Hot Water',
      'Free Wi-Fi',
      'Ceylon Tea Maker',
      'BBQ Access',
      '24h Housekeeping',
      'Room Service',
      'Parking',
    ],
    thumbnail: RESORT_PHOTOS.cabanaFront,
    panels: [
      {
        label: 'Bedroom Sanctuary',
        subtitle: 'Warm timber interiors with crisp mountain linens',
        image: RESORT_PHOTOS.cabanaBedroom,
      },
      {
        label: 'Misty Balcony & Exterior',
        subtitle: 'Two-story pinewood cabin nestled in green hills',
        image: RESORT_PHOTOS.cabanaFront,
      },
      {
        label: 'Ensuite & Lounge',
        subtitle: 'Handcrafted live-edge timber balcony lounge',
        image: RESORT_PHOTOS.cabanaBalconyDeck,
      },
    ],
  },
  {
    id: 'whole-bungalow',
    index: '02',
    category: 'Bungalow',
    name: 'Bungalow â€“ Whole Bungalow',
    shortName: 'Whole Bungalow',
    size: '150 mÂ²',
    occupancy: '8 Adults, 3 Children',
    maxAdults: 8,
    maxChildren: 3,
    priceLkr: 31200,
    priceFormatted: 'LKR 31,200',
    description:
      'An expansive upcountry sanctuary pairing serene bright suites with an open-air mountain dining terrace. Ideal for multi-generational gatherings seeking privacy and panoramic views.',
    amenities: [
      'Mountain View',
      'Private Balcony',
      'Hot Water',
      'Free Wi-Fi',
      'Ceylon Tea Maker',
      'BBQ Access',
      '24h Housekeeping',
      'Room Service',
      'Parking',
    ],
    thumbnail: RESORT_PHOTOS.mountainDiningPavilion,
    panels: [
      {
        label: 'Bedroom Sanctuary',
        subtitle: 'Airy teak bedroom opening onto valley foliage',
        image: RESORT_PHOTOS.luxuryDoubleSuite,
      },
      {
        label: 'Misty Balcony & Exterior',
        subtitle: 'Elevated dining terrace & Sigiriya fresco pavilion',
        image: RESORT_PHOTOS.mountainDiningPavilion,
      },
      {
        label: 'Ensuite & Lounge',
        subtitle: 'Sunlit window lounge with Ceylon tea service',
        image: RESORT_PHOTOS.luxuryWindowLounge,
      },
    ],
  },
  {
    id: 'luxury-family-room',
    index: '03',
    category: 'Luxury Villa',
    name: 'Luxury Villa â€“ Family Room',
    shortName: 'Luxury Family Room',
    size: '75 mÂ²',
    occupancy: '4 Adults, 1 Child',
    maxAdults: 4,
    maxChildren: 1,
    priceLkr: 22000,
    priceFormatted: 'LKR 22,000',
    description:
      'Bright contemporary highland suite framed by floor-to-ceiling sliding glass doors, warm teak furnishings, and a private balcony overlooking Diyatalawaâ€™s pine ridges.',
    amenities: [
      'Mountain View',
      'Private Balcony',
      'Hot Water',
      'Free Wi-Fi',
      'Ceylon Tea Maker',
      'BBQ Access',
      '24h Housekeeping',
      'Room Service',
      'Parking',
    ],
    thumbnail: RESORT_PHOTOS.luxuryDoubleSuite,
    panels: [
      {
        label: 'Bedroom Sanctuary',
        subtitle: 'Spacious teak king suite with lush window frontage',
        image: RESORT_PHOTOS.luxuryDoubleSuite,
      },
      {
        label: 'Misty Balcony & Exterior',
        subtitle: 'Direct panoramic pine & valley terrace',
        image: RESORT_PHOTOS.panoramicValleyGlass,
      },
      {
        label: 'Ensuite & Lounge',
        subtitle: 'Sunlit armchair seating & tea corner',
        image: RESORT_PHOTOS.luxuryWindowLounge,
      },
    ],
  },
  {
    id: 'family-deluxe-6pax',
    index: '04',
    category: 'Family Deluxe',
    name: 'Family Deluxe Villa (6 PAX)',
    shortName: 'Family Deluxe (6 PAX)',
    size: '120 mÂ²',
    occupancy: '6 Adults, 2 Children',
    maxAdults: 6,
    maxChildren: 2,
    priceLkr: 22000,
    priceFormatted: 'LKR 22,000',
    description:
      'Generously proportioned hillside villa built for close-knit groups and extended families. Enjoy an airy window lounge, elevated bistro balcony, and direct garden access.',
    amenities: [
      'Mountain View',
      'Private Balcony',
      'Hot Water',
      'Free Wi-Fi',
      'Ceylon Tea Maker',
      'BBQ Access',
      '24h Housekeeping',
      'Room Service',
      'Parking',
    ],
    thumbnail: RESORT_PHOTOS.elevatedValleyBalcony,
    panels: [
      {
        label: 'Bedroom Sanctuary',
        subtitle: 'Bright modern suite bathed in highland light',
        image: RESORT_PHOTOS.luxuryWindowLounge,
      },
      {
        label: 'Misty Balcony & Exterior',
        subtitle: 'Wrap-around balcony above lush green slopes',
        image: RESORT_PHOTOS.elevatedValleyBalcony,
      },
      {
        label: 'Ensuite & Lounge',
        subtitle: 'Panoramic glass bay with handcrafted tea table',
        image: RESORT_PHOTOS.panoramicValleyGlass,
      },
    ],
  },
  {
    id: 'luxury-double-room',
    index: '05',
    category: 'Luxury Villa',
    name: 'Luxury Villa â€“ Double Room',
    shortName: 'Luxury Double Room',
    size: '55 mÂ²',
    occupancy: '2 Adults, 1 Child',
    maxAdults: 2,
    maxChildren: 1,
    priceLkr: 16500,
    priceFormatted: 'LKR 16,500',
    description:
      'An intimate couples sanctuary wrapped in pine scents and quiet morning fog. Wake up to freshly brewed Uva tea beside panoramic valley-facing glass doors.',
    amenities: [
      'Mountain View',
      'Private Balcony',
      'Hot Water',
      'Free Wi-Fi',
      'Ceylon Tea Maker',
      'BBQ Access',
      '24h Housekeeping',
      'Room Service',
      'Parking',
    ],
    thumbnail: RESORT_PHOTOS.panoramicValleyGlass,
    panels: [
      {
        label: 'Bedroom Sanctuary',
        subtitle: 'Teak double suite with tranquil mountain backdrop',
        image: RESORT_PHOTOS.luxuryDoubleSuite,
      },
      {
        label: 'Misty Balcony & Exterior',
        subtitle: 'Private mountain-facing glass & balcony nook',
        image: RESORT_PHOTOS.elevatedValleyBalcony,
      },
      {
        label: 'Ensuite & Lounge',
        subtitle: 'Morning tea alcove overlooking towering pines',
        image: RESORT_PHOTOS.panoramicValleyGlass,
      },
    ],
  },
  {
    id: 'family-deluxe-villa',
    index: '06',
    category: 'Family Deluxe',
    name: 'Family Deluxe Villa',
    shortName: 'Family Deluxe Villa',
    size: '45 mÂ²',
    occupancy: '4 Adults, 1 Child',
    maxAdults: 4,
    maxChildren: 1,
    priceLkr: 16500,
    priceFormatted: 'LKR 16,500',
    description:
      'Thoughtfully laid-out family retreat pairing warm timber finishes with lantern-lit stone verandas and emerald lawn frontage after hikes to Horton Plains or Ella.',
    amenities: [
      'Mountain View',
      'Private Balcony',
      'Hot Water',
      'Free Wi-Fi',
      'Ceylon Tea Maker',
      'BBQ Access',
      '24h Housekeeping',
      'Room Service',
      'Parking',
    ],
    thumbnail: RESORT_PHOTOS.verandaLanterns,
    panels: [
      {
        label: 'Bedroom Sanctuary',
        subtitle: 'Cozy timber cabin comfort & warm drapes',
        image: RESORT_PHOTOS.cabanaBedroom,
      },
      {
        label: 'Misty Balcony & Exterior',
        subtitle: 'Lantern-lit stone veranda opening onto manicured lawn',
        image: RESORT_PHOTOS.verandaLanterns,
      },
      {
        label: 'Ensuite & Lounge',
        subtitle: 'Sunlit corner lounge with garden views',
        image: RESORT_PHOTOS.luxuryWindowLounge,
      },
    ],
  },
  {
    id: 'mud-house-family',
    index: '07',
    category: 'Mud House',
    name: 'Mud House â€“ Family Villa',
    shortName: 'Mud House Villa',
    size: '40 mÂ²',
    occupancy: '4 Adults, 1 Child',
    maxAdults: 4,
    maxChildren: 1,
    priceLkr: 13200,
    priceFormatted: 'LKR 13,200',
    description:
      'An authentic Sri Lankan eco-lodge sculpted from warm ochre clay walls, rustic log furnishings, and lantern-draped eavesâ€”naturally insulated against highland chills.',
    amenities: [
      'Mountain View',
      'Private Balcony',
      'Hot Water',
      'Free Wi-Fi',
      'Ceylon Tea Maker',
      'BBQ Access',
      '24h Housekeeping',
      'Room Service',
      'Parking',
    ],
    thumbnail: RESORT_PHOTOS.mudHouseExterior,
    panels: [
      {
        label: 'Bedroom Sanctuary',
        subtitle: 'Hand-plastered ochre clay walls & rustic log bed',
        image: RESORT_PHOTOS.mudHouseBedroom,
      },
      {
        label: 'Misty Balcony & Exterior',
        subtitle: 'Earthy porch tucked at the edge of lush forest',
        image: RESORT_PHOTOS.mudHouseExterior,
      },
      {
        label: 'Ensuite & Lounge',
        subtitle: 'Textured stone sitting room & artisanal wood chairs',
        image: RESORT_PHOTOS.mudHouseLounge,
      },
    ],
  },
  {
    id: 'wooden-cabana-family',
    index: '08',
    category: 'Wooden Cabana',
    name: 'Wooden Cabana â€“ Family Room',
    shortName: 'Wooden Cabana Family',
    size: '35 mÂ²',
    occupancy: '4 Adults, 1 Child',
    maxAdults: 4,
    maxChildren: 1,
    priceLkr: 13200,
    priceFormatted: 'LKR 13,200',
    description:
      'Elevated pinewood cabin perched along the slope, bringing you closer to chirping highland birds and rustling treetops with a generous rustic balcony.',
    amenities: [
      'Mountain View',
      'Private Balcony',
      'Hot Water',
      'Free Wi-Fi',
      'Ceylon Tea Maker',
      'BBQ Access',
      '24h Housekeeping',
      'Room Service',
      'Parking',
    ],
    thumbnail: RESORT_PHOTOS.cabanaSide,
    panels: [
      {
        label: 'Bedroom Sanctuary',
        subtitle: 'All-timber cabin sanctuary with warm lighting',
        image: RESORT_PHOTOS.cabanaBedroom,
      },
      {
        label: 'Misty Balcony & Exterior',
        subtitle: 'Green-roofed pinewood lodge framed by palms',
        image: RESORT_PHOTOS.cabanaSide,
      },
      {
        label: 'Ensuite & Lounge',
        subtitle: 'Live-edge wooden veranda overlooking the hills',
        image: RESORT_PHOTOS.cabanaBalconyDeck,
      },
    ],
  },
  {
    id: 'wooden-cabana-double',
    index: '09',
    category: 'Wooden Cabana',
    name: 'Wooden Cabana â€“ Double Room',
    shortName: 'Wooden Cabana Double',
    size: '25 mÂ²',
    occupancy: '2 Adults, 1 Child',
    maxAdults: 2,
    maxChildren: 1,
    priceLkr: 8000,
    priceFormatted: 'LKR 8,000',
    description:
      'A charming, soulful alpine cabin crafted for solo dreamers and couples seeking pure quietude, crisp mountain mornings, and an intimate earthen fireside alcove.',
    amenities: [
      'Mountain View',
      'Private Balcony',
      'Hot Water',
      'Free Wi-Fi',
      'Ceylon Tea Maker',
      'BBQ Access',
      '24h Housekeeping',
      'Room Service',
      'Parking',
    ],
    thumbnail: RESORT_PHOTOS.cabanaHillside,
    panels: [
      {
        label: 'Bedroom Sanctuary',
        subtitle: 'Warm wooden retreat with cosy cedar interiors',
        image: RESORT_PHOTOS.cabanaBedroom,
      },
      {
        label: 'Misty Balcony & Exterior',
        subtitle: 'Hillside timber sanctuary surrounded by greenery',
        image: RESORT_PHOTOS.cabanaHillside,
      },
      {
        label: 'Ensuite & Lounge',
        subtitle: 'Intimate earthen & log dining alcove',
        image: RESORT_PHOTOS.earthenDiningNook,
      },
    ],
  },
];

export const GUEST_REVIEWS: GuestReview[] = [
  {
    id: 'r1',
    guest: 'Dilshan & Nethmi Perera',
    origin: 'Colombo, Sri Lanka',
    stayType: 'Luxury Cabana',
    rating: '9.4 / 10',
    quote:
      'Waking up to thick silver mist rolling right past our wooden balcony was unforgettable. The staff hospitality easily deserves 9/10â€”attentive, warm, and genuinely caring.',
  },
  {
    id: 'r2',
    guest: 'Claire & Thomas Bennett',
    origin: 'United Kingdom',
    stayType: 'Mud House â€“ Family Villa',
    rating: '8.9 / 10',
    quote:
      'Spotless, spacious rooms with such thoughtful natural character. The Sri Lankan rice and curry dinner by the crackling campfire became the highlight of our entire hill-country trip.',
  },
  {
    id: 'r3',
    guest: 'Kasun Rajapaksa',
    origin: 'Kandy, Sri Lanka',
    stayType: 'Whole Bungalow',
    rating: '9.6 / 10',
    quote:
      'Eight of us stayed in the Whole Bungalow and had the best family reunion. Lawn cricket in the afternoon, hot Ceylon tea at sunset, and a gorgeous BBQ evening under the stars.',
  },
  {
    id: 'r4',
    guest: 'Elena & Marc Vogel',
    origin: 'Zurich, Switzerland',
    stayType: 'Wooden Cabana â€“ Double',
    rating: '9.2 / 10',
    quote:
      'Pure peace in Diyatalawa. Far quieter than Ella yet only a scenic drive away. Discovering the hidden natural spring and wooden balconies among the pines felt magical.',
  },
  {
    id: 'r5',
    guest: 'Rohan & Ayesha De Silva',
    origin: 'Galle, Sri Lanka',
    stayType: 'Family Deluxe Villa',
    rating: '9.1 / 10',
    quote:
      'Everything from the spotless linen to the steaming hot water and generous Sri Lankan breakfast buffet exceeded expectations. Truly our new favourite sanctuary in Uva.',
  },
];
