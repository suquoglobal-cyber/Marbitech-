import React from 'react';
import { generateCompanyProfilePDF } from '../services/pdfGenerator';

const About: React.FC = () => {
  return (
    <div className="pt-24 lg:pt-36 bg-[#FAF9F6]">
      <section className="py-24 lg:py-48 bg-[#FAF9F6] relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center mb-28 lg:mb-48">
              <div className="order-2 lg:order-1 relative text-left">
                <span className="text-gold font-bold uppercase tracking-[0.4em] text-[9px] mb-6 block">Our Enduring Legacy</span>
                <h2 className="text-4xl sm:text-6xl lg:text-8xl font-display font-medium text-primary mb-10 leading-[1.05] tracking-tight">
                  Integrity Since <span className="font-editorial italic text-3xl sm:text-5xl lg:text-7xl text-gold">2008</span>
                </h2>
                <div className="space-y-8 text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed font-light">
                  <p>
                    Founded in 2008, <strong className="font-semibold text-primary">MARBITECH PROPERTIES & INVESTMENT LTD</strong> has evolved into Nigeria's most trusted name for high-end integrated real estate.
                  </p>
                  <p>
                    Our philosophy merges architectural vision with structural permanence. We architect generational wealth, ensuring every square meter is optimized for prosperity and visual grace.
                  </p>
                  <p>
                    With over 15 years of industry leadership, we have successfully delivered landmark projects across Lagos and Abuja, setting new benchmarks for quality, investment security, and reliability.
                  </p>
                </div>

                <div className="mt-12 p-6 rounded-3xl bg-white border border-zinc-200/80 shadow-[0_10px_25px_rgba(0,0,0,0.01)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-gold text-left">Verify Our Corporate Ledger</h4>
                    <p className="text-xs text-gray-400 font-light text-left">Download our comprehensive 4-page corporate profile detailing operations, legal structure, and land indices.</p>
                  </div>
                  <button 
                    onClick={generateCompanyProfilePDF}
                    className="gold-button px-8 py-4.5 rounded-2xl font-bold uppercase tracking-widest text-[9.5px] items-center gap-2 flex whitespace-nowrap"
                  >
                    <i className="fas fa-file-pdf"></i>
                    Get Profile PDF
                  </button>
                </div>
              </div>
              <div className="order-1 lg:order-2 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
                <div className="p-8 sm:p-12 bg-white rounded-[2.5rem] border border-zinc-200/80 hover:border-gold/30 shadow-[0_15px_30px_rgba(0,0,0,0.02)] transition-all duration-500 group text-left">
                  <div className="h-14 w-14 bg-gold/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-gold transition-all duration-500">
                    <i className="fas fa-fingerprint text-gold group-hover:text-primary text-xl"></i>
                  </div>
                  <h3 className="text-2xl font-display font-medium text-primary mb-5">Vision</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-light italic font-editorial">
                    "To define the future of Nigerian real estate through unparalleled value and architectural brilliance."
                  </p>
                </div>
                <div className="p-8 sm:p-12 bg-primary rounded-[2.5rem] text-white hover:border-gold/30 border border-transparent shadow-[0_25px_50px_rgba(5,26,16,0.15)] relative overflow-hidden group text-left">
                  <div className="relative z-10">
                    <div className="h-14 w-14 bg-gold rounded-2xl flex items-center justify-center mb-8">
                      <i className="fas fa-compass text-primary text-xl"></i>
                    </div>
                    <h3 className="text-2xl font-display font-medium text-gold mb-5">Mission</h3>
                    <p className="text-white/70 text-sm leading-relaxed font-light">
                       "Creating world-class real estate opportunities anchored in integrity, client success, and sustainable development."
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(212,175,55,0.1),transparent_70%)] pointer-events-none"></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-10 lg:p-24 border border-zinc-200/80 shadow-[0_20px_40px_rgba(0,0,0,0.02)] text-left">
              <div className="max-w-5xl">
                <span className="text-gold font-bold uppercase tracking-[0.4em] text-[9px] mb-4 block">Foundational Pillars</span>
                <h3 className="text-3xl lg:text-5xl font-display font-medium text-primary mb-16 tracking-tight">Our Core Values</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  {[
                    { title: 'Reliability', desc: 'Consistency in delivering high-quality assets on schedule and exceeding client expectations.' },
                    { title: 'Transparency', desc: 'Clear communication, fully documented legal framework, and ethical practices in every transaction.' },
                    { title: 'Innovation', desc: 'Leveraging technology and elite computational blueprints to redefine modern living environments.' },
                    { title: 'Prosperity', desc: 'Dedicated to helping our institutional and private clients create long-term generational wealth.' }
                  ].map((value, i) => (
                    <div key={i} className="border-l border-gold/30 pl-6 lg:pl-10">
                      <h4 className="text-l font-display font-medium text-gold mb-4 uppercase tracking-wider">{value.title}</h4>
                      <p className="text-gray-500 font-light leading-relaxed text-sm sm:text-base">{value.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
