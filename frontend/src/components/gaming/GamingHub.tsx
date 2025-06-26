import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Row, Col, Statistic, Button, Typography, Progress, Tag, Space, Tabs } from 'antd';
import { 
  TrophyOutlined, 
  DollarOutlined, 
  UserOutlined, 
  FireOutlined,
  GiftOutlined,
  StarOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { RootState, AppDispatch } from '../../store';
import { fetchJackpotGames } from '../../store/slices/gamingFeaturesSlice';
import { fetchTournaments } from '../../store/slices/tournamentSlice';
import { Tournament } from '../../types';
import JackpotDashboard from './JackpotDashboard';
import RandomPrizes from './RandomPrizes';
import VirtualPitBoss from './VirtualPitBoss';
import TournamentRegistrationModal from './TournamentRegistrationModal';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const GamingHub: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { 
    jackpotGames, 
    totalJackpotPool,
    availablePrizes
  } = useSelector((state: RootState) => state.gamingFeatures);
  
  const { tournaments } = useSelector((state: RootState) => state.tournaments);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [tournamentModalVisible, setTournamentModalVisible] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);

  useEffect(() => {
    dispatch(fetchJackpotGames());
    dispatch(fetchTournaments());
  }, [dispatch]);

  const activeJackpots = jackpotGames.filter(game => game.isActive);
  const upcomingTournaments = tournaments.filter((t: Tournament) => t.status === 'upcoming').slice(0, 3);
  const availablePrizesCount = availablePrizes.length;

  const userStats = {
    totalWinnings: 2450.50,
    tournamentsWon: 3,
    jackpotsHit: 1,
    currentStreak: 5
  };

  return (
    <div className="gaming-hub min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Title level={1} className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            🎮 Gaming Hub
          </Title>
          <Text className="text-lg text-gray-600">
            Your ultimate destination for jackpots, tournaments, and prizes!
          </Text>
        </motion.div>

        {/* Quick Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} lg={6}>
              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <Statistic
                  title="Total Jackpot Pool"
                  value={totalJackpotPool}
                  precision={2}
                  valueStyle={{ color: '#f59e0b', fontSize: '24px' }}
                  prefix={<DollarOutlined />}
                  suffix="USD"
                />
                <div className="mt-2">
                  <Tag color="gold">{activeJackpots.length} Active</Tag>
                </div>
              </Card>
            </Col>
            
            <Col xs={24} sm={12} lg={6}>
              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <Statistic
                  title="Active Tournaments"
                  value={upcomingTournaments.length}
                  valueStyle={{ color: '#8b5cf6', fontSize: '24px' }}
                  prefix={<TrophyOutlined />}
                />
                <div className="mt-2">
                  <Tag color="purple">Registration Open</Tag>
                </div>
              </Card>
            </Col>
            
            <Col xs={24} sm={12} lg={6}>
              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <Statistic
                  title="Available Prizes"
                  value={availablePrizesCount}
                  valueStyle={{ color: '#10b981', fontSize: '24px' }}
                  prefix={<GiftOutlined />}
                />
                <div className="mt-2">
                  <Tag color="green">Ready to Claim</Tag>
                </div>
              </Card>
            </Col>
            
            <Col xs={24} sm={12} lg={6}>
              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <Statistic
                  title="Online Players"
                  value={1247}
                  valueStyle={{ color: '#3b82f6', fontSize: '24px' }}
                  prefix={<UserOutlined />}
                />
                <div className="mt-2">
                  <Tag color="blue">Live Now</Tag>
                </div>
              </Card>
            </Col>
          </Row>
        </motion.div>

        {/* User Progress Section */}
        {isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card title="Your Gaming Progress" className="mb-6">
              <Row gutter={[24, 24]}>
                <Col xs={24} md={6}>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      ${userStats.totalWinnings}
                    </div>
                    <Text type="secondary">Total Winnings</Text>
                  </div>
                </Col>
                <Col xs={24} md={6}>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {userStats.tournamentsWon}
                    </div>
                    <Text type="secondary">Tournaments Won</Text>
                  </div>
                </Col>
                <Col xs={24} md={6}>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      {userStats.jackpotsHit}
                    </div>
                    <Text type="secondary">Jackpots Hit</Text>
                  </div>
                </Col>
                <Col xs={24} md={6}>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 flex items-center justify-center">
                      <FireOutlined className="mr-2" />
                      {userStats.currentStreak}
                    </div>
                    <Text type="secondary">Win Streak</Text>
                  </div>
                </Col>
              </Row>
              
              <div className="mt-6">
                <div className="flex justify-between mb-2">
                  <Text strong>Level Progress</Text>
                  <Text>Level 7 - Gaming Master</Text>
                </div>
                <Progress 
                  percent={75} 
                  strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                  }}
                  showInfo={false}
                />
                <Text type="secondary" className="text-xs">
                  1,250 XP until next level
                </Text>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Featured Upcoming Tournament */}
        {upcomingTournaments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card 
              title="🏆 Featured Tournament"
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white"
              headStyle={{ color: 'white', borderBottom: 'none' }}
              bodyStyle={{ color: 'white' }}
            >
              <Row gutter={[24, 24]} align="middle">
                <Col xs={24} md={16}>
                  <Title level={3} className="text-white mb-2">
                    {upcomingTournaments[0].name}
                  </Title>
                  <Space direction="vertical" size="small">
                    <div>
                      <ClockCircleOutlined className="mr-2" />
                      Starts: {new Date(upcomingTournaments[0].startDate).toLocaleDateString()}
                    </div>
                    <div>
                      <DollarOutlined className="mr-2" />
                      Prize Pool: ${upcomingTournaments[0].prizePool.toLocaleString()}
                    </div>
                    <div>
                      <UserOutlined className="mr-2" />
                      {upcomingTournaments[0].currentParticipants}/{upcomingTournaments[0].maxParticipants} Players
                    </div>
                  </Space>
                </Col>
                <Col xs={24} md={8} className="text-center">
                  <div className="mb-4">
                    <div className="text-3xl font-bold">
                      ${upcomingTournaments[0].entryFee}
                    </div>
                    <Text className="text-white opacity-80">Entry Fee</Text>
                  </div>
                  <Button 
                    size="large" 
                    className="bg-white text-purple-600 hover:bg-gray-100 border-0 font-bold"
                    onClick={() => {
                      setSelectedTournament(upcomingTournaments[0]);
                      setTournamentModalVisible(true);
                    }}
                  >
                    Register Now
                  </Button>
                </Col>
              </Row>
            </Card>
          </motion.div>
        )}

        {/* Gaming Features Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <Tabs defaultActiveKey="jackpots" size="large">
              <TabPane 
                tab={
                  <span>
                    <DollarOutlined />
                    Jackpots
                  </span>
                } 
                key="jackpots"
              >
                <JackpotDashboard />
              </TabPane>
              
              <TabPane 
                tab={
                  <span>
                    <TrophyOutlined />
                    Tournaments
                  </span>
                } 
                key="tournaments"
              >
                <div className="space-y-4">
                  {upcomingTournaments.map(tournament => (
                    <Card key={tournament.id} className="hover:shadow-md transition-shadow">
                      <Row gutter={[16, 16]} align="middle">
                        <Col xs={24} md={16}>
                          <Title level={4} className="mb-2">{tournament.name}</Title>
                          <Space wrap>
                            <Tag color="blue">{tournament.gameType}</Tag>
                            <Tag color="green">${tournament.prizePool}</Tag>
                            <Tag color="orange">
                              {tournament.currentParticipants}/{tournament.maxParticipants}
                            </Tag>
                          </Space>
                        </Col>
                        <Col xs={24} md={8} className="text-right">
                          <Button 
                            type="primary"
                            onClick={() => {
                              setSelectedTournament(tournament);
                              setTournamentModalVisible(true);
                            }}
                          >
                            Join Tournament
                          </Button>
                        </Col>
                      </Row>
                    </Card>
                  ))}
                </div>
              </TabPane>
              
              <TabPane 
                tab={
                  <span>
                    <GiftOutlined />
                    Random Prizes
                  </span>
                } 
                key="prizes"
              >
                <RandomPrizes />
              </TabPane>
              
              <TabPane 
                tab={
                  <span>
                    <StarOutlined />
                    Pit Boss
                  </span>
                } 
                key="pitboss"
              >
                <VirtualPitBoss />
              </TabPane>
            </Tabs>
          </Card>
        </motion.div>

        {/* Tournament Registration Modal */}
        <TournamentRegistrationModal
          visible={tournamentModalVisible}
          onCancel={() => setTournamentModalVisible(false)}
          tournament={selectedTournament}
          onRegistrationComplete={(tournamentId) => {
            console.log('Registered for tournament:', tournamentId);
            setTournamentModalVisible(false);
          }}
        />
      </div>
    </div>
  );
};

export default GamingHub;
