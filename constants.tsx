
import { Property } from './types';

export const COLORS = {
  PRIMARY: '#001D00',
  GOLD: '#C5A059',
  GOLD_LIGHT: '#E9D29F',
  GOLD_DARK: '#8E6D3F',
  DARK_GREEN: '#001400',
};

export const HERO_VIDEOS = [
  "https://lh3.googleusercontent.com/d/14e9p34zF8itZml9iSHo1vEbn2kwiR0v_",
  "https://lh3.googleusercontent.com/d/1nmXV-HCZ5eU3KClcbmA9X6J52vbBoBLZ",
  "https://lh3.googleusercontent.com/d/1YbMJPQXKHY5ND6zKlkmUgZQgtcQnGuQp"
];

export const HERO_SLIDES = [
  {
    id: 1,
    headline: "Building Legacies Through Elite Assets",
    description: "Marbitech Properties and Investment Ltd provides sophisticated real estate solutions designed for the discerning investor. Established in 2008, we turn space into prosperity.",
    image: "https://storage.googleapis.com/marbitech/Marbitech%20Home%20Page/IMG_20260526_235136.png"
  },
  {
    id: 2,
    headline: "Strategic Wealth & Land Banking",
    description: "Secure your future with prime land acquisitions across Nigeria's fastest-growing corridors. Our strategic investments yield unparalleled returns.",
    image: "https://storage.googleapis.com/marbitech/Marbitech%20Home%20Page/IMG_20260526_201543.png"
  },
  {
    id: 3,
    headline: "Master-Planned Construction Excellence",
    description: "From architectural conceptualization to structural mastery, we deliver developments that define skylines and elevate standards of living.",
    image: "https://storage.googleapis.com/marbitech/Marbitech%20Home%20Page/IMG-20260302-WA0007.jpg"
  },
  {
    id: 4,
    headline: "Immersive Architectural Masterpieces",
    description: "Experience premium smart living configurations accented with gold-leaf finishes, refined modern spatial layouts, and sophisticated styling.",
    image: "https://storage.googleapis.com/marbitech/Marbitech%20Home%20Page/IMG-20260302-WA0017.jpg"
  },
  {
    id: 5,
    headline: "World-Class Construction Craftsmanship",
    description: "Our dedicated structural engineers deliver impeccable finishing, robust structural integrity, and exquisite aesthetic perfection.",
    image: "https://storage.googleapis.com/marbitech/Marbitech%20Home%20Page/IMG-20260302-WA0012.jpg"
  }
];

