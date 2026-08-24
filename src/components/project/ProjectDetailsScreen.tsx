import React, { useState } from 'react';
import { useProperty } from '../../context/PropertyContext';
import { 
  ArrowLeft, Heart, MapPin, Bed, Bath, Car, Maximize2, 
  Shield, Zap, Building, Trees, Dumbbell, Sparkles, CheckCircle2, 
  Phone, Share2, Calendar, FileText, Check 
} from 'lucide-react';

export const ProjectDetailsScreen: React.FC = () => {
  const { 
    projects, 
    selectedProjectId, 
    setSelectedProjectId, 
    toggleSaveProject, 
    isSaved, 
    openInquiryModal 
  } = useProperty();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const project = projects.find(p => p.id === selectedProjectId) || projects[0];
  const saved = isSaved(project.id);

  const images = project.galleryImages && project.galleryImages.length > 0
    ? project.galleryImages
    : [project.image];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Amenity icon mapper
  const getAmenityIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('park')) return Car;
    if (lower.includes('lift') || lower.includes('elevator')) return Building;
    if (lower.includes('gen') || lower.includes('power')) return Zap;
    if (lower.includes('sec') || lower.includes('cctv') || lower.includes('guard')) return Shield;
    if (lower.includes('garden') || lower.includes('green') || lower.includes('roof')) return Trees;
    if (lower.includes('gym') || lower.includes('fitness')) return Dumbbell;
    return Sparkles;
  };

  const soldPercentage = Math.round((project.soldUnits / project.totalUnits) * 100);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-24 relative">
      {/* Top Floating Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-30 max-w-[390px] mx-auto px-4 py-3 flex items-center justify-between pointer-events-none">
        <button
          onClick={() => setSelectedProjectId(null)}
          className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-800 shadow-md pointer-events-auto hover:bg-white active:scale-95 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 pointer-events-auto">
          <button
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-800 shadow-md hover:bg-white active:scale-95 transition"
            title="Share"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => toggleSaveProject(project.id)}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md hover:bg-white active:scale-95 transition"
          >
            <Heart
              className={`w-5 h-5 transition ${
                saved ? 'fill-red-500 text-red-500' : 'text-slate-700'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Main Image Gallery */}
      <div className="relative h-80 w-full bg-slate-900">
        <img
          src={images[activeImageIndex] || project.image}
          alt={project.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/90 via-transparent to-black/30" />

        {/* Gallery pagination dots */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-1.5 z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  activeImageIndex === idx ? 'w-6 bg-white' : 'w-2 bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Overlay Badges */}
        <div className="absolute top-16 left-4 flex flex-col space-y-1">
          <span className="bg-[#0B1F3A]/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-md border border-slate-700">
            {project.area}
          </span>
          <span className="bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-lg flex items-center space-x-1 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>{project.availableUnits} Units Available</span>
          </span>
        </div>
      </div>

      {/* Project Header Info */}
      <div className="px-4 -mt-3 relative z-10">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/90">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">
                Starpath Landmark
              </span>
              <h1 className="text-xl font-extrabold text-[#0B1F3A] tracking-tight leading-tight mt-0.5">
                {project.name}
              </h1>
              <div className="flex items-center text-slate-500 text-xs mt-1">
                <MapPin className="w-3.5 h-3.5 mr-1 text-red-600 shrink-0" />
                <span>{project.address}</span>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 shrink-0 mt-1">
              {project.status}
            </span>
          </div>

          {/* Price */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between">
            <div>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">Investment Value</p>
              <p className="text-2xl font-black text-[#0B1F3A] tracking-tight">
                {project.price}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 font-medium">Handover</p>
              <p className="text-xs font-bold text-slate-700">{project.handoverDate || '2026'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Specs Card */}
      <div className="px-4 mt-4">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Specifications</h2>
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-white p-2.5 rounded-2xl border border-slate-200/80 text-center shadow-2xs">
            <Maximize2 className="w-4 h-4 mx-auto text-[#0B1F3A] mb-1" />
            <p className="text-xs font-extrabold text-slate-900">{project.size}</p>
            <p className="text-[10px] text-slate-400 font-medium">Super Builtup</p>
          </div>
          <div className="bg-white p-2.5 rounded-2xl border border-slate-200/80 text-center shadow-2xs">
            <Bed className="w-4 h-4 mx-auto text-[#0B1F3A] mb-1" />
            <p className="text-xs font-extrabold text-slate-900">{project.bedrooms} Bed</p>
            <p className="text-[10px] text-slate-400 font-medium">Bedrooms</p>
          </div>
          <div className="bg-white p-2.5 rounded-2xl border border-slate-200/80 text-center shadow-2xs">
            <Bath className="w-4 h-4 mx-auto text-[#0B1F3A] mb-1" />
            <p className="text-xs font-extrabold text-slate-900">{project.bathrooms} Bath</p>
            <p className="text-[10px] text-slate-400 font-medium">Bathrooms</p>
          </div>
          <div className="bg-white p-2.5 rounded-2xl border border-slate-200/80 text-center shadow-2xs">
            <Car className="w-4 h-4 mx-auto text-[#0B1F3A] mb-1" />
            <p className="text-xs font-extrabold text-slate-900">{project.parking} Car</p>
            <p className="text-[10px] text-slate-400 font-medium">Parking</p>
          </div>
        </div>
      </div>

      {/* Live Unit Availability Meter */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider">Unit Availability</h2>
            <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              {project.availableUnits} of {project.totalUnits} Units Left
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
            <div 
              style={{ width: `${soldPercentage}%` }} 
              className="bg-slate-300 h-full transition-all duration-500" 
              title={`Sold: ${project.soldUnits}`}
            />
            <div 
              style={{ width: `${100 - soldPercentage}%` }} 
              className="bg-emerald-500 h-full transition-all duration-500" 
              title={`Available: ${project.availableUnits}`}
            />
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3 pt-2 text-center text-xs">
            <div className="border-r border-slate-100">
              <p className="text-[10px] text-slate-400 font-medium">Total Units</p>
              <p className="font-extrabold text-slate-800 text-sm">{project.totalUnits}</p>
            </div>
            <div className="border-r border-slate-100">
              <p className="text-[10px] text-emerald-600 font-bold">Available</p>
              <p className="font-extrabold text-emerald-600 text-sm">{project.availableUnits}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-medium">Sold Out</p>
              <p className="font-extrabold text-slate-700 text-sm">{project.soldUnits}</p>
            </div>
          </div>
        </div>
      </div>

      {/* About Project */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs space-y-3">
          <h2 className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider">About Project</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            {project.description}
          </p>

          {/* Key Features Bullet Points */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <p className="text-xs font-bold text-slate-800">Key Architectural Features:</p>
              {project.keyFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Amenities Grid */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs">
          <h2 className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-3">
            Amenities & Infrastructure
          </h2>
          <div className="grid grid-cols-2 gap-2.5">
            {project.amenities.map((amenity, idx) => {
              const Icon = getAmenityIcon(amenity);
              return (
                <div 
                  key={idx}
                  className="flex items-center space-x-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100"
                >
                  <div className="w-7 h-7 rounded-lg bg-white text-[#0B1F3A] flex items-center justify-center shadow-2xs border border-slate-200">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-800">{amenity}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Location Map Preview */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider">Location & Landmark</h2>
            <span className="text-[10px] text-slate-500 font-semibold">{project.area}</span>
          </div>
          <div className="relative h-28 rounded-xl overflow-hidden bg-slate-200 flex items-center justify-center border border-slate-300">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80"
              alt="Map Preview"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-[#0B1F3A]/20" />
            <div className="absolute flex flex-col items-center">
              <div className="bg-red-600 text-white p-2 rounded-full shadow-lg animate-bounce">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="bg-[#0B1F3A] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow mt-1">
                {project.name}
              </span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-medium">
            📍 {project.address}
          </p>
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 max-w-[390px] mx-auto bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 shadow-2xl flex items-center space-x-2">
        <a
          href={`tel:${project.phone || '09610969620'}`}
          className="flex-1 bg-slate-100 hover:bg-slate-200 text-[#0B1F3A] text-xs font-bold py-3 px-3 rounded-xl transition flex items-center justify-center space-x-1.5 border border-slate-200"
        >
          <Phone className="w-4 h-4 text-emerald-600" />
          <span>Call Starpath</span>
        </a>

        <button
          onClick={() => openInquiryModal(project)}
          className="flex-[1.5] bg-[#0B1F3A] hover:bg-slate-800 text-white text-xs font-extrabold py-3 px-4 rounded-xl transition flex items-center justify-center space-x-1.5 shadow-md active:scale-95"
        >
          <Sparkles className="w-4 h-4 text-red-400" />
          <span>I'm Interested</span>
        </button>
      </div>
    </div>
  );
};
