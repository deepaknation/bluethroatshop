import React from 'react';
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-black text-white py-16 mt-20">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-2xl font-bold">BLUETHROATS</div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium menswear brand delivering contemporary fashion with uncompromising quality and style.
            </p>
            <div className="flex space-x-4">
              <Instagram size={20} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter size={20} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <a href="https://www.facebook.com/people/Bluethroat/61560202306464/?rdid=G8NyyvHd9FteU6MI&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18wco3fE5j%2F" target="_blank" rel="noopener noreferrer">
                <Facebook size={20} className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Shop</h3>
            <div className="space-y-2">
              <button 
                onClick={() => onNavigate('products')}
                className="block bg-black text-white hover:bg-gray-900 transition-colors text-sm px-4 py-2 rounded-md font-bold w-full text-left mb-2"
              >
                New Arrivals
              </button>
              <button 
                onClick={() => onNavigate('products')}
                className="block bg-black text-white hover:bg-gray-900 transition-colors text-sm px-4 py-2 rounded-md font-bold w-full text-left mb-2"
              >
                Bestsellers
              </button>
              <button 
                onClick={() => onNavigate('products')}
                className="block bg-black text-white hover:bg-gray-900 transition-colors text-sm px-4 py-2 rounded-md font-bold w-full text-left mb-2"
              >
                Co-ords
              </button>
              <button 
                onClick={() => onNavigate('products')}
                className="block bg-black text-white hover:bg-gray-900 transition-colors text-sm px-4 py-2 rounded-md font-bold w-full text-left mb-2"
              >
                Oversized Tees
              </button>
            </div>
          </div>

          {/* Customer Care */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Care</h3>
            <div className="space-y-2">
              <button 
                onClick={() => onNavigate('contact')}
                className="block bg-black text-white hover:bg-gray-900 transition-colors text-sm px-4 py-2 rounded-md font-bold w-full text-left mb-2"
              >
                Contact Us
              </button>
              <button 
                onClick={() => onNavigate('size-guide')}
                className="block bg-black text-white hover:bg-gray-900 transition-colors text-sm px-4 py-2 rounded-md font-bold w-full text-left mb-2"
              >
                Size Guide
              </button>
              <button 
                onClick={() => onNavigate('shipping-returns')}
                className="block bg-black text-white hover:bg-gray-900 transition-colors text-sm px-4 py-2 rounded-md font-bold w-full text-left mb-2"
              >
                Shipping & Returns
              </button>
              <button 
                onClick={() => onNavigate('track-order')}
                className="block bg-black text-white hover:bg-gray-900 transition-colors text-sm px-4 py-2 rounded-md font-bold w-full text-left mb-2"
              >
                Track Your Order
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-gray-400" />
                <span className="text-gray-400 text-sm">+91 8894001225</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-gray-400" />
                <span className="text-gray-400 text-sm">Care@bluethroat.online</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-gray-400 mt-1" />
                <span className="text-gray-400 text-sm">
                  123 Fashion Street<br />
                  Mumbai, Maharashtra 400001
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-400 text-sm">Get the latest updates on new arrivals and exclusive offers</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-900 border border-gray-700 rounded-l-md px-4 py-2 text-sm flex-1 md:w-80 focus:outline-none focus:border-orange-500"
              />
              <button className="bg-orange-500 text-white px-6 py-2 rounded-r-md hover:bg-orange-600 transition-colors text-sm font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div>
              © 2024 Bluethroats. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <div className="hover:text-white cursor-pointer transition-colors">Privacy Policy</div>
              <div className="hover:text-white cursor-pointer transition-colors">Terms of Service</div>
              <div className="hover:text-white cursor-pointer transition-colors">Cookie Policy</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;