const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = {
  // Gallery endpoints
  getGallery: async () => {
    const response = await fetch(`${API_URL}/api/gallery`);
    if (!response.ok) throw new Error('Failed to fetch gallery');
    return response.json();
  },

  createGalleryItem: async (data: {
    image_url: string;
    title: string;
    category?: string;
    description?: string;
  }) => {
    const response = await fetch(`${API_URL}/api/gallery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create gallery item');
    return response.json();
  },

  // Testimonials endpoints
  getTestimonials: async () => {
    const response = await fetch(`${API_URL}/api/testimonials`);
    if (!response.ok) throw new Error('Failed to fetch testimonials');
    return response.json();
  },

  createTestimonial: async (data: {
    name: string;
    email?: string;
    rating: number;
    comment: string;
    image_url?: string;
  }) => {
    const response = await fetch(`${API_URL}/api/testimonials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create testimonial');
    return response.json();
  },

  // Bookings endpoints
  getBookings: async () => {
    const response = await fetch(`${API_URL}/api/bookings`);
    if (!response.ok) throw new Error('Failed to fetch bookings');
    return response.json();
  },

  createBooking: async (data: {
    name: string;
    email: string;
    phone?: string;
    service_type: string;
    date: string;
    time: string;
    message?: string;
  }) => {
    const response = await fetch(`${API_URL}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create booking');
    return response.json();
  },

  // Contact endpoint
  submitContact: async (data: {
    name: string;
    email: string;
    subject?: string;
    message: string;
  }) => {
    const response = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to submit contact form');
    return response.json();
  },
};

