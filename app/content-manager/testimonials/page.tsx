'use client';

import { useState } from 'react';
import Image from 'next/image';
import { testimonials } from '@/data/testimonials';
import { Testimonial } from '@/types';
import { FiPlus, FiEdit, FiTrash2, FiX, FiStar } from 'react-icons/fi';
import { services } from '@/data/services';

export default function TestimonialsManagerPage() {
  const [testimonialList, setTestimonialList] = useState<Testimonial[]>(testimonials);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    clientName: '',
    clientImage: '',
    service: '',
    rating: 5,
    review: '',
    date: new Date().toISOString().split('T')[0],
    featured: false,
  });

  const handleAdd = () => {
    const newTestimonial: Testimonial = {
      id: `test-${Date.now()}`,
      clientName: formData.clientName,
      clientImage: formData.clientImage || undefined,
      service: formData.service,
      rating: formData.rating,
      review: formData.review,
      date: formData.date,
      featured: formData.featured,
    };
    setTestimonialList([...testimonialList, newTestimonial]);
    setIsAddModalOpen(false);
    setFormData({
      clientName: '',
      clientImage: '',
      service: '',
      rating: 5,
      review: '',
      date: new Date().toISOString().split('T')[0],
      featured: false,
    });
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      clientName: testimonial.clientName,
      clientImage: testimonial.clientImage || '',
      service: testimonial.service,
      rating: testimonial.rating,
      review: testimonial.review,
      date: testimonial.date,
      featured: testimonial.featured || false,
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate = () => {
    if (!editingTestimonial) return;
    setTestimonialList(
      testimonialList.map((test) =>
        test.id === editingTestimonial.id
          ? {
              ...test,
              clientName: formData.clientName,
              clientImage: formData.clientImage || undefined,
              service: formData.service,
              rating: formData.rating,
              review: formData.review,
              date: formData.date,
              featured: formData.featured,
            }
          : test
      )
    );
    setIsEditModalOpen(false);
    setEditingTestimonial(null);
    setFormData({
      clientName: '',
      clientImage: '',
      service: '',
      rating: 5,
      review: '',
      date: new Date().toISOString().split('T')[0],
      featured: false,
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      setTestimonialList(testimonialList.filter((test) => test.id !== id));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : type === 'number'
          ? parseInt(value)
          : value,
    });
  };

  const renderForm = (onSubmit: () => void, onCancel: () => void, title: string) => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Client Name *
        </label>
        <input
          type="text"
          name="clientName"
          required
          value={formData.clientName}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Client Image URL (Optional)
        </label>
        <input
          type="url"
          name="clientImage"
          value={formData.clientImage}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Service *
        </label>
        <select
          name="service"
          required
          value={formData.service}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500"
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.id} value={service.name}>
              {service.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rating *
        </label>
        <select
          name="rating"
          required
          value={formData.rating}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} Star{num > 1 ? 's' : ''}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Review *
        </label>
        <textarea
          name="review"
          required
          rows={4}
          value={formData.review}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500"
          placeholder="Write the client's review..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Date *
        </label>
        <input
          type="date"
          name="date"
          required
          value={formData.date}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="featured"
          checked={formData.featured}
          onChange={handleChange}
          className="w-4 h-4 text-gold-600 border-gray-300 rounded focus:ring-gold-500"
        />
        <label className="ml-2 text-sm font-medium text-gray-700">
          Featured Testimonial
        </label>
      </div>

      <div className="flex space-x-4 pt-4">
        <button
          type="submit"
          className="flex-1 bg-gold-600 text-black px-6 py-2 rounded-lg hover:bg-gold-500 transition-colors font-semibold"
        >
          {title === 'Add' ? 'Add Testimonial' : 'Update Testimonial'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-serif font-bold">Manage Testimonials</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-gold-600 text-black px-6 py-2 rounded-lg hover:bg-gold-500 transition-colors flex items-center space-x-2 font-semibold"
        >
          <FiPlus />
          <span>Add New Testimonial</span>
        </button>
      </div>

      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonialList.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                {testimonial.clientImage ? (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.clientImage}
                      alt={testimonial.clientName}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gold-200 flex items-center justify-center">
                    <span className="text-gold-800 font-bold text-xl">
                      {testimonial.clientName.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold">{testimonial.clientName}</h3>
                  <p className="text-sm text-gray-600">{testimonial.service}</p>
                  {testimonial.featured && (
                    <span className="inline-block mt-1 text-xs bg-gold-100 text-gold-800 px-2 py-1 rounded">
                      Featured
                    </span>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(testimonial)}
                  className="text-gray-600 hover:text-gold-600 transition-colors"
                  aria-label="Edit"
                >
                  <FiEdit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(testimonial.id)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                  aria-label="Delete"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            </div>

            <div className="flex mb-3">
              {[...Array(testimonial.rating)].map((_, i) => (
                <FiStar key={i} className="text-gold-500 fill-gold-500" size={16} />
              ))}
            </div>

            <p className="text-gray-700 italic mb-2">"{testimonial.review}"</p>
            <p className="text-sm text-gray-500">{testimonial.date}</p>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-serif font-bold">Add New Testimonial</h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={24} />
                </button>
              </div>
              {renderForm(handleAdd, () => setIsAddModalOpen(false), 'Add')}
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && editingTestimonial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-serif font-bold">Edit Testimonial</h3>
                <button
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingTestimonial(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={24} />
                </button>
              </div>
              {renderForm(
                handleUpdate,
                () => {
                  setIsEditModalOpen(false);
                  setEditingTestimonial(null);
                },
                'Edit'
              )}
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">Note:</h3>
        <p className="text-blue-800 text-sm">
          Changes made here are currently stored in component state. In a production environment,
          you would integrate this with a backend API or database to persist changes.
          To make changes permanent, update the data files in the <code className="bg-blue-100 px-1 rounded">/data</code> folder.
        </p>
      </div>
    </div>
  );
}

