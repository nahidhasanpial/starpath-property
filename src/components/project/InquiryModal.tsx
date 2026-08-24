import React, { useState } from 'react';
import { useProperty } from '../../context/PropertyContext';
import { X, CheckCircle2, Send, Phone, Mail, User, MessageSquare, Calendar, Building, Sparkles } from 'lucide-react';

export const InquiryModal: React.FC = () => {
  const { 
    isInquiryModalOpen, 
    closeInquiryModal, 
    inquiryTargetProject, 
    addInquiry 
  } = useProperty();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [preferredDate, setPreferredDate] = useState('This Weekend');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState('');

  if (!isInquiryModalOpen || !inquiryTargetProject) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    const newId = `STP-INQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedId(newId);

    addInquiry({
      projectId: inquiryTargetProject.id,
      projectName: inquiryTargetProject.name,
      projectArea: inquiryTargetProject.area,
      fullName,
      phone,
      email: email || 'Not provided',
      message: message || `Inquiring for unit availability at ${inquiryTargetProject.name}.`,
      preferredDate
    });

    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setFullName('');
    setPhone('');
    setEmail('');
    setMessage('');
    closeInquiryModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-[390px] bg-white rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in slide-in-from-bottom duration-300"
      >
        {/* Header Strip */}
        <div className="sticky top-0 bg-white px-5 py-4 border-b border-slate-100 flex items-center justify-between z-10">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider">
              Starpath Inquiry
            </span>
          </div>
          <button
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5">
          {!isSubmitted ? (
            <div>
              {/* Target Project Summary Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center space-x-3 mb-5">
                <img
                  src={inquiryTargetProject.image}
                  alt={inquiryTargetProject.name}
                  className="w-14 h-14 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold text-red-600 uppercase">
                    {inquiryTargetProject.area}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 truncate">
                    {inquiryTargetProject.name}
                  </h4>
                  <p className="text-xs font-extrabold text-[#0B1F3A]">
                    {inquiryTargetProject.price} · {inquiryTargetProject.availableUnits} Units Left
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-black text-[#0B1F3A] tracking-tight">
                  Interested in this project?
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Submit your contact details and our Senior Starpath Property Consultant will get in touch shortly.
                </p>
              </div>

              {/* Inquiry Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Asif Mahmud"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0B1F3A] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 01711223344"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0B1F3A] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      placeholder="e.g. name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0B1F3A] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Preferred Visit Time */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Preferred Site Visit Time
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <select
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0B1F3A] focus:outline-none"
                    >
                      <option value="This Weekend">This Weekend (Fri / Sat)</option>
                      <option value="Tomorrow Morning">Tomorrow Morning (10:00 AM - 1:00 PM)</option>
                      <option value="Tomorrow Afternoon">Tomorrow Afternoon (3:00 PM - 6:00 PM)</option>
                      <option value="Direct Call First">Direct Phone Call First</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Message / Special Requirements
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <textarea
                      rows={2}
                      placeholder="e.g. Inquiring for 4-Bed corner unit price & floor plan..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:bg-white focus:border-[#0B1F3A] focus:outline-none resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0B1F3A] hover:bg-slate-800 text-white text-xs font-extrabold py-3.5 rounded-xl shadow-md transition flex items-center justify-center space-x-2 active:scale-95 mt-2"
                >
                  <Send className="w-4 h-4 text-red-400" />
                  <span>Request Details</span>
                </button>
              </form>
            </div>
          ) : (
            /* Thank You State */
            <div className="text-center py-6 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <h3 className="text-xl font-black text-[#0B1F3A] tracking-tight">
                Thank You!
              </h3>
              <p className="text-xs text-slate-600 mt-2 max-w-[280px] mx-auto leading-relaxed">
                Your inquiry has been sent to <span className="font-bold text-slate-900">Starpath Holdings Ltd.</span>
              </p>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 my-5 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Inquiry Ref:</span>
                  <span className="font-mono font-bold text-slate-800">{submittedId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Project:</span>
                  <span className="font-bold text-[#0B1F3A]">{inquiryTargetProject.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Customer:</span>
                  <span className="font-bold text-slate-800">{fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Phone:</span>
                  <span className="font-bold text-slate-800">{phone}</span>
                </div>
              </div>

              <div className="space-y-2.5">
                <a
                  href="tel:09610969620"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-3 rounded-xl transition flex items-center justify-center space-x-1.5 shadow-xs"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Starpath Hotline (09610969620)</span>
                </a>

                <button
                  onClick={handleResetAndClose}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2.5 rounded-xl transition"
                >
                  Back to Project
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
