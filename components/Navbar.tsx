
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Catalog', path: '/catalog' },
    { name: 'Investments', path: '/investment' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
  ];

  const logoUrl = "https://lh3.googleusercontent.com/d/1jn4oChPkYGr1gFcbP781-uHY31kbQ17k";

  return (
    <>
      <nav 
        className={`fixed w-full z-50 transition-all duration-750 ease-in-out px-4 sm:px-12 ${
          isScrolled 
          ? 'bg-primary/95 py-2 shadow-[0_15px_30px_rgba(5,26,16,0.2)] backdrop-blur-xl border-b border-gold/15' 
          : 'bg-primary/80 backdrop-blur-md py-3 sm:py-4 border-b border-white/5'
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <Link 
            to="/"
            className="flex items-center gap-3 cursor-pointer group" 
          >
            <div className={`relative transition-all duration-750 flex items-center justify-center p-1 ${
              isScrolled ? 'h-11 w-11 lg:h-12 lg:w-12' : 'h-16 w-16 lg:h-20 lg:w-20'
            }`}>
              <img 
                src={logoUrl} 
                alt="Marbitech Logo" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain transform group-hover:rotate-12 group-hover:scale-105 transition-all duration-700 filter drop-shadow-[0_0_12px_rgba(159,132,88,0.85)] brightness-110"
              />
            </div>
            <div className="flex flex-col">
              <h1 className={`text-gold font-display font-black tracking-wider leading-none transition-all duration-750 ${
                isScrolled ? 'text-xs sm:text-sm' : 'text-sm sm:text-base lg:text-xl'
              }`}>
                MARBITECH
              </h1>
              <p className={`text-white uppercase tracking-[0.35em] font-bold opacity-90 mt-1 transition-all duration-750 ${
                isScrolled ? 'text-[5px] sm:text-[6px]' : 'text-[6px] sm:text-[7px] lg:text-[8.5px]'
              }`}>
                Properties & Investment
              </p>
            </div>
          </Link>
 
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path}
                className="text-white/80 hover:text-gold transition-colors font-medium text-[10.5px] uppercase tracking-[0.25em] relative group/link"
              >
                {link.name}
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-gold transition-all duration-500 group-hover/link:w-2/3"></span>
              </Link>
            ))}
            <button 
              onClick={() => {
                document.getElementById('footer')?.scrollIntoView({behavior: 'smooth'});
                setTimeout(() => {
                  const input = document.getElementById('consultation-email') || document.getElementById('footer-email');
                  if (input) input.focus();
                }, 500);
              }}
              className="px-8 py-3 bg-gold text-primary rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transform hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(159,132,88,0.3)] transition-all duration-500"
            >
              Consult Now
            </button>
          </div>
 
          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-gold text-sm focus:outline-none h-11 w-11 flex items-center justify-center rounded-full bg-white/5 border border-white/10 shadow-lg backdrop-blur-md"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[60] bg-primary transition-all duration-700 lg:hidden flex flex-col ${
        isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
      }`}>
        <div className="flex justify-between items-center p-8 border-b border-white/5">
           <div className="flex items-center gap-3">
             <img src={logoUrl} alt="Logo" referrerPolicy="no-referrer" className="h-20 w-20 object-contain filter drop-shadow-[0_0_12px_rgba(159,132,88,0.85)] brightness-110" />
             <div className="flex flex-col">
               <span className="text-gold font-display font-black text-xl sm:text-2xl tracking-wider leading-none">MARBITECH</span>
               <span className="text-[7.5px] sm:text-[9.5px] text-white uppercase tracking-[0.35em] font-bold opacity-90 mt-1.5">Properties & Investment</span>
             </div>
           </div>
           <button onClick={() => setIsMenuOpen(false)} className="text-gold h-12 w-12 flex items-center justify-center rounded-full bg-white/5">
             <i className="fas fa-times text-2xl"></i>
           </button>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center space-y-10 px-10">
          {navLinks.map((link, i) => (
            <Link 
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="text-white text-4xl font-display font-bold hover:text-gold transition-all transform hover:scale-105"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {link.name}
            </Link>
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
