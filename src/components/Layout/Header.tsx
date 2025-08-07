import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: string) => void;
  cartItemsCount: number;
  wishlist: string[];
  isLoggedIn: boolean;
  user: { name: string; email: string } | null;
  onAuth: (mode: 'login' | 'signup') => void;
  onLogout: () => void;
  currentPage: string;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onCategoryNavigate: (page: string, category: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onNavigate, 
  cartItemsCount, 
  wishlist,
  isLoggedIn, 
  user, 
  onAuth, 
  onLogout,
  currentPage,
  searchQuery,
  setSearchQuery,
  onCategoryNavigate
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState('');
  const [mobileAllOpen, setMobileAllOpen] = useState(false);
  const [mobileAllSubOpen, setMobileAllSubOpen] = useState('');
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && !(event.target as Element).closest('.mobile-menu')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);
  const categories = [
    { 
      label: 'ALL',
      page: 'products',
      subcategories: [
        {
          label: 'TOPS',
          subcategories: ['T-Shirts', 'Shirts', 'Polos', 'Tank Tops', 'Hoodies']
        },
        {
          label: 'BOTTOMS',
          subcategories: ['Jeans', 'Joggers', 'Shorts', 'Trousers', 'Cargo']
        }
      ]
    },
    { 
      label: 'NEW ARRIVALS', 
      page: 'new-arrivals',
      subcategories: ['Latest Drops', 'Trending Now', 'Limited Edition']
    },
    { 
      label: 'CO-ORDS', 
      page: 'co-ords',
      subcategories: ['Matching Sets', 'Summer Co-ords', 'Formal Sets']
    },
    { 
      label: 'JACKETS', 
      page: 'products',
      subcategories: ['Denim Jackets', 'Bomber Jackets', 'Blazers']
    },
    { 
      label: 'BESTSELLERS', 
      page: 'bestsellers',
      subcategories: ['Top Rated', 'Most Popular', 'Customer Favorites']
    }
  ];

  const moreCategories = [
    { 
      label: 'ACCESSORIES', 
      page: 'products',
      subcategories: ['Caps', 'Bags', 'Belts', 'Sunglasses']
    },
    {
      label: 'ABOUT US',
      page: 'about',
      subcategories: []
    },
    {
      label: 'CONTACT',
      page: 'contact',
      subcategories: []
    }
  ];

  return (
    <>
      {/* Top Banner */}
      <div className="bg-black text-white text-center py-2 text-sm font-medium">
        <div className="animate-pulse">
          🔥 FLAT 40% OFF ON EVERYTHING | USE CODE: BLUETHROATS40 | FREE SHIPPING ABOVE ₹1999
        </div>
      </div>

      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <div 
              className="text-2xl font-black text-black cursor-pointer tracking-wider"
              onClick={() => onNavigate('home')}
            >
              BLUETHROATS
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {categories.map((category) => (
                <div
                  key={category.label}
                  className="relative group"
                  onMouseEnter={() => {
                    if (dropdownTimeout) clearTimeout(dropdownTimeout);
                    setShowDropdown(category.label);
                  }}
                  onMouseLeave={() => {
                    const timeout = setTimeout(() => setShowDropdown(''), 120);
                    setDropdownTimeout(timeout);
                  }}
                >
                  <button
                    onClick={() => {
                      if (category.label === 'NEW ARRIVALS') onCategoryNavigate('new-arrivals', 'all');
                      else if (category.label === 'CO-ORDS') onCategoryNavigate('co-ords', 'co-ords');
                      else onNavigate(category.page);
                    }}
                    className="text-sm font-semibold text-gray-900 hover:text-red-600 transition-colors duration-200 flex items-center space-x-1"
                  >
                    <span className="whitespace-nowrap">{category.label}</span>
                    {category.subcategories.length > 0 && <ChevronDown size={14} />}
                  </button>
                  
                  {/* Dropdown Menu */}
                  {showDropdown === category.label && category.label === 'ALL' && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-lg border rounded-lg py-2 z-50 flex">
                      {category.subcategories.map((mainCat) => (
                        <div key={mainCat.label} className="w-1/2 px-2">
                          <div className="font-bold text-gray-900 px-4 py-2 hover:text-red-600 cursor-pointer">
                            {mainCat.label}
                          </div>
                          {mainCat.subcategories.map((sub) => (
                            <button
                              key={sub}
                              onClick={() => onNavigate('products')}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors"
                            >
                              {sub}
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                  {showDropdown === category.label && category.label !== 'ALL' && category.subcategories.length > 0 && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg border rounded-lg py-2 z-50">
                      {category.subcategories.map((sub) => (
                        <button
                          key={sub}
                          onClick={() => onNavigate(category.page)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors"
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-2 w-56">
              <Search size={18} className="text-gray-500 mr-3" />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none flex-1 text-sm"
              />
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              {/* Search Icon - Mobile */}
              <button className="lg:hidden p-2">
                <Search size={22} />
              </button>

              {/* Wishlist */}
              <button 
                className="p-2 relative hover:text-red-600 transition-colors"
                onClick={() => onNavigate('wishlist')}
              >
                <Heart size={22} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              </button>

              {/* Cart */}
              <button 
                className="p-2 relative hover:text-red-600 transition-colors"
                onClick={() => onNavigate('cart')}
              >
                <ShoppingBag size={22} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {cartItemsCount > 9 ? '9+' : cartItemsCount}
                  </span>
                )}
              </button>

              {/* User */}
              <div className="relative">
                {isLoggedIn ? (
                  <div className="flex items-center space-x-2">
                    <span className="hidden md:block text-sm font-medium">
                      {user?.name?.split(' ')[0]}
                    </span>
                    <button onClick={onLogout} className="p-2 hover:text-red-600 transition-colors">
                      <User size={22} />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => onAuth('login')}
                    className="p-2 hover:text-red-600 transition-colors"
                  >
                    <User size={22} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden mobile-menu">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between p-6 border-b">
              <div className="text-2xl font-black text-black">BLUETHROATS</div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile Search */}
            <div className="p-6 border-b">
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-3">
                <Search size={18} className="text-gray-500 mr-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="bg-transparent outline-none flex-1"
                />
              </div>
            </div>

            {/* Mobile Navigation */}
            <nav className="p-6 space-y-2 overflow-y-auto max-h-96">
              {categories.map((category) => (
                category.label === 'ALL' ? (
                  <div key="ALL">
                    <button
                      onClick={() => setMobileAllOpen(!mobileAllOpen)}
                      className="block w-full text-left text-lg font-bold text-black hover:text-red-600 transition-colors py-3 px-2 rounded-lg hover:bg-gray-50 uppercase tracking-wider flex items-center justify-between"
                    >
                      ALL
                      <ChevronDown size={18} className={`ml-2 transition-transform ${mobileAllOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileAllOpen && (
                      <div className="pl-4">
                        {category.subcategories.map((mainCat) => (
                          <div key={mainCat.label}>
                            <button
                              onClick={() => setMobileAllSubOpen(mobileAllSubOpen === mainCat.label ? '' : mainCat.label)}
                              className="block w-full text-left text-base font-semibold text-black hover:text-red-600 transition-colors py-2 px-2 rounded-lg hover:bg-gray-50 flex items-center justify-between"
                            >
                              {mainCat.label}
                              <ChevronDown size={16} className={`ml-1 transition-transform ${mobileAllSubOpen === mainCat.label ? 'rotate-180' : ''}`} />
                            </button>
                            {mobileAllSubOpen === mainCat.label && (
                              <div className="pl-4">
                                {mainCat.subcategories.map((sub) => (
                                  <button
                                    key={sub}
                                    onClick={() => {
                                      onNavigate('products');
                                      setIsMobileMenuOpen(false);
                                    }}
                                    className="block w-full text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors py-2 px-2 rounded-lg"
                                  >
                                    {sub}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    key={category.label}
                    onClick={() => {
                      if (category.label === 'NEW ARRIVALS') onCategoryNavigate('new-arrivals', 'all');
                      else if (category.label === 'CO-ORDS') onCategoryNavigate('co-ords', 'co-ords');
                      else onNavigate(category.page);
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left text-lg font-bold text-black hover:text-red-600 transition-colors py-3 px-2 rounded-lg hover:bg-gray-50 uppercase tracking-wider"
                  >
                    {category.label}
                  </button>
                )
              ))}
              
              {!isLoggedIn && (
                <div className="pt-6 border-t space-y-2 mt-6">
                  <button
                    onClick={() => {
                      onAuth('login');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left text-lg font-bold text-black hover:text-red-600 transition-colors py-3 px-2 rounded-lg hover:bg-gray-50 uppercase tracking-wider"
                  >
                    LOGIN
                  </button>
                  <button
                    onClick={() => {
                      onAuth('signup');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left text-lg font-bold text-black hover:text-red-600 transition-colors py-3 px-2 rounded-lg hover:bg-gray-50 uppercase tracking-wider"
                  >
                    SIGN UP
                  </button>
                </div>
              )}
              
              {isLoggedIn && (
                <div className="pt-6 border-t mt-6">
                  <div className="flex items-center space-x-3 mb-4 px-2">
                    <User size={20} className="text-gray-600" />
                    <span className="font-semibold text-gray-900">
                      Welcome, {user?.name?.split(' ')[0]}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left text-lg font-bold text-red-600 hover:text-red-700 transition-colors py-3 px-2 rounded-lg hover:bg-red-50 uppercase tracking-wider"
                  >
                    LOGOUT
                  </button>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;