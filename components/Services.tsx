
import React, { useRef } from 'react';
import { motion } from 'motion/react';

const Services: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      title: 'Construction Excellence',
      icon: 'fa-building-columns',
      desc: 'Master-planned developments executed with precision. We handle everything from structural integrity to the final gold-leaf finish.',
      features: ['Architectural Design', 'Site Supervision', 'Civil Engineering']
    },
    {
      title: 'Interior Design',
      icon: 'fa-couch',
      desc: 'Curating spaces that reflect prestige and personality. Our bespoke interior design services bring uncompromising luxury to every project.',
      features: ['Space Planning', 'Elite Finishes', 'Custom Furnishings']
    },
    {
      title: 'Interior Decoration',
      icon: 'fa-paint-roller',
      desc: 'The art of finishing. We curate fine art, exclusive textiles, and high-end accessories to complete your living masterpiece.',
      features: ['Art Curation', 'Textile Selection', 'Styling & Setup']
    },
    {
      title: 'Strategic Brokerage',
      icon: 'fa-handshake',
      desc: 'Exclusive access to off-market luxury assets in Lagos and Abuja. We connect elite buyers with prestigious properties.',
      features: ['Asset Valuation', 'Legal Due Diligence', 'Portfolio Management']
    },
    {
      title: 'Wealth Management',
      icon: 'fa-vault',
      desc: 'Secure your legacy through land banking and commercial development. We turn real estate into high-performing capital.',
      features: ['ROI Analysis', 'Risk Mitigation', 'Exit Strategy Planning']
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const cardWidth = 350; // Approximated card width with gap
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      x: -80 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: 'spring', 
        stiffness: 80, 
        damping: 15
      }
    }
  };

  return (
    <section id="services" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left">
            <span className="text-gold font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">Institutional Scope</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">Corporate Service Portfolio</h2>
            <div className="w-20 h-1 bg-gold"></div>
          </div>
          
          {/* Sliding Controls */}
          <div className="flex gap-3">
            <button 
              onClick={() => scroll('left')}
              className="h-12 w-12 rounded-full border border-gray-200 hover:border-gold flex items-center justify-center text-primary hover:text-gold transition-all duration-300 cursor-pointer"
              aria-label="Slide left"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button 
              onClick={() => scroll('right')}
              className="h-12 w-12 rounded-full border border-gray-200 hover:border-gold flex items-center justify-center text-primary hover:text-gold transition-all duration-300 cursor-pointer"
              aria-label="Slide right"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>

        {/* Horizontal sliding viewport */}
        <motion.div 
          ref={scrollRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex gap-8 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-8 pt-4 -mx-4 px-4 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {services.map((service, i) => (
            <motion.div 
              key={i} 
              variants={cardVariants}
              className="snap-start shrink-0 w-[85vw] sm:w-[380px] md:w-[350px] group p-10 rounded-[3rem] bg-gray-50 border border-gray-100 hover:bg-primary transition-all duration-500 hover:shadow-2xl hover:-translate-y-4 flex flex-col justify-between min-h-[420px]"
            >
              <div>
                <div className="h-20 w-20 bg-gold/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-gold transition-colors duration-500">
                  <i className={`fas ${service.icon} text-3xl text-gold group-hover:text-primary transition-colors duration-500`}></i>
                </div>
                <h3 className="text-2xl font-display font-bold text-primary mb-6 group-hover:text-gold transition-colors duration-500">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 group-hover:text-white/60 transition-colors duration-500">
                  {service.desc}
                </p>
              </div>
              <ul className="space-y-3">
                {service.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-primary/40 group-hover:text-gold/60 transition-colors duration-500">
                    <i className="fas fa-check text-gold"></i>
                    {feat}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
