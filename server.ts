import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Shared Gemini instance
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const MODEL_NAME = 'gemini-3.8-flash';

// Helper to reliably parse JSON output from LLM responses
function cleanAndParseJson<T>(rawText: string, fallback: T): T {
  if (!rawText) return fallback;
  try {
    let cleaned = rawText.trim();
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```[a-zA-Z]*\n?/, '').replace(/\n?```$/, '').trim();
    }
    return JSON.parse(cleaned) as T;
  } catch (err) {
    console.warn('JSON parse fallback triggered:', err);
    // Try to extract first {...} or [...] block
    const match = rawText.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
    if (match) {
      try {
        return JSON.parse(match[0]) as T;
      } catch (e) {
        console.error('Secondary parse failed:', e);
      }
    }
    return fallback;
  }
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    brand: 'WE FLOORS',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// 1. Digital Marketing Agent
app.post('/api/agent/marketing', async (req, res) => {
  try {
    const { campaignType, targetAudience, keyProduct, promoOffer, tone, platform } = req.body;

    const prompt = `You are the Chief Marketing Officer & AI Performance Marketing Agent for WE FLOORS, an architectural and commercial flooring enterprise.
Generate a comprehensive, high-converting digital marketing campaign blueprint.

Details:
- Brand Name: WE FLOORS
- Campaign Type: ${campaignType || 'B2B Builder & Commercial Spec Launch'}
- Target Audience: ${targetAudience || 'Real Estate Builders, IT Park Facilities Directors, Commercial Architects, Luxury Interior Designers'}
- Featured Product/Collection: ${keyProduct || 'Heavy-Traffic Acoustic IT Carpet Tiles & Rigid SPC Waterproof Flooring'}
- Special Incentive / Offer: ${promoOffer || 'Complimentary Architect Sample Swatch Box + 18% Commercial Volume Rebate'}
- Brand Tone: ${tone || 'Modern, Architectural, Direct, High-ROI'}
- Primary Channel/Platform: ${platform || 'Omnichannel (LinkedIn B2B, Google Search, Meta Ads)'}

Generate a structured JSON response with the following keys:
{
  "campaignName": string,
  "executiveSummary": string,
  "adCopies": [
    {
      "platform": "Google Search" | "LinkedIn Sponsored" | "Instagram / Meta Carousel",
      "headline": string,
      "primaryText": string,
      "callToAction": string,
      "recommendedTargeting": string
    }
  ],
  "socialMediaContent": {
    "instagramReelScript": {
      "hook": string,
      "visualSceneBreakdown": string[],
      "voiceoverScript": string,
      "hashtags": string[]
    },
    "linkedInArticlePost": {
      "title": string,
      "body": string,
      "callToAction": string
    }
  },
  "emailNurtureSequence": [
    {
      "step": number,
      "subject": string,
      "timing": string,
      "bodySnippet": string,
      "cta": string
    }
  ],
  "estimatedKpis": {
    "estimatedCpl": string,
    "targetCtr": string,
    "recommendedWeeklyBudget": string,
    "projectedLeadVolume": string
  }
}
Return only valid JSON.`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = cleanAndParseJson(response.text || '', {
      campaignName: 'WE FLOORS B2B Campaign',
      executiveSummary: 'High-converting omnichannel outreach designed for commercial builders and architects.',
      adCopies: [
        {
          platform: 'LinkedIn Sponsored',
          headline: 'WE FLOORS: Certified Acoustic & Commercial Surfaces for Tech Campuses',
          primaryText: 'Specify Class 33 durability with NRC 0.32 sound absorption for high-density IT campuses. Order complimentary swatch boxes direct to your design studio.',
          callToAction: 'Order Architect Swatch Box',
          recommendedTargeting: 'Commercial Architects, Facility Directors, Real Estate Developers',
        },
      ],
      socialMediaContent: {
        instagramReelScript: {
          hook: 'Why top tech parks and builders are switching to WE FLOORS.',
          visualSceneBreakdown: ['Close-up synchronized wood texture', 'Caster wheel rolling test', 'Fast click installation'],
          voiceoverScript: 'From acoustic calm in open offices to scratch-proof luxury villas—meet the new standard.',
          hashtags: ['#WEFLOORS', '#CommercialFlooring', '#ArchitecturalDesign', '#ITParkDesign'],
        },
        linkedInArticlePost: {
          title: 'Acoustic Engineering in Commercial IT Workspaces: The WE FLOORS Spec',
          body: 'Open office acoustic fatigue costs tech enterprises hours of lost focus daily. Here is how modern modular acoustic floor systems resolve reverberation.',
          callToAction: 'Request Project Spec Consultation at WE FLOORS',
        },
      },
      emailNurtureSequence: [
        {
          step: 1,
          subject: 'Architectural Spec & Sample Kit for Your Upcoming Project',
          timing: 'Day 1 Post-Inquiry',
          bodySnippet: 'Hi Team, We’ve prepared a tailored swatch box of our 2026 certified commercial and rigid SPC collections.',
          cta: 'Confirm Courier Address',
        },
      ],
      estimatedKpis: {
        estimatedCpl: '$34 - $48',
        targetCtr: '3.8%',
        recommendedWeeklyBudget: '$1,250',
        projectedLeadVolume: '28 - 40 Qualified B2B Accounts/mo',
      },
    });

    res.json(parsed);
  } catch (error: any) {
    console.error('Marketing agent error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate marketing campaign' });
  }
});

