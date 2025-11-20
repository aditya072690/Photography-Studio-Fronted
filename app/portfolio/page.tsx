'use client';

import { useState } from 'react';
import Image from 'next/image';
import { galleryImages, GalleryImage } from '@/data/gallery';
import { GalleryCategory } from '@/types';

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const categories: GalleryCategory[] = ['All', 'Wedding', 'Events', 'Portraits', 'Studio Shoots', 'Products', 'Baby Shoots'];

  const filteredImages = selectedCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

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
          <div className="flex flex-wrap justify-center gap-4">
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
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="relative h-64 rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image.image}
                  alt={image.alt}
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
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 z-10"
              aria-label="Close"
            >
              ✕
            </button>
            <div className="relative w-full h-[80vh]">
              <Image
                src={selectedImage.image}
                alt={selectedImage.alt}
                fill
                className="object-contain"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-4 text-center">
              <h3 className="text-xl font-serif font-bold">{selectedImage.title}</h3>
              <p className="text-gray-300">{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

