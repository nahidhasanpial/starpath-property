import React, { useState } from 'react';
import { useProperty } from '../../context/PropertyContext';
import { Project } from '../../types';
import { EditProjectModal } from './EditProjectModal';
import { InquiriesListModal } from './InquiriesListModal';
import { 
  Building2, Home, Users, Edit3, ArrowLeft, RefreshCw, 
  Sparkles, CheckCircle2, Shield, Eye, TrendingUp, AlertTriangle, Plus 
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    projects, 
    updateProject, 
    inquiries, 
    updateInquiryStatus, 
    resetToDemoDefault, 
    setActiveTab, 
    setSelectedProjectId 
  } = useProperty();

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isInquiriesOpen, setIsInquiriesOpen] = useState(false);
  const [resetSuccessNotice, setResetSuccessNotice] = useState(false);

  // Live aggregated KPIs
  const totalProjects = projects.length;
  const totalAvailableUnits = projects.reduce((acc, p) => acc + p.availableUnits, 0);
  const totalInquiries = inquiries.length;
  const newInquiriesCount = inquiries.filter(i => i.status === 'New').length;

  const handleEditClick = (project: Project) => {
    setEditingProject(project);
  };

  const handleSaveProject = (updated: Project) => {
    updateProject(updated);
  };

  const handleResetDemo = () => {
    resetToDemoDefault();
    setResetSuccessNotice(true);
    setTimeout(() => setResetSuccessNotice(false), 2500);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-14">
      {/* Admin Top Header */}
      <div className="bg-[#0B1F3A] text-white px-4 pt-4 pb-5 border-b border-slate-800 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('profile')}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title="Back to Profile"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center space-x-1.5">
                <Shield className="w-4 h-4 text-red-500" />
                <h1 className="text-base font-extrabold tracking-tight">Starpath Admin</h1>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Executive Management Portal</p>
            </div>
          </div>

          <button
            onClick={handleResetDemo}
            className="flex items-center space-x-1 text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1.5 rounded-xl border border-slate-700 transition active:scale-95"
            title="Reset demo data to default (7 available units)"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${resetSuccessNotice ? 'animate-spin text-emerald-400' : 'text-slate-400'}`} />
            <span>Reset Demo</span>
          </button>
        </div>

        {/* Demo Instruction Banner */}
        <div className="mt-4 bg-gradient-to-r from-red-950/80 to-slate-900 border border-red-800/80 rounded-2xl p-3 shadow-inner">
          <div className="flex items-start space-x-2.5">
            <div className="p-1.5 bg-red-600 rounded-lg text-white shrink-0 mt-0.5">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div className="text-xs">
              <p className="font-bold text-red-200">Management Demo Workflow:</p>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                Click <span className="font-bold text-white">Edit</span> on <em>Starpath Grand Residence</em> below, change units from <span className="bg-red-600/60 px-1 py-0.2 rounded font-mono font-bold text-white">7 → 6</span>, then inspect the buyer view.
              </p>
            </div>
          </div>
        </div>

        {resetSuccessNotice && (
          <div className="mt-2 text-center text-xs font-bold text-emerald-400 bg-emerald-950/80 py-1.5 rounded-xl border border-emerald-800">
            ✓ Demo data reset: Starpath Grand Residence set to 7 Available Units
          </div>
        )}
      </div>

      {/* KPI Cards Dashboard Grid */}
      <div className="px-4 -mt-3">
        <div className="grid grid-cols-3 gap-2">
          {/* Card 1: Total Projects */}
          <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-sm text-center">
            <div className="w-7 h-7 bg-blue-50 text-[#0B1F3A] rounded-xl flex items-center justify-center mx-auto mb-1.5 border border-blue-100">
              <Building2 className="w-3.5 h-3.5" />
            </div>
            <p className="text-lg font-black text-[#0B1F3A] leading-tight">{totalProjects}</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Projects</p>
          </div>

          {/* Card 2: Available Units */}
          <div className="bg-white p-3 rounded-2xl border border-emerald-200 shadow-sm text-center bg-gradient-to-b from-white to-emerald-50/40">
            <div className="w-7 h-7 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-1.5 border border-emerald-200">
              <Home className="w-3.5 h-3.5" />
            </div>
            <p className="text-lg font-black text-emerald-600 leading-tight">{totalAvailableUnits}</p>
            <p className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider mt-0.5">Available</p>
          </div>

          {/* Card 3: Inquiries */}
          <div 
            onClick={() => setIsInquiriesOpen(true)}
            className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-sm text-center cursor-pointer hover:border-red-300 transition active:scale-95"
          >
            <div className="w-7 h-7 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mx-auto mb-1.5 border border-red-100 relative">
              <Users className="w-3.5 h-3.5" />
              {newInquiriesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-ping" />
              )}
            </div>
            <p className="text-lg font-black text-red-600 leading-tight">{totalInquiries}</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">Inquiries</p>
          </div>
        </div>
      </div>

      {/* Projects List Header */}
      <div className="px-4 mt-5 mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Portfolio Inventory Management
          </h2>
          <p className="text-[11px] text-slate-400">Manage pricing, specs, and live availability</p>
        </div>
        <button
          onClick={() => setIsInquiriesOpen(true)}
          className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-xl border border-red-200 hover:bg-red-100 transition flex items-center space-x-1"
        >
          <span>View Inquiries ({inquiries.length})</span>
        </button>
      </div>

      {/* Project Management Cards */}
      <div className="px-4 space-y-3">
        {projects.map((project) => {
          const isTargetDemo = project.id === 'grand-residence';

          return (
            <div
              key={project.id}
              className={`bg-white rounded-2xl p-3.5 border transition ${
                isTargetDemo
                  ? 'border-red-300 ring-2 ring-red-500/20 shadow-md'
                  : 'border-slate-200/90 shadow-2xs hover:shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex space-x-3">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-100"
                  />
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        {project.area}
                      </span>
                      {isTargetDemo && (
                        <span className="text-[9px] font-extrabold bg-red-600 text-white px-1.5 py-0.2 rounded">
                          ⭐ Demo Target
                        </span>
                      )}
                    </div>
                    <h3 className="text-xs font-extrabold text-slate-900 leading-tight mt-0.5">
                      {project.name}
                    </h3>
                    <p className="text-[11px] font-bold text-[#0B1F3A] mt-0.5">{project.price}</p>
                  </div>
                </div>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 shrink-0">
                  {project.status}
                </span>
              </div>

              {/* Specs and Availability Row */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Available</span>
                    <span className="font-black text-emerald-600 text-sm">
                      {project.availableUnits} <span className="text-[10px] text-slate-400 font-normal">/ {project.totalUnits}</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Layout</span>
                    <span className="font-bold text-slate-700 text-xs">
                      {project.bedrooms}B / {project.bathrooms}B
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setSelectedProjectId(project.id);
                    }}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                    title="Preview as Buyer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleEditClick(project)}
                    className="bg-[#0B1F3A] hover:bg-slate-800 text-white text-xs font-bold px-3 py-2 rounded-xl transition flex items-center space-x-1 shadow-xs active:scale-95"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-red-400" />
                    <span>Edit</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      <EditProjectModal
        project={editingProject}
        isOpen={!!editingProject}
        onClose={() => setEditingProject(null)}
        onSave={handleSaveProject}
      />

      {/* Inquiries List Modal */}
      <InquiriesListModal
        inquiries={inquiries}
        isOpen={isInquiriesOpen}
        onClose={() => setIsInquiriesOpen(false)}
        onUpdateStatus={updateInquiryStatus}
      />
    </div>
  );
};
