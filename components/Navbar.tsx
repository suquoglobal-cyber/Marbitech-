
import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Properties', href: '#properties' },
    { name: 'Investments', href: '#investments' },
    { name: 'About', href: '#about' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href === '#' ? 'body' : href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMenuOpen(false);
    }
  };

  const logoUrl = "https://lh3.googleusercontent.com/d/1jn4oChPkYGr1gFcbP781-uHY31kbQ17k";

  return (
    <>
      <nav 
        className={`fixed w-full z-50 transition-all duration-500 ease-in-out px-4 sm:px-10 ${
          isScrolled 
          ? 'bg-primary/95 py-3 shadow-2xl backdrop-blur-2xl border-b border-gold/10' 
          : 'bg-primary py-5 lg:py-6 border-b border-gold/5'
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div 
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group" 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          >
            <div className={`relative transition-all duration-500 flex items-center justify-center p-1 ${
              isScrolled ? 'h-14 w-14 lg:h-16 lg:w-16' : 'h-20 w-20 lg:h-28 lg:w-28'
            }`}>
              <img 
                src={logoUrl} 
                alt="Marbitech Logo" 
                className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700 drop-shadow-[0_0_15px_rgba(197,160,89,0.3)]"
              />
            </div>
            <div className="flex flex-col">
              <h1 className={`text-gold font-display font-bold leading-none tracking-tight transition-all duration-500 ${
                isScrolled ? 'text-sm lg:text-base' : 'text-base lg:text-lg'
              }`}>
                MARBITECH
              </h1>
              <p className={`text-white uppercase tracking-[0.4em] font-black opacity-60 mt-0.5 transition-all duration-500 ${
                isScrolled ? 'text-[6px]' : 'text-[7px]'
              }`}>
                Properties & Investment
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10 xl:space-x-14">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-white/70 hover:text-gold transition-all font-bold text-[10px] xl:text-xs uppercase tracking-[0.3em] relative group/link"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-gold transition-all duration-500 group-hover/link:w-full"></span>
              </a>
            ))}
            <button 
              onClick={() => document.getElementById('footer')?.scrollIntoView({behavior: 'smooth'})}
              className="gold-button px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-gold/10"
            >
              Consult Now
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-gold text-xl focus:outline-none p-3 h-14 w-14 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-xl backdrop-blur-xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars-staggered'}`}></i>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[60] bg-primary transition-all duration-700 lg:hidden flex flex-col ${
        isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
      }`}>
        <div className="flex justify-between items-center p-8 border-b border-white/5">
           <div className="flex items-center gap-4">
             <img src={logoUrl} alt="Logo" className="h-12 w-12 object-contain" />
             <span className="text-gold font-display font-bold text-xl tracking-tighter">MARBITECH</span>
           </div>
           <button onClick={() => setIsMenuOpen(false)} className="text-gold h-12 w-12 flex items-center justify-center rounded-full bg-white/5">
             <i className="fas fa-times text-2xl"></i>
           </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center space-y-10 px-10">
          {navLinks.map((link, i) => (
            <a 
              key={link.name}
              href={link.href} 
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-white text-4xl font-display font-bold hover:text-gold transition-all transform hover:scale-105"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={() => {
              document.getElementById('footer')?.scrollIntoView({behavior: 'smooth'});
              setIsMenuOpen(false);
            }}
            className="gold-button px-10 py-6 rounded-3xl font-black text-base uppercase tracking-[0.3em] w-full max-w-sm shadow-[0_25px_50px_-12px_rgba(197,160,89,0.3)]"
          >
            Contact Experts
          </button>
        </div>
        <div className="p-12 text-center opacity-40 text-[9px] uppercase tracking-[0.5em] text-white font-bold">
          Marbitech Properties & Investment Ltd
        </div>
      </div>
    </>
  );
};

export default Navbar;
