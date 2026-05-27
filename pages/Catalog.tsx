import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { PROPERTIES } from '../constants';
import { Property } from '../types';
import { logAnalyticsEvent } from '../services/firebase';

const COLUMN_1_IMAGES = [
  'https://lh3.googleusercontent.com/d/1tI2sKiRxEKVILMJZwOrd8lPVSjoiz49H',
  'https://lh3.googleusercontent.com/d/1QAstywyXbPUCFssk0OcV5NaZp_gTn4Ez',
  'https://lh3.googleusercontent.com/d/1Mku7SB3ABojuk7Y225v4d_PLZRcLw4TP',
];

const COLUMN_2_IMAGES = [
  'https://lh3.googleusercontent.com/d/1aOzx_ZADleNZYEDi8IDK_ung6cuiDMWP',
  'https://lh3.googleusercontent.com/d/1GvCYsuNV9YGUTofranpxfVyrcBgqWOoq',
  'https://lh3.googleusercontent.com/d/1fOgBtwv3ycy0LtgP7rj19iCb4Dm8h0OX',
];

const COLUMN_3_IMAGES = [
  'https://lh3.googleusercontent.com/d/1DckwdC3E9MjtyrcTyYkjvoOC2BvS7sCt',
  'https://lh3.googleusercontent.com/d/1qJ4fMSghM8nonYc0FampT7zdFGK1isrZ',
  'https://lh3.googleusercontent.com/d/15QsT0wRaZ2P8CdrmduErq_LfhWUpu3D_',
];

const COLUMN_4_IMAGES = [
  'https://lh3.googleusercontent.com/d/1W1IdaAgc0FZZ0u4PzfsGRr4nKeVuftCq',
  'https://lh3.googleusercontent.com/d/1JT-89cjBHUD_8nX8CpDolAzysVU-0EkW',
  'https://lh3.googleusercontent.com/d/1tI2sKiRxEKVILMJZwOrd8lPVSjoiz49H',
];

// Duplicated arrays to form perfect gapless loops
const COL1_LOOP = [...COLUMN_1_IMAGES, ...COLUMN_1_IMAGES];
const COL2_LOOP = [...COLUMN_2_IMAGES, ...COLUMN_2_IMAGES];
const COL3_LOOP = [...COLUMN_3_IMAGES, ...COLUMN_3_IMAGES];
const COL4_LOOP = [...COLUMN_4_IMAGES, ...COLUMN_4_IMAGES];

