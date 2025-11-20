import Link from 'next/link';
import { packages, addOns } from '@/data/packages';
import { FiCheck, FiArrowRight } from 'react-icons/fi';

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 bg-black">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-900 opacity-80" />
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
              Pricing & Packages
            </h1>
            <p className="text-xl text-gray-300">
              Choose the perfect package for your needs
            </p>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                  pkg.popular ? 'ring-2 ring-gold-500 transform scale-105' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="bg-gold-500 text-black text-center py-2 font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-serif font-bold mb-2">{pkg.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gold-600">${pkg.price}</span>
                  </div>
                  <p className="text-gray-600 mb-6">{pkg.description}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <FiCheck className="text-gold-600 mr-2 mt-1 flex-shrink-0" size={20} />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    href="/booking"
                    className={`block w-full text-center py-3 rounded-lg transition-colors duration-200 font-semibold ${
                      pkg.popular
                        ? 'bg-gold-600 text-black hover:bg-gold-500'
                        : 'bg-black text-white hover:bg-gold-600'
                    }`}
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Add-ons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addOns.map((addOn) => (
              <div
                key={addOn.id}
                className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-gold-500 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-2">{addOn.name}</h3>
                <p className="text-gray-600 mb-4">{addOn.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gold-600">${addOn.price}</span>
                  <Link
                    href="/booking"
                    className="text-black hover:text-gold-600 transition-colors flex items-center space-x-1"
                  >
                    <span>Add</span>
                    <FiArrowRight />
                  </Link>
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
            Need a Custom Package?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Contact us to discuss your specific photography needs
          </p>
          <Link
            href="/contact"
            className="inline-block bg-gold-600 text-black px-8 py-3 rounded-lg hover:bg-gold-500 transition-colors duration-200 font-semibold"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}

