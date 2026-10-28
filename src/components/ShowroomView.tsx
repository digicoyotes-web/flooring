import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { FlooringProduct, FlooringCategory } from '../types';
import { RoomVisualizer } from './RoomVisualizer';
import { 
  Layers, 
  Sparkles, 
  Package, 
  Shield, 
  Volume2, 
  Building2, 
  Check, 
  ExternalLink, 
  ArrowRight, 
  Award,
  Zap,
  CheckCircle2,
  Compass
} from 'lucide-react';

interface ShowroomViewProps {
  onSelectProductForQuote: (product: FlooringProduct) => void;
  onRequestSample: (product: FlooringProduct) => void;
  onOpenAgentSuite: () => void;
}

export const ShowroomView: React.FC<ShowroomViewProps> = ({
  onSelectProductForQuote,
  onRequestSample,
  onOpenAgentSuite,
}) => {
  const [activeCategory, setActiveCategory] = useState<FlooringCategory>('all');
  const [selectedProductForModal, setSelectedProductForModal] = useState<FlooringProduct | null>(null);

  const categories = [
    { id: 'all', label: 'All Haute Collections' },
    { id: 'it-carpet', label: 'Acoustic IT Carpet' },
    { id: 'spc-rigid', label: 'Rigid SPC Waterproof' },
    { id: 'engineered-wood', label: 'Engineered Oak' },
    { id: 'porcelain-slab', label: 'Italian Sintered Stone' },
    { id: 'terrazzo-mineral', label: 'Venetian Terrazzo' },
  ];

  const filteredProducts = activeCategory === 'all'
    ? MOCK_PRODUCTS
    : MOCK_PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-16 pb-24">
      {/* Luxury Hero Section */}
      <section className="relative pt-10 pb-14 bg-gradient-to-b from-white via-stone-50/50 to-white border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50/80 border border-cyan-200 text-cyan-900 text-xs font-bold tracking-wide shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-cyan-600 animate-pulse" />
                <span className="font-mono-accent uppercase tracking-wider text-[11px]">WE FLOORS • Haute Architectural Surface Engineering</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-luxury font-black text-stone-950 tracking-tight leading-[1.12]">
                Architectural Flooring for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-600 to-cyan-800">Builders & Tech Parks</span>
              </h1>

              <p className="text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed font-light">
                Direct container imports of certified acoustic IT carpet tiles, 100% waterproof rigid SPC flooring, German smoked oak, and Italian sintered stone slabs. Direct mill procurement with zero middleman margins.
              </p>

              {/* Architectural Performance Proof Bar */}
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="border-l-2 border-cyan-500 pl-3.5 py-0.5">
                  <span className="text-2xl font-black text-stone-900 font-mono-accent block">NRC 0.35+</span>
                  <p className="text-xs text-stone-500 font-medium mt-0.5">IT Open Office Acoustic Dampening</p>
                </div>
                <div className="border-l-2 border-cyan-500 pl-3.5 py-0.5">
                  <span className="text-2xl font-black text-stone-900 font-mono-accent block">Class 33/34</span>
                  <p className="text-xs text-stone-500 font-medium mt-0.5">Heavy Commercial Caster-Tested</p>
                </div>
                <div className="border-l-2 border-cyan-500 pl-3.5 py-0.5">
                  <span className="text-2xl font-black text-stone-900 font-mono-accent block">LEED v4.1</span>
                  <p className="text-xs text-stone-500 font-medium mt-0.5">CRI Green Label Low VOC Certified</p>
                </div>
              </div>

              {/* Aqua Luxury Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-4">
                <a
                  href="#visualizer"
                  className="btn-aqua px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold inline-flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Sparkles className="w-4 h-4 text-cyan-100" />
                  <span>Launch 4K Room Visualizer</span>
                </a>

                <button
                  onClick={() => onRequestSample(MOCK_PRODUCTS[0])}
                  className="btn-aqua-outline px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold inline-flex items-center gap-2 cursor-pointer"
                >
                  <Package className="w-4 h-4 text-cyan-600" />
                  <span>Order Free Swatch Box</span>
                </button>

                <button
                  onClick={onOpenAgentSuite}
                  className="px-5 py-3.5 rounded-xl text-xs font-bold bg-stone-900 hover:bg-stone-800 text-white transition-all inline-flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>AI Agent Suite (6 Agents)</span>
                </button>
              </div>
            </div>

            {/* Hero Visual Card with High-End Gallery Framing */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-stone-200/90 shadow-xl bg-white group ring-1 ring-cyan-500/10">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                  alt="WE FLOORS Luxury Flooring"
                  className="w-full h-[420px] object-cover group-hover:scale-104 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/25 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-mono-accent font-bold text-cyan-900 border border-cyan-200 shadow-sm uppercase tracking-wider">
                    Italian Calacatta Sintered Stone
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[11px] font-bold mb-1.5 border border-cyan-400/30">
                    <Award className="w-3.5 h-3.5" /> 2026 Architectural Spec
                  </div>
                  <h3 className="text-2xl font-serif-luxury font-bold leading-tight">
                    Calacatta Vagli Bookmatched Slabs & Smoked Oak
                  </h3>
                  <p className="text-xs text-stone-200 mt-1 line-clamp-2 font-light">
                    Specified across 4.2M+ sq.ft of Tier-1 Indian & Global IT tech hubs and luxury residential towers.
                  </p>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/20 text-xs">
                    <span className="text-stone-300">Wholesale Tier: <strong className="text-white font-mono font-bold">$3.40 - $9.10/sq.ft</strong></span>
                    <button 
                      onClick={() => onSelectProductForQuote(MOCK_PRODUCTS[1])}
                      className="btn-aqua px-3.5 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1"
                    >
                      Instant Quote <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 4K Room Visualizer Anchor */}
      <section id="visualizer" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RoomVisualizer 
          onSelectProductForQuote={onSelectProductForQuote}
          onRequestSample={onRequestSample}
        />
      </section>

      {/* Main Haute Collections Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-800 uppercase tracking-wider mb-1 font-mono-accent">
              <Layers className="w-3.5 h-3.5 text-cyan-600" />
              <span>Direct Mill Procurement Catalog</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-stone-900 tracking-tight">
              Curated Architectural Surfaces
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
              Engineered for acoustic isolation, scratch protection, and fire compliance across commercial installations.
            </p>
          </div>

          {/* Luxury Filter Pills with Aqua Active State */}
          <div className="flex flex-wrap gap-1.5 bg-stone-100/80 p-1.5 rounded-xl border border-stone-200">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as FlooringCategory)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'btn-aqua shadow-xs'
                    : 'text-stone-600 hover:text-stone-950 hover:bg-white/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white border border-stone-200 hover:border-cyan-400 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              <div 
                className="relative aspect-[16/10] overflow-hidden bg-stone-100 cursor-pointer" 
                onClick={() => setSelectedProductForModal(prod)}
              >
                <img
                  src={prod.imageUrl}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold text-stone-900 border border-stone-200 uppercase font-mono-accent">
                  {prod.categoryLabel}
                </div>
                <div className="absolute top-3 right-3 bg-stone-900/85 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-semibold text-white">
                  {prod.origin.split(' ')[0]}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-serif-luxury font-bold text-stone-900 group-hover:text-cyan-700 transition-colors">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                    {prod.subtitle}
                  </p>

                  {/* Spec Chips */}
                  <div className="grid grid-cols-2 gap-2 mt-4 text-[11px]">
                    <div className="bg-stone-50 px-2.5 py-1.5 rounded-lg border border-stone-200 flex items-center gap-1.5 text-stone-700">
                      <Volume2 className="w-3.5 h-3.5 text-cyan-600" />
                      <span className="font-semibold">NRC {prod.acousticRatingNRC.toFixed(2)}</span>
                    </div>
                    <div className="bg-stone-50 px-2.5 py-1.5 rounded-lg border border-stone-200 flex items-center gap-1.5 text-stone-700">
                      <Shield className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="truncate font-semibold">{prod.wearLayer.split(' ')[0]}</span>
                    </div>
                  </div>

                  {/* Color Swatch Dots */}
                  <div className="flex items-center gap-1.5 mt-3">
                    <span className="text-[10px] text-stone-400 mr-1 font-mono">Tones:</span>
                    {prod.colors.map((c, i) => (
                      <span
                        key={i}
                        className="w-3.5 h-3.5 rounded-full border border-stone-300 shadow-inner"
                        style={{ backgroundColor: c }}
                        title={c}
                      />
                    ))}
                  </div>
                </div>

                {/* Pricing & Aqua CTA Footer */}
                <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-semibold">Wholesale Bulk</span>
                    <span className="text-lg font-extrabold text-stone-900 font-mono">
                      ${prod.bulkPricePerSqFt.toFixed(2)}
                      <span className="text-xs text-stone-500 font-normal"> / sq.ft</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedProductForModal(prod)}
                      className="p-2 bg-stone-100 hover:bg-cyan-50 hover:text-cyan-700 text-stone-700 rounded-lg text-xs transition-colors cursor-pointer"
                      title="View Technical Spec Sheet"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onSelectProductForQuote(prod)}
                      className="btn-aqua px-4 py-2 rounded-lg text-xs font-bold shadow-xs cursor-pointer"
                    >
                      Instant Quote
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enterprise Builder & IT Section with Aqua Accent */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-white via-stone-50 to-cyan-50/20 border border-stone-200/90 rounded-2xl p-8 lg:p-12 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-cyan-900 bg-cyan-100/70 border border-cyan-200 mb-3">
                <Building2 className="w-3.5 h-3.5 text-cyan-700" />
                <span className="font-mono-accent uppercase tracking-wider text-[11px]">B2B Direct Supply Program</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-stone-900 mb-4 tracking-tight">
                Why Leading Builders and IT Tech Parks Partner With WE FLOORS
              </h3>
              <ul className="space-y-3.5 text-xs sm:text-sm text-stone-600">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Zero Intermediary Margins:</strong> Direct container import procurement straight from certified Belgian, German, and Vietnamese mills.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Acoustic & Heavy Traffic Guarantee:</strong> Built-in 0.35 NRC sound dampening specifically engineered for open IT campuses and C-suite video-conferencing acoustics.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Full LEED v4.1 & CRI Green Label Plus Documentation:</strong> Certified low VOC emissions and EPD certificates ready for green building audit clearances.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Rapid 48-Hour Sample Fulfillment:</strong> Bespoke custom architectural boxes delivered directly to your lead architects and project engineers.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-stone-200/90 rounded-xl p-6 space-y-4 shadow-sm">
              <h4 className="text-base font-serif-luxury font-bold text-stone-900 flex items-center gap-2">
                <Package className="w-4 h-4 text-cyan-600" />
                <span>Request Project Swatch Box</span>
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Receive physical 150mm x 150mm swatches of all 6 architectural collections, acoustic backing samples, and test certs for your project board review.
              </p>

              <button
                onClick={() => onRequestSample(MOCK_PRODUCTS[0])}
                className="btn-aqua w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer"
              >
                Dispatch Swatch Box to Your Office
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Spec Sheet Modal */}
      {selectedProductForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProductForModal(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 text-sm font-bold p-1 cursor-pointer"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded bg-cyan-50 text-cyan-900 border border-cyan-200 text-xs font-bold font-mono-accent">
                {selectedProductForModal.categoryLabel}
              </span>
              <span className="text-xs text-stone-500">{selectedProductForModal.origin}</span>
            </div>

            <h3 className="text-2xl font-serif-luxury font-bold text-stone-900 mb-1">
              {selectedProductForModal.name}
            </h3>
            <p className="text-xs text-stone-600 mb-4">{selectedProductForModal.subtitle}</p>

            <img
              src={selectedProductForModal.imageUrl}
              alt={selectedProductForModal.name}
              className="w-full h-52 object-cover rounded-xl mb-4 border border-stone-200"
            />

            <p className="text-xs text-stone-600 leading-relaxed mb-5">
              {selectedProductForModal.description}
            </p>

            {/* Spec Sheet Table */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6 text-xs">
              <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                <span className="text-stone-500 block text-[10px] uppercase font-bold">Dimensions</span>
                <span className="text-stone-900 font-semibold">{selectedProductForModal.dimensions}</span>
              </div>
              <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                <span className="text-stone-500 block text-[10px] uppercase font-bold">Wear Layer</span>
                <span className="text-stone-900 font-semibold">{selectedProductForModal.wearLayer}</span>
              </div>
              <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                <span className="text-stone-500 block text-[10px] uppercase font-bold">Acoustic NRC</span>
                <span className="text-stone-900 font-semibold">{selectedProductForModal.acousticRatingNRC.toFixed(2)}</span>
              </div>
              <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                <span className="text-stone-500 block text-[10px] uppercase font-bold">Fire Rating</span>
                <span className="text-stone-900 font-semibold">{selectedProductForModal.fireRating}</span>
              </div>
              <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                <span className="text-stone-500 block text-[10px] uppercase font-bold">Standard Rate</span>
                <span className="text-stone-900 font-bold">${selectedProductForModal.pricePerSqFt.toFixed(2)}/sq.ft</span>
              </div>
              <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                <span className="text-stone-500 block text-[10px] uppercase font-bold">Wholesale Bulk</span>
                <span className="text-cyan-800 font-bold font-mono">${selectedProductForModal.bulkPricePerSqFt.toFixed(2)}/sq.ft</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-stone-100">
              <button
                onClick={() => {
                  onRequestSample(selectedProductForModal);
                  setSelectedProductForModal(null);
                }}
                className="btn-aqua-outline px-4 py-2 rounded-lg text-xs font-bold cursor-pointer"
              >
                Order Free Swatch
              </button>
              <button
                onClick={() => {
                  onSelectProductForQuote(selectedProductForModal);
                  setSelectedProductForModal(null);
                }}
                className="btn-aqua px-5 py-2 rounded-lg text-xs font-bold cursor-pointer"
              >
                Add to Quotation Engine
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
