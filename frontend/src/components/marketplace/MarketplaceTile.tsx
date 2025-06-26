import React from "react";
import { Card, Button, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { 
  ShoppingCartOutlined, 
  EyeOutlined, 
  StarFilled,
  RocketOutlined
} from "@ant-design/icons";
import { MarketplaceService } from "../../types";
import { motion } from "framer-motion";

interface MarketplaceTileProps {
  service: MarketplaceService;
}

const MarketplaceTile: React.FC<MarketplaceTileProps> = ({ service }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/service/${service.id}`);
  };

  const handleQuickPurchase = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/service/${service.id}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full"
    >
      <Card
        hoverable
        className="h-full cursor-pointer group transition-all duration-300 hover:shadow-2xl border-0 rounded-2xl overflow-hidden"
        onClick={handleViewDetails}
        cover={
          <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 p-6 flex items-center justify-center">
            <div className="text-6xl text-white opacity-80">
              <RocketOutlined />
            </div>
            <div className="absolute top-4 right-4">
              <Tag color="blue" className="font-semibold">
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
              </div>
            )}
          </div>

          <div className="flex space-x-2">
            <Button 
              icon={<EyeOutlined />} 
              className="flex-1 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-200 h-10 rounded-xl"
              onClick={(e) => {
                e.stopPropagation();
                handleViewDetails();
              }}
            >
              View
            </Button>
            <Button 
              type="primary"
              icon={<ShoppingCartOutlined />} 
              className="flex-2 bg-blue-600 hover:bg-blue-700 border-0 font-semibold h-10 rounded-xl"
              onClick={handleQuickPurchase}
            >
              Get Started
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default MarketplaceTile;
