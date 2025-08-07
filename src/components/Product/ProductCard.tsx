import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../../App';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onClick, 
  wishlist, 
  onToggleWishlist 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const isWishlisted = wishlist.includes(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  const discountPercentage = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="group cursor-pointer bg-white relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <img
          src={isHovered && product.hoverImage ? product.hoverImage : product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } ${isHovered ? 'scale-105' : 'scale-100'}`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Overlay */}
        <div className={`absolute inset-0 bg-black/0 transition-all duration-300 ${
          isHovered ? 'bg-black/20' : ''
        }`}>
          {/* Action Buttons */}
          <div className={`absolute top-4 right-4 flex flex-col space-y-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
          }`}>
            <button
              onClick={handleWishlistClick}
              className={`p-2 rounded-full transition-all duration-300 ${
                isWishlisted 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
              }`}
            >
              <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>

            <button
              onClick={handleQuickView}
              className="p-2 rounded-full bg-white/90 text-gray-700 hover:bg-black hover:text-white transition-all duration-300"
            >
              <Eye size={16} />
            </button>
          </div>

          {/* Quick Add Button */}
          <button
            onClick={handleQuickView}
            className={`absolute bottom-4 left-4 right-4 bg-black text-white py-3 font-bold text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            } hover:bg-red-600`}
          >
            <ShoppingBag size={16} />
            <span>QUICK ADD</span>
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          {product.badge && (
            <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold uppercase tracking-wider">
              {product.badge}
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="bg-green-600 text-white px-2 py-1 text-xs font-bold uppercase tracking-wider">
              -{discountPercentage}%
            </span>
          )}
          {product.isNew && (
            <span className="bg-blue-600 text-white px-2 py-1 text-xs font-bold uppercase tracking-wider">
              NEW
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-2 uppercase tracking-wide text-sm group-hover:text-red-600 transition-colors">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-lg font-black text-black">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Sizes */}
        <div className="flex items-center space-x-1 mb-2">
          <span className="text-xs text-gray-600 uppercase tracking-wider">Sizes:</span>
          <div className="flex space-x-1">
            {product.sizes.slice(0, 4).map((size, index) => (
              <span key={size} className="text-xs text-gray-800 font-medium">
                {size}{index < Math.min(product.sizes.length - 1, 3) ? ',' : ''}
              </span>
            ))}
            {product.sizes.length > 4 && (
              <span className="text-xs text-gray-600">+{product.sizes.length - 4}</span>
            )}
          </div>
        </div>

        {/* Stock Status */}
        <div className="flex items-center justify-between">
          <span className={`text-xs font-bold uppercase tracking-wider ${
            product.inStock ? 'text-green-600' : 'text-red-600'
          }`}>
            {product.inStock ? 'IN STOCK' : 'OUT OF STOCK'}
          </span>
          
          {product.reviews > 0 && (
            <span className="text-xs text-gray-600">
              ({product.reviews} reviews)
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;