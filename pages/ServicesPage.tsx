
import React from 'react';
import Services from '../components/Services';

const ServicesPage: React.FC = () => {
  return (
    <div className="pt-24 lg:pt-36 bg-[#FAF9F6]">
      <section className="bg-primary py-28 lg:py-36 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(212,175,55,0.08),transparent_50%)]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <span className="text-gold font-bold uppercase tracking-[0.4em] text-[9px] mb-4 block animate-fade-in">Corporate Solutions</span>
          <h1 className="text-4xl lg:text-7xl font-display font-medium tracking-tight mb-6 leading-none">
            Integrated <span className="font-editorial italic text-3xl sm:text-5xl lg:text-7xl text-gold">Real Estate Services</span>
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto font-light leading-relaxed text-xs sm:text-base">
            From premier project development to high-stability asset oversight, we integrate luxury craftsmanship and professional integrity.
          </p>
        </div>
      </section>

      <Services />
      
      <section className="py-28 bg-[#FAF9F6] border-t border-zinc-200/50">
        <div className="container mx-auto px-6 lg:px-24 text-left">
          <span className="text-gold font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">Auxiliary Management</span>
          <h2 className="text-4xl sm:text-6xl font-display font-medium text-primary mb-16 tracking-tight">Bespoke Enterprise Solutions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { title: 'Project Management', desc: 'Comprehensive, elite oversight of multi-scale projects from pre-feasibility planning to hand-over coordination.' },
              { title: 'Facility Management', desc: 'Prestige-focused maintenance services ensuring sustained structural longevity and capital value optimization.' },
              { title: 'Legal Advisory', desc: 'In-house legal teams to navigate secure land titles, certificate documentation, and corporate contracts.' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-zinc-200/80 shadow-[0_15px_30px_rgba(0,0,0,0.02)] flex flex-col justify-between">
                <div>
                  <span className="text-gold/50 font-editorial text-4xl block mb-6">{`0${i + 1}`}</span>
                  <h3 className="text-2xl font-display font-medium text-primary mb-4">{item.title}</h3>
                  <p className="text-gray-400 text-sm font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
