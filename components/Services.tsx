
import React from 'react';

const Services: React.FC = () => {
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

  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-gold font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">Our Expertise</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">Integrated Real Estate Solutions</h2>
          <div className="w-20 h-1 bg-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 lg:gap-12">
          {services.map((service, i) => (
            <div key={i} className="group p-10 rounded-[3rem] bg-gray-50 border border-gray-100 hover:bg-primary transition-all duration-700 hover:shadow-2xl hover:-translate-y-4">
              <div className="h-20 w-20 bg-gold/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-gold transition-colors duration-500">
                <i className={`fas ${service.icon} text-3xl text-gold group-hover:text-primary transition-colors duration-500`}></i>
              </div>
              <h3 className="text-2xl font-display font-bold text-primary mb-6 group-hover:text-gold transition-colors duration-500">{service.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 group-hover:text-white/60 transition-colors duration-500">
                {service.desc}
              </p>
              <ul className="space-y-3">
                {service.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-primary/40 group-hover:text-gold/60 transition-colors duration-500">
                    <i className="fas fa-check text-gold"></i>
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
