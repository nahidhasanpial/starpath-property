import React from 'react';
import { useProperty } from '../../context/PropertyContext';
import { Heart, Trash2, Eye, MapPin, Sparkles, ArrowRight, Bed, Bath } from 'lucide-react';

export const SavedScreen: React.FC = () => {
  const { projects, savedProjectIds, toggleSaveProject, setSelectedProjectId, setActiveTab, openInquiryModal } = useProperty();

  const savedProjects = projects.filter(p => savedProjectIds.includes(p.id));

  return (
    <div className="bg-[#F8FAFC] min-h-full pb-12">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-4 sticky top-[57px] z-20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-[#0B1F3A] tracking-tight">Saved Properties</h1>
            <p className="text-[11px] text-slate-500">Your shortlisted Starpath addresses</p>
          </div>
          <span className="bg-red-50 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full border border-red-100 flex items-center space-x-1">
            <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
            <span>{savedProjects.length} Saved</span>
          </span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {savedProjects.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-slate-200 shadow-2xs my-8">
            <div className="w-16 h-16 bg-red-50 text-red-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">No saved projects yet</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-[240px] mx-auto">
              Tap the heart icon on any Starpath property to bookmark it here for quick access.
            </p>
            <button
              onClick={() => setActiveTab('explore')}
              className="mt-5 bg-[#0B1F3A] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs hover:bg-slate-800 transition inline-flex items-center space-x-1.5"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          savedProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl overflow-hidden shadow-xs border border-slate-200 hover:shadow-md transition"
            >
              <div 
                onClick={() => setSelectedProjectId(project.id)}
                className="relative h-44 w-full cursor-pointer bg-slate-100 group"
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                
                <div className="absolute top-2.5 left-2.5 flex space-x-1.5">
                  <span className="bg-[#0B1F3A]/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                    {project.area}
                  </span>
                  <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                    {project.availableUnits} Available
                  </span>
                </div>

                {/* Remove heart */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSaveProject(project.id);
                  }}
                  className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-red-500 shadow-sm hover:bg-red-50 active:scale-90 transition"
                  title="Remove from saved"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between">
                  <p className="text-base font-extrabold text-white leading-none">
                    {project.price}
                  </p>
                  <span className="text-[10px] font-medium text-white/90 bg-black/40 px-2 py-0.5 rounded">
                    {project.status}
                  </span>
                </div>
              </div>

              <div className="p-3.5">
                <div onClick={() => setSelectedProjectId(project.id)} className="cursor-pointer">
                  <h3 className="font-bold text-slate-900 text-sm tracking-tight">{project.name}</h3>
                  <div className="flex items-center text-slate-500 text-[11px] mt-0.5">
                    <MapPin className="w-3 h-3 mr-1 text-red-600 shrink-0" />
                    <span className="truncate">{project.address}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 rounded-xl p-2 mt-2.5 border border-slate-100">
                  <span className="font-semibold">{project.size}</span>
                  <span>•</span>
                  <span className="font-semibold">{project.bedrooms} Bed</span>
                  <span>•</span>
                  <span className="font-semibold">{project.bathrooms} Bath</span>
                </div>

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
          ))
        )}
      </div>
    </div>
  );
};
