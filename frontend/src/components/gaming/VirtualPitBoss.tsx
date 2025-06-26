import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Typography, Avatar, List, Badge, Input, Form, message, Empty } from 'antd';
import { RobotOutlined, MessageOutlined, SendOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { RootState, AppDispatch } from '../../store';
import { 
  fetchPitBossMessages, 
  requestPitBossAssistance, 
  markMessageAsRead,
  setPitBossOnlineStatus 
} from '../../store/slices/gamingFeaturesSlice';

const { Title, Text } = Typography;
const { TextArea } = Input;

const VirtualPitBoss: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { 
    pitBossMessages, 
    pitBossOnline, 
    assistanceRequests, 
    isLoading 
  } = useSelector((state: RootState) => state.gamingFeatures);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  const [form] = Form.useForm();
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchPitBossMessages('current-user'));
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    // Simulate pit boss online/offline status
    const interval = setInterval(() => {
      dispatch(setPitBossOnlineStatus(Math.random() > 0.1)); // 90% online time
    }, 30000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleSendMessage = async (values: { message: string }) => {
    if (!values.message.trim()) return;

    try {
      await dispatch(requestPitBossAssistance({
        userId: 'current-user',
        message: values.message
      })).unwrap();
      
      message.success('Message sent! The Pit Boss will respond shortly.');
      form.resetFields();
      setNewMessage('');
    } catch (error) {
      message.error('Failed to send message');
    }
  };

  const handleMarkAsRead = (messageId: string) => {
    dispatch(markMessageAsRead(messageId));
  };

  const getMessageTypeIcon = (messageType: string) => {
    switch (messageType) {
      case 'welcome': return '👋';
      case 'tip': return '💡';
      case 'warning': return '⚠️';
      case 'congratulations': return '🎉';
      case 'assistance': return '🤝';
      default: return '💬';
    }
  };

  const getMessageTypeColor = (messageType: string) => {
    switch (messageType) {
      case 'welcome': return '#52c41a';
      case 'tip': return '#1890ff';
      case 'warning': return '#fa8c16';
      case 'congratulations': return '#eb2f96';
      case 'assistance': return '#722ed1';
      default: return '#595959';
    }
  };

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="text-center">
          <RobotOutlined className="text-6xl text-purple-500 mb-4" />
          <Title level={3}>Virtual Pit Boss</Title>
          <Text>Please log in to chat with your personal gaming assistant!</Text>
        </Card>
      </div>
    );
  }

  return (
    <div className="virtual-pit-boss p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <RobotOutlined className="text-6xl text-purple-500 mb-4" />
            <Title level={1} className="mb-2">🤖 Virtual Pit Boss</Title>
            <Text className="text-lg text-gray-600 dark:text-gray-300">
              Your personal AI gaming assistant is here to help!
            </Text>
          </motion.div>
        </div>

        {/* Pit Boss Status */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <Card className="text-center">
            <div className="flex items-center justify-center space-x-4">
              <Badge 
                status={pitBossOnline ? "processing" : "error"} 
                text={
                  <span className="font-medium">
                    Pit Boss is {pitBossOnline ? 'Online' : 'Offline'}
                  </span>
                }
              />
              <div className="text-sm text-gray-600">
                Total Assistance Requests: {assistanceRequests}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Chat Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-2">
            <Card 
              title={
                <div className="flex items-center">
                  <MessageOutlined className="mr-2" />
                  Messages from Pit Boss
                </div>
              }
              className="h-96 overflow-hidden"
              bodyStyle={{ padding: 0, height: '300px', overflow: 'auto' }}
            >
              {pitBossMessages.length === 0 ? (
                <div className="p-6">
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="No messages yet. Send a message to get started!"
                  />
                </div>
              ) : (
                <List
                  dataSource={pitBossMessages}
                  renderItem={(message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <List.Item
                        className={`px-4 py-3 cursor-pointer ${!message.isRead ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                        onClick={() => handleMarkAsRead(message.id)}
                      >
                        <div className="w-full">
                          <div className="flex items-start space-x-3">
                            <Avatar 
                              style={{ backgroundColor: getMessageTypeColor(message.messageType) }}
                              icon={<RobotOutlined />}
                            />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="text-lg">
                                  {getMessageTypeIcon(message.messageType)}
                                </span>
                                <Text strong>Virtual Pit Boss</Text>
                                <Text type="secondary" className="text-xs">
                                  {formatMessageTime(message.timestamp)}
                                </Text>
                                {!message.isRead && (
                                  <Badge status="processing" />
                                )}
                              </div>
                              <Text className="text-sm">{message.message}</Text>
                            </div>
                          </div>
                        </div>
                      </List.Item>
                    </motion.div>
                  )}
                />
              )}
            </Card>
          </div>

          {/* Message Input */}
          <div className="space-y-6">
            <Card 
              title="Ask the Pit Boss"
              className="h-96"
            >
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSendMessage}
                className="h-full flex flex-col"
              >
                <Form.Item
                  name="message"
                  label="Your Message"
                  rules={[{ required: true, message: 'Please enter your message' }]}
                  className="flex-1"
                >
                  <TextArea
                    placeholder="Ask about game strategies, rules, or get personalized recommendations..."
                    rows={6}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    disabled={!pitBossOnline}
                  />
                </Form.Item>
                
                <Form.Item className="mb-0">
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    block
                    icon={<SendOutlined />}
                    loading={isLoading}
                    disabled={!pitBossOnline || !newMessage.trim()}
                    className="bg-purple-600 border-purple-600"
                  >
                    Send Message
                  </Button>
                </Form.Item>
              </Form>
            </Card>

            {/* Quick Actions */}
            <Card title="Quick Questions" size="small">
              <div className="space-y-2">
                <Button
                  type="text"
                  size="small"
                  block
                  className="text-left"
                  onClick={() => setNewMessage("What's the best strategy for slot games?")}
                >
                  💡 Game Strategies
                </Button>
                <Button
                  type="text"
                  size="small"
                  block
                  className="text-left"
                  onClick={() => setNewMessage("How do jackpot games work?")}
                >
                  🎰 Jackpot Help
                </Button>
                <Button
                  type="text"
                  size="small"
                  block
                  className="text-left"
                  onClick={() => setNewMessage("Can you recommend games based on my history?")}
                >
                  📊 Personalized Recommendations
                </Button>
                <Button
                  type="text"
                  size="small"
                  block
                  className="text-left"
                  onClick={() => setNewMessage("I need help with responsible gaming")}
                >
                  🛡️ Responsible Gaming
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualPitBoss;
