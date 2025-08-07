import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Truck, Shield, MapPin, Phone, Mail } from 'lucide-react';
import { CartItem } from '../App';

interface CheckoutPageProps {
  cart: CartItem[];
  onNavigate: (page: string) => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, onNavigate }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'card'
  });

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 1999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Process order
      alert('Order placed successfully!');
      onNavigate('home');
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((stepNumber) => (
        <div key={stepNumber} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            step >= stepNumber ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            {stepNumber}
          </div>
          <div className={`text-sm font-medium ml-2 ${
            step >= stepNumber ? 'text-black' : 'text-gray-600'
          }`}>
            {stepNumber === 1 ? 'Information' : stepNumber === 2 ? 'Shipping' : 'Payment'}
          </div>
          {stepNumber < 3 && (
            <div className={`w-12 h-px mx-4 ${
              step > stepNumber ? 'bg-black' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name *
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address *
        </label>
        <div className="relative">
          <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone Number *
        </label>
        <div className="relative">
          <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Shipping Address</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address *
        </label>
        <div className="relative">
          <MapPin size={18} className="absolute left-3 top-4 text-gray-400" />
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            rows={3}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black resize-none"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City *
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State *
          </label>
          <select
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            required
          >
            <option value="">Select State</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Delhi">Delhi</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PIN Code *
          </label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            required
          />
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <Truck size={20} className="text-blue-600" />
          <div>
            <p className="font-medium text-blue-900">Free Delivery</p>
            <p className="text-sm text-blue-700">Estimated delivery: 3-5 business days</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>
      
      <div className="space-y-4">
        <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-black transition-colors">
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            checked={formData.paymentMethod === 'card'}
            onChange={handleInputChange}
            className="sr-only"
          />
          <div className={`w-4 h-4 border-2 border-black rounded-full mr-3 flex items-center justify-center ${
            formData.paymentMethod === 'card' ? 'bg-black' : 'bg-white'
          }`}>
            {formData.paymentMethod === 'card' && (
              <div className="w-2 h-2 bg-white rounded-full" />
            )}
          </div>
          <CreditCard size={20} className="mr-3" />
          <span className="font-medium">Credit/Debit Card</span>
        </label>

        <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-black transition-colors">
          <input
            type="radio"
            name="paymentMethod"
            value="upi"
            checked={formData.paymentMethod === 'upi'}
            onChange={handleInputChange}
            className="sr-only"
          />
          <div className={`w-4 h-4 border-2 border-black rounded-full mr-3 flex items-center justify-center ${
            formData.paymentMethod === 'upi' ? 'bg-black' : 'bg-white'
          }`}>
            {formData.paymentMethod === 'upi' && (
              <div className="w-2 h-2 bg-white rounded-full" />
            )}
          </div>
          <div className="w-5 h-5 bg-orange-500 rounded mr-3 flex items-center justify-center">
            <span className="text-white text-xs font-bold">₹</span>
          </div>
          <span className="font-medium">UPI Payment</span>
        </label>

        <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-black transition-colors">
          <input
            type="radio"
            name="paymentMethod"
            value="cod"
            checked={formData.paymentMethod === 'cod'}
            onChange={handleInputChange}
            className="sr-only"
          />
          <div className={`w-4 h-4 border-2 border-black rounded-full mr-3 flex items-center justify-center ${
            formData.paymentMethod === 'cod' ? 'bg-black' : 'bg-white'
          }`}>
            {formData.paymentMethod === 'cod' && (
              <div className="w-2 h-2 bg-white rounded-full" />
            )}
          </div>
          <Truck size={20} className="mr-3" />
          <span className="font-medium">Cash on Delivery</span>
        </label>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <Shield size={20} className="text-green-600" />
          <div>
            <p className="font-medium text-green-900">Secure Payment</p>
            <p className="text-sm text-green-700">Your payment information is encrypted and secure</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <div className="container mx-auto px-4 lg:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => onNavigate('cart')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Cart</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        {renderStepIndicator()}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <form onSubmit={handleSubmit}>
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}

                <div className="flex justify-between mt-8">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors"
                    >
                      Previous
                    </button>
                  )}
                  <button
                    type="submit"
                    className="ml-auto px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                  >
                    {step === 3 ? 'Place Order' : 'Continue'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h3>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {cart.map((item, index) => (
                  <div key={`${item.product.id}-${item.size}`} className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{item.product.name}</h4>
                      <p className="text-gray-600 text-sm">Size: {item.size} | Qty: {item.quantity}</p>
                      <p className="font-semibold text-gray-900">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (GST)</span>
                  <span className="font-medium">₹{tax.toLocaleString()}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;