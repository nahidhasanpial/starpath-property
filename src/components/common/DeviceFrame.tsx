import React, { useState } from 'react';
import { useProperty } from '../../context/PropertyContext';
import { 
  Smartphone, Monitor, ShieldAlert, Sparkles, RefreshCw, 
  HelpCircle, BookOpen, CheckCircle2, ChevronRight, X, Play, 
  MapPin, Eye, Edit3, Send 
} from 'lucide-react';

export const DeviceFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    deviceFrame, 
    setDeviceFrame, 
    activeTab, 
    setActiveTab, 
    projects, 
    updateProject,
    setSelectedProjectId,
    resetToDemoDefault,
    openInquiryModal,
    addInquiry
  } = useProperty();

  const [showDemoGuide, setShowDemoGuide] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const grandResidence = projects.find(p => p.id === 'grand-residence');

  const handleSimulateSync = () => {
    if (grandResidence) {
      updateProject({
        ...grandResidence,
        availableUnits: 6,
        soldUnits: 14
      });
      setSelectedProjectId('grand-residence');
    }
  };

  const handleSimulateInquiry = () => {
    if (grandResidence) {
      addInquiry({
        projectId: grandResidence.id,
        projectName: grandResidence.name,
        projectArea: grandResidence.area,
        fullName: 'Managing Director Office',
        phone: '01711998877',
        email: 'md@starpathholdings.com',
        message: 'Requesting VIP site inspection and pent-house floor plan brochure.',
        preferredDate: 'Tomorrow, 11:30 AM'
      });
      setActiveTab('admin');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-start sm:py-6 selection:bg-red-500 selection:text-white">
      {/* Top Presentation Bar for Management & Demo Review */}
      <div className="w-full max-w-4xl px-4 mb-4 hidden sm:flex items-center justify-between bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-2.5 shadow-xl text-xs text-slate-300">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <img src="/assets/logo.png" alt="Starpath" className="w-6 h-6 object-contain bg-white rounded p-0.5" />
            <span className="font-extrabold text-white tracking-wide">STARPATH PROTOTYPE</span>
          </div>

          <div className="h-4 w-px bg-slate-700" />

          {/* Quick Demo Status Badge */}
          <div className="flex items-center space-x-1.5 bg-slate-800/80 px-2.5 py-1 rounded-xl border border-slate-700 text-[11px]">
            <Sparkles className="w-3 h-3 text-red-400" />
            <span>Grand Residence:</span>
            <span className="font-mono font-bold text-emerald-400">
              {grandResidence ? `${grandResidence.availableUnits} Units Available` : '7 Units'}
            </span>
          </div>
        </div>

        {/* Action Shortcuts */}
        <div className="flex items-center space-x-2">
          {/* Office Presentation Guide Trigger */}
          <button
            onClick={() => setShowDemoGuide(true)}
            className="flex items-center space-x-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold px-2.5 py-1.5 rounded-xl border border-amber-500/40 transition shadow-xs"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Office Demo Script</span>
          </button>

          {/* Quick Demo trigger */}
          <button
            onClick={() => {
              setSelectedProjectId(null);
              setActiveTab('admin');
            }}
            className="flex items-center space-x-1 bg-red-600/90 hover:bg-red-600 text-white font-bold px-2.5 py-1.5 rounded-xl transition shadow-xs"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Admin Portal</span>
          </button>

          {/* Reset Demo */}
          <button
            onClick={() => {
              resetToDemoDefault();
              setSelectedProjectId(null);
              setActiveTab('home');
            }}
            className="flex items-center space-x-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold px-2 py-1.5 rounded-xl border border-slate-700 transition"
            title="Reset demo data to default"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset</span>
          </button>

          {/* Frame Toggle */}
          <button
            onClick={() => setDeviceFrame(!deviceFrame)}
            className="flex items-center space-x-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-2.5 py-1.5 rounded-xl border border-slate-700 transition"
          >
            {deviceFrame ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
            <span>{deviceFrame ? 'Expand View' : '390×844 Frame'}</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div
        className="w-full max-w-md min-h-screen bg-[#F8FAFC] relative flex flex-col shadow-2xl sm:border-x sm:border-slate-800"
      >
        {/* Inner Screen Content */}
        <div className="flex-1 flex flex-col relative overflow-x-hidden min-h-screen">
          {children}
        </div>
      </div>


      {/* Presentation Companion Modal */}
      {showDemoGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-slate-900 text-white rounded-3xl border border-slate-700 shadow-2xl p-5 overflow-hidden flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">Office Demo Presenter Guide</h3>
                  <p className="text-[11px] text-slate-400">Step-by-step presentation script & instant triggers</p>
                </div>
              </div>
              <button
                onClick={() => setShowDemoGuide(false)}
                className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3.5 text-xs">
              {/* Step 1 */}
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-red-400">Step 1: Introduction & Featured Projects</span>
                  <button
                    onClick={() => {
                      setSelectedProjectId(null);
                      setActiveTab('home');
                      setShowDemoGuide(false);
                    }}
                    className="bg-slate-700 hover:bg-slate-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg"
                  >
                    Go to Home
                  </button>
                </div>
                <p className="text-slate-300 text-[11px] mt-1">
                  Highlight <strong>Peace Harbor</strong> (Bashundhara D-Block, 2,400 sq.ft.) and <strong>Starpath Anukabbo</strong> (Aftabnagar B-Block, 1,740 sq.ft.).
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-red-400">Step 2: Interactive Dhaka Map</span>
                  <button
                    onClick={() => {
                      setSelectedProjectId(null);
                      setActiveTab('map');
                      setShowDemoGuide(false);
                    }}
                    className="bg-slate-700 hover:bg-slate-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg"
                  >
                    Go to Map
                  </button>
                </div>
                <p className="text-slate-300 text-[11px] mt-1">
                  Show markers across Banani, Gulshan, Bashundhara, and Aftabnagar with clickable popup cards.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-red-400">Step 3: Starpath Grand Residence</span>
                  <button
                    onClick={() => {
                      setSelectedProjectId('grand-residence');
                      setShowDemoGuide(false);
                    }}
                    className="bg-slate-700 hover:bg-slate-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg"
                  >
                    View Project
                  </button>
                </div>
                <p className="text-slate-300 text-[11px] mt-1">
                  Show starting state of <strong>7 Units Available</strong>, specs (3,600 sqft, 4 Bed, 5 Bath), and amenities.
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-emerald-950/50 border border-emerald-700/60 rounded-2xl p-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-400">⭐ Step 4: The 7 → 6 Live Sync Magic Moment</span>
                  <button
                    onClick={() => {
                      handleSimulateSync();
                      setShowDemoGuide(false);
                    }}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-sm"
                  >
                    1-Click 7 → 6 Sync
                  </button>
                </div>
                <p className="text-emerald-200 text-[11px] mt-1">
                  Demonstrates management adjusting unit availability down to <strong>6 units</strong>, updating buyer screens instantly.
                </p>
              </div>

              {/* Step 5 */}
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-red-400">Step 5: Admin Dashboard & Live Inquiries</span>
                  <button
                    onClick={() => {
                      setSelectedProjectId(null);
                      setActiveTab('admin');
                      setShowDemoGuide(false);
                    }}
                    className="bg-slate-700 hover:bg-slate-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg"
                  >
                    Go to Admin
                  </button>
                </div>
                <p className="text-slate-300 text-[11px] mt-1">
                  Show KPI metrics (Projects, Available Units, Inquiries) and customer lead management.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
              <button
                onClick={() => {
                  resetToDemoDefault();
                  setSelectedProjectId(null);
                  setActiveTab('home');
                  setShowDemoGuide(false);
                }}
                className="text-red-400 hover:text-red-300 text-xs font-semibold flex items-center space-x-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Demo to Defaults</span>
              </button>

              <button
                onClick={() => setShowDemoGuide(false)}
                className="bg-white text-slate-900 font-bold px-4 py-1.5 rounded-xl text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

