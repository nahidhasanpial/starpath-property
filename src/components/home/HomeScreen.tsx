import React, { useState } from 'react';
import { useProperty } from '../../context/PropertyContext';
import { Search, MapPin, Bed, Bath, ArrowRight, Heart, Sparkles, Phone, ShieldCheck, ChevronRight, Eye } from 'lucide-react';
import { AREAS } from '../../data/projectsData';
import { Area } from '../../types';

export const HomeScreen: React.FC = () => {
  const { 
    projects, 
    setSelectedProjectId, 
    setActiveTab, 
    setFilterState, 
    toggleSaveProject, 
    isSaved,
    openInquiryModal 
  } = useProperty();

  const [localSearch, setLocalSearch] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setFilterState(prev => ({ ...prev, searchQuery: localSearch.trim() }));
      setActiveTab('explore');
    }
  };

  const handleAreaClick = (areaName: string) => {
    setFilterState(prev => ({ ...prev, area: areaName as Area, searchQuery: '' }));
    setActiveTab('explore');
  };

  const handleProjectClick = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  // Featured projects
  const featuredProjects = projects.filter(p => p.isFeatured);

  return (
    <div className="bg-[#F8FAFC] min-h-full pb-8">
      {/* Hero Banner with Starpath Theme */}
      <div className="bg-gradient-to-b from-[#0B1F3A] via-[#0f284a] to-[#F8FAFC] px-4 pt-4 pb-6 text-white">
        <div className="flex items-center space-x-2 text-xs font-semibold text-red-400 uppercase tracking-widest mb-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Starpath Holdings Ltd.</span>
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight text-white leading-tight">
          Discover Your Next Address
        </h1>
        <p className="text-xs text-slate-300 mt-1 max-w-[320px]">
          Signature residential landmarks engineered for luxury, tranquility, and prestige across Dhaka.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="mt-4 relative">
          <div className="flex items-center bg-white rounded-2xl shadow-lg shadow-black/10 overflow-hidden border border-slate-100 p-1">
            <div className="pl-3 pr-2 text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search project, area, or road..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none font-medium"
            />
            <button
              type="submit"
              className="bg-[#0B1F3A] hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-semibold transition shrink-0"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Quick Hotline Strip */}
      <div className="mx-4 -mt-2 mb-5 bg-white rounded-2xl p-3 shadow-xs border border-slate-200/80 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Phone className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-800">Starpath Advisory Hotline</p>
            <p className="text-[10px] text-slate-500">Direct booking & unit consultation</p>
          </div>
        </div>
        <a 
          href="tel:09610969620"
          className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-xs transition"
        >
          09610969620
        </a>
      </div>

      {/* Section: Explore by Area */}
      <section className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-bold text-[#0B1F3A] tracking-tight">Explore by Area</h2>
            <p className="text-[11px] text-slate-500">Dhaka's most sought-after prime zones</p>
          </div>
          <button
            onClick={() => {
              setFilterState(prev => ({ ...prev, area: 'All' }));
              setActiveTab('explore');
            }}
            className="text-[11px] font-bold text-red-600 flex items-center space-x-0.5 hover:underline"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Area Cards Carousel */}
        <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-2">
          {AREAS.filter(a => a.name !== 'All').map((area) => (
            <div
              key={area.name}
              onClick={() => handleAreaClick(area.name)}
              className="group flex-shrink-0 w-32 bg-white rounded-2xl overflow-hidden shadow-xs border border-slate-200/80 cursor-pointer hover:shadow-md transition-all active:scale-95"
            >
              <div className="relative h-20 w-full overflow-hidden bg-slate-200">
                <img
                  src={area.image}
                  alt={area.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <span className="absolute bottom-1.5 left-2 text-[10px] font-semibold text-white/90 bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-xs">
                  {area.count} {area.count > 1 ? 'Projects' : 'Project'}
                </span>
              </div>
              <div className="p-2 text-center bg-white">
                <p className="text-xs font-bold text-slate-800 truncate">{area.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Spotlight: Peace Harbor & Anukabbo */}
      <section className="px-4 mb-6">
        <div className="bg-gradient-to-r from-[#0B1F3A] to-[#17375e] rounded-2xl p-4 text-white shadow-md relative overflow-hidden">
          <div className="relative z-10">
            <span className="bg-red-600 text-white text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full">
              New Launches
            </span>
            <h3 className="text-base font-bold mt-1.5">Peace Harbor & Starpath Anukabbo</h3>
            <p className="text-[11px] text-slate-200 mt-0.5 max-w-[280px]">
              Now welcoming bookings in Bashundhara Block-D & Aftabnagar Block-B.
            </p>
            <div className="flex items-center space-x-2 mt-3">
              <button
                onClick={() => handleProjectClick('peace-harbor')}
                className="bg-white text-[#0B1F3A] text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-slate-100 transition shadow-xs"
              >
                Peace Harbor
              </button>
              <button
                onClick={() => handleProjectClick('anukabbo')}
                className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-red-700 transition shadow-xs"
              >
                Anukabbo
              </button>
            </div>
          </div>
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
        </div>
      </section>

      {/* Section: Featured Projects */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-bold text-[#0B1F3A] tracking-tight">Featured Projects</h2>
            <p className="text-[11px] text-slate-500">Handpicked Starpath luxury residences</p>
          </div>
          <span className="text-[10px] font-semibold bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">
            {featuredProjects.length} Available
          </span>
        </div>

        {/* Project Cards List */}
        <div className="space-y-4">
          {featuredProjects.map((project) => {
            const saved = isSaved(project.id);
            return (
              <div
                key={project.id}
                className="bg-white rounded-2xl overflow-hidden shadow-xs border border-slate-200/90 hover:shadow-md transition duration-200"
              >
                {/* Project Image & Badges */}
                <div 
                  onClick={() => handleProjectClick(project.id)}
                  className="relative h-48 w-full cursor-pointer bg-slate-100 overflow-hidden group"
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                  
                  {/* Status badge */}
                  <div className="absolute top-3 left-3 flex flex-col space-y-1">
                    <span className="bg-[#0B1F3A]/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-lg">
                      {project.area}
                    </span>
                    <span className="bg-emerald-600/95 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-lg flex items-center space-x-1 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      <span>{project.availableUnits} Units Available</span>
                    </span>
                  </div>

                  {/* Save button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveProject(project.id);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-700 shadow-sm active:scale-90 transition"
                  >
                    <Heart
                      className={`w-4 h-4 transition ${
                        saved ? 'fill-red-500 text-red-500' : 'text-slate-600'
                      }`}
                    />
                  </button>

                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div>
                      <p className="text-[10px] text-slate-300 font-medium">Starting from</p>
                      <p className="text-lg font-extrabold text-white tracking-tight leading-none drop-shadow-sm">
                        {project.price}
                      </p>
                    </div>
                    <span className="text-[10px] font-semibold text-white/90 bg-black/40 px-2 py-1 rounded-lg backdrop-blur-xs">
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-3.5">
                  <div 
                    onClick={() => handleProjectClick(project.id)}
                    className="cursor-pointer"
                  >
                    <h3 className="font-bold text-slate-900 text-sm tracking-tight hover:text-[#0B1F3A]">
                      {project.name}
                    </h3>
                    <div className="flex items-center text-slate-500 text-[11px] mt-0.5">
                      <MapPin className="w-3 h-3 mr-1 text-red-600 shrink-0" />
                      <span className="truncate">{project.address}</span>
                    </div>
                  </div>

                  {/* Specs Pill Grid */}
                  <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100 text-center">
                    <div className="bg-slate-50 rounded-xl p-1.5 border border-slate-100">
                      <p className="text-[10px] text-slate-400 font-medium">Size</p>
                      <p className="text-xs font-bold text-slate-800">{project.size}</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-1.5 border border-slate-100">
                      <p className="text-[10px] text-slate-400 font-medium">Bedrooms</p>
                      <p className="text-xs font-bold text-slate-800">{project.bedrooms} Bed</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-1.5 border border-slate-100">
                      <p className="text-[10px] text-slate-400 font-medium">Bathrooms</p>
                      <p className="text-xs font-bold text-slate-800">{project.bathrooms} Bath</p>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="flex items-center space-x-2 mt-3.5">
                    <button
                      onClick={() => handleProjectClick(project.id)}
                      className="flex-1 bg-[#0B1F3A] hover:bg-slate-800 text-white text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center space-x-1 shadow-xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </button>
                    <button
                      onClick={() => openInquiryModal(project)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold py-2.5 px-3 rounded-xl transition shadow-xs"
                    >
                      Inquire
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
