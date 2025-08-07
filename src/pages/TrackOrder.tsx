import React, { useState } from 'react';
import { ArrowLeft, Search, Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';

interface TrackOrderProps {
  onNavigate: (page: string) => void;
}

const TrackOrder: React.FC<TrackOrderProps> = ({ onNavigate }) => {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setTrackingData({
        orderNumber: orderNumber || 'BT123456789',
        status: 'In Transit',
        estimatedDelivery: '2024-01-15',
        currentLocation: 'Mumbai Distribution Center',
        items: [
          { name: 'Oversized Graphic Tee - Black', quantity: 1, size: 'M' },
          { name: 'Cargo Joggers - Olive', quantity: 1, size: '32' }
        ],
        timeline: [
          {
            status: 'Order Placed',
            date: '2024-01-10',
            time: '10:30 AM',
            completed: true,
            description: 'Your order has been confirmed and is being processed'
          },
          {
            status: 'Order Processed',
            date: '2024-01-11',
            time: '2:15 PM',
            completed: true,
            description: 'Your order has been packed and ready for shipment'
          },
          {
            status: 'Shipped',
            date: '2024-01-12',
            time: '9:00 AM',
            completed: true,
            description: 'Your order has been shipped and is on its way'
          },
          {
            status: 'In Transit',
            date: '2024-01-13',
            time: '11:45 AM',
            completed: true,
            description: 'Your package is currently in transit to your location'
          },
          {
            status: 'Out for Delivery',
            date: '2024-01-15',
            time: 'Expected',
            completed: false,
            description: 'Your package will be out for delivery'
          },
          {
            status: 'Delivered',
            date: '2024-01-15',
            time: 'Expected',
            completed: false,
            description: 'Your package will be delivered'
          }
        ]
      });
      setIsLoading(false);
    }, 1500);
  };

  const getStatusIcon = (status: string, completed: boolean) => {
    if (completed) {
      return <CheckCircle size={24} className="text-green-600" />;
    }
    
    switch (status) {
      case 'Order Placed':
        return <Package size={24} className="text-blue-600" />;
      case 'Order Processed':
        return <Package size={24} className="text-blue-600" />;
      case 'Shipped':
        return <Truck size={24} className="text-orange-600" />;
      case 'In Transit':
        return <Truck size={24} className="text-orange-600" />;
      case 'Out for Delivery':
        return <MapPin size={24} className="text-purple-600" />;
      case 'Delivered':
        return <CheckCircle size={24} className="text-green-600" />;
      default:
        return <Clock size={24} className="text-gray-400" />;
    }
  };

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
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-center mb-4">TRACK ORDER</h1>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto text-center mb-8">Track your order status and delivery updates here.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-16">
        {/* Tracking Form */}
        {!trackingData && (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-6">
                <Search size={48} className="text-indigo-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900">Track Your Order</h2>
                <p className="text-gray-600 mt-2">Enter your order number and email to get real-time updates</p>
              </div>

              <form onSubmit={handleTrackOrder} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order Number *
                  </label>
                  <input
                    type="text"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="e.g., BT123456789"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Tracking...</span>
                    </>
                  ) : (
                    <>
                      <Search size={18} />
                      <span>Track Order</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-600">
                <p>Don't have your order number? Check your email confirmation or contact support.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tracking Results */}
        {trackingData && (
          <div className="max-w-4xl mx-auto">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Order #{trackingData.orderNumber}</h2>
                  <p className="text-gray-600">Current Status: <span className="font-semibold text-indigo-600">{trackingData.status}</span></p>
                </div>
                <button
                  onClick={() => setTrackingData(null)}
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Track Another Order
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle size={24} className="text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Estimated Delivery</h3>
                  <p className="text-gray-600">{trackingData.estimatedDelivery}</p>
                </div>

                <div className="text-center">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MapPin size={24} className="text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Current Location</h3>
                  <p className="text-gray-600">{trackingData.currentLocation}</p>
                </div>

                <div className="text-center">
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Package size={24} className="text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Items</h3>
                  <p className="text-gray-600">{trackingData.items.length} item(s)</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Items</h3>
              <div className="space-y-4">
                {trackingData.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                    <div>
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">Size: {item.size} | Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Tracking Timeline</h3>
              
              <div className="space-y-6">
                {trackingData.timeline.map((event, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {getStatusIcon(event.status, event.completed)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-semibold ${event.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                          {event.status}
                        </h4>
                        <span className={`text-sm ${event.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                          {event.date} {event.time !== 'Expected' && `at ${event.time}`}
                        </span>
                      </div>
                      <p className={`text-sm mt-1 ${event.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                        {event.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Help Section */}
            <div className="mt-8 text-center">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h3>
              <p className="text-gray-600 mb-6">If you have any questions about your order, we're here to help.</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => onNavigate('contact')}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Contact Support
                </button>
                <button
                  onClick={() => onNavigate('shipping-returns')}
                  className="border-2 border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-600 hover:text-white transition-colors"
                >
                  Shipping Info
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;