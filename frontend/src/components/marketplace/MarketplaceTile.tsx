import React, { useState } from 'react';
import { Card, Button, Tag, Tooltip, Badge, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingCartOutlined, 
  EyeOutlined, 
  StarFilled,
  RocketOutlined,
  SafetyOutlined,
  PlayCircleOutlined,
  TrophyOutlined,
  CrownOutlined,
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
import PurchaseModal from '../ui/PurchaseModal';

interface MarketplaceTileProps {
  service: MarketplaceService;
}

const MarketplaceTile: React.FC<MarketplaceTileProps> = ({ service }) => {
  const navigate = useNavigate();
  const [purchaseModalVisible, setPurchaseModalVisible] = useState(false);

  const handleViewDetails = () => {
    navigate(`/service/${service.id}`);
  };

  const handleQuickPurchase = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPurchaseModalVisible(true);
  };

  const handlePurchaseComplete = (serviceId: string) => {
    message.success('Service purchased successfully!');
    setPurchaseModalVisible(false);
    // Navigate to service detail or user's purchases
    navigate(`/service/${serviceId}`);
  };

  const getCategoryIcon = (category: ServiceCategory) => {
    const iconMap: Record<ServiceCategory, React.ReactElement> = {
      // Original gaming categories
      [ServiceCategory.SmartICOPlugins]: <RocketOutlined className="text-smartico" />,
      [ServiceCategory.SEONFraudProtection]: <SafetyOutlined className="text-seon" />,
      [ServiceCategory.iGamingServers]: <PlayCircleOutlined className="text-igaming" />,
      [ServiceCategory.GameTournaments]: <TrophyOutlined className="text-tournament" />,
      [ServiceCategory.VirtualPitBoss]: <CrownOutlined className="text-pitboss" />,
      [ServiceCategory.FreeGames]: <GiftOutlined className="text-freegame" />,
      [ServiceCategory.JackpotGames]: <DollarOutlined className="text-jackpot" />,
      [ServiceCategory.RandomPrizes]: <StarFilled className="text-prize" />,
      
      // Operator service categories
      [ServiceCategory.DepositMethods]: <CreditCardOutlined className="text-deposit" />,
      [ServiceCategory.PlayerJourneys]: <UserOutlined className="text-journey" />,
      [ServiceCategory.FraudPlayerProtection]: <SecurityScanOutlined className="text-fraud" />,
      [ServiceCategory.CRM]: <ContactsOutlined className="text-crm" />,
      [ServiceCategory.AICallCentreComms]: <CustomerServiceOutlined className="text-ai-comms" />,
      [ServiceCategory.CustomerManagement]: <UserOutlined className="text-customer" />,
      [ServiceCategory.Reporting]: <BarChartOutlined className="text-reporting" />,
      [ServiceCategory.Fraud]: <AuditOutlined className="text-fraud" />,
      [ServiceCategory.ComplianceAggregators]: <CheckCircleOutlined className="text-compliance" />,
      [ServiceCategory.NationalRegulator]: <BankOutlined className="text-regulator" />,
      [ServiceCategory.Loyalty]: <HeartOutlined className="text-loyalty" />,
      [ServiceCategory.CryptoBlockchain]: <BlockOutlined className="text-crypto" />,
      [ServiceCategory.Risk]: <SecurityScanOutlined className="text-risk" />,
      [ServiceCategory.GameAggregator]: <AppstoreOutlined className="text-aggregator" />
    };
    return iconMap[category] || <PlayCircleOutlined />;
  };

  const getServiceSpecificIcon = (service: MarketplaceService) => {
    // Use consistent category-based icons for main tile display
    return getCategoryIcon(service.category);
  };

  const getCategoryIconForTag = (category: ServiceCategory) => {
    // Use consistent category-based icons for tags with white color
    const iconMap: Record<ServiceCategory, React.ReactElement> = {
      // Original gaming categories
      [ServiceCategory.SmartICOPlugins]: <RocketOutlined className="text-white" />,
      [ServiceCategory.SEONFraudProtection]: <SafetyOutlined className="text-white" />,
      [ServiceCategory.iGamingServers]: <PlayCircleOutlined className="text-white" />,
      [ServiceCategory.GameTournaments]: <TrophyOutlined className="text-white" />,
      [ServiceCategory.VirtualPitBoss]: <CrownOutlined className="text-white" />,
      [ServiceCategory.FreeGames]: <GiftOutlined className="text-white" />,
      [ServiceCategory.JackpotGames]: <DollarOutlined className="text-white" />,
      [ServiceCategory.RandomPrizes]: <StarFilled className="text-white" />,
      
      // Operator service categories - consistent per category
      [ServiceCategory.DepositMethods]: <CreditCardOutlined className="text-white" />,
      [ServiceCategory.PlayerJourneys]: <UserOutlined className="text-white" />,
      [ServiceCategory.FraudPlayerProtection]: <SecurityScanOutlined className="text-white" />,
      [ServiceCategory.CRM]: <ContactsOutlined className="text-white" />,
      [ServiceCategory.AICallCentreComms]: <CustomerServiceOutlined className="text-white" />,
      [ServiceCategory.CustomerManagement]: <UserOutlined className="text-white" />,
      [ServiceCategory.Reporting]: <BarChartOutlined className="text-white" />,
      [ServiceCategory.Fraud]: <AuditOutlined className="text-white" />,
      [ServiceCategory.ComplianceAggregators]: <CheckCircleOutlined className="text-white" />,
      [ServiceCategory.NationalRegulator]: <BankOutlined className="text-white" />,
      [ServiceCategory.Loyalty]: <HeartOutlined className="text-white" />,
      [ServiceCategory.CryptoBlockchain]: <BlockOutlined className="text-white" />,
      [ServiceCategory.Risk]: <SecurityScanOutlined className="text-white" />,
      [ServiceCategory.GameAggregator]: <AppstoreOutlined className="text-white" />
    };
    return iconMap[category] || <PlayCircleOutlined className="text-white" />;
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

  const isNewService = service.isNew || (service.tags && service.tags.includes('New'));
  const isPopularService = service.isPopular || (service.tags && service.tags.includes('Popular'));

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full"
    >
      <Badge.Ribbon 
        text={isNewService ? "NEW" : isPopularService ? "POPULAR" : undefined}
        color={isNewService ? "red" : isPopularService ? "blue" : undefined}
        style={{ display: (isNewService || isPopularService) ? 'block' : 'none' }}
      >
        <Card
          hoverable
          className="h-full cursor-pointer group transition-all duration-300 hover:shadow-2xl border-0 rounded-2xl overflow-hidden"
          onClick={handleViewDetails}
          cover={
            <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 p-6 flex items-center justify-center">
              <div className="text-6xl text-white opacity-80">
                {getServiceSpecificIcon(service)}
              </div>
              <div className="absolute top-4 right-4">
                <Tag color={getCategoryColor(service.category)} className="mb-2 flex items-center">
                  <span className="mr-1">{getCategoryIconForTag(service.category)}</span>
                  {service.category}
                </Tag>
              </div>
            </div>
          }
        >
          <div className="p-4">
            <div className="mb-3">
              <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {service.name}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {service.description}
              </p>
            </div>

            <div className="flex items-center justify-between mb-4">
              {service.rating && (
                <div className="flex items-center space-x-1">
                  <StarFilled className="text-yellow-500 text-sm" />
                  <span className="text-sm font-semibold">{service.rating}</span>
                  {service.reviews && (
                    <span className="text-xs text-gray-500">({service.reviews})</span>
                  )}
                </div>
              )}
              
              {service.price && (
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">${service.price}</div>
                  {service.originalPrice && service.originalPrice > service.price && (
                    <div className="text-xs text-gray-500 line-through">
                      ${service.originalPrice}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <Tooltip title="View Details">
                <Button 
                  icon={<EyeOutlined />} 
                  className="flex-1 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white transition-all duration-200 h-10 rounded-xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewDetails();
                  }}
                >
                  View
                </Button>
              </Tooltip>
              <Tooltip title="Quick Purchase">
                <Button 
                  type="primary"
                  icon={<ShoppingCartOutlined />} 
                  className="flex-2 bg-brand-blue hover:bg-blue-700 border-0 font-semibold h-10 rounded-xl"
                  onClick={handleQuickPurchase}
                >
                  Get Started
                </Button>
              </Tooltip>
            </div>
          </div>
        </Card>
      </Badge.Ribbon>

      <PurchaseModal
        visible={purchaseModalVisible}
        onCancel={() => setPurchaseModalVisible(false)}
        service={service}
        onPurchaseComplete={handlePurchaseComplete}
      />
    </motion.div>
  );
};

export default MarketplaceTile;
