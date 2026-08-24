import React, { useState } from 'react';
import { Project, Area, PropertyStatus } from '../../types';
import { X, Save, AlertCircle, Sparkles, Check } from 'lucide-react';

interface EditProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: Project) => void;
}

export const EditProjectModal: React.FC<EditProjectModalProps> = ({
  project,
  isOpen,
  onClose,
  onSave,
}) => {
  if (!isOpen || !project) return null;

  const [name, setName] = useState(project.name);
  const [area, setArea] = useState<Area>(project.area);
  const [address, setAddress] = useState(project.address);
  const [price, setPrice] = useState(project.price);
  const [size, setSize] = useState(project.size);
  const [bedrooms, setBedrooms] = useState(project.bedrooms);
  const [bathrooms, setBathrooms] = useState(project.bathrooms);
  const [availableUnits, setAvailableUnits] = useState(project.availableUnits);
  const [totalUnits, setTotalUnits] = useState(project.totalUnits);
  const [status, setStatus] = useState<PropertyStatus>(project.status);
  const [description, setDescription] = useState(project.description);

  const [showSavedFeedback, setShowSavedFeedback] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updated: Project = {
      ...project,
      name,
      area,
      address,
      price,
      size,
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      availableUnits: Number(availableUnits),
      totalUnits: Number(totalUnits),
      soldUnits: Math.max(0, Number(totalUnits) - Number(availableUnits)),
      status,
      description,
    };

    onSave(updated);
    setShowSavedFeedback(true);
    setTimeout(() => {
      setShowSavedFeedback(false);
      onClose();
    }, 800);
  };

  const areas: Area[] = ['Gulshan', 'Banani', 'Bashundhara', 'Aftabnagar', 'Uttara', 'Dhanmondi'];
  const statuses: PropertyStatus[] = ['Ready to Move', 'Under Construction', 'Almost Sold Out', 'Upcoming'];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-[390px] bg-white rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-white px-5 py-3.5 border-b border-slate-100 flex items-center justify-between z-10">
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
              <h3 className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider">
                Starpath Property Editor
              </h3>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Edit Project Details</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Demo Callout banner */}
        <div className="mx-4 mt-3 bg-red-50 border border-red-200 rounded-xl p-2.5 flex items-start space-x-2">
          <Sparkles className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div className="text-[11px] text-red-900 leading-tight">
            <span className="font-bold">Live Management Demo:</span>
            <br />
            Change <span className="underline font-bold">Available Units ({project.availableUnits})</span> to test instant buyer-side synchronization.
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3.5">
          {/* Project Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Project Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:border-[#0B1F3A] focus:outline-none"
            />
          </div>

          {/* Area & Status row */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Area</label>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value as Area)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:border-[#0B1F3A] focus:outline-none"
              >
                {areas.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as PropertyStatus)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:border-[#0B1F3A] focus:outline-none"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Location Address</label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:border-[#0B1F3A] focus:outline-none"
            />
          </div>

          {/* Price & Size */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Price Display</label>
              <input
                type="text"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:border-[#0B1F3A] focus:outline-none"
                placeholder="e.g. ৳2.50 Crore"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Size</label>
              <input
                type="text"
                required
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:border-[#0B1F3A] focus:outline-none"
                placeholder="e.g. 3,600 sq. ft."
              />
            </div>
          </div>

          {/* Bedrooms & Bathrooms */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Bedrooms</label>
              <input
                type="number"
                min="1"
                max="10"
                value={bedrooms}
                onChange={(e) => setBedrooms(parseInt(e.target.value) || 1)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:border-[#0B1F3A] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Bathrooms</label>
              <input
                type="number"
                min="1"
                max="10"
                value={bathrooms}
                onChange={(e) => setBathrooms(parseInt(e.target.value) || 1)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:bg-white focus:border-[#0B1F3A] focus:outline-none"
              />
            </div>
          </div>

          {/* CRITICAL DEMO SECTION: Available Units */}
          <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-3 space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-extrabold text-emerald-950">
                ⭐ Available Units (Demo Field)
              </label>
              <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                Live Synced
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-emerald-800 mb-1">Available Units</label>
                <div className="flex items-center space-x-1">
                  <button
                    type="button"
                    onClick={() => setAvailableUnits(prev => Math.max(0, prev - 1))}
                    className="w-8 h-8 rounded-lg bg-white text-slate-800 font-bold border border-emerald-200 shadow-2xs hover:bg-slate-50 flex items-center justify-center"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="0"
                    max={totalUnits}
                    value={availableUnits}
                    onChange={(e) => setAvailableUnits(parseInt(e.target.value) || 0)}
                    className="w-full text-center font-extrabold text-sm bg-white border border-emerald-300 rounded-lg py-1 text-emerald-900 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setAvailableUnits(prev => Math.min(totalUnits, prev + 1))}
                    className="w-8 h-8 rounded-lg bg-white text-slate-800 font-bold border border-emerald-200 shadow-2xs hover:bg-slate-50 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-emerald-800 mb-1">Total Units</label>
                <input
                  type="number"
                  min="1"
                  value={totalUnits}
                  onChange={(e) => setTotalUnits(parseInt(e.target.value) || 1)}
                  className="w-full bg-white border border-emerald-200 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-900 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-[#0B1F3A] focus:outline-none resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-3 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-[2] bg-[#0B1F3A] hover:bg-slate-800 text-white text-xs font-extrabold py-3 rounded-xl shadow-md transition flex items-center justify-center space-x-1.5"
            >
              {showSavedFeedback ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Saved to Live State!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 text-red-400" />
                  <span>Save Project Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
