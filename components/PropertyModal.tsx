
import React from 'react';
import { Property } from '../types';

interface PropertyModalProps {
  property: Property;
  onClose: () => void;
}

const PropertyModal: React.FC<PropertyModalProps> = ({ property, onClose }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 animate-fade-in">
      <div className="absolute inset-0 bg-primary/95 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative w-full max-w-5xl bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 h-10 w-10 bg-white/20 backdrop-blur-md border border-white/40 text-white rounded-full flex items-center justify-center hover:bg-gold hover:text-primary transition-all"
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="md:w-1/2 h-64 md:h-auto relative">
          <img 
            src={property.image} 
            alt={property.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-6 left-6 flex gap-2">
            {property.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-white/90 text-primary text-[9px] font-bold rounded-full uppercase tracking-widest backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
          <span className="text-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">{property.type}</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-4">{property.title}</h2>
          <p className="text-gray-500 flex items-center gap-2 mb-8 text-sm">
            <i className="fas fa-map-marker-alt text-gold"></i>
            {property.location}
          </p>

          <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-100 mb-8">
            <div className="text-center">
              <p className="text-gold font-bold text-lg">{property.beds || 'N/A'}</p>
              <p className="text-[9px] text-gray-400 uppercase font-bold tracking-widest">Bedrooms</p>
            </div>
            <div className="text-center border-x border-gray-100">
              <p className="text-gold font-bold text-lg">{property.baths || 'N/A'}</p>
              <p className="text-[9px] text-gray-400 uppercase font-bold tracking-widest">Bathrooms</p>
            </div>
            <div className="text-center">
              <p className="text-gold font-bold text-lg">{property.sqft || 'Prime'}</p>
              <p className="text-[9px] text-gray-400 uppercase font-bold tracking-widest">Sq Ft</p>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="font-bold text-primary mb-4 uppercase text-xs tracking-widest">Overview</h4>
            <p className="text-gray-600 leading-relaxed font-light">{property.description}</p>
          </div>

          {property.features && (
            <div className="mb-10">
              <h4 className="font-bold text-primary mb-4 uppercase text-xs tracking-widest">Key Amenities</h4>
              <div className="grid grid-cols-2 gap-3">
                {property.features.map(feature => (
                  <div key={feature} className="flex items-center gap-3 text-sm text-gray-500">
                    <i className="fas fa-check text-gold text-[10px]"></i>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-gray-100">
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Price Structure</p>
              <p className="text-xl font-bold text-gold italic">{property.price}</p>
            </div>
            <button 
              onClick={() => {
                alert("Quote request received. A Marbitech Portfolio Manager will contact you via email with the official valuation and investment summary.");
                onClose();
              }}
              className="gold-button px-10 py-5 rounded-2xl w-full sm:w-auto font-bold uppercase tracking-widest text-xs shadow-xl shadow-gold/20"
            >
              Request Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;
