import React, { useState } from 'react';
import { MarketingAgent } from './agents/MarketingAgent';
import { LeadAgent } from './agents/LeadAgent';
import { SeoAgent } from './agents/SeoAgent';
import { QuotationAgent } from './agents/QuotationAgent';
import { PresentationAgent } from './agents/PresentationAgent';
import { TrendScraperAgent } from './agents/TrendScraperAgent';
import { FlooringProduct } from '../types';
import { 
  Megaphone, 
  Users, 
  Globe, 
  Calculator, 
  Presentation, 
  Compass, 
  Cpu, 
  ArrowLeft
} from 'lucide-react';

interface AgentHubViewProps {
  onBackToShowroom: () => void;
  selectedProductForQuote?: FlooringProduct | null;
  onImportToCatalog?: (product: Partial<FlooringProduct>) => void;
  activeAgentId?: string;
}

export const AgentHubView: React.FC<AgentHubViewProps> = ({
  onBackToShowroom,
  selectedProductForQuote,
  onImportToCatalog,
  activeAgentId: propActiveAgentId,
}) => {
  const [activeTab, setActiveTab] = useState<string>(propActiveAgentId || 'marketing');

  const agentTabs = [
    {
      id: 'marketing',
      number: '1',
      title: 'Digital Marketing',
      subtitle: 'Ad & Social Campaign Generator',
      icon: Megaphone,
    },
    {
      id: 'leads',
      number: '2',
      title: 'Lead Gen & CRM',
      subtitle: 'Inbound Scoring & Closing Playbook',
      icon: Users,
    },
    {
      id: 'seo',
      number: '3',
      title: 'SEO Domination',
      subtitle: 'Programmatic Keyword & Schema Ranking',
      icon: Globe,
    },
    {
      id: 'quotation',
      number: '4',
      title: 'Quotation & CPQ',
      subtitle: 'BoQ Estimator & Printable Proposals',
      icon: Calculator,
    },
    {
      id: 'presentation',
      number: '5',
      title: 'Builder & IT Pitch',
      subtitle: 'Custom C-Suite Slide Decks',
      icon: Presentation,
    },
    {
      id: 'trends',
      number: '6',
      title: 'Design Scraping',
      subtitle: 'Expo Mining & Import Feasibility',
      icon: Compass,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* Top Header with Luxury Aqua Accent */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div>
          <button
            onClick={onBackToShowroom}
            className="text-xs font-bold text-cyan-800 hover:text-cyan-600 inline-flex items-center gap-1.5 mb-2.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Online Showroom</span>
          </button>

          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-serif-luxury font-black text-stone-950 tracking-tight">
              WE FLOORS • AI Autonomous Agents Hub
            </h1>
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-50 text-cyan-800 border border-cyan-200 flex items-center gap-1.5 font-mono-accent">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              6 Active Agents
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1 max-w-2xl font-light">
            Autonomous commercial business operating system handling marketing, lead qualification, search ranking, quotations, builder presentations, and global import curation.
          </p>
        </div>

        <div className="bg-gradient-to-r from-cyan-50 to-stone-50 px-4 py-2.5 rounded-xl border border-cyan-200/80 flex items-center gap-3 shadow-xs">
          <Cpu className="w-5 h-5 text-cyan-700" />
          <div className="text-xs">
            <span className="text-stone-400 block text-[10px] font-mono-accent uppercase font-bold">AI Core</span>
            <span className="text-stone-900 font-bold">Gemini 3.8 Flash • Online</span>
          </div>
        </div>
      </div>

      {/* 6 Simplified Agent Tabs with Aqua Active Style */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {agentTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                isActive
                  ? 'btn-aqua shadow-md border-transparent'
                  : 'bg-white border-stone-200 text-stone-600 hover:border-cyan-300 hover:bg-cyan-50/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-cyan-700'}`} />
                <span className={`text-[10px] font-mono-accent font-bold px-1.5 py-0.5 rounded ${
                  isActive ? 'bg-black/20 text-white' : 'bg-stone-100 text-stone-600'
                }`}>
                  #{tab.number}
                </span>
              </div>
              <div>
                <h4 className={`text-xs font-bold leading-tight ${isActive ? 'text-white' : 'text-stone-950 font-serif-luxury'}`}>
                  {tab.title}
                </h4>
                <p className={`text-[10px] mt-0.5 line-clamp-1 ${isActive ? 'text-cyan-100 font-medium' : 'text-stone-500'}`}>
                  {tab.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Agent Container */}
      <div className="pt-2">
        {activeTab === 'marketing' && <MarketingAgent />}
        {activeTab === 'leads' && <LeadAgent />}
        {activeTab === 'seo' && <SeoAgent />}
        {activeTab === 'quotation' && (
          <QuotationAgent initialProduct={selectedProductForQuote} />
        )}
        {activeTab === 'presentation' && <PresentationAgent />}
        {activeTab === 'trends' && (
          <TrendScraperAgent onImportToCatalog={onImportToCatalog} />
        )}
      </div>
    </div>
  );
};
