import React from 'react';
import ProductCard from '../Product/ProductCard';
import { Product } from '../../App';

interface ProductGridProps {
  title: string;
  products: Product[];
  onProductSelect: (product: Product) => void;
  onNavigate: (page: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  title, 
  products, 
  onProductSelect, 
  onNavigate 
}) => {
  const handleProductClick = (product: Product) => {
    onProductSelect(product);
    onNavigate('product-detail');
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={() => onNavigate('products')}
            className="text-orange-500 font-medium hover:text-orange-600 transition-colors"
          >
            View All →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => handleProductClick(product)}
              wishlist={[]}
              onToggleWishlist={() => {}}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;