// 2. Lead Generation & Qualification Agent
app.post('/api/agent/leads/qualify', async (req, res) => {
  try {
    const { leadData } = req.body;

    const prompt = `You are the Commercial Director & Lead Intelligence Agent for WE FLOORS.
Evaluate and qualify this inbound prospect, score project value, and write an immediate high-touch closing playbook.

Prospect Data:
${JSON.stringify(leadData, null, 2)}

Provide a structured JSON output:
{
  "leadScore": number (1 to 100),
  "priority": "HOT - Urgent High Value" | "WARM - Strategic Project" | "NURTURE - Standard Inquiry",
  "projectEstimatedValue": string,
  "fitAnalysis": string,
  "dealProbability": string,
  "recommendedProductBundle": [
    {
      "name": string,
      "specs": string,
      "strategicReason": string
    }
  ],
  "personalizedResponseDraft": {
    "channel": "Email / Executive Direct",
    "subject": string,
    "message": string
  },
  "closingStrategy": [
    {
      "step": string,
      "action": string,
      "objectionHandled": string
    }
  ],
  "architectSampleRecommendation": string
}
Return only valid JSON.`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = cleanAndParseJson(response.text || '', {
      leadScore: 88,
      priority: 'HOT - Urgent High Value',
      projectEstimatedValue: '$85,000 - $140,000',
      fitAnalysis: 'High project footprint with immediate timeline. Direct fit for WE FLOORS commercial procurement and wholesale container pricing.',
      dealProbability: '82%',
      recommendedProductBundle: [
        {
          name: 'Nexus Acoustic Matrix 50x50',
          specs: 'NRC 0.32, Class 33 Commercial, Solution-Dyed Nylon',
          strategicReason: 'Meets open-office acoustic standards for tech workstations.',
        },
      ],
      personalizedResponseDraft: {
        channel: 'Email / Executive Direct',
        subject: `WE FLOORS - Architectural Spec & Container Pricing for ${leadData?.company || 'Your Project'}`,
        message: `Dear ${leadData?.name || 'Project Lead'},\n\nThank you for reaching out to WE FLOORS. For a project footprint of ${leadData?.areaSqFt?.toLocaleString() || 'your specified'} sq.ft, we can dispatch certified physical swatches immediately and structure direct mill pricing.\n\nWarm regards,\nWE FLOORS Commercial Team`,
      },
      closingStrategy: [
        {
          step: 'Step 1: 24h Swatch Delivery',
          action: 'Courier custom architectural master box to lead architect.',
          objectionHandled: 'Verifies physical feel, wear layer, and acoustic backing before bidding.',
        },
      ],
      architectSampleRecommendation: 'Dispatch 150mm x 150mm tile swatches + acoustic certificate binder.',
    });

    res.json(parsed);
  } catch (error: any) {
    console.error('Lead qualification error:', error);
    res.status(500).json({ error: error.message || 'Failed to qualify lead' });
  }
});

