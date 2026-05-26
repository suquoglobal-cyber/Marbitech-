
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const logoUrl = "https://lh3.googleusercontent.com/d/1jn4oChPkYGr1gFcbP781-uHY31kbQ17k";

  return (
    <footer id="footer" className="bg-primary text-white pt-24 pb-12 border-t border-gold/15 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 mb-20 lg:mb-32">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-8">
              <img src={logoUrl} alt="Marbitech" referrerPolicy="no-referrer" className="h-12 w-12 lg:h-16 lg:w-16 object-contain" />
            <div>
              <h2 className="text-gold font-display text-lg lg:text-xl font-medium tracking-wide leading-none mb-1">MARBITECH</h2>
              <p className="text-[7px] uppercase tracking-[0.35em] font-light text-white/50">Properties & Investment</p>
            </div>
          </div>
          <p className="text-white/55 text-xs sm:text-sm leading-relaxed max-w-lg font-light mb-8">
            Redefining the standard of luxury living and capital preservation in Africa since 2008. We are the architects of permanence.
          </p>
          <div className="flex gap-4">
            {['instagram', 'linkedin', 'twitter'].map((social) => (
              <a key={social} href="#" className="h-10 w-10 bg-white/5 rounded-full flex items-center justify-center text-gold border border-white/5 hover:bg-gold hover:text-primary transition-all duration-500">
                <i className={`fab fa-${social} text-xs`}></i>
              </a>
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-3">
          <h5 className="text-gold text-[9px] uppercase tracking-[0.3em] font-semibold mb-8">Asset Navigator</h5>
          <ul className="space-y-4 text-xs font-light text-white/50">
            <li><Link to="/catalog" className="hover:text-gold hover:underline transition-all">Signature Portfolio</Link></li>
            <li><Link to="/services" className="hover:text-gold hover:underline transition-all">Services & Vision Lab</Link></li>
            <li><Link to="/investment" className="hover:text-gold hover:underline transition-all">Wealth & ROI Projections</Link></li>
            <li><Link to="/about" className="hover:text-gold hover:underline transition-all">About Our Legacy</Link></li>
          </ul>
        </div>
        
        <div className="lg:col-span-4">
          <h5 className="text-gold text-[9px] uppercase tracking-[0.3em] font-semibold mb-8">Concierge Direct</h5>
          <div className="space-y-6">
            <a href="mailto:marbitechproperties@gmail.com" className="group block">
               <p className="text-[8px] uppercase tracking-widest text-white/30 mb-2 font-bold">Official Inquiries</p>
               <p className="text-xs sm:text-sm font-light text-white/70 group-hover:text-gold transition-colors font-mono">marbitechproperties@gmail.com</p>
            </a>
          </div>
        </div>
      </div>
      
      <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-[8.5px] text-white/30 uppercase tracking-[0.2em] font-medium">
          © 2008-2026 Marbitech Properties and Investment Ltd. 
        </p>
        <p className="text-[8.5px] text-white/20 uppercase tracking-[0.3em] font-bold border border-white/10 px-5 py-1.5 rounded-full">RC: 758318</p>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
