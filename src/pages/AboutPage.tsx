import React from 'react';
import { ArrowLeft, Users, Award, Truck, Shield, Heart, Target } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const values = [
    {
      icon: Heart,
      title: 'Passion for Fashion',
      description: 'We live and breathe fashion, constantly seeking the latest trends and timeless styles.'
    },
    {
      icon: Award,
      title: 'Quality First',
      description: 'Every product is carefully selected and tested to meet our high standards of quality.'
    },
    {
      icon: Users,
      title: 'Customer Centric',
      description: 'Our customers are at the heart of everything we do. Your satisfaction is our priority.'
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'We continuously innovate to bring you the best shopping experience and latest fashion.'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '1000+', label: 'Products' },
    { number: '100+', label: 'Cities Served' },
    { number: '4.8/5', label: 'Customer Rating' }
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
      <div className="bg-black text-white py-20">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
            ABOUT
            <br />
            <span className="text-red-500">BLUETHROATS</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Born from a passion for contemporary menswear, Bluethroats is more than just a fashion brand. 
            We're a lifestyle, a statement, and a community of style-conscious individuals.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-16">
        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-4xl font-black text-gray-900 mb-6 uppercase tracking-wider">
              Our Story
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Founded in 2020, Bluethroats emerged from a simple vision: to make premium menswear 
                accessible to the modern Indian man. What started as a small team of fashion enthusiasts 
                has grown into one of India's most trusted online fashion destinations.
              </p>
              <p>
                We believe that great style shouldn't come with a hefty price tag. That's why we work 
                directly with manufacturers to bring you high-quality, trendy clothing at prices that 
                won't break the bank.
              </p>
              <p>
                Today, we serve customers across 100+ cities in India, with a growing community of 
                over 50,000 satisfied customers who trust us for their fashion needs.
              </p>
            </div>
          </div>
          <div className="bg-gray-100 aspect-square rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl font-black text-gray-300 mb-4">BLUETHROATS</div>
              <p className="text-gray-600">Est. 2020</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-black text-red-600 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4 uppercase tracking-wider">
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do, from product selection to customer service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon size={32} className="text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gray-50 rounded-lg p-8 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4 uppercase tracking-wider">
              Why Choose Bluethroats?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fast Delivery</h3>
              <p className="text-gray-600">Free shipping on orders above ₹1999. Express delivery available.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Guarantee</h3>
              <p className="text-gray-600">30-day return policy. If you're not satisfied, we'll make it right.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Support</h3>
              <p className="text-gray-600">Our customer support team is always here to help you.</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black text-gray-900 mb-6 uppercase tracking-wider">
            Meet Our Team
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Behind every great brand is a passionate team. Meet the people who make Bluethroats possible.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Team Member {i}</h3>
                <p className="text-gray-600 mb-2">Position Title</p>
                <p className="text-sm text-gray-500">
                  Passionate about fashion and dedicated to bringing you the best shopping experience.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-black text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-black mb-4 uppercase tracking-wider">
            Join the Bluethroats Family
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Be part of our growing community of fashion-forward individuals. 
            Follow us on social media and never miss a drop.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => onNavigate('products')}
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
            >
              Shop Now
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-black transition-colors"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;