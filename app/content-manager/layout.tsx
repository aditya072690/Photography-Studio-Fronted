import Link from 'next/link';
import { FiImage, FiMessageSquare, FiHome } from 'react-icons/fi';

export default function ContentManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-serif font-bold text-gold-500">
              Content Manager
            </h1>
            <Link
              href="/"
              className="flex items-center space-x-2 hover:text-gold-500 transition-colors"
            >
              <FiHome />
              <span>Back to Website</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <Link
              href="/content-manager/gallery"
              className="flex items-center space-x-2 py-4 border-b-2 border-transparent hover:border-gold-500 transition-colors"
            >
              <FiImage />
              <span>Manage Gallery</span>
            </Link>
            <Link
              href="/content-manager/testimonials"
              className="flex items-center space-x-2 py-4 border-b-2 border-transparent hover:border-gold-500 transition-colors"
            >
              <FiMessageSquare />
              <span>Manage Testimonials</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}

