import React, { useState } from 'react';
import { SeoCampaignResult } from '../../types';
import { 
  Globe, 
  Sparkles, 
  Search, 
  Copy, 
  Check, 
  FileCode, 
  ExternalLink, 
  Layers, 
  TrendingUp, 
  RefreshCw
} from 'lucide-react';

export const SeoAgent: React.FC = () => {
  const [targetTopic, setTargetTopic] = useState('Commercial Acoustic Carpet Tiles for IT Offices and Tech Parks');
  const [targetCity, setTargetCity] = useState('Bangalore, Hyderabad, Mumbai & Silicon Valley');
  const [competitorFocus, setCompetitorFocus] = useState('WE FLOORS outranking local distributors with direct European factory specs and 48h sample kits');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SeoCampaignResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleGenerateSeo = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/agent/seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetTopic,
          targetCity,
          competitorFocus,
        }),
      });

      if (!res.ok) {
        throw new Error('SEO Dominator service error');
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to generate SEO strategy');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-cyan-50 border border-cyan-200 rounded-xl text-cyan-700 shadow-xs">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-cyan-800 uppercase tracking-wider font-mono-accent">Agent #3</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-100/70 text-cyan-900 border border-cyan-200">Google Rank Dominator</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif-luxury font-bold text-stone-950 mt-0.5">SEO Domination & Organic Ranking Agent</h2>
              <p className="text-xs text-stone-500 mt-0.5 font-light">
                Engineers programmatic commercial keywords, rich schema JSON-LD, and high-converting builder landing page architectures.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setTargetTopic('Waterproof Rigid SPC Flooring Wholesale for Real Estate Developers');
                setTargetCity('National Builder Corridors (Delhi NCR, Pune, Chennai, Dubai)');
                setCompetitorFocus('Demonstrating 40% lower installation cost vs vitrified tiles with 28mil wear layer');
              }}
              className="btn-aqua-outline text-xs px-3.5 py-1.5 rounded-lg cursor-pointer font-bold"
            >
              Preset: SPC Wholesale
            </button>
            <button
              onClick={() => {
                setTargetTopic('German Smoked Oak Herringbone Hardwood for Luxury Villas');
                setTargetCity('Luxury Markets (South Delhi, Palm Jumeirah, Beverly Hills)');
                setCompetitorFocus('Positioning against synthetic laminates with FSC-certified 4mm Baltic Birch engineered timber');
              }}
              className="btn-aqua-outline text-xs px-3.5 py-1.5 rounded-lg cursor-pointer font-bold"
            >
              Preset: Luxury Hardwood
            </button>
          </div>
        </div>

        {/* Form Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-5 border-t border-stone-100 text-xs">
          <div>
            <label className="text-stone-700 font-bold block mb-1">Target Pillar Topic / Keyword</label>
            <input
              type="text"
              value={targetTopic}
              onChange={(e) => setTargetTopic(e.target.value)}
              className="w-full bg-stone-50/70 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
            />
          </div>
          <div>
            <label className="text-stone-700 font-bold block mb-1">Target City / Market</label>
            <input
              type="text"
              value={targetCity}
              onChange={(e) => setTargetCity(e.target.value)}
              className="w-full bg-stone-50/70 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
            />
          </div>
          <div>
            <label className="text-stone-700 font-bold block mb-1">Competitor Angle / Edge</label>
            <input
              type="text"
              value={competitorFocus}
              onChange={(e) => setCompetitorFocus(e.target.value)}
              className="w-full bg-stone-50/70 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleGenerateSeo}
            disabled={loading}
            className="btn-aqua px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Auditing SERP & Engineering Content Architecture...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-cyan-100" />
                <span>Execute SEO Domination Plan</span>
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

      {/* SEO Package Output */}
      {result && (
        <div className="space-y-6">
          {/* Metadata & SERP Snippet Preview */}
          <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base font-serif-luxury font-bold text-stone-950 flex items-center gap-2">
                <Search className="w-4 h-4 text-cyan-600" />
                Google SERP Snippet Preview (Top Ranking)
              </h4>
              <button
                onClick={() => handleCopy(`Title: ${result.metaTitle}\nDescription: ${result.metaDescription}`, 'meta')}
                className="btn-aqua-outline px-3 py-1 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
              >
                {copiedKey === 'meta' ? <Check className="w-3.5 h-3.5 text-cyan-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Meta Tags</span>
              </button>
            </div>

            {/* Simulated Google Search Result */}
            <div className="bg-white p-4 rounded-xl border border-stone-200 max-w-2xl font-sans text-xs shadow-xs">
              <div className="text-[11px] text-stone-500 mb-1">
                https://wefloors.com › commercial › acoustic-carpet-tiles
              </div>
              <h3 className="text-base text-cyan-800 hover:underline cursor-pointer font-bold leading-snug">
                {result.metaTitle}
              </h3>
              <p className="text-stone-600 text-xs mt-1 leading-relaxed">
                {result.metaDescription}
              </p>
            </div>
          </div>

          {/* High Intent Focus Keyword Matrix */}
          <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-xs">
            <h4 className="text-base font-serif-luxury font-bold text-stone-950 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-600" />
              Target High-Intent Keyword Matrix
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {result.focusKeywords?.map((kw, idx) => (
                <div key={idx} className="bg-stone-50 border border-stone-200 rounded-xl p-3.5 text-xs flex flex-col justify-between">
                  <div>
                    <span className="font-bold text-stone-950 block text-xs sm:text-sm mb-1 font-serif-luxury">{kw.keyword}</span>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] bg-cyan-100 text-cyan-900 font-bold px-2 py-0.5 rounded font-mono-accent">
                        {kw.searchIntent}
                      </span>
                      <span className="text-[10px] text-stone-500">
                        Difficulty: <strong className="text-stone-800">{kw.difficulty}</strong>
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-stone-600 pt-2 border-t border-stone-200">
                    <strong className="text-cyan-900">Placement:</strong> {kw.recommendedPlacement}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Content Outline & Schema Markup */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-white border border-stone-200/90 rounded-2xl p-6 shadow-xs">
              <h4 className="text-base font-serif-luxury font-bold text-stone-950 mb-2 flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-600" />
                Pillar Page Content Architecture
              </h4>
              <p className="text-xs text-cyan-900 font-bold mb-4 bg-cyan-50/80 p-2.5 rounded-lg border border-cyan-200 font-mono-accent">
                H1: {result.contentOutline?.h1}
              </p>

              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {result.contentOutline?.sections?.map((sec, i) => (
                  <div key={i} className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 text-xs">
                    <h5 className="font-bold text-stone-900 mb-1.5 flex items-center gap-2">
                      <span className="text-cyan-700 font-mono font-bold">H2:</span>
                      <span>{sec.h2}</span>
                    </h5>
                    <ul className="space-y-1 text-stone-600 pl-4 list-disc mb-2">
                      {sec.keyPoints?.map((pt, j) => (
                        <li key={j}>{pt}</li>
                      ))}
                    </ul>
                    <span className="text-[11px] text-stone-800 block bg-white px-2.5 py-1 rounded border border-stone-200">
                      <strong>Commercial Hook:</strong> {sec.commercialValueAdd}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              {/* Schema JSON-LD */}
              <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-stone-950 uppercase tracking-wider flex items-center gap-1.5 font-mono-accent">
                    <FileCode className="w-4 h-4 text-cyan-600" />
                    Schema.org (JSON-LD)
                  </h4>
                  <button
                    onClick={() => handleCopy(result.schemaMarkupJsonLd, 'schema')}
                    className="p-1 text-stone-500 hover:text-cyan-700 cursor-pointer"
                  >
                    {copiedKey === 'schema' ? <Check className="w-3.5 h-3.5 text-cyan-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <pre className="text-[10px] font-mono text-cyan-950 bg-stone-50 p-3 rounded-lg border border-stone-200 overflow-x-auto max-h-48">
                  {typeof result.schemaMarkupJsonLd === 'object'
                    ? JSON.stringify(result.schemaMarkupJsonLd, null, 2)
                    : result.schemaMarkupJsonLd}
                </pre>
              </div>

              {/* Backlinks */}
              <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-xs">
                <h4 className="text-xs font-bold text-stone-950 uppercase tracking-wider mb-3 font-mono-accent">
                  Backlink Outreach Targets
                </h4>
                <ul className="space-y-2 text-xs text-stone-600">
                  {result.backlinkStrategy?.map((link, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-stone-50 p-2 rounded border border-stone-200">
                      <ExternalLink className="w-3.5 h-3.5 text-cyan-600 flex-shrink-0 mt-0.5" />
                      <span>{link}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
