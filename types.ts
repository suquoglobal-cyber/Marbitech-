
export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  numericPrice?: number; // Internal value for AI calculations
  image: string;
  type: 'Luxury Villa' | 'Modern Apartment' | 'Investment Land' | 'Commercial' | 'Interior Design' | 'Interior Decoration';
  beds?: number;
  baths?: number;
  sqft?: string;
  tags: string[];
  description: string;
  features?: string[];
  yearBuilt?: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
