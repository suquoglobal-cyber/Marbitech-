
import React, { useState } from 'react';
import { generatePropertyVision } from '../services/gemini';
import { logAnalyticsEvent } from '../services/firebase';

const VisionLab: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    
    logAnalyticsEvent('vision_generation_start', { prompt_length: prompt.length });
    
    const result = await generatePropertyVision(prompt);
    if (result) {
      setImage(result);
      logAnalyticsEvent('vision_generation_success');
    } else {
      logAnalyticsEvent('vision_generation_failed');
      alert("Vision generation failed. Please refine your description.");
    }
    setIsGenerating(false);
  };

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold rounded-full blur-[200px] -translate-y-1/2 translate-x-1/2"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 text-left">
            <span className="text-gold font-bold uppercase tracking-[0.5em] text-[10px] mb-6 block">Marbitech Innovation Lab</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 leading-tight">
              Design Your <br/><span className="gold-gradient">Legacy Estate</span>
            </h2>
            <p className="text-white/60 text-lg md:text-xl mb-12 font-light leading-relaxed">
              Experience the future of property development and interior architecture. Use our AI Visionary engine to conceptualize your custom luxury villa or bespoke interiors before the first stone is laid.
            </p>

            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8">
                <label className="text-gold font-bold uppercase tracking-widest text-[9px] mb-4 block">Dream Description</label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. A royal living room with gold-vein marble floors, floor-to-ceiling glass walls, and bespoke velvet furnishings..."
                  className="w-full bg-transparent border-none text-white focus:ring-0 placeholder:text-white/20 text-lg font-light resize-none h-32 outline-none"
                />
                <button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="gold-button w-full py-5 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-4 mt-4 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <i className="fas fa-atom fa-spin"></i>
                      Architecting Vision...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-wand-magic-sparkles"></i>
                      Generate Blueprint
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="relative group aspect-square lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden border-2 border-gold/30 bg-black/40 shadow-2xl">
              {image ? (
                <img 
                  src={image} 
                  alt="AI Generated Concept" 
                  className="w-full h-full object-cover animate-fade-in"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                  <div className="h-24 w-24 bg-gold/10 rounded-full flex items-center justify-center text-gold mb-8 animate-pulse">
                    <i className="fas fa-camera-retro text-4xl"></i>
                  </div>
                  <h4 className="text-white font-display text-2xl mb-4">Awaiting Blueprint</h4>
                  <p className="text-white/40 text-sm font-light">Describe your vision to see it rendered in high-definition luxury.</p>
                </div>
              )}
              
              {isGenerating && (
                <div className="absolute inset-0 bg-primary/60 backdrop-blur-md flex flex-col items-center justify-center">
                  <div className="w-20 h-20 border-4 border-gold border-t-transparent rounded-full animate-spin mb-6"></div>
                  <p className="text-gold font-bold uppercase tracking-widest text-[10px]">Processing 8K Textures...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionLab;
