
import React from 'react';
import InvestmentCalculator from '../components/InvestmentCalculator';
import AIConsultant from '../components/AIConsultant';

const Investment: React.FC = () => {
  return (
    <div className="pt-24 lg:pt-36 bg-[#FAF9F6]">
      <section className="bg-primary py-28 lg:py-36 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,175,55,0.08),transparent_50%)]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <span className="text-gold font-bold uppercase tracking-[0.4em] text-[9px] mb-4 block animate-fade-in">Strategic Portfolio Planning</span>
          <h1 className="text-4xl lg:text-7xl font-display font-medium tracking-tight mb-6 leading-none">
            Wealth & <span className="font-editorial italic text-3xl sm:text-5xl lg:text-7xl text-gold">Investment Advisory</span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto font-light leading-relaxed text-xs sm:text-base">
            Advanced spatial analytics and predictive financial modeling to design optimal capital deployment solutions across premier Nigerian markets.
          </p>
        </div>
      </section>

      <InvestmentCalculator />
      
      <section className="py-28 bg-[#FAF9F6] border-t border-zinc-200/50">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="bg-white rounded-[2.5rem] p-8 lg:p-20 border border-zinc-200/80 shadow-[0_20px_40px_rgba(0,0,0,0.02)] flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 text-left">
              <span className="text-gold font-bold uppercase tracking-[0.4em] text-[9px] mb-3 block">Private Banking Standards</span>
              <h2 className="text-3xl lg:text-5xl font-display font-medium text-primary mb-8 tracking-tight">Institutional Wealth Advisory</h2>
              <p className="text-gray-500 mb-8 font-light leading-relaxed text-sm lg:text-base">
                Our bespoke advisory suite matches premium assets with capital objectives. We consult on strategic land banking, commercial-to-residential conversions, and high-yield multi-family developments.
              </p>
              <ul className="space-y-5 mb-10">
                {['Direct ROI Performance Projections', 'Capital & Estate Asset Optimization', 'Portfolio Allocation Strategy'].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-xs font-bold text-primary uppercase tracking-wider">
                    <span className="h-2 w-2 bg-gold rounded-full animate-pulse"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 w-full lg:max-w-xl">
               <AIConsultant inline={true} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Investment;
