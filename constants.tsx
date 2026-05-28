
import { Property } from './types';

export const COLORS = {
  PRIMARY: '#001D00',
  GOLD: '#CAA44C',
  GOLD_LIGHT: '#F8E9C4',
  GOLD_DARK: '#9F8458',
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
    image: "https://lh3.googleusercontent.com/d/1Mku7SB3ABojuk7Y225v4d_PLZRcLw4TP"
  },
  {
    id: 2,
    headline: "Strategic Wealth & Land Banking",
    description: "Secure your future with prime land acquisitions across Nigeria's fastest-growing corridors. Our strategic investments yield unparalleled returns.",
    image: "https://lh3.googleusercontent.com/d/1QAstywyXbPUCFssk0OcV5NaZp_gTn4Ez"
  },
  {
    id: 3,
    headline: "Master-Planned Construction Excellence",
    description: "From architectural conceptualization to structural mastery, we deliver developments that define skylines and elevate standards of living.",
    image: "https://lh3.googleusercontent.com/d/1v8hLhaZcAYX_k38j9VoaVFvEXwR0CRdk"
  }
];

export const PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Prestige',
    price: 'Price on Request',
    numericPrice: 850000000,
    image: 'https://lh3.googleusercontent.com/d/1z1JBpYDPdffS4gKf2Hocu_JzpoMJLJgc',
    type: 'Luxury Villa',
    beds: 6,
    baths: 7,
    sqft: '4,500',
    tags: ['Proposed Project', 'Smart Home', 'Pool', 'Lake View'],
    description: 'A masterpiece of contemporary architecture featuring gold-accented interiors and state-of-the-art automation. This villa offers the pinnacle of luxury living in the heart of Life Camp, Abuja.',
    features: ['Infinite Pool', 'Smart Home Automation', 'Cinema Room', 'Wine Cellar', '24/7 Security'],
    yearBuilt: 2023,
    additionalImages: [
      'https://lh3.googleusercontent.com/d/1z1JBpYDPdffS4gKf2Hocu_JzpoMJLJgc',
      'https://lh3.googleusercontent.com/d/1hbWesyZlgPtUOgT_waTixpmEeEN-Y636',
      'https://lh3.googleusercontent.com/d/11wc522lhgPvh3YFhXecHHkbtshCUzISC',
      'https://lh3.googleusercontent.com/d/1U4eN9-9-D1I2ohqy5M4GYb3hEuAgPHMD'
    ]
  },
  {
    id: '2',
    title: 'Proposed Marbitech Prime-Point',
    location: 'Life Camp, Abuja',
    price: 'Price on Request',
    numericPrice: 15000000,
    image: 'https://lh3.googleusercontent.com/d/1z8QylMGQkxRKGqcMprb6cu52g76OQSxX',
    type: 'Commercial and Residential',
    tags: ['Proposed Project', 'Commercial and Residential', 'High ROI', 'Gated Community', 'Instant Allocation'],
    description: 'Prime investment land strategically located for rapid appreciation. Perfect for long-term wealth creation, secure estate planning, and prestigious residential developments.',
    features: ['Perimeter Fencing', 'Electricity', 'Good Drainage', 'C of O Title', 'Green Areas'],
    yearBuilt: 2024,
    additionalImages: [
      'https://lh3.googleusercontent.com/d/1z8QylMGQkxRKGqcMprb6cu52g76OQSxX',
      'https://lh3.googleusercontent.com/d/1o8s2qiA973b-r3giIf6-91p-02pwIBzB',
      'https://lh3.googleusercontent.com/d/1U4eN9-9-D1I2ohqy5M4GYb3hEuAgPHMD'
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
    title: 'Completed Project',
    price: 'Price on Request',
    numericPrice: 750000000,
    image: 'https://lh3.googleusercontent.com/d/1tI2sKiRxEKVILMJZwOrd8lPVSjoiz49H',
    type: 'Luxury Villa',
    sqft: '4,800',
    tags: ['Completed Project', 'Smart Home', 'Luxury'],
    description: '',
    features: ['Bespoke Finishes', 'Redundant Power Core', 'Smart Automation', 'Perimeter Security'],
    yearBuilt: 2023,
    additionalImages: [
      'https://lh3.googleusercontent.com/d/1tI2sKiRxEKVILMJZwOrd8lPVSjoiz49H',
      'https://lh3.googleusercontent.com/d/1QAstywyXbPUCFssk0OcV5NaZp_gTn4Ez',
      'https://lh3.googleusercontent.com/d/1Mku7SB3ABojuk7Y225v4d_PLZRcLw4TP',
      'https://lh3.googleusercontent.com/d/1aOzx_ZADleNZYEDi8IDK_ung6cuiDMWP',
      'https://lh3.googleusercontent.com/d/1GvCYsuNV9YGUTofranpxfVyrcBgqWOoq',
      'https://lh3.googleusercontent.com/d/1fOgBtwv3ycy0LtgP7rj19iCb4Dm8h0OX',
      'https://lh3.googleusercontent.com/d/1DckwdC3E9MjtyrcTyYkjvoOC2BvS7sCt',
      'https://lh3.googleusercontent.com/d/1qJ4fMSghM8nonYc0FampT7zdFGK1isrZ',
      'https://lh3.googleusercontent.com/d/15QsT0wRaZ2P8CdrmduErq_LfhWUpu3D_',
      'https://lh3.googleusercontent.com/d/1W1IdaAgc0FZZ0u4PzfsGRr4nKeVuftCq',
      'https://lh3.googleusercontent.com/d/1JT-89cjBHUD_8nX8CpDolAzysVU-0EkW'
    ]
  }
];
