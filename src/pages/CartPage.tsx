import React, { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Tag } from 'lucide-react';
import { CartItem } from '../App';

interface CartPageProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, size: string, quantity: number) => void;
  onNavigate: (page: string) => void;
}

const CartPage: React.FC<CartPageProps> = ({ cart, onUpdateQuantity, onNavigate }) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const discount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0;
  const shipping = subtotal > 1999 ? 0 : 99;
  const total = subtotal - discount + shipping;

  const handleApplyCoupon = () => {
    // Mock coupon validation
    const validCoupons: { [key: string]: number } = {
      'SAVE10': 10,
      'WELCOME20': 20,
      'FREESHIP': 5
    };

    if (validCoupons[couponCode.toUpperCase()]) {
      setAppliedCoupon({ 
        code: couponCode.toUpperCase(), 
        discount: validCoupons[couponCode.toUpperCase()] 
      });
      setCouponCode('');
    } else {
      alert('Invalid coupon code');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pb-20 md:pb-0">
        <div className="text-center">
          <div className="text-gray-300 text-8xl mb-6">
            <ShoppingBag className="mx-auto" size={120} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <button
            onClick={() => onNavigate('products')}
            className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <div className="container mx-auto px-4 lg:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onNavigate('products')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Continue Shopping</span>
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {cart.map((item, index) => (
                <div key={`${item.product.id}-${item.size}`} className={`p-6 ${index > 0 ? 'border-t border-gray-200' : ''}`}>
                  <div className="flex items-start space-x-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {item.product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">Size: {item.size}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-900">
                          ₹{item.product.price.toLocaleString()}
                        </span>
                        {item.product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ₹{item.product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.size, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-2 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.size, 0)}
                        className="p-2 text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>

              {/* Coupon Section */}
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <Tag size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <button
                    onClick={handleApplyCoupon}
                    disabled={!couponCode.trim()}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                  >
                    Apply
                  </button>
                </div>

                {appliedCoupon && (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
                    <span className="text-green-700 font-medium">
                      {appliedCoupon.code} ({appliedCoupon.discount}% OFF)
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-green-700 hover:text-green-900 text-sm underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>

                {shipping === 0 && (
                  <div className="text-sm text-green-600">
                    ✓ Free shipping on orders above ₹1999
                  </div>
                )}

                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button 
                onClick={() => onNavigate('checkout')}
                className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Proceed to Checkout
              </button>

              {/* Security Badge */}
              <div className="text-center text-sm text-gray-600">
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <span>🔒</span>
                  <span>Secure Checkout</span>
                </div>
                <p>Your payment information is processed securely</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;