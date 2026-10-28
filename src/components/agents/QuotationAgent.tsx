import React, { useState } from 'react';
import { QuotationResult, FlooringProduct } from '../../types';
import { 
  FileSpreadsheet, 
  Sparkles, 
  Printer, 
  Calculator,
  RefreshCw
} from 'lucide-react';

interface QuotationAgentProps {
  initialProduct?: FlooringProduct | null;
}

export const QuotationAgent: React.FC<QuotationAgentProps> = ({ initialProduct }) => {
  const [clientName, setClientName] = useState('Brigade Tech Gardens Infrastructure');
  const [projectName, setProjectName] = useState('Tower 4 Innovation Floor & Executive Suites');
  const [clientType, setClientType] = useState('Commercial IT Campus');
  const [areaSqFt, setAreaSqFt] = useState(18500);
  const [flooringCategory, setFlooringCategory] = useState(
    initialProduct?.name || 'WE FLOORS Nexus Acoustic Matrix 50x50 Carpet Tile'
  );
  const [materialRate, setMaterialRate] = useState(initialProduct?.bulkPricePerSqFt || 3.85);
  const [underlaymentRate, setUnderlaymentRate] = useState(0.65);
  const [installationRate, setInstallationRate] = useState(1.75);
  const [freightKm, setFreightKm] = useState(65);
  const [marginPercent, setMarginPercent] = useState(24);
  const [taxPercent, setTaxPercent] = useState(12);

  const [loading, setLoading] = useState(false);
  const [quotation, setQuotation] = useState<QuotationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/agent/quotation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          projectName,
          clientType,
          areaSqFt,
          flooringCategory,
          materialRate,
          underlaymentRate,
          installationRate,
          freightKm,
          marginPercent,
          taxPercent,
        }),
      });

      if (!res.ok) {
        throw new Error('Quotation agent error');
      }

      const data = await res.json();
      setQuotation(data);
    } catch (err: any) {
      setError(err.message || 'Failed to generate commercial quotation');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Banner & Inputs */}
      <div className="no-print bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-cyan-50 border border-cyan-200 rounded-xl text-cyan-700 shadow-xs">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-cyan-800 uppercase tracking-wider font-mono-accent">Agent #4</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-100/70 text-cyan-900 border border-cyan-200">CPQ Estimator & BoQ</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif-luxury font-bold text-stone-950 mt-0.5">Commercial Quotation & BoQ Agent</h2>
              <p className="text-xs text-stone-500 mt-0.5 font-light">
                Calculates material waste, acoustic underlayments, certified installation, margin targets, and exports formal branded proposals.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setClientName('Prestige Horizon Developers');
                setProjectName('Signature Luxury Villa Enclave');
                setClientType('Real Estate Developer');
                setAreaSqFt(36000);
                setFlooringCategory('WE FLOORS Bavarian Smoked Oak Grand Planks');
                setMaterialRate(7.20);
                setUnderlaymentRate(0.85);
                setInstallationRate(2.20);
              }}
              className="btn-aqua-outline text-xs px-3.5 py-1.5 rounded-lg cursor-pointer font-bold"
            >
              Preset: Builder 36k sq.ft
            </button>
            <button
              onClick={() => {
                setClientName('Infosys Tech Park Campus');
                setProjectName('Global Engineering Hub Phase 2');
                setClientType('Commercial IT Campus');
                setAreaSqFt(75000);
                setFlooringCategory('WE FLOORS Nexus Acoustic Matrix IT Carpet Tiles (NRC 0.32)');
                setMaterialRate(2.95);
                setUnderlaymentRate(0.50);
                setInstallationRate(1.40);
              }}
              className="btn-aqua-outline text-xs px-3.5 py-1.5 rounded-lg cursor-pointer font-bold"
            >
              Preset: IT Campus 75k sq.ft
            </button>
          </div>
        </div>

        {/* Input Parameters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-5 border-t border-stone-100 text-xs">
          <div>
            <label className="text-stone-700 font-bold block mb-1">Client Organization</label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full bg-stone-50/70 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="text-stone-700 font-bold block mb-1">Project Name</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full bg-stone-50/70 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="text-stone-700 font-bold block mb-1">Client Sector</label>
            <select
              value={clientType}
              onChange={(e) => setClientType(e.target.value)}
              className="w-full bg-stone-50/70 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
            >
              <option value="Commercial IT Campus">Commercial IT Campus</option>
              <option value="Real Estate Developer">Real Estate Developer</option>
              <option value="Luxury Hospitality">Luxury Hospitality</option>
              <option value="High-End Residential Villa">High-End Residential Villa</option>
            </select>
          </div>

          <div>
            <label className="text-stone-700 font-bold block mb-1">Net Floor Area (sq.ft)</label>
            <input
              type="number"
              value={areaSqFt}
              onChange={(e) => setAreaSqFt(parseInt(e.target.value, 10))}
              className="w-full bg-stone-50/70 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
            />
          </div>

          <div className="lg:col-span-2">
            <label className="text-stone-700 font-bold block mb-1">Flooring Specification</label>
            <input
              type="text"
              value={flooringCategory}
              onChange={(e) => setFlooringCategory(e.target.value)}
              className="w-full bg-stone-50/70 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="text-stone-700 font-bold block mb-1">Base Material Rate ($/sq.ft)</label>
            <input
              type="number"
              step="0.05"
              value={materialRate}
              onChange={(e) => setMaterialRate(parseFloat(e.target.value))}
              className="w-full bg-stone-50/70 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="text-stone-700 font-bold block mb-1">Underlayment ($/sq.ft)</label>
            <input
              type="number"
              step="0.05"
              value={underlaymentRate}
              onChange={(e) => setUnderlaymentRate(parseFloat(e.target.value))}
              className="w-full bg-stone-50/70 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="text-stone-700 font-bold block mb-1">Installation & Prep ($/sq.ft)</label>
            <input
              type="number"
              step="0.05"
              value={installationRate}
              onChange={(e) => setInstallationRate(parseFloat(e.target.value))}
              className="w-full bg-stone-50/70 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="text-stone-700 font-bold block mb-1">Transit / Freight (km)</label>
            <input
              type="number"
              value={freightKm}
              onChange={(e) => setFreightKm(parseInt(e.target.value, 10))}
              className="w-full bg-stone-50/70 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="text-stone-700 font-bold block mb-1">Target Margin %</label>
            <input
              type="number"
              value={marginPercent}
              onChange={(e) => setMarginPercent(parseInt(e.target.value, 10))}
              className="w-full bg-stone-50/70 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="text-stone-700 font-bold block mb-1">Applicable Tax %</label>
            <input
              type="number"
              value={taxPercent}
              onChange={(e) => setTaxPercent(parseInt(e.target.value, 10))}
              className="w-full bg-stone-50/70 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:outline-none focus:border-cyan-500 focus:bg-white"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleGenerateQuote}
            disabled={loading}
            className="btn-aqua px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Computing BoQ & Wastage Buffers...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-cyan-100" />
                <span>Generate Official Commercial Quotation</span>
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

      {/* Generated Printable Proposal Document */}
      {quotation && (
        <div className="space-y-4">
          {/* Action Toolbar */}
          <div className="no-print flex justify-between items-center bg-white border border-stone-200/90 p-4 rounded-xl shadow-xs">
            <span className="text-xs text-stone-700 font-semibold font-mono">
              Quotation #{quotation.quotationNumber} • Ready
            </span>
            <button
              onClick={handlePrint}
              className="btn-aqua px-4 py-2 rounded-lg text-xs font-bold inline-flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
          </div>

          {/* Formal Printable Document Card */}
          <div className="printable-quote bg-white text-stone-900 rounded-2xl p-8 sm:p-12 shadow-sm border border-stone-200">
            {/* Document Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-stone-900 pb-6 mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-serif-luxury font-black tracking-tight text-stone-950">
                  WE FLOORS
                </h1>
                <p className="text-xs text-stone-600 uppercase tracking-widest font-mono mt-0.5">
                  Commercial Architectural Flooring Import & Contracting
                </p>
                <p className="text-[11px] text-stone-500 mt-1">
                  Direct Mill Container Logistics • ISO 9001 Certified • CRI Green Label Plus
                </p>
              </div>

              <div className="text-left sm:text-right font-mono text-xs text-stone-700">
                <div className="font-bold text-sm text-stone-950">
                  REF: {quotation.quotationNumber}
                </div>
                <div>Date: {quotation.date}</div>
                <div>Validity: {quotation.validUntil}</div>
              </div>
            </div>

            {/* Client & Project Meta Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-stone-50 p-6 rounded-xl border border-stone-200 mb-8 text-xs">
              <div>
                <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-mono font-bold">Proposal Prepared For:</span>
                <h3 className="text-base font-bold text-stone-950 mt-1 font-serif-luxury">{clientName}</h3>
                <p className="text-stone-700 font-medium mt-0.5">Project: {projectName}</p>
                <span className="inline-block mt-2 px-2.5 py-0.5 rounded bg-stone-200 text-stone-800 text-[11px] font-semibold">
                  Sector: {clientType}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-mono font-bold">Technical Compliance:</span>
                <div className="mt-1 space-y-1 text-stone-700">
                  <div><strong>Category:</strong> {quotation.technicalSpecs?.category}</div>
                  <div><strong>Wear Layer:</strong> {quotation.technicalSpecs?.wearLayerThickness}</div>
                  <div><strong>Acoustic Rating:</strong> {quotation.technicalSpecs?.acousticRating}</div>
                  <div><strong>Fire Rating:</strong> {quotation.technicalSpecs?.fireRatingClass}</div>
                  <div><strong>Warranty:</strong> {quotation.technicalSpecs?.commercialWarrantyYears} Years Commercial Warranty</div>
                </div>
              </div>
            </div>

            {/* Bill of Quantities Table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b-2 border-stone-900 bg-stone-100 text-stone-900 font-mono uppercase text-[11px]">
                    <th className="py-3 px-4 font-bold">Item Description</th>
                    <th className="py-3 px-4 text-center font-bold">Unit</th>
                    <th className="py-3 px-4 text-right font-bold">Quantity</th>
                    <th className="py-3 px-4 text-right font-bold">Rate ($)</th>
                    <th className="py-3 px-4 text-right font-bold">Total ($)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {quotation.lineItems?.map((item, idx) => (
                    <tr key={idx} className="hover:bg-stone-50">
                      <td className="py-3.5 px-4 font-semibold text-stone-900">{item.description}</td>
                      <td className="py-3.5 px-4 text-center text-stone-600 font-mono">{item.unit}</td>
                      <td className="py-3.5 px-4 text-right font-mono text-stone-800">{item.quantity.toLocaleString()}</td>
                      <td className="py-3.5 px-4 text-right font-mono text-stone-800">${item.unitRate.toFixed(2)}</td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-stone-950">${item.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Calculations & Totals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t-2 border-stone-900 pt-6 mb-8 text-xs">
              <div>
                <h4 className="font-bold text-stone-900 uppercase font-mono tracking-wider mb-2">
                  Material Wastage Buffer Analysis
                </h4>
                <div className="space-y-1.5 text-stone-600">
                  <div className="flex justify-between">
                    <span>Net Architectural Footprint:</span>
                    <span className="font-mono text-stone-900">{areaSqFt.toLocaleString()} sq.ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pattern Cutting & Waste Buffer ({quotation.wastageBufferPercent}%):</span>
                    <span className="font-mono text-stone-900">{quotation.wastageSqFt?.toLocaleString()} sq.ft</span>
                  </div>
                  <div className="flex justify-between font-bold text-stone-950 pt-1 border-t border-stone-200">
                    <span>Gross Material Shipped:</span>
                    <span className="font-mono">{quotation.grossSqFt?.toLocaleString()} sq.ft</span>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-lg bg-cyan-50/70 border border-cyan-200 text-cyan-950 text-[11px] leading-relaxed">
                  <strong>Commercial Advantage:</strong> {quotation.commercialAdvantageSummary}
                </div>
              </div>

              {/* Totals */}
              <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 flex flex-col justify-between">
                <div className="space-y-2 font-mono">
                  <div className="flex justify-between text-stone-700">
                    <span>Subtotal:</span>
                    <span className="font-semibold">${quotation.subtotal?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-stone-700">
                    <span>Applicable Tax ({taxPercent}%):</span>
                    <span className="font-semibold">${quotation.taxAmount?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-stone-950 pt-2 border-t border-stone-300">
                    <span>Grand Total:</span>
                    <span className="text-cyan-800">${quotation.grandTotal?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </div>

                <div className="text-[10px] text-stone-500 mt-4 text-right font-medium">
                  Factory certified batch inspection & warranty documentation included.
                </div>
              </div>
            </div>

            {/* Payment Milestones & Terms */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-stone-200 text-xs">
              <div>
                <h4 className="font-bold text-stone-900 uppercase font-mono tracking-wider mb-2">
                  Payment Milestones
                </h4>
                <div className="space-y-2">
                  {quotation.commercialMilestones?.map((m, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded bg-stone-100 text-[11px]">
                      <span className="font-semibold text-stone-900">{m.phase}</span>
                      <span className="font-mono font-bold text-stone-800">{m.percent}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-stone-900 uppercase font-mono tracking-wider mb-2">
                  Terms & Conditions
                </h4>
                <ul className="space-y-1 text-stone-600 text-[11px] list-disc pl-4">
                  {quotation.executiveTerms?.map((term, idx) => (
                    <li key={idx}>{term}</li>
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
