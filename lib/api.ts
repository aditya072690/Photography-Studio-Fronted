const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Helper function to ensure API URL has protocol
function getApiUrl() {
  const url = API_URL.trim();
  // If URL doesn't start with http:// or https://, add https://
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
}

const baseApiUrl = getApiUrl();

export const api = {
  // Gallery endpoints
  getGallery: async () => {
    try {
      const response = await fetch(`${baseApiUrl}/api/gallery`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch gallery: ${response.status} ${errorText}`);
      }
      return response.json();
    } catch (error: any) {
      console.error('Gallery fetch error:', error);
      throw new Error(`Failed to fetch gallery: ${error.message}`);
    }
  },

  createGalleryItem: async (data: {
    image_url: string;
    title: string;
    category?: string;
    description?: string;
  }) => {
    const response = await fetch(`${baseApiUrl}/api/gallery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create gallery item: ${response.status} ${errorText}`);
    }
    return response.json();
  },

  updateGalleryItem: async (id: string, data: {
    image_url: string;
    title: string;
    category?: string;
    description?: string;
  }) => {
    const response = await fetch(`${baseApiUrl}/api/gallery/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update gallery item: ${response.status} ${errorText}`);
    }
    return response.json();
  },

  deleteGalleryItem: async (id: string) => {
    const response = await fetch(`${baseApiUrl}/api/gallery/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete gallery item: ${response.status} ${errorText}`);
    }
    return response.json();
  },

  // Testimonials endpoints
  getTestimonials: async () => {
    try {
      const response = await fetch(`${baseApiUrl}/api/testimonials`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch testimonials: ${response.status} ${errorText}`);
      }
      return response.json();
    } catch (error: any) {
      console.error('Testimonials fetch error:', error);
      throw new Error(`Failed to fetch testimonials: ${error.message}`);
    }
  },

  createTestimonial: async (data: {
    name: string;
    email?: string;
    rating: number;
    comment: string;
    image_url?: string;
  }) => {
    const response = await fetch(`${baseApiUrl}/api/testimonials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create testimonial: ${response.status} ${errorText}`);
    }
    return response.json();
  },

  updateTestimonial: async (id: string, data: {
    name: string;
    email?: string;
    rating: number;
    comment: string;
    image_url?: string;
  }) => {
    const response = await fetch(`${baseApiUrl}/api/testimonials/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update testimonial: ${response.status} ${errorText}`);
    }
    return response.json();
  },

  deleteTestimonial: async (id: string) => {
    const response = await fetch(`${baseApiUrl}/api/testimonials/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to delete testimonial: ${response.status} ${errorText}`);
    }
    return response.json();
  },

  // Bookings endpoints
  getBookings: async () => {
    const response = await fetch(`${baseApiUrl}/api/bookings`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch bookings: ${response.status} ${errorText}`);
    }
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
    const response = await fetch(`${baseApiUrl}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create booking: ${response.status} ${errorText}`);
    }
    return response.json();
  },

  // Contact endpoint
  submitContact: async (data: {
    name: string;
    email: string;
    subject?: string;
    message: string;
  }) => {
    const response = await fetch(`${baseApiUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to submit contact form: ${response.status} ${errorText}`);
    }
    return response.json();
  },
};
