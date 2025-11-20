import Link from 'next/link';
import { FiImage, FiMessageSquare } from 'react-icons/fi';

export default function ContentManagerHome() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-serif font-bold mb-8">Content Manager</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link
            href="/content-manager/gallery"
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow group"
          >
            <FiImage className="mx-auto text-gold-600 mb-4" size={48} />
            <h2 className="text-2xl font-serif font-bold mb-2 group-hover:text-gold-600 transition-colors">
              Manage Gallery
            </h2>
            <p className="text-gray-600">
              Add, edit, or remove images from your portfolio gallery
            </p>
          </Link>

          <Link
            href="/content-manager/testimonials"
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow group"
          >
            <FiMessageSquare className="mx-auto text-gold-600 mb-4" size={48} />
            <h2 className="text-2xl font-serif font-bold mb-2 group-hover:text-gold-600 transition-colors">
              Manage Testimonials
            </h2>
            <p className="text-gray-600">
              Add, edit, or remove client testimonials and reviews
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

