import { Service } from '@/types';

export const services: Service[] = [
  {
    id: 'wedding',
    name: 'Wedding Photography',
    description: 'Capture your special day with elegant and timeless wedding photography. We document every precious moment from preparation to reception.',
    startingPrice: 2500,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    features: [
      'Full day coverage (8-10 hours)',
      '2 photographers',
      'Online gallery',
      '50+ edited photos',
      'Engagement session included'
    ]
  },
  {
    id: 'portraits',
    name: 'Portrait Photography',
    description: 'Professional portrait sessions for individuals, families, and corporate headshots. Studio or location-based sessions available.',
    startingPrice: 350,
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
    features: [
      '1-2 hour session',
      'Professional editing',
      '10+ edited photos',
      'Online gallery',
      'Print release'
    ]
  },
  {
    id: 'events',
    name: 'Event Photography',
    description: 'Corporate events, parties, celebrations, and special occasions. We capture the energy and atmosphere of your event.',
    startingPrice: 800,
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
    features: [
      'Event coverage',
      'Candid and posed shots',
      'Online gallery',
      'Quick turnaround',
      'Multiple photographers available'
    ]
  },
  {
    id: 'product',
    name: 'Product Photography',
    description: 'High-quality product photography for e-commerce, catalogs, and marketing materials. Studio lighting and professional editing.',
    startingPrice: 150,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    features: [
      'Studio setup',
      'Multiple angles',
      'White background option',
      'High-resolution images',
      'Fast delivery'
    ]
  },
  {
    id: 'baby',
    name: 'Baby & Newborn Photography',
    description: 'Gentle and safe newborn photography sessions. We specialize in capturing those precious early moments with your little one.',
    startingPrice: 450,
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800',
    features: [
      '2-3 hour session',
      'Props and setups included',
      'Family photos included',
      'Online gallery',
      '15+ edited photos'
    ]
  },
  {
    id: 'studio',
    name: 'Studio Shoots',
    description: 'Professional studio photography with controlled lighting and backdrops. Perfect for fashion, beauty, and commercial work.',
    startingPrice: 500,
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800',
    features: [
      'Professional studio',
      'Multiple backdrop options',
      'Lighting equipment',
      'Professional editing',
      '20+ edited photos'
    ]
  },
];