const Catalog: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const initialLocation = searchParams.get('location') || '';
  const initialType = searchParams.get('type') || 'All Types';

  const [searchFilter, setSearchFilter] = useState({ 
    location: initialLocation, 
    type: initialType 
  });

  useEffect(() => {
    setSearchFilter({
      location: searchParams.get('location') || '',
      type: searchParams.get('type') || 'All Types'
    });
  }, [searchParams]);

  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter(p => {
      const matchType = searchFilter.type === 'All Types' || p.type === searchFilter.type;
      const matchLoc = !searchFilter.location || (p.location && p.location.toLowerCase().includes(searchFilter.location.toLowerCase()));
      return matchType && matchLoc;
    });
  }, [searchFilter]);

  const handlePropertySelect = (property: Property, hash?: string) => {
    logAnalyticsEvent('view_property', { 
      property_id: property.id, 
      property_title: property.title,
      property_type: property.type 
    });
    navigate(`/catalog/${property.id}${hash || ''}`);
  };

  return (
    <div className="pt-24 lg:pt-36 bg-[#FAF9F6] min-h-screen">
      <section className="py-12 lg:py-24 bg-[#FAF9F6]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 max-w-[1600px]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16">
            
            {/* Left Column: Complete Catalog Section */}
            <div className="lg:col-span-8 xl:col-span-9 flex flex-col justify-between">
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 lg:mb-16 gap-6">
                  <div className="max-w-3xl text-left">
                    <span className="text-gold font-bold uppercase tracking-[0.4em] text-[8.5px] mb-3 block">Elite Portfolio Directory</span>
                    <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-medium text-primary leading-[1.1] tracking-tight">
                      {searchFilter.location || searchFilter.type !== 'All Types' 
                        ? 'Curated Matching ' 
                        : 'Institutional '}
                      <span className="font-editorial italic text-2xl sm:text-4xl lg:text-5xl xl:text-6xl text-gold pb-1">
                        {searchFilter.location || searchFilter.type !== 'All Types' ? 'Assets' : 'Archive'}
                      </span>
                    </h2>
                  </div>
                  
                  {(searchFilter.location || searchFilter.type !== 'All Types') && (
                    <button 
                      onClick={() => setSearchFilter({ location: '', type: 'All Types' })}
                      className="text-gold hover:text-white transition-all text-[8.5px] font-bold uppercase tracking-[0.25em] flex items-center gap-2 bg-primary border border-gold/20 px-6 py-3 rounded-full shrink-0"
                    >
                      Clear Filters
                      <span className="h-1.5 w-1.5 bg-gold rounded-full animate-ping"></span>
                    </button>
                  )}
                </div>

                {filteredProperties.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
                    {filteredProperties.map(property => (
                      <PropertyCard key={property.id} property={property} onDetail={handlePropertySelect} />
                    ))}
                  </div>
                ) : (
                  <div className="py-20 text-center bg-white rounded-[2rem] border border-dashed border-zinc-200 p-8 shadow-xs">
                    <div className="h-14 w-14 bg-[#FAF9F6] rounded-full flex items-center justify-center mx-auto mb-6 text-gold border border-zinc-150">
                      <i className="fas fa-layer-group text-lg"></i>
                    </div>
                    <h3 className="text-primary font-display font-medium text-xl mb-2">No matching assets found</h3>
                    <p className="text-gray-400 text-xs mb-8 font-light max-w-sm mx-auto">
                      We could not locate any assets matching your active credentials. Explore other properties or consult an analyst.
                    </p>
                    <button 
                      onClick={() => setSearchFilter({ location: '', type: 'All Types' })}
                      className="gold-button px-8 py-3.5 rounded-full font-bold uppercase tracking-widest text-[9px]"
                    >
                      Reset Search Filters
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile and Tablet Horizontal sliding ticker inside container */}
              <div className="mt-16 lg:hidden">
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse"></span>
                  <span className="text-[8.5px] font-bold text-gray-400 uppercase tracking-[0.2em]">Interactive Digital Showroom</span>
                </div>
                
                <div className="relative overflow-hidden w-full h-44 rounded-3xl border border-zinc-200 bg-white p-2 shadow-xs">
                  <div className="grid grid-cols-4 gap-2 h-full">
                    <div className="relative overflow-hidden h-full rounded-xl bg-zinc-50 border border-zinc-100">
                      <div className="flex flex-col gap-2 animate-slide-up-slow select-none">
                        {COL1_LOOP.map((img, idx) => (
                          <img key={idx} src={img} alt="" className="h-20 w-full object-cover rounded-lg" referrerPolicy="no-referrer" />
                        ))}
                      </div>
                    </div>
                    <div className="relative overflow-hidden h-full rounded-xl bg-zinc-50 border border-zinc-100">
                      <div className="flex flex-col gap-2 animate-slide-down-slow select-none">
                        {COL2_LOOP.map((img, idx) => (
                          <img key={idx} src={img} alt="" className="h-20 w-full object-cover rounded-lg" referrerPolicy="no-referrer" />
                        ))}
                      </div>
                    </div>
                    <div className="relative overflow-hidden h-full rounded-xl bg-zinc-50 border border-zinc-100">
                      <div className="flex flex-col gap-2 animate-slide-up-medium select-none">
                        {COL3_LOOP.map((img, idx) => (
                          <img key={idx} src={img} alt="" className="h-20 w-full object-cover rounded-lg" referrerPolicy="no-referrer" />
                        ))}
                      </div>
                    </div>
                    <div className="relative overflow-hidden h-full rounded-xl bg-zinc-50 border border-zinc-100">
                      <div className="flex flex-col gap-2 animate-slide-down-medium select-none">
                        {COL4_LOOP.map((img, idx) => (
                          <img key={idx} src={img} alt="" className="h-20 w-full object-cover rounded-lg" referrerPolicy="no-referrer" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Four Columns of Sliding Portfolio Pictures */}
            <div className="lg:col-span-4 xl:col-span-3 hidden lg:block h-[820px] sticky top-32 rounded-[2.5rem] overflow-hidden border border-zinc-200 bg-[#F5F4EE] p-3 shadow-md">
              <div className="absolute top-4 left-6 z-10 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-gold/15 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-gold animate-ping"></span>
                <span className="text-[8.5px] font-bold text-primary uppercase tracking-widest">Digital Showcase</span>
              </div>
              
              <div className="grid grid-cols-4 gap-2 h-full w-full">
                {/* Column 1: slide-up-slow */}
                <div className="overflow-hidden h-full relative rounded-2xl bg-zinc-100">
                  <div className="flex flex-col gap-2 animate-slide-up-slow select-none">
                    {COL1_LOOP.map((img, idx) => (
                      <div key={idx} className="aspect-[3/4.2] w-full shrink-0 rounded-xl overflow-hidden border border-white/60 shadow-xs">
                        <img src={img} alt="Slider Content 1" className="w-full h-full object-cover select-none pointer-events-none" referrerPolicy="no-referrer" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 2: slide-down-slow */}
                <div className="overflow-hidden h-full relative rounded-2xl bg-zinc-100">
                  <div className="flex flex-col gap-2 animate-slide-down-slow select-none">
                    {COL2_LOOP.map((img, idx) => (
                      <div key={idx} className="aspect-[3/4.2] w-full shrink-0 rounded-xl overflow-hidden border border-white/60 shadow-xs">
                        <img src={img} alt="Slider Content 2" className="w-full h-full object-cover select-none pointer-events-none" referrerPolicy="no-referrer" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 3: slide-up-medium */}
                <div className="overflow-hidden h-full relative rounded-2xl bg-zinc-100">
                  <div className="flex flex-col gap-2 animate-slide-up-medium select-none">
                    {COL3_LOOP.map((img, idx) => (
                      <div key={idx} className="aspect-[3/4.2] w-full shrink-0 rounded-xl overflow-hidden border border-white/60 shadow-xs">
                        <img src={img} alt="Slider Content 3" className="w-full h-full object-cover select-none pointer-events-none" referrerPolicy="no-referrer" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 4: slide-down-medium */}
                <div className="overflow-hidden h-full relative rounded-2xl bg-[#EBEAE3]">
                  <div className="flex flex-col gap-2 animate-slide-down-medium select-none">
                    {COL4_LOOP.map((img, idx) => (
                      <div key={idx} className="aspect-[3/4.2] w-full shrink-0 rounded-xl overflow-hidden border border-white/60 shadow-xs">
                        <img src={img} alt="Slider Content 4" className="w-full h-full object-cover select-none pointer-events-none" referrerPolicy="no-referrer" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};

export default Catalog;
