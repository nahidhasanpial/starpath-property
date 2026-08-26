import React from 'react';
import { useProperty } from '../../context/PropertyContext';
import { 
  ShieldCheck, Phone, Mail, Globe, MapPin, Building, 
  ChevronRight, Heart, Sparkles, RefreshCw, FileText, CheckCircle2 
} from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const { setActiveTab, savedProjectIds, inquiries, resetToDemoDefault } = useProperty();

  return (
    <div className="bg-[#F8FAFC] min-h-full pb-14">
      {/* Profile Header */}
      <div className="bg-gradient-to-b from-[#0B1F3A] to-[#163056] text-white p-5 pt-4 pb-6">
        <div className="flex items-center space-x-3.5">
          <div className="w-14 h-14 rounded-2xl bg-white p-2 shadow-lg border border-slate-200 flex items-center justify-center">
            <img 
              src="/assets/logo.png" 
              alt="Starpath" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h1 className="text-base font-extrabold text-white tracking-tight">
                Starpath Property
              </h1>
              <span className="bg-red-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                PRO
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium">Starpath Holdings Ltd.</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Hotline: 09610969620</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 -mt-3">
        {/* Admin Mode Shortcut Card */}
        <div 
          onClick={() => setActiveTab('admin')}
          className="bg-white rounded-2xl p-4 border-2 border-red-500/30 shadow-md cursor-pointer hover:border-red-500 transition group active:scale-98"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center group-hover:scale-110 transition">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="text-sm font-extrabold text-[#0B1F3A]">
                    Starpath Admin Portal
                  </h3>
                  <span className="text-[9px] font-bold bg-red-600 text-white px-1.5 py-0.2 rounded-full">
                    Demo Mode
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Update inventory, pricing & live unit availability
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-red-600 transition" />
          </div>
        </div>

        {/* PWA Phone Installation Guide Card */}
        <div className="bg-gradient-to-r from-[#0B1F3A] to-[#1e3c66] rounded-2xl p-4 text-white shadow-md border border-slate-700">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="bg-red-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                  MOBILE APP
                </span>
                <h3 className="text-xs font-extrabold text-white">Install on Phone Home Screen</h3>
              </div>
              <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                Open <strong>starpath-property.surge.sh</strong> on your phone.
              </p>
              <ul className="text-[10px] text-slate-300 mt-1.5 space-y-0.5 list-disc list-inside">
                <li><strong>Android/Chrome:</strong> Tap <em>"Install"</em> on the bottom prompt.</li>
                <li><strong>iPhone/Safari:</strong> Tap <em>Share icon</em> → <em>"Add to Home Screen"</em>.</li>
              </ul>
            </div>
          </div>
        </div>


        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          <div 
            onClick={() => setActiveTab('saved')}
            className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs cursor-pointer hover:bg-slate-50 transition"
          >
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span className="text-xs font-bold text-slate-800">Saved Units</span>
            </div>
            <p className="text-lg font-extrabold text-[#0B1F3A] mt-1">{savedProjectIds.length}</p>
            <p className="text-[10px] text-slate-400">Shortlisted homes</p>
          </div>

          <div 
            onClick={() => setActiveTab('admin')}
            className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs cursor-pointer hover:bg-slate-50 transition"
          >
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-slate-800">Inquiries</span>
            </div>
            <p className="text-lg font-extrabold text-emerald-600 mt-1">{inquiries.length}</p>
            <p className="text-[10px] text-slate-400">Live requests logged</p>
          </div>
        </div>

        {/* Corporate Profile Card */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider">
            About Starpath Holdings Ltd.
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Starpath Holdings Ltd. is a distinguished real estate development company in Bangladesh, committed to delivering architectural excellence, structural safety, and serene modern living environments across Dhaka’s prime diplomatic and residential zones.
          </p>

          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
            <a 
              href="tel:09610969620"
              className="flex items-center justify-between text-slate-700 hover:text-[#0B1F3A]"
            >
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold">Hotline: 09610969620</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-600">Call Now</span>
            </a>

            <div className="flex items-center space-x-2 text-slate-700">
              <Mail className="w-4 h-4 text-red-500" />
              <span className="font-semibold">info@starpathholdings.com</span>
            </div>

            <div className="flex items-center space-x-2 text-slate-700">
              <MapPin className="w-4 h-4 text-slate-500" />
              <span className="font-semibold">Dhaka, Bangladesh</span>
            </div>
          </div>
        </div>

        {/* Demo Guide Checklist */}
        <div className="bg-slate-100 rounded-2xl p-4 border border-slate-200 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-[#0B1F3A]">Demo Test Flow:</h4>
            <button
              onClick={resetToDemoDefault}
              className="text-[10px] font-bold text-red-600 hover:underline flex items-center space-x-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset State</span>
            </button>
          </div>
          <ul className="space-y-1.5 text-slate-600 text-[11px]">
            <li className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Explore projects & filter by area (Gulshan, Banani, etc.)</span>
            </li>
            <li className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>View interactive Map markers & card previews</span>
            </li>
            <li className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Submit "I'm Interested" inquiry and see live confirmation</span>
            </li>
            <li className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Admin Mode: change units (7 → 6) and verify buyer view sync</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
