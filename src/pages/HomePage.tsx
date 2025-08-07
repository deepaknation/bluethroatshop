import React from 'react';
import Hero from '../components/Home/Hero';
import CategorySection from '../components/Home/CategorySection';
import ProductGrid from '../components/Home/ProductGrid';
import { Product } from '../App';

interface HomePageProps {
  products: Product[];
  onNavigate: (page: string) => void;
  onCategorySelect: (category: string) => void;
  onProductSelect: (product: Product) => void;
}

const HomePage: React.FC<HomePageProps> = ({ 
  products, 
  onNavigate, 
  onCategorySelect, 
  onProductSelect 
}) => {
  const newArrivals = products.slice(0, 4);
  const bestSellers = products.filter(p => p.rating >= 4.5);

  return (
    <div className="min-h-screen">
      <Hero onNavigate={onNavigate} />
      <CategorySection onNavigate={onNavigate} onCategorySelect={onCategorySelect} />
      <ProductGrid 
        title="New Arrivals" 
        products={newArrivals}
        onProductSelect={onProductSelect}
        onNavigate={onNavigate}
      />
      <ProductGrid 
        title="Best Sellers" 
        products={bestSellers}
        onProductSelect={onProductSelect}
        onNavigate={onNavigate}
      />
    </div>
  );
};

export default HomePage;