import { Package, AddOn } from '@/types';

export const packages: Package[] = [
  {
    id: 'basic',
    name: 'Basic Package',
    price: 500,
    description: 'Perfect for small events and simple portrait sessions',
    features: [
      '2-hour session',
      '1 photographer',
      '20 edited photos',
      'Online gallery',
      'Print release'
    ],
    popular: false
  },
  {
    id: 'premium',
    name: 'Premium Package',
    price: 1200,
    description: 'Ideal for weddings and major events',
    features: [
      'Full day coverage (8 hours)',
      '2 photographers',
      '50+ edited photos',
      'Online gallery',
      'Engagement session',
      'USB with all photos',
      'Print release'
    ],
    popular: true
  },
  {
    id: 'luxury',
    name: 'Luxury Package',
    price: 2500,
    description: 'Ultimate experience with premium deliverables',
    features: [
      'Full day coverage (10 hours)',
      '2 photographers + videographer',
      '100+ edited photos',
      'Online gallery',
      'Engagement session',
      'USB with all photos',
      'Premium photo album',
      'Print release',
      '1 year anniversary session'
    ],
    popular: false
  },
];

export const addOns: AddOn[] = [
  {
    id: 'extra-hours',
    name: 'Extra Hours',
    description: 'Additional coverage time',
    price: 200
  },
  {
    id: 'extra-edits',
    name: 'Extra Edited Photos',
    description: 'Additional 10 edited photos',
    price: 150
  },
  {
    id: 'prints',
    name: 'Professional Prints',
    description: 'High-quality prints (set of 10)',
    price: 100
  },
  {
    id: 'album',
    name: 'Photo Album',
    description: 'Premium leather-bound photo album',
    price: 300
  },
  {
    id: 'video',
    name: 'Video Coverage',
    description: 'Professional video documentation',
    price: 800
  },
];

