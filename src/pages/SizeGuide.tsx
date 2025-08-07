import React, { useState } from 'react';
import { ArrowLeft, Ruler, User, Info } from 'lucide-react';

interface SizeGuideProps {
  onNavigate: (page: string) => void;
}

const SizeGuide: React.FC<SizeGuideProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState('shirts');

  const categories = [
    { id: 'shirts', label: 'Shirts & T-Shirts' },
    { id: 'bottoms', label: 'Bottoms' },
    { id: 'jackets', label: 'Jackets' }
  ];

  const sizeCharts = {
    shirts: {
      headers: ['Size', 'Chest (inches)', 'Length (inches)', 'Shoulder (inches)'],
      rows: [
        ['XS', '36', '26', '16.5'],
        ['S', '38', '27', '17'],
        ['M', '40', '28', '17.5'],
        ['L', '42', '29', '18'],
        ['XL', '44', '30', '18.5'],
        ['XXL', '46', '31', '19']
      ]
    },
    bottoms: {
      headers: ['Size', 'Waist (inches)', 'Hip (inches)', 'Length (inches)'],
      rows: [
        ['28', '28', '36', '40'],
        ['30', '30', '38', '40'],
        ['32', '32', '40', '40'],
        ['34', '34', '42', '40'],
        ['36', '36', '44', '40'],
        ['38', '38', '46', '40']
      ]
    },
    jackets: {
      headers: ['Size', 'Chest (inches)', 'Length (inches)', 'Shoulder (inches)', 'Sleeve (inches)'],
      rows: [
        ['S', '38', '26', '17', '24'],
        ['M', '40', '27', '17.5', '24.5'],
        ['L', '42', '28', '18', '25'],
        ['XL', '44', '29', '18.5', '25.5'],
        ['XXL', '46', '30', '19', '26']
      ]
    }
  };

  const measurementTips = [
    {
      title: 'Chest Measurement',
      description: 'Measure around the fullest part of your chest, keeping the tape horizontal.'
    },
    {
      title: 'Waist Measurement',
      description: 'Measure around your natural waistline, keeping the tape comfortably loose.'
    },
    {
      title: 'Hip Measurement',
      description: 'Measure around the fullest part of your hips, about 8 inches below your waist.'
    },
    {
      title: 'Shoulder Measurement',
      description: 'Measure from the edge of one shoulder to the edge of the other shoulder.'
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
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <Ruler size={32} className="mr-3" />
            <h1 className="text-5xl md:text-6xl font-black tracking-tight">
              SIZE GUIDE
            </h1>
          </div>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Find your perfect fit with our comprehensive size guide. Measure twice, order once!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-16">
        {/* How to Measure */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4 uppercase tracking-wider">
              How to Measure
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Follow these simple steps to get accurate measurements for the perfect fit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {measurementTips.map((tip, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold">{index + 1}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-3">{tip.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{tip.description}</p>
              </div>
            ))}
          </div>

          {/* Measurement Illustration */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <User size={120} className="text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Measurement Guide</h3>
                <p className="text-gray-600">Use a flexible measuring tape and measure over light clothing for best results.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Size Charts */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-gray-900 mb-4 uppercase tracking-wider">
              Size Charts
            </h2>
            <p className="text-gray-600">All measurements are in inches</p>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    activeCategory === category.id
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Size Chart Table */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {sizeCharts[activeCategory].headers.map((header, index) => (
                      <th key={index} className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {sizeCharts[activeCategory].rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-gray-50">
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className={`px-6 py-4 text-sm ${
                          cellIndex === 0 ? 'font-bold text-gray-900' : 'text-gray-700'
                        }`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Fit Guide */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-gray-900 mb-4 uppercase tracking-wider">
              Fit Guide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-lg">S</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Slim Fit</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Close to body fit with minimal ease. Perfect for a tailored, modern look.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-lg">R</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Regular Fit</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Comfortable fit with room to move. Our most popular fit for everyday wear.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-600 font-bold text-lg">O</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Oversized Fit</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Relaxed, loose fit for a casual, streetwear-inspired look.
              </p>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Info size={24} className="text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Important Notes</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• All measurements are approximate and may vary by ±0.5 inches</li>
                <li>• Size charts are specific to Bluethroats products and may differ from other brands</li>
                <li>• If you're between sizes, we recommend sizing up for a more comfortable fit</li>
                <li>• For oversized fits, consider your regular size for the intended loose fit</li>
                <li>• Contact our customer support if you need help choosing the right size</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Still Need Help?</h3>
          <p className="text-gray-600 mb-6">Our customer support team is here to help you find the perfect fit.</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Contact Support
            </button>
            <button
              onClick={() => onNavigate('products')}
              className="border-2 border-black text-black px-8 py-3 rounded-lg font-semibold hover:bg-black hover:text-white transition-colors"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;