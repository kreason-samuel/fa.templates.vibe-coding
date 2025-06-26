import React from 'react';
import { Carousel, Card, Button, Tag, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingCartOutlined, 
  EyeOutlined, 
  StarFilled,
  RocketOutlined,
  SafetyOutlined,
  PlayCircleOutlined,
  TrophyOutlined,
  GiftOutlined,
  DollarOutlined,
  CreditCardOutlined,
  UserOutlined,
  SecurityScanOutlined,
  CustomerServiceOutlined,
  ContactsOutlined,
  BarChartOutlined,
  AuditOutlined,
  CheckCircleOutlined,
  BankOutlined,
  HeartOutlined,
  BlockOutlined,
  AppstoreOutlined
} from '@ant-design/icons';
import { MarketplaceService, ServiceCategory } from '../../types';
import { motion } from 'framer-motion';

interface FeaturedCarouselProps {
  services: MarketplaceService[];
}

const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ services }) => {
  const navigate = useNavigate();

  const featuredServices = services.filter(service => service.isFeatured || service.featured);

  const handleViewService = (serviceId: string) => {
    navigate(`/service/${serviceId}`);
  };

  const getCategoryColor = (category: ServiceCategory) => {
    const colorMap: Record<ServiceCategory, string> = {
      // Original gaming categories
      [ServiceCategory.SmartICOPlugins]: 'volcano',
      [ServiceCategory.SEONFraudProtection]: 'red',
      [ServiceCategory.iGamingServers]: 'blue',
      [ServiceCategory.GameTournaments]: 'gold',
      [ServiceCategory.VirtualPitBoss]: 'purple',
      [ServiceCategory.FreeGames]: 'green',
      [ServiceCategory.JackpotGames]: 'magenta',
      [ServiceCategory.RandomPrizes]: 'cyan',
      
      // Operator service categories
      [ServiceCategory.DepositMethods]: 'lime',
      [ServiceCategory.PlayerJourneys]: 'orange',
      [ServiceCategory.FraudPlayerProtection]: 'red',
      [ServiceCategory.CRM]: 'blue',
      [ServiceCategory.AICallCentreComms]: 'purple',
      [ServiceCategory.CustomerManagement]: 'geekblue',
      [ServiceCategory.Reporting]: 'volcano',
      [ServiceCategory.Fraud]: 'red',
      [ServiceCategory.ComplianceAggregators]: 'green',
      [ServiceCategory.NationalRegulator]: 'gold',
      [ServiceCategory.Loyalty]: 'magenta',
      [ServiceCategory.CryptoBlockchain]: 'cyan',
      [ServiceCategory.Risk]: 'orange',
      [ServiceCategory.GameAggregator]: 'blue'
    };
    return colorMap[category] || 'blue';
  };

  const getServiceSpecificIconForTag = (service: MarketplaceService) => {
    // Map specific services to their icons with white color for tag visibility
    const serviceIconMap: Record<string, React.ReactElement> = {
      // Payment Services
      'Stripe': <CreditCardOutlined className="text-white" />,
      'Nuvei': <BankOutlined className="text-white" />,
      'WorldPay': <DollarOutlined className="text-white" />,
      'Payments iQ': <RocketOutlined className="text-white" />,
      'Trustly': <SafetyOutlined className="text-white" />,
      
      // AI & Player Journey Services  
      'Future Anthem': <RocketOutlined className="text-white" />,
      'Optimove': <BarChartOutlined className="text-white" />,
      'Fast Track': <PlayCircleOutlined className="text-white" />,
      'Smartico': <TrophyOutlined className="text-white" />,
      'Playtech AI': <UserOutlined className="text-white" />,
      'Promofy': <GiftOutlined className="text-white" />,
      'Simplify': <UserOutlined className="text-white" />,
      'Solitics': <ContactsOutlined className="text-white" />,
      'Medallia': <StarFilled className="text-white" />,
      'Flows': <BarChartOutlined className="text-white" />,
      
      // Security & Compliance
      'MindWay': <SecurityScanOutlined className="text-white" />,
      'Greco': <AuditOutlined className="text-white" />,
      'Gamstop': <CheckCircleOutlined className="text-white" />,
      'Experian': <BankOutlined className="text-white" />,
      'Jumio': <SafetyOutlined className="text-white" />,
      'Spielhaus': <CheckCircleOutlined className="text-white" />,
      'Dictaoe (Spain)': <BankOutlined className="text-white" />,
      'Bing': <SecurityScanOutlined className="text-white" />,
      'LocationSmart': <SecurityScanOutlined className="text-white" />,
      'GeoComply': <CheckCircleOutlined className="text-white" />,
      
      // CRM & Customer Management
      'Salesforce': <ContactsOutlined className="text-white" />,
      'Xtremepush': <CustomerServiceOutlined className="text-white" />,
      'MS Dynamics': <UserOutlined className="text-white" />,
      'Zendesk': <CustomerServiceOutlined className="text-white" />,
      
      // Analytics & Reporting
      'Gaming Analytics': <BarChartOutlined className="text-white" />,
      'Aretonet': <BarChartOutlined className="text-white" />,
      
      // Regulatory & Legal
      'Lugas (Germany)': <BankOutlined className="text-white" />,
      'TruNarrative': <AuditOutlined className="text-white" />,
      'Featurespace': <SecurityScanOutlined className="text-white" />,
      'FinCom.Co': <BankOutlined className="text-white" />,
      
      // Loyalty & Blockchain
      'Trueplay Blockchain Loyalty': <HeartOutlined className="text-white" />,
      'CoinsPaid': <BlockOutlined className="text-white" />,
      
      // Risk Management
      'Sion Payment Risk': <SecurityScanOutlined className="text-white" />,
      'Lexus Nexus': <AuditOutlined className="text-white" />,
      
      // Game Aggregators
      'Alea': <AppstoreOutlined className="text-white" />,
      'Spribe': <PlayCircleOutlined className="text-white" />,
      'Pragmatic': <TrophyOutlined className="text-white" />
    };
    
    return serviceIconMap[service.name] || <PlayCircleOutlined className="text-white" />;
  };

  if (featuredServices.length === 0) {
    return null;
  }

  return (
    <div className="featured-carousel mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Featured Services</h2>
      
      <Carousel 
        autoplay 
        dots={{ className: 'custom-dots' }}
        effect="fade"
        pauseOnHover
      >
        {featuredServices.map((service) => (
          <div key={service.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card 
                className="featured-card relative overflow-hidden rounded-xl shadow-2xl"
                bodyStyle={{ padding: 0 }}
                hoverable
              >
                <div className="relative h-96 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="w-full h-full bg-repeat" 
                         style={{ 
                           backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Ccircle cx="7" cy="7" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                           backgroundSize: '30px 30px'
                         }}
                    />
                  </div>

                  {/* Content Layout - Left Side Tags/Name/Features + Right Side Feature List */}
                  <div className="absolute inset-0 flex p-8 text-white">
                    {/* Left Side Content */}
                    <div className="flex-1 flex flex-col justify-start">
                      {/* Tags - Top Left */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Tag color="gold" className="mb-2">
                          <StarFilled className="mr-1" />
                          FEATURED
                        </Tag>
                        <Tag color={getCategoryColor(service.category)} className="mb-2 flex items-center">
                          <span className="mr-1">{getServiceSpecificIconForTag(service)}</span>
                          {service.category}
                        </Tag>
                      </div>
                      
                      {/* Service Name - Left Aligned */}
                      <h3 className="text-4xl font-bold mb-6 leading-tight text-left">
                        {service.name}
                      </h3>
                      
                      {/* Features Preview - Below Name */}
                      <div className="mb-6">
                        {/* Quick Features Preview */}
                        {service.features && service.features.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {service.features.slice(0, 2).map((feature, index) => (
                              <span 
                                key={index}
                                className="text-xs bg-white/30 text-white px-3 py-1 rounded-full"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {/* Description and Actions - Left Aligned */}
                      <div className="flex-1 flex flex-col justify-start">
                        <p className="text-lg opacity-90 mb-6 max-w-lg text-left">
                          {service.description}
                        </p>

                        <div className="flex items-center mb-6">
                          {service.rating && (
                            <Space>
                              <div className="flex items-center">
                                <StarFilled className="text-yellow-400 mr-1" />
                                <span className="font-semibold">{service.rating}</span>
                              </div>
                              {service.reviews && (
                                <span className="opacity-75">({service.reviews} reviews)</span>
                              )}
                            </Space>
                          )}
                        </div>

                        <div className="flex space-x-4">
                          <Button 
                            type="primary" 
                            size="large"
                            icon={<EyeOutlined />}
                            onClick={() => handleViewService(service.id)}
                            className="bg-white text-blue-600 border-white hover:bg-gray-100"
                          >
                            View Details
                          </Button>
                          
                          <Button 
                            size="large"
                            icon={<ShoppingCartOutlined />}
                            onClick={() => handleViewService(service.id)}
                            className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
                          >
                            Quick Purchase
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Key Features List */}
                    <div className="hidden lg:block w-80 ml-8">
                      <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 h-full">
                        <h4 className="text-xl font-bold mb-4 text-white flex items-center">
                          <RocketOutlined className="mr-2" />
                          Key Features
                        </h4>
                        
                        {service.features && service.features.length > 0 ? (
                          <ul className="space-y-3">
                            {service.features.map((feature, index) => (
                              <li 
                                key={index}
                                className="flex items-start text-white/90"
                              >
                                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span className="text-sm leading-relaxed">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-white/70 text-sm">No features available</p>
                        )}
                        
                        {/* Provider Info */}
                        <div className="mt-6 pt-4 border-t border-white/20">
                          <p className="text-xs text-white/60 mb-1">PROVIDED BY</p>
                          <p className="text-sm font-medium text-white">{service.provider}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price Badge */}
                  {service.price && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                        ${service.price}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default FeaturedCarousel;
