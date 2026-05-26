
import React, { useState, useRef, useEffect } from 'react';
import { streamGeminiResponse, toolHandlers } from '../services/gemini';
import { ChatMessage } from '../types';
import { logAnalyticsEvent } from '../services/firebase';

interface GroundingLink {
  uri: string;
  title: string;
}

interface AIConsultantProps {
  inline?: boolean;
}

const AIConsultant: React.FC<AIConsultantProps> = ({ inline = false }) => {
  const [isOpen, setIsOpen] = useState(inline);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Welcome to Marbitech Properties. We are your elite real estate concierge. How may we assist your portfolio today?" }
  ]);
  const [groundingLinks, setGroundingLinks] = useState<GroundingLink[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, activeTool]);

  useEffect(() => {
    if (isOpen) {
      logAnalyticsEvent('open_ai_concierge');
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setGroundingLinks([]);
    setIsLoading(true);
    logAnalyticsEvent('ai_chat_message', { message_length: userMsg.length });

    let streamText = "";
    const onChunk = (text: string, grounding?: any[]) => {
      streamText += text;
      if (grounding) {
        const links: GroundingLink[] = grounding
          .filter(chunk => chunk.web)
          .map(chunk => ({ uri: chunk.web.uri, title: chunk.web.title }));
        if (links.length > 0) {
          setGroundingLinks(prev => {
            const newLinks = [...prev, ...links];
            const unique = Array.from(new Set(newLinks.map(l => l.uri)))
              .map(uri => newLinks.find(l => l.uri === uri)!);
            return unique;
          });
        }
      }
      setMessages(prev => {
        const updated = [...prev];
        const lastIndex = updated.length - 1;
        if (updated[lastIndex].role === 'model' && updated[lastIndex].text !== messages[messages.length-1]?.text) {
           updated[lastIndex] = { role: 'model', text: streamText };
        } else {
           updated.push({ role: 'model', text: streamText });
        }
        return updated;
      });
    };

    const onToolCall = async (name: string, args: any) => {
      setActiveTool(name);
      logAnalyticsEvent('ai_tool_call', { tool_name: name });
      try {
        const handler = (toolHandlers as any)[name];
        return handler ? await handler(args) : { error: "Tool error" };
      } finally {
        setTimeout(() => setActiveTool(null), 800);
      }
    };

    try {
      await streamGeminiResponse(messages, userMsg, onChunk, onToolCall);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Service disrupted. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (inline) {
    return (
      <div className="w-full flex flex-col h-[550px] bg-white rounded-3xl border border-zinc-200 shadow-xl overflow-hidden animate-fade-in">
        <div className="bg-primary p-5 flex items-center justify-between border-b border-gold/20">
          <div>
            <h3 className="text-gold font-display font-medium text-base tracking-wide">Elite Wealth Concierge</h3>
            <p className="text-white/50 text-[8px] uppercase tracking-widest font-bold">24/7 AI Institutional Advisor</p>
          </div>
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#FAF9F6]/50">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                msg.role === 'user' 
                ? 'bg-primary text-white shadow-md rounded-tr-none border border-primary' 
                : 'bg-white border border-zinc-200/60 shadow-xs text-primary rounded-tl-none'
              }`}>
                <div className="prose prose-sm max-w-none">
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[85%] p-4 rounded-2xl text-xs bg-white border border-zinc-200/60 text-zinc-400 flex items-center gap-2">
                <i className="fas fa-circle-notch animate-spin text-gold"></i>
                Analyzing market data...
              </div>
            </div>
          )}

          {groundingLinks.length > 0 && (
            <div className="flex flex-wrap gap-2 animate-fade-in pb-2">
              {groundingLinks.map((link, idx) => (
                <a 
                  key={idx} href={link.uri} target="_blank" rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-gold/5 border border-gold/20 text-gold text-[8.5px] font-bold rounded-full uppercase tracking-wider hover:bg-gold hover:text-primary transition-all flex items-center gap-1.5"
                >
                  <i className="fas fa-link text-[7px]"></i>
                  {link.title.substring(0, 18)}...
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="p-5 bg-white border-t border-zinc-200/80">
          <div className="flex items-center gap-3 bg-[#FAF9F6] rounded-2xl px-5 py-3 border border-zinc-200 transition-all focus-within:border-gold/40 focus-within:ring-1 focus-within:ring-gold/25">
            <input 
              type="text" value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Query property records, valuation, ROI..." 
              className="bg-transparent border-none focus:ring-0 flex-1 text-xs outline-none text-primary placeholder-zinc-400"
            />
            <button 
              onClick={handleSend} disabled={isLoading || !input.trim()}
              className="h-10 w-10 gold-button rounded-full flex items-center justify-center shrink-0 disabled:opacity-20 shadow-md"
            >
              <i className="fas fa-paper-plane text-xs"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 sm:h-16 sm:w-16 gold-button rounded-full shadow-[0_15px_30px_rgba(212,175,55,0.35)] flex items-center justify-center text-lg sm:text-xl relative border-2 border-primary"
      >
        {isOpen ? <i className="fas fa-times"></i> : <i className="fas fa-comment-alt"></i>}
      </button>

      {isOpen && (
        <div className="fixed md:absolute bottom-0 md:bottom-20 right-0 w-full md:w-[400px] lg:w-[450px] h-[80vh] md:h-[60vh] lg:h-[70vh] bg-white rounded-t-3xl md:rounded-3xl shadow-[0_25px_60px_rgba(5,26,16,0.3)] flex flex-col overflow-hidden animate-fade-up border border-zinc-200/40">
          <div className="bg-primary p-5 flex items-center justify-between border-b border-gold/20">
            <div>
              <h3 className="text-gold font-display font-medium text-sm sm:text-base">Elite Chat Concierge</h3>
              <p className="text-white/50 text-[7.5px] uppercase tracking-widest font-bold">24/7 AI Advisor</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gold/55 hover:text-gold transition-colors"><i className="fas fa-chevron-down"></i></button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#FAF9F6]/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed ${
                  msg.role === 'user' 
                  ? 'bg-primary text-white shadow-md rounded-tr-none border border-primary' 
                  : 'bg-white border border-zinc-200/60 shadow-xs text-primary rounded-tl-none'
                }`}>
                  <div className="prose prose-sm max-w-none">
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] p-4 rounded-2xl text-xs bg-white border border-zinc-200/60 text-zinc-400 flex items-center gap-2">
                  <i className="fas fa-circle-notch animate-spin text-gold"></i>
                  Formulating...
                </div>
              </div>
            )}
            
            {groundingLinks.length > 0 && (
              <div className="flex flex-wrap gap-2 animate-fade-in pb-2">
                {groundingLinks.map((link, idx) => (
                  <a 
                    key={idx} href={link.uri} target="_blank" rel="noopener noreferrer"
                    className="px-2.5 py-1 bg-gold/10 border border-gold/30 text-gold text-[8px] font-bold rounded-full uppercase tracking-widest hover:bg-gold hover:text-primary transition-all flex items-center gap-1"
                  >
                    <i className="fas fa-external-link-alt text-[7px]"></i>
                    {link.title.substring(0, 16)}...
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-zinc-100">
            <div className="flex items-center gap-3 bg-[#FAF9F6] rounded-2xl px-4 py-2 border border-zinc-100 focus-within:border-gold/30 transition-all">
              <input 
                type="text" value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Message concierge..." 
                className="bg-transparent border-none focus:ring-0 flex-1 text-xs outline-none text-primary"
              />
              <button 
                onClick={handleSend} disabled={isLoading || !input.trim()}
                className="h-8 w-8 gold-button rounded-full flex items-center justify-center disabled:opacity-20 shadow-md"
              >
                <i className="fas fa-paper-plane text-[10px]"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIConsultant;