export const PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Prestige',
    location: 'Life Camp, Abuja',
    price: 'Price on Request',
    numericPrice: 850000000,
    image: 'https://storage.googleapis.com/marbitech/Marbitech%20Home%20Page/IMG_20260526_201543.png',
    type: 'Luxury Villa',
    beds: 6,
    baths: 7,
    sqft: '4,500',
    tags: ['Completed Project', 'Smart Home', 'Pool', 'Lake View'],
    description: 'A masterpiece of contemporary architecture featuring gold-accented interiors and state-of-the-art automation. This villa offers the pinnacle of luxury living in the heart of Life Camp, Abuja.',
    features: ['Infinite Pool', 'Smart Home Automation', 'Cinema Room', 'Wine Cellar', '24/7 Security'],
    yearBuilt: 2023,
    additionalImages: [
      'https://storage.googleapis.com/marbitech/Marbitech%20Home%20Page/IMG-20260302-WA0016.jpg',
      'https://storage.googleapis.com/marbitech/Marbitech%20Home%20Page/IMG-20260302-WA0017.jpg',
      'https://storage.googleapis.com/marbitech/Marbitech%20Home%20Page/IMG-20260302-WA0014.jpg',
      'https://storage.googleapis.com/marbitech/Marbitech%20Home%20Page/IMG-20260302-WA0013.jpg'
    ],
    specs: {
      'Ownership Document': 'Certificate of Occupancy (C of O)',
      'Projected Annual Yield': '12.5% - 15% ROI',
      'Construction Grade': 'Super-Elite Premium Concrete',
      'Automation System': 'Crestron Smart-System Integrated',
      'Power Infrastructure': 'Triple Grid Redundant Backup Power'
    }
  },
  {
    id: '2',
    title: 'Proposed Marbitech Prime-Point',
    location: 'Epe, Lagos',
    price: 'Price on Request',
    numericPrice: 15000000,
    image: 'https://storage.googleapis.com/marbitech/Marbitech%20Available%20properties%20/IMG-20260225-WA0008(2).jpg',
    type: 'Investment Land',
    tags: ['Proposed Project', 'High ROI', 'Gated Community', 'Instant Allocation'],
    description: 'Prime investment land strategically located for rapid appreciation. Perfect for long-term wealth creation, secure estate planning, and prestigious residential developments.',
    features: ['Perimeter Fencing', 'Electricity', 'Good Drainage', 'C of O Title', 'Green Areas'],
    yearBuilt: 2024,
    additionalImages: [
      'https://storage.googleapis.com/marbitech/Marbitech%20Available%20properties%20/IMG-20260225-WA0004.jpg',
      'https://storage.googleapis.com/marbitech/Marbitech%20Available%20properties%20/IMG-20260225-WA0003.jpg',
      'https://storage.googleapis.com/marbitech/Marbitech%20Available%20properties%20/IMG-20260225-WA0002.jpg',
      'https://storage.googleapis.com/marbitech/Marbitech%20Available%20properties%20/IMG-20260225-WA0001.jpg',
      'https://storage.googleapis.com/marbitech/Marbitech%20Available%20properties%20/IMG-20260225-WA0000.jpg'
    ],
    specs: {
      'Title Deed': 'Governor\'s Consent and C of O',
      'Topography': '100% Dry Table Land (No Sandfilling Required)',
      'Security Status': 'Gated Community Asset with 24h Military Patrol Access',
      'Investment Growth': 'Estimated 35% Capital Appreciation Per Annum',
      'Approved Use': 'Prestigious Multi-Family Residential'
    }
  },
  {
    id: '3',
    title: 'Completed Projects',
    location: 'Maitama, Abuja',
    price: 'Price on Request',
    numericPrice: 550000000,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    type: 'Modern Apartment',
    beds: 4,
    baths: 5,
    sqft: '3,200',
    tags: ['Completed Project', 'Penthouse', 'City View', 'Private Lift'],
    description: 'Experience unparalleled luxury in the heart of the capital. High ceilings and gold-leaf finishes throughout with a 360-degree majestic view of the Abuja skyline.',
    features: ['Private Elevator', 'Roof Terrace', 'Gym Access', 'Concierge Service'],
    yearBuilt: 2022,
    additionalImages: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1531971589569-0d93700dab0e?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      'Ownership Title': 'Federal Capital Territory Certificate of Occupancy',
      'Penthouse Location': 'Top 2 Exclusive Floors of Elite Heights',
      'Interior Finishing': 'Italian Royal Calacatta Marble & 18K Gold leaf accents',
      'Elevator Infrastructure': 'Bespoke Double-Redundancy Schindler Executive Lift',
      'Climate Control': 'Multi-Zone VRV Central Air Conditioning'
    }
  },
  {
    id: '4',
    title: 'Marbitech Heights Commercial',
    location: 'Lekki Phase 1, Lagos',
    price: 'Price on Request',
    numericPrice: 1200000000,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    type: 'Commercial',
    sqft: '12,500',
    tags: ['Completed Project', 'Offices', 'Prime Location', 'Parking'],
    description: 'A premium office complex designed for elite businesses seeking a statement address. Flexible layout plates, premium glass curtains, and high-speed intelligent elevators.',
    features: ['Fiber Optic Internet', 'Underground Parking', 'Backup Power', 'Lobby Café'],
    yearBuilt: 2023,
    additionalImages: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      'Regulatory Authority': 'Approved Commercial Development Licence, Lekki Masterplan Grid',
      'Parking Ratio': 'Custom allotment of 4 parking stalls per 100 sq meters leased',
      'Thermal Control': 'Double-Glazed Low-E Performance Glass Curtain Wall',
      'Connectivity': 'Dedicated Direct High-Speed Dark Fiber Loop Connection',
      'Egress Design': 'Premium Triple Emergency Core with Smart Fire suppression'
    }
  },
  {
    id: '5',
    title: 'The Gold Leaf Residences - Interior',
    location: 'Banana Island, Lagos',
    price: 'Price on Request',
    numericPrice: 250000000,
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faeaa6?auto=format&fit=crop&w=1200&q=80',
    type: 'Interior Design',
    sqft: '2,800',
    tags: ['Completed Project', 'Bespoke', 'Gold Accents', 'Luxury'],
    description: 'A comprehensive interior overhaul of a premier Banana Island penthouse. Featuring custom-crafted Italian furnishings and bespoke gold-leaf structural elements.',
    features: ['Custom Millwork', 'Imported Marble', 'Automated Lighting', 'Art Procurement'],
    yearBuilt: 2024,
    additionalImages: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&w=1200&q=80'
    ],
    specs: {
      'Design House': 'Marbitech Bespoke Studio Collaborations',
      'Material Source': 'Direct importations from Cararra and Milan, Italy',
      'Gold Integrity': 'Exquisite manual gold leaf gilding (22 Karat purity)',
      'Lighting Layout': 'Architectural dynamic Lutron lighting scenarios',
      'Art Integration': 'Pre-curated original African abstract works included'
    }
  }
];
