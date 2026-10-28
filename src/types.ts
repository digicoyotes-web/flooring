export type FlooringCategory = 
  | 'all'
  | 'it-carpet'
  | 'spc-rigid'
  | 'engineered-wood'
  | 'porcelain-slab'
  | 'terrazzo-mineral';

export interface FlooringProduct {
  id: string;
  name: string;
  category: FlooringCategory;
  categoryLabel: string;
  subtitle: string;
  origin: string;
  pricePerSqFt: number;
  bulkPricePerSqFt: number;
  dimensions: string;
  wearLayer: string;
  acousticRatingNRC: number;
  fireRating: string;
  waterproof: boolean;
  leedCredits: string;
  description: string;
  imageUrl: string;
  texturePattern: 'straight' | 'herringbone' | 'tile' | 'slab';
  colors: string[];
  recommendedFor: ('IT Tech Parks' | 'Luxury Residential' | 'Commercial Real Estate' | 'Hospitality')[];
}

// Room Visualizer Types
export interface VisualizerRoom {
  id: string;
  name: string;
  type: 'it-campus' | 'penthouse' | 'boardroom' | 'hotel-lobby';
  title: string;
  description: string;
  roomOverlayImage: string;
  defaultFlooringId: string;
  lightingOptions: ('Daylight 5000K' | 'Warm Architectural 3000K' | 'Evening Mood 2700K')[];
}

// Agent 1: Digital Marketing
export interface MarketingCampaignResult {
  campaignName: string;
  executiveSummary: string;
  adCopies: {
    platform: string;
    headline: string;
    primaryText: string;
    callToAction: string;
    recommendedTargeting: string;
  }[];
  socialMediaContent: {
    instagramReelScript: {
      hook: string;
      visualSceneBreakdown: string[];
      voiceoverScript: string;
      hashtags: string[];
    };
    linkedInArticlePost: {
      title: string;
      body: string;
      callToAction: string;
    };
  };
  emailNurtureSequence: {
    step: number;
    subject: string;
    timing: string;
    bodySnippet: string;
    cta: string;
  }[];
  estimatedKpis: {
    estimatedCpl: string;
    targetCtr: string;
    recommendedWeeklyBudget: string;
    projectedLeadVolume: string;
  };
}

// Agent 2: Lead Gen & Qualification
export interface InboundLead {
  id: string;
  name: string;
  company: string;
  role: string;
  clientType: 'Real Estate Developer' | 'IT Park Campus' | 'Architect / Interior Studio' | 'Luxury Villa Owner' | 'Commercial Real Estate';
  areaSqFt: number;
  targetTimeline: string;
  budgetTier: 'Premium' | 'Ultra-Luxury' | 'Commercial Standard';
  location: string;
  inquiryNotes: string;
  status: 'New' | 'Qualified' | 'Proposal Sent' | 'Closed Won';
  submittedAt: string;
}

export interface LeadQualificationResult {
  leadScore: number;
  priority: 'HOT - Urgent High Value' | 'WARM - Strategic Project' | 'NURTURE - Standard Inquiry';
  projectEstimatedValue: string;
  fitAnalysis: string;
  dealProbability: string;
  recommendedProductBundle: {
    name: string;
    specs: string;
    strategicReason: string;
  }[];
  personalizedResponseDraft: {
    channel: string;
    subject: string;
    message: string;
  };
  closingStrategy: {
    step: string;
    action: string;
    objectionHandled: string;
  }[];
  architectSampleRecommendation: string;
}

// Agent 3: SEO Dominator
export interface SeoCampaignResult {
  metaTitle: string;
  metaDescription: string;
  focusKeywords: {
    keyword: string;
    searchIntent: string;
    difficulty: string;
    recommendedPlacement: string;
  }[];
  contentOutline: {
    h1: string;
    sections: {
      h2: string;
      keyPoints: string[];
      commercialValueAdd: string;
    }[];
  };
  schemaMarkupJsonLd: string;
  faqQuestions: {
    question: string;
    answer: string;
  }[];
  backlinkStrategy: string[];
  conversionHooks: string[];
}

// Agent 4: Quotation & CPQ
export interface QuotationResult {
  quotationNumber: string;
  date: string;
  validUntil: string;
  technicalSpecs: {
    category: string;
    wearLayerThickness: string;
    acousticRating: string;
    fireRatingClass: string;
    commercialWarrantyYears: number;
  };
  lineItems: {
    description: string;
    quantity: number;
    unit: string;
    unitRate: number;
    total: number;
  }[];
  wastageBufferPercent: number;
  wastageSqFt: number;
  grossSqFt: number;
  subtotal: number;
  taxAmount: number;
  grandTotal: number;
  commercialMilestones: {
    phase: string;
    percent: number;
    description: string;
  }[];
  executiveTerms: string[];
  commercialAdvantageSummary: string;
}

// Agent 5: Presentation Deck
export interface PresentationDeckResult {
  deckTitle: string;
  deckSubtitle: string;
  targetSegment: string;
  slides: {
    slideNumber: number;
    title: string;
    subtitle: string;
    keyTakeaway: string;
    bulletPoints: string[];
    visualLayoutSuggestion: string;
    metricsOrHighlights: {
      label: string;
      value: string;
    }[];
  }[];
  meetingAgenda: string[];
  closingPitchHook: string;
}

// Agent 6: Trend Scraping & Import Curation
export interface TrendReportResult {
  trendReportTitle: string;
  globalMarketSentiment: string;
  curatedDesigns: {
    designName: string;
    originInspiration: string;
    colorPalette: {
      primaryTone: string;
      hexCodes: string[];
      undertones: string;
    };
    textureAndFinish: string;
    recommendedDimensions: string;
    idealApplications: string[];
    importFeasibilityScore: number;
    landedCostEstimate: string;
    suggestedRetailPrice: string;
    estimatedGrossMargin: string;
    oemManufacturingNotes: string;
  }[];
  competitorGapAnalysis: string;
  importViabilitySummary: string;
  nextQuarterProductionAction: string[];
}
