import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card, Button, Typography, Tabs, Rate, Avatar, Divider, Tag, Row, Col, Space, message } from 'antd';
import { 
  ArrowLeftOutlined, 
  ShoppingCartOutlined, 
  HeartOutlined, 
  ShareAltOutlined,
  StarFilled,
  UserOutlined,
  PlayCircleOutlined
} from '@ant-design/icons';
import { RootState } from '../../store';
import PurchaseModal from '../ui/PurchaseModal';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

// Mock service data for demonstration
const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { services } = useSelector((state: RootState) => state.marketplace);
  const [purchaseModalVisible, setPurchaseModalVisible] = useState(false);
  
  // Find service by ID from Redux store
  const service = services.find(s => s.id === id);
  
  // If service not found, show error
  if (!service) {
    return (
      <div className="service-detail-page min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-6xl mx-auto text-center">
          <Title level={2}>Service Not Found</Title>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate('/')}
            type="primary"
          >
            Back to Marketplace
          </Button>
        </div>
      </div>
    );
  }
  
  const handlePurchase = () => {
    setPurchaseModalVisible(true);
  };

  const handlePurchaseComplete = () => {
    message.success('Service purchased successfully!');
    setPurchaseModalVisible(false);
  };

  const handleAddToWishlist = () => {
    // Handle wishlist logic
    console.log('Added to wishlist:', service.id);
  };

  const handleShare = () => {
    // Handle share logic
    navigator.share?.({
      title: service.name,
      text: service.description,
      url: window.location.href
    });
  };

  return (
    <div className="service-detail-page min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Back button */}
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate(-1)}
          className="mb-6"
          size="large"
        >
          Back to Marketplace
        </Button>

        <Row gutter={[24, 24]}>
          {/* Main Content */}
          <Col xs={24} lg={16}>
            <Card className="mb-6">
              <div className="aspect-video bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mb-6 flex items-center justify-center">
                <PlayCircleOutlined className="text-6xl text-white" />
              </div>
              
              <Title level={1} className="mb-2">{service.name}</Title>
              
              <Space className="mb-4">
                <Rate disabled value={service.rating || 4.5} allowHalf />
                <Text strong>{service.rating || 4.5}</Text>
                <Text type="secondary">({service.purchaseCount || 0} purchases)</Text>
              </Space>

              <div className="mb-4">
                <Tag color="blue">{service.category}</Tag>
                {service.isPopular && <Tag color="red">Popular</Tag>}
                {service.isNew && <Tag color="green">New</Tag>}
              </div>

              <Paragraph className="text-lg">
                {service.description}
              </Paragraph>
            </Card>

            {/* Features and Details Tabs */}
            <Card>
              <Tabs defaultActiveKey="features">
                <TabPane tab="Features" key="features">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.features?.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <StarFilled className="text-yellow-500" />
                        <Text>{feature}</Text>
                      </div>
                    ))}
                  </div>
                </TabPane>
                <TabPane tab="Provider" key="provider">
                  <div className="flex items-center space-x-4">
                    <Avatar size="large" icon={<UserOutlined />} />
                    <div>
                      <Text strong>{service.provider || 'Gaming Service Provider'}</Text>
                      <div>
                        <Text type="secondary">Verified Provider</Text>
                      </div>
                    </div>
                  </div>
                </TabPane>
                <TabPane tab="Reviews" key="reviews">
                  <div className="space-y-4">
                    {/* Sample reviews */}
                    <div className="border-b pb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Avatar icon={<UserOutlined />} />
                        <div>
                          <Text strong>Gaming Pro</Text>
                          <div>
                            <Rate disabled value={5} />
                          </div>
                        </div>
                      </div>
                      <Paragraph>
                        Excellent service! Easy to integrate and great support.
                      </Paragraph>
                    </div>
                  </div>
                </TabPane>
              </Tabs>
            </Card>
          </Col>

          {/* Sidebar */}
          <Col xs={24} lg={8}>
            <Card className="sticky top-6">
              <div className="text-center mb-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Avatar icon={<UserOutlined />} size="large" />
                  <div>
                    <Text strong>{service.provider || 'Gaming Provider'}</Text>
                  </div>
                </div>
                
                <Title level={2} className="text-blue-600 mb-4">
                  ${service.price || 0}
                  {service.originalPrice && service.originalPrice > (service.price || 0) && (
                    <Text type="secondary" className="ml-2 line-through text-sm">
                      ${service.originalPrice}
                    </Text>
                  )}
                </Title>
              </div>

              <Space direction="vertical" className="w-full" size="middle">
                <Button 
                  type="primary" 
                  size="large" 
                  block
                  icon={<ShoppingCartOutlined />}
                  onClick={handlePurchase}
                >
                  Purchase Now
                </Button>
                
                <Button 
                  size="large" 
                  block
                  icon={<HeartOutlined />}
                  onClick={handleAddToWishlist}
                >
                  Add to Wishlist
                </Button>
                
                <Button 
                  size="large" 
                  block
                  icon={<ShareAltOutlined />}
                  onClick={handleShare}
                >
                  Share
                </Button>
              </Space>

              <Divider />

              <div className="space-y-2">
                <Text strong>Learn More</Text>
                <br />
                <Button type="link" onClick={() => window.open('#', '_blank')}>
                  Try Demo
                </Button>
                <br />
                <Text strong>Documentation</Text>
                <br />
                <Button type="link" onClick={() => window.open('#', '_blank')}>
                  View Docs
                </Button>
              </div>
            </Card>
          </Col>
        </Row>

        <PurchaseModal
          visible={purchaseModalVisible}
          onCancel={() => setPurchaseModalVisible(false)}
          service={service}
          onPurchaseComplete={handlePurchaseComplete}
        />
      </div>
    </div>
  );
};

export default ServiceDetailPage;
