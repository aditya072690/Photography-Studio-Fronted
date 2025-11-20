import Link from 'next/link';
import Image from 'next/image';
import { heroSlides } from '@/data/heroSlides';
import { services } from '@/data/services';
import HeroSlideshow from '@/components/HeroSlideshow';
import { FiArrowRight } from 'react-icons/fi';

export default function Home() {
  return (
    <div>
      {/* Hero Section with Slideshow */}
      <HeroSlideshow slides={heroSlides} />

      {/* Quick Links Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Professional photography services tailored to your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {services.slice(0, 3).map((service) => (
              <Link
                key={service.id}
                href="/services"
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-semibold mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gold-600 font-semibold">
                      Starting at ${service.startingPrice}
                    </span>
                    <FiArrowRight className="text-gold-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/services"
              className="inline-block bg-black text-white px-8 py-3 rounded-lg hover:bg-gold-600 transition-colors duration-200"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold mb-4">
            Ready to Capture Your Moments?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Book your session today and let us create timeless memories for you
          </p>
          <Link
            href="/booking"
            className="inline-block bg-gold-600 text-black px-8 py-3 rounded-lg hover:bg-gold-500 transition-colors duration-200 font-semibold"
          >
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
}

