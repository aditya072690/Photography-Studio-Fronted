'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { api } from '@/lib/api';
import { GalleryCategory } from '@/types';
import { FiPlus, FiEdit, FiTrash2, FiX } from 'react-icons/fi';
import { convertGoogleDriveUrl } from '@/lib/googleDrive';

interface GalleryImage {
  id: string;
  image_url: string;
  title: string;
  category: string;
  description?: string;
}

export default function GalleryManagerPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    category: 'Wedding' as GalleryCategory,
    alt: '',
  });

  const categories: GalleryCategory[] = ['Wedding', 'Events', 'Portraits', 'Studio Shoots', 'Products', 'Baby Shoots'];

  const fetchGallery = async () => {
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
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleAdd = async () => {
    try {
      await api.createGalleryItem({
        image_url: formData.image,
        title: formData.title,
        category: formData.category,
        description: formData.alt || formData.title,
      });
      setIsAddModalOpen(false);
      setFormData({ image: '', title: '', category: 'Wedding', alt: '' });
      // Refresh the gallery list
      await fetchGallery();
    } catch (err: any) {
      console.error('Error adding gallery item:', err);
      alert('Failed to add gallery item: ' + err.message);
    }
  };

  const handleEdit = (image: GalleryImage) => {
    setEditingImage(image);
    setFormData({
      image: image.image_url,
      title: image.title,
      category: image.category as GalleryCategory,
      alt: image.description || '',
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!editingImage) return;
    try {
      await api.updateGalleryItem(editingImage.id, {
        image_url: formData.image,
        title: formData.title,
        category: formData.category,
        description: formData.alt || formData.title,
      });
      setIsEditModalOpen(false);
      setEditingImage(null);
      setFormData({ image: '', title: '', category: 'Wedding', alt: '' });
      // Refresh the gallery list
      await fetchGallery();
    } catch (err: any) {
      console.error('Error updating gallery item:', err);
      alert('Failed to update gallery item: ' + err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this image? This action cannot be undone.')) {
      try {
        await api.deleteGalleryItem(id);
        // Refresh the gallery list
        await fetchGallery();
      } catch (err: any) {
        console.error('Error deleting gallery item:', err);
        alert('Failed to delete gallery item: ' + err.message);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-serif font-bold">Manage Gallery</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-gold-600 text-black px-6 py-2 rounded-lg hover:bg-gold-500 transition-colors flex items-center space-x-2 font-semibold"
        >
          <FiPlus />
          <span>Add New Image</span>
        </button>
      </div>

      {loading && <p className="text-center py-8">Loading gallery...</p>}
      {error && <p className="text-center py-8 text-red-600">Error: {error}</p>}
      
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((image) => (
          <div key={image.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image
                src={convertGoogleDriveUrl(image.image_url)}
                alt={image.description || image.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-1">{image.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{image.category}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(image)}
                  className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded hover:bg-gray-200 transition-colors flex items-center justify-center space-x-1"
                >
                  <FiEdit size={16} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(image.id)}
                  className="flex-1 bg-red-100 text-red-700 px-3 py-2 rounded hover:bg-red-200 transition-colors flex items-center justify-center space-x-1"
                >
                  <FiTrash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-serif font-bold">Add New Image</h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={24} />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAdd();
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    required
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alt Text (Optional)
                  </label>
                  <input
                    type="text"
                    name="alt"
                    value={formData.alt}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500"
                    placeholder="Descriptive text for accessibility"
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gold-600 text-black px-6 py-2 rounded-lg hover:bg-gold-500 transition-colors font-semibold"
                  >
                    Add Image
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && editingImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-serif font-bold">Edit Image</h3>
                <button
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingImage(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={24} />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdate();
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    required
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alt Text
                  </label>
                  <input
                    type="text"
                    name="alt"
                    value={formData.alt}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gold-600 text-black px-6 py-2 rounded-lg hover:bg-gold-500 transition-colors font-semibold"
                  >
                    Update Image
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setEditingImage(null);
                    }}
                    className="flex-1 bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
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

