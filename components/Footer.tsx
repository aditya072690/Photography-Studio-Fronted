import Link from 'next/link';
import { contactInfo } from '@/data/contact';
import { FiInstagram, FiFacebook, FiTwitter, FiLinkedin, FiMail, FiPhone } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-gold-500 mb-4">
              Elegant Moments
            </h3>
            <p className="text-gray-400">
              Capturing life's precious moments with elegance and artistry.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/about" className="hover:text-gold-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-gold-500 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-gold-500 transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-gold-500 transition-colors">
                  Book a Session
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center space-x-2">
                <FiMail className="text-gold-500" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-gold-500 transition-colors">
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <FiPhone className="text-gold-500" />
                <a href={`tel:${contactInfo.phone}`} className="hover:text-gold-500 transition-colors">
                  {contactInfo.phone}
                </a>
              </div>
              {contactInfo.address && (
                <p className="mt-4">{contactInfo.address}</p>
              )}
            </div>
            
            {/* Social Media */}
            <div className="flex space-x-4 mt-6">
              {contactInfo.socialMedia.instagram && (
                <a
                  href={contactInfo.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gold-500 transition-colors"
                  aria-label="Instagram"
                >
                  <FiInstagram size={24} />
                </a>
              )}
              {contactInfo.socialMedia.facebook && (
                <a
                  href={contactInfo.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gold-500 transition-colors"
                  aria-label="Facebook"
                >
                  <FiFacebook size={24} />
                </a>
              )}
              {contactInfo.socialMedia.twitter && (
                <a
                  href={contactInfo.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gold-500 transition-colors"
                  aria-label="Twitter"
                >
                  <FiTwitter size={24} />
                </a>
              )}
              {contactInfo.socialMedia.linkedin && (
                <a
                  href={contactInfo.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gold-500 transition-colors"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin size={24} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Elegant Moments Photography Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

