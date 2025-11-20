'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { api } from '@/lib/api';
import { FiStar } from 'react-icons/fi';

interface Testimonial {
  id: string;
  name: string;
  email?: string;
  rating: number;
  comment: string;
  image_url?: string;
  created_at?: string;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();

  const fetchTestimonials = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getTestimonials();
      setTestimonials(data);
    } catch (err: any) {
      console.error('Error fetching testimonials:', err);
      setError(err.message || 'Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch testimonials on mount
  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  // Refresh when navigating to this page
  useEffect(() => {
    if (pathname === '/testimonials') {
      fetchTestimonials();
    }
  }, [pathname, fetchTestimonials]);

  // Refresh when window/tab becomes visible (user comes back to the tab)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && pathname === '/testimonials') {
        fetchTestimonials();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [pathname, fetchTestimonials]);

  // Refresh when window gets focus (user switches back to the window)
  useEffect(() => {
    const handleFocus = () => {
      if (pathname === '/testimonials') {
        fetchTestimonials();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [pathname, fetchTestimonials]);

  // Show top 3 as featured (or all if less than 3)
  const featuredTestimonials = testimonials.slice(0, 3);
  const allTestimonials = testimonials;

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 bg-black">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-900 opacity-80" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
              Client Testimonials
            </h1>
            <p className="text-xl text-gray-300">
              What our clients say about us
            </p>
          </div>
        </div>
      </section>

      {/* Featured Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Featured Reviews</h2>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading testimonials...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">Error: {error}</p>
              <p className="text-gray-600 mt-2">Please check your backend connection.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    {testimonial.image_url ? (
                      <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                        <Image
                          src={testimonial.image_url}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gold-200 flex items-center justify-center mr-4">
                        <span className="text-gold-800 font-bold text-xl">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                    </div>
                  </div>
                  
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FiStar key={i} className="text-gold-500 fill-gold-500" size={20} />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 italic mb-4">"{testimonial.comment}"</p>
                  <p className="text-sm text-gray-500">{formatDate(testimonial.created_at)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* All Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">All Reviews</h2>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading testimonials...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">Error: {error}</p>
            </div>
          ) : allTestimonials.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No testimonials found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {allTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white rounded-lg p-6 shadow-md"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      {testimonial.image_url ? (
                        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3">
                          <Image
                            src={testimonial.image_url}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gold-200 flex items-center justify-center mr-3">
                          <span className="text-gold-800 font-bold">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold">{testimonial.name}</h3>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FiStar key={i} className="text-gold-500 fill-gold-500" size={16} />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-3">"{testimonial.comment}"</p>
                  <p className="text-sm text-gray-500">{formatDate(testimonial.created_at)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

