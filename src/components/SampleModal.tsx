import React, { useState } from 'react';
import { FlooringProduct, InboundLead } from '../types';
import { Package, CheckCircle2, Sparkles } from 'lucide-react';

interface SampleModalProps {
  product?: FlooringProduct | null;
  onClose: () => void;
  onSubmitLead: (lead: InboundLead) => void;
}

export const SampleModal: React.FC<SampleModalProps> = ({
  product,
  onClose,
  onSubmitLead,
}) => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('Principal Architect / Project Lead');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [clientType, setClientType] = useState<InboundLead['clientType']>('Real Estate Developer');
  const [areaSqFt, setAreaSqFt] = useState(25000);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLead: InboundLead = {
      id: `sample-${Date.now()}`,
      name: name || 'Architect Partner',
      company: company || 'Studio Architecture',
      role,
      clientType,
      areaSqFt: Number(areaSqFt) || 20000,
      targetTimeline: 'Within 60 Days',
      budgetTier: 'Premium',
      location: address || 'National Project Site',
      inquiryNotes: `Requested WE FLOORS Sample Box for ${product?.name || 'Complete Collection'}. Footprint: ${areaSqFt} sq.ft. Delivery: ${address}. Phone: ${phone}. Email: ${email}.`,
      status: 'New',
      submittedAt: 'Just now',
    };

    onSubmitLead(newLead);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
      <div className="bg-white border border-stone-200/90 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 p-1 text-sm font-bold cursor-pointer"
        >
          ✕
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-cyan-50 border border-cyan-200 flex items-center justify-center mx-auto text-cyan-700 shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif-luxury font-bold text-stone-950">Swatch Box Dispatched!</h3>
            <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto leading-relaxed font-light">
              Your customized architectural swatch kit is queued for express courier. WE FLOORS AI Lead Agent has drafted your project spec audit.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-1.5 mb-1.5 text-xs font-bold text-cyan-800 uppercase tracking-wider font-mono-accent">
              <Package className="w-4 h-4 text-cyan-600" />
              <span>Complimentary Architect Swatch Box</span>
            </div>
            <h3 className="text-2xl font-serif-luxury font-bold text-stone-950 mb-1">
              Request Project Sample Kit
            </h3>
            <p className="text-xs text-stone-500 mb-5 font-light">
              Includes physical cut samples of {product ? product.name : 'our complete collection'}, acoustic test reports, and LEED certificates.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-stone-700 font-bold block mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ar. Ananya Sharma"
                    className="w-full bg-stone-50/70 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-stone-700 font-bold block mb-1">Company / Developer</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Prestige Group"
                    className="w-full bg-stone-50/70 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-stone-700 font-bold block mb-1">Project Sector</label>
                  <select
                    value={clientType}
                    onChange={(e) => setClientType(e.target.value as any)}
                    className="w-full bg-stone-50/70 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
                  >
                    <option value="Real Estate Developer">Real Estate Developer</option>
                    <option value="IT Park Campus">IT Park Campus</option>
                    <option value="Architect / Interior Studio">Architect / Interior Studio</option>
                    <option value="Luxury Villa Owner">Luxury Villa Owner</option>
                  </select>
                </div>
                <div>
                  <label className="text-stone-700 font-bold block mb-1">Project Footprint (sq.ft)</label>
                  <input
                    type="number"
                    value={areaSqFt}
                    onChange={(e) => setAreaSqFt(parseInt(e.target.value, 10))}
                    className="w-full bg-stone-50/70 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-stone-700 font-bold block mb-1">Work Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ananya@prestige.com"
                    className="w-full bg-stone-50/70 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-stone-700 font-bold block mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-stone-50/70 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-stone-700 font-bold block mb-1">Courier Delivery Address</label>
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Studio or project site address for courier parcel"
                  className="w-full bg-stone-50/70 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="btn-aqua w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer mt-3 inline-flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-cyan-100" />
                <span>Dispatch Master Swatch Box</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
