import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, X } from 'lucide-react';
import videoFile from '../../assets/intro video.mp4';

interface HeroProps {
  onNavigate: (page: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [videoLoading, setVideoLoading] = useState(true);

  const slides = [
    {
      id: 1,
      title: "STREET STYLE",
      subtitle: "REDEFINED",
      description: "Discover the latest in urban fashion with our premium streetwear collection",
      image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1920",
      cta: "SHOP NOW",
      badge: "NEW COLLECTION"
    },
    {
      id: 2,
      title: "SUMMER",
      subtitle: "ESSENTIALS",
      description: "Beat the heat with our breathable and stylish summer collection",
      image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1920",
      cta: "EXPLORE",
      badge: "LIMITED TIME"
    },
    {
      id: 3,
      title: "CO-ORD",
      subtitle: "SETS",
      description: "Effortless style with our matching co-ordinate sets",
      image: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1920",
      cta: "SHOP SETS",
      badge: "TRENDING"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-[6px] animate-fadeInModal">
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="w-full h-full animate-gradientPulse bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-pink-500/20 via-blue-500/10 to-transparent" />
          </div>
          <div className="relative w-full max-w-2xl mx-auto p-2 sm:p-4 flex flex-col items-center">
            {/* Title */}
            <div className="mb-2 sm:mb-4 text-center">
              <span className="inline-block px-4 py-1 rounded-full bg-white/20 text-white font-bold text-lg tracking-widest shadow-md backdrop-blur-md border border-white/30">Bluethroats Film</span>
            </div>
            {/* Close Button */}
            <button
              className="absolute -top-6 right-2 sm:top-2 sm:right-2 text-white bg-white/20 hover:bg-red-600/80 rounded-full p-2 shadow-xl border border-white/30 backdrop-blur-md transition-transform duration-200 hover:scale-110 hover:rotate-90 z-10"
              onClick={() => setShowVideo(false)}
              aria-label="Close video"
            >
              <X size={28} />
            </button>
            {/* Video Container with animated border */}
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-gradient-to-tr from-pink-400 via-blue-400 to-purple-400 animate-borderGlow bg-black/80 relative">
              {videoLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
                  <svg className="animate-spin h-10 w-10 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                </div>
              )}
              <video
                src={videoFile}
                controls
                autoPlay
                className="w-full h-64 md:h-96 bg-black"
                onLoadedData={() => setVideoLoading(false)}
                onEnded={() => setShowVideo(false)}
                style={{ display: videoLoading ? 'none' : 'block' }}
              />
              {/* Watermark */}
              <div className="absolute bottom-2 right-4 text-xs sm:text-sm text-white/60 font-bold tracking-widest pointer-events-none select-none" style={{textShadow:'0 1px 8px #000, 0 0 2px #fff'}}>BLUETHROATS</div>
            </div>
          </div>
          {/* Custom CSS for animation (add to global CSS or tailwind config):
          .animate-fadeInModal { animation: fadeInModal 0.4s cubic-bezier(0.4,0,0.2,1) both; }
          @keyframes fadeInModal { from { opacity: 0; transform: scale(0.92);} to { opacity: 1; transform: scale(1);} }
          .animate-gradientPulse { animation: gradientPulse 3s ease-in-out infinite alternate; }
          @keyframes gradientPulse { 0% { opacity: 0.7; } 100% { opacity: 1; } }
          .animate-borderGlow { animation: borderGlow 2s linear infinite alternate; }
          @keyframes borderGlow { 0% { box-shadow: 0 0 24px 0 #a5b4fc66, 0 0 0 0 #f472b666; } 100% { box-shadow: 0 0 48px 8px #f472b688, 0 0 0 0 #a5b4fc44; } }
          */}
        </div>
      )}
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 lg:px-6 w-full">
              <div className="max-w-2xl">
                {/* Badge */}
                <div className="inline-flex items-center bg-red-600 text-white px-4 py-2 text-sm font-bold uppercase tracking-wider mb-6 animate-pulse">
                  {slide.badge}
                </div>

                {/* Title */}
                <h1 className="text-6xl md:text-8xl font-black text-white leading-none mb-4 tracking-tight">
                  {slide.title}
                  <br />
                  <span className="text-red-500">{slide.subtitle}</span>
                </h1>

                {/* Description */}
                <p className="text-xl text-gray-200 mb-8 max-w-lg leading-relaxed">
                  {slide.description}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => onNavigate('products')}
                    className="bg-red-600 text-white px-8 py-4 font-bold text-lg uppercase tracking-wider hover:bg-red-700 transition-all duration-300 flex items-center justify-center group"
                  >
                    {slide.cta}
                    <ArrowRight size={24} className="ml-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <button className="border-2 border-white text-white px-8 py-4 font-bold text-lg uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center"
                    onClick={() => setShowVideo(true)}
                  >
                    <Play size={20} className="mr-3" />
                    WATCH FILM
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-red-500 w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 text-white">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm font-medium uppercase tracking-wider rotate-90 origin-center">
            Scroll
          </span>
          <div className="w-px h-12 bg-white/50 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;