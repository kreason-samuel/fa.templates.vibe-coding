import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Typography, Tag, Row, Col, Statistic, Progress, Modal, message } from 'antd';
import { TrophyOutlined, DollarOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { RootState, AppDispatch } from '../../store';
import { fetchJackpotGames, enterJackpotGame, updateJackpotAmount } from '../../store/slices/gamingFeaturesSlice';

const { Title, Text } = Typography;

const JackpotDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { jackpotGames, totalJackpotPool, isLoading } = useSelector((state: RootState) => state.gamingFeatures);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [entryModalOpen, setEntryModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchJackpotGames());
  }, [dispatch]);

  useEffect(() => {
    // Simulate real-time jackpot updates
    const interval = setInterval(() => {
      jackpotGames.forEach(game => {
        if (game.isActive) {
          const increment = Math.random() * 100 + 10; // Random increment between $10-$110
          dispatch(updateJackpotAmount({ 
            gameId: game.id, 
            newAmount: game.currentJackpot + increment 
          }));
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [jackpotGames, dispatch]);

  const handleEnterJackpot = async (gameId: string, entryFee: number) => {
    if (!isAuthenticated) {
      message.warning('Please log in to enter jackpot games');
      return;
    }

    try {
      await dispatch(enterJackpotGame({ gameId, entryFee })).unwrap();
      message.success('Successfully entered the jackpot game!');
      setEntryModalOpen(false);
    } catch (error) {
      message.error('Failed to enter jackpot game');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'mega': return '#ff4d4f';
      case 'major': return '#fa8c16';
      case 'minor': return '#52c41a';
      default: return '#1890ff';
    }
  };

  const getCategoryProgress = (current: number, base: number) => {
    return Math.min(((current - base) / base) * 100, 100);
  };

  return (
    <div className="jackpot-dashboard p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <TrophyOutlined className="text-6xl text-yellow-500 mb-4" />
            <Title level={1} className="mb-2">🎰 Jackpot Central</Title>
            <Text className="text-lg text-gray-600 dark:text-gray-300">
              Join millions of players competing for massive progressive jackpots
            </Text>
          </motion.div>
        </div>

        {/* Total Pool Statistics */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="text-center bg-gradient-to-r from-yellow-400 to-orange-500 border-0">
            <Statistic
              title={<span className="text-white text-lg">Total Jackpot Pool</span>}
              value={totalJackpotPool}
              formatter={(value) => (
                <span className="text-white font-bold text-4xl">
                  {formatCurrency(Number(value))}
                </span>
              )}
              prefix={<DollarOutlined className="text-white" />}
            />
            <Text className="text-white/90 text-sm block mt-2">
              🔥 Growing every second with new entries!
            </Text>
          </Card>
        </motion.div>

        {/* Jackpot Games Grid */}
        <Row gutter={[24, 24]}>
          {jackpotGames.map((game, index) => (
            <Col key={game.id} xs={24} md={12} lg={8}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  hoverable
                  className="h-full relative overflow-hidden"
                  bodyStyle={{ padding: '24px' }}
                >
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <Tag 
                      color={getCategoryColor(game.category)}
                      className="font-bold uppercase"
                    >
                      {game.category} Jackpot
                    </Tag>
                  </div>

                  {/* Game Content */}
                  <div className="space-y-4">
                    <div>
                      <Title level={4} className="mb-2">{game.name}</Title>
                      <div className="text-center py-4">
                        <div className="text-3xl font-bold text-green-600 mb-2">
                          {formatCurrency(game.currentJackpot)}
                        </div>
                        <Progress
                          percent={getCategoryProgress(game.currentJackpot, game.basePrize)}
                          strokeColor={{
                            '0%': getCategoryColor(game.category),
                            '100%': '#ffd700',
                          }}
                          showInfo={false}
                          className="mb-2"
                        />
                        <Text type="secondary" className="text-xs">
                          Base Prize: {formatCurrency(game.basePrize)}
                        </Text>
                      </div>
                    </div>

                    {/* Game Stats */}
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <UserOutlined className="mr-1" />
                        <span>{game.participants.toLocaleString()} players</span>
                      </div>
                      {game.lastWinDate && (
                        <div className="flex items-center text-green-600">
                          <ClockCircleOutlined className="mr-1" />
                          <span>Recent win!</span>
                        </div>
                      )}
                    </div>

                    {/* Last Winner Info */}
                    {game.lastWinner && (
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                        <Text className="text-xs text-green-700 dark:text-green-300 block">
                          🎉 Last Winner: {game.lastWinner}
                        </Text>
                        <Text className="text-xs font-bold text-green-800 dark:text-green-200">
                          Won {formatCurrency(game.lastWinAmount || 0)}
                        </Text>
                      </div>
                    )}

                    {/* Entry Button */}
                    <Button
                      type="primary"
                      size="large"
                      block
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 border-0 font-bold"
                      onClick={() => {
                        setSelectedGame(game.id);
                        setEntryModalOpen(true);
                      }}
                      disabled={!game.isActive}
                    >
                      🎲 Enter Jackpot - $10
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Entry Confirmation Modal */}
        <Modal
          title="Enter Jackpot Game"
          open={entryModalOpen}
          onCancel={() => setEntryModalOpen(false)}
          footer={null}
          centered
        >
          {selectedGame && (
            <div className="space-y-4">
              {(() => {
                const game = jackpotGames.find(g => g.id === selectedGame);
                if (!game) return null;
                
                return (
                  <>
                    <div className="text-center">
                      <Title level={4}>{game.name}</Title>
                      <div className="text-2xl font-bold text-green-600 mb-2">
                        Current Jackpot: {formatCurrency(game.currentJackpot)}
                      </div>
                      <Text type="secondary">
                        Entry Fee: $10 | Players: {game.participants.toLocaleString()}
                      </Text>
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <Text className="text-sm">
                        🎯 <strong>How it works:</strong><br />
                        • Entry fee contributes to the jackpot pool<br />
                        • Winner is drawn randomly among participants<br />
                        • Higher participation = bigger jackpot!
                      </Text>
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        onClick={() => setEntryModalOpen(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="primary"
                        className="flex-1 bg-green-600 border-green-600"
                        onClick={() => handleEnterJackpot(game.id, 10)}
                        loading={isLoading}
                      >
                        Confirm Entry - $10
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

export default JackpotDashboard;
