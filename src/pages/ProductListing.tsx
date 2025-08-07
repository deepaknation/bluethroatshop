import React, { useState, useMemo } from 'react';
import { Filter, Grid, List, ChevronDown, X, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/Product/ProductCard';
import { Product } from '../App';

interface ProductListingProps {
  products: Product[];
  selectedCategory: string;
  onProductSelect: (product: Product) => void;
  onNavigate: (page: string) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  searchQuery: string;
}

const ProductListing: React.FC<ProductListingProps> = ({
  products,
  selectedCategory,
  onProductSelect,
  onNavigate,
  wishlist,
  onToggleWishlist,
  searchQuery
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: selectedCategory === 'all' ? '' : selectedCategory,
    priceRange: [0, 10000],
    sizes: [] as string[],
    inStock: false,
    colors: [] as string[],
    badges: [] as string[]
  });
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    { id: '', label: 'All Products' },
    { id: 'tees', label: 'T-Shirts & Tees' },
    { id: 'shirts', label: 'Shirts' },
    { id: 'bottoms', label: 'Bottoms' },
    { id: 'co-ords', label: 'Co-ord Sets' },
    { id: 'jackets', label: 'Jackets' }
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', '38'];
  const colors = ['Black', 'White', 'Navy', 'Grey', 'Red', 'Blue', 'Green', 'Beige'];
  const badges = ['NEW', 'BESTSELLER', 'LIMITED', 'TRENDING'];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      if (filters.category && product.category !== filters.category) return false;
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;
      if (filters.inStock && !product.inStock) return false;
      if (filters.sizes.length > 0 && !filters.sizes.some(size => product.sizes.includes(size))) return false;
      if (filters.badges.length > 0 && product.badge && !filters.badges.includes(product.badge)) return false;
      // Search filter
      if (searchQuery && !(
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase()))
      )) return false;
      return true;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'newest':
        default:
          return 0;
      }
    });
  }, [products, filters, sortBy, searchQuery]);

  const handleFilterChange = (filterType: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleArrayFilterToggle = (filterType: 'sizes' | 'colors' | 'badges', value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: [0, 10000],
      sizes: [],
      inStock: false,
      colors: [],
      badges: []
    });
  };

  const activeFiltersCount = Object.values(filters).flat().filter(Boolean).length;

  const handleProductClick = (product: Product) => {
    onProductSelect(product);
    onNavigate('product-detail');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <button onClick={() => onNavigate('home')} className="hover:text-black">
            HOME
          </button>
          <span>/</span>
          <span className="text-black font-medium uppercase">
            {filters.category ? categories.find(c => c.id === filters.category)?.label : 'ALL PRODUCTS'}
          </span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-black mb-4 tracking-tight">
            {filters.category ? categories.find(c => c.id === filters.category)?.label : 'ALL PRODUCTS'}
          </h1>
          <p className="text-gray-600 text-lg">
            Showing {filteredAndSortedProducts.length} of {products.length} products
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-6 py-3 border-2 border-black text-black font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-300"
            >
              <SlidersHorizontal size={18} />
              <span>FILTERS</span>
              {activeFiltersCount > 0 && (
                <span className="bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-red-600 hover:text-red-700 font-bold uppercase tracking-wider text-sm"
              >
                CLEAR ALL
              </button>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border-2 border-black px-6 py-3 pr-10 font-bold uppercase tracking-wider text-sm focus:outline-none focus:border-red-600"
              >
                <option value="newest">NEWEST FIRST</option>
                <option value="price-low">PRICE: LOW TO HIGH</option>
                <option value="price-high">PRICE: HIGH TO LOW</option>
                <option value="rating">HIGHEST RATED</option>
                <option value="name">NAME: A TO Z</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>

            {/* View Mode */}
            <div className="flex border-2 border-black overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 transition-colors ${
                  viewMode === 'grid' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 transition-colors ${
                  viewMode === 'list' ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 space-y-6`}>
            <div className="bg-gray-50 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-black text-xl uppercase tracking-wider">FILTERS</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden p-1"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-8">
                <h4 className="font-bold text-sm uppercase tracking-wider mb-4">CATEGORY</h4>
                <div className="space-y-3">
                  {categories.map(category => (
                    <label key={category.id} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={filters.category === category.id}
                        onChange={() => handleFilterChange('category', category.id)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 border-2 border-black mr-3 flex items-center justify-center ${
                        filters.category === category.id ? 'bg-black' : 'bg-white'
                      }`}>
                        {filters.category === category.id && (
                          <div className="w-2 h-2 bg-white" />
                        )}
                      </div>
                      <span className="text-sm font-medium uppercase tracking-wide">{category.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-8">
                <h4 className="font-bold text-sm uppercase tracking-wider mb-4">SIZE</h4>
                <div className="grid grid-cols-4 gap-2">
                  {sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => handleArrayFilterToggle('sizes', size)}
                      className={`py-2 text-sm font-bold border-2 transition-all duration-300 ${
                        filters.sizes.includes(size)
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-black border-gray-300 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h4 className="font-bold text-sm uppercase tracking-wider mb-4">PRICE RANGE</h4>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={filters.priceRange[1]}
                    onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 appearance-none slider"
                  />
                  <div className="flex justify-between text-sm font-bold">
                    <span>₹0</span>
                    <span>₹{filters.priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Badges Filter */}
              <div className="mb-8">
                <h4 className="font-bold text-sm uppercase tracking-wider mb-4">COLLECTIONS</h4>
                <div className="space-y-3">
                  {badges.map(badge => (
                    <label key={badge} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.badges.includes(badge)}
                        onChange={() => handleArrayFilterToggle('badges', badge)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 border-2 border-black mr-3 flex items-center justify-center ${
                        filters.badges.includes(badge) ? 'bg-black' : 'bg-white'
                      }`}>
                        {filters.badges.includes(badge) && (
                          <div className="w-2 h-2 bg-white" />
                        )}
                      </div>
                      <span className="text-sm font-medium uppercase tracking-wide">{badge}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* In Stock Filter */}
              <div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 border-2 border-black mr-3 flex items-center justify-center ${
                    filters.inStock ? 'bg-black' : 'bg-white'
                  }`}>
                    {filters.inStock && (
                      <div className="w-2 h-2 bg-white" />
                    )}
                  </div>
                  <span className="text-sm font-medium uppercase tracking-wide">IN STOCK ONLY</span>
                </label>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredAndSortedProducts.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredAndSortedProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => handleProductClick(product)}
                    wishlist={wishlist}
                    onToggleWishlist={onToggleWishlist}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-gray-300 text-8xl mb-6">😔</div>
                <h3 className="text-3xl font-black text-black mb-4 uppercase tracking-wider">
                  NO PRODUCTS FOUND
                </h3>
                <p className="text-gray-600 text-lg mb-8">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-red-600 text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-red-700 transition-colors"
                >
                  CLEAR ALL FILTERS
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;