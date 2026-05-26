
import React, { useState } from 'react';
import { Property } from '../types';
import { logAnalyticsEvent } from '../services/firebase';
import { toast } from '../services/toast';

interface PropertyCardProps {
  property: Property;
  onDetail: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onDetail }) => {
  const [isLiked, setIsLiked] = useState(false);

  // Curated elegant fallbacks for private/access-restricted storage assets
  const getFallbackImage = (propId: string) => {
    if (propId === '1') {
      return "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80"; // Luxury Villa Life Camp
    }
    if (propId === '2') {
      return "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"; // Prime Land Epe
    }
    return "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"; // Elite Real Estate
  };

  const [imgSrc, setImgSrc] = useState(property.image);

  const handleRequestQuote = () => {
    logAnalyticsEvent('request_quote_click', {
      property_id: property.id,
      property_title: property.title
    });
    
    const contactSection = document.getElementById('footer');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        toast.success(`Your request for a formal quote on ${property.title} has been logged. An investment consultant will contact you shortly.`);
      }, 1000);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newLiked = !isLiked;
    setIsLiked(newLiked);
    logAnalyticsEvent('property_like', {
      property_id: property.id,
      property_title: property.title,
      action: newLiked ? 'like' : 'unlike'
    });
    
    if (newLiked) {
      toast.success(`Added ${property.title} to your curated portfolio watchlist.`);
    } else {
      toast.info(`Removed ${property.title} from watchlist.`);
    }
  };

  return (
    <div className="group bg-white rounded-3xl lg:rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full border-b-2 hover:border-b-gold">
      <div className="relative h-56 sm:h-64 lg:h-72 overflow-hidden cursor-pointer" onClick={() => onDetail(property)}>
        <img 
          src={imgSrc} 
          onError={() => {
            const fallback = getFallbackImage(property.id);
            if (imgSrc !== fallback) {
              setImgSrc(fallback);
            }
          }}
          alt={property.title} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-primary/95 text-gold text-[8px] font-bold rounded-full backdrop-blur-md border border-gold/30 uppercase tracking-widest">
            {property.type}
          </span>
          {property.tags.includes('Completed Project') && (
            <span className="px-3 py-1 bg-emerald-950/90 text-emerald-400 text-[8px] font-bold rounded-full backdrop-blur-md border border-emerald-500/20 uppercase tracking-widest">
              Completed
            </span>
          )}
          {property.tags.includes('Proposed Project') && (
            <span className="px-3 py-1 bg-amber-950/90 text-amber-500 text-[8px] font-bold rounded-full backdrop-blur-md border border-amber-500/20 uppercase tracking-widest">
              Proposed
            </span>
          )}
        </div>
        <button 
          onClick={handleLike}
          className={`absolute top-4 right-4 h-10 w-10 rounded-full transition-all flex items-center justify-center backdrop-blur-md border ${isLiked ? 'bg-gold border-gold text-primary shadow-lg shadow-gold/40' : 'bg-white/10 border-white/20 text-white hover:bg-white/40'}`}
        >
          <i className={`${isLiked ? 'fas' : 'far'} fa-heart`}></i>
        </button>
      </div>
      
      <div className="p-6 lg:p-8 flex flex-col flex-1">
        <div className="mb-4">
          <h3 className="text-xl lg:text-2xl font-display font-bold text-primary group-hover:text-gold transition-colors mb-2 cursor-pointer" onClick={() => onDetail(property)}>{property.title}</h3>
          <p className="text-gray-500 text-xs flex items-center gap-2">
            <i className="fas fa-map-marker-alt text-gold/70"></i>
            {property.location}
          </p>
        </div>
        
        <div className="flex gap-4 lg:gap-6 mb-6 py-4 border-y border-gray-50 overflow-x-auto no-scrollbar">
          {property.beds && (
            <div className="flex items-center gap-2 text-[9px] text-gray-500 font-bold uppercase tracking-wider shrink-0">
              <i className="fas fa-bed text-gold"></i>
              <span>{property.beds} Beds</span>
            </div>
          )}
          {property.baths && (
            <div className="flex items-center gap-2 text-[9px] text-gray-500 font-bold uppercase tracking-wider shrink-0">
              <i className="fas fa-bath text-gold"></i>
              <span>{property.baths} Baths</span>
            </div>
          )}
        </div>
        
        <div className="mt-auto space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gold uppercase tracking-widest text-xs italic font-display font-bold">
              {property.price}
            </span>
            <button 
              className="text-primary font-bold text-[9px] uppercase tracking-widest hover:text-gold transition-colors flex items-center gap-2 group/btn"
              onClick={() => onDetail(property)}
            >
              Details
              <i className="fas fa-arrow-right text-[8px] group-hover/btn:translate-x-1 transition-transform"></i>
            </button>
          </div>
          <button 
            onClick={handleRequestQuote}
            className="gold-button w-full py-3.5 rounded-xl font-bold uppercase tracking-widest text-[9px] shadow-lg shadow-gold/10"
          >
            Private Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
