import React, { useState, useEffect } from 'react';

interface ToastItem {
  id: number;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handleToastEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ message: string; type: ToastItem['type'] }>;
      const { message, type } = customEvent.detail;
      const id = Date.now();
      
      setToasts(prev => [...prev, { id, message, type }]);

      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 4000);
    };

    window.addEventListener('marbitech-toast', handleToastEvent);
    return () => window.removeEventListener('marbitech-toast', handleToastEvent);
  }, []);

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="fixed bottom-6 left-6 z-[300] flex flex-col gap-3 max-w-sm w-[calc(100vw-3rem)]">
      {toasts.map(t => (
        <div 
          key={t.id}
          className="flex items-center justify-between gap-4 p-5 rounded-2xl bg-primary text-white border border-gold/20 shadow-[0_20px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl animate-fade-up"
          role="alert"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gold/10 text-gold text-sm shrink-0">
              {t.type === 'success' && <i className="fas fa-check-circle"></i>}
              {t.type === 'info' && <i className="fas fa-info-circle"></i>}
              {t.type === 'warning' && <i className="fas fa-exclamation-triangle"></i>}
              {t.type === 'error' && <i className="fas fa-exclamation-circle"></i>}
            </div>
            <p className="text-xs font-semibold tracking-wide text-white/95 leading-relaxed">{t.message}</p>
          </div>
          <button 
            onClick={() => removeToast(t.id)}
            className="text-white/40 hover:text-gold transition-colors p-1"
          >
            <i className="fas fa-times text-xs"></i>
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
