import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Inquiry, TabType, FilterState, Area } from '../types';
import { INITIAL_PROJECTS, INITIAL_INQUIRIES } from '../data/projectsData';

interface PropertyContextType {
  projects: Project[];
  updateProject: (updated: Project) => void;
  savedProjectIds: string[];
  toggleSaveProject: (projectId: string) => void;
  isSaved: (projectId: string) => boolean;
  inquiries: Inquiry[];
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'timestamp' | 'status'>) => void;
  updateInquiryStatus: (inquiryId: string, status: Inquiry['status']) => void;
  resetToDemoDefault: () => void;
  
  // Navigation & state
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
  
  // Filters
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  
  // Inquiry modal
  isInquiryModalOpen: boolean;
  inquiryTargetProject: Project | null;
  openInquiryModal: (project: Project) => void;
  closeInquiryModal: () => void;

  // View frame toggle
  deviceFrame: boolean;
  setDeviceFrame: (val: boolean) => void;
}

const DEFAULT_FILTER: FilterState = {
  searchQuery: '',
  area: 'All',
  bedroom: 'all',
  priceMax: 5.0,
  onlyAvailable: false,
  status: 'all'
};

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('starpath_projects_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_PROJECTS;
  });

  const [savedProjectIds, setSavedProjectIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('starpath_saved_ids_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return ['grand-residence', 'peace-harbor'];
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem('starpath_inquiries_v1');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_INQUIRIES;
  });

  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [filterState, setFilterState] = useState<FilterState>(DEFAULT_FILTER);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryTargetProject, setInquiryTargetProject] = useState<Project | null>(null);
  const [deviceFrame, setDeviceFrame] = useState(true);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('starpath_projects_v1', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('starpath_saved_ids_v1', JSON.stringify(savedProjectIds));
  }, [savedProjectIds]);

  useEffect(() => {
    localStorage.setItem('starpath_inquiries_v1', JSON.stringify(inquiries));
  }, [inquiries]);

  const updateProject = (updated: Project) => {
    setProjects(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const toggleSaveProject = (projectId: string) => {
    setSavedProjectIds(prev => {
      if (prev.includes(projectId)) {
        return prev.filter(id => id !== projectId);
      } else {
        return [...prev, projectId];
      }
    });
  };

  const isSaved = (projectId: string) => savedProjectIds.includes(projectId);

  const addInquiry = (data: Omit<Inquiry, 'id' | 'timestamp' | 'status'>) => {
    const newInquiry: Inquiry = {
      ...data,
      id: `inq-${Date.now()}`,
      timestamp: 'Just now',
      status: 'New'
    };
    setInquiries(prev => [newInquiry, ...prev]);
  };

  const updateInquiryStatus = (inquiryId: string, status: Inquiry['status']) => {
    setInquiries(prev => prev.map(i => i.id === inquiryId ? { ...i, status } : i));
  };

  const resetToDemoDefault = () => {
    setProjects(INITIAL_PROJECTS);
    setInquiries(INITIAL_INQUIRIES);
    setSavedProjectIds(['grand-residence', 'peace-harbor']);
    localStorage.removeItem('starpath_projects_v1');
    localStorage.removeItem('starpath_saved_ids_v1');
    localStorage.removeItem('starpath_inquiries_v1');
  };

  const resetFilters = () => {
    setFilterState(DEFAULT_FILTER);
  };

  const openInquiryModal = (project: Project) => {
    setInquiryTargetProject(project);
    setIsInquiryModalOpen(true);
  };

  const closeInquiryModal = () => {
    setIsInquiryModalOpen(false);
  };

  return (
    <PropertyContext.Provider
      value={{
        projects,
        updateProject,
        savedProjectIds,
        toggleSaveProject,
        isSaved,
        inquiries,
        addInquiry,
        updateInquiryStatus,
        resetToDemoDefault,
        activeTab,
        setActiveTab,
        selectedProjectId,
        setSelectedProjectId,
        filterState,
        setFilterState,
        resetFilters,
        isInquiryModalOpen,
        inquiryTargetProject,
        openInquiryModal,
        closeInquiryModal,
        deviceFrame,
        setDeviceFrame
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};
