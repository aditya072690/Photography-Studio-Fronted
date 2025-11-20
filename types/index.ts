// TypeScript types for all website content

export interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  startingPrice: number;
  image: string;
  features?: string[];
}

export interface GalleryImage {
  id: string;
  image: string;
  title: string;
  category: GalleryCategory;
  alt: string;
}

export type GalleryCategory = 
  | 'Wedding'
  | 'Events'
  | 'Portraits'
  | 'Studio Shoots'
  | 'Products'
  | 'Baby Shoots'
  | 'All';

export interface Testimonial {
  id: string;
  clientName: string;
  clientImage?: string;
  service: string;
  rating: number;
  review: string;
  date: string;
  featured?: boolean;
}

export interface Package {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  date: string;
  time: string;
  message?: string;
}

export interface ContactInfo {
  studioName: string;
  address?: string;
  phone: string;
  email: string;
  socialMedia: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface AboutContent {
  studioIntroduction: string;
  photographer: {
    name: string;
    bio: string;
    experience: string;
    image?: string;
  };
  vision: string;
  values: string[];
  specialties: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
  author: string;
}

