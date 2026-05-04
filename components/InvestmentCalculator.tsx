
import React, { useState, useMemo, useEffect } from 'react';
import { logAnalyticsEvent } from '../services/firebase';

const InvestmentCalculator: React.FC = () => {
  const [amount, setAmount] = useState<number>(50000000); // Default 50M
  const appreciationRate = 0.15; // 15% annual
  const rentalYieldRate = 0.05; // 5% annual

  const projections = useMemo(() => {
    const calcYear = (year: number) => {
      const appreciation = amount * Math.pow(1 + appreciationRate, year);
      const rentalIncome = amount * rentalYieldRate * year;
      return {
        totalValue: appreciation + rentalIncome,
        growth: ((appreciation + rentalIncome - amount) / amount) * 100
      };
    };

    return {
      year5: calcYear(5),
      year10: calcYear(10),
    };
  }, [amount]);

  // Debounced analytics logging for the range slider
  useEffect(() => {
    const timer = setTimeout(() => {
      logAnalyticsEvent('roi_calculation', { initial_capital: amount });
    }, 1500);
    return () => clearTimeout(timer);
  }, [amount]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="calculator" className="py-24 bg-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-gold rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gold rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-gold font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">Wealth Analytics</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Strategic ROI <span className="gold-gradient">Projections</span></h2>
            <p className="text-white/60 max-w-2xl mx-auto font-light">
              Calculate the potential growth of your capital through Marbitech's high-yield real estate assets. Based on historical Nigerian market data.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Input Side */}
            <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border border-white/10 flex flex-col justify-center">
              <label className="text-gold font-bold uppercase tracking-widest text-[10px] mb-6 block">Initial Capital Investment</label>
              
              <div className="mb-10">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-white/40 text-xs font-medium">Amount</span>
                  <span className="text-gold text-2xl font-display font-bold">{formatCurrency(amount)}</span>
                </div>
                <input 
                  type="range" 
                  min="5000000" 
                  max="1000000000" 
                  step="5000000"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[25000000, 100000000, 250000000, 500000000].map((val) => (
                  <button 
                    key={val}
                    onClick={() => setAmount(val)}
                    className={`py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${
                      amount === val ? 'bg-gold border-gold text-primary' : 'bg-transparent border-white/10 text-white/60 hover:border-gold/50'
                    }`}
                  >
                    {val >= 100000000 ? `${val / 100000000}00M` : `${val / 1000000}M`} Tier
                  </button>
                ))}
              </div>
            </div>

            {/* Results Side */}
            <div className="grid grid-cols-1 gap-6">
              {[
                { label: '5-Year Forecast', data: projections.year5, color: 'gold' },
                { label: '10-Year Forecast', data: projections.year10, color: 'white' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <i className="fas fa-chart-line text-6xl text-gold"></i>
                  </div>
                  <p className="text-gold font-bold uppercase tracking-widest text-[9px] mb-4">{item.label}</p>
                  <h4 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">{formatCurrency(item.data.totalValue)}</h4>
                  <div className="flex items-center gap-3">
                    <span className="text-green-400 text-sm font-bold">+{item.data.growth.toFixed(0)}% Total ROI</span>
                    <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                    <span className="text-white/40 text-xs uppercase tracking-tighter">Compounded Appreciation</span>
                  </div>
                </div>
              ))}
              
              <div className="bg-gold p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-primary">
                  <p className="font-bold text-xs uppercase tracking-widest mb-1">Ready to start?</p>
                  <p className="text-sm font-medium opacity-80">Our consultants are ready to structure your portfolio.</p>
                </div>
                <button 
                  onClick={() => {
                    logAnalyticsEvent('consult_expert_click', { source: 'calculator' });
                    document.getElementById('footer')?.scrollIntoView({behavior: 'smooth'});
                  }}
                  className="bg-primary text-gold px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-2xl"
                >
                  Consult an Expert
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentCalculator;
