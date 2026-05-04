
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
    image: "https://lh3.googleusercontent.com/d/1JT-89cjBHUD_8nX8CpDolAzysVU-0EkW"
  },
  {
    id: 2,
    headline: "Strategic Wealth & Land Banking",
    description: "Secure your future with prime land acquisitions across Nigeria's fastest-growing corridors. Our strategic investments yield unparalleled returns.",
    image: "https://lh3.googleusercontent.com/d/1eNAuAN_DRtyR3zkJZCQVfAdI3xU3TkJp"
  },
  {
    id: 3,
    headline: "Master-Planned Construction Excellence",
    description: "From architectural conceptualization to structural mastery, we deliver developments that define skylines and elevate standards of living.",
    image: "https://lh3.googleusercontent.com/d/1zEKuHRCJs7GLAjg-xNJkbKdn7xbaVvQT"
  }
];

export const PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'The Marbitech Zenith Villa',
    location: 'Victoria Island, Lagos',
    price: 'Price on Request',
    numericPrice: 850000000,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    type: 'Luxury Villa',
    beds: 6,
    baths: 7,
    sqft: '4,500',
    tags: ['Smart Home', 'Pool', 'Ocean View'],
    description: 'A masterpiece of contemporary architecture featuring gold-accented interiors and state-of-the-art automation. This villa offers the pinnacle of luxury living in the heart of Lagos.',
    features: ['Infinite Pool', 'Smart Home Automation', 'Cinema Room', 'Wine Cellar', '24/7 Security'],
    yearBuilt: 2023
  },
  {
    id: '2',
    title: 'Emerald Garden Estate',
    location: 'Epe, Lagos',
    price: 'Price on Request',
    numericPrice: 15000000,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    type: 'Investment Land',
    tags: ['High ROI', 'Gated Community', 'Instant Allocation'],
    description: 'Prime investment land strategically located for rapid appreciation. Perfect for long-term wealth creation and residential development.',
    features: ['Perimeter Fencing', 'Electricity', 'Good Drainage', 'C of O Title', 'Green Areas'],
    yearBuilt: 2024
  },
  {
    id: '3',
    title: 'The Imperial Penthouse',
    location: 'Maitama, Abuja',
    price: 'Price on Request',
    numericPrice: 550000000,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    type: 'Modern Apartment',
    beds: 4,
    baths: 5,
    sqft: '3,200',
    tags: ['Penthouse', 'City View', 'Private Lift'],
    description: 'Experience unparalleled luxury in the heart of the capital. High ceilings and gold-leaf finishes throughout with a 360-degree view of the city.',
    features: ['Private Elevator', 'Roof Terrace', 'Gym Access', 'Concierge Service'],
    yearBuilt: 2022
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
    tags: ['Offices', 'Prime Location', 'Parking'],
    description: 'A premium office complex designed for elite businesses seeking a statement address. Flexible floor plans and high-speed elevators.',
    features: ['Fiber Optic Internet', 'Underground Parking', 'Backup Power', 'Lobby Café'],
    yearBuilt: 2023
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
    tags: ['Bespoke', 'Gold Accents', 'Luxury'],
    description: 'A comprehensive interior overhaul of a premier penthouse. Featuring custom-crafted Italian furnishings and bespoke gold-leaf structural elements.',
    features: ['Custom Millwork', 'Imported Marble', 'Automated Lighting', 'Art Procurement'],
    yearBuilt: 2024
  }
];
