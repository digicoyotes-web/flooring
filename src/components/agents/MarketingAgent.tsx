import React, { useState } from 'react';
import { MarketingCampaignResult } from '../../types';
import { 
  Megaphone, 
  Sparkles, 
  Copy, 
  Check, 
  Linkedin, 
  Instagram, 
  Search, 
  Mail, 
  TrendingUp, 
  DollarSign, 
  Target,
  RefreshCw
} from 'lucide-react';

export const MarketingAgent: React.FC = () => {
  const [campaignType, setCampaignType] = useState('B2B Builder & Commercial Spec Launch');
  const [targetAudience, setTargetAudience] = useState('Commercial Real Estate Builders, IT Park Facilities Directors, Commercial Architects');
  const [keyProduct, setKeyProduct] = useState('WE FLOORS Acoustic IT Carpet Tiles & Rigid SPC 7mm Waterproof Core');
  const [promoOffer, setPromoOffer] = useState('Complimentary Architect Sample Swatch Box + 18% Commercial Volume Rebate');
  const [tone, setTone] = useState('Modern, Architectural, Direct, High-ROI');
  const [platform, setPlatform] = useState('Omnichannel (LinkedIn B2B, Google Ads, Meta Ads)');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MarketingCampaignResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/agent/marketing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignType,
          targetAudience,
          keyProduct,
          promoOffer,
          tone,
          platform,
        }),
      });

      if (!res.ok) {
        throw new Error('Marketing agent service unavailable');
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to generate campaign. Check your Gemini API connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Agent Banner & Configuration */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-cyan-50 border border-cyan-200 rounded-xl text-cyan-700 shadow-xs">
              <Megaphone className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-cyan-800 uppercase tracking-wider font-mono-accent">Agent #1</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-100/70 text-cyan-900 border border-cyan-200">Autonomous Growth Engine</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif-luxury font-bold text-stone-950 mt-0.5">Digital Marketing & Growth Agent</h2>
              <p className="text-xs text-stone-500 mt-0.5 font-light">
                Plans and executes cross-channel campaigns across Google Ads, LinkedIn, Instagram, and Email.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCampaignType('IT Tech Park Acoustic Flooring Drive');
                setTargetAudience('IT Facilities Directors, Space Planners, LEED Consultants');
                setKeyProduct('WE FLOORS Nexus Acoustic Matrix 50x50 Carpet Tile (NRC 0.32)');
                setPromoOffer('Free Acoustic Audit & Sample Planks for Tech Campuses');
              }}
              className="btn-aqua-outline text-xs px-3.5 py-1.5 rounded-lg cursor-pointer font-bold"
            >
              Preset: IT Parks
            </button>
            <button
              onClick={() => {
                setCampaignType('Ultra-Luxury Villa Builder Spec Launch');
                setTargetAudience('Luxury Real Estate Developers, Penthouse Architects, High-End Interior Designers');
                setKeyProduct('WE FLOORS Bavarian Smoked Oak Grand Planks & Calacatta Sintered Porcelain Slabs');
                setPromoOffer('VIP Master Architect Swatch Box + Dedicated Project Container Logistics');
              }}
              className="btn-aqua-outline text-xs px-3.5 py-1.5 rounded-lg cursor-pointer font-bold"
            >
              Preset: Luxury Builders
            </button>
          </div>
        </div>

        {/* Configuration Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-5 border-t border-stone-100 text-xs">
          <div>
            <label className="text-stone-700 font-bold block mb-1">Campaign Objective</label>
            <input
              type="text"
              value={campaignType}
              onChange={(e) => setCampaignType(e.target.value)}
              className="w-full bg-stone-50/70 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
            />
          </div>
          <div>
            <label className="text-stone-700 font-bold block mb-1">Target Audience</label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-full bg-stone-50/70 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
            />
          </div>
          <div>
            <label className="text-stone-700 font-bold block mb-1">Featured Product</label>
            <input
              type="text"
              value={keyProduct}
              onChange={(e) => setKeyProduct(e.target.value)}
              className="w-full bg-stone-50/70 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
            />
          </div>
          <div>
            <label className="text-stone-700 font-bold block mb-1">Incentive / Offer</label>
            <input
              type="text"
              value={promoOffer}
              onChange={(e) => setPromoOffer(e.target.value)}
              className="w-full bg-stone-50/70 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
            />
          </div>
          <div>
            <label className="text-stone-700 font-bold block mb-1">Brand Voice</label>
            <input
              type="text"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full bg-stone-50/70 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
            />
          </div>
          <div>
            <label className="text-stone-700 font-bold block mb-1">Channel Strategy</label>
            <input
              type="text"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full bg-stone-50/70 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="btn-aqua px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Generating Campaign with Gemini...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-cyan-100" />
                <span>Generate Autonomous Campaign</span>
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

      {/* Generated Campaign Output */}
      {result && (
        <div className="space-y-6">
          {/* Executive Overview & KPI Projections */}
          <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <div>
                <span className="text-[10px] text-cyan-800 font-bold uppercase tracking-wider font-mono-accent">Campaign Blueprint</span>
                <h3 className="text-xl font-serif-luxury font-bold text-stone-950">{result.campaignName}</h3>
              </div>
              <button
                onClick={() => handleCopy(JSON.stringify(result, null, 2), 'all')}
                className="btn-aqua-outline px-3.5 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
              >
                {copiedKey === 'all' ? <Check className="w-3.5 h-3.5 text-cyan-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Full Campaign</span>
              </button>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-xl border border-stone-200">
              {result.executiveSummary}
            </p>

            {/* Estimated KPIs */}
            {result.estimatedKpis && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                  <span className="text-[10px] text-stone-500 uppercase font-bold flex items-center gap-1">
                    <DollarSign className="w-3 h-3 text-cyan-600" /> Target CPL
                  </span>
                  <span className="text-base font-black text-stone-900 font-mono">{result.estimatedKpis.estimatedCpl}</span>
                </div>
                <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                  <span className="text-[10px] text-stone-500 uppercase font-bold flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-cyan-600" /> Projected CTR
                  </span>
                  <span className="text-base font-black text-stone-900 font-mono">{result.estimatedKpis.targetCtr}</span>
                </div>
                <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                  <span className="text-[10px] text-stone-500 uppercase font-bold flex items-center gap-1">
                    <Target className="w-3 h-3 text-cyan-600" /> Weekly Ad Spend
                  </span>
                  <span className="text-base font-black text-stone-900 font-mono">{result.estimatedKpis.recommendedWeeklyBudget}</span>
                </div>
                <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                  <span className="text-[10px] text-stone-500 uppercase font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-cyan-600" /> Projected Lead Vol
                  </span>
                  <span className="text-base font-black text-stone-900 font-mono">{result.estimatedKpis.projectedLeadVolume}</span>
                </div>
              </div>
            )}
          </div>

          {/* Ad Copies */}
          <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-xs">
            <h4 className="text-base font-serif-luxury font-bold text-stone-950 mb-4 flex items-center gap-2">
              <Search className="w-4 h-4 text-cyan-600" />
              High-Converting Ad Matrix (Meta, LinkedIn, Google Search)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {result.adCopies?.map((ad, idx) => (
                <div key={idx} className="bg-stone-50 border border-stone-200 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-cyan-900 uppercase bg-cyan-100/70 px-2.5 py-0.5 rounded font-mono-accent">
                        {ad.platform}
                      </span>
                      <button
                        onClick={() => handleCopy(`${ad.headline}\n\n${ad.primaryText}\n\nCTA: ${ad.callToAction}`, `ad-${idx}`)}
                        className="text-stone-400 hover:text-cyan-700 p-1 cursor-pointer"
                      >
                        {copiedKey === `ad-${idx}` ? <Check className="w-3.5 h-3.5 text-cyan-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <h5 className="text-xs sm:text-sm font-bold text-stone-950 mb-2">{ad.headline}</h5>
                    <p className="text-xs text-stone-600 leading-relaxed mb-3">{ad.primaryText}</p>
                  </div>

                  <div className="pt-3 border-t border-stone-200 text-xs">
                    <span className="text-stone-500 block text-[10px] uppercase font-bold">Recommended Targeting</span>
                    <p className="text-stone-600 text-[11px] italic mt-0.5">{ad.recommendedTargeting}</p>
                    <div className="mt-2 text-cyan-900 font-bold font-mono text-[11px]">CTA: {ad.callToAction}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Organic Social & LinkedIn */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {result.socialMediaContent?.instagramReelScript && (
              <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-base font-serif-luxury font-bold text-stone-950 flex items-center gap-2">
                      <Instagram className="w-4 h-4 text-cyan-600" />
                      Showroom Instagram Reel Script
                    </h4>
                    <button
                      onClick={() => handleCopy(
                        `HOOK: ${result.socialMediaContent.instagramReelScript.hook}\n\nVOICEOVER: ${result.socialMediaContent.instagramReelScript.voiceoverScript}\n\nHASHTAGS: ${result.socialMediaContent.instagramReelScript.hashtags?.join(' ')}`,
                        'reel'
                      )}
                      className="text-stone-400 hover:text-cyan-700 p-1 cursor-pointer"
                    >
                      {copiedKey === 'reel' ? <Check className="w-3.5 h-3.5 text-cyan-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="bg-cyan-50/70 border border-cyan-200 p-3 rounded-lg text-xs text-cyan-950 mb-3 font-medium">
                    <strong>Hook:</strong> "{result.socialMediaContent.instagramReelScript.hook}"
                  </div>

                  <span className="text-[11px] text-stone-700 block mb-1 font-bold">Visual Scenes:</span>
                  <ul className="space-y-1.5 text-xs text-stone-600 mb-4 pl-4 list-disc">
                    {result.socialMediaContent.instagramReelScript.visualSceneBreakdown?.map((scene, i) => (
                      <li key={i}>{scene}</li>
                    ))}
                  </ul>

                  <span className="text-[11px] text-stone-700 block mb-1 font-bold">Voiceover Audio:</span>
                  <p className="text-xs text-stone-700 italic bg-stone-50 p-3 rounded-lg border border-stone-200">
                    "{result.socialMediaContent.instagramReelScript.voiceoverScript}"
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-stone-100">
                  {result.socialMediaContent.instagramReelScript.hashtags?.map((tag, i) => (
                    <span key={i} className="text-[10px] text-stone-600 bg-stone-100 px-2 py-0.5 rounded font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {result.socialMediaContent?.linkedInArticlePost && (
              <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-base font-serif-luxury font-bold text-stone-950 flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-cyan-600" />
                      LinkedIn B2B Executive Article
                    </h4>
                    <button
                      onClick={() => handleCopy(
                        `${result.socialMediaContent.linkedInArticlePost.title}\n\n${result.socialMediaContent.linkedInArticlePost.body}\n\n${result.socialMediaContent.linkedInArticlePost.callToAction}`,
                        'linkedin'
                      )}
                      className="text-stone-400 hover:text-cyan-700 p-1 cursor-pointer"
                    >
                      {copiedKey === 'linkedin' ? <Check className="w-3.5 h-3.5 text-cyan-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <h5 className="text-sm font-bold text-stone-950 mb-2">
                    {result.socialMediaContent.linkedInArticlePost.title}
                  </h5>

                  <div className="text-xs text-stone-700 whitespace-pre-line leading-relaxed bg-stone-50 p-4 rounded-xl border border-stone-200 max-h-72 overflow-y-auto">
                    {result.socialMediaContent.linkedInArticlePost.body}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 text-xs font-bold text-cyan-900">
                  CTA: {result.socialMediaContent.linkedInArticlePost.callToAction}
                </div>
              </div>
            )}
          </div>

          {/* Email Sequence */}
          {result.emailNurtureSequence && (
            <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-xs">
              <h4 className="text-base font-serif-luxury font-bold text-stone-950 mb-4 flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-600" />
                Architect & Builder Email Drip Sequence
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {result.emailNurtureSequence.map((email, idx) => (
                  <div key={idx} className="bg-stone-50 border border-stone-200 rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-cyan-900 uppercase bg-cyan-100/70 px-2 py-0.5 rounded font-mono-accent">
                          Step {email.step}: {email.timing}
                        </span>
                        <button
                          onClick={() => handleCopy(`Subject: ${email.subject}\n\n${email.bodySnippet}\n\nCTA: ${email.cta}`, `email-${idx}`)}
                          className="text-stone-400 hover:text-cyan-700 p-1 cursor-pointer"
                        >
                          {copiedKey === `email-${idx}` ? <Check className="w-3.5 h-3.5 text-cyan-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      <h5 className="text-xs font-bold text-stone-950 mb-2">
                        Subject: {email.subject}
                      </h5>

                      <p className="text-xs text-stone-600 leading-relaxed mb-3">
                        {email.bodySnippet}
                      </p>
                    </div>

                    <div className="text-[11px] text-cyan-900 font-bold pt-3 border-t border-stone-200 font-mono">
                      CTA: {email.cta}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
