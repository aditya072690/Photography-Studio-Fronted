import Image from 'next/image';
import { aboutContent } from '@/data/about';
import { FiAward, FiHeart, FiCamera, FiStar } from 'react-icons/fi';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 bg-black">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-900 opacity-80" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
              About Us
            </h1>
            <p className="text-xl text-gray-300">
              Capturing moments, creating memories
            </p>
          </div>
        </div>
      </section>

      {/* Studio Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-700 leading-relaxed text-center">
            {aboutContent.studioIntroduction}
          </p>
        </div>
      </section>

      {/* Photographer Profile */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              {aboutContent.photographer.image && (
                <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src={aboutContent.photographer.image}
                    alt={aboutContent.photographer.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
            <div>
              <h2 className="text-4xl font-serif font-bold mb-4">
                {aboutContent.photographer.name}
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {aboutContent.photographer.bio}
              </p>
              <div className="flex items-center space-x-2 text-gold-600 mb-4">
                <FiAward size={20} />
                <span className="font-semibold">{aboutContent.photographer.experience}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FiHeart className="mx-auto text-gold-600 mb-4" size={48} />
          <h2 className="text-3xl font-serif font-bold mb-6">Our Vision</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {aboutContent.vision}
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aboutContent.values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow"
              >
                <FiStar className="mx-auto text-gold-600 mb-4" size={32} />
                <p className="text-gray-700 font-medium">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Our Specialties</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {aboutContent.specialties.map((specialty, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg hover:bg-gold-50 transition-colors"
              >
                <FiCamera className="text-gold-600" size={20} />
                <span className="text-gray-700 font-medium">{specialty}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

