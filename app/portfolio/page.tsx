'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { api } from '@/lib/api';
import { GalleryCategory } from '@/types';
import { convertGoogleDriveUrl } from '@/lib/googleDrive';
import { FiRefreshCw } from 'react-icons/fi';

interface GalleryImage {
  id: string;
  image_url: string;
  title: string;
  category: string;
  description?: string;
}

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();

  const categories: GalleryCategory[] = ['All', 'Wedding', 'Events', 'Portraits', 'Studio Shoots', 'Products', 'Baby Shoots'];

  const fetchGallery = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getGallery();
      setImages(data);
    } catch (err: any) {
      console.error('Error fetching gallery:', err);
      setError(err.message || 'Failed to load gallery');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch gallery on mount
  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  // Refresh when navigating to this page
  useEffect(() => {
    if (pathname === '/portfolio') {
      fetchGallery();
    }
  }, [pathname, fetchGallery]);

  // Refresh when window/tab becomes visible (user comes back to the tab)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && pathname === '/portfolio') {
        fetchGallery();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [pathname, fetchGallery]);

  // Refresh when window gets focus (user switches back to the window)
  useEffect(() => {
    const handleFocus = () => {
      if (pathname === '/portfolio') {
        fetchGallery();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [pathname, fetchGallery]);

  const filteredImages = selectedCategory === 'All'
    ? images
    : images.filter(img => img.category === selectedCategory);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 bg-black">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-900 opacity-80" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
              Portfolio
            </h1>
            <p className="text-xl text-gray-300">
              Explore our work
            </p>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8 bg-white sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 items-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
            <button
              onClick={fetchGallery}
              disabled={loading}
              className="ml-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Refresh gallery"
            >
              <FiRefreshCw className={loading ? 'animate-spin' : ''} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading gallery...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">Error: {error}</p>
              <p className="text-gray-600 mt-2">Please check your backend connection.</p>
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No images found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="relative h-64 rounded-lg overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={convertGoogleDriveUrl(image.image_url)}
                    alt={image.description || image.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                    <p className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-semibold text-center px-4">
                      {image.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-2 right-2 text-white bg-black bg-opacity-70 hover:bg-opacity-100 p-3 rounded-full z-20 transition-all flex items-center justify-center w-10 h-10"
              aria-label="Close"
            >
              <span className="text-2xl leading-none">×</span>
            </button>
            <div className="relative w-full flex items-center justify-center" style={{ height: 'calc(90vh - 100px)', minHeight: '400px' }}>
              <div className="relative w-full h-full">
                <Image
                  src={convertGoogleDriveUrl(selectedImage.image_url)}
                  alt={selectedImage.description || selectedImage.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                />
              </div>
            </div>
            <div className="bg-black bg-opacity-75 text-white p-4 text-center mt-2 rounded">
              <h3 className="text-xl font-serif font-bold">{selectedImage.title}</h3>
              <p className="text-gray-300">{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

