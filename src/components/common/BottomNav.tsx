import React from 'react';
import { useProperty } from '../../context/PropertyContext';
import { Home, Compass, MapPin, Heart, User, ShieldAlert } from 'lucide-react';
import { TabType } from '../../types';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, savedProjectIds, setSelectedProjectId } = useProperty();

  const navItems: { tab: TabType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { tab: 'home', label: 'Home', icon: Home },
    { tab: 'explore', label: 'Explore', icon: Compass },
    { tab: 'map', label: 'Map', icon: MapPin },
    { tab: 'saved', label: 'Saved', icon: Heart },
    { tab: 'profile', label: 'Profile', icon: User },
  ];

  const handleTabClick = (tab: TabType) => {
    setSelectedProjectId(null);
    setActiveTab(tab);
  };

  return (
    <nav className="sticky bottom-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.tab;
          const isSavedTab = item.tab === 'saved';

          return (
            <button
              key={item.tab}
              onClick={() => handleTabClick(item.tab)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
                isActive
                  ? 'text-[#0B1F3A] font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {/* Active indicator dot/pill */}
              {isActive && (
                <div className="absolute -top-1.5 w-7 h-1 bg-[#0B1F3A] rounded-full" />
              )}

              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 stroke-[2.4px] text-[#0B1F3A]' : 'stroke-[1.8px]'
                  } ${isSavedTab && isActive ? 'fill-red-500 text-red-500 stroke-red-500' : ''}`}
                />
                
                {/* Saved count badge */}
                {isSavedTab && savedProjectIds.length > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-red-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-xs">
                    {savedProjectIds.length}
                  </span>
                )}
              </div>

              <span
                className={`text-[10px] mt-0.5 tracking-tight ${
                  isActive ? 'font-bold text-[#0B1F3A]' : 'font-medium text-slate-500'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
