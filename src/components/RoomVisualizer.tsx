import React, { useState } from 'react';
import { MOCK_ROOMS, MOCK_PRODUCTS } from '../data/mockProducts';
import { VisualizerRoom, FlooringProduct } from '../types';
import { 
  Sparkles, 
  Layers, 
  Volume2, 
  ShieldCheck, 
  Droplets, 
  Sun, 
  CheckCircle2, 
  ArrowRight,
  FileSpreadsheet
} from 'lucide-react';

interface RoomVisualizerProps {
  onSelectProductForQuote?: (product: FlooringProduct) => void;
  onRequestSample?: (product: FlooringProduct) => void;
}

export const RoomVisualizer: React.FC<RoomVisualizerProps> = ({ 
  onSelectProductForQuote, 
  onRequestSample 
}) => {
  const [selectedRoom, setSelectedRoom] = useState<VisualizerRoom>(MOCK_ROOMS[0]);
  const [selectedProduct, setSelectedProduct] = useState<FlooringProduct>(
    MOCK_PRODUCTS.find(p => p.id === selectedRoom.defaultFlooringId) || MOCK_PRODUCTS[0]
  );
  const [activeLighting, setActiveLighting] = useState<string>(selectedRoom.lightingOptions[0]);
  const [estimatedRoomArea, setEstimatedRoomArea] = useState<number>(3500);

  const handleRoomChange = (room: VisualizerRoom) => {
    setSelectedRoom(room);
    setActiveLighting(room.lightingOptions[0]);
    const defaultProd = MOCK_PRODUCTS.find(p => p.id === room.defaultFlooringId);
    if (defaultProd) {
      setSelectedProduct(defaultProd);
    }
  };

  const getLightingFilter = () => {
    switch (activeLighting) {
      case 'Daylight 5000K':
        return 'contrast(102%) brightness(102%) saturate(98%)';
      case 'Warm Architectural 3000K':
        return 'sepia(14%) contrast(105%) brightness(98%) saturate(108%)';
      case 'Evening Mood 2700K':
        return 'sepia(25%) contrast(108%) brightness(92%) saturate(115%)';
      default:
        return 'none';
    }
  };

  const totalEstimatedCost = estimatedRoomArea * selectedProduct.bulkPricePerSqFt;

  return (
    <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
      {/* Decorative ambient aqua blur */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />

      {/* Visualizer Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-stone-100 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-50 text-cyan-900 border border-cyan-200 mb-2 font-mono-accent">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>4K Space & Texture Simulator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-stone-900 tracking-tight">
            Preview Haute Flooring in Real Architectural Spaces
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1 font-light">
            Simulate lighting temperatures, acoustic absorption (NRC), and surface texture patterns before ordering.
          </p>
        </div>

        {/* Room Switcher Pills with Aqua Active State */}
        <div className="flex flex-wrap gap-1.5 bg-stone-100/90 p-1.5 rounded-xl border border-stone-200">
          {MOCK_ROOMS.map((room) => {
            const isActive = room.id === selectedRoom.id;
            return (
              <button
                key={room.id}
                onClick={() => handleRoomChange(room)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'btn-aqua shadow-xs'
                    : 'text-stone-600 hover:text-stone-950 hover:bg-stone-200/70'
                }`}
              >
                {room.name.split(' ')[0]} {room.name.split(' ')[1] || ''}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visualizer Display Canvas */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-stone-900 shadow-md border border-stone-200 group">
            {/* Base Room Scene */}
            <img
              src={selectedRoom.roomOverlayImage}
              alt={selectedRoom.title}
              className="w-full h-full object-cover transition-all duration-700"
              style={{ filter: getLightingFilter() }}
            />

            {/* Flooring Texture Pattern Blend */}
            <div 
              className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-50 transition-opacity duration-500"
              style={{
                backgroundImage: `url(${selectedProduct.imageUrl})`,
                backgroundSize: selectedProduct.texturePattern === 'tile' ? '180px' : '340px',
                backgroundRepeat: 'repeat',
              }}
            />

            {/* Room Info Badge */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-stone-200 text-xs shadow-xs">
              <span className="text-cyan-800 font-bold uppercase tracking-wider block text-[10px] font-mono-accent">Active Space</span>
              <span className="text-stone-900 font-bold text-xs sm:text-sm font-serif-luxury">{selectedRoom.title}</span>
            </div>

            {/* Lighting Switcher Controls */}
            <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/95 backdrop-blur-md p-1 rounded-xl border border-stone-200 shadow-xs">
              <Sun className="w-3.5 h-3.5 text-cyan-600 ml-1.5" />
              {selectedRoom.lightingOptions.map(lighting => (
                <button
                  key={lighting}
                  onClick={() => setActiveLighting(lighting)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg transition-colors font-bold cursor-pointer ${
                    activeLighting === lighting
                      ? 'btn-aqua shadow-xs'
                      : 'text-stone-600 hover:text-stone-950'
                  }`}
                >
                  {lighting.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Material in use Badge */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-stone-200 shadow-lg flex items-center justify-between gap-4 max-w-sm">
              <div className="flex items-center gap-3">
                <img 
                  src={selectedProduct.imageUrl} 
                  alt={selectedProduct.name}
                  className="w-12 h-12 rounded-lg object-cover border border-cyan-200 shadow-xs"
                />
                <div>
                  <span className="text-[10px] text-cyan-800 font-bold uppercase block font-mono-accent">{selectedProduct.categoryLabel}</span>
                  <h4 className="text-xs font-bold text-stone-900 leading-tight">{selectedProduct.name}</h4>
                  <p className="text-[11px] text-stone-600 font-medium">${selectedProduct.bulkPricePerSqFt.toFixed(2)}/sq.ft (Wholesale Bulk)</p>
                </div>
              </div>
              <button 
                onClick={() => onRequestSample && onRequestSample(selectedProduct)}
                className="btn-aqua px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer"
              >
                Sample
              </button>
            </div>
          </div>

          {/* Performance & Spec Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-stone-500 text-xs mb-1">
                <Volume2 className="w-3.5 h-3.5 text-cyan-600" />
                <span className="font-semibold">Acoustic NRC</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-stone-900 font-mono-accent">{selectedProduct.acousticRatingNRC.toFixed(2)}</span>
                <span className="text-[10px] text-cyan-800 font-bold">
                  {selectedProduct.acousticRatingNRC > 0.25 ? 'High Dampening' : 'Acoustic Base'}
                </span>
              </div>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-stone-500 text-xs mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-semibold">Commercial Rating</span>
              </div>
              <span className="text-xs font-bold text-stone-900 block truncate">{selectedProduct.wearLayer}</span>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-stone-500 text-xs mb-1">
                <Droplets className="w-3.5 h-3.5 text-blue-600" />
                <span className="font-semibold">Moisture Resistance</span>
              </div>
              <span className="text-xs font-bold text-stone-900">
                {selectedProduct.waterproof ? '100% Waterproof' : 'Moisture Seal Backing'}
              </span>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-stone-500 text-xs mb-1">
                <Layers className="w-3.5 h-3.5 text-cyan-600" />
                <span className="font-semibold">Origin Spec</span>
              </div>
              <span className="text-xs font-bold text-stone-900 block truncate">{selectedProduct.origin}</span>
            </div>
          </div>
        </div>

        {/* Flooring Selection Palette & Quick Estimate */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-stone-50/80 border border-stone-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider font-mono-accent">
                Select Flooring Texture
              </h3>
              <span className="text-[10px] text-stone-500 font-semibold">{MOCK_PRODUCTS.length} Available</span>
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {MOCK_PRODUCTS.map((prod) => {
                const isSelected = prod.id === selectedProduct.id;
                return (
                  <div
                    key={prod.id}
                    onClick={() => setSelectedProduct(prod)}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-white border-cyan-500 shadow-xs ring-2 ring-cyan-500/25'
                        : 'bg-white/80 border-stone-200 hover:border-cyan-300 hover:bg-white'
                    }`}
                  >
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      className="w-12 h-12 rounded-lg object-cover border border-stone-200 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-cyan-800 font-bold font-mono-accent">{prod.categoryLabel}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" />}
                      </div>
                      <h4 className="text-xs font-bold text-stone-900 truncate">{prod.name}</h4>
                      <div className="flex items-center justify-between mt-1 text-xs">
                        <span className="font-bold text-stone-900 font-mono">${prod.bulkPricePerSqFt.toFixed(2)}/sq.ft</span>
                        <span className="text-[10px] text-stone-500">{prod.dimensions.split(' ')[0]}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Space Estimator Card with Aqua Accent */}
          <div className="bg-gradient-to-br from-cyan-50/70 via-white to-stone-50 border border-cyan-200/80 rounded-xl p-4 shadow-xs">
            <h4 className="text-xs font-bold text-cyan-950 uppercase tracking-wider mb-2 flex items-center justify-between font-mono-accent">
              <span>Quick Area Budget Calculator</span>
              <span className="text-[10px] text-cyan-800 font-semibold">Sq.Ft Mode</span>
            </h4>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-stone-600 mb-1">
                  <span>Target Floor Footprint:</span>
                  <span className="text-stone-950 font-bold font-mono">{estimatedRoomArea.toLocaleString()} sq.ft</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="25000"
                  step="500"
                  value={estimatedRoomArea}
                  onChange={(e) => setEstimatedRoomArea(parseInt(e.target.value, 10))}
                  className="w-full accent-cyan-600 bg-stone-200 h-2 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="pt-2 border-t border-cyan-200/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-semibold">Estimated Material Cost</span>
                  <span className="text-xl font-extrabold text-stone-950 font-mono">
                    ${Math.round(totalEstimatedCost).toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => onSelectProductForQuote && onSelectProductForQuote(selectedProduct)}
                  className="btn-aqua px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Build Quote</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
