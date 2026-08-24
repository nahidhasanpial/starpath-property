import React from 'react';
import { PropertyProvider, useProperty } from './context/PropertyContext';
import { DeviceFrame } from './components/common/DeviceFrame';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { HomeScreen } from './components/home/HomeScreen';
import { ExploreScreen } from './components/explore/ExploreScreen';
import { MapScreen } from './components/map/MapScreen';
import { SavedScreen } from './components/saved/SavedScreen';
import { ProfileScreen } from './components/profile/ProfileScreen';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ProjectDetailsScreen } from './components/project/ProjectDetailsScreen';
import { InquiryModal } from './components/project/InquiryModal';

const MainContent: React.FC = () => {
  const { activeTab, selectedProjectId } = useProperty();

  // If a project is selected, show the Project Details full screen view
  if (selectedProjectId) {
    return (
      <main className="flex-1 flex flex-col relative">
        <ProjectDetailsScreen />
        <InquiryModal />
      </main>
    );
  }

  // Otherwise show the tab screen
  return (
    <div className="flex-1 flex flex-col relative">
      <Header />

      <main className="flex-1 flex flex-col">
        {activeTab === 'home' && <HomeScreen />}
        {activeTab === 'explore' && <ExploreScreen />}
        {activeTab === 'map' && <MapScreen />}
        {activeTab === 'saved' && <SavedScreen />}
        {activeTab === 'profile' && <ProfileScreen />}
        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Only show BottomNav for buyer tabs (or all tabs except detailed full screens) */}
      <BottomNav />
      <InquiryModal />
    </div>
  );
};

export default function App() {
  return (
    <PropertyProvider>
      <DeviceFrame>
        <MainContent />
      </DeviceFrame>
    </PropertyProvider>
  );
}
