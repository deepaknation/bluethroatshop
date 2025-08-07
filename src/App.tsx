import React, { useState, useEffect } from 'react';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import WishlistPage from './pages/WishlistPage';
import NewArrivals from './pages/NewArrivals';
import Bestsellers from './pages/Bestsellers';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import SizeGuide from './pages/SizeGuide';
import ShippingReturns from './pages/ShippingReturns';
import TrackOrder from './pages/TrackOrder';
import AdminDashboard from './pages/AdminDashboard';
import AuthModal from './components/Auth/AuthModal';
import MobileBottomNav from './components/Layout/MobileBottomNav';
import Toast from './components/UI/Toast';

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage: string;
  category: string;
  sizes: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
  description?: string;
  fabric?: string;
  care?: string;
  images?: string[];
  badge?: string;
  isNew?: boolean;
  isBestseller?: boolean;
};

export type CartItem = {
  product: Product;
  size: string;
  quantity: number;
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const sampleProducts: Product[] = [
    {
      id: '1',
      name: 'Oversized Graphic Tee - Black',
      price: 1299,
      originalPrice: 1999,
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=500',
      hoverImage: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'tees',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      inStock: true,
      rating: 4.5,
      reviews: 128,
      description: 'Premium cotton oversized graphic tee with street-style design',
      fabric: '100% Cotton',
      care: 'Machine wash cold',
      badge: 'BESTSELLER',
      isNew: false,
      isBestseller: true,
      images: [
        'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1078958/pexels-photo-1078958.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
    },
    {
      id: '2',
      name: 'Casual Linen Shirt - White',
      price: 1899,
      originalPrice: 2499,
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=500',
      hoverImage: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'shirts',
      sizes: ['S', 'M', 'L', 'XL'],
      inStock: true,
      rating: 4.3,
      reviews: 89,
      description: 'Breathable linen casual shirt perfect for summer',
      fabric: 'Pure Linen',
      care: 'Dry clean recommended',
      badge: 'NEW',
      isNew: true,
      isBestseller: false,
      images: [
        'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
    },
    {
      id: '3',
      name: 'Cargo Joggers - Olive',
      price: 2499,
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=500',
      hoverImage: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'bottoms',
      sizes: ['28', '30', '32', '34', '36'],
      inStock: true,
      rating: 4.7,
      reviews: 156,
      description: 'Utility cargo joggers with multiple pockets',
      fabric: 'Cotton Twill',
      care: 'Machine wash cold',
      isNew: false,
      isBestseller: false,
      images: [
        'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
    },
    {
      id: '4',
      name: 'Co-ord Set - Navy Blue',
      price: 3499,
      originalPrice: 4999,
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=500',
      hoverImage: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'co-ords',
      sizes: ['S', 'M', 'L', 'XL'],
      inStock: true,
      rating: 4.6,
      reviews: 203,
      description: 'Matching shirt and shorts set for effortless style',
      fabric: 'Cotton Blend',
      care: 'Machine wash warm',
      badge: 'LIMITED',
      isNew: false,
      isBestseller: false,
      images: [
        'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
    },
    {
      id: '5',
      name: 'Denim Jacket - Light Blue',
      price: 3999,
      originalPrice: 5499,
      image: 'https://images.pexels.com/photos/1078958/pexels-photo-1078958.jpeg?auto=compress&cs=tinysrgb&w=500',
      hoverImage: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'jackets',
      sizes: ['S', 'M', 'L', 'XL'],
      inStock: true,
      rating: 4.8,
      reviews: 92,
      description: 'Classic denim jacket with modern fit',
      fabric: '100% Denim',
      care: 'Machine wash cold',
      badge: 'TRENDING',
      isNew: false,
      isBestseller: true,
      images: [
        'https://images.pexels.com/photos/1078958/pexels-photo-1078958.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
    },
    {
      id: '6',
      name: 'Polo T-Shirt - Black',
      price: 1599,
      image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=500',
      hoverImage: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'tees',
      sizes: ['S', 'M', 'L', 'XL'],
      inStock: true,
      rating: 4.4,
      reviews: 67,
      description: 'Classic polo t-shirt with premium finish',
      fabric: 'Cotton Pique',
      care: 'Machine wash cold',
      isNew: true,
      isBestseller: false,
      images: [
        'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
    }
  ];

  const addToCart = (product: Product, size: string, quantity: number = 1) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.product.id === product.id && item.size === size);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, size, quantity }];
    });
    setToast({ message: 'Product added to cart!', type: 'success' });
  };

  const updateCartQuantity = (productId: string, size: string, quantity: number) => {
    setCart(prev => 
      quantity > 0 
        ? prev.map(item =>
            item.product.id === productId && item.size === size
              ? { ...item, quantity }
              : item
          )
        : prev.filter(item => !(item.product.id === productId && item.size === size))
    );
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
    const isAdding = !wishlist.includes(productId);
    setToast({ 
      message: isAdding ? 'Added to wishlist!' : 'Removed from wishlist!', 
      type: 'success' 
    });
  };

  const openAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleAuth = (userData: { name: string; email: string }) => {
    setUser(userData);
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const handleCategoryNavigate = (page: string, category: string) => {
    setCurrentPage(page);
    setSelectedCategory(category);
    setSearchQuery('');
  };

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage products={sampleProducts} onNavigate={setCurrentPage} onCategorySelect={setSelectedCategory} onProductSelect={setSelectedProduct} />;
      case 'products':
        return <ProductListing products={sampleProducts} selectedCategory={selectedCategory} searchQuery={searchQuery} onProductSelect={setSelectedProduct} onNavigate={setCurrentPage} wishlist={wishlist} onToggleWishlist={toggleWishlist} />;
      case 'product-detail':
        return selectedProduct ? <ProductDetail product={selectedProduct} onAddToCart={addToCart} onNavigate={setCurrentPage} wishlist={wishlist} onToggleWishlist={toggleWishlist} /> : null;
      case 'cart':
        return <CartPage cart={cart} onUpdateQuantity={updateCartQuantity} onNavigate={setCurrentPage} />;
      case 'checkout':
        return <CheckoutPage cart={cart} onNavigate={setCurrentPage} />;
      case 'wishlist':
        return <WishlistPage products={sampleProducts.filter(p => wishlist.includes(p.id))} onNavigate={setCurrentPage} onProductSelect={setSelectedProduct} onToggleWishlist={toggleWishlist} />;
      case 'new-arrivals':
        return <ProductListing products={sampleProducts.filter(p => p.isNew)} selectedCategory={'all'} searchQuery={searchQuery} onProductSelect={setSelectedProduct} onNavigate={setCurrentPage} wishlist={wishlist} onToggleWishlist={toggleWishlist} />;
      case 'co-ords':
        return <ProductListing products={sampleProducts.filter(p => p.category === 'co-ords')} selectedCategory={'co-ords'} searchQuery={searchQuery} onProductSelect={setSelectedProduct} onNavigate={setCurrentPage} wishlist={wishlist} onToggleWishlist={toggleWishlist} />;
      case 'bestsellers':
        return <Bestsellers products={sampleProducts.filter(p => p.isBestseller)} onNavigate={setCurrentPage} onProductSelect={setSelectedProduct} onCategorySelect={setSelectedCategory} wishlist={wishlist} onToggleWishlist={toggleWishlist} />;
      case 'about':
        return <AboutPage onNavigate={setCurrentPage} />;
      case 'contact':
        return <ContactPage onNavigate={setCurrentPage} />;
      case 'size-guide':
        return <SizeGuide onNavigate={setCurrentPage} />;
      case 'shipping-returns':
        return <ShippingReturns onNavigate={setCurrentPage} />;
      case 'track-order':
        return <TrackOrder onNavigate={setCurrentPage} />;
      case 'admin':
        return <AdminDashboard products={sampleProducts} onNavigate={setCurrentPage} />;
      default:
        return <HomePage products={sampleProducts} onNavigate={setCurrentPage} onCategorySelect={setSelectedCategory} onProductSelect={setSelectedProduct} />;
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-white">
      <Header 
        onNavigate={setCurrentPage} 
        onCategoryNavigate={handleCategoryNavigate}
        cartItemsCount={cartItemsCount}
        wishlist={wishlist}
        isLoggedIn={isLoggedIn}
        user={user}
        onAuth={openAuth}
        onLogout={handleLogout}
        currentPage={currentPage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <main>
        {renderPage()}
      </main>

      <Footer onNavigate={setCurrentPage} />
      <MobileBottomNav onNavigate={setCurrentPage} cartItemsCount={cartItemsCount} currentPage={currentPage} wishlistCount={wishlist.length} />

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      {isAuthModalOpen && (
        <AuthModal 
          mode={authMode}
          onClose={() => setIsAuthModalOpen(false)}
          onAuth={handleAuth}
          onToggleMode={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
        />
      )}
    </div>
  );
}

export default App;