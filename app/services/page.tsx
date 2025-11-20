import Image from 'next/image';
import Link from 'next/link';
import { services } from '@/data/services';
import { FiCheck, FiArrowRight } from 'react-icons/fi';

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 bg-black">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-900 opacity-80" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
              Our Services
            </h1>
            <p className="text-xl text-gray-300">
              Professional photography for every occasion
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-serif font-bold mb-3">{service.name}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  
                  {service.features && (
                    <ul className="mb-4 space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-700">
                          <FiCheck className="text-gold-600 mr-2" size={16} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-2xl font-bold text-gold-600">
                      ${service.startingPrice}
                    </span>
                    <Link
                      href="/booking"
                      className="flex items-center space-x-2 text-black hover:text-gold-600 transition-colors"
                    >
                      <span>Book Now</span>
                      <FiArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-serif font-bold mb-4">
            Ready to Book Your Session?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Contact us to discuss your photography needs
          </p>
          <Link
            href="/booking"
            className="inline-block bg-gold-600 text-black px-8 py-3 rounded-lg hover:bg-gold-500 transition-colors duration-200 font-semibold"
          >
            Book a Session
          </Link>
        </div>
      </section>
    </div>
  );
}

