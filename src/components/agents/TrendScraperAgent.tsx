import React, { useState } from 'react';
import { TrendReportResult, FlooringProduct } from '../../types';
import { 
  Compass, 
  Sparkles, 
  Palette, 
  CheckCircle2, 
  PlusCircle, 
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';

interface TrendScraperAgentProps {
  onImportToCatalog?: (product: Partial<FlooringProduct>) => void;
}

export const TrendScraperAgent: React.FC<TrendScraperAgentProps> = ({ onImportToCatalog }) => {
  const [trendFocus, setTrendFocus] = useState(
    'Nordic Japandi Smoked Oak Herringbone & Sintered Terrazzo Stone Composite'
  );
  const [competitorSource, setCompetitorSource] = useState(
    'Cersaie Bologna 2026, Domotex Germany, and European Luxury Brands (Parador, Marazzi)'
  );
  const [importRegion, setImportRegion] = useState('Italy, Germany, Vietnam & South Korea OEM Mills');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TrendReportResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [importedIndex, setImportedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleScrapeTrends = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/agent/trend-scraping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trendFocus,
          competitorSource,
          importRegion,
        }),
      });

      if (!res.ok) {
        throw new Error('Trend scraping agent error');
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to scrape and curate flooring trends');
    } finally {
      setLoading(false);
    }
  };

  const handleImportDesignToCatalog = (design: any, index: number) => {
    if (onImportToCatalog) {
      onImportToCatalog({
        id: `import-${Date.now()}`,
        name: `WE FLOORS ${design.designName}`,
        category: 'spc-rigid',
        categoryLabel: 'Curated Import Line',
        subtitle: design.textureAndFinish,
        origin: design.originInspiration,
        pricePerSqFt: parseFloat(design.suggestedRetailPrice?.replace(/[^0-9.]/g, '') || '6.50'),
        bulkPricePerSqFt: parseFloat(design.landedCostEstimate?.replace(/[^0-9.]/g, '') || '4.20') * 1.35,
        dimensions: design.recommendedDimensions,
        wearLayer: 'Class 34 Heavy Commercial',
        acousticRatingNRC: 0.28,
        fireRating: 'Class Bfl-s1',
        waterproof: true,
        leedCredits: 'Low VOC, Recycled Core',
        description: `${design.originInspiration}. ${design.oemManufacturingNotes}`,
        imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
        texturePattern: 'herringbone',
        colors: design.colorPalette?.hexCodes || ['#8b5a2b', '#c19a6b'],
        recommendedFor: ['Luxury Residential', 'IT Tech Parks', 'Commercial Real Estate']
      });
    }
    setImportedIndex(index);
    setTimeout(() => setImportedIndex(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-cyan-50 border border-cyan-200 rounded-xl text-cyan-700 shadow-xs">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-cyan-800 uppercase tracking-wider font-mono-accent">Agent #6</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-100/70 text-cyan-900 border border-cyan-200">Global Design R&D</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif-luxury font-bold text-stone-950 mt-0.5">Global Trend & Design Scraping Agent</h2>
              <p className="text-xs text-stone-500 mt-0.5 font-light">
                Mines international design expos (Cersaie, Domotex) and competitor catalogs to engineer new high-margin import collections for WE FLOORS.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setTrendFocus('Scandinavian Japandi Ultra-Matte Light Oak & Wabi-Sabi Microcement');
                setCompetitorSource('Leading Nordic Brands (Kährs, Bjelin Woodura, Dinesen)');
                setImportRegion('Sweden & Vietnam OEM factories');
              }}
              className="btn-aqua-outline text-xs px-3.5 py-1.5 rounded-lg cursor-pointer font-bold"
            >
              Preset: Nordic Japandi
            </button>
            <button
              onClick={() => {
                setTrendFocus('Large-Format Bookmatched Calacatta & Portoro Sintered Stone Slabs');
                setCompetitorSource('Italian Tile Giants (Florim, Marazzi, Laminam at Cersaie)');
                setImportRegion('Sassuolo, Italy & Foshan automated press lines');
              }}
              className="btn-aqua-outline text-xs px-3.5 py-1.5 rounded-lg cursor-pointer font-bold"
            >
              Preset: Sintered Slabs
            </button>
          </div>
        </div>

        {/* Input Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-5 border-t border-stone-100 text-xs">
          <div>
            <label className="text-stone-700 font-bold block mb-1">Target Design Trend Focus</label>
            <input
              type="text"
              value={trendFocus}
              onChange={(e) => setTrendFocus(e.target.value)}
              className="w-full bg-stone-50/70 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="text-stone-700 font-bold block mb-1">Competitor / Expo Source</label>
            <input
              type="text"
              value={competitorSource}
              onChange={(e) => setCompetitorSource(e.target.value)}
              className="w-full bg-stone-50/70 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="text-stone-700 font-bold block mb-1">Target Import Manufacturing Hubs</label>
            <input
              type="text"
              value={importRegion}
              onChange={(e) => setImportRegion(e.target.value)}
              className="w-full bg-stone-50/70 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleScrapeTrends}
            disabled={loading}
            className="btn-aqua px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Mining Global Expo Archives & Calculating Landed Costs...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-cyan-100" />
                <span>Scrape & Curate Import Collections</span>
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

      {/* Generated Trend Report */}
      {result && (
        <div className="space-y-6">
          {/* Header & Market Sentiment */}
          <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3">
              <div>
                <span className="text-[10px] text-cyan-800 font-bold uppercase tracking-wider font-mono-accent">Global Trend Intelligence</span>
                <h3 className="text-xl font-serif-luxury font-bold text-stone-950">{result.trendReportTitle}</h3>
              </div>

              <button
                onClick={() => handleCopy(JSON.stringify(result, null, 2), 'trend-json')}
                className="btn-aqua-outline px-3.5 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
              >
                {copiedKey === 'trend-json' ? <Check className="w-3.5 h-3.5 text-cyan-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Export Sourcing Brief</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-xl border border-stone-200">
              <strong className="text-stone-950 block mb-1">Global Market Sentiment:</strong>
              {result.globalMarketSentiment}
            </p>
          </div>

          {/* Curated New Designs for Import Cards */}
          <div className="space-y-4">
            <h4 className="text-base font-serif-luxury font-bold text-stone-950 flex items-center gap-2">
              <Palette className="w-4 h-4 text-cyan-600" />
              Curated Designs for New WE FLOORS Import Collections
            </h4>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {result.curatedDesigns?.map((design, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-stone-200/90 hover:border-cyan-400 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold text-cyan-900 uppercase bg-cyan-100/70 px-2.5 py-0.5 rounded font-mono-accent">
                          Origin: {design.originInspiration}
                        </span>
                        <h5 className="text-lg font-serif-luxury font-bold text-stone-950 mt-1">
                          {design.designName}
                        </h5>
                      </div>

                      <div className="bg-stone-50 px-3 py-1 rounded-xl border border-stone-200 text-center flex-shrink-0">
                        <span className="text-[9px] text-stone-500 block uppercase font-bold">Feasibility</span>
                        <span className="text-sm font-black text-cyan-800 font-mono">
                          {design.importFeasibilityScore}/10
                        </span>
                      </div>
                    </div>

                    {/* Color Palette & Hex Swatches */}
                    <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-stone-700 font-bold">Tonal Palette:</span>
                        <span className="text-stone-600 text-[11px] font-medium">{design.colorPalette?.primaryTone}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {design.colorPalette?.hexCodes?.map((hex, i) => (
                          <div key={i} className="flex items-center gap-1.5 bg-white px-2 py-1 rounded border border-stone-300 text-[10px] font-mono text-stone-800 shadow-xs">
                            <span className="w-3.5 h-3.5 rounded-full border border-stone-300" style={{ backgroundColor: hex }} />
                            <span>{hex}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] text-stone-500 mt-2 italic">Undertones: {design.colorPalette?.undertones}</p>
                    </div>

                    {/* Texture, Finish & Dimensions */}
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
                        <span className="text-[10px] text-stone-500 block uppercase font-bold">Texture & Finish</span>
                        <span className="text-stone-900 font-medium">{design.textureAndFinish}</span>
                      </div>
                      <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
                        <span className="text-[10px] text-stone-500 block uppercase font-bold">Dimensions</span>
                        <span className="text-stone-900 font-medium">{design.recommendedDimensions}</span>
                      </div>
                    </div>

                    {/* OEM Manufacturing Notes */}
                    <div className="text-xs text-stone-600 bg-stone-50 p-3 rounded-lg border border-stone-200">
                      <strong className="text-stone-900 block mb-0.5">OEM Tooling & Sourcing Note:</strong>
                      {design.oemManufacturingNotes}
                    </div>

                    {/* Economics */}
                    <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-stone-100 text-xs">
                      <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                        <span className="text-[9px] text-stone-500 block uppercase font-bold">Landed Cost</span>
                        <span className="font-mono font-bold text-stone-700">{design.landedCostEstimate}</span>
                      </div>
                      <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                        <span className="text-[9px] text-stone-500 block uppercase font-bold">Suggested Retail</span>
                        <span className="font-mono font-bold text-cyan-800">{design.suggestedRetailPrice}</span>
                      </div>
                      <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                        <span className="text-[9px] text-stone-500 block uppercase font-bold">Gross Margin</span>
                        <span className="font-mono font-bold text-emerald-700">{design.estimatedGrossMargin}</span>
                      </div>
                    </div>
                  </div>

                  {/* 1-Click Import with Aqua Button */}
                  <div className="mt-5 pt-3 border-t border-stone-100 flex justify-end">
                    <button
                      onClick={() => handleImportDesignToCatalog(design, idx)}
                      className="btn-aqua px-4 py-2 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      {importedIndex === idx ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          <span>Added to WE FLOORS Showroom!</span>
                        </>
                      ) : (
                        <>
                          <PlusCircle className="w-3.5 h-3.5" />
                          <span>Add to Showroom Catalog</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Competitor Gap Analysis & Production Roadmap */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-xs">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2 font-mono-accent">
                Competitor Gap Analysis
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed bg-stone-50 p-4 rounded-xl border border-stone-200">
                {result.competitorGapAnalysis}
              </p>
            </div>

            <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-xs">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-2 font-mono-accent">
                Next-Quarter Sourcing Action
              </h4>
              <ul className="space-y-2 text-xs text-stone-600">
                {result.nextQuarterProductionAction?.map((act, idx) => (
                  <li key={idx} className="flex items-center gap-2 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                    <CheckCircle2 className="w-4 h-4 text-cyan-600 flex-shrink-0" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
