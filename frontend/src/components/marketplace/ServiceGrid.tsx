import React from 'react';
import { Row, Col, Empty } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import MarketplaceTile from './MarketplaceTile';
import { motion } from 'framer-motion';

const ServiceGrid: React.FC = () => {
  const { services } = useSelector((state: RootState) => state.marketplace);
  
  // Debug log to check services count
  console.log('ServiceGrid services count:', services.length);

  return (
    <div className="w-full">
      {/* Services Count Header */}
      <div className="mb-6 text-center">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          {services.length} Services Available
        </h3>
      </div>
      
      {/* Services Grid - All operator services displayed as tiles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {services.length === 0 ? (
          <Empty
            description="No services found"
            className="my-12"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ) : (
          <Row gutter={[24, 24]}>
            {services.map((service, index) => (
              <Col
                key={service.id}
                xs={24}
                sm={12}
                lg={8}
                xl={6}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  className="h-full"
                >
                  <MarketplaceTile service={service} />
                </motion.div>
              </Col>
            ))}
          </Row>
        )}
      </motion.div>
    </div>
  );
};

export default ServiceGrid;
