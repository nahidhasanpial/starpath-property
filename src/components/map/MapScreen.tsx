import React, { useEffect, useRef, useState } from 'react';
import { useProperty } from '../../context/PropertyContext';
import { Project } from '../../types';
import { MapPin, Eye, Phone, Layers, List, Navigation, ChevronRight, X, Sparkles, Building2 } from 'lucide-react';
import L from 'leaflet';

export const MapScreen: React.FC = () => {
  const { projects, setSelectedProjectId, openInquiryModal } = useProperty();
  
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  const [selectedMarkerProject, setSelectedMarkerProject] = useState<Project | null>(projects[0] || null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [activeAreaFilter, setActiveAreaFilter] = useState<string>('All');

  const areas = ['All', 'Banani', 'Gulshan', 'Bashundhara', 'Aftabnagar', 'Uttara', 'Dhanmondi'];

  // Initialize Leaflet Map
  useEffect(() => {
    if (viewMode !== 'map' || !mapContainerRef.current) return;

    if (!leafletMapRef.current) {
      // Center on Dhaka City [23.7937, 90.4043]
      const map = L.map(mapContainerRef.current, {
        center: [23.7937, 90.4143],
        zoom: 12.5,
        zoomControl: false,
        attributionControl: false
      });

      // High contrast modern carto map tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(map);

      // Add zoom control at top right
      L.control.zoom({ position: 'topright' }).addTo(map);

      leafletMapRef.current = map;
    }

    const map = leafletMapRef.current;

    // Clear old markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Filter projects for map
    const displayProjects = activeAreaFilter === 'All' 
      ? projects 
      : projects.filter(p => p.area === activeAreaFilter);

    // Create custom Starpath pins for each project
    displayProjects.forEach(project => {
      const isSelected = selectedMarkerProject?.id === project.id;
      
      const customHtml = `
        <div class="custom-starpath-pin cursor-pointer transform -translate-x-1/2 -translate-y-full flex flex-col items-center">
          <div class="flex items-center space-x-1 px-2 py-1 rounded-full shadow-lg ${
            isSelected 
              ? 'bg-red-600 text-white ring-2 ring-white scale-110' 
              : 'bg-[#0B1F3A] text-white border border-slate-700 hover:bg-red-600'
          } transition-all duration-200">
            <span class="w-1.5 h-1.5 rounded-full ${project.availableUnits > 0 ? 'bg-emerald-400' : 'bg-slate-400'} animate-pulse"></span>
            <span class="text-[10px] font-bold whitespace-nowrap">${project.name.replace('Starpath ', '')}</span>
          </div>
          <div class="w-2 h-2 bg-current ${isSelected ? 'text-red-600' : 'text-[#0B1F3A]'} transform rotate-45 -mt-1 shadow-sm"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'starpath-custom-icon',
        html: customHtml,
        iconSize: [120, 40],
        iconAnchor: [60, 40]
      });

      const marker = L.marker(project.coordinates, { icon: customIcon }).addTo(map);
      
      marker.on('click', () => {
        setSelectedMarkerProject(project);
        map.panTo(project.coordinates, { animate: true, duration: 0.8 });
      });

      markersRef.current[project.id] = marker;
    });

    return () => {
      // Cleanup on unmount handled
    };
  }, [viewMode, projects, activeAreaFilter, selectedMarkerProject?.id]);

  // Handle click on area filter button
  const handleAreaFocus = (areaName: string) => {
    setActiveAreaFilter(areaName);
    if (!leafletMapRef.current) return;

    if (areaName === 'All') {
      leafletMapRef.current.flyTo([23.7937, 90.4143], 12.5);
    } else {
      const match = projects.find(p => p.area === areaName);
      if (match) {
        leafletMapRef.current.flyTo(match.coordinates, 14.5);
        setSelectedMarkerProject(match);
      }
    }
  };

  // Keep selected marker updated with live context state
  useEffect(() => {
    if (selectedMarkerProject) {
      const updated = projects.find(p => p.id === selectedMarkerProject.id);
      if (updated && updated.availableUnits !== selectedMarkerProject.availableUnits) {
        setSelectedMarkerProject(updated);
      }
    }
  }, [projects, selectedMarkerProject]);

  return (
    <div className="relative w-full h-[calc(100vh-125px)] min-h-[550px] bg-slate-900 overflow-hidden flex flex-col">
      {/* Top Map Control Bar */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-col space-y-2 pointer-events-none">
        <div className="flex items-center justify-between pointer-events-auto">
          {/* Map/List Switcher */}
          <div className="bg-white/95 backdrop-blur-md p-1 rounded-2xl shadow-lg border border-slate-200/80 flex space-x-1">
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                viewMode === 'map'
                  ? 'bg-[#0B1F3A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Map View</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                viewMode === 'list'
                  ? 'bg-[#0B1F3A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>List View</span>
            </button>
          </div>

          {/* Starpath Location Counter Badge */}
          <div className="bg-[#0B1F3A]/95 text-white text-[11px] font-bold px-3 py-1.5 rounded-2xl shadow-lg backdrop-blur-md border border-slate-700 flex items-center space-x-1.5">
            <Building2 className="w-3.5 h-3.5 text-red-400" />
            <span>{projects.length} Starpath Sites</span>
          </div>
        </div>

        {/* Quick Area Jump Horizontal Scroll */}
        {viewMode === 'map' && (
          <div className="flex space-x-1.5 overflow-x-auto no-scrollbar pointer-events-auto py-1">
            {areas.map(area => (
              <button
                key={area}
                onClick={() => handleAreaFocus(area)}
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md transition-all whitespace-nowrap shadow-xs ${
                  activeAreaFilter === area
                    ? 'bg-red-600 text-white'
                    : 'bg-white/90 text-slate-800 hover:bg-white border border-slate-200'
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Map View */}
      {viewMode === 'map' ? (
        <div className="relative w-full h-full">
          <div ref={mapContainerRef} className="w-full h-full" />

          {/* Selected Project Bottom Card Popup */}
          {selectedMarkerProject && (
            <div className="absolute bottom-3 left-3 right-3 z-20 animate-in slide-in-from-bottom duration-200">
              <div className="bg-white rounded-2xl p-3.5 shadow-2xl border border-slate-200/90 relative">
                <button
                  onClick={() => setSelectedMarkerProject(null)}
                  className="absolute top-2.5 right-2.5 p-1 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100"
                >
                  <X className="w-3.5 h-3.5" />
                </button>

                <div className="flex space-x-3">
                  {/* Thumbnail */}
                  <div 
                    onClick={() => setSelectedProjectId(selectedMarkerProject.id)}
                    className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 relative shrink-0 cursor-pointer"
                  >
                    <img
                      src={selectedMarkerProject.image}
                      alt={selectedMarkerProject.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 left-1 text-[9px] font-bold bg-[#0B1F3A]/90 text-white px-1.5 py-0.5 rounded">
                      {selectedMarkerProject.area}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-1">
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          {selectedMarkerProject.availableUnits} Units Available
                        </span>
                      </div>
                      <h4 
                        onClick={() => setSelectedProjectId(selectedMarkerProject.id)}
                        className="text-sm font-extrabold text-slate-900 truncate mt-1 cursor-pointer hover:text-[#0B1F3A]"
                      >
                        {selectedMarkerProject.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate">{selectedMarkerProject.address}</p>
                      
                      {/* Specs */}
                      <p className="text-[11px] font-semibold text-slate-700 mt-1">
                        {selectedMarkerProject.size} · {selectedMarkerProject.bedrooms} Bed · {selectedMarkerProject.bathrooms} Bath
                      </p>
                    </div>

                    {/* Action */}
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => setSelectedProjectId(selectedMarkerProject.id)}
                        className="flex-1 bg-[#0B1F3A] hover:bg-slate-800 text-white text-xs font-bold py-1.5 px-3 rounded-xl transition flex items-center justify-center space-x-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </button>
                      <button
                        onClick={() => openInquiryModal(selectedMarkerProject)}
                        className="bg-red-50 text-red-600 border border-red-200 text-xs font-bold py-1.5 px-2.5 rounded-xl hover:bg-red-100 transition"
                      >
                        Inquire
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* List Mode Alternative */
        <div className="flex-1 overflow-y-auto bg-[#F8FAFC] p-4 space-y-3 pb-8">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Dhaka Project Locations ({projects.length})
            </h3>
          </div>
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProjectId(project.id)}
              className="bg-white rounded-2xl p-3 border border-slate-200/90 shadow-xs flex items-center space-x-3 cursor-pointer hover:shadow-md transition"
            >
              <img
                src={project.image}
                alt={project.name}
                className="w-16 h-16 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{project.area}</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                    {project.availableUnits} Available
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 truncate mt-0.5">{project.name}</h4>
                <p className="text-[10px] text-slate-500 truncate">{project.address}</p>
                <p className="text-[11px] font-extrabold text-[#0B1F3A] mt-1">{project.price}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
