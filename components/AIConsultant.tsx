
import React, { useState, useRef, useEffect } from 'react';
import { streamGeminiResponse, toolHandlers } from '../services/gemini';
import { ChatMessage } from '../types';
import { logAnalyticsEvent } from '../services/firebase';

interface GroundingLink {
  uri: string;
  title: string;
}

const AIConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="h-12 w-12 sm:h-16 sm:w-16 gold-button rounded-full shadow-2xl flex items-center justify-center text-xl sm:text-2xl relative border-2 border-primary"
      >
        {isOpen ? <i className="fas fa-times"></i> : <i className="fas fa-gem"></i>}
      </button>

      {isOpen && (
        <div className="fixed md:absolute bottom-0 md:bottom-20 right-0 w-full md:w-[400px] lg:w-[450px] h-[90vh] md:h-[60vh] lg:h-[70vh] bg-white rounded-t-3xl md:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fade-up">
          <div className="bg-primary p-4 sm:p-5 flex items-center justify-between border-b border-gold/20">
            <div>
              <h3 className="text-gold font-display font-bold text-sm sm:text-base">Elite Concierge</h3>
              <p className="text-white/50 text-[7px] sm:text-[8px] uppercase tracking-widest font-black">AI Powered Advisor</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gold/50 hover:text-gold"><i className="fas fa-chevron-down"></i></button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 sm:space-y-6 bg-gray-50/30">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-3 sm:p-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user' ? 'bg-primary text-white shadow-md' : 'bg-white border border-gray-100 shadow-sm'
                }`}>
                  <div className="prose prose-sm max-w-none">
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            
            {groundingLinks.length > 0 && (
              <div className="flex flex-wrap gap-2 animate-fade-in pb-2">
                {groundingLinks.map((link, idx) => (
                  <a 
                    key={idx} href={link.uri} target="_blank" rel="noopener noreferrer"
                    className="px-2 py-1 bg-gold/10 border border-gold/30 text-gold text-[8px] font-bold rounded-full uppercase tracking-tighter hover:bg-gold hover:text-primary transition-all flex items-center gap-1"
                  >
                    <i className="fas fa-external-link-alt text-[7px]"></i>
                    {link.title.substring(0, 20)}...
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 sm:p-5 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 rounded-xl sm:rounded-2xl px-4 py-2 sm:py-3 border border-gray-100 focus-within:border-gold/40 transition-all">
              <input 
                type="text" value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask our experts..." 
                className="bg-transparent border-none focus:ring-0 flex-1 text-xs sm:text-sm outline-none"
              />
              <button 
                onClick={handleSend} disabled={isLoading || !input.trim()}
                className="h-8 w-8 sm:h-10 sm:w-10 gold-button rounded-full flex items-center justify-center disabled:opacity-20"
              >
                <i className="fas fa-paper-plane text-[10px] sm:text-sm"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIConsultant;
