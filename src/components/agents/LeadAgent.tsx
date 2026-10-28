import React, { useState } from 'react';
import { InboundLead, LeadQualificationResult } from '../../types';
import { INITIAL_LEADS } from '../../data/mockProducts';
import { 
  Users, 
  Send, 
  Copy, 
  Check, 
  Building, 
  Plus, 
  RefreshCw
} from 'lucide-react';

export const LeadAgent: React.FC = () => {
  const [leads, setLeads] = useState<InboundLead[]>(INITIAL_LEADS);
  const [selectedLead, setSelectedLead] = useState<InboundLead>(INITIAL_LEADS[0]);
  const [loading, setLoading] = useState(false);
  const [qualification, setQualification] = useState<LeadQualificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // New Lead Simulation State
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadCompany, setNewLeadCompany] = useState('');
  const [newLeadRole, setNewLeadRole] = useState('Director of Procurement');
  const [newLeadType, setNewLeadType] = useState<InboundLead['clientType']>('Real Estate Developer');
  const [newLeadArea, setNewLeadArea] = useState(25000);
  const [newLeadLocation, setNewLeadLocation] = useState('Whitefield, Bangalore');
  const [newLeadNotes, setNewLeadNotes] = useState('Looking for 25,000 sq.ft rigid SPC 7mm waterproof flooring for high-rise residential clubhouses.');

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleQualifyLead = async (leadToQualify: InboundLead) => {
    setSelectedLead(leadToQualify);
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/agent/leads/qualify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadData: leadToQualify }),
      });

      if (!res.ok) {
        throw new Error('Lead qualification service error');
      }

      const data = await res.json();
      setQualification(data);

      setLeads((prev) =>
        prev.map((l) => (l.id === leadToQualify.id ? { ...l, status: 'Qualified' } : l))
      );
    } catch (err: any) {
      setError(err.message || 'Failed to qualify lead with AI');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewLead = (e: React.FormEvent) => {
    e.preventDefault();
    const created: InboundLead = {
      id: `lead-${Date.now()}`,
      name: newLeadName || 'Commercial Prospect',
      company: newLeadCompany || 'Apex Global Towers',
      role: newLeadRole,
      clientType: newLeadType,
      areaSqFt: Number(newLeadArea) || 15000,
      targetTimeline: 'Q2 (Next 60 Days)',
      budgetTier: 'Premium',
      location: newLeadLocation,
      inquiryNotes: newLeadNotes,
      status: 'New',
      submittedAt: 'Just now',
    };

    setLeads([created, ...leads]);
    setSelectedLead(created);
    setShowNewLeadModal(false);
    handleQualifyLead(created);
  };

  return (
    <div className="space-y-6">
      {/* Banner with Aqua Action */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-cyan-50 border border-cyan-200 rounded-xl text-cyan-700 shadow-xs">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-cyan-800 uppercase tracking-wider font-mono-accent">Agent #2</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-100/70 text-cyan-900 border border-cyan-200">Commercial Pipeline CRM</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif-luxury font-bold text-stone-950 mt-0.5">Lead Generation & Qualification Agent</h2>
            <p className="text-xs text-stone-500 mt-0.5 font-light">
              Automatically scores commercial builder inquiries, values deal sizes, and generates high-touch closing pitches.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowNewLeadModal(true)}
          className="btn-aqua px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Simulate Inbound Lead</span>
        </button>
      </div>

      {/* Grid: Leads List & Active Qualification */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Leads Pipeline List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2 font-mono-accent">
              <span>Inbound Commercial Inquiries</span>
              <span className="text-xs bg-cyan-100 text-cyan-900 px-2 py-0.5 rounded-full font-mono font-bold">
                {leads.length}
              </span>
            </h3>
            <span className="text-[11px] text-stone-400 font-medium">Click lead to evaluate</span>
          </div>

          <div className="space-y-2.5">
            {leads.map((lead) => {
              const isSelected = lead.id === selectedLead.id;
              return (
                <div
                  key={lead.id}
                  onClick={() => handleQualifyLead(lead)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-cyan-50/60 border-cyan-500 shadow-sm ring-2 ring-cyan-500/25'
                      : 'bg-white border-stone-200 hover:border-cyan-300 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-stone-950 truncate font-serif-luxury">{lead.name}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono-accent ${
                        lead.status === 'Qualified'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-cyan-100 text-cyan-800'
                      }`}
                    >
                      {lead.status}
                    </span>
                  </div>

                  <div className="text-xs text-cyan-800 font-semibold truncate flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-cyan-600" />
                    <span>{lead.company}</span>
                  </div>

                  <p className="text-[11px] text-stone-600 mt-2 line-clamp-2 italic font-light">
                    "{lead.inquiryNotes}"
                  </p>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-100 text-[10px] text-stone-500">
                    <span className="text-stone-900 font-mono font-bold">{lead.areaSqFt.toLocaleString()} sq.ft</span>
                    <span>{lead.location}</span>
                    <span>{lead.submittedAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: AI Qualification & Strategy */}
        <div className="lg:col-span-7">
          {loading ? (
            <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[380px]">
              <RefreshCw className="w-8 h-8 text-cyan-600 animate-spin mb-4" />
              <h4 className="text-base font-serif-luxury font-bold text-stone-950">Evaluating Deal Potential</h4>
              <p className="text-xs text-stone-500 max-w-sm mt-1 font-light">
                Analyzing footprint, commercial margins, and generating closing playbook with Gemini...
              </p>
            </div>
          ) : qualification ? (
            <div className="space-y-6">
              {/* Score & Estimated Deal Value Card */}
              <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-stone-100 pb-4 mb-4">
                  <div>
                    <span className="text-[10px] text-cyan-800 font-bold uppercase tracking-wider font-mono-accent">Prospect Evaluation</span>
                    <h3 className="text-xl font-serif-luxury font-bold text-stone-950">
                      {selectedLead.company}
                    </h3>
                    <p className="text-xs text-stone-500">{selectedLead.name} • {selectedLead.role}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] text-stone-500 uppercase block font-bold">Estimated Deal</span>
                      <span className="text-base sm:text-lg font-black text-cyan-800 font-mono">
                        {qualification.projectEstimatedValue}
                      </span>
                    </div>

                    <div className="bg-cyan-50 px-3.5 py-1.5 rounded-xl border border-cyan-200 text-center">
                      <span className="text-[10px] text-cyan-800 block uppercase font-bold font-mono-accent">Lead Score</span>
                      <span className="text-xl font-black text-cyan-900 font-mono">
                        {qualification.leadScore}/100
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                    <span className="text-[10px] text-stone-500 uppercase block font-bold">Priority Tier</span>
                    <span className="font-bold text-cyan-900">{qualification.priority}</span>
                  </div>
                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                    <span className="text-[10px] text-stone-500 uppercase block font-bold">Deal Probability</span>
                    <span className="font-bold text-emerald-700">{qualification.dealProbability}</span>
                  </div>
                </div>

                <div className="text-xs text-stone-700 leading-relaxed bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                  <strong className="text-stone-900 block mb-1">Fit Analysis:</strong>
                  {qualification.fitAnalysis}
                </div>
              </div>

              {/* Personalized Response Draft */}
              {qualification.personalizedResponseDraft && (
                <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-serif-luxury font-bold text-stone-950 flex items-center gap-2">
                      <Send className="w-4 h-4 text-cyan-600" />
                      Executive Response Draft ({qualification.personalizedResponseDraft.channel})
                    </h4>
                    <button
                      onClick={() => handleCopy(
                        `Subject: ${qualification.personalizedResponseDraft.subject}\n\n${qualification.personalizedResponseDraft.message}`,
                        'draft'
                      )}
                      className="btn-aqua-outline px-3 py-1 rounded text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedKey === 'draft' ? <Check className="w-3.5 h-3.5 text-cyan-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copy Draft</span>
                    </button>
                  </div>

                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs text-stone-700 space-y-2 font-sans leading-relaxed">
                    <div className="text-stone-950 font-bold text-xs pb-2 border-b border-stone-200">
                      Subject: {qualification.personalizedResponseDraft.subject}
                    </div>
                    <div className="whitespace-pre-line text-stone-700">
                      {qualification.personalizedResponseDraft.message}
                    </div>
                  </div>
                </div>
              )}

              {/* Recommended Product Bundle & Objection Handling */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-xs">
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3 font-mono-accent">
                    Recommended Spec Bundle
                  </h4>
                  <div className="space-y-2">
                    {qualification.recommendedProductBundle?.map((item, idx) => (
                      <div key={idx} className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-xs">
                        <span className="font-bold text-stone-900 block font-serif-luxury">{item.name}</span>
                        <span className="text-[11px] text-cyan-700 font-semibold block mb-1">{item.specs}</span>
                        <p className="text-[11px] text-stone-500 italic">{item.strategicReason}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-xs">
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3 font-mono-accent">
                    Objection Handling Playbook
                  </h4>
                  <div className="space-y-2">
                    {qualification.closingStrategy?.map((strat, idx) => (
                      <div key={idx} className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-xs">
                        <span className="text-stone-900 font-bold block text-[11px]">{strat.step}: {strat.action}</span>
                        <p className="text-stone-600 text-[11px] mt-1">
                          <strong className="text-cyan-800">Counter:</strong> {strat.objectionHandled}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[380px]">
              <Users className="w-10 h-10 text-stone-400 mb-3" />
              <h4 className="text-sm font-serif-luxury font-bold text-stone-900">Select an Inbound Lead</h4>
              <p className="text-xs text-stone-500 max-w-sm mt-1">
                Choose any project from the left column to run instant AI lead scoring, deal valuation, and closing strategy.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* New Lead Modal with Aqua Button */}
      {showNewLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowNewLeadModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 text-sm font-bold cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-lg font-serif-luxury font-bold text-stone-950 mb-1">
              Simulate Inbound Commercial Lead
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Enter incoming client details from a builder or IT facility manager.
            </p>

            <form onSubmit={handleAddNewLead} className="space-y-3 text-xs">
              <div>
                <label className="text-stone-700 font-bold block mb-1">Client Contact Name</label>
                <input
                  type="text"
                  required
                  value={newLeadName}
                  onChange={(e) => setNewLeadName(e.target.value)}
                  placeholder="e.g. Rajesh Khurana"
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-stone-700 font-bold block mb-1">Company / Developer Name</label>
                <input
                  type="text"
                  required
                  value={newLeadCompany}
                  onChange={(e) => setNewLeadCompany(e.target.value)}
                  placeholder="e.g. Sattva Tech Parks"
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-stone-700 font-bold block mb-1">Client Sector</label>
                  <select
                    value={newLeadType}
                    onChange={(e) => setNewLeadType(e.target.value as any)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="IT Park Campus">IT Park Campus</option>
                    <option value="Real Estate Developer">Real Estate Developer</option>
                    <option value="Architect / Interior Studio">Architect / Interior Studio</option>
                    <option value="Luxury Villa Owner">Luxury Villa Owner</option>
                  </select>
                </div>

                <div>
                  <label className="text-stone-700 font-bold block mb-1">Footprint (sq.ft)</label>
                  <input
                    type="number"
                    value={newLeadArea}
                    onChange={(e) => setNewLeadArea(parseInt(e.target.value, 10))}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-stone-700 font-bold block mb-1">Project Location</label>
                <input
                  type="text"
                  value={newLeadLocation}
                  onChange={(e) => setNewLeadLocation(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-stone-700 font-bold block mb-1">Inquiry Specifications</label>
                <textarea
                  rows={2}
                  value={newLeadNotes}
                  onChange={(e) => setNewLeadNotes(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewLeadModal(false)}
                  className="px-4 py-2 bg-stone-100 text-stone-700 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-aqua px-5 py-2 rounded-lg text-xs font-bold cursor-pointer"
                >
                  Add & Qualify Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
