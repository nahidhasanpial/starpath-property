import React from 'react';
import { Inquiry } from '../../types';
import { X, Phone, Mail, Clock, Calendar, CheckCircle2, MessageSquare, Building2, User } from 'lucide-react';

interface InquiriesListModalProps {
  inquiries: Inquiry[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (id: string, status: Inquiry['status']) => void;
}

export const InquiriesListModal: React.FC<InquiriesListModalProps> = ({
  inquiries,
  isOpen,
  onClose,
  onUpdateStatus,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-[390px] bg-white rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in slide-in-from-bottom duration-300 flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white px-5 py-4 border-b border-slate-100 flex items-center justify-between z-10 shrink-0">
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider">
                Customer Inquiries Log
              </h3>
            </div>
            <p className="text-[11px] text-slate-500">{inquiries.length} Inquiries Received</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3 flex-1 overflow-y-auto">
          {inquiries.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-xs text-slate-400">No customer inquiries yet.</p>
            </div>
          ) : (
            inquiries.map((inq) => (
              <div
                key={inq.id}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2.5 shadow-2xs"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="font-bold text-slate-900 text-xs">{inq.fullName}</span>
                      <span className="text-[9px] font-bold text-slate-400 bg-slate-200/80 px-1.5 py-0.5 rounded">
                        {inq.timestamp}
                      </span>
                    </div>
                    <p className="text-[11px] text-red-600 font-bold mt-0.5">
                      {inq.projectName} ({inq.projectArea})
                    </p>
                  </div>

                  <select
                    value={inq.status}
                    onChange={(e) => onUpdateStatus(inq.id, e.target.value as Inquiry['status'])}
                    className="text-[10px] font-bold bg-white border border-slate-300 rounded-lg px-2 py-1 text-slate-800 focus:outline-none"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                {/* Message */}
                <div className="bg-white rounded-xl p-2 border border-slate-200/70 text-xs text-slate-600">
                  <p className="italic">"{inq.message}"</p>
                  {inq.preferredDate && (
                    <p className="text-[10px] text-slate-400 mt-1 font-semibold flex items-center">
                      <Calendar className="w-3 h-3 mr-1 text-red-500" />
                      Visit requested: {inq.preferredDate}
                    </p>
                  )}
                </div>

                {/* Contact Shortcuts */}
                <div className="flex items-center space-x-2 pt-1">
                  <a
                    href={`tel:${inq.phone}`}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold py-1.5 rounded-lg flex items-center justify-center space-x-1 transition"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call ({inq.phone})</span>
                  </a>
                  {inq.email && inq.email !== 'Not provided' && (
                    <a
                      href={`mailto:${inq.email}`}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-800 p-1.5 rounded-lg transition"
                      title={inq.email}
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
