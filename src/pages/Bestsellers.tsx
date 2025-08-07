import React from 'react';
import { ArrowLeft, Award, Star, TrendingUp } from 'lucide-react';
import ProductCard from '../components/Product/ProductCard';
import { Product } from '../App';

interface BestsellersProps {
  products: Product[];
  onNavigate: (page: string) => void;
  onProductSelect: (product: Product) => void;
  onCategorySelect: (category: string) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
}

const Bestsellers: React.FC<BestsellersProps> = ({
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

  const topRated = products.filter(p => p.rating >= 4.5);
  const mostReviewed = products.sort((a, b) => b.reviews - a.reviews).slice(0, 4);

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      {/* Hero Section */}
      <div className="bg-red-500 text-white py-20 w-full">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Award size={32} className="text-yellow-200 mr-3" />
              <h1 className="text-5xl md:text-6xl font-black tracking-tight">
                BESTSELLERS
              </h1>
              <Award size={32} className="text-yellow-200 ml-3" />
            </div>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto mb-8">
              Customer favorites, top-rated products, and the most loved items in our collection.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <Star size={16} className="text-yellow-200 fill-current" />
                <span>Top Rated</span>
              </div>
              <div className="w-px h-4 bg-orange-300" />
              <div className="flex items-center space-x-2">
                <TrendingUp size={16} className="text-green-200" />
                <span>Most Popular</span>
              </div>
              <div className="w-px h-4 bg-orange-300" />
              <div className="flex items-center space-x-2">
                <span>Customer Choice</span>
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
          <span className="text-black font-medium uppercase">BESTSELLERS</span>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
            <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star size={24} className="text-yellow-600 fill-current" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">4.8/5</h3>
            <p className="text-gray-600">Average Rating</p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp size={24} className="text-green-600" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">10K+</h3>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award size={24} className="text-red-600" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">{products.length}</h3>
            <p className="text-gray-600">Bestselling Items</p>
          </div>
        </div>

        {/* Top Rated Section */}
        {topRated.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <Star size={24} className="text-yellow-500 fill-current" />
                <h2 className="text-3xl font-black text-gray-900 uppercase tracking-wider">
                  Top Rated Products
                </h2>
              </div>
              <button
                onClick={() => onNavigate('products')}
                className="text-red-600 font-bold hover:text-red-700 transition-colors uppercase tracking-wider"
              >
                View All →
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {topRated.slice(0, 4).map(product => (
                <div key={product.id} className="relative">
                  <ProductCard
                    product={product}
                    onClick={() => handleProductClick(product)}
                    wishlist={wishlist}
                    onToggleWishlist={onToggleWishlist}
                  />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 text-xs font-bold rounded flex items-center space-x-1">
                    <Star size={12} fill="currentColor" />
                    <span>{product.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Bestsellers */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Award size={24} className="text-red-600" />
              <h2 className="text-3xl font-black text-gray-900 uppercase tracking-wider">
                All Bestsellers
              </h2>
            </div>
          </div>
          
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
                  
                  {/* Bestseller Badge */}
                  <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs font-bold uppercase tracking-wider rounded">
                    BESTSELLER
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-gray-300 text-8xl mb-6">
                <Award className="mx-auto" size={120} />
              </div>
              <h3 className="text-3xl font-black text-black mb-4 uppercase tracking-wider">
                No Bestsellers Yet
              </h3>
              <p className="text-gray-600 text-lg mb-8">
                Our bestsellers are determined by customer reviews and sales data.
              </p>
              <button
                onClick={() => onNavigate('products')}
                className="bg-red-600 text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-red-700 transition-colors"
              >
                Shop All Products
              </button>
            </div>
          )}
        </div>

        {/* Customer Reviews Section */}
        <div className="bg-gray-50 rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-wider">
              What Our Customers Say
            </h2>
            <p className="text-gray-600">Real reviews from real customers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "Amazing quality and perfect fit! The fabric is so comfortable and the design is exactly what I was looking for."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Customer {i}</p>
                    <p className="text-sm text-gray-600">Verified Buyer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bestsellers;