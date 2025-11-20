'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/about', label: 'ABOUT' },
    { href: '/services', label: 'SERVICES' },
    { href: '/portfolio', label: 'PORTFOLIO' },
    { href: '/testimonials', label: 'TESTIMONIALS' },
    { href: '/pricing', label: 'PRICING' },
    { href: '/booking', label: 'BOOKING' },
    { href: '/contact', label: 'CONTACT' },
  ];

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(href);
  };

  return (
    <>
      <nav className="bg-black text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link 
              href="/" 
              className="text-2xl font-serif font-bold text-gold-500 hover:text-gold-400 transition-colors z-50 relative"
            >
              Elegant Moments
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-gold-500 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile menu button - Always show hamburger, not X */}
            <button
              className="md:hidden text-white p-2 z-50 relative"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <FiMenu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed inset-0 z-[60] md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        
        {/* Sidebar */}
        <div
          className={`absolute left-0 top-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Logo and Close Button */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-white">
            <Link 
              href="/" 
              onClick={() => setIsOpen(false)}
              className="text-xl font-serif font-bold text-black hover:text-gold-600 transition-colors"
            >
              Elegant Moments
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-black transition-colors p-2"
              aria-label="Close menu"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="py-4">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-6 py-3 text-gray-700 font-medium transition-colors ${
                    active
                      ? 'bg-gray-100 text-black font-semibold'
                      : 'hover:bg-gray-50 hover:text-black'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}

