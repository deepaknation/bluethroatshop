import React, { useState } from 'react';
import { ArrowLeft, Truck, RotateCcw, Shield, Clock, Package, CreditCard } from 'lucide-react';

interface ShippingReturnsProps {
  onNavigate: (page: string) => void;
}

const ShippingReturns: React.FC<ShippingReturnsProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('shipping');

  const tabs = [
    { id: 'shipping', label: 'Shipping Policy', icon: Truck },
    { id: 'returns', label: 'Returns & Exchanges', icon: RotateCcw }
  ];

  const shippingOptions = [
    {
      name: 'Standard Delivery',
      time: '5-7 business days',
      cost: '₹99',
      description: 'Free on orders above ₹1999'
    },
    {
      name: 'Express Delivery',
      time: '2-3 business days',
      cost: '₹199',
      description: 'Available in major cities'
    },
    {
      name: 'Same Day Delivery',
      time: 'Within 24 hours',
      cost: '₹299',
      description: 'Available in Mumbai & Delhi'
    }
  ];

  const returnSteps = [
    {
      step: 1,
      title: 'Initiate Return',
      description: 'Contact us within 30 days of delivery via email or phone'
    },
    {
      step: 2,
      title: 'Pack the Item',
      description: 'Pack the item in original packaging with all tags attached'
    },
    {
      step: 3,
      title: 'Schedule Pickup',
      description: 'We\'ll arrange a free pickup from your address'
    },
    {
      step: 4,
      title: 'Quality Check',
      description: 'Our team will inspect the returned item'
    },
    {
      step: 5,
      title: 'Refund Processing',
      description: 'Refund will be processed within 5-7 business days'
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      {/* Header */}
      <div className="container mx-auto px-4 lg:px-6 py-8">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Hero Section */}
      <div className="bg-red-500 text-white py-20 w-full">
        <div className="container mx-auto px-4 lg:px-6">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-center mb-4">SHIPPING & RETURNS</h1>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto text-center mb-8">All the info you need about our shipping and return policies.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-16">
        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                    activeTab === tab.id
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Shipping Content */}
        {activeTab === 'shipping' && (
          <div className="space-y-16">
            {/* Shipping Options */}
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-8 text-center uppercase tracking-wider">
                Shipping Options
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {shippingOptions.map((option, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Truck size={32} className="text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{option.name}</h3>
                    <p className="text-2xl font-black text-blue-600 mb-2">{option.cost}</p>
                    <p className="text-gray-600 mb-2">{option.time}</p>
                    <p className="text-sm text-gray-500">{option.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Package size={20} className="text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Order Processing</h4>
                      <p className="text-gray-600 text-sm">Orders are processed within 1-2 business days</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock size={20} className="text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Delivery Time</h4>
                      <p className="text-gray-600 text-sm">Delivery times may vary during peak seasons and festivals</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Shield size={20} className="text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Secure Packaging</h4>
                      <p className="text-gray-600 text-sm">All items are carefully packaged to prevent damage</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Delivery Areas</h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h4 className="font-semibold text-green-900 mb-3">We deliver across India</h4>
                  <ul className="space-y-2 text-sm text-green-700">
                    <li>• All major cities and towns</li>
                    <li>• Remote areas (additional charges may apply)</li>
                    <li>• Cash on Delivery available</li>
                    <li>• Real-time tracking provided</li>
                  </ul>
                </div>
                
                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h4 className="font-semibold text-yellow-900 mb-3">Important Notes</h4>
                  <ul className="space-y-2 text-sm text-yellow-700">
                    <li>• PO Box addresses not supported</li>
                    <li>• Signature required for delivery</li>
                    <li>• Additional charges for remote locations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Returns Content */}
        {activeTab === 'returns' && (
          <div className="space-y-16">
            {/* Return Policy Overview */}
            <div className="text-center">
              <h2 className="text-4xl font-black text-gray-900 mb-8 uppercase tracking-wider">
                30-Day Return Policy
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We want you to be completely satisfied with your purchase. If you're not happy with your order, 
                you can return it within 30 days of delivery for a full refund or exchange.
              </p>
            </div>

            {/* Return Process */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">How to Return</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {returnSteps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-red-600 font-bold">{step.step}</span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Return Conditions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Return Conditions</h3>
                
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-2">✓ Eligible for Return</h4>
                    <ul className="space-y-1 text-sm text-green-700">
                      <li>• Items in original condition with tags</li>
                      <li>• Unworn and unwashed items</li>
                      <li>• Original packaging included</li>
                      <li>• Returned within 30 days</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-900 mb-2">✗ Not Eligible for Return</h4>
                    <ul className="space-y-1 text-sm text-red-700">
                      <li>• Worn or washed items</li>
                      <li>• Items without tags</li>
                      <li>• Damaged by customer</li>
                      <li>• Customized or personalized items</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Refund Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CreditCard size={20} className="text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Refund Method</h4>
                      <p className="text-gray-600 text-sm">Refunds are processed to the original payment method</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock size={20} className="text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Processing Time</h4>
                      <p className="text-gray-600 text-sm">5-7 business days after we receive your return</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Truck size={20} className="text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Return Shipping</h4>
                      <p className="text-gray-600 text-sm">Free return pickup arranged by us</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Exchange Policy</h4>
                  <p className="text-sm text-blue-700">
                    Exchanges are subject to availability. If the desired size/color is not available, 
                    we'll process a full refund instead.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact for Returns */}
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Help with Returns?</h3>
              <p className="text-gray-600 mb-6">Our customer support team is here to assist you with returns and exchanges.</p>
              
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center justify-center space-x-2 text-gray-700">
                  <Package size={18} />
                  <span>Email: Care@bluethroat.online</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-gray-700">
                  <Clock size={18} />
                  <span>Phone: +91 8894001225</span>
                </div>
              </div>
              
              <button
                onClick={() => onNavigate('contact')}
                className="mt-6 bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Contact Support
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShippingReturns;