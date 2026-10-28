/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ShowroomView } from './components/ShowroomView';
import { AgentHubView } from './components/AgentHubView';
import { SampleModal } from './components/SampleModal';
import { MOCK_PRODUCTS } from './data/mockProducts';
import { FlooringProduct, InboundLead } from './types';
import { 
  Layers, 
  Sparkles, 
  Building2, 
  PhoneCall, 
  Mail, 
  Cpu, 
  ArrowRight
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'showroom' | 'agents'>('showroom');
  const [activeAgentId, setActiveAgentId] = useState<string>('marketing');
  const [products, setProducts] = useState<FlooringProduct[]>(MOCK_PRODUCTS);
  const [selectedProductForQuote, setSelectedProductForQuote] = useState<FlooringProduct | null>(null);
  const [sampleModalProduct, setSampleModalProduct] = useState<FlooringProduct | null>(null);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);

  const handleSelectProductForQuote = (product: FlooringProduct) => {
    setSelectedProductForQuote(product);
    setActiveAgentId('quotation');
    setCurrentView('agents');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRequestSample = (product?: FlooringProduct) => {
    setSampleModalProduct(product || products[0]);
    setIsSampleModalOpen(true);
  };

  const handleOpenQuotationAgent = () => {
    setActiveAgentId('quotation');
    setCurrentView('agents');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImportToCatalog = (newProductData: Partial<FlooringProduct>) => {
    const fullProduct: FlooringProduct = {
      id: newProductData.id || `import-${Date.now()}`,
      name: newProductData.name || 'WE FLOORS Curated Spec',
      category: newProductData.category || 'spc-rigid',
      categoryLabel: newProductData.categoryLabel || 'Imported Spec',
      subtitle: newProductData.subtitle || 'Direct Mill Container Sourced Spec',
      origin: newProductData.origin || 'European OEM Partner',
      pricePerSqFt: newProductData.pricePerSqFt || 5.80,
      bulkPricePerSqFt: newProductData.bulkPricePerSqFt || 4.20,
      dimensions: newProductData.dimensions || '180mm x 1220mm Planks',
      wearLayer: newProductData.wearLayer || 'Class 34 Heavy Commercial',
      acousticRatingNRC: newProductData.acousticRatingNRC || 0.28,
      fireRating: newProductData.fireRating || 'Class Bfl-s1',
      waterproof: newProductData.waterproof ?? true,
      leedCredits: newProductData.leedCredits || 'Low Emitting Material Certified',
      description: newProductData.description || 'Imported collection curated by WE FLOORS AI Design Trend Scraper.',
      imageUrl: newProductData.imageUrl || 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      texturePattern: newProductData.texturePattern || 'straight',
      colors: newProductData.colors || ['#c4a482', '#a67b5b'],
      recommendedFor: newProductData.recommendedFor || ['IT Tech Parks', 'Luxury Residential']
    };

    setProducts(prev => [fullProduct, ...prev]);
  };

  const handleLeadSubmitted = (lead: InboundLead) => {
    console.log('Inbound lead captured:', lead);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-stone-900 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onViewChange={setCurrentView}
        onRequestSample={() => handleRequestSample()}
        onOpenQuotationAgent={handleOpenQuotationAgent}
      />

      {/* Main Body */}
      <main className="flex-1">
        {currentView === 'showroom' ? (
          <ShowroomView
            onSelectProductForQuote={handleSelectProductForQuote}
            onRequestSample={handleRequestSample}
            onOpenAgentSuite={() => {
              setCurrentView('agents');
              setActiveAgentId('marketing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : (
          <AgentHubView
            onBackToShowroom={() => {
              setCurrentView('showroom');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            selectedProductForQuote={selectedProductForQuote}
            onImportToCatalog={handleImportToCatalog}
            activeAgentId={activeAgentId}
          />
        )}
      </main>

      {/* Sample Swatch Request Modal */}
      {isSampleModalOpen && (
        <SampleModal
          product={sampleModalProduct}
          onClose={() => setIsSampleModalOpen(false)}
          onSubmitLead={handleLeadSubmitted}
        />
      )}

      {/* Clean Light Architectural Footer */}
      <footer className="no-print bg-white border-t border-stone-200 pt-16 pb-12 text-xs text-stone-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Column 1: Brand */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-stone-900 flex items-center justify-center text-white font-black text-xs">
                  WE
                </div>
                <span className="font-bold text-lg text-stone-900 tracking-tight">
                  WE FLOORS
                </span>
              </div>
              <p className="text-stone-500 text-xs leading-relaxed">
                Direct-import architectural surfaces, acoustic IT flooring systems, and autonomous AI business infrastructure for builders and architects.
              </p>
              <div className="text-[11px] text-amber-800 font-semibold">
                Direct Mill Container Sourcing • ISO 9001 Certified
              </div>
            </div>

            {/* Column 2: Architectural Collections */}
            <div>
              <h4 className="font-bold text-stone-900 uppercase font-mono tracking-wider mb-3">
                Commercial Collections
              </h4>
              <ul className="space-y-2 text-stone-600">
                <li className="hover:text-stone-900 cursor-pointer transition-colors" onClick={() => setCurrentView('showroom')}>
                  Nexus Acoustic IT Carpet Tiles (NRC 0.32)
                </li>
                <li className="hover:text-stone-900 cursor-pointer transition-colors" onClick={() => setCurrentView('showroom')}>
                  Nordic Chevron Rigid SPC 7mm Waterproof
                </li>
                <li className="hover:text-stone-900 cursor-pointer transition-colors" onClick={() => setCurrentView('showroom')}>
                  Bavarian Smoked Oak Grand Planks
                </li>
                <li className="hover:text-stone-900 cursor-pointer transition-colors" onClick={() => setCurrentView('showroom')}>
                  Calacatta Vagli Sintered Porcelain Slabs
                </li>
                <li className="hover:text-stone-900 cursor-pointer transition-colors" onClick={() => setCurrentView('showroom')}>
                  Palazzo Monolithic Cast Venetian Terrazzo
                </li>
              </ul>
            </div>

            {/* Column 3: 6 Autonomous AI Agents */}
            <div>
              <h4 className="font-bold text-stone-900 uppercase font-mono tracking-wider mb-3 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-stone-700" />
                <span>AI Operating Suite</span>
              </h4>
              <ul className="space-y-2 text-stone-600">
                <li 
                  onClick={() => { setCurrentView('agents'); setActiveAgentId('marketing'); }}
                  className="hover:text-stone-900 cursor-pointer transition-colors"
                >
                  Agent 1: Digital Marketing Growth
                </li>
                <li 
                  onClick={() => { setCurrentView('agents'); setActiveAgentId('leads'); }}
                  className="hover:text-stone-900 cursor-pointer transition-colors"
                >
                  Agent 2: Lead Generation & Pipeline Scoring
                </li>
                <li 
                  onClick={() => { setCurrentView('agents'); setActiveAgentId('seo'); }}
                  className="hover:text-stone-900 cursor-pointer transition-colors"
                >
                  Agent 3: Top-Rank SEO Dominator
                </li>
                <li 
                  onClick={() => { setCurrentView('agents'); setActiveAgentId('quotation'); }}
                  className="hover:text-stone-900 cursor-pointer transition-colors"
                >
                  Agent 4: Instant Quotation & BoQ CPQ
                </li>
                <li 
                  onClick={() => { setCurrentView('agents'); setActiveAgentId('presentation'); }}
                  className="hover:text-stone-900 cursor-pointer transition-colors"
                >
                  Agent 5: Builder & IT Pitch Deck Generator
                </li>
                <li 
                  onClick={() => { setCurrentView('agents'); setActiveAgentId('trends'); }}
                  className="hover:text-stone-900 cursor-pointer transition-colors"
                >
                  Agent 6: Global Trend Scraping & Imports
                </li>
              </ul>
            </div>

            {/* Column 4: Contact & Architect Desk */}
            <div>
              <h4 className="font-bold text-stone-900 uppercase font-mono tracking-wider mb-3">
                Architect Project Desk
              </h4>
              <p className="text-xs text-stone-500 mb-3">
                Priority support for commercial projects over 10,000 sq.ft.
              </p>
              <div className="space-y-2 text-stone-700">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-stone-500" />
                  <span>architects@wefloors.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5 text-stone-500" />
                  <span>+1 (800) 459-WEFLOOR</span>
                </div>
              </div>

              <button
                onClick={() => handleRequestSample()}
                className="btn-aqua-outline mt-4 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all w-full text-center block cursor-pointer"
              >
                Request Free Swatches
              </button>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center text-[11px] text-stone-500 gap-4">
            <div>
              © 2026 WE FLOORS Commercial Surfaces & Imports. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span>LEED v4.1 Compliant</span>
              <span>•</span>
              <span>CRI Green Label Plus</span>
              <span>•</span>
              <span>Class 33/34 Commercial Rating</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
