import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import PropertyCard from '../components/PropertyCard';
import Services from '../components/Services';
import InvestmentCalculator from '../components/InvestmentCalculator';
import { PROPERTIES } from '../constants';
import { Property } from '../types';
import { logAnalyticsEvent } from '../services/firebase';

const Home: React.FC = () => {
  const navigate = useNavigate();
  
  const logoUrl = "https://lh3.googleusercontent.com/d/1jn4oChPkYGr1gFcbP781-uHY31kbQ17k";

  // Showcase only the top 3 curated premier properties on the homepage
  const featuredProperties = PROPERTIES.slice(0, 3);

  const handleSearch = (location: string, type: string) => {
    navigate(`/catalog?location=${location}&type=${type}`);
  };

  const handlePropertySelect = (property: Property) => {
    logAnalyticsEvent('view_property_home', { 
      property_id: property.id, 
      property_title: property.title,
      property_type: property.type 
    });
    navigate(`/catalog/${property.id}`);
  };

  return (
    <>
      {/* Hero Section with Search Bar */}
      <Hero onSearch={handleSearch} />
      
      {/* Curated Portfolio Showcase */}
      <section id="properties" className="py-28 lg:py-44 bg-[#FAF9F6]">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 lg:mb-28 gap-8">
            <div className="max-w-3xl text-left">
              <span className="text-gold font-bold uppercase tracking-[0.4em] text-[9px] mb-4 block">Elite Signature Portfolio</span>
              <h2 className="text-4xl sm:text-6xl lg:text-8xl font-display font-medium text-primary leading-[1.05] tracking-tight">
                Premier <span className="font-editorial italic text-3xl sm:text-5xl lg:text-7xl lowercase">and</span> Curated Assets
              </h2>
            </div>
            <button 
              onClick={() => navigate('/catalog')}
              className="text-primary hover:text-white transition-all text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-4 bg-white px-10 py-5 rounded-full border border-zinc-200/80 shadow-[0_15px_30px_rgba(0,0,0,0.03)] hover:bg-gold hover:border-gold"
            >
              Explore Full Portfolio
              <span className="h-2 w-2 bg-gold hover:bg-primary rounded-full animate-pulse"></span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 xl:gap-16">
            {featuredProperties.map(property => (
              <PropertyCard key={property.id} property={property} onDetail={handlePropertySelect} />
            ))}
          </div>

          <div className="mt-20 text-center">
            <button 
              onClick={() => navigate('/catalog')}
              className="gold-button inline-flex items-center gap-3 px-14 py-5 rounded-full font-bold uppercase tracking-widest text-[10px] shadow-xl"
            >
              Browse Complete Catalog
              <i className="fas fa-chevron-right text-[8px] ml-1"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <div className="relative bg-white">
        <Services />
        <div className="bg-white pb-24 text-center">
          <button 
            onClick={() => navigate('/services')}
            className="gold-button inline-flex items-center gap-3 px-14 py-5 rounded-full font-bold uppercase tracking-widest text-[10px] shadow-lg"
          >
            Explore Services & AI VisionLab
            <i className="fas fa-magic text-[10.5px] ml-1"></i>
          </button>
        </div>
      </div>

      {/* Investment Calculator Showcase */}
      <div className="relative">
        <InvestmentCalculator />
        <div className="bg-primary pb-28 text-center border-b border-gold/15">
          <button 
            onClick={() => navigate('/investment')}
            className="gold-button inline-flex items-center gap-3 px-14 py-5 rounded-full font-bold uppercase tracking-widest text-[10px] bg-gold shadow-lg"
          >
            Launch Portfolio Planner & AI Consult
            <i className="fas fa-brain text-[11px] ml-1"></i>
          </button>
        </div>
      </div>

      {/* Legacy and Values Section */}
      <section className="py-28 lg:py-44 bg-[#FAF9F6] relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
              <div className="order-2 lg:order-1 relative text-left">
                <span className="text-gold font-bold uppercase tracking-[0.4em] text-[9px] mb-6 block">Our Enduring Legacy</span>
                <h2 className="text-4xl sm:text-6xl lg:text-8xl font-display font-medium text-primary mb-10 leading-[1.05] tracking-tight">
                  Integrity Since <span className="font-editorial italic text-3xl sm:text-5xl lg:text-7xl text-gold">2008</span>
                </h2>
                <div className="space-y-10 text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed font-light">
                  <p>
                    Founded in 2008, <strong className="font-semibold text-primary">MARBITECH PROPERTIES & INVESTMENT LTD</strong> has evolved into Nigeria's most trusted name for high-end integrated real estate.
                  </p>
                  <p>
                    Our philosophy merges architectural vision with structural permanence. We architect generational wealth, ensuring every square meter is optimized for prosperity and visual grace.
                  </p>
                  <div className="pt-6">
                    <button 
                      onClick={() => navigate('/about')}
                      className="text-primary hover:text-gold font-bold uppercase tracking-[0.3em] text-[9.5px] flex items-center gap-6 group transition-colors"
                    >
                      Read Our Complete Story 
                      <span className="w-12 h-[1px] bg-gold group-hover:w-20 transition-all duration-700"></span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
                <div className="p-8 sm:p-12 bg-white rounded-[2.5rem] border border-zinc-200/80 hover:border-gold/30 shadow-[0_15px_30px_rgba(0,0,0,0.02)] transition-all duration-500 group text-left">
                  <div className="h-14 w-14 bg-gold/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-gold transition-all duration-500">
                    <i className="fas fa-fingerprint text-gold group-hover:text-primary text-xl"></i>
                  </div>
                  <h3 className="text-2xl font-display font-medium text-primary mb-5">Vision</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-light italic font-editorial">
                    "To define the future of Nigerian real estate through unparalleled value."
                  </p>
                </div>
                <div className="p-8 sm:p-12 bg-primary rounded-[2.5rem] text-white hover:border-gold/30 border border-transparent shadow-[0_25px_50px_rgba(5,26,16,0.15)] relative overflow-hidden group text-left">
                  <div className="relative z-10 animate-fade-in">
                    <div className="h-14 w-14 bg-gold rounded-2xl flex items-center justify-center mb-8">
                      <i className="fas fa-compass text-primary text-xl"></i>
                    </div>
                    <h3 className="text-2xl font-display font-medium text-gold mb-5">Mission</h3>
                    <p className="text-white/80 text-sm leading-relaxed font-light">
                      "Creating world-class real estate opportunities anchored in integrity and client success."
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(212,175,55,0.1),transparent_70%)] pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default Home;
