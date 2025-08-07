import React from 'react';
import { Home, Search, ShoppingBag, Heart } from 'lucide-react';

interface MobileBottomNavProps {
  onNavigate: (page: string) => void;
  cartItemsCount: number;
  currentPage: string;
  wishlistCount: number;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ 
  onNavigate, 
  cartItemsCount, 
  currentPage,
  wishlistCount
}) => {
  const navItems = [
    { icon: Home, label: 'Home', page: 'home' },
    { icon: Search, label: 'Shop', page: 'products' },
    { icon: ShoppingBag, label: 'Cart', page: 'cart', badge: cartItemsCount },
    { icon: Heart, label: 'Wishlist', page: 'wishlist', badge: wishlistCount },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="flex">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.page;
          
          return (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`flex-1 flex flex-col items-center justify-center py-2 px-1 transition-colors ${
                isActive 
                  ? 'text-orange-500' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="relative">
                <Icon size={20} />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;