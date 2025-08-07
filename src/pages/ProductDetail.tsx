import React, { useState } from 'react';
import { ArrowLeft, Heart, Star, Truck, Shield, RefreshCw, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Product } from '../App';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  onNavigate: (page: string) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onAddToCart,
  onNavigate,
  wishlist,
  onToggleWishlist
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const images = product.images || [product.image];
  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    onAddToCart(product, selectedSize, quantity);
  };

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'details', label: 'Details' },
    { id: 'reviews', label: `Reviews (${product.reviews})` }
  ];

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <div className="container mx-auto px-4 lg:px-6 py-8">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('products')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Products</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex space-x-4 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-orange-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={`${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.reviews} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="bg-red-100 text-red-600 px-2 py-1 text-sm font-medium rounded">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg transition-colors ${
                      selectedSize === size
                        ? 'bg-black text-white border-black'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
                  disabled={!product.inStock}
                >
                  <ShoppingBag size={20} />
                  <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className={`p-4 border rounded-lg transition-colors ${
                    isWishlisted
                      ? 'bg-red-50 border-red-200 text-red-600'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-orange-500 text-white py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                disabled={!product.inStock}
              >
                Buy Now
              </button>
            </div>

            {/* Features */}
            <div className="border-t pt-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-sm">
                  <Truck size={16} className="text-gray-500" />
                  <span>Free delivery within 3-5 days</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <RefreshCw size={16} className="text-gray-500" />
                  <span>Easy returns within 30 days</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Shield size={16} className="text-gray-500" />
                  <span>1 year warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {product.description || 'Premium quality garment crafted with attention to detail and comfort.'}
                </p>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-4">Product Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fabric:</span>
                      <span>{product.fabric || 'Cotton blend'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Care:</span>
                      <span>{product.care || 'Machine wash cold'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="capitalize">{product.category}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">Size Guide</h4>
                  <p className="text-sm text-gray-600">
                    Refer to our size guide for the perfect fit. Model is 6'0" and wearing size M.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="text-center py-12">
                  <div className="text-gray-400 text-4xl mb-4">⭐</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No reviews yet</h3>
                  <p className="text-gray-600">Be the first to review this product</p>
                  <button className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                    Write a Review
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;