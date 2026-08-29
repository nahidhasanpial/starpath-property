import React, { useState } from 'react';
import { useProperty } from '../../context/PropertyContext';
import { Search, Filter, SlidersHorizontal, MapPin, Heart, Eye, Info, X, Check, Bed, ChevronDown } from 'lucide-react';
import { Area } from '../../types';

export const ExploreScreen: React.FC = () => {
  const { 
    projects, 
    filterState, 
    setFilterState, 
    resetFilters, 
    setSelectedProjectId, 
    toggleSaveProject, 
    isSaved, 
    openInquiryModal 
  } = useProperty();

  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  const areas: Area[] = ['All', 'Gulshan', 'Banani', 'Bashundhara', 'Aftabnagar', 'Uttara', 'Dhanmondi'];
  const bedroomOptions = [
    { label: 'Any Beds', value: 'all' },
    { label: '3 Beds', value: '3' },
    { label: '4 Beds', value: '4' },
  ];

  // Filtering logic
  const filteredProjects = projects.filter((p) => {
    // Search query
    if (filterState.searchQuery) {
      const q = filterState.searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchArea = p.area.toLowerCase().includes(q);
      const matchAddress = p.address.toLowerCase().includes(q);
      if (!matchName && !matchArea && !matchAddress) return false;
    }

    // Area
    if (filterState.area !== 'All' && p.area !== filterState.area) {
      return false;
    }

    // Bedrooms
    if (filterState.bedroom !== 'all') {
      const reqBeds = parseInt(filterState.bedroom);
      if (p.bedrooms !== reqBeds) return false;
    }

    // Max Price (in Crore)
    if (p.priceRaw > filterState.priceMax * 100) {
      return false;
    }

    // Status filter
    if (filterState.status && filterState.status !== 'all') {
      if (filterState.status === 'Ongoing' && p.status !== 'Ongoing') return false;
      if (filterState.status === 'Upcoming' && p.status !== 'Upcoming') return false;
      if (filterState.status === 'Handed Over' && p.status !== 'Handed Over') return false;
    }

    // Only available
    if (filterState.onlyAvailable && p.availableUnits <= 0) {
      return false;
    }

    return true;
  });

  return (
    <div className="bg-[#F8FAFC] min-h-full pb-10">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-200 px-4 pt-3 pb-3 sticky top-[57px] z-20 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-lg font-bold text-[#0B1F3A] tracking-tight">Explore Projects</h1>
            <p className="text-[11px] text-slate-500">Discover Starpath premium addresses</p>
          </div>
          <button
            onClick={() => setShowFilterDrawer(!showFilterDrawer)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
              filterState.area !== 'All' || filterState.bedroom !== 'all' || filterState.onlyAvailable
                ? 'bg-[#0B1F3A] text-white border-[#0B1F3A]'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Search Bar Input */}
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by project name or location..."
            value={filterState.searchQuery}
            onChange={(e) => setFilterState(prev => ({ ...prev, searchQuery: e.target.value }))}
            className="w-full bg-slate-100/90 text-xs font-medium text-slate-800 pl-9 pr-8 py-2.5 rounded-xl border border-transparent focus:border-slate-300 focus:bg-white focus:outline-none transition"
          />
          {filterState.searchQuery && (
            <button
              onClick={() => setFilterState(prev => ({ ...prev, searchQuery: '' }))}
              className="absolute right-3 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Project Status Filter Tabs (Ongoing vs Upcoming vs Handed Over) */}
        <div className="flex space-x-1.5 pt-2.5 border-b border-slate-100 pb-2 overflow-x-auto no-scrollbar">
          {[
            { label: 'All Projects', value: 'all' },
            { label: '🏗️ Ongoing', value: 'Ongoing' },
            { label: '✨ Upcoming', value: 'Upcoming' },
            { label: '🔑 Handed Over', value: 'Handed Over' }
          ].map((st) => (
            <button
              key={st.value}
              onClick={() => setFilterState(prev => ({ ...prev, status: st.value }))}
              className={`text-[11px] font-bold px-3 py-1 rounded-xl whitespace-nowrap transition ${
                (filterState.status || 'all') === st.value
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        {/* Horizontal Area Filter Chips */}
        <div className="flex space-x-1.5 overflow-x-auto no-scrollbar pt-2">
          {areas.map((area) => (
            <button
              key={area}
              onClick={() => setFilterState(prev => ({ ...prev, area }))}
              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap transition-all ${
                filterState.area === area
                  ? 'bg-[#0B1F3A] text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {area}
            </button>
          ))}
        </div>
      </div>


      {/* Demo Data Notice Banner */}
      <div className="mx-4 mt-3 bg-amber-50 border border-amber-200 rounded-xl p-2.5 flex items-center space-x-2">
        <Info className="w-4 h-4 text-amber-600 shrink-0" />
        <div className="text-[11px] text-amber-900 leading-tight">
          <span className="font-bold">Interactive Prototype:</span> Live presentation portfolio for Starpath Holdings Ltd.
        </div>
      </div>

      {/* Filter Drawer Modal/Accordion */}
      {showFilterDrawer && (
        <div className="mx-4 mt-3 bg-white border border-slate-200 rounded-2xl p-4 shadow-md space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Refine Selection</h3>
            <button 
              onClick={resetFilters}
              className="text-[11px] font-bold text-red-600 hover:underline"
            >
              Reset All
            </button>
          </div>

          {/* Bedrooms Filter */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-2">Bedrooms</label>
            <div className="grid grid-cols-3 gap-2">
              {bedroomOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setFilterState(prev => ({ ...prev, bedroom: opt.value }))}
                  className={`py-1.5 text-xs font-bold rounded-xl border transition ${
                    filterState.bedroom === opt.value
                      ? 'bg-[#0B1F3A] text-white border-[#0B1F3A]'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Max Price Range */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700">Max Budget</label>
              <span className="text-xs font-bold text-red-600">৳{filterState.priceMax.toFixed(1)} Crore</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="5.0"
              step="0.25"
              value={filterState.priceMax}
              onChange={(e) => setFilterState(prev => ({ ...prev, priceMax: parseFloat(e.target.value) }))}
              className="w-full accent-[#0B1F3A] h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>৳1.0 Cr</span>
              <span>৳3.0 Cr</span>
              <span>৳5.0 Cr</span>
            </div>
          </div>

          {/* Availability Checkbox */}
          <div className="flex items-center justify-between pt-1">
            <label className="text-xs font-semibold text-slate-700 cursor-pointer" htmlFor="availOnly">
              Show available units only
            </label>
            <input
              type="checkbox"
              id="availOnly"
              checked={filterState.onlyAvailable}
              onChange={(e) => setFilterState(prev => ({ ...prev, onlyAvailable: e.target.checked }))}
              className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
            />
          </div>

          <button
            onClick={() => setShowFilterDrawer(false)}
            className="w-full bg-[#0B1F3A] text-white text-xs font-bold py-2.5 rounded-xl hover:bg-slate-800 transition"
          >
            Apply Filters ({filteredProjects.length} Results)
          </button>
        </div>
      )}

      {/* Results Header */}
      <div className="px-4 mt-3 mb-2 flex items-center justify-between text-xs">
        <span className="font-bold text-slate-700">
          Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'Project' : 'Projects'}
        </span>
        {filterState.area !== 'All' && (
          <span className="text-[11px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-semibold">
            in {filterState.area}
          </span>
        )}
      </div>

      {/* Projects Grid / List */}
      <div className="px-4 space-y-4">
        {filteredProjects.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 my-6">
            <p className="text-sm font-bold text-slate-700">No matching projects found</p>
            <p className="text-xs text-slate-400 mt-1">Try adjusting your filters or area selection</p>
            <button
              onClick={resetFilters}
              className="mt-4 bg-[#0B1F3A] text-white text-xs font-bold px-4 py-2 rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredProjects.map((project) => {
            const saved = isSaved(project.id);
            return (
              <div
                key={project.id}
                className="bg-white rounded-2xl overflow-hidden shadow-xs border border-slate-200/90 hover:shadow-md transition"
              >
                {/* Image & Badges */}
                <div 
                  onClick={() => setSelectedProjectId(project.id)}
                  className="relative h-44 w-full cursor-pointer bg-slate-100 group overflow-hidden"
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* Badges */}
                  <div className="absolute top-2.5 left-2.5 flex space-x-1.5">
                    <span className="bg-[#0B1F3A]/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                      {project.area}
                    </span>
                    <span className="bg-emerald-600/95 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs shadow-xs">
                      {project.availableUnits} Units Available
                    </span>
                  </div>

                  {/* Heart */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveProject(project.id);
                    }}
                    className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-700 shadow-sm active:scale-90 transition"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        saved ? 'fill-red-500 text-red-500' : 'text-slate-600'
                      }`}
                    />
                  </button>

                  <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between">
                    <div>
                      <p className="text-[10px] text-slate-300">Price Guide</p>
                      <p className="text-base font-extrabold text-white leading-none">
                        {project.price}
                      </p>
                    </div>
                    <span className="text-[10px] font-medium text-white/90 bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3.5">
                  <div onClick={() => setSelectedProjectId(project.id)} className="cursor-pointer">
                    <h3 className="font-bold text-slate-900 text-sm tracking-tight hover:text-[#0B1F3A]">
                      {project.name}
                    </h3>
                    <div className="flex items-center text-slate-500 text-[11px] mt-0.5">
                      <MapPin className="w-3 h-3 mr-1 text-red-600 shrink-0" />
                      <span className="truncate">{project.address}</span>
                    </div>
                  </div>

                  {/* Specs row */}
                  <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 rounded-xl p-2 mt-2.5 border border-slate-100">
                    <span className="font-semibold">{project.size}</span>
                    <span className="text-slate-300">•</span>
                    <span className="font-semibold">{project.bedrooms} Bedrooms</span>
                    <span className="text-slate-300">•</span>
                    <span className="font-semibold">{project.bathrooms} Baths</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 mt-3">
                    <button
                      onClick={() => setSelectedProjectId(project.id)}
                      className="flex-1 bg-[#0B1F3A] hover:bg-slate-800 text-white text-xs font-bold py-2 rounded-xl transition flex items-center justify-center space-x-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </button>
                    <button
                      onClick={() => openInquiryModal(project)}
                      className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 text-xs font-bold py-2 px-3 rounded-xl transition"
                    >
                      Inquire
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
