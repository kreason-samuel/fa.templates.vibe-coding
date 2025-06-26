import React from 'react';
import { Layout as AntLayout } from 'antd';
import Header from './Header';
import Footer from './Footer';
import FeaturedCarousel from '../marketplace/FeaturedCarousel';
import ServiceGrid from '../marketplace/ServiceGrid';
import AuthModal from '../ui/AuthModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { MarketplaceService, ServiceCategory } from '../../types';

const { Content } = AntLayout;

// Featured services data - 5 selected operator services (Future Anthem added back)
const mockFeaturedServices: MarketplaceService[] = [
  {
    id: '9',
    name: 'Stripe',
    description: 'Complete payment processing solution with global coverage and fraud detection.',
    category: ServiceCategory.DepositMethods,
    price: 299.99,
    rating: 4.8,
    imageUrl: '/api/placeholder/400/250',
    providerId: 'stripe-1',
    provider: 'Stripe Inc.',
    isActive: true,
    isFeatured: true,
    features: ['Global Payment Processing', 'Fraud Detection', 'Multiple Currencies', 'Developer APIs'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '14',
    name: 'Future Anthem',
    description: 'AI-powered player engagement and journey optimization platform.',
    category: ServiceCategory.PlayerJourneys,
    price: 499.99,
    rating: 4.9,
    imageUrl: '/api/placeholder/400/250',
    providerId: 'futureanthem-1',
    provider: 'Future Anthem',
    isActive: true,
    isFeatured: true,
    features: ['AI Player Insights', 'Journey Optimization', 'Personalization', 'Real-time Analytics'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '26',
    name: 'Salesforce',
    description: 'World-leading customer relationship management platform.',
    category: ServiceCategory.CRM,
    price: 599.99,
    rating: 4.8,
    imageUrl: '/api/placeholder/400/250',
    providerId: 'salesforce-1',
    provider: 'Salesforce Inc',
    isActive: true,
    isFeatured: true,
    features: ['Customer Management', 'Sales Automation', 'Analytics', 'Integration Platform'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '24',
    name: 'MindWay',
    description: 'AI-powered responsible gambling and player protection system.',
    category: ServiceCategory.FraudPlayerProtection,
    price: 699.99,
    rating: 4.9,
    imageUrl: '/api/placeholder/400/250',
    providerId: 'mindway-1',
    provider: 'MindWay AI',
    isActive: true,
    isFeatured: true,
    features: ['AI Risk Detection', 'Behavioral Analysis', 'Early Intervention', 'Compliance Tools'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '39',
    name: 'GeoComply',
    description: 'Geolocation compliance and fraud prevention for gaming platforms.',
    category: ServiceCategory.ComplianceAggregators,
    price: 399.99,
    rating: 4.8,
    imageUrl: '/api/placeholder/400/250',
    providerId: 'geocomply-1',
    provider: 'GeoComply Solutions',
    isActive: true,
    isFeatured: true,
    features: ['Geolocation Technology', 'Fraud Prevention', 'Compliance Tools', 'Real-time Verification'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  }
];

const Layout: React.FC = () => {
  const { theme } = useSelector((state: RootState) => state.ui);

  return (
    <AntLayout className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <Header />
      <Content className="flex-1">
        <div className="container mx-auto px-4 py-8 space-y-12">
          {/* Hero Section with Featured Carousel */}
          <section className="text-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
                Market Place
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Your premium destination for iGaming services!
              </p>
            </div>
            <FeaturedCarousel services={mockFeaturedServices} />
          </section>

          {/* Services Grid */}
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Our Services
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Discover our comprehensive suite of services!
              </p>
            </div>
            <ServiceGrid />
          </section>
        </div>
      </Content>
      <Footer />
      <AuthModal />
    </AntLayout>
  );
};

export default Layout;
