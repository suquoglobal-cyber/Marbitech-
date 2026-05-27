import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, MapPin, CheckCircle2, User, HelpCircle, ArrowDown, Sparkles, SlidersHorizontal, Map, Grid } from 'lucide-react';
import { toast } from '../services/toast';

export interface PlotData {
  id: string;
  block: string;
  zone: string;
  size: string;
  dimensions: string;
  price: string;
  status: 'Available' | 'Reserved' | 'Sold';
  color: string;
  recommendedUse: string;
  description: string;
  points: string; // SVG Points for angled polygon or coordinates
  cx: number; // center x of text label
  cy: number; // center y of text label
}

interface InteractiveMapProps {
  onSelectPlotInquiry: (plotMessage: string) => void;
}

const PLOT_DATABASE: PlotData[] = [
  // BLOCK A (Luxury Waterfront Zone) - Angled waterfront plots
  {
    id: 'A1',
    block: 'Block A',
    zone: 'Luxury Waterfront Zone',
    size: '600 SQM',
    dimensions: '18m x 33.3m',
    price: '₦18,500,000',
    status: 'Available',
    color: 'emerald',
    recommendedUse: 'Waterfront Signature Villa with infinity pool layout',
    description: 'Breathtaking frontage overlooking the eastern nature lagoon preservation area. Pristine sandy soil grade with immediate access to waterfront boulevard.',
    points: '40,50 120,50 110,150 40,150',
    cx: 77,
    cy: 100,
  },
  {
    id: 'A2',
    block: 'Block A',
    zone: 'Luxury Waterfront Zone',
    size: '600 SQM',
    dimensions: '18m x 33.3m',
    price: '₦18,500,000',
    status: 'Available',
    color: 'emerald',
    recommendedUse: 'Waterfront Duplex with multi-car showcase driveway',
    description: 'Double frontage with elegant sightlines. Elevated table land boasting premium load-bearing soil index.',
    points: '125,50 205,50 195,150 115,150',
    cx: 160,
    cy: 100,
  },
  {
    id: 'A3',
    block: 'Block A',
    zone: 'Luxury Waterfront Zone',
    size: '600 SQM',
    dimensions: '18m x 33.3m',
    price: 'Reserved',
    status: 'Reserved',
    color: 'amber',
    recommendedUse: 'Ultra-luxury modern pavilion estate',
    description: 'Currently secured by executive private banking portfolio under initial payment structure plan. Release pending secondary compliance review.',
    points: '210,50 290,50 280,150 200,150',
    cx: 245,
    cy: 100,
  },
  {
    id: 'A4',
    block: 'Block A',
    zone: 'Luxury Waterfront Zone',
    size: '600 SQM',
    dimensions: '18m x 33.3m',
    price: '₦18,500,000',
    status: 'Available',
    color: 'emerald',
    recommendedUse: 'Elite residential duplex or corporate private hideaway',
    description: 'Perfect rectangular configuration located directly adjacent to central landscaped utility path, ensuring superb pedestrian circulation.',
    points: '295,50 375,50 365,150 285,150',
    cx: 330,
    cy: 100,
  },
  {
    id: 'A5',
    block: 'Block A',
    zone: 'Luxury Waterfront Zone',
    size: '720 SQM',
    dimensions: '20m x 36m',
    price: 'Sold',
    status: 'Sold',
    color: 'rose',
    recommendedUse: 'Multi-generational executive residence',
    description: 'Title transfer finalized under Governor’s Consent framework. Active construction staging clearance scheduled for Q3 2026.',
    points: '380,50 460,50 450,150 370,150',
    cx: 415,
    cy: 100,
  },
  {
    id: 'A6',
    block: 'Block A',
    zone: 'Luxury Waterfront Zone',
    size: '720 SQM',
    dimensions: '20m x 36m',
    price: '₦21,000,000',
    status: 'Available',
    color: 'emerald',
    recommendedUse: 'Bespoke triple-volume smart home development',
    description: 'Expanded corner block. Offers extensive side lawns layout potential and majestic panoramic elevation angles.',
    points: '465,50 545,50 535,150 455,150',
    cx: 500,
    cy: 100,
  },
  {
    id: 'A7',
    block: 'Block A',
    zone: 'Luxury Waterfront Zone',
    size: '720 SQM',
    dimensions: '20m x 36m',
    price: 'Sold',
    status: 'Sold',
    color: 'rose',
    recommendedUse: 'Luxury Waterfront Pavilion',
    description: 'Title finalized and fully registered at Lands Registry Office. Closed transaction.',
    points: '550,50 630,50 620,150 540,150',
    cx: 585,
    cy: 100,
  },
  {
    id: 'A8',
    block: 'Block A',
    zone: 'Luxury Waterfront Zone',
    size: '800 SQM',
    dimensions: '22m x 36.3m',
    price: '₦24,500,000',
    status: 'Available',
    color: 'emerald',
    recommendedUse: 'Exclusive Grand Manor / Boutique Diplomatic Diplomat Residence',
    description: 'The absolute crown jewel of Block A. Situated on an expansive peninsula-like corner with triple perimeter view exposure.',
    points: '635,50 715,50 715,150 625,150',
    cx: 672,
    cy: 100,
  },

  // BLOCK B (Premium Central Zone)
  {
    id: 'B1',
    block: 'Block B',
    zone: 'Premium Center Avenue',
    size: '500 SQM',
    dimensions: '15m x 33.3m',
    price: '₦15,000,000',
    status: 'Available',
    color: 'emerald',
    recommendedUse: 'Contemporary multi-family townhouses',
    description: 'Centrally located with direct physical fronting to Avenue of Prosperity. Highly accessible with dual vehicular drainage connections.',
    points: '40,250 145,250 135,370 40,370',
    cx: 90,
    cy: 310,
  },
  {
    id: 'B2',
    block: 'Block B',
    zone: 'Premium Center Avenue',
    size: '500 SQM',
    dimensions: '15m x 33.3m',
    price: '₦15,000,000',
    status: 'Available',
    color: 'emerald',
    recommendedUse: 'Triplex modern apartments/investment rental unit',
    description: 'Optimal solar coordinates shielding mid-afternoon direct rays. Perfect flat sub-grade ready for straightforward foundation casting.',
    points: '150,250 255,250 245,370 140,370',
    cx: 195,
    cy: 310,
  },
  {
    id: 'B3',
    block: 'Block B',
    zone: 'Premium Center Avenue',
    size: '500 SQM',
    dimensions: '15m x 33.3m',
    price: 'Sold',
    status: 'Sold',
    color: 'rose',
    recommendedUse: 'Secured land banking asset portfolio',
    description: 'Allocated to Marbitech Co-Investment Syndicate Group. Official physical pegging ceremony completed.',
    points: '260,250 365,250 355,370 250,370',
    cx: 305,
    cy: 310,
  },
  {
    id: 'B4',
    block: 'Block B',
    zone: 'Premium Center Avenue',
    size: '500 SQM',
    dimensions: '15m x 33.3m',
    price: '₦15,000,000',
    status: 'Available',
    color: 'emerald',
    recommendedUse: 'Architectural custom-build smart home duplex',
    description: 'Immaculate structural buffer boundaries. Bordered by landscaped recreational walkway buffers on the eastern rim.',
    points: '370,250 475,250 465,370 360,370',
    cx: 415,
    cy: 310,
  },
  {
    id: 'B5',
    block: 'Block B',
    zone: 'Premium Center Avenue',
    size: '500 SQM',
    dimensions: '15m x 33.3m',
    price: 'Reserved',
    status: 'Reserved',
    color: 'amber',
    recommendedUse: 'High-end duplex with indoor wellness court',
    description: 'First-stage reservation deposit logged from overseas clientele. Global compliance verification pending clearance.',
    points: '480,250 585,250 575,370 470,370',
    cx: 525,
    cy: 310,
  },
  {
    id: 'B6',
    block: 'Block B',
    zone: 'Premium Center Avenue',
    size: '650 SQM',
    dimensions: '18m x 36.1m',
    price: '₦19,500,000',
    status: 'Available',
    color: 'emerald',
    recommendedUse: 'Premium residential block offering deep backyard landscaping potential',
    description: 'Expanded corner plot with panoramic vistas. Excellent positioning near the main inner circular roundabout.',
    points: '590,250 715,250 705,370 580,370',
    cx: 645,
    cy: 310,
  },

  // BLOCK C (Commercial Boulevard Corner)
  {
    id: 'C1',
    block: 'Block C',
    zone: 'Commercial Hub & Elite Boulevard',
    size: '1000 SQM',
    dimensions: '25m x 40m',
    price: '₦35,000,000',
    status: 'Available',
    color: 'emerald',
    recommendedUse: 'Commercial office plaza, luxury retail strip, or ultra-premium medical wing',
    description: 'Super-sized commercial designation plot. Facing main access trunk roads. Engineered with double wide transit ingress options.',
    points: '40,410 200,410 190,470 40,470',
    cx: 115,
    cy: 440,
  },
  {
    id: 'C2',
    block: 'Block C',
    zone: 'Commercial Hub & Elite Boulevard',
    size: '1000 SQM',
    dimensions: '25m x 40m',
    price: 'Sold',
    status: 'Sold',
    color: 'rose',
    recommendedUse: 'Corporate Headquarters and banking micro-hub',
    description: 'Acquired by regional investment bank for elite executive administrative pavilion complex.',
    points: '210,410 380,410 370,470 200,470',
    cx: 290,
    cy: 440,
  },
  {
    id: 'C3',
    block: 'Block C',
    zone: 'Commercial Hub & Elite Boulevard',
    size: '1200 SQM',
    dimensions: '30m x 40m',
    price: '₦42,000,000',
    status: 'Available',
    color: 'emerald',
    recommendedUse: 'Signature premium co-working spaces or modern boutique hotel',
    description: 'Maximal footprint allowance inside construction limits. Ideal high-visibility asset perfect for monumental branding presence.',
    points: '390,410 570,410 560,470 380,470',
    cx: 475,
    cy: 440,
  },
  {
    id: 'C4',
    block: 'Block C',
    zone: 'Commercial Hub & Elite Boulevard',
    size: '1500 SQM',
    dimensions: '30m x 50m',
    price: 'Reserved',
    status: 'Reserved',
    color: 'amber',
    recommendedUse: 'Luxury high-density luxury flats complex',
    description: 'Proposed joint venture partnership pending administrative architectural board alignment checks.',
    points: '580,410 715,410 715,470 570,470',
    cx: 642,
    cy: 440,
  }
];

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ onSelectPlotInquiry }) => {
  const [selectedPlot, setSelectedPlot] = useState<PlotData | null>(null);
  const [filterStatus, setFilterStatus] = useState<'All' | 'Available' | 'Reserved' | 'Sold'>('All');
  const [filterBlock, setFilterBlock] = useState<'All' | 'Block A' | 'Block B' | 'Block C'>('All');

  // Stats
  const stats = useMemo(() => {
    const total = PLOT_DATABASE.length;
    const available = PLOT_DATABASE.filter(p => p.status === 'Available').length;
    const reserved = PLOT_DATABASE.filter(p => p.status === 'Reserved').length;
    const sold = PLOT_DATABASE.filter(p => p.status === 'Sold').length;
    return { total, available, reserved, sold };
  }, []);

  // Filter plots
  const filteredPlots = useMemo(() => {
    return PLOT_DATABASE.filter(plot => {
      const matchStatus = filterStatus === 'All' || plot.status === filterStatus;
      const matchBlock = filterBlock === 'All' || plot.block === filterBlock;
      return matchStatus && matchBlock;
    });
  }, [filterStatus, filterBlock]);

  // Handle plot select click
  const handlePlotClick = (plot: PlotData) => {
    setSelectedPlot(plot);
    logInteraction('plot_select', { plot_id: plot.id, status: plot.status });
  };

  const logInteraction = (event: string, meta: Record<string, unknown>) => {
    console.log(`[Interaction Log] Event: ${event}`, meta);
  };

  const handleInquireClick = (plot: PlotData) => {
    const inquiryMsg = `INQUIRY ATTACHMENT PR-POINT-${plot.id}:\nI am writing to express high-level interest in the Proposed Marbitech Prime-Point Epe Masterplan allocation system. Specifically, I would like to schedule a private briefing, layout analysis, and payment structures projection concerning:\n- Block Position: ${plot.block} (${plot.zone})\n- Designated Plot: Plot ${plot.id}\n- Plot Sizing: ${plot.size} (${plot.dimensions})\n- Direct Valuation Price: ${plot.price === 'Reserved' || plot.price === 'Sold' ? 'Price on Request (Portfolio Inquiry)' : plot.price}\n\nKindly routing this request through to the Priority Investment Desk Partner.`;
    
    onSelectPlotInquiry(inquiryMsg);
    
    toast.success(`Success! Plot ${plot.id} specifications loaded into the Marbitech Concierge Desk. Auto-scrolling to establish connection.`);

    // Scroll to form smoothly
    const element = document.getElementById('concierge-desk-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div id="interactive-masterplan-blueprint" className="bg-white rounded-[2.5rem] p-6 sm:p-10 border border-zinc-200/80 shadow-md space-y-8 text-left">
      
      {/* Executive Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-zinc-100 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 w-2 rounded-full bg-gold animate-pulse"></div>
            <span className="text-[8.5px] text-gold font-bold uppercase tracking-[0.35em]">PROPRIETARY MASTERPLAN INTERACTION v4.1</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-medium text-primary">Interactive Masterplan Layout</h2>
          <p className="text-zinc-500 font-light text-xs sm:text-sm max-w-xl mt-1.5">
            Click on specific spatial plots in the Epe Corridor blueprint to run real-time allocation availability checks, inspect dimensions, and request direct acquisition slots.
          </p>
        </div>

        {/* Counter Pill Panel */}
        <div className="flex gap-3 text-[10px] font-mono shrink-0">
          <div className="px-3.5 py-2.5 bg-emerald-50/70 border border-emerald-100 rounded-xl text-center">
            <p className="text-lg font-bold text-emerald-600 leading-none">{stats.available}</p>
            <p className="text-[7.5px] text-emerald-500 uppercase tracking-widest font-sans mt-1">Available</p>
          </div>
          <div className="px-3.5 py-2.5 bg-amber-50/70 border border-amber-100 rounded-xl text-center">
            <p className="text-lg font-bold text-amber-500 leading-none">{stats.reserved}</p>
            <p className="text-[7.5px] text-amber-500 uppercase tracking-widest font-sans mt-1">Reserved</p>
          </div>
          <div className="px-3.5 py-2.5 bg-zinc-50 border border-zinc-100 rounded-xl text-center">
            <p className="text-lg font-bold text-zinc-400 leading-none">{stats.sold}</p>
            <p className="text-[7.5px] text-zinc-400 uppercase tracking-widest font-sans mt-1">Sold</p>
          </div>
        </div>
      </div>

      {/* Filter and Control Systems */}
      <div className="flex flex-col lg:flex-row justify-between gap-5 bg-[#FAF9F6] p-5 rounded-2xl border border-zinc-100">
        
        {/* Status Filters */}
        <div className="space-y-2">
          <label className="text-[9px] text-gold font-bold uppercase tracking-widest flex items-center gap-1.5">
            <SlidersHorizontal className="h-3 w-3" /> Filters by Diagnostic Status
          </label>
          <div className="flex flex-wrap gap-2">
            {(['All', 'Available', 'Reserved', 'Sold'] as const).map(status => (
              <button
                id={`btn-filter-status-${status.toLowerCase()}`}
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2.5 rounded-xl text-[10.5px] font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                  filterStatus === status
                    ? 'bg-primary border-primary text-gold shadow-xs'
                    : 'bg-white border-zinc-200 text-zinc-600 hover:border-gold/50'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Block Filters */}
        <div className="space-y-2">
          <label className="text-[9px] text-gold font-bold uppercase tracking-widest flex items-center gap-1.5">
            <Map className="h-3 w-3" /> Sector Block Ingress
          </label>
          <div className="flex flex-wrap gap-2">
            {(['All', 'Block A', 'Block B', 'Block C'] as const).map(block => (
              <button
                id={`btn-filter-block-${block.replace(/\s+/g, '-').toLowerCase()}`}
                key={block}
                onClick={() => setFilterBlock(block)}
                className={`px-4 py-2.5 rounded-xl text-[10.5px] font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                  filterBlock === block
                    ? 'bg-primary border-primary text-gold shadow-xs'
                    : 'bg-white border-zinc-200 text-zinc-600 hover:border-gold/50'
                }`}
              >
                {block === 'All' ? 'All Sectors' : block}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Blueprint & Inspector Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
        
        {/* Left Aspect: The Dynamic SVG blueprint map */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-zinc-955 border border-zinc-900 rounded-3xl p-4 sm:p-6 overflow-hidden relative shadow-inner min-h-[350px] sm:min-h-[450px] bg-[#0c120c]" style={{ backgroundImage: 'linear-gradient(rgba(212,175,55,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.02) 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
          
          {/* Engineering HUD Indicators */}
          <div className="absolute top-4 left-4 flex gap-4 text-[8px] font-mono text-white/40 pointer-events-none select-none uppercase tracking-widest">
            <div className="flex items-center gap-1.5">
              <Grid className="h-3 w-3 text-gold/30" />
              <span>Grid scale: 1:350</span>
            </div>
            <span>Epe Corridors: Phase 1</span>
          </div>

          <div className="absolute top-4 right-4 flex items-center gap-1.5 text-[8px] font-mono text-emerald-500 bg-emerald-500/5 px-2 py-1 rounded-md border border-emerald-500/10 pointer-events-none select-none">
            <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping"></span>
            <span>SYSTEM ACTIVE / ALLOCATION LIVE</span>
          </div>

          {/* MAIN INTERACTIVE CANVASES */}
          <div className="relative flex-1 w-full flex items-center justify-center py-4">
            <svg 
              viewBox="0 0 800 520" 
              className="w-full h-auto max-h-[480px] drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)]"
            >
              <defs>
                {/* Visual Glow and Pattern Accents */}
                <filter id="emerald-glow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#10b981" floodOpacity="0.15" />
                </filter>
                <filter id="royal-gold-glow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#C5A059" floodOpacity="0.15" />
                </filter>

                {/* Angled lines filling for private/sold sectors */}
                <pattern id="diagonal-hash" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="10" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                </pattern>
                <pattern id="sold-hash" width="15" height="15" patternTransform="rotate(135 0 0)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="15" stroke="rgba(239, 68, 68, 0.4)" strokeWidth="1.5" />
                </pattern>
              </defs>

              {/* Decorative Nature Layouts: Central Blue Water Canal / Oasis Buffer */}
              <rect x="735" y="40" width="55" height="440" rx="10" fill="rgba(8, 120, 255, 0.05)" stroke="rgba(8, 120, 255, 0.2)" strokeDasharray="3 3" />
              <path d="M 755,60 C 770,120 740,200 765,280 C 780,330 750,420 760,460" stroke="#0ea5e9" strokeWidth="3" fill="none" opacity="0.3" strokeDasharray="5 3" />
              <text x="765" y="250" fill="rgba(14, 165, 233, 0.5)" fontSize="9" fontWeight="bold" transform="rotate(90 765 250)" letterSpacing="0.25em" className="font-sans select-none pointer-events-none">NATURAL LAGOON PRESERVE</text>

              {/* Security Entry Gatehouse Layout Top left */}
              <g opacity="0.45" className="select-none pointer-events-none">
                <rect x="15" y="200" width="15" height="100" rx="3" fill="rgba(255,255,255,0.06)" stroke="white" strokeWidth="0.5" />
                <line x1="22" y1="200" x2="22" y2="300" stroke="white" strokeDasharray="2 2" strokeWidth="0.5" />
                <text x="5" y="250" fill="white" fontSize="7" transform="rotate(-90 5 250)" className="font-mono">GATE ENTRY 01</text>
              </g>

              {/* INFRASTRUCTURE: Main Central Asphalt Expressway Road (Avenue of Prosperity) */}
              <g className="select-none pointer-events-none">
                {/* Main Avenue */}
                <rect x="30" y="180" width="695" height="40" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                {/* Yellow Median dashes */}
                <line x1="30" y1="200" x2="725" y2="200" stroke="#C5A059" strokeWidth="1" strokeDasharray="8 6" opacity="0.6" />
                {/* Lane markers */}
                <text x="360" y="204" fill="rgba(212, 175, 55, 0.4)" fontSize="9" fontWeight="bold" letterSpacing="0.44em" className="font-sans">MARBI BOULEVARD (PROSPERITY WAY)</text>

                {/* Sector Loop Roundabout right side */}
                <circle cx="735" cy="200" r="25" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <circle cx="735" cy="200" r="12" fill="none" stroke="#C5A059" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
              </g>

              {/* PLOTS RENDERING */}
              {PLOT_DATABASE.map(plot => {
                const isSelected = selectedPlot?.id === plot.id;
                
                // Determine layout styles based on status and selection
                let fillVal = 'rgba(255, 255, 255, 0.05)';
                let strokeVal = 'rgba(255, 255, 255, 0.2)';
                let filterVal = undefined;
                let strokeWidthVal = 1;
                let cursorStyle = 'cursor-pointer';

                // Evaluate opacity and compliance when filtered out
                const isFilteredOut = 
                  (filterStatus !== 'All' && plot.status !== filterStatus) ||
                  (filterBlock !== 'All' && plot.block !== filterBlock);

                if (plot.status === 'Available') {
                  fillVal = isSelected ? 'rgba(16, 185, 129, 0.28)' : 'rgba(16, 185, 129, 0.12)';
                  strokeVal = isSelected ? '#10b981' : 'rgba(16, 185, 129, 0.65)';
                  filterVal = isSelected ? 'url(#emerald-glow)' : undefined;
                  strokeWidthVal = isSelected ? 2.5 : 1.2;
                } else if (plot.status === 'Reserved') {
                  fillVal = isSelected ? 'rgba(245, 158, 11, 0.28)' : 'rgba(245, 158, 11, 0.12)';
                  strokeVal = isSelected ? '#C5A059' : 'rgba(245, 158, 11, 0.65)';
                  filterVal = isSelected ? 'url(#royal-gold-glow)' : undefined;
                  strokeWidthVal = isSelected ? 2.5 : 1.2;
                } else if (plot.status === 'Sold') {
                  fillVal = isSelected ? 'rgba(239, 68, 68, 0.12)' : 'rgba(255, 255, 255, 0.01)';
                  strokeVal = isSelected ? '#ef4444' : 'rgba(224, 224, 224, 0.25)';
                  strokeWidthVal = isSelected ? 2.2 : 1;
                }

                return (
                  <g 
                    key={plot.id} 
                    className={`transition-all duration-300 ${cursorStyle} ${isFilteredOut ? 'opacity-15 grayscale pointer-events-none' : 'opacity-100 hover:opacity-100'}`}
                    onClick={() => handlePlotClick(plot)}
                  >
                    {/* Background Pattern hash lines under sold plots to show secure occupancy */}
                    {plot.status === 'Sold' && (
                      <polygon 
                        points={plot.points} 
                        fill="url(#sold-hash)" 
                        opacity="0.3"
                      />
                    )}

                    {/* Standard blueprint back grid under plots */}
                    <polygon 
                      points={plot.points} 
                      fill="url(#diagonal-hash)" 
                      opacity="0.25"
                    />

                    {/* Plot Polygon */}
                    <polygon
                      points={plot.points}
                      fill={fillVal}
                      stroke={strokeVal}
                      strokeWidth={strokeWidthVal}
                      filter={filterVal}
                      className="transition-all duration-300 transform"
                      style={{
                        transformOrigin: 'center',
                      }}
                    />

                    {/* Plot Label Code Text */}
                    <text
                      x={plot.cx}
                      y={plot.cy - 4}
                      fill={
                        plot.status === 'Available' ? '#34d399' :
                        plot.status === 'Reserved' ? '#E9D29F' :
                        'rgba(255,255,255,0.4)'
                      }
                      fontSize="11"
                      fontWeight="bold"
                      textAnchor="middle"
                      className="font-mono tracking-tight select-none select-none"
                    >
                      {plot.id}
                    </text>

                    {/* Dimensions subtitle in map */}
                    <text
                      x={plot.cx}
                      y={plot.cy + 10}
                      fill="rgba(255,255,255,0.3)"
                      fontSize="6.5"
                      fontFamily="monospace"
                      textAnchor="middle"
                      className="select-none"
                    >
                      {plot.size.split(' ')[0]}
                    </text>

                    {/* Little check/sold tiny badge marker */}
                    {plot.status === 'Sold' && (
                      <circle cx={plot.cx} cy={plot.cy - 16} r="3.5" fill="rgba(239,10,10,0.6)" />
                    )}
                    {plot.status === 'Reserved' && (
                      <circle cx={plot.cx} cy={plot.cy - 16} r="3.5" fill="rgba(245,158,11,0.6)" />
                    )}
                  </g>
                );
              })}

              {/* Dynamic Legend floating inside map area bottom right */}
              <g transform="translate(480, 485)" className="select-none pointer-events-none font-mono">
                <rect x="0" y="0" width="245" height="25" rx="6" fill="rgba(0,0,0,0.7)" stroke="rgba(215,175,55,0.15)" strokeWidth="0.8" />
                
                {/* Legend: Available */}
                <circle cx="15" cy="12.5" r="4.5" fill="#10b981" />
                <text x="25" y="15.5" fill="#c4c4c4" fontSize="7.5">AVAILABLE</text>

                {/* Legend: Reserved */}
                <circle cx="95" cy="12.5" r="4.5" fill="#f59e0b" />
                <text x="105" y="15.5" fill="#c4c4c4" fontSize="7.5">RESERVED</text>

                {/* Legend: Sold */}
                <circle cx="175" cy="12.5" r="4.5" fill="rgba(239, 68, 68, 0.4)" stroke="#ef4444" strokeWidth="0.5" />
                <text x="185" y="15.5" fill="#c4c4c4" fontSize="7.5">SECURED (SOLD)</text>
              </g>
            </svg>
          </div>

          {/* Map bottom guide banner */}
          <div className="flex justify-between items-center text-[9px] text-white/35 font-mono pt-3 border-t border-white/5 uppercase tracking-wider">
            <span>Proposed Prime-Point Layout: Master Design Registered © 2026</span>
            <span className="text-gold/50 flex items-center gap-1.5 font-bold">
              <Sparkles className="h-3 w-3 inline" /> SELECT PLOT FOR EXECUTIVE ALLOCATION DIAGNOSTICS
            </span>
          </div>
        </div>

        {/* Right Aspect: The interactive plot diagnostic inspector */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {selectedPlot ? (
              <motion.div
                key={selectedPlot.id}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ duration: 0.25 }}
                className="bg-[#FAF9F6] border border-zinc-200 rounded-3xl p-6 flex flex-col justify-between h-full space-y-6"
              >
                <div>
                  {/* Inspector Header */}
                  <div className="flex justify-between items-center border-b border-zinc-200/50 pb-4 mb-4">
                    <div>
                      <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest font-black block">SPECIFICATION PROTOCOL</span>
                      <h4 className="text-xl font-display font-medium text-primary flex items-center gap-2">
                        Plot {selectedPlot.id} <span className="text-xs uppercase px-2.5 py-1 rounded-full border border-zinc-200 text-zinc-500 font-bold tracking-wider">{selectedPlot.block}</span>
                      </h4>
                    </div>

                    <span className={`px-2.5 py-1 text-[8.5px] font-bold uppercase tracking-widest rounded-full border ${
                      selectedPlot.status === 'Available' ? 'bg-emerald-50 border-emerald-200 text-emerald-600' :
                      selectedPlot.status === 'Reserved' ? 'bg-amber-50 border-amber-200 text-amber-600' :
                      'bg-zinc-100 border-zinc-200 text-zinc-400'
                    }`}>
                      {selectedPlot.status}
                    </span>
                  </div>

                  {/* Technical Coordinates diagnostics list */}
                  <div className="space-y-3.5 text-xs font-light">
                    
                    <div className="grid grid-cols-12 gap-1 py-1 text-zinc-600 border-b border-zinc-100 pb-2">
                      <span className="col-span-5 font-bold uppercase text-[9px] tracking-widest text-gold flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" /> Sector Zone
                      </span>
                      <span className="col-span-7 text-right font-semibold text-primary">{selectedPlot.zone}</span>
                    </div>

                    <div className="grid grid-cols-12 gap-1 py-1 text-zinc-600 border-b border-zinc-100 pb-2">
                      <span className="col-span-5 font-bold uppercase text-[9px] tracking-widest text-gold flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Total Sizing
                      </span>
                      <span className="col-span-7 text-right font-mono font-bold text-primary">{selectedPlot.size}</span>
                    </div>

                    <div className="grid grid-cols-12 gap-1 py-1 text-zinc-600 border-b border-zinc-100 pb-2">
                      <span className="col-span-5 font-bold uppercase text-[9px] tracking-widest text-gold flex items-center gap-1">
                        <Grid className="h-3.5 w-3.5" /> Dimensions
                      </span>
                      <span className="col-span-7 text-right font-mono text-zinc-500">{selectedPlot.dimensions}</span>
                    </div>

                    <div className="grid grid-cols-12 gap-1 py-1 text-zinc-600 border-b border-zinc-100 pb-2">
                      <span className="col-span-5 font-bold uppercase text-[9px] tracking-widest text-gold">
                        Valuation Index
                      </span>
                      <span className="col-span-7 text-right font-editorial italic text-lg font-bold text-primary">
                        {selectedPlot.status === 'Sold' ? 'Sold out' : selectedPlot.price}
                      </span>
                    </div>

                    {/* Descriptive Brief */}
                    <div className="pt-2">
                      <span className="block font-bold uppercase text-[9px] tracking-widest text-zinc-400 mb-1.5">Topographical Diagnostics</span>
                      <p className="text-zinc-600 font-sans text-xs leading-relaxed">
                        {selectedPlot.description}
                      </p>
                    </div>

                    {/* Recommended design */}
                    <div className="pt-1">
                      <span className="block font-bold uppercase text-[9px] tracking-widest text-zinc-400 mb-1.5 flex items-center gap-1">
                        <Sparkles className="h-3.5 w-3.5 text-gold" /> Recommended Structure
                      </span>
                      <p className="text-gold text-xs font-medium font-sans">
                        {selectedPlot.recommendedUse}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submitting Desk action trigger */}
                <div className="pt-4 border-t border-zinc-200">
                  {selectedPlot.status === 'Available' ? (
                    <button
                      id="btn-plot-map-inquire"
                      onClick={() => handleInquireClick(selectedPlot)}
                      className="gold-button w-full py-4 text-[10px] font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <span>Inquire / Request Allocation</span>
                      <ArrowDown className="h-3.5 w-3.5 group-hover:translate-y-1 transition-transform" />
                    </button>
                  ) : selectedPlot.status === 'Reserved' ? (
                    <button
                      id="btn-plot-map-reserved-inquire"
                      onClick={() => handleInquireClick(selectedPlot)}
                      className="w-full py-4 bg-amber-500 text-white hover:bg-amber-600 text-[10px] font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <span>Inquire Back-Up Reservation Queue</span>
                      <HelpCircle className="h-3.5 w-3.5" />
                    </button>
                  ) : (
                    <div className="p-4 bg-zinc-100 border border-zinc-200 rounded-xl text-center text-xs font-semibold text-zinc-500 uppercase tracking-widest leading-none">
                      Absolute Secure Occupancy Held
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              // Default state explaining layout navigation
              <motion.div
                key="default-inspector"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-[#FAF9F6] border border-zinc-200 rounded-3xl p-6 sm:p-8 text-center flex flex-col justify-center items-center space-y-4 h-full min-h-[300px]"
              >
                <div className="h-12 w-12 bg-gold/10 rounded-full flex items-center justify-center text-gold">
                  <Info className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-display font-medium text-primary">Blueprint Diagnostics Active</h4>
                <p className="text-xs text-zinc-500 font-light max-w-sm leading-relaxed">
                  Select any plot directly on the masterplan spatial grid to inspect title indices, valuations, precise topographical soil structures, and available private bank payment plans.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
