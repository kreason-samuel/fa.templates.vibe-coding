import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button, Typography, Divider, Space, Alert, Card, Tag } from 'antd';
import { 
  UserOutlined, 
  DollarOutlined,
  TeamOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { Tournament } from '../../types';

const { Title, Text } = Typography;
const { Option } = Select;

interface TournamentRegistrationModalProps {
  visible: boolean;
  onCancel: () => void;
  tournament: Tournament | null;
  onRegistrationComplete: (tournamentId: string) => void;
}

const TournamentRegistrationModal: React.FC<TournamentRegistrationModalProps> = ({
  visible,
  onCancel,
  tournament,
  onRegistrationComplete
}) => {
  const [form] = Form.useForm();
  const [isProcessing, setIsProcessing] = useState(false);
  const [registrationStep, setRegistrationStep] = useState<'details' | 'payment' | 'success'>('details');

  if (!tournament) return null;

  const spotsLeft = tournament.maxParticipants - tournament.currentParticipants;
  const isAlmostFull = spotsLeft <= 5;
  const isFull = spotsLeft <= 0;

  const handleRegister = async () => {
    try {
      setIsProcessing(true);
      
      if (registrationStep === 'details') {
        setRegistrationStep('payment');
        return;
      }
      
      if (registrationStep === 'payment') {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setRegistrationStep('success');
        return;
      }
      
      if (registrationStep === 'success') {
        onRegistrationComplete(tournament.id);
        handleClose();
      }
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setRegistrationStep('details');
    form.resetFields();
    onCancel();
  };

  const renderContent = () => {
    switch (registrationStep) {
      case 'details':
        return (
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <Title level={3} className="mb-2">{tournament.name}</Title>
                  <Text type="secondary">{tournament.gameType}</Text>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    ${tournament.prizePool.toLocaleString()}
                  </div>
                  <Text type="secondary">Prize Pool</Text>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Text strong>Entry Fee:</Text>
                  <div className="text-lg text-blue-600">${tournament.entryFee}</div>
                </div>
                <div>
                  <Text strong>Format:</Text>
                  <div>Single Elimination</div>
                </div>
                <div>
                  <Text strong>Start Date:</Text>
                  <div>{new Date(tournament.startDate).toLocaleDateString()}</div>
                </div>
                <div>
                  <Text strong>Duration:</Text>
                  <div>2-4 hours</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <Text strong>Participants:</Text>
                  <Space>
                    <Tag color={isAlmostFull ? 'orange' : 'blue'}>
                      {tournament.currentParticipants}/{tournament.maxParticipants}
                    </Tag>
                    {isAlmostFull && !isFull && <Tag color="red">Almost Full!</Tag>}
                    {isFull && <Tag color="red">FULL</Tag>}
                  </Space>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${isAlmostFull ? 'bg-orange-500' : 'bg-blue-500'}`}
                    style={{ width: `${(tournament.currentParticipants / tournament.maxParticipants) * 100}%` }}
                  />
                </div>
              </div>

              {!isFull && (
                <Alert
                  message={`${spotsLeft} spots remaining`}
                  description="Register now to secure your spot in this tournament!"
                  type={isAlmostFull ? 'warning' : 'info'}
                  showIcon
                />
              )}
            </Card>

            <Form form={form} layout="vertical">
              <Form.Item 
                label="Player Name" 
                name="playerName"
                rules={[{ required: true, message: 'Please enter your player name' }]}
              >
                <Input 
                  placeholder="Enter your gaming username" 
                  size="large"
                  prefix={<UserOutlined />}
                />
              </Form.Item>

              <Form.Item 
                label="Experience Level" 
                name="experienceLevel"
                rules={[{ required: true, message: 'Please select your experience level' }]}
              >
                <Select placeholder="Select your skill level" size="large">
                  <Option value="beginner">Beginner (0-1 years)</Option>
                  <Option value="intermediate">Intermediate (1-3 years)</Option>
                  <Option value="advanced">Advanced (3-5 years)</Option>
                  <Option value="professional">Professional (5+ years)</Option>
                </Select>
              </Form.Item>

              <Form.Item 
                label="Team/Clan (Optional)" 
                name="teamName"
              >
                <Input 
                  placeholder="Enter your team or clan name" 
                  size="large"
                  prefix={<TeamOutlined />}
                />
              </Form.Item>
            </Form>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <DollarOutlined className="text-4xl text-green-500 mb-4" />
              <Title level={3}>Registration Fee</Title>
              <div className="text-3xl font-bold text-green-600 mb-2">
                ${tournament.entryFee}
              </div>
              <Text type="secondary">Secure your spot in {tournament.name}</Text>
            </div>

            <Card className="bg-gray-50">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Text>Tournament Entry:</Text>
                  <Text strong>${tournament.entryFee}</Text>
                </div>
                <div className="flex justify-between">
                  <Text>Processing Fee:</Text>
                  <Text strong>$0.00</Text>
                </div>
                <Divider className="my-2" />
                <div className="flex justify-between text-lg">
                  <Text strong>Total:</Text>
                  <Text strong className="text-green-600">${tournament.entryFee}</Text>
                </div>
              </div>
            </Card>

            <Form layout="vertical">
              <Form.Item label="Payment Method">
                <Select defaultValue="card" size="large">
                  <Option value="card">Credit/Debit Card</Option>
                  <Option value="paypal">PayPal</Option>
                  <Option value="crypto">Cryptocurrency</Option>
                  <Option value="wallet">Gaming Wallet</Option>
                </Select>
              </Form.Item>
            </Form>

            <Alert
              message="Refund Policy"
              description="Full refund available up to 24 hours before tournament start."
              type="info"
              showIcon
            />
          </div>
        );

      case 'success':
        return (
          <div className="text-center space-y-6">
            <CheckCircleOutlined className="text-6xl text-green-500" />
            <Title level={2}>Registration Successful!</Title>
            <Text className="text-lg">
              You've successfully registered for <strong>{tournament.name}</strong>
            </Text>
            
            <Card className="bg-green-50">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Text>Tournament:</Text>
                  <Text strong>{tournament.name}</Text>
                </div>
                <div className="flex justify-between">
                  <Text>Start Date:</Text>
                  <Text strong>{new Date(tournament.startDate).toLocaleDateString()}</Text>
                </div>
                <div className="flex justify-between">
                  <Text>Your Position:</Text>
                  <Text strong>#{tournament.currentParticipants + 1}</Text>
                </div>
              </div>
            </Card>

            <Alert
              message="What's Next?"
              description="Tournament details and match schedules will be sent to your email 24 hours before the event."
              type="success"
              showIcon
            />
          </div>
        );

      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (registrationStep) {
      case 'details': return 'Tournament Registration';
      case 'payment': return 'Payment Information';
      case 'success': return 'Registration Complete';
      default: return 'Tournament Registration';
    }
  };

  const getButtonText = () => {
    switch (registrationStep) {
      case 'details': return 'Continue to Payment';
      case 'payment': return 'Complete Registration';
      case 'success': return 'View Tournament Dashboard';
      default: return 'Continue';
    }
  };

  return (
    <Modal
      title={getModalTitle()}
      visible={visible}
      onCancel={handleClose}
      width={600}
      footer={
        <div className="flex justify-between">
          <Button onClick={handleClose}>
            {registrationStep === 'success' ? 'Close' : 'Cancel'}
          </Button>
          
          {!isFull && registrationStep !== 'success' && (
            <Button 
              type="primary" 
              loading={isProcessing}
              onClick={() => form.submit()}
              size="large"
              disabled={isFull}
            >
              {getButtonText()}
            </Button>
          )}
          
          {registrationStep === 'success' && (
            <Button 
              type="primary" 
              onClick={() => {
                onRegistrationComplete(tournament.id);
                handleClose();
              }}
              size="large"
            >
              {getButtonText()}
            </Button>
          )}
        </div>
      }
      destroyOnClose
    >
      <Form form={form} onFinish={handleRegister}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default TournamentRegistrationModal;
