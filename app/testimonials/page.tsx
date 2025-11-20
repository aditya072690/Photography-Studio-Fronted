import Image from 'next/image';
import { testimonials } from '@/data/testimonials';
import { FiStar } from 'react-icons/fi';

export default function TestimonialsPage() {
  const featuredTestimonials = testimonials.filter(t => t.featured);
  const allTestimonials = testimonials;

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  {testimonial.clientImage ? (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.clientImage}
                        alt={testimonial.clientName}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gold-200 flex items-center justify-center mr-4">
                      <span className="text-gold-800 font-bold text-xl">
                        {testimonial.clientName.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold">{testimonial.clientName}</h3>
                    <p className="text-sm text-gray-600">{testimonial.service}</p>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="text-gold-500 fill-gold-500" size={20} />
                  ))}
                </div>
                
                <p className="text-gray-700 italic mb-4">"{testimonial.review}"</p>
                <p className="text-sm text-gray-500">{testimonial.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">All Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {allTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-lg p-6 shadow-md"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {testimonial.clientImage ? (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3">
                        <Image
                          src={testimonial.clientImage}
                          alt={testimonial.clientName}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gold-200 flex items-center justify-center mr-3">
                        <span className="text-gold-800 font-bold">
                          {testimonial.clientName.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold">{testimonial.clientName}</h3>
                      <p className="text-sm text-gray-600">{testimonial.service}</p>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FiStar key={i} className="text-gold-500 fill-gold-500" size={16} />
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-3">"{testimonial.review}"</p>
                <p className="text-sm text-gray-500">{testimonial.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

