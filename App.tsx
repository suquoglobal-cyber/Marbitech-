
import React, { useEffect, useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PropertyCard from './components/PropertyCard';
import PropertyModal from './components/PropertyModal';
import Services from './components/Services';
import InvestmentCalculator from './components/InvestmentCalculator';
import AIConsultant from './components/AIConsultant';
import { PROPERTIES } from './constants';
import { Property } from './types';
import { logAnalyticsEvent } from './services/firebase';

const App: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [searchFilter, setSearchFilter] = useState({ location: '', type: 'All Types' });

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter(p => {
      const matchType = searchFilter.type === 'All Types' || p.type === searchFilter.type;
      const matchLoc = !searchFilter.location || p.location.toLowerCase().includes(searchFilter.location.toLowerCase());
      return matchType && matchLoc;
    });
  }, [searchFilter]);

  const handleSearch = (location: string, type: string) => {
    setSearchFilter({ location, type });
    logAnalyticsEvent('search_properties', { location, type });
  };

  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property);
    logAnalyticsEvent('view_property', { 
      property_id: property.id, 
      property_title: property.title,
      property_type: property.type 
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const logoUrl = "https://lh3.googleusercontent.com/d/1jn4oChPkYGr1gFcbP781-uHY31kbQ17k";

  return (
    <div className="min-h-screen relative bg-gray-50 flex flex-col overflow-x-hidden">
      <Navbar />
      
      <main className="flex-grow">
        <Hero onSearch={handleSearch} />

        {/* Stats Section */}
        <section className="bg-primary py-16 lg:py-40 border-y border-gold/15 relative overflow-hidden">
          <div className="container mx-auto px-6 lg:px-20 relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-12 sm:gap-12">
              {[
                { label: 'Market Sectors', value: '6+' },
                { label: 'Transparency', value: '100%' },
                { label: 'Capital Assets', value: '₦5B+' },
                { label: 'Elite Clients', value: '500+' },
                { label: 'Founded', value: '2008' }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center lg:items-start text-center lg:text-left group">
                  <div className="text-3xl sm:text-5xl lg:text-7xl font-display font-bold text-gold mb-2 transition-all">
                    {stat.value}
                  </div>
                  <div className="h-[1px] w-8 bg-gold/40 mb-4 group-hover:w-full transition-all duration-1000"></div>
                  <p className="text-white/50 text-[8px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.5em] font-black leading-relaxed">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
             <img src={logoUrl} alt="" className="w-1/2 max-w-[900px] object-contain grayscale invert animate-float" />
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="properties" className="py-20 lg:py-48 bg-gray-50/70">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 lg:mb-24 gap-8">
              <div className="max-w-3xl">
                <span className="text-gold font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">Elite Signature Portfolio</span>
                <h2 className="text-3xl sm:text-5xl lg:text-8xl font-display font-bold text-primary leading-[1.1] tracking-tighter">
                  {searchFilter.location || searchFilter.type !== 'All Types' ? 'Filtered Search' : 'Premier Assets'}
                </h2>
              </div>
              {searchFilter.location && (
                <button 
                  onClick={() => setSearchFilter({ location: '', type: 'All Types' })}
                  className="text-primary hover:text-white transition-all text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-3 bg-white px-8 py-4 rounded-2xl border border-gray-200 shadow-lg hover:bg-gold hover:border-gold"
                >
                  <i className="fas fa-redo-alt"></i>
                  Reset View
                </button>
              )}
            </div>

            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-16 xl:gap-20">
                {filteredProperties.map(property => (
                  <PropertyCard key={property.id} property={property} onDetail={handlePropertySelect} />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center bg-white rounded-3xl lg:rounded-[4rem] border border-dashed border-gray-300">
                <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                  <i className="fas fa-layer-group text-2xl"></i>
                </div>
                <h3 className="text-primary font-display text-2xl mb-2">No matching assets</h3>
                <p className="text-gray-500 text-sm mb-8 font-light">Explore other sectors or consult an advisor.</p>
                <button 
                  onClick={() => setSearchFilter({ location: '', type: 'All Types' })}
                  className="gold-button px-10 py-4 rounded-xl font-black uppercase tracking-widest text-[10px]"
                >
                  Global Portfolio
                </button>
              </div>
            )}
          </div>
        </section>

        <Services />
        <InvestmentCalculator />

        {/* About Section */}
        <section id="about" className="py-20 lg:py-56 bg-white relative overflow-hidden">
          <div className="container mx-auto px-6 lg:px-20">
            <div className="max-w-[1400px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center mb-24 lg:mb-48">
                <div className="order-2 lg:order-1 relative">
                  <span className="text-gold font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block italic">Our Enduring Legacy</span>
                  <h2 className="text-4xl sm:text-6xl lg:text-8xl font-display font-bold text-primary mb-8 leading-[1.1] tracking-tighter">Integrity Since <span className="text-gold">2008</span></h2>
                  <div className="space-y-8 text-gray-600 text-base lg:text-xl leading-relaxed font-light">
                    <p>
                      Founded in 2008, <strong>MARBITECH PROPERTIES & INVESTMENT LTD</strong> has evolved into Nigeria's most trusted name for high-end integrated real estate.
                    </p>
                    <p>
                      Our philosophy merges architectural vision with structural permanence. We architect generational wealth, ensuring every square meter is optimized for prosperity.
                    </p>
                    <div className="pt-4">
                      <button className="text-primary font-black uppercase tracking-[0.3em] text-[9px] flex items-center gap-4 group">
                        Full Story 
                        <span className="w-8 h-[1px] bg-gold group-hover:w-16 transition-all duration-700"></span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-10">
                  <div className="p-8 lg:p-12 bg-gray-50 rounded-3xl lg:rounded-[3.5rem] border border-gray-100 group">
                    <div className="h-12 w-12 bg-gold/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gold transition-all">
                      <i className="fas fa-fingerprint text-gold group-hover:text-primary text-xl"></i>
                    </div>
                    <h3 className="text-2xl font-display font-bold text-primary mb-4">Vision</h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-light italic">
                      "To define the future of Nigerian real estate through unparalleled value."
                    </p>
                  </div>
                  <div className="p-8 lg:p-12 bg-primary rounded-3xl lg:rounded-[3.5rem] text-white shadow-xl relative overflow-hidden group">
                    <div className="relative z-10">
                      <div className="h-12 w-12 bg-gold rounded-2xl flex items-center justify-center mb-6">
                        <i className="fas fa-compass text-primary text-xl"></i>
                      </div>
                      <h3 className="text-2xl font-display font-bold text-gold mb-4">Mission</h3>
                      <p className="text-white/70 text-sm leading-relaxed font-light">
                        "Creating world-class real estate opportunities anchored in integrity and client success."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="footer" className="bg-primary text-white pt-24 pb-12 border-t border-gold/15 relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-20 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 mb-20 lg:mb-32">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-4 mb-8">
                <img src={logoUrl} alt="Marbitech" className="h-12 w-12 lg:h-16 lg:w-16 object-contain" />
                <div>
                  <h2 className="text-gold font-display text-xl lg:text-2xl font-bold tracking-tighter uppercase">MARBITECH</h2>
                  <p className="text-[8px] uppercase tracking-[0.3em] font-black opacity-40">Properties & Investment</p>
                </div>
              </div>
              <p className="text-white/50 text-sm lg:text-base leading-relaxed max-w-lg font-light mb-8">
                Redefining the standard of luxury living in Africa since 2008. We are the architects of permanence.
              </p>
              <div className="flex gap-4">
                {['instagram', 'linkedin-in', 'github'].map((social) => (
                  <a key={social} href="#" className="h-10 w-10 bg-white/5 rounded-xl flex items-center justify-center text-gold border border-white/10 hover:bg-gold hover:text-primary transition-all">
                    <i className={`fab fa-${social}`}></i>
                  </a>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-3">
              <h5 className="text-gold font-black uppercase tracking-widest text-[9px] mb-8">Asset Navigator</h5>
              <ul className="space-y-4 text-xs font-light text-white/60">
                <li><a href="#properties" className="hover:text-gold transition-all">Signature Portfolio</a></li>
                <li><a href="#services" className="hover:text-gold transition-all">Services</a></li>
                <li><a href="#calculator" className="hover:text-gold transition-all">Wealth Projections</a></li>
              </ul>
            </div>
            
            <div className="lg:col-span-4">
              <h5 className="text-gold font-black uppercase tracking-widest text-[9px] mb-8">Concierge Direct</h5>
              <div className="space-y-6">
                <a href="mailto:marbitechproperties@gmail.com" className="group block">
                   <p className="text-[8px] uppercase tracking-widest text-white/30 mb-2 font-black">Official Inquiries</p>
                   <p className="text-sm font-light text-white/70 group-hover:text-white transition-colors">marbitechproperties@gmail.com</p>
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[9px] text-white/20 uppercase tracking-widest font-bold">
              © 2008-2024 Marbitech Properties and Investment Ltd. 
            </p>
            <p className="text-[9px] text-white/10 uppercase tracking-widest font-black border border-white/10 px-4 py-1 rounded-full">RC: 758318</p>
          </div>
        </div>
      </footer>

      <AIConsultant />

      {showScrollTop && (
        <button 
          onClick={scrollToTop} 
          className="fixed bottom-6 right-6 h-12 w-12 bg-primary border border-gold/40 text-gold rounded-xl shadow-2xl z-[90] flex items-center justify-center hover:bg-gold hover:text-primary transition-all"
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      )}

      {selectedProperty && <PropertyModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />}
    </div>
  );
};

export default App;
