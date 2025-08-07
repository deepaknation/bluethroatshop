import React from 'react';

interface CategorySectionProps {
  onNavigate: (page: string) => void;
  onCategorySelect: (category: string) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ onNavigate, onCategorySelect }) => {
  const categories = [
    {
      id: 'tees',
      name: 'OVERSIZED TEES',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Comfort meets style',
      badge: 'BESTSELLER'
    },
    {
      id: 'shirts',
      name: 'SHIRTS',
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'From casual to formal',
      badge: 'NEW'
    },
    {
      id: 'co-ords',
      name: 'CO-ORDS',
      image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Matching sets for effortless style',
      badge: 'TRENDING'
    },
    {
      id: 'bottoms',
      name: 'BOTTOMS',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Joggers, jeans & more',
      badge: 'HOT'
    }
  ];

  const handleCategoryClick = (categoryId: string) => {
    onCategorySelect(categoryId);
    onNavigate('products');
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-black mb-6 tracking-tight">
            SHOP BY
            <br />
            <span className="text-red-600">CATEGORY</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our curated collections designed for the modern streetwear enthusiast
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="group cursor-pointer relative overflow-hidden bg-black rounded-none"
            >
              {/* Image */}
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
              </div>

              {/* Badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  {category.badge}
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-black mb-2 group-hover:text-red-500 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  {category.description}
                </p>
                <button className="text-white font-bold uppercase tracking-wider text-sm border-b-2 border-transparent group-hover:border-red-500 transition-all duration-300">
                  SHOP NOW →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => onNavigate('products')}
            className="bg-black text-white px-12 py-4 font-bold text-lg uppercase tracking-wider hover:bg-red-600 transition-all duration-300"
          >
            VIEW ALL CATEGORIES
          </button>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;