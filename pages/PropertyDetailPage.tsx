import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { PROPERTIES } from '../constants';
import { logAnalyticsEvent } from '../services/firebase';
import { toast } from '../services/toast';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, X, ChevronLeft, ChevronRight, Info, Play, Pause } from 'lucide-react';
import { InteractiveMap } from '../components/InteractiveMap';

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Find the exact property from our signature collection
  const property = PROPERTIES.find(p => p.id === id);

  // Scroll to quote form if hash is present
  useEffect(() => {
    if (location.hash === '#quote') {
      setTimeout(() => {
        const element = document.getElementById('concierge-desk-form');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
    }
  }, [location, property]);

  // Fallback to first property if not found, or redirect
  useEffect(() => {
    if (!property) {
      toast.error("Requested signature asset is not available.");
      navigate('/catalog');
    } else {
      logAnalyticsEvent('view_property_detail_page', {
        property_id: property.id,
        property_title: property.title,
        property_type: property.type
      });
    }
  }, [property, navigate]);

  if (!property) return null;

  // Predefined gorgeous fallbacks for the entire gallery matching private GCP storage assets
  const fallbackGallery = useMemo(() => {
    if (property.id === '1') {
      return [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80", // Life Camp Main
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
      ];
    }
    if (property.id === '2') {
      return [
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80", // Epe Land Main
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1200&q=80"
      ];
    }
    return [property.image, ...(property.additionalImages || [])];
  }, [property]);

  // Track the active gallery image and state-managed actual sources
  const allImages = useMemo(() => [property.image, ...(property.additionalImages || [])], [property]);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const [activeImage, setActiveImage] = useState(property.image);

  useEffect(() => {
    if (property) {
      setLoadedImages([property.image, ...(property.additionalImages || [])]);
      setActiveImage(property.image);
    }
  }, [property]);

  const handleImageError = (index: number) => {
    setLoadedImages(prev => {
      const next = [...prev];
      const fallbackUrl = fallbackGallery[index] || fallbackGallery[0] || '';
      if (next[index] !== fallbackUrl) {
        next[index] = fallbackUrl;
        // Also update currently active image if it was the one that failed
        if (activeImage === allImages[index]) {
          setActiveImage(fallbackUrl);
        }
      }
      return next;
    });
  };

  // Automatically test and heal image sources in the background
  useEffect(() => {
    if (!property) return;
    const imagesToTest = [property.image, ...(property.additionalImages || [])];
    imagesToTest.forEach((imgUrl, idx) => {
      const tester = new window.Image();
      tester.src = imgUrl;
      tester.onerror = () => {
        handleImageError(idx);
      };
    });
  }, [property, fallbackGallery, allImages, activeImage]);

  // Virtual Tour States and Setup
  const [isVirtualTourOpen, setIsVirtualTourOpen] = useState(false);
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const [panOffset, setPanOffset] = useState(0); // -100 to 100
  const [isAutoPanning, setIsAutoPanning] = useState(true);
  const [activeHotspotIndex, setActiveHotspotIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isSoundscapeOn, setIsSoundscapeOn] = useState(false);

  // Define our rooms with custom features for the 360 virtual tour
  const tourRooms = useMemo(() => {
    if (!property) return [];
    
    const names = [
      'Royal Living Suite & Parlor',
      'Presidential Dining Room',
      'Elite Culinary Chamber',
      'Panoramic Oasis Terrace',
      'Private Spa & Wellness Suite'
    ];
    
    return [
      {
        name: 'Grand Lobby & Reception',
        image: loadedImages[0] || property.image,
        description: 'Double-volume spatial design customized with a handmade crystal chandelier & Calacatta flooring.',
        hotspots: [
          { top: '35%', left: '30%', title: 'Hand-Applied Gold Gilding', desc: 'Custom 22-Karat manual gold leaf detailing along continuous ceiling cornices.' },
          { top: '65%', left: '70%', title: 'Italian Travertine Plinth', desc: 'Direct quarry-cut marble block styled precisely with seamless dry alignment.' }
        ]
      },
      ...(property.additionalImages || []).map((img, index) => {
        const roomName = names[index] || `Suite Chamber ${index + 1}`;
        const features = [
          [
            { top: '48%', left: '25%', title: 'Intelligent VRV Matrix', desc: 'Multi-zone independent climate controls running 98% dust-filtration efficiency.' },
            { top: '55%', left: '60%', title: 'Double-E Acoustic Glazing', desc: 'German gas-injected structural panes blocking outward noises up to 45 decibels.' }
          ],
          [
            { top: '32%', left: '40%', title: 'Modular Walnut Cabinetry', desc: 'Bespoke invisible-joint soft-damped push hinges crafted in Milan workshops.' },
            { top: '60%', left: '75%', title: 'Pre-Curated Fine Art', desc: 'Original Abstract African painting integrated into structural concrete wall niche.' }
          ],
          [
            { top: '45%', left: '35%', title: 'Redundant Power Core', desc: 'Immediate fiber-triggered grid switching with integrated Tesla Powerwalls.' },
            { top: '50%', left: '68%', title: 'Flush Sonic Transducers', desc: 'Invisible drywall-embedded audio transducers yielding pristine multi-point acoustic clarity.' }
          ],
          [
            { top: '40%', left: '28%', title: 'Precision Spatial Air-Lock', desc: 'Double magnetic physical threshold barriers for absolute climate stabilization.' },
            { top: '68%', left: '80%', title: 'Concealed Water Drainage', desc: 'High-volume invisible peripheral trench prevents stagnant pooling.' }
          ]
        ];
        
        return {
          name: roomName,
          image: loadedImages[index + 1] || img,
          description: 'Luxurious modern finishes, custom lighting arrays, and automated luxury living integration.',
          hotspots: features[index % features.length]
        };
      })
    ];
  }, [property, loadedImages]);

  // Auto pan loop
  useEffect(() => {
    if (!isVirtualTourOpen || !isAutoPanning) return;
    
    const interval = setInterval(() => {
      setPanOffset(prev => {
        let next = prev + 0.12; // slow elegant speed
        if (next > 100) next = -100; // loop back
        return next;
      });
    }, 16);
    
    return () => clearInterval(interval);
  }, [isVirtualTourOpen, isAutoPanning]);

  const handleRoomSwitch = (idx: number) => {
    setActiveRoomIndex(idx);
    setPanOffset(0);
    setActiveHotspotIndex(null);
    logAnalyticsEvent('virtual_tour_room_switch', {
      property_id: property.id,
      room_name: tourRooms[idx]?.name
    });
  };

  const handleManualPan = (direction: 'left' | 'right') => {
    setIsAutoPanning(false);
    setPanOffset(prev => {
      const step = 20;
      const next = direction === 'left' ? prev - step : prev + step;
      return Math.max(-100, Math.min(100, next));
    });
  };

  const handleOpenTour = () => {
    setIsVirtualTourOpen(true);
    logAnalyticsEvent('open_virtual_tour', {
      property_id: property.id,
      property_title: property.title
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsAutoPanning(false);
    setStartX(e.clientX - panOffset * 4);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const newOffset = (currentX - startX) / 4;
    setPanOffset(Math.max(-100, Math.min(100, newOffset)));
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setIsAutoPanning(false);
    if (e.touches[0]) {
      setStartX(e.touches[0].clientX - panOffset * 4);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    if (e.touches[0]) {
      const currentX = e.touches[0].clientX;
      const newOffset = (currentX - startX) / 4;
      setPanOffset(Math.max(-100, Math.min(100, newOffset)));
    }
  };

  // Private quote form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredDate: '',
    message: `I would like to request an official valuation, payment structure plan, and investment summary for: ${property.title}. Please arrange a virtual or private physically guided tour.`
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectPlotInquiry = (plotMessage: string) => {
    setFormData(prev => ({
      ...prev,
      message: plotMessage
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      toast.error('Kindly complete all mandatory fields to engage our private desk.');
      return;
    }

    setIsSubmitting(true);
    logAnalyticsEvent('concierge_quote_submit', {
      property_id: property.id,
      property_title: property.title,
      client_name: formData.fullName,
      client_email: formData.email
    });

    setTimeout(() => {
      toast.success(`Inquiry successfully logged. A Marbitech Partner has logged ticket MAR-${property.id}${Math.floor(Math.random() * 900 + 100)} and will contact you within 2 business hours.`);
      setIsSubmitting(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        preferredDate: '',
        message: `I would like to request an official valuation, payment structure plan, and investment summary for: ${property.title}. Please arrange a virtual or private physically guided tour.`
      });
    }, 1200);
  };

  return (
    <div className="pt-24 lg:pt-36 bg-[#FAF9F6] min-h-screen pb-24">
      <div className="container mx-auto px-6 lg:px-24">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-10 text-left">
          <Link 
            to="/catalog" 
            className="text-primary/60 hover:text-gold text-[10px] font-bold uppercase tracking-[0.25em] flex items-center gap-2 group transition-colors"
          >
            <i className="fas fa-arrow-left text-[9px] group-hover:-translate-x-1.5 transition-transform duration-300"></i>
            Back to Select Catalog
          </Link>
        </div>

        {/* Outer Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Visual Showcase (Images, Specs) */}
          <div className="lg:col-span-7 space-y-10 text-left">
            
            {/* Main Picture Frame */}
            <div className="relative aspect-[16/10] bg-zinc-900 rounded-[2rem] overflow-hidden shadow-2xl group border border-zinc-200/50">
              <img 
                src={activeImage} 
                onError={() => {
                  const idx = allImages.indexOf(activeImage);
                  if (idx !== -1) {
                    handleImageError(idx);
                  }
                }}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" 
                alt={property.title} 
              />
              <div className="absolute top-6 left-6 flex flex-wrap gap-2.5">
                <span className="px-4 py-1.5 bg-primary/95 text-gold text-[8.5px] font-bold rounded-full border border-gold/30 uppercase tracking-widest backdrop-blur-md">
                  {property.type}
                </span>
                {property.tags.includes('Completed Project') && (
                  <span className="px-4 py-1.5 bg-emerald-950/90 text-emerald-400 text-[8.5px] font-bold rounded-full border border-emerald-500/20 uppercase tracking-widest backdrop-blur-md">
                    Completed Project
                  </span>
                )}
                {property.tags.includes('Proposed Project') && (
                  <span className="px-4 py-1.5 bg-amber-955/90 text-amber-500 text-[8.5px] font-bold rounded-full border border-amber-500/20 uppercase tracking-widest backdrop-blur-md">
                    Proposed Project
                  </span>
                )}
              </div>

              {/* Enter Virtual Tour Button Overlay */}
              <div className="absolute bottom-6 right-6 z-10">
                <button
                  onClick={handleOpenTour}
                  className="bg-primary/90 hover:bg-gold text-white hover:text-primary border border-gold/30 hover:border-transparent px-6 py-3.5 rounded-full flex items-center gap-2.5 text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-widest shadow-xl shadow-black/40 transition-all duration-300 backdrop-blur-md group/tour scale-100 hover:scale-[1.05] active:scale-[0.98]"
                >
                  <Compass className="h-4 w-4 text-gold group-hover/tour:text-primary transition-colors animate-pulse animate-spin-slow" />
                  <span>360° Virtual Tour</span>
                </button>
              </div>
            </div>

            {/* Thumbnail Navigation Strip with description */}
            <div className="space-y-4">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Interactive Gallery - Select view to Inspect</p>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 sm:gap-4">
                {loadedImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all duration-300 relative group ${
                      activeImage === imgUrl ? 'border-gold scale-[1.03] shadow-md shadow-gold/20' : 'border-zinc-200 hover:border-gold/55'
                    }`}
                  >
                    <img 
                      src={imgUrl} 
                      onError={() => handleImageError(idx)}
                      referrerPolicy="no-referrer" 
                      className="w-full h-full object-cover" 
                      alt={`Gallery view ${idx + 1}`} 
                    />
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>
                ))}
              </div>
            </div>

            {/* In-depth Editorial Description */}
            {!property.tags.includes('Completed Project') ? (
              <div className="bg-white rounded-[2rem] p-8 lg:p-10 border border-zinc-200/85 shadow-xs">
                <h2 className="text-2xl font-display font-medium text-primary mb-6">Architectural Narrative</h2>
                <div className="text-gray-650 font-light leading-relaxed space-y-6 text-sm sm:text-base">
                  <p>{property.description}</p>
                  <p>
                    Every square millimeter of this premium development has been crafted using elite materials sourced directly from our master suppliers in Italy and Germany. The floor layouts prioritize high-contrast sightlines, spatial flexibility, and a deep appreciation for geometric balance. Perfect as a primary high-prestige residence or as an appreciating treasury asset holding strategic value.
                  </p>
                </div>

                {/* Tag Badges */}
                <div className="flex flex-wrap gap-2.5 mt-8 pt-6 border-t border-zinc-100">
                  {property.tags.map(tag => (
                    <span key={tag} className="px-3.5 py-1.5 bg-[#FAF9F6] border border-zinc-200/80 text-primary text-[9px] font-bold uppercase tracking-widest rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-[2rem] p-8 lg:p-10 border border-zinc-200/85 shadow-xs">
                <span className="text-gold font-bold uppercase tracking-[0.3em] text-[8.5px] block mb-4">Development Profile</span>
                <div className="flex flex-wrap gap-2.5">
                  {property.tags.map(tag => (
                    <span key={tag} className="px-3.5 py-1.5 bg-[#FAF9F6] border border-zinc-200/80 text-primary text-[9px] font-bold uppercase tracking-widest rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Technical Specs Blueprint grid */}
            {property.specs && (
              <div className="bg-white rounded-[2rem] p-8 lg:p-10 border border-zinc-200/85 shadow-xs">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-2 w-2 bg-gold rounded-full"></div>
                  <h3 className="text-xl font-display font-medium text-primary uppercase tracking-wider text-sm">Asset Technical Blueprint</h3>
                </div>
                <div className="divide-y divide-zinc-100 font-light">
                  {Object.entries(property.specs).map(([label, val]) => (
                    <div key={label} className="grid grid-cols-1 sm:grid-cols-12 gap-2 py-4.5 first:pt-0 last:pb-0 text-sm">
                      <span className="sm:col-span-5 font-semibold text-primary">{label}</span>
                      <span className="sm:col-span-7 text-gray-500 font-mono text-xs">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Key Details, Amenities, and Private Concierge Booking Desk */}
          <div className="lg:col-span-5 space-y-8 text-left">
            
            {/* Top Stats Card */}
            <div className="bg-primary text-white rounded-[2rem] p-8 lg:p-10 border border-gold/20 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.08),transparent_40%)]"></div>
              
              <div className="relative z-10">
                <span className="text-gold font-bold uppercase tracking-[0.3em] text-[8.5px] block mb-4">Official Asset Valuation</span>
                <h1 className="text-3xl sm:text-4xl font-display font-medium text-white mb-2 leading-tight">{property.title}</h1>
                <p className="text-gold/80 italic font-editorial text-2xl mb-8">{property.price}</p>
                
                {property.location && (
                  <p className="text-white/60 text-xs flex items-center gap-2 mb-8 border-b border-white/5 pb-6">
                    <i className="fas fa-map-marker-alt text-gold"></i>
                    {property.location}
                  </p>
                )}

                {/* Spatial Specs Row */}
                <div className={`grid gap-4 text-center ${
                  property.beds || property.baths ? 'grid-cols-3' : 'grid-cols-1'
                }`}>
                  {property.beds && (
                    <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/5">
                      <p className="text-xl font-display font-medium text-gold leading-none mb-1">{property.beds}</p>
                      <p className="text-[7.5px] text-white/40 uppercase font-bold tracking-widest">Bedrooms</p>
                    </div>
                  )}
                  {property.baths && (
                    <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/5">
                      <p className="text-xl font-display font-medium text-gold leading-none mb-1">{property.baths}</p>
                      <p className="text-[7.5px] text-white/40 uppercase font-bold tracking-widest">Bathrooms</p>
                    </div>
                  )}
                  <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/5">
                    <p className="text-xl font-display font-medium text-gold leading-none mb-1">{property.sqft || 'Prime'}</p>
                    <p className="text-[7.5px] text-white/40 uppercase font-bold tracking-widest">Sq. Footage</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Amenities section */}
            {property.features && (
              <div className="bg-white rounded-[2rem] p-8 lg:p-10 border border-zinc-200/85 shadow-xs">
                <h4 className="font-display font-medium text-primary mb-6 uppercase text-xs tracking-widest">Signature Amenities</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {property.features.map(feature => (
                    <div key={feature} className="flex items-center gap-3.5 text-xs text-gray-500 font-bold uppercase tracking-wider">
                      <div className="h-6 w-6 bg-gold/10 rounded-full flex items-center justify-center shrink-0">
                        <i className="fas fa-check text-gold text-[9px]"></i>
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Desk Booking Form */}
            {!property.tags.includes('Completed Project') ? (
              <div id="concierge-desk-form" className="bg-white rounded-[2.5rem] p-8 lg:p-10 border border-zinc-200/80 shadow-md">
                <span className="text-gold font-bold uppercase tracking-[0.4em] text-[8.5px] block mb-2">Private Banking Protocol</span>
                <h3 className="text-xl font-display font-medium text-primary mb-6">Retain Executive Attention</h3>
                
                <form onSubmit={handleFormSubmit} className="space-y-5 text-xs">
                  <div>
                    <label className="block text-gray-400 font-bold uppercase tracking-widest mb-2">FULL NAME *</label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Chief Aliyu Bello"
                      className="w-full px-5 py-4 bg-[#FAF9F6] border border-zinc-200 rounded-xl focus:border-gold outline-none transition-colors"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 font-bold uppercase tracking-widest mb-2">EMAIL ADDRESS *</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="aliyu@bello.com"
                        className="w-full px-5 py-4 bg-[#FAF9F6] border border-zinc-200 rounded-xl focus:border-gold outline-none transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 font-bold uppercase tracking-widest mb-2">DIRECT PHONE *</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+234..."
                        className="w-full px-5 py-4 bg-[#FAF9F6] border border-zinc-200 rounded-xl focus:border-gold outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 font-bold uppercase tracking-widest mb-2">PREFERRED TOUR DATE (OPTIONAL)</label>
                    <input 
                      type="date" 
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 bg-[#FAF9F6] border border-zinc-200 rounded-xl focus:border-gold outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 font-bold uppercase tracking-widest mb-2">INSTRUCTION SUMMARY</label>
                    <textarea 
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 bg-[#FAF9F6] border border-zinc-200 rounded-xl focus:border-gold outline-none transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="gold-button w-full py-5 rounded-xl font-bold uppercase tracking-widest text-[9.5px] shadow-lg shadow-gold/20 flex items-center justify-center gap-3 transition-opacity disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner animate-spin"></i>
                        ESTABLISHING CONNECTION...
                      </>
                    ) : (
                      <>
                        ENGAGE PORTFOLIO MANAGER
                        <i className="fas fa-paper-plane text-[9px]"></i>
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 border border-zinc-200/80 shadow-md text-center">
                <span className="text-gold font-bold uppercase tracking-[0.4em] text-[8.5px] block mb-3">Institutional Track Record</span>
                <h3 className="text-xl font-display font-medium text-primary mb-4">Delivered & Commissioned</h3>
                <p className="text-gray-500 font-light leading-relaxed text-xs">
                  This portfolio asset represents a fully completed development by Marbitech Properties & Investment. It is preserved here as a hallmark of our architectural and engineering capabilities.
                </p>
                <div className="mt-6 pt-6 border-t border-zinc-100 flex justify-center">
                  <span className="inline-flex items-center gap-2 text-emerald-600 font-bold uppercase tracking-wider text-[9px] bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Operational Portfolio
                  </span>
                </div>
              </div>
            )}

          </div>
          
        </div>

        {/* Interactive Plot Selection Section */}
        {property.id === '2' && (
          <div className="mt-16 border-t border-zinc-200/80 pt-16">
            <InteractiveMap onSelectPlotInquiry={handleSelectPlotInquiry} />
          </div>
        )}

      </div>

      {/* 360° IMMERSIVE VIRTUAL TOUR DIALOG */}
      <AnimatePresence>
        {isVirtualTourOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0a0a0c]/98 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-10 text-white select-none overflow-hidden"
          >
            {/* Top Corporate Branding and Status Indicator */}
            <div className="flex justify-between items-start gap-6 border-b border-white/5 pb-6">
              <div className="text-left">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="h-2 w-2 rounded-full bg-gold animate-ping"></span>
                  <span className="text-[7.5px] sm:text-[9px] text-gold font-bold uppercase tracking-[0.4em]">IMMERSE SPATIAL TELEMETRY v2.6</span>
                </div>
                <h2 className="text-lg sm:text-2xl font-display font-medium text-white tracking-tight">
                  {property.title} — <span className="text-gold italic font-editorial font-light text-base sm:text-xl">360° Virtual Tour</span>
                </h2>
                <p className="text-[10.5px] sm:text-xs text-white/45 max-w-xl font-light mt-1 uppercase tracking-wider">
                  Active Chamber: <strong className="text-white font-semibold">{tourRooms[activeRoomIndex]?.name}</strong> — {tourRooms[activeRoomIndex]?.description}
                </p>
              </div>

              {/* Action Suite / Close Button */}
              <button
                onClick={() => setIsVirtualTourOpen(false)}
                className="h-10 w-10 sm:h-12 sm:w-12 bg-white/5 hover:bg-gold hover:text-primary rounded-full flex items-center justify-center border border-white/10 transition-all duration-300 cursor-pointer"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>

            {/* Main Interactive Spatial Viewport Frame */}
            <div className="relative my-6 flex-1 flex items-center justify-center">
              
              {/* Spatial Viewport Frame container */}
              <div 
                className="relative w-full h-[55vh] sm:h-[60vh] rounded-[2rem] overflow-hidden bg-black/40 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] cursor-grab active:cursor-grabbing flex items-center justify-center"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUpOrLeave}
              >
                {/* 360 wide dynamic panning canvas background */}
                <div 
                  className="absolute h-full w-[200%] sm:w-[150%] top-0 left-[-50%] sm:left-[-25%] select-none pointer-events-none transition-transform duration-75 ease-out"
                  style={{
                    transform: `translateX(${-50 + (panOffset * 0.25)}%)`,
                    backgroundImage: `url("${tourRooms[activeRoomIndex]?.image}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  
                  {/* Floating Telemetry Hotspots */}
                  {tourRooms[activeRoomIndex]?.hotspots?.map((hotspot, idx) => (
                    <div
                      key={idx}
                      className="absolute pointer-events-auto shadow-2xl z-20"
                      style={{ top: hotspot.top, left: hotspot.left }}
                    >
                      {/* Pulsating golden circle */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveHotspotIndex(activeHotspotIndex === idx ? null : idx);
                        }}
                        className="relative h-10 w-10 flex items-center justify-center group/spot cursor-pointer"
                      >
                        <span className="absolute h-full w-full bg-gold/30 rounded-full animate-ping group-hover/spot:scale-125 transition-all"></span>
                        <span className="absolute h-6 w-6 bg-gold/50 rounded-full blur-[2px]"></span>
                        <div className="relative h-5 w-5 bg-gold text-primary rounded-full border border-white shadow-lg flex items-center justify-center">
                          <Info className="h-2.5 w-2.5 font-black shrink-0 text-primary" />
                        </div>
                      </button>

                      {/* Tooltip dialog overlay */}
                      {activeHotspotIndex === idx && (
                        <div 
                          className="absolute bottom-[130%] left-1/2 -translate-x-1/2 bg-primary/95 border border-gold/40 text-left text-white rounded-2xl p-5 w-56 sm:w-72 shadow-2xl backdrop-blur-md z-30 animate-fade-in text-xs font-light"
                          style={{ textShadow: 'none' }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex justify-between items-center mb-1.5 border-b border-white/10 pb-1.5">
                            <h4 className="font-display font-medium text-gold uppercase tracking-wider text-[10px] sm:text-xs">
                              {hotspot.title}
                            </h4>
                            <button 
                              onClick={() => setActiveHotspotIndex(null)}
                              className="text-white/40 hover:text-white"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="text-[10.5px] sm:text-xs text-white/80 leading-relaxed font-sans">
                            {hotspot.desc}
                          </p>
                          <span className="absolute top-full left-1/2 -translate-x-1/2 h-0 w-0 border-x-8 border-x-transparent border-t-8 border-t-primary/95"></span>
                        </div>
                      )}

                    </div>
                  ))}

                </div>

                {/* Left and Right Quick-Shift Interactive Buttons */}
                <div className="absolute left-4 sm:left-6 z-10 flex items-center">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleManualPan('left'); }}
                    className="h-10 w-10 rounded-full bg-black/40 hover:bg-gold/90 hover:text-primary border border-white/10 flex items-center justify-center transition-all backdrop-blur-md cursor-pointer"
                    title="Pan Left"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                </div>
                <div className="absolute right-4 sm:right-6 z-10 flex items-center">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleManualPan('right'); }}
                    className="h-10 w-10 rounded-full bg-black/40 hover:bg-gold/90 hover:text-primary border border-white/10 flex items-center justify-center transition-all backdrop-blur-md cursor-pointer"
                    title="Pan Right"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                {/* Guided Hint Label Overlay */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 bg-black/50 border border-white/10 px-5 py-2.5 rounded-full backdrop-blur-md text-[8.5px] sm:text-[9.5px] uppercase font-bold tracking-[0.2em] text-white/85 text-center flex items-center gap-3">
                  <i className="fas fa-hand-pointer text-gold animate-bounce"></i>
                  <span>Drag workspace to rotate angle or select pulsing hotspots</span>
                </div>

              </div>
            </div>

            {/* Bottom Panel Dashboard Control System */}
            <div className="border-t border-white/5 pt-6 space-y-5">
              
              {/* Panoramic Room Switcher Bar */}
              <div className="text-left">
                <p className="text-[9px] text-gold font-bold uppercase tracking-[0.3em] mb-3 font-mono">SELECT SCAN LEVEL CHAMELEON</p>
                <div className="flex flex-wrap gap-2.5 sm:gap-4 overflow-x-auto pb-2 scrollbar-none">
                  {tourRooms.map((room, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleRoomSwitch(idx)}
                      className={`px-5 py-3 rounded-xl border transition-all duration-300 flex items-center gap-3 text-xs uppercase tracking-widest font-bold whitespace-nowrap cursor-pointer ${
                        activeRoomIndex === idx
                          ? 'bg-gold border-gold text-primary shadow-lg shadow-gold/20'
                          : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <span className="text-[9px] font-editorial italic opacity-75">{`Chamber 0${idx + 1}`}</span>
                      <span>{room.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Status and Functional Controls Footer */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-white/40">
                <div className="flex items-center gap-6">
                  {/* Auto Panning Control Button */}
                  <button
                    onClick={() => setIsAutoPanning(!isAutoPanning)}
                    className={`flex items-center gap-2 border px-4 py-2 rounded-lg transition-colors font-bold uppercase tracking-wider text-[10px] cursor-pointer ${
                      isAutoPanning 
                        ? 'border-gold text-gold hover:bg-gold/10' 
                        : 'border-white/10 text-white/50 hover:bg-white/5'
                    }`}
                  >
                    {isAutoPanning ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                    <span>{isAutoPanning ? 'Auto Pan Active' : 'Auto Pan Paused'}</span>
                  </button>

                  {/* Soundscape Control Button */}
                  <button
                    onClick={() => {
                      setIsSoundscapeOn(!isSoundscapeOn);
                      toast.info(isSoundscapeOn ? "Soundscape muted." : "Serene luxury soundscape initialized.");
                    }}
                    className={`flex items-center gap-2 border px-4 py-2 rounded-lg transition-colors font-bold uppercase tracking-wider text-[10px] cursor-pointer ${
                      isSoundscapeOn 
                        ? 'border-gold text-gold hover:bg-gold/10' 
                        : 'border-white/10 text-white/50 hover:bg-white/5'
                    }`}
                  >
                    <i className={`fas ${isSoundscapeOn ? 'fa-volume-up' : 'fa-volume-mute'}`}></i>
                    <span>{isSoundscapeOn ? 'AMBIENCE ON' : 'AMBIENCE OFF'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold">
                  <span>PAN CALIBRATION COORDINATES:</span>
                  <span className="text-gold font-mono">{panOffset.toFixed(2)}°</span>
                  <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-green-500">LIVE SYNC_ONLINE</span>
                </div>
              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default PropertyDetailPage;
