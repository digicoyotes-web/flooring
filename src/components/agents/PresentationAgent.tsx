import React, { useState } from 'react';
import { PresentationDeckResult } from '../../types';
import { 
  Presentation, 
  Sparkles, 
  Building2, 
  Laptop, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Copy, 
  Check, 
  RefreshCw 
} from 'lucide-react';

export const PresentationAgent: React.FC = () => {
  const [presentationTarget, setPresentationTarget] = useState('IT Campuses & Tech Companies');
  const [clientCompany, setClientCompany] = useState('Cognizant / Microsoft Regional Development Center');
  const [keyPainPoints, setKeyPainPoints] = useState(
    'Open office noise reverberation, heavy castor-chair wear, fast overnight installation without tech downtime, LEED v4.1 sustainability credits'
  );
  const [highlightedProducts, setHighlightedProducts] = useState(
    'WE FLOORS Nexus Acoustic Carpet Matrix 50x50 (NRC 0.32) + Rigid SPC 7mm for Cafeterias & Breakouts'
  );

  const [loading, setLoading] = useState(false);
  const [deck, setDeck] = useState<PresentationDeckResult | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleGenerateDeck = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/agent/presentation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          presentationTarget,
          clientCompany,
          keyPainPoints,
          highlightedProducts,
        }),
      });

      if (!res.ok) {
        throw new Error('Presentation agent error');
      }

      const data = await res.json();
      setDeck(data);
      setActiveSlideIndex(0);
    } catch (err: any) {
      setError(err.message || 'Failed to generate presentation deck');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPreset = (target: 'IT' | 'Builder') => {
    if (target === 'IT') {
      setPresentationTarget('IT Campuses & Tech Companies');
      setClientCompany('Global Tech Park Consortium');
      setKeyPainPoints('Acoustic distraction in 800-person bays, caster wheel durability, static dissipation near server rooms, zero downtime installation.');
      setHighlightedProducts('WE FLOORS Nexus Acoustic Carpet Planks + Antistatic CushionBac Core');
    } else {
      setPresentationTarget('Real Estate Builders & Developers');
      setClientCompany('Sobha / Prestige Luxury Towers');
      setKeyPainPoints('High apartment sales velocity, 25-30% premium positioning, waterproof durability for bathrooms/kitchens, bulk container pricing.');
      setHighlightedProducts('WE FLOORS Bavarian Smoked Oak Grand Planks + Italian Calacatta Sintered Porcelain Slabs');
    }
  };

  const activeSlide = deck?.slides?.[activeSlideIndex];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-cyan-50 border border-cyan-200 rounded-xl text-cyan-700 shadow-xs">
              <Presentation className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-cyan-800 uppercase tracking-wider font-mono-accent">Agent #5</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-100/70 text-cyan-900 border border-cyan-200">Executive Pitch Architect</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif-luxury font-bold text-stone-950 mt-0.5">Builder & IT Enterprise Pitch Agent</h2>
              <p className="text-xs text-stone-500 mt-0.5 font-light">
                Generates high-stakes C-suite slide decks customized for Commercial Real Estate Developers and IT Tech Campuses.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSelectPreset('IT')}
              className="btn-aqua-outline text-xs px-3.5 py-1.5 rounded-lg cursor-pointer font-bold inline-flex items-center gap-1.5"
            >
              <Laptop className="w-3.5 h-3.5 text-cyan-700" />
              <span>Preset: IT Parks Deck</span>
            </button>
            <button
              onClick={() => handleSelectPreset('Builder')}
              className="btn-aqua-outline text-xs px-3.5 py-1.5 rounded-lg cursor-pointer font-bold inline-flex items-center gap-1.5"
            >
              <Building2 className="w-3.5 h-3.5 text-cyan-700" />
              <span>Preset: Builder ROI Deck</span>
            </button>
          </div>
        </div>

        {/* Form Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-5 border-t border-stone-100 text-xs">
          <div>
            <label className="text-stone-700 font-bold block mb-1">Target Client Profile</label>
            <select
              value={presentationTarget}
              onChange={(e) => setPresentationTarget(e.target.value)}
              className="w-full bg-stone-50/70 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
            >
              <option value="IT Campuses & Tech Companies">IT Campuses & Tech Companies</option>
              <option value="Real Estate Builders & Developers">Real Estate Builders & Developers</option>
              <option value="Luxury Hospitality & Boutique Hotel Chains">Luxury Hospitality & Boutique Hotel Chains</option>
              <option value="Tier-1 Architectural & Interior Design Studios">Tier-1 Architectural Studios</option>
            </select>
          </div>

          <div>
            <label className="text-stone-700 font-bold block mb-1">Target Organization / Firm Name</label>
            <input
              type="text"
              value={clientCompany}
              onChange={(e) => setClientCompany(e.target.value)}
              className="w-full bg-stone-50/70 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-stone-700 font-bold block mb-1">Critical Pain Points & Decision Factors</label>
            <input
              type="text"
              value={keyPainPoints}
              onChange={(e) => setKeyPainPoints(e.target.value)}
              className="w-full bg-stone-50/70 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-stone-700 font-bold block mb-1">Products & Collections to Feature</label>
            <input
              type="text"
              value={highlightedProducts}
              onChange={(e) => setHighlightedProducts(e.target.value)}
              className="w-full bg-stone-50/70 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleGenerateDeck}
            disabled={loading}
            className="btn-aqua px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Designing Executive Pitch Deck...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-cyan-100" />
                <span>Generate Enterprise Slide Deck</span>
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs font-medium">
          {error}
        </div>
      )}

      {/* Presentation Deck Viewer */}
      {deck && deck.slides && (
        <div className="space-y-6">
          {/* Deck Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border border-stone-200/90 p-5 rounded-2xl gap-3 shadow-xs">
            <div>
              <span className="text-[10px] text-cyan-800 font-bold uppercase tracking-wider font-mono-accent">
                {deck.targetSegment} • Executive Deck
              </span>
              <h3 className="text-xl font-serif-luxury font-bold text-stone-950 mt-0.5">{deck.deckTitle}</h3>
              <p className="text-xs text-stone-500 font-light">{deck.deckSubtitle}</p>
            </div>

            <button
              onClick={() => handleCopy(JSON.stringify(deck, null, 2), 'deck-json')}
              className="btn-aqua-outline px-3.5 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
            >
              {copiedKey === 'deck-json' ? <Check className="w-3.5 h-3.5 text-cyan-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy Full Deck</span>
            </button>
          </div>

          {/* Interactive Slide Canvas */}
          <div className="bg-white border border-stone-200/90 rounded-2xl p-8 sm:p-12 shadow-sm relative min-h-[420px] flex flex-col justify-between">
            {/* Slide Number Watermark */}
            <div className="absolute top-6 right-8 text-xs font-mono font-bold text-cyan-900 bg-cyan-50 border border-cyan-200 px-3 py-1 rounded-full">
              Slide {activeSlideIndex + 1} of {deck.slides.length}
            </div>

            {/* Slide Content */}
            {activeSlide && (
              <div className="space-y-5">
                <div>
                  <span className="text-xs text-cyan-800 font-bold uppercase tracking-wider block mb-1 font-mono-accent">
                    {activeSlide.subtitle}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-stone-950">
                    {activeSlide.title}
                  </h2>
                </div>

                <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 text-xs text-stone-800 font-medium">
                  <strong>Takeaway:</strong> {activeSlide.keyTakeaway}
                </div>

                {/* Bullet Points */}
                <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700 pl-4 list-disc font-light">
                  {activeSlide.bulletPoints?.map((pt, i) => (
                    <li key={i} className="leading-relaxed">{pt}</li>
                  ))}
                </ul>

                {/* Metrics Grid */}
                {activeSlide.metricsOrHighlights && activeSlide.metricsOrHighlights.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-stone-100">
                    {activeSlide.metricsOrHighlights.map((m, idx) => (
                      <div key={idx} className="bg-cyan-50/50 p-3 rounded-xl border border-cyan-200">
                        <span className="text-[10px] text-stone-500 uppercase font-bold block">{m.label}</span>
                        <span className="text-base sm:text-lg font-black text-stone-900 font-mono">{m.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="text-[11px] text-stone-400 italic pt-2">
                  <strong>Visual Layout:</strong> {activeSlide.visualLayoutSuggestion}
                </div>
              </div>
            )}

            {/* Slide Navigation Controls */}
            <div className="flex items-center justify-between pt-6 border-t border-stone-100 mt-6">
              <button
                disabled={activeSlideIndex === 0}
                onClick={() => setActiveSlideIndex(prev => Math.max(0, prev - 1))}
                className="btn-aqua-outline px-4 py-2 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {/* Slide Dots */}
              <div className="flex items-center gap-2">
                {deck.slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSlideIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                      activeSlideIndex === i
                        ? 'w-7 bg-cyan-600 shadow-xs'
                        : 'bg-stone-200 hover:bg-stone-400'
                    }`}
                  />
                ))}
              </div>

              <button
                disabled={activeSlideIndex === deck.slides.length - 1}
                onClick={() => setActiveSlideIndex(prev => Math.min(deck.slides.length - 1, prev + 1))}
                className="btn-aqua px-4 py-2 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
              >
                <span>Next Slide</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Agenda & Closing Hook */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-xs">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3 font-mono-accent">
                Recommended Meeting Agenda (30 Min)
              </h4>
              <ul className="space-y-2 text-xs text-stone-700">
                {deck.meetingAgenda?.map((agenda, idx) => (
                  <li key={idx} className="flex items-center gap-2 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                    <span className="w-5 h-5 rounded-full bg-cyan-100 text-cyan-800 font-mono text-[10px] flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <span>{agenda}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2 font-mono-accent">
                  Closing Value Proposition
                </h4>
                <p className="text-xs text-stone-700 leading-relaxed bg-stone-50 p-3.5 rounded-xl border border-stone-200 italic font-light">
                  "{deck.closingPitchHook}"
                </p>
              </div>

              <div className="text-[11px] text-cyan-800 mt-4 flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                <span>Ready for C-Suite board review</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
