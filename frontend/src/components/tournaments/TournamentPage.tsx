import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Card, 
  Button, 
  Typography, 
  Tag, 
  Row, 
  Col, 
  Table,
  Avatar,
  Progress,
  Modal,
  Form,
  Select,
  message,
  Statistic
} from 'antd';
import { 
  TrophyOutlined, 
  UserOutlined, 
  FireOutlined,
  ClockCircleOutlined,
  StarOutlined,
  PlayCircleOutlined,
  UsergroupAddOutlined,
  GiftOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { RootState } from '../../store';
import { setAuthModalOpen, setAuthModalMode } from '../../store/slices/uiSlice';
import { Tournament, TournamentStatus } from '../../types';

const { Title, Text, Paragraph } = Typography;
const { Countdown } = Statistic;

interface TournamentPageProps {}

const TournamentPage: React.FC<TournamentPageProps> = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [joinForm] = Form.useForm();

  // Mock tournaments data
  const mockTournaments: Tournament[] = [
    {
      id: '1',
      name: 'Weekly Jackpot Championship',
      gameType: 'Jackpot Slots',
      startDate: '2025-01-02T18:00:00Z',
      endDate: '2025-01-02T22:00:00Z',
      maxParticipants: 100,
      currentParticipants: 67,
      prizePool: 5000,
      entryFee: 25,
      status: TournamentStatus.Registration,
      description: 'Weekly high-stakes tournament with massive jackpot prizes',
      rules: ['Must be 18+ to participate', 'Maximum 3 entries per player', 'Winner takes 60% of prize pool'],
      organizerId: 'org-1',
      createdAt: '2024-12-20T00:00:00Z',
      updatedAt: '2024-12-25T00:00:00Z',
    },
    {
      id: '2', 
      name: 'Poker Masters Series',
      gameType: 'Texas Hold\'em',
      startDate: '2025-01-05T20:00:00Z',
      endDate: '2025-01-07T23:59:59Z',
      maxParticipants: 50,
      currentParticipants: 38,
      prizePool: 10000,
      entryFee: 100,
      status: TournamentStatus.Registration,
      description: 'Elite poker tournament for skilled players',
      rules: ['Tournament format: No Limit Hold\'em', 'Starting chips: 10,000', 'Blinds increase every 15 minutes'],
      organizerId: 'org-2',
      createdAt: '2024-12-15T00:00:00Z',
      updatedAt: '2024-12-26T00:00:00Z',
    },
    {
      id: '3',
      name: 'Speed Roulette Challenge', 
      gameType: 'Roulette',
      startDate: '2024-12-30T16:00:00Z',
      endDate: '2024-12-30T20:00:00Z',
      maxParticipants: 200,
      currentParticipants: 200,
      prizePool: 3000,
      entryFee: 10,
      status: TournamentStatus.Active,
      description: 'Fast-paced roulette tournament with quick rounds',
      rules: ['Each round lasts 2 minutes', 'Top 10 players advance', 'Final table winner takes all'],
      organizerId: 'org-3',
      createdAt: '2024-12-25T00:00:00Z',
      updatedAt: '2024-12-30T00:00:00Z',
    }
  ];

  const handleJoinTournament = (tournament: Tournament) => {
    if (!isAuthenticated) {
      dispatch(setAuthModalMode('login'));
      dispatch(setAuthModalOpen(true));
      return;
    }
    setSelectedTournament(tournament);
    setIsJoinModalOpen(true);
  };

  const handleJoinSubmit = async (_values: any) => {
    if (!selectedTournament) return;
    
    try {
      // Simulate join process
      await new Promise(resolve => setTimeout(resolve, 1500));
      message.success(`Successfully joined ${selectedTournament.name}!`);
      setIsJoinModalOpen(false);
      joinForm.resetFields();
      setSelectedTournament(null);
    } catch (error) {
      message.error('Failed to join tournament. Please try again.');
    }
  };

  const getStatusColor = (status: TournamentStatus) => {
    switch (status) {
      case TournamentStatus.Registration:
        return 'green';
      case TournamentStatus.Active:
        return 'blue';
      case TournamentStatus.Completed:
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: TournamentStatus) => {
    switch (status) {
      case TournamentStatus.Registration:
        return <UsergroupAddOutlined />;
      case TournamentStatus.Active:
        return <PlayCircleOutlined />;
      case TournamentStatus.Completed:
        return <TrophyOutlined />;
      default:
        return <ClockCircleOutlined />;
    }
  };

  // Mock leaderboard data
  const mockLeaderboard = [
    { rank: 1, player: 'ProGamer2024', score: 15420, prize: '$3000' },
    { rank: 2, player: 'LuckySpins', score: 14890, prize: '$1500' },
    { rank: 3, player: 'ChipMaster', score: 14230, prize: '$750' },
    { rank: 4, player: 'RoulettePro', score: 13980, prize: '$400' },
    { rank: 5, player: 'JackpotHunter', score: 13750, prize: '$200' },
  ];

  const leaderboardColumns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      render: (rank: number) => (
        <div className="flex items-center">
          {rank <= 3 && <TrophyOutlined className={`mr-2 ${rank === 1 ? 'text-yellow-500' : rank === 2 ? 'text-gray-400' : 'text-orange-400'}`} />}
          <Text strong>#{rank}</Text>
        </div>
      ),
    },
    {
      title: 'Player',
      dataIndex: 'player',
      key: 'player',
      render: (player: string) => (
        <div className="flex items-center">
          <Avatar icon={<UserOutlined />} className="mr-2" />
          <Text>{player}</Text>
        </div>
      ),
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
      render: (score: number) => <Text strong>{score.toLocaleString()}</Text>,
    },
    {
      title: 'Prize',
      dataIndex: 'prize',
      key: 'prize',
      render: (prize: string) => <Text type="success" strong>{prize}</Text>,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Title level={1} className="text-center mb-2">
            <TrophyOutlined className="mr-3 text-yellow-500" />
            Gaming Tournaments
          </Title>
          <Paragraph className="text-center text-lg text-gray-600 dark:text-gray-300">
            Compete against players worldwide and win amazing prizes
          </Paragraph>
        </div>

        {/* Active Tournaments */}
        <div className="mb-8">
          <Title level={2} className="mb-6">
            <FireOutlined className="mr-2 text-red-500" />
            Featured Tournaments
          </Title>
          
          <Row gutter={[24, 24]}>
            {mockTournaments.map((tournament) => (
              <Col xs={24} md={12} lg={8} key={tournament.id}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    className="h-full"
                    cover={
                      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 h-32 flex items-center justify-center">
                        <TrophyOutlined className="text-4xl text-white" />
                        <div className="absolute top-4 right-4">
                          <Tag 
                            icon={getStatusIcon(tournament.status)}
                            color={getStatusColor(tournament.status)}
                          >
                            {tournament.status}
                          </Tag>
                        </div>
                      </div>
                    }
                    actions={[
                      <Button 
                        type="primary" 
                        icon={<UsergroupAddOutlined />}
                        onClick={() => handleJoinTournament(tournament)}
                        disabled={tournament.status === TournamentStatus.Completed}
                        className="w-full mx-4"
                      >
                        {tournament.status === TournamentStatus.Registration ? 'Join Now' : 
                         tournament.status === TournamentStatus.Active ? 'In Progress' : 'Completed'}
                      </Button>
                    ]}
                  >
                    <Card.Meta
                      title={
                        <div>
                          <Title level={4} className="mb-1">{tournament.name}</Title>
                          <Text type="secondary">{tournament.gameType}</Text>
                        </div>
                      }
                      description={
                        <div className="space-y-3">
                          <Paragraph className="text-sm" ellipsis={{ rows: 2 }}>
                            {tournament.description}
                          </Paragraph>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <Text type="secondary" className="block">Prize Pool</Text>
                              <Text strong className="text-green-600">${tournament.prizePool.toLocaleString()}</Text>
                            </div>
                            <div>
                              <Text type="secondary" className="block">Entry Fee</Text>
                              <Text strong>${tournament.entryFee}</Text>
                            </div>
                            <div>
                              <Text type="secondary" className="block">Participants</Text>
                              <Text strong>{tournament.currentParticipants}/{tournament.maxParticipants}</Text>
                            </div>
                            <div>
                              <Text type="secondary" className="block">Starts</Text>
                              <Text strong>{new Date(tournament.startDate).toLocaleDateString()}</Text>
                            </div>
                          </div>
                          
                          <Progress 
                            percent={(tournament.currentParticipants / tournament.maxParticipants) * 100} 
                            size="small"
                            showInfo={false}
                          />
                          
                          {tournament.status === TournamentStatus.Registration && (
                            <div className="mt-3">
                              <Text type="secondary" className="text-xs">Registration ends in:</Text>
                              <br />
                              <Countdown 
                                value={new Date(tournament.startDate).getTime()} 
                                format="D[d] H[h] m[m] s[s]"
                                className="text-sm"
                              />
                            </div>
                          )}
                        </div>
                      }
                    />
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Leaderboard Section */}
        <div className="mb-8">
          <Card title={
            <div className="flex items-center">
              <StarOutlined className="mr-2 text-yellow-500" />
              <span>Live Leaderboard - Speed Roulette Challenge</span>
            </div>
          }>
            <Table 
              columns={leaderboardColumns}
              dataSource={mockLeaderboard}
              pagination={false}
              size="middle"
              rowKey="rank"
            />
          </Card>
        </div>

        {/* Tournament History */}
        <div>
          <Title level={2} className="mb-6">
            <ClockCircleOutlined className="mr-2" />
            Recent Results
          </Title>
          
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Card className="text-center">
                <Avatar size={64} icon={<TrophyOutlined />} className="bg-yellow-500 mb-3" />
                <Title level={4}>Weekly Champion</Title>
                <Text>ProGamer2024</Text>
                <br />
                <Text type="secondary">Prize: $3,000</Text>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="text-center">
                <Avatar size={64} icon={<GiftOutlined />} className="bg-purple-500 mb-3" />
                <Title level={4}>Total Prizes Won</Title>
                <Title level={2} className="text-green-600 mb-0">$45,720</Title>
                <Text type="secondary">This month</Text>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="text-center">
                <Avatar size={64} icon={<UserOutlined />} className="bg-blue-500 mb-3" />
                <Title level={4}>Active Players</Title>
                <Title level={2} className="text-blue-600 mb-0">1,247</Title>
                <Text type="secondary">Currently competing</Text>
              </Card>
            </Col>
          </Row>
        </div>
      </div>

      {/* Join Tournament Modal */}
      <Modal
        title={`Join ${selectedTournament?.name}`}
        open={isJoinModalOpen}
        onCancel={() => setIsJoinModalOpen(false)}
        footer={null}
        width={600}
      >
        {selectedTournament && (
          <Form
            form={joinForm}
            layout="vertical"
            onFinish={handleJoinSubmit}
            className="mt-4"
          >
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
              <Row gutter={[16, 8]}>
                <Col span={12}>
                  <Text type="secondary">Entry Fee:</Text>
                  <br />
                  <Text strong className="text-lg">${selectedTournament.entryFee}</Text>
                </Col>
                <Col span={12}>
                  <Text type="secondary">Prize Pool:</Text>
                  <br />
                  <Text strong className="text-lg text-green-600">${selectedTournament.prizePool.toLocaleString()}</Text>
                </Col>
                <Col span={12}>
                  <Text type="secondary">Participants:</Text>
                  <br />
                  <Text strong>{selectedTournament.currentParticipants}/{selectedTournament.maxParticipants}</Text>
                </Col>
                <Col span={12}>
                  <Text type="secondary">Game Type:</Text>
                  <br />
                  <Text strong>{selectedTournament.gameType}</Text>
                </Col>
              </Row>
            </div>
            
            <Form.Item
              name="paymentMethod"
              label="Payment Method"
              rules={[{ required: true, message: 'Please select a payment method' }]}
            >
              <Select placeholder="Select payment method">
                <Select.Option value="wallet">Account Wallet</Select.Option>
                <Select.Option value="card">Credit Card</Select.Option>
                <Select.Option value="crypto">Cryptocurrency</Select.Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              name="agreeTnC"
              valuePropName="checked"
              rules={[{ required: true, message: 'Please agree to terms and conditions' }]}
            >
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <Text>I agree to the tournament rules and terms & conditions</Text>
              </div>
            </Form.Item>
            
            <div className="flex gap-3 pt-4">
              <Button 
                onClick={() => setIsJoinModalOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                type="primary" 
                htmlType="submit"
                className="flex-1 bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700"
              >
                Join Tournament - ${selectedTournament.entryFee}
              </Button>
            </div>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default TournamentPage;
