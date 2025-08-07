import React, { useState } from 'react';
import { ArrowLeft, Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+91 8894001225',
      description: 'Mon-Sat, 9 AM - 7 PM'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'Care@bluethroat.online',
      description: 'We reply within 24 hours'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: '123 Fashion Street, Mumbai, Maharashtra 400001',
      description: 'Visit our office'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Mon - Sat: 9:00 AM - 7:00 PM',
      description: 'Sunday: Closed'
    }
  ];

  const faqs = [
    {
      question: 'How can I track my order?',
      answer: 'You can track your order using the tracking link sent to your email or visit our Track Order page.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for all items in original condition with tags attached.'
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Currently, we only ship within India. International shipping will be available soon.'
    },
    {
      question: 'How can I change or cancel my order?',
      answer: 'Contact us immediately at Care@bluethroat.online or call +91 8894001225 to modify your order.'
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
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-center mb-4">GET IN TOUCH</h1>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto text-center mb-8">We'd love to hear from you! Fill out the form below or reach us directly.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-16">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <div key={index} className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon size={32} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-gray-900 font-medium mb-1">{info.details}</p>
                <p className="text-sm text-gray-600">{info.description}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <MessageCircle size={24} className="text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="order">Order Inquiry</option>
                    <option value="return">Return/Exchange</option>
                    <option value="product">Product Question</option>
                    <option value="shipping">Shipping Issue</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
                    placeholder="Tell us how we can help you..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Send size={18} />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
              
              <button
                onClick={() => onNavigate('track-order')}
                className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-900 transition-colors mb-4"
              >
                Track Your Order
              </button>
              
              <button
                onClick={() => onNavigate('shipping-returns')}
                className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-900 transition-colors mb-4"
              >
                Return/Exchange Policy
              </button>
              
              <button
                onClick={() => onNavigate('size-guide')}
                className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-900 transition-colors"
              >
                Size Guide
              </button>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Visit Our Office</h2>
          <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <MapPin size={48} className="text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Interactive map would be integrated here</p>
              <p className="text-sm text-gray-500 mt-2">123 Fashion Street, Mumbai, Maharashtra 400001</p>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Follow Us</h2>
          <p className="text-gray-600 mb-6">Stay connected for the latest updates and offers</p>
          <div className="flex justify-center space-x-6">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-blue-700 transition-colors">
              f
            </div>
            <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-pink-700 transition-colors">
              📷
            </div>
            <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-blue-500 transition-colors">
              🐦
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;