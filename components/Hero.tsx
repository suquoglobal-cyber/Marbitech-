
import React, { useState, useRef, useEffect } from 'react';
import { HERO_SLIDES, HERO_VIDEOS } from '../constants';

interface HeroProps {
  onSearch: (location: string, type: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [currentTextSlide, setCurrentTextSlide] = useState(0);
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const [nextVideoIdx, setNextVideoIdx] = useState(1);
  const [isCrossFading, setIsCrossFading] = useState(false);
  
  const [isSearching, setIsSearching] = useState(false);
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('All Types');
  
  const activeVideoRef = useRef<HTMLVideoElement | null>(null);
  const nextVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const textTimer = setInterval(() => {
      setCurrentTextSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8000);
    return () => clearInterval(textTimer);
  }, []);

  const handleVideoEnd = () => {
    if (isCrossFading) return;
    setIsCrossFading(true);
    if (nextVideoRef.current) {
      nextVideoRef.current.play().catch(() => {});
    }
    setTimeout(() => {
      setActiveVideoIdx(nextVideoIdx);
      setNextVideoIdx((prev) => (prev + 1) % HERO_VIDEOS.length);
      setIsCrossFading(false);
      if (activeVideoRef.current) {
        activeVideoRef.current.currentTime = 0;
      }
    }, 1500); 
  };

  const handleSearch = () => {
    setIsSearching(true);
    onSearch(location, propertyType);
    setTimeout(() => {
      setIsSearching(false);
      const propertiesSection = document.getElementById('properties');
      if (propertiesSection) {
        propertiesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 800);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary px-4 sm:px-6">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-0 opacity-40">
           <video 
            ref={nextVideoRef}
            key={`next-${HERO_VIDEOS[nextVideoIdx]}`}
            muted 
            playsInline 
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={HERO_VIDEOS[nextVideoIdx]} type="video/mp4" />
          </video>
          <video 
            ref={activeVideoRef}
            key={`active-${HERO_VIDEOS[activeVideoIdx]}`}
            autoPlay 
            muted 
            playsInline 
            onEnded={handleVideoEnd}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-in-out ${isCrossFading ? 'opacity-0' : 'opacity-100'}`}
          >
            <source src={HERO_VIDEOS[activeVideoIdx]} type="video/mp4" />
          </video>
        </div>

        <div className="absolute inset-0 z-10">
          {HERO_SLIDES.map((slide, idx) => (
            <div 
              key={`img-${slide.id}`}
              className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${idx === currentTextSlide ? 'opacity-70' : 'opacity-0'}`}
            >
              <img 
                src={slide.image} 
                onError={(e) => {
                  const target = e.currentTarget;
                  const fallback = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80";
                  if (target.src !== fallback) {
                    target.src = fallback;
                  }
                }}
                alt="" 
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-linear ${idx === currentTextSlide ? 'scale-110' : 'scale-100'}`}
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 z-20 bg-primary/75 backdrop-blur-[1px]"></div>
      </div>

      <div className="container mx-auto relative z-30 pt-32 pb-12 lg:pt-20 lg:pb-0">
        <div className="max-w-6xl mx-auto flex flex-col">
          <div className="relative min-h-[320px] sm:min-h-[400px] lg:min-h-[480px] mb-8 lg:mb-0">
            {HERO_SLIDES.map((slide, idx) => (
              <div 
                key={slide.id}
                className={`absolute inset-0 transition-all duration-1000 transform ${
                  idx === currentTextSlide 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
                }`}
              >
                <div className="inline-flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <span className="h-px w-6 sm:w-8 bg-gold"></span>
                  <span className="text-gold font-bold uppercase tracking-[0.3em] sm:tracking-[0.5em] text-[8px] sm:text-[10px]">Asset Vision 0{slide.id}</span>
                </div>
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold mb-4 sm:mb-8 leading-[1.1] tracking-tight text-white max-w-5xl">
                  {slide.headline.split(' ').map((word, i) => {
                    const highlightWords = ['Elite', 'Assets', 'Wealth', 'Excellence', 'Banking', 'Legacies'];
                    return highlightWords.includes(word) ? 
                      <span key={i} className="gold-gradient inline-block">{word} </span> : word + ' ';
                  })}
                </h1>
                <p className="text-sm sm:text-base md:text-xl text-white/80 leading-relaxed font-light max-w-2xl">
                  {slide.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="w-full animate-fade-up [animation-delay:800ms] lg:-mt-10 relative z-40">
            <div className="bg-white/10 backdrop-blur-3xl p-3 sm:p-4 rounded-2xl lg:rounded-[3.5rem] border border-white/20 flex flex-col lg:flex-row gap-3 lg:gap-0 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)]">
              <div className="flex-1 px-4 sm:px-6 py-3 lg:py-4 group">
                <label htmlFor="location" className="text-[9px] text-gold font-bold uppercase tracking-[0.2em] mb-2 block opacity-70">Strategic Location</label>
                <div className="flex items-center gap-3">
                  <i className="fas fa-map-pin text-gold/80 text-sm"></i>
                  <input 
                    id="location"
                    type="text" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Area (e.g. Ikoyi)" 
                    className="bg-transparent border-none text-white focus:ring-0 placeholder-white/30 w-full text-sm sm:text-base font-medium outline-none"
                  />
                </div>
              </div>
              
              <div className="hidden lg:block w-px bg-white/15 my-4"></div>
              
              <div className="flex-1 px-4 sm:px-6 py-3 lg:py-4 group">
                <label htmlFor="type" className="text-[9px] text-gold font-bold uppercase tracking-[0.2em] mb-2 block opacity-70">Asset Sector</label>
                <div className="flex items-center gap-3">
                  <i className="fas fa-gem text-gold/80 text-sm"></i>
                  <select 
                    id="type"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="bg-transparent border-none text-white focus:ring-0 w-full appearance-none text-sm sm:text-base font-medium cursor-pointer outline-none"
                  >
                    <option className="bg-primary text-white" value="All Types">Institutional Assets</option>
                    <option className="bg-primary text-white" value="Luxury Villa">Private Estates</option>
                    <option className="bg-primary text-white" value="Commercial and Residential">Commercial & Residential</option>
                    <option className="bg-primary text-white" value="Modern Apartment">Elite Residences</option>
                    <option className="bg-primary text-white" value="Commercial">Corporate Portfolios</option>
                    <option className="bg-primary text-white" value="Interior Design">Interior Architecture</option>
                    <option className="bg-primary text-white" value="Interior Decoration">Bespoke Design</option>
                  </select>
                </div>
              </div>
              
              <div className="lg:p-2">
                <button 
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="gold-button w-full lg:w-auto h-full px-8 py-4 lg:py-0 rounded-xl lg:rounded-[2.8rem] font-bold flex items-center justify-center gap-3 transition-all"
                >
                  {isSearching ? <i className="fas fa-circle-notch fa-spin"></i> : <i className="fas fa-compass"></i>}
                  <span className="uppercase tracking-[0.2em] text-[10px]">{isSearching ? 'Curating...' : 'Search'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-6 sm:bottom-12 sm:left-10 flex flex-col gap-3 z-40">
        {HERO_SLIDES.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrentTextSlide(idx)}
            className={`transition-all duration-700 rounded-full border border-gold/20 ${idx === currentTextSlide ? 'h-8 sm:h-12 w-1 bg-gold' : 'h-2 w-1 bg-white/10 hover:bg-white/30'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
