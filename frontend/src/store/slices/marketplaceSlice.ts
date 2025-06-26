import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MarketplaceService, MarketplaceState, ServiceFilter, ServiceCategory, ApiResponse } from '../../types';

// Mock marketplace data - Operator Services Only
const mockServices: MarketplaceService[] = [
  // Deposit Methods
  {
    id: '9',
    name: 'Stripe',
    category: ServiceCategory.DepositMethods,
    description: 'Complete payment processing solution with global coverage',
    price: 299.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'stripe-1',
    provider: 'Stripe Inc.',
    isActive: true,
    isFeatured: false,
    rating: 4.8,
    purchaseCount: 1200,
    features: ['Global Payment Processing', 'Fraud Detection', 'Multiple Currencies', 'Developer APIs'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '10',
    name: 'Nuvei',
    category: ServiceCategory.DepositMethods,
    description: 'Advanced payment technology for global businesses',
    price: 249.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'nuvei-1',
    provider: 'Nuvei Corporation',
    isActive: true,
    isFeatured: false,
    rating: 4.6,
    purchaseCount: 890,
    features: ['Local Payment Methods', 'Risk Management', 'Multi-currency Support', 'Real-time Analytics'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '11',
    name: 'WorldPay',
    category: ServiceCategory.DepositMethods,
    description: 'Global payment processing and merchant services',
    price: 199.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'worldpay-1',
    provider: 'WorldPay Ltd',
    isActive: true,
    isFeatured: false,
    rating: 4.5,
    purchaseCount: 654,
    features: ['Merchant Services', 'Payment Gateway', 'Fraud Prevention', 'Mobile Payments'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '12',
    name: 'Payments iQ',
    category: ServiceCategory.DepositMethods,
    description: 'Intelligent payment optimization platform',
    price: 349.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'paymentsiq-1',
    provider: 'PaymentsIQ',
    isActive: true,
    isFeatured: false,
    rating: 4.7,
    purchaseCount: 432,
    features: ['Payment Orchestration', 'Smart Routing', 'Analytics', 'Multi-PSP Support'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '13',
    name: 'Trustly',
    category: ServiceCategory.DepositMethods,
    description: 'Online banking payments made simple',
    price: 179.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'trustly-1',
    provider: 'Trustly Group AB',
    isActive: true,
    isFeatured: false,
    rating: 4.4,
    purchaseCount: 567,
    features: ['Direct Bank Transfers', 'Instant Payments', 'No Registration', 'High Security'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // Player Journeys
  {
    id: '14',
    name: 'Future Anthem',
    category: ServiceCategory.PlayerJourneys,
    description: 'AI-powered player engagement and journey optimization',
    price: 499.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'futureanthem-1',
    provider: 'Future Anthem',
    isActive: true,
    isFeatured: true,
    rating: 4.9,
    purchaseCount: 234,
    features: ['AI Player Insights', 'Journey Optimization', 'Personalization', 'Real-time Analytics'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '15',
    name: 'Optimove',
    category: ServiceCategory.PlayerJourneys,
    description: 'Customer-led marketing optimization platform',
    price: 399.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'optimove-1',
    provider: 'Optimove Ltd',
    isActive: true,
    isFeatured: false,
    rating: 4.7,
    purchaseCount: 345,
    features: ['Customer Analytics', 'Campaign Optimization', 'Predictive Modeling', 'Multi-channel'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '16',
    name: 'Fast Track',
    category: ServiceCategory.PlayerJourneys,
    description: 'Rapid player onboarding and engagement platform',
    price: 299.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'fasttrack-1',
    provider: 'Fast Track Solutions',
    isActive: true,
    isFeatured: false,
    rating: 4.5,
    purchaseCount: 456,
    features: ['Quick Onboarding', 'Player Segmentation', 'Automated Campaigns', 'Journey Mapping'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '17',
    name: 'Smartico',
    category: ServiceCategory.PlayerJourneys,
    description: 'Comprehensive player engagement and gamification platform',
    price: 449.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'smartico-1',
    provider: 'Smartico',
    isActive: true,
    isFeatured: true,
    rating: 4.8,
    purchaseCount: 678,
    features: ['Gamification Engine', 'Real-time Triggers', 'Player Analytics', 'CRM Integration'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '18',
    name: 'Playtech AI',
    category: ServiceCategory.PlayerJourneys,
    description: 'AI-driven player experience optimization',
    price: 549.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'playtechai-1',
    provider: 'Playtech AI',
    isActive: true,
    isFeatured: false,
    rating: 4.6,
    purchaseCount: 234,
    features: ['AI Recommendations', 'Behavioral Analysis', 'Personalization', 'Predictive Analytics'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '19',
    name: 'Promofy',
    category: ServiceCategory.PlayerJourneys,
    description: 'Intelligent promotion and bonus management system',
    price: 329.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'promofy-1',
    provider: 'Promofy',
    isActive: true,
    isFeatured: false,
    rating: 4.4,
    purchaseCount: 345,
    features: ['Bonus Management', 'Promotion Engine', 'Player Targeting', 'Campaign Analytics'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '20',
    name: 'Simplify',
    category: ServiceCategory.PlayerJourneys,
    description: 'Simplified player journey optimization platform',
    price: 249.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'simplify-1',
    provider: 'Simplify Solutions',
    isActive: true,
    isFeatured: false,
    rating: 4.3,
    purchaseCount: 432,
    features: ['Journey Simplification', 'User Experience', 'A/B Testing', 'Analytics'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '21',
    name: 'Solitics',
    category: ServiceCategory.PlayerJourneys,
    description: 'Real-time customer engagement platform',
    price: 399.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'solitics-1',
    provider: 'Solitics',
    isActive: true,
    isFeatured: false,
    rating: 4.5,
    purchaseCount: 345,
    features: ['Real-time Engagement', 'Multi-channel', 'Behavioral Triggers', 'Personalization'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '22',
    name: 'Medallia',
    category: ServiceCategory.PlayerJourneys,
    description: 'Customer experience management platform',
    price: 449.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'medallia-1',
    provider: 'Medallia Inc',
    isActive: true,
    isFeatured: false,
    rating: 4.6,
    purchaseCount: 234,
    features: ['Experience Analytics', 'Feedback Management', 'Journey Mapping', 'Insights Platform'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '23',
    name: 'Flows',
    category: ServiceCategory.PlayerJourneys,
    description: 'Advanced player flow optimization and analytics',
    price: 299.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'flows-1',
    provider: 'Flows Analytics',
    isActive: true,
    isFeatured: false,
    rating: 4.4,
    purchaseCount: 456,
    features: ['Flow Analytics', 'Conversion Optimization', 'User Behavior', 'Journey Insights'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // Fraud and Player Protection
  {
    id: '24',
    name: 'MindWay',
    category: ServiceCategory.FraudPlayerProtection,
    description: 'AI-powered responsible gambling and player protection',
    price: 699.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'mindway-1',
    provider: 'MindWay AI',
    isActive: true,
    isFeatured: true,
    rating: 4.9,
    purchaseCount: 123,
    features: ['AI Risk Detection', 'Behavioral Analysis', 'Early Intervention', 'Compliance Tools'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '25',
    name: 'Greco',
    category: ServiceCategory.Fraud,
    description: 'Advanced fraud detection and prevention platform',
    price: 449.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'greco-1',
    provider: 'Greco Systems',
    isActive: true,
    isFeatured: false,
    rating: 4.7,
    purchaseCount: 234,
    features: ['Real-time Fraud Detection', 'Machine Learning', 'Risk Scoring', 'Case Management'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // CRM
  {
    id: '26',
    name: 'Salesforce',
    category: ServiceCategory.CRM,
    description: 'World-leading customer relationship management platform',
    price: 599.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'salesforce-1',
    provider: 'Salesforce Inc',
    isActive: true,
    isFeatured: true,
    rating: 4.8,
    purchaseCount: 1500,
    features: ['Customer Management', 'Sales Automation', 'Analytics', 'Integration Platform'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '27',
    name: 'Xtremepush',
    category: ServiceCategory.CRM,
    description: 'Multi-channel customer engagement platform',
    price: 399.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'xtremepush-1',
    provider: 'Xtremepush',
    isActive: true,
    isFeatured: false,
    rating: 4.6,
    purchaseCount: 345,
    features: ['Multi-channel Messaging', 'Customer Segmentation', 'Campaign Management', 'Analytics'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // AI Call Centre Communications
  {
    id: '28',
    name: 'Zendesk',
    category: ServiceCategory.AICallCentreComms,
    description: 'AI-powered customer service and support platform',
    price: 299.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'zendesk-1',
    provider: 'Zendesk Inc',
    isActive: true,
    isFeatured: false,
    rating: 4.7,
    purchaseCount: 890,
    features: ['AI Chatbots', 'Ticket Management', 'Knowledge Base', 'Multi-channel Support'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // Customer Management
  {
    id: '29',
    name: 'MS Dynamics',
    category: ServiceCategory.CustomerManagement,
    description: 'Microsoft Dynamics 365 customer management suite',
    price: 499.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'msdynamics-1',
    provider: 'Microsoft Corporation',
    isActive: true,
    isFeatured: true,
    rating: 4.6,
    purchaseCount: 678,
    features: ['Customer Insights', 'Process Automation', 'AI Integration', 'Cloud Platform'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // Reporting
  {
    id: '30',
    name: 'Gaming Analytics',
    category: ServiceCategory.Reporting,
    description: 'Comprehensive gaming analytics and reporting platform',
    price: 349.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'gaminganalytics-1',
    provider: 'Gaming Analytics Pro',
    isActive: true,
    isFeatured: false,
    rating: 4.5,
    purchaseCount: 456,
    features: ['Player Analytics', 'Revenue Reports', 'KPI Dashboards', 'Custom Reports'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '31',
    name: 'Aretonet',
    category: ServiceCategory.Reporting,
    description: 'Advanced reporting and business intelligence platform',
    price: 299.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'aretonet-1',
    provider: 'Aretonet Solutions',
    isActive: true,
    isFeatured: false,
    rating: 4.4,
    purchaseCount: 234,
    features: ['BI Analytics', 'Custom Dashboards', 'Data Visualization', 'Report Automation'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // Compliance Aggregators - Exclusion Registers
  {
    id: '32',
    name: 'Gamstop',
    category: ServiceCategory.ComplianceAggregators,
    description: 'UK gambling self-exclusion service',
    price: 199.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'gamstop-1',
    provider: 'Gamstop Ltd',
    isActive: true,
    isFeatured: false,
    rating: 4.8,
    purchaseCount: 567,
    features: ['Self-exclusion Database', 'Real-time Checks', 'Compliance Reporting', 'API Integration'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '33',
    name: 'Experian',
    category: ServiceCategory.ComplianceAggregators,
    description: 'Global identity and fraud prevention services',
    price: 399.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'experian-1',
    provider: 'Experian plc',
    isActive: true,
    isFeatured: false,
    rating: 4.7,
    purchaseCount: 789,
    features: ['Identity Verification', 'Credit Checks', 'Fraud Prevention', 'Compliance Tools'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '34',
    name: 'Jumio',
    category: ServiceCategory.ComplianceAggregators,
    description: 'AI-powered identity verification and compliance',
    price: 349.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'jumio-1',
    provider: 'Jumio Corp',
    isActive: true,
    isFeatured: false,
    rating: 4.6,
    purchaseCount: 432,
    features: ['ID Verification', 'Biometric Authentication', 'AML Screening', 'Document Verification'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '35',
    name: 'Spielhaus',
    category: ServiceCategory.ComplianceAggregators,
    description: 'German gambling exclusion and compliance platform',
    price: 249.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'spielhaus-1',
    provider: 'Spielhaus GmbH',
    isActive: true,
    isFeatured: false,
    rating: 4.5,
    purchaseCount: 234,
    features: ['German Compliance', 'Player Exclusion', 'Regulatory Reporting', 'Real-time Monitoring'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '36',
    name: 'Dictaoe (Spain)',
    category: ServiceCategory.ComplianceAggregators,
    description: 'Spanish gambling exclusion and compliance services',
    price: 199.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'dictaoe-1',
    provider: 'Dictaoe Spain',
    isActive: true,
    isFeatured: false,
    rating: 4.4,
    purchaseCount: 156,
    features: ['Spanish Compliance', 'RGIAJ Integration', 'Player Protection', 'Regulatory Reporting'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '37',
    name: 'Bing',
    category: ServiceCategory.ComplianceAggregators,
    description: 'Search-based compliance and monitoring solutions',
    price: 149.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'bing-1',
    provider: 'Microsoft Bing',
    isActive: true,
    isFeatured: false,
    rating: 4.3,
    purchaseCount: 345,
    features: ['Search Monitoring', 'Content Compliance', 'Real-time Alerts', 'API Integration'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '38',
    name: 'LocationSmart',
    category: ServiceCategory.ComplianceAggregators,
    description: 'Location-based compliance and verification services',
    price: 299.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'locationsmart-1',
    provider: 'LocationSmart',
    isActive: true,
    isFeatured: false,
    rating: 4.5,
    purchaseCount: 234,
    features: ['Geolocation Verification', 'Compliance Monitoring', 'Real-time Location', 'API Services'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '39',
    name: 'GeoComply',
    category: ServiceCategory.ComplianceAggregators,
    description: 'Geolocation compliance and fraud prevention',
    price: 399.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'geocomply-1',
    provider: 'GeoComply Solutions',
    isActive: true,
    isFeatured: true,
    rating: 4.8,
    purchaseCount: 678,
    features: ['Geolocation Technology', 'Fraud Prevention', 'Compliance Tools', 'Real-time Verification'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // National Regulator
  {
    id: '40',
    name: 'Lugas (Germany)',
    category: ServiceCategory.NationalRegulator,
    description: 'German gambling regulatory compliance platform',
    price: 599.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'lugas-1',
    provider: 'Lugas Germany',
    isActive: true,
    isFeatured: false,
    rating: 4.6,
    purchaseCount: 123,
    features: ['German Regulation', 'License Management', 'Compliance Reporting', 'Regulatory Updates'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '41',
    name: 'TruNarrative',
    category: ServiceCategory.NationalRegulator,
    description: 'Regulatory compliance and risk management platform',
    price: 449.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'trunarrative-1',
    provider: 'TruNarrative Ltd',
    isActive: true,
    isFeatured: false,
    rating: 4.7,
    purchaseCount: 234,
    features: ['Risk Assessment', 'Compliance Automation', 'Regulatory Reporting', 'AML/KYC'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '42',
    name: 'Featurespace',
    category: ServiceCategory.NationalRegulator,
    description: 'AI-powered fraud prevention and compliance',
    price: 549.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'featurespace-1',
    provider: 'Featurespace Ltd',
    isActive: true,
    isFeatured: false,
    rating: 4.8,
    purchaseCount: 345,
    features: ['AI Fraud Detection', 'Anomaly Detection', 'Compliance Monitoring', 'Real-time Analysis'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '43',
    name: 'FinCom.Co',
    category: ServiceCategory.NationalRegulator,
    description: 'Financial compliance and regulatory technology',
    price: 399.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'fincom-1',
    provider: 'FinCom.Co',
    isActive: true,
    isFeatured: false,
    rating: 4.5,
    purchaseCount: 198,
    features: ['Financial Compliance', 'Regulatory Technology', 'Risk Management', 'Reporting Tools'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // Loyalty
  {
    id: '44',
    name: 'Trueplay Blockchain Loyalty',
    category: ServiceCategory.Loyalty,
    description: 'Blockchain-based loyalty and rewards platform',
    price: 449.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'trueplay-1',
    provider: 'Trueplay',
    isActive: true,
    isFeatured: true,
    rating: 4.7,
    purchaseCount: 234,
    features: ['Blockchain Loyalty', 'Token Rewards', 'Smart Contracts', 'Decentralized Platform'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // Crypto Blockchain
  {
    id: '45',
    name: 'CoinsPaid',
    category: ServiceCategory.CryptoBlockchain,
    description: 'Cryptocurrency payment processing platform',
    price: 349.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'coinspaid-1',
    provider: 'CoinsPaid',
    isActive: true,
    isFeatured: false,
    rating: 4.6,
    purchaseCount: 345,
    features: ['Crypto Payments', 'Multi-currency', 'API Integration', 'Security Features'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // Risk
  {
    id: '46',
    name: 'Sion Payment Risk',
    category: ServiceCategory.Risk,
    description: 'Advanced payment risk management and fraud prevention',
    price: 399.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'sionrisk-1',
    provider: 'Sion Technologies',
    isActive: true,
    isFeatured: false,
    rating: 4.7,
    purchaseCount: 234,
    features: ['Payment Risk Analysis', 'Fraud Detection', 'Real-time Monitoring', 'Risk Scoring'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '47',
    name: 'Lexus Nexus',
    category: ServiceCategory.Risk,
    description: 'Comprehensive risk assessment and data analytics',
    price: 499.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'lexusnexus-1',
    provider: 'LexisNexus Risk Solutions',
    isActive: true,
    isFeatured: false,
    rating: 4.8,
    purchaseCount: 456,
    features: ['Risk Analytics', 'Identity Verification', 'Fraud Prevention', 'Data Intelligence'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },

  // Game Aggregator
  {
    id: '48',
    name: 'Alea',
    category: ServiceCategory.GameAggregator,
    description: 'Comprehensive game aggregation platform',
    price: 699.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'alea-1',
    provider: 'Alea Gaming',
    isActive: true,
    isFeatured: true,
    rating: 4.8,
    purchaseCount: 345,
    features: ['Game Aggregation', 'Multi-provider Support', 'API Management', 'Analytics Dashboard'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '49',
    name: 'Spribe',
    category: ServiceCategory.GameAggregator,
    description: 'Next-generation game provider and aggregation',
    price: 549.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'spribe-1',
    provider: 'Spribe',
    isActive: true,
    isFeatured: false,
    rating: 4.7,
    purchaseCount: 234,
    features: ['Crash Games', 'Live Games', 'Mobile Optimization', 'Real-time Gaming'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '50',
    name: 'Pragmatic',
    category: ServiceCategory.GameAggregator,
    description: 'Premier gaming content provider and aggregator',
    price: 599.99,
    imageUrl: '/api/placeholder/300/200',
    providerId: 'pragmatic-1',
    provider: 'Pragmatic Play',
    isActive: true,
    isFeatured: true,
    rating: 4.9,
    purchaseCount: 567,
    features: ['Slot Games', 'Live Casino', 'Bingo Games', 'Virtual Sports'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

// Mock API calls
const marketplaceAPI = {
  getServices: async (filter: ServiceFilter): Promise<ApiResponse<MarketplaceService[]>> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let filteredServices = mockServices;
    
    if (filter.categories && filter.categories.length > 0) {
      filteredServices = filteredServices.filter(service => 
        filter.categories!.includes(service.category)
      );
    }
    
    if (filter.minPrice !== undefined) {
      filteredServices = filteredServices.filter(service => 
        (service.price ?? 0) >= filter.minPrice!
      );
    }
    
    if (filter.maxPrice !== undefined) {
      filteredServices = filteredServices.filter(service => 
        (service.price ?? 0) <= filter.maxPrice!
      );
    }
    
    if (filter.isFeatured !== undefined) {
      filteredServices = filteredServices.filter(service => 
        service.isFeatured === filter.isFeatured
      );
    }
    
    if (filter.searchTerm) {
      const searchLower = filter.searchTerm.toLowerCase();
      filteredServices = filteredServices.filter(service =>
        service.name.toLowerCase().includes(searchLower) ||
        service.description.toLowerCase().includes(searchLower)
      );
    }
    
    return {
      success: true,
      data: filteredServices,
    };
  },

  getFeaturedServices: async (maxItems: number = 4): Promise<ApiResponse<MarketplaceService[]>> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const featuredServices = mockServices
      .filter(service => service.isFeatured)
      .slice(0, maxItems);
    
    return {
      success: true,
      data: featuredServices,
    };
  },
};

// Async thunks
export const fetchServices = createAsyncThunk(
  'marketplace/fetchServices',
  async (filter: ServiceFilter, { rejectWithValue }) => {
    try {
      const response = await marketplaceAPI.getServices(filter);
      if (response.success && response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.error || 'Failed to fetch services');
      }
    } catch (error) {
      return rejectWithValue('Network error. Please try again.');
    }
  }
);

export const fetchFeaturedServices = createAsyncThunk(
  'marketplace/fetchFeaturedServices',
  async (maxItems: number = 4, { rejectWithValue }) => {
    try {
      const response = await marketplaceAPI.getFeaturedServices(maxItems);
      if (response.success && response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.error || 'Failed to fetch featured services');
      }
    } catch (error) {
      return rejectWithValue('Network error. Please try again.');
    }
  }
);

const initialState: MarketplaceState = {
  services: mockServices, // Load all services immediately
  featuredServices: mockServices.filter(service => service.isFeatured),
  categories: Object.values(ServiceCategory),
  filter: {
    categories: [],
    isActive: true,
  },
  isLoading: false,
  error: null,
};

const marketplaceSlice = createSlice({
  name: 'marketplace',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setFilter: (state, action: PayloadAction<ServiceFilter>) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    clearFilter: (state) => {
      state.filter = {
        categories: [],
        isActive: true,
      };
    },
    setServices: (state, action: PayloadAction<MarketplaceService[]>) => {
      state.services = action.payload;
    },
    setFeaturedServices: (state, action: PayloadAction<MarketplaceService[]>) => {
      state.featuredServices = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch services cases
    builder
      .addCase(fetchServices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.services = action.payload;
        state.error = null;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch featured services cases
      .addCase(fetchFeaturedServices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featuredServices = action.payload;
        state.error = null;
      })
      .addCase(fetchFeaturedServices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setFilter, clearFilter, setServices, setFeaturedServices } = marketplaceSlice.actions;
export default marketplaceSlice.reducer;