// 3. SEO Dominator & Ranking Agent
app.post('/api/agent/seo', async (req, res) => {
  try {
    const { targetTopic, targetCity, competitorFocus } = req.body;

    const prompt = `You are a Technical & Programmatic SEO Architect for WE FLOORS (luxury & commercial architectural surfaces).
Formulate an aggressive, top-ranking SEO strategy and pillar landing page content package for:
Topic: ${targetTopic || 'Commercial Acoustic IT Carpet Tiles and Rigid SPC Waterproof Flooring'}
Target Location / Market: ${targetCity || 'National Commercial & Tech Hubs (Bangalore, Hyderabad, Mumbai, SF, London)'}
Competitor / Market Angle: ${competitorFocus || 'Outranking local middleman importers with factory direct certification and instant 48h sample delivery'}

Return a structured JSON:
{
  "metaTitle": string (under 60 chars, CTR magnetic, includes WE FLOORS),
  "metaDescription": string (under 160 chars),
  "focusKeywords": [
    {
      "keyword": string,
      "searchIntent": "Commercial Investigation" | "Transactional B2B" | "Informational",
      "difficulty": "Low" | "Medium" | "High",
      "recommendedPlacement": string
    }
  ],
  "contentOutline": {
    "h1": string,
    "sections": [
      {
        "h2": string,
        "keyPoints": string[],
        "commercialValueAdd": string
      }
    ]
  },
  "schemaMarkupJsonLd": string (clean JSON-LD for Product + FAQPage),
  "faqQuestions": [
    {
      "question": string,
      "answer": string
    }
  ],
  "backlinkStrategy": string[],
  "conversionHooks": string[]
}
Return only valid JSON.`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = cleanAndParseJson(response.text || '', {
      metaTitle: 'Commercial Flooring & Acoustic Tiles | WE FLOORS',
      metaDescription: 'Direct factory imports of acoustic IT carpet tiles, rigid SPC waterproof flooring, and Italian sintered slabs for builders. Order free sample kits.',
      focusKeywords: [
        {
          keyword: 'commercial acoustic carpet tiles for IT offices',
          searchIntent: 'Transactional B2B',
          difficulty: 'Medium',
          recommendedPlacement: 'Page Title, H1, Meta Description',
        },
      ],
      contentOutline: {
        h1: 'Commercial Architectural Flooring for Tech Campuses & Builders',
        sections: [
          {
            h2: 'Acoustic Sound Attenuation (NRC 0.32+) in Open Workspaces',
            keyPoints: ['Impact noise isolation', 'Castor chair rolling endurance', 'Modular cabling access'],
            commercialValueAdd: 'Reduces tenant noise complaints and boosts LEED v4.1 credits.',
          },
        ],
      },
      schemaMarkupJsonLd: '{\n  "@context": "https://schema.org",\n  "@type": "Product",\n  "name": "WE FLOORS Acoustic Matrix Tile",\n  "brand": "WE FLOORS"\n}',
      faqQuestions: [
        {
          question: 'Does WE FLOORS supply direct factory container volume to builders?',
          answer: 'Yes, WE FLOORS provides direct mill logistics with custom wear layer specs and volume rebates for projects over 10,000 sq.ft.',
        },
      ],
      backlinkStrategy: ['Architectural Digest B2B directory', 'Commercial Builder quarterly reviews', 'LEED Green Building material registry'],
      conversionHooks: ['Instant 48-Hour Swatch Kit Dispatch', 'Direct-to-Site Container Logistics'],
    });

    res.json(parsed);
  } catch (error: any) {
    console.error('SEO agent error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate SEO package' });
  }
});

