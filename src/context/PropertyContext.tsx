import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Inquiry, TabType, FilterState, Area } from '../types';
import { INITIAL_PROJECTS, INITIAL_INQUIRIES } from '../data/projectsData';

interface PropertyContextType {
  projects: Project[];
  addProject: (newProj: Project) => void;
  updateProject: (updated: Project) => void;
  deleteProject: (projectId: string) => void;
  savedProjectIds: string[];
  toggleSaveProject: (projectId: string) => void;
  isSaved: (projectId: string) => boolean;
  inquiries: Inquiry[];
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'timestamp' | 'status'>) => void;
  updateInquiryStatus: (inquiryId: string, status: Inquiry['status']) => void;
  resetToDemoDefault: () => void;
  
  // Admin Authentication
  isAdminLoggedIn: boolean;
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;

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
    const saved = localStorage.getItem('starpath_projects_v2');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_PROJECTS;
  });

  const [savedProjectIds, setSavedProjectIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('starpath_saved_ids_v2');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return ['barakah', 'peace-harbor'];
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem('starpath_inquiries_v2');
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
    localStorage.setItem('starpath_projects_v2', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('starpath_saved_ids_v2', JSON.stringify(savedProjectIds));
  }, [savedProjectIds]);

  useEffect(() => {
    localStorage.setItem('starpath_inquiries_v2', JSON.stringify(inquiries));
  }, [inquiries]);

  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('starpath_admin_session') === 'true';
  });

  const loginAdmin = (pin: string): boolean => {
    // Standard PINs: 1234 or admin or starpath
    const validPins = ['1234', 'admin', 'starpath', '2026'];
    if (validPins.includes(pin.trim().toLowerCase())) {
      setIsAdminLoggedIn(true);
      localStorage.setItem('starpath_admin_session', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('starpath_admin_session');
  };

  const addProject = (newProj: Project) => {
    setProjects(prev => [newProj, ...prev]);
  };

  const deleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(p => p.id !== projectId));
    setSavedProjectIds(prev => prev.filter(id => id !== projectId));
  };

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
    setSavedProjectIds(['barakah', 'peace-harbor']);
    localStorage.removeItem('starpath_projects_v2');
    localStorage.removeItem('starpath_saved_ids_v2');
    localStorage.removeItem('starpath_inquiries_v2');
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
        addProject,
        updateProject,
        deleteProject,
        savedProjectIds,
        toggleSaveProject,
        isSaved,
        inquiries,
        addInquiry,
        updateInquiryStatus,
        resetToDemoDefault,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
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
