import React, { useState, useMemo, useEffect } from 'react';
import { logAnalyticsEvent } from '../services/firebase';
import { PROPERTIES } from '../constants';
import { jsPDF } from 'jspdf';

const InvestmentCalculator: React.FC = () => {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('custom');
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

  const downloadReport = () => {
    try {
      // Create new PDF document
      const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });

      // Define brand colors
      const primaryColor = [11, 25, 44]; // Deep Primary Blue (#0B192C)
      const goldColor = [197, 168, 90]; // #C5A85A Gold
      const darkGray = [40, 40, 40];
      const lightGray = [240, 240, 240];

      // Helper for currency formatting inside the PDF
      const pdfFormatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-NG', {
          style: 'currency',
          currency: 'NGN',
          maximumFractionDigits: 0,
        }).format(val);
      };

      // Header Banner Background
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(0, 0, 210, 42, 'F');

      // Thin decorative Gold Line
      doc.setDrawColor(goldColor[0], goldColor[1], goldColor[2]);
      doc.setLineWidth(1.5);
      doc.line(0, 42, 210, 42);

      // Header Text: Client branding
      doc.setTextColor(255, 255, 255);
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(16);
      doc.text('MARBITECH PROPERTIES & INVESTMENT LTD.', 15, 18);
      
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
      doc.text('ELITE PORTFOLIO & WEALTH ANALYTICS', 15, 25);

      doc.setFontSize(8);
      doc.setTextColor(200, 200, 200);
      doc.text(`REPORT ID: MB-ROI-${Math.floor(100000 + Math.random() * 900000)}`, 15, 32);
      doc.text(`GENERATED: ${new Date().toLocaleDateString('en-GB')}  |  SYSTEM: SECURE_V2.6`, 140, 32);

      // Section 1: Overview Title
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('INVESTMENT ACQUISITION SUMMARY', 15, 54);

      // Thin grey underline
      doc.setDrawColor(220, 220, 220);
      doc.setLineWidth(0.5);
      doc.line(15, 57, 195, 57);

      // Summary Card / Info Grid
      doc.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
      doc.roundedRect(15, 62, 180, 48, 4, 4, 'F');

      doc.setFontSize(10);
      doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
      doc.setFont('Helvetica', 'bold');
      doc.text('Asset Selection:', 20, 70);
      doc.text('Physical Location:', 20, 77);
      doc.text('Asset Classification:', 20, 84);
      doc.text('Initial Capital Outlay:', 20, 91);
      doc.text('Target Hold Term:', 20, 98);

      // Values placement
      const currentProp = PROPERTIES.find(p => p.id === selectedPropertyId);
      const propTitle = currentProp ? currentProp.title : 'Custom Investment Plan';
      const propLoc = currentProp ? currentProp.location : 'Lagos Real Estate Corridor';
      const propType = currentProp ? currentProp.type : 'General Residential/Land portfolio';

      doc.setFont('Helvetica', 'normal');
      doc.text(propTitle, 65, 70);
      doc.text(propLoc, 65, 77);
      doc.text(propType, 65, 84);
      doc.setFont('Helvetica', 'bold');
      doc.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
      doc.text(pdfFormatCurrency(amount), 65, 91);
      doc.setFont('Helvetica', 'normal');
      doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
      doc.text('10-Year Projections Period', 65, 98);

      // Section 2: Financial Formula Metrics
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('STRATEGIC ROI & APPRECIATION MATRICES', 15, 122);
      doc.line(15, 125, 195, 125);

      // Parameters
      doc.setFontSize(10);
      doc.setFont('Helvetica', 'bold');
      doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
      doc.text('Compounding Capital Appreciation (Annual):', 15, 133);
      doc.setFont('Helvetica', 'normal');
      doc.text(`${(appreciationRate * 100).toFixed(1)}% per Annum`, 105, 133);

      doc.setFont('Helvetica', 'bold');
      doc.text('Estimated Annual Rental Income Yield Rate:', 15, 140);
      doc.setFont('Helvetica', 'normal');
      doc.text(`${(rentalYieldRate * 100).toFixed(1)}% (Calculated Linearly)`, 105, 140);

      // Projections table header
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(15, 148, 180, 8, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(8);
      doc.text('YEAR', 18, 153);
      doc.text('PROJECTED VALUE', 45, 153);
      doc.text('CUMULATIVE RENTAL INCOME', 90, 153);
      doc.text('TOTAL PORTFOLIO ESTATE', 142, 153);
      doc.text('ROI (%)', 182, 153);

      // Generate rows
      let yOffset = 156;
      doc.setFont('Helvetica', 'normal');
      doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);

      const tableYears = [1, 2, 3, 5, 7, 10];
      tableYears.forEach((year, index) => {
        const appreciation = amount * Math.pow(1 + appreciationRate, year);
        const rentalIncome = amount * rentalYieldRate * year;
        const totalValue = appreciation + rentalIncome;
        const growth = ((totalValue - amount) / amount) * 100;

        if (index % 2 === 0) {
          doc.setFillColor(248, 248, 248);
          doc.rect(15, yOffset, 180, 8, 'F');
        }

        doc.setFont('Helvetica', 'bold');
        doc.text(`Year ${year}`, 18, yOffset + 5.5);
        doc.setFont('Helvetica', 'normal');
        doc.text(pdfFormatCurrency(appreciation), 45, yOffset + 5.5);
        doc.text(pdfFormatCurrency(rentalIncome), 90, yOffset + 5.5);
        
        doc.setFont('Helvetica', 'bold');
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text(pdfFormatCurrency(totalValue), 142, yOffset + 5.5);
        
        doc.setTextColor(46, 117, 89); // Elegant Green Accent
        doc.text(`+${growth.toFixed(0)}%`, 182, yOffset + 5.5);

        // Reset text color
        doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
        yOffset += 8;
      });

      // Gold Divider line after table
      doc.setDrawColor(goldColor[0], goldColor[1], goldColor[2]);
      doc.setLineWidth(1);
      doc.line(15, yOffset, 195, yOffset);

      // Section 3: Analyst commentary notes
      yOffset += 8;
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('ANALYST EXPERT COMMENTARY', 15, yOffset);
      doc.setDrawColor(220, 220, 220);
      doc.setLineWidth(0.5);
      doc.line(15, yOffset + 2, 195, yOffset + 2);

      yOffset += 8;
      doc.setFontSize(8.5);
      doc.setFont('Helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      
      const commentary = [
        "1. Capital Appreciation: Marbitech premium real estate portfolios benefit from high supply-side entry barriers",
        "and superior construction qualities located within high-growth regions of Lagos and Abuja.",
        "2. Rental Yield Cushions: Expected stable cashflows mitigate inflationary pressure and offer physical security.",
        "3. High-Tier Diversification: Investing in Institutional Assets balances high returns with persistent tangible assets value.",
        "Note: Historical yield indicators do not guarantee identical future results. Market variables apply. Consulting an expert is advised."
      ];

      commentary.forEach((line) => {
        doc.text(line, 15, yOffset);
        yOffset += 4.5;
      });

      // Bottom Signature Banner
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(0, 282, 210, 15, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(7.5);
      doc.text('© 2026 MARBITECH PROPERTIES & INVESTMENT LTD. ALL RIGHTS RESERVED. SECURED DOCUMENT.', 15, 291);
      doc.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
      doc.text('REALIZING PROSPERITY THROUGH SOVEREIGN ASSETS', 145, 291);

      // Save PDF output
      const fileName = `Marbitech_Investment_Report_${propTitle.replace(/\s+/g, '_')}.pdf`;
      doc.save(fileName);
      
      logAnalyticsEvent('download_investment_report', { 
        property_id: selectedPropertyId,
        property_title: propTitle,
        initial_capital: amount
      });
    } catch (err) {
      console.error("PDF Generation error: ", err);
    }
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
              
              {/* Asset Dropdown Selector */}
              <div className="mb-8">
                <label className="text-gold font-bold uppercase tracking-widest text-[9px] mb-3 block">Target Asset Selection</label>
                <select 
                  value={selectedPropertyId}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSelectedPropertyId(val);
                    if (val !== 'custom') {
                      const matched = PROPERTIES.find(p => p.id === val);
                      if (matched && matched.numericPrice) {
                        setAmount(matched.numericPrice);
                        logAnalyticsEvent('roi_property_selected', { 
                          property_id: matched.id, 
                          property_title: matched.title, 
                          price: matched.numericPrice 
                        });
                      }
                    }
                  }}
                  className="w-full bg-primary/40 text-white text-[11px] border border-white/10 rounded-xl px-4 py-3.5 outline-none focus:border-gold transition-colors font-sans uppercase tracking-widest cursor-pointer"
                >
                  <option className="bg-primary text-white" value="custom">-- Custom Capital Budget --</option>
                  {PROPERTIES.map(p => (
                    <option key={p.id} className="bg-primary text-white" value={p.id}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>

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
                  onChange={(e) => {
                    setAmount(Number(e.target.value));
                    setSelectedPropertyId('custom'); // revert to custom if manually tweaking budget slider
                  }}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[25000000, 100000000, 250000000, 500000000].map((val) => (
                  <button 
                    key={val}
                    onClick={() => {
                      setAmount(val);
                      setSelectedPropertyId('custom'); // revert to custom if manually tweaking budget buttons
                    }}
                    className={`py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${
                      amount === val && selectedPropertyId === 'custom' ? 'bg-gold border-gold text-primary' : 'bg-transparent border-white/10 text-white/60 hover:border-gold/50'
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
                    <span className="text-green-400 text-sm font-bold font-sans">+{item.data.growth.toFixed(0)}% Total ROI</span>
                    <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                    <span className="text-white/40 text-xs uppercase tracking-tighter">Compounded Appreciation</span>
                  </div>
                </div>
              ))}

              {/* Dynamic Investment Report Download PDF Button Trigger */}
              <button
                onClick={downloadReport}
                className="bg-white/5 hover:bg-white/15 text-white hover:text-gold border border-white/10 hover:border-gold/30 p-6 rounded-[2.5rem] flex items-center justify-between gap-4 transition-all duration-300 group cursor-pointer animate-fade-in w-full text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-gold/10 text-gold flex items-center justify-center group-hover:bg-gold/20 transition-all">
                    <i className="fas fa-file-pdf text-lg"></i>
                  </div>
                  <div>
                    <p className="font-bold text-[10.5px] uppercase tracking-widest group-hover:text-gold transition-colors">Download Wealth Report</p>
                    <p className="text-xs text-white/50 font-light mt-0.5">Generate customized ROI PDF for your records.</p>
                  </div>
                </div>
                <div className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:text-gold group-hover:border-gold/30 transition-all">
                  <i className="fas fa-chevron-right text-xs"></i>
                </div>
              </button>
              
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
