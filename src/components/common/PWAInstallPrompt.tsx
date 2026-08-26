import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Share, PlusSquare, Check } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  useEffect(() => {
    // Check if running as installed standalone PWA
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    setIsStandalone(!!isStandaloneMode);

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Catch Android/Chrome beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else if (isIOS) {
      setShowIOSModal(true);
    }
  };

  // Do not show if already running inside installed standalone app
  if (isStandalone || bannerDismissed) return null;

  // Only show if prompt is available OR on iOS Safari
  if (!deferredPrompt && !isIOS) return null;

  return (
    <>
      {/* Floating Install Pill on Mobile / Web */}
      <div className="fixed bottom-20 left-4 right-4 z-40 max-w-[360px] mx-auto animate-in slide-in-from-bottom duration-300">
        <div className="bg-[#0B1F3A] text-white p-3 rounded-2xl shadow-2xl border border-red-500/40 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-xs">
              <img src="/assets/logo.png" alt="Starpath" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-extrabold text-xs text-white">Install Starpath App</span>
                <span className="text-[9px] bg-red-600 font-bold px-1 rounded text-white">PWA</span>
              </div>
              <p className="text-[10px] text-slate-300">Add to phone home screen for 1-tap launch</p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 shrink-0">
            <button
              onClick={handleInstallClick}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold px-3 py-1.5 rounded-xl transition shadow-xs flex items-center space-x-1 active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install</span>
            </button>

            <button
              onClick={() => setBannerDismissed(true)}
              className="p-1 rounded-full text-slate-400 hover:text-white"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* iOS Installation Instruction Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl text-slate-900 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-[#0B1F3A] p-1.5 flex items-center justify-center">
                  <img src="/assets/logo.png" alt="Starpath" className="w-full h-full object-contain bg-white rounded" />
                </div>
                <h3 className="text-sm font-extrabold text-[#0B1F3A]">Install on iPhone / iPad</h3>
              </div>
              <button
                onClick={() => setShowIOSModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3.5 text-xs text-slate-700">
              <p className="font-semibold text-slate-900">
                Install Starpath Property as a standalone app on your iPhone:
              </p>

              <div className="flex items-start space-x-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <p className="font-bold text-slate-900">Tap the Share Button</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 flex items-center">
                    Look at the bottom Safari bar and tap <Share className="w-3.5 h-3.5 inline mx-1 text-blue-600" />
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <p className="font-bold text-slate-900">Select "Add to Home Screen"</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 flex items-center">
                    Scroll down and tap <PlusSquare className="w-3.5 h-3.5 inline mx-1 text-slate-700" /> <strong>Add to Home Screen</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-emerald-50 p-3 rounded-2xl border border-emerald-200 text-emerald-900">
                <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-[11px] font-semibold leading-snug">
                  The Starpath icon will appear on your phone home screen, opening in full-screen native app mode!
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full bg-[#0B1F3A] hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs transition"
            >
              Got It!
            </button>
          </div>
        </div>
      )}
    </>
  );
};
