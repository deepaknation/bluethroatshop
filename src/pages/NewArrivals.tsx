import React from 'react';
import { ArrowLeft, Sparkles, TrendingUp } from 'lucide-react';
import ProductCard from '../components/Product/ProductCard';
import { Product } from '../App';

interface NewArrivalsProps {
  products: Product[];
  onNavigate: (page: string) => void;
  onProductSelect: (product: Product) => void;
  onCategorySelect: (category: string) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
}

const NewArrivals: React.FC<NewArrivalsProps> = ({
  products,
  onNavigate,
  onProductSelect,
  onCategorySelect,
  wishlist,
  onToggleWishlist
}) => {
  const handleProductClick = (product: Product) => {
    onProductSelect(product);
    onNavigate('product-detail');
  };

  const categories = [
    { id: 'all', label: 'All New', count: products.length },
    { id: 'tees', label: 'T-Shirts', count: products.filter(p => p.category === 'tees').length },
    { id: 'shirts', label: 'Shirts', count: products.filter(p => p.category === 'shirts').length },
    { id: 'bottoms', label: 'Bottoms', count: products.filter(p => p.category === 'bottoms').length },
    { id: 'co-ords', label: 'Co-ords', count: products.filter(p => p.category === 'co-ords').length }
  ];

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-black to-gray-800 text-white py-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Sparkles size={32} className="text-yellow-400 mr-3" />
              <h1 className="text-5xl md:text-6xl font-black tracking-tight">
                NEW ARRIVALS
              </h1>
              <Sparkles size={32} className="text-yellow-400 ml-3" />
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Fresh drops, latest trends, and exclusive designs. Be the first to wear what's next.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <TrendingUp size={16} className="text-green-400" />
                <span>Latest Trends</span>
              </div>
              <div className="w-px h-4 bg-gray-600" />
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span>Just Dropped</span>
              </div>
              <div className="w-px h-4 bg-gray-600" />
              <div className="flex items-center space-x-2">
                <span>Limited Stock</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <button onClick={() => onNavigate('home')} className="hover:text-black">
            HOME
          </button>
          <span>/</span>
          <span className="text-black font-medium uppercase">NEW ARRIVALS</span>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => {
                  onCategorySelect(category.id);
                  onNavigate('products');
                }}
                className="px-6 py-3 border-2 border-black text-black font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-300 flex items-center space-x-2"
              >
                <span>{category.label}</span>
                <span className="bg-red-600 text-white px-2 py-1 text-xs rounded-full">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Stats Banner */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-red-100 p-3 rounded-full">
                <Sparkles size={24} className="text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {products.length} New Products This Week
                </h3>
                <p className="text-gray-600">Fresh styles added to our collection</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-red-600">40% OFF</div>
              <div className="text-sm text-gray-600">On selected items</div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <div key={product.id} className="relative">
                <ProductCard
                  product={product}
                  onClick={() => handleProductClick(product)}
                  wishlist={wishlist}
                  onToggleWishlist={onToggleWishlist}
                />
                
                {/* New Badge */}
                <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs font-bold uppercase tracking-wider rounded">
                  NEW
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-gray-300 text-8xl mb-6">
              <Sparkles className="mx-auto" size={120} />
            </div>
            <h3 className="text-3xl font-black text-black mb-4 uppercase tracking-wider">
              Coming Soon
            </h3>
            <p className="text-gray-600 text-lg mb-8">
              New arrivals are on their way. Check back soon for fresh styles!
            </p>
            <button
              onClick={() => onNavigate('products')}
              className="bg-black text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors"
            >
              Shop All Products
            </button>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 bg-black text-white rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-3xl font-black mb-4 uppercase tracking-wider">
              Never Miss a Drop
            </h2>
            <p className="text-gray-300 mb-6">
              Be the first to know about new arrivals, exclusive offers, and limited editions.
            </p>
            <div className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 text-black rounded-l-lg focus:outline-none"
              />
              <button className="bg-red-600 text-white px-6 py-3 rounded-r-lg font-bold hover:bg-red-700 transition-colors">
                NOTIFY ME
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;