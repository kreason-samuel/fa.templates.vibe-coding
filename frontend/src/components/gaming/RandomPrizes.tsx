import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Typography, Tag, Row, Col, Modal, message, Badge, Empty } from 'antd';
import { GiftOutlined, TrophyOutlined, DollarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { RootState, AppDispatch } from '../../store';
import { fetchRandomPrizes, claimRandomPrize } from '../../store/slices/gamingFeaturesSlice';

const { Title, Text } = Typography;

const RandomPrizes: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { 
    availablePrizes, 
    claimedPrizes, 
    dailyPrizesRemaining, 
    isLoading 
  } = useSelector((state: RootState) => state.gamingFeatures);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  const [selectedPrize, setSelectedPrize] = useState<string | null>(null);
  const [claimModalOpen, setClaimModalOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchRandomPrizes('current-user'));
    }
  }, [dispatch, isAuthenticated]);

  const handleClaimPrize = async (prizeId: string) => {
    try {
      await dispatch(claimRandomPrize(prizeId)).unwrap();
      message.success('Prize claimed successfully! 🎉');
      setClaimModalOpen(false);
      setSelectedPrize(null);
    } catch (error) {
      message.error('Failed to claim prize');
    }
  };

  const getPrizeIcon = (prizeType: string) => {
    switch (prizeType) {
      case 'cash': return '💰';
      case 'bonus': return '🎁';
      case 'freespins': return '🎰';
      case 'item': return '🏆';
      default: return '🎲';
    }
  };

  const getPrizeColor = (prizeType: string) => {
    switch (prizeType) {
      case 'cash': return 'green';
      case 'bonus': return 'blue';
      case 'freespins': return 'purple';
      case 'item': return 'gold';
      default: return 'default';
    }
  };

  const formatExpiryTime = (expiresAt: string) => {
    const expiry = new Date(expiresAt);
    const now = new Date();
    const diff = expiry.getTime() - now.getTime();
    
    if (diff < 0) return 'Expired';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="text-center">
          <GiftOutlined className="text-6xl text-blue-500 mb-4" />
          <Title level={3}>Random Prizes</Title>
          <Text>Please log in to view and claim your random prizes!</Text>
        </Card>
      </div>
    );
  }

  return (
    <div className="random-prizes p-6 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <GiftOutlined className="text-6xl text-pink-500 mb-4" />
            <Title level={1} className="mb-2">🎁 Random Prizes</Title>
            <Text className="text-lg text-gray-600 dark:text-gray-300">
              Surprise rewards and daily prizes waiting for you!
            </Text>
          </motion.div>
        </div>

        {/* Daily Prize Counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="text-center bg-gradient-to-r from-pink-400 to-purple-500 border-0">
            <div className="text-white">
              <Title level={3} className="text-white mb-2">
                Daily Prizes Remaining
              </Title>
              <div className="text-4xl font-bold mb-2">
                {dailyPrizesRemaining} / 3
              </div>
              <Text className="text-white/90">
                New prizes available every 24 hours! 🎯
              </Text>
            </div>
          </Card>
        </motion.div>

        {/* Available Prizes */}
        <div className="mb-8">
          <Title level={2} className="mb-4">
            <TrophyOutlined className="mr-2" />
            Available Prizes
          </Title>
          
          {availablePrizes.length === 0 ? (
            <Card>
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No prizes available right now. Check back later!"
              />
            </Card>
          ) : (
            <Row gutter={[24, 24]}>
              {availablePrizes.map((prize, index) => (
                <Col key={prize.id} xs={24} md={12} lg={8}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Badge.Ribbon text="Available" color="red">
                      <Card
                        hoverable
                        className="h-full relative overflow-hidden"
                        actions={[
                          <Button
                            key="claim"
                            type="primary"
                            size="large"
                            icon={<GiftOutlined />}
                            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 border-0"
                            onClick={() => {
                              setSelectedPrize(prize.id);
                              setClaimModalOpen(true);
                            }}
                            disabled={isLoading}
                          >
                            Claim Prize
                          </Button>
                        ]}
                      >
                        <div className="text-center space-y-4">
                          <div className="text-6xl mb-2">
                            {getPrizeIcon(prize.prizeType)}
                          </div>
                          
                          <div>
                            <Title level={4} className="mb-2">
                              {prize.description}
                            </Title>
                            <Tag color={getPrizeColor(prize.prizeType)} className="mb-2">
                              {prize.prizeType.toUpperCase()}
                            </Tag>
                          </div>

                          {prize.prizeType === 'cash' && (
                            <div className="text-2xl font-bold text-green-600">
                              ${prize.prizeValue}
                            </div>
                          )}

                          {prize.prizeType === 'freespins' && (
                            <div className="text-2xl font-bold text-purple-600">
                              {prize.prizeValue} Spins
                            </div>
                          )}

                          <div className="flex items-center justify-center text-orange-600">
                            <ClockCircleOutlined className="mr-1" />
                            <Text className="text-orange-600">
                              Expires in {formatExpiryTime(prize.expiresAt)}
                            </Text>
                          </div>
                        </div>
                      </Card>
                    </Badge.Ribbon>
                  </motion.div>
                </Col>
              ))}
            </Row>
          )}
        </div>

        {/* Claimed Prizes History */}
        {claimedPrizes.length > 0 && (
          <div>
            <Title level={2} className="mb-4">
              <DollarOutlined className="mr-2" />
              Recently Claimed
            </Title>
            
            <Row gutter={[16, 16]}>
              {claimedPrizes.slice(0, 6).map((prize, index) => (
                <Col key={prize.id} xs={24} md={12} lg={8}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card size="small" className="opacity-75">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">
                          {getPrizeIcon(prize.prizeType)}
                        </div>
                        <div className="flex-1">
                          <Text strong className="block">{prize.description}</Text>
                          <Text type="secondary" className="text-xs">
                            Claimed {new Date(prize.claimedAt!).toLocaleDateString()}
                          </Text>
                        </div>
                        <Tag color="green">Claimed</Tag>
                      </div>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </div>
        )}

        {/* Claim Confirmation Modal */}
        <Modal
          title="Claim Your Prize!"
          open={claimModalOpen}
          onCancel={() => setClaimModalOpen(false)}
          footer={null}
          centered
        >
          {selectedPrize && (
            <div className="space-y-4">
              {(() => {
                const prize = availablePrizes.find(p => p.id === selectedPrize);
                if (!prize) return null;
                
                return (
                  <>
                    <div className="text-center">
                      <div className="text-6xl mb-4">
                        {getPrizeIcon(prize.prizeType)}
                      </div>
                      <Title level={3}>{prize.description}</Title>
                      <Tag color={getPrizeColor(prize.prizeType)} className="mb-4">
                        {prize.prizeType.toUpperCase()}
                      </Tag>
                    </div>
                    
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                      <Text className="text-sm">
                        🎉 <strong>Congratulations!</strong><br />
                        You're about to claim this amazing prize. Once claimed, it will be added to your account immediately.
                      </Text>
                    </div>

                    {prize.prizeType === 'cash' && (
                      <div className="text-center">
                        <Text className="text-2xl font-bold text-green-600">
                          ${prize.prizeValue} Cash Bonus
                        </Text>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button 
                        onClick={() => {
                          setClaimModalOpen(false);
                          setSelectedPrize(null);
                        }}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="primary"
                        className="flex-1 bg-pink-600 border-pink-600"
                        onClick={() => handleClaimPrize(prize.id)}
                        loading={isLoading}
                      >
                        🎁 Claim Now!
                      </Button>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default RandomPrizes;
