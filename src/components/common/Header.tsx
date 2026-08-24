import React from 'react';
import { useProperty } from '../../context/PropertyContext';
import { ShieldCheck, Phone, RefreshCw } from 'lucide-react';

export const Header: React.FC = () => {
  const { setActiveTab, resetToDemoDefault, inquiries } = useProperty();

  return (
    <header className="sticky top-0 z-30 bg-[#0B1F3A] text-white px-4 py-3 shadow-md border-b border-slate-800">
      <div className="flex items-center justify-between">
        {/* Starpath Logo and Branding */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center space-x-2.5 cursor-pointer select-none"
        >
          <div className="w-9 h-9 rounded-lg bg-white p-1 flex items-center justify-center shadow-sm overflow-hidden border border-slate-200">
            <img 
              src="/assets/logo.png" 
              alt="Starpath Holdings Ltd." 
              className="w-full h-full object-contain"
              onError={(e) => {
                // fallback if image not loaded
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-[15px] tracking-tight text-white leading-none">
                STARPATH
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider bg-red-600 text-white px-1.5 py-0.5 rounded leading-none">
                PROPERTY
              </span>
            </div>
            <p className="text-[10px] text-slate-300 tracking-wide font-medium mt-0.5">
              Starpath Holdings Ltd.
            </p>
          </div>
        </div>

        {/* Action icons / Admin shortcut */}
        <div className="flex items-center space-x-2">
          <a
            href="tel:09610969620"
            className="flex items-center space-x-1 text-xs bg-slate-800/80 hover:bg-slate-700 text-slate-200 px-2.5 py-1.5 rounded-full border border-slate-700 transition"
            title="Call Starpath"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] font-semibold">09610969620</span>
          </a>

          <button
            onClick={() => setActiveTab('admin')}
            className="relative p-1.5 rounded-full bg-slate-800 hover:bg-red-950/60 text-slate-200 hover:text-red-400 border border-slate-700 transition"
            title="Admin Portal"
          >
            <ShieldCheck className="w-4 h-4" />
            {inquiries.filter(i => i.status === 'New').length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {inquiries.filter(i => i.status === 'New').length}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
