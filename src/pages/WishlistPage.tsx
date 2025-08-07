import React from 'react';
import { ArrowLeft, Heart, ShoppingBag } from 'lucide-react';
import ProductCard from '../components/Product/ProductCard';
import { Product } from '../App';

interface WishlistPageProps {
  products: Product[];
  onNavigate: (page: string) => void;
  onProductSelect: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
}

const WishlistPage: React.FC<WishlistPageProps> = ({
  products,
  onNavigate,
  onProductSelect,
  onToggleWishlist
}) => {
  const handleProductClick = (product: Product) => {
    onProductSelect(product);
    onNavigate('product-detail');
  };

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pb-20 md:pb-0">
        <div className="text-center">
          <div className="text-gray-300 text-8xl mb-6">
            <Heart className="mx-auto" size={120} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-8">Save your favorite items to your wishlist and shop them later.</p>
          <button
            onClick={() => onNavigate('products')}
            className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <div className="container mx-auto px-4 lg:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Home</span>
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
        </div>

        {/* Wishlist Stats */}
        <div className="mb-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-red-100 p-3 rounded-full">
                  <Heart size={24} className="text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {products.length} {products.length === 1 ? 'Item' : 'Items'} in Wishlist
                  </h3>
                  <p className="text-gray-600">Your favorite products saved for later</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('products')}
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <ShoppingBag size={18} />
                <span>Continue Shopping</span>
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.id} className="relative">
              <ProductCard
                product={product}
                onClick={() => handleProductClick(product)}
                wishlist={products.map(p => p.id)}
                onToggleWishlist={onToggleWishlist}
              />
              
              {/* Remove from Wishlist Button */}
              <button
                onClick={() => onToggleWishlist(product.id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors z-10"
                title="Remove from wishlist"
              >
                <Heart size={16} fill="currentColor" />
              </button>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <div className="mt-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">You might also like</h2>
            <p className="text-gray-600 mb-8">Discover more products similar to your favorites</p>
            <button
              onClick={() => onNavigate('products')}
              className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Explore More Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;