// 4. Instant Quotation & CPQ Agent
app.post('/api/agent/quotation', async (req, res) => {
  try {
    const {
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
    } = req.body;

    const prompt = `You are the Chief Estimator & Commercial CPQ Engineer for WE FLOORS.
Generate a formal commercial Bill of Quantities (BoQ), technical verification, and executive proposal for this flooring project.

Project Details:
- Company / Brand: WE FLOORS
- Client / Company: ${clientName || 'Prestige Horizon Developers'}
- Project: ${projectName || 'Tower A Executive IT Park & Penthouse Suites'}
- Client Sector: ${clientType || 'Commercial IT Campus'}
- Net Area: ${areaSqFt || 12000} sq.ft
- Flooring Specification: ${flooringCategory || 'WE FLOORS SPC 7mm Rigid Core with Acoustic IXPE'}
- Base Material Rate: $${materialRate || 4.25}/sq.ft
- Underlayment & Vapor Barrier: $${underlaymentRate || 0.65}/sq.ft
- Certified Installation & Surface Prep: $${installationRate || 1.80}/sq.ft
- Freight / Transit: ${freightKm || 45} km logistics
- Target Gross Margin: ${marginPercent || 25}%
- Applicable Tax/VAT: ${taxPercent || 12}%

Return a structured JSON:
{
  "quotationNumber": string,
  "date": string,
  "validUntil": string,
  "technicalSpecs": {
    "category": string,
    "wearLayerThickness": string,
    "acousticRating": string,
    "fireRatingClass": string,
    "commercialWarrantyYears": number
  },
  "lineItems": [
    {
      "description": string,
      "quantity": number,
      "unit": string,
      "unitRate": number,
      "total": number
    }
  ],
  "wastageBufferPercent": number,
  "wastageSqFt": number,
  "grossSqFt": number,
  "subtotal": number,
  "taxAmount": number,
  "grandTotal": number,
  "commercialMilestones": [
    { "phase": string, "percent": number, "description": string }
  ],
  "executiveTerms": string[],
  "commercialAdvantageSummary": string
}
Return only valid JSON.`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const netArea = Number(areaSqFt) || 12000;
    const wastagePct = 8;
    const grossArea = Math.round(netArea * (1 + wastagePct / 100));
    const matTotal = grossArea * (Number(materialRate) || 4.25);
    const underTotal = netArea * (Number(underlaymentRate) || 0.65);
    const installTotal = netArea * (Number(installationRate) || 1.80);
    const freightTotal = (Number(freightKm) || 45) * 12;
    const sub = matTotal + underTotal + installTotal + freightTotal;
    const tax = sub * ((Number(taxPercent) || 12) / 100);

    const parsed = cleanAndParseJson(response.text || '', {
      quotationNumber: `WF-CPQ-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      validUntil: '30 Days from Issuance',
      technicalSpecs: {
        category: flooringCategory || 'WE FLOORS Commercial Rigid Core',
        wearLayerThickness: '0.70mm (28 mil) Diamond Ceramic Bead',
        acousticRating: 'NRC 0.32 / 21dB Sound Attenuation',
        fireRatingClass: 'Class Bfl-s1 Flame Retardant',
        commercialWarrantyYears: 15,
      },
      lineItems: [
        {
          description: `Primary Architectural Flooring: ${flooringCategory}`,
          quantity: grossArea,
          unit: 'sq.ft',
          unitRate: Number(materialRate) || 4.25,
          total: matTotal,
        },
        {
          description: 'Acoustic Barrier & Vapor Underlayment IXPE 1.5mm',
          quantity: netArea,
          unit: 'sq.ft',
          unitRate: Number(underlaymentRate) || 0.65,
          total: underTotal,
        },
        {
          description: 'Certified Surface Preparation, Subfloor Laser Leveling & Installation',
          quantity: netArea,
          unit: 'sq.ft',
          unitRate: Number(installationRate) || 1.80,
          total: installTotal,
        },
        {
          description: `Direct Mill Transit, Freight & On-Site Unloading (${freightKm} km)`,
          quantity: 1,
          unit: 'lot',
          unitRate: freightTotal,
          total: freightTotal,
        },
      ],
      wastageBufferPercent: wastagePct,
      wastageSqFt: grossArea - netArea,
      grossSqFt: grossArea,
      subtotal: sub,
      taxAmount: tax,
      grandTotal: sub + tax,
      commercialMilestones: [
        { phase: 'Order Confirmation & Factory Batch Allocation', percent: 50, description: 'Initiates container packaging.' },
        { phase: 'Dispatch & Port Clearance', percent: 40, description: 'Prior to site delivery.' },
        { phase: 'Final Handover & QA Inspection', percent: 10, description: 'Post installation sign-off.' },
      ],
      executiveTerms: [
        'All materials supplied under WE FLOORS 15-Year Commercial Warranty.',
        'Subfloor moisture must be verified under 3% RH prior to laying.',
        'Delivery timelines guaranteed with dedicated logistics tracking.',
      ],
      commercialAdvantageSummary: 'Direct manufacturer pricing eliminates distributor margins, yielding an estimated 22-26% cost reduction on high-volume builder projects.',
    });

    res.json(parsed);
  } catch (error: any) {
    console.error('Quotation agent error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate quotation' });
  }
});

// 5. Builder & IT Presentation Deck Generator Agent
app.post('/api/agent/presentation', async (req, res) => {
  try {
    const { presentationTarget, clientCompany, keyPainPoints, highlightedProducts } = req.body;

    const prompt = `You are the Commercial Director for WE FLOORS.
Create an executive slide-by-slide presentation deck tailored specifically for:
Target Client Type: ${presentationTarget || 'IT Campuses & Tech MNCs'}
Client Name/Company: ${clientCompany || 'InnoTech Global Hubs'}
Key Pain Points: ${keyPainPoints || 'Acoustics in open offices, castor-chair wear, fast overnight installation, LEED environmental certification'}
Products to Showcase: ${highlightedProducts || 'WE FLOORS Acoustic Backed IT Carpet Tiles + Engineered Oak for Boardrooms + Heavy-Traffic SPC for Cafeterias'}

Return a structured JSON with 7 to 8 complete presentation slides:
{
  "deckTitle": string,
  "deckSubtitle": string,
  "targetSegment": string,
  "slides": [
    {
      "slideNumber": number,
      "title": string,
      "subtitle": string,
      "keyTakeaway": string,
      "bulletPoints": string[],
      "visualLayoutSuggestion": string,
      "metricsOrHighlights": [
        { "label": string, "value": string }
      ]
    }
  ],
  "meetingAgenda": string[],
  "closingPitchHook": string
}
Return only valid JSON.`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = cleanAndParseJson(response.text || '', {
      deckTitle: 'WE FLOORS Enterprise Partnership & Spec Deck',
      deckSubtitle: `High-Performance Surfaces for ${clientCompany || 'Enterprise Campuses'}`,
      targetSegment: presentationTarget || 'IT Campuses & Commercial Developers',
      slides: [
        {
          slideNumber: 1,
          title: 'Architectural Performance Meets Commercial ROI',
          subtitle: 'Executive Summary',
          keyTakeaway: 'Direct container procurement reduces fit-out budget by 22% while upgrading acoustic specs.',
          bulletPoints: [
            'Factory-direct sourcing with zero intermediary distributors',
            'Full acoustic compliance with NRC 0.32+ for high-density open bays',
            'Heavy commercial Class 33/34 durability against rolling caster chairs',
            'Turnkey logistics from mill to project site',
          ],
          visualLayoutSuggestion: 'Split slide with high-res IT office visualizer render on right and metrics on left.',
          metricsOrHighlights: [
            { label: 'Acoustic Rating', value: 'NRC 0.32' },
            { label: 'Commercial Class', value: 'Class 33 Heavy' },
            { label: 'Cost Reduction', value: '22%' },
          ],
        },
        {
          slideNumber: 2,
          title: 'Open-Office Sound Attenuation & Ergonomics',
          subtitle: 'Acoustic Engineering',
          keyTakeaway: 'Eliminating keyboard and footfall reverberation improves software developer productivity.',
          bulletPoints: [
            'Integrated CushionBac acoustic backing eliminates additional underlayment costs',
            'Static-dissipative fibers protect sensitive server equipment and terminals',
            'Modular 50x50 tile format permits seamless subfloor cabling adjustments',
          ],
          visualLayoutSuggestion: 'Decibel reduction comparison chart vs standard commercial tile.',
          metricsOrHighlights: [
            { label: 'Reverberation Drop', value: '-21 dB' },
            { label: 'Static Charge', value: '< 2.0 kV' },
          ],
        },
      ],
      meetingAgenda: ['Executive Overview', 'Technical & Acoustic Specifications', 'Cost vs Lifespan Comparison', 'Next Steps & Physical Sample Review'],
      closingPitchHook: 'Partnering with WE FLOORS gives your projects world-class European and Asian mill standards with guaranteed on-time delivery.',
    });

    res.json(parsed);
  } catch (error: any) {
    console.error('Presentation deck agent error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate presentation deck' });
  }
});

// 6. Global Flooring Trend & Design Scraping / Curation Agent
app.post('/api/agent/trend-scraping', async (req, res) => {
  try {
    const { trendFocus, competitorSource, importRegion } = req.body;

    const prompt = `You are the Global Head of Design Curation & International Import Sourcing for WE FLOORS.
Analyze the latest global flooring trends from international design expos (Cersaie Italy, Domotex Germany, Milan Design Week, NeoCon US) and competitor catalogs to identify top designs for new import product development.

Inquiry parameters:
- Brand: WE FLOORS
- Trend Focus: ${trendFocus || 'Nordic Japandi Smoked Oak Herringbone & Large-Format Terrazzo-Look SPC'}
- Competitor / Benchmark Source: ${competitorSource || 'Top European & Japanese Architectural Surfaces Brands'}
- Import Source Region: ${importRegion || 'Italy, Germany, Vietnam, and South Korea OEM facilities'}

Provide a structured JSON breakdown:
{
  "trendReportTitle": string,
  "globalMarketSentiment": string,
  "curatedDesigns": [
    {
      "designName": string,
      "originInspiration": string,
      "colorPalette": {
        "primaryTone": string,
        "hexCodes": string[],
        "undertones": string
      },
      "textureAndFinish": string,
      "recommendedDimensions": string,
      "idealApplications": string[],
      "importFeasibilityScore": number (1-10),
      "landedCostEstimate": string,
      "suggestedRetailPrice": string,
      "estimatedGrossMargin": string,
      "oemManufacturingNotes": string
    }
  ],
  "competitorGapAnalysis": string,
  "importViabilitySummary": string,
  "nextQuarterProductionAction": string[]
}
Return only valid JSON.`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = cleanAndParseJson(response.text || '', {
      trendReportTitle: 'WE FLOORS Global Flooring Design Intelligence & Import Blueprint',
      globalMarketSentiment: 'Strong pivot towards organic matte finishes, ultra-wide planks, and synchronized EIR textures that eliminate artificial sheen.',
      curatedDesigns: [
        {
          designName: 'Nordic Smoked Truffle Oak SPC',
          originInspiration: 'Domotex Hannover & Scandinavian Minimalist Residences',
          colorPalette: {
            primaryTone: 'Smoked Muted Greige',
            hexCodes: ['#a89f91', '#7d7465', '#d4cec5'],
            undertones: 'Ash, Raw Linen & Soft Umber',
          },
          textureAndFinish: 'Deep synchronized EIR wire-brushed matte (5 GU gloss rating)',
          recommendedDimensions: '228mm x 1800mm Extra-Long Plank',
          idealApplications: ['Luxury Living Rooms', 'C-Suite Tech Boardrooms', 'Boutique Hotel Suites'],
          importFeasibilityScore: 9,
          landedCostEstimate: '$2.85 / sq.ft FOB + Freight',
          suggestedRetailPrice: '$6.20 / sq.ft',
          estimatedGrossMargin: '54%',
          oemManufacturingNotes: 'Utilize automated precision unilin click-locking line in Vietnam with 0.7mm diamond ceramic bead wear layer.',
        },
        {
          designName: 'Venetian Micro-Terrazzo Mineral Slab',
          originInspiration: 'Cersaie Bologna Architectural Pavilions',
          colorPalette: {
            primaryTone: 'Warm Bone with Calacatta & Basalt Aggregates',
            hexCodes: ['#e3dfd7', '#42413e', '#b08b59'],
            undertones: 'Oatmeal & Ochre Flecks',
          },
          textureAndFinish: 'Honed silk touch with anti-slip R10 rating',
          recommendedDimensions: '600mm x 1200mm Rectified Panels',
          idealApplications: ['Tech Park Atrium Lobbies', 'High-Traffic Cafeterias', 'Executive Corridors'],
          importFeasibilityScore: 8,
          landedCostEstimate: '$3.90 / sq.ft landed',
          suggestedRetailPrice: '$8.50 / sq.ft',
          estimatedGrossMargin: '54%',
          oemManufacturingNotes: 'Continuous hydraulic vacuum press with high recycled mineral density.',
        },
      ],
      competitorGapAnalysis: 'Competitors charge exorbitant distributor markups (over 80%) on European herringbone. WE FLOORS can capture market share by offering direct factory import lines at 35% lower cost.',
      importViabilitySummary: 'Exceptional ROI potential. High demand among architects for matte Japandi tones and commercial-grade acoustic backing.',
      nextQuarterProductionAction: [
        'Approve 3 trial mould cylinders with Vietnamese OEM partner.',
        'Courier sample swatches to top 25 architectural practices.',
        'Prepare container shipment scheduling for Q1 developer delivery.',
      ],
    });

    res.json(parsed);
  } catch (error: any) {
    console.error('Trend scraping agent error:', error);
    res.status(500).json({ error: error.message || 'Failed to scrape/curate flooring designs' });
  }
});

// Vite middleware or static serving
async function setupVite() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`WE FLOORS Server listening on port ${PORT}`);
  });
}

if (process.env.VERCEL !== '1') {
  setupVite();
}

export default app;
