import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button, Typography, Divider, Space, Alert, Steps } from 'antd';
import { 
  CreditCardOutlined, 
  SafetyOutlined, 
  CheckCircleOutlined,
  DollarOutlined 
} from '@ant-design/icons';
import { MarketplaceService } from '../../types';

const { Title, Text } = Typography;
const { Option } = Select;
const { Step } = Steps;

interface PurchaseModalProps {
  visible: boolean;
  onCancel: () => void;
  service: MarketplaceService | null;
  onPurchaseComplete: (serviceId: string) => void;
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({
  visible,
  onCancel,
  service,
  onPurchaseComplete
}) => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!service) return null;

  const steps = [
    {
      title: 'Service Details',
      icon: <DollarOutlined />
    },
    {
      title: 'Payment Method',
      icon: <CreditCardOutlined />
    },
    {
      title: 'Confirmation',
      icon: <CheckCircleOutlined />
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePurchase = async () => {
    try {
      setIsProcessing(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onPurchaseComplete(service.id);
      handleClose();
    } catch (error) {
      console.error('Purchase failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setCurrentStep(0);
    form.resetFields();
    onCancel();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
              <Title level={4} className="mb-2">{service.name}</Title>
              <Text type="secondary" className="block mb-4">{service.description}</Text>
              
              <div className="flex justify-between items-center">
                <div>
                  <Text strong className="text-2xl text-blue-600">${service.price}</Text>
                  {service.originalPrice && service.originalPrice > (service.price || 0) && (
                    <Text delete className="ml-2 text-gray-500">
                      ${service.originalPrice}
                    </Text>
                  )}
                </div>
                <div className="text-right">
                  <Text type="secondary">Category</Text>
                  <div className="font-semibold">{service.category}</div>
                </div>
              </div>
            </div>

            {service.features && service.features.length > 0 && (
              <div>
                <Title level={5}>What's Included:</Title>
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircleOutlined className="text-green-500" />
                      <Text>{feature}</Text>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Alert
              message="Instant Access"
              description="Service will be activated immediately after purchase completion."
              type="info"
              showIcon
            />
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <Title level={4}>Payment Information</Title>
            
            <Form form={form} layout="vertical">
              <Form.Item 
                label="Payment Method" 
                name="paymentMethod"
                rules={[{ required: true, message: 'Please select a payment method' }]}
              >
                <Select placeholder="Select payment method" size="large">
                  <Option value="card">Credit/Debit Card</Option>
                  <Option value="paypal">PayPal</Option>
                  <Option value="crypto">Cryptocurrency</Option>
                </Select>
              </Form.Item>

              <Form.Item 
                label="Card Number" 
                name="cardNumber"
                rules={[{ required: true, message: 'Please enter card number' }]}
              >
                <Input 
                  placeholder="1234 5678 9012 3456" 
                  size="large"
                  prefix={<CreditCardOutlined />}
                />
              </Form.Item>

              <div className="grid grid-cols-2 gap-4">
                <Form.Item 
                  label="Expiry Date" 
                  name="expiryDate"
                  rules={[{ required: true, message: 'Required' }]}
                >
                  <Input placeholder="MM/YY" size="large" />
                </Form.Item>
                
                <Form.Item 
                  label="CVV" 
                  name="cvv"
                  rules={[{ required: true, message: 'Required' }]}
                >
                  <Input placeholder="123" size="large" />
                </Form.Item>
              </div>

              <Form.Item 
                label="Cardholder Name" 
                name="cardholderName"
                rules={[{ required: true, message: 'Please enter cardholder name' }]}
              >
                <Input placeholder="John Doe" size="large" />
              </Form.Item>
            </Form>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <SafetyOutlined className="text-green-500" />
                <Text strong>Secure Payment</Text>
              </div>
              <Text type="secondary" className="text-sm">
                Your payment information is encrypted and secure. We never store your card details.
              </Text>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircleOutlined className="text-6xl text-green-500 mb-4" />
              <Title level={3}>Review Your Purchase</Title>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <div className="flex justify-between">
                <Text>Service:</Text>
                <Text strong>{service.name}</Text>
              </div>
              <div className="flex justify-between">
                <Text>Price:</Text>
                <Text strong className="text-lg">${service.price}</Text>
              </div>
              <div className="flex justify-between">
                <Text>Payment Method:</Text>
                <Text>•••• •••• •••• 3456</Text>
              </div>
              <Divider />
              <div className="flex justify-between text-lg">
                <Text strong>Total:</Text>
                <Text strong className="text-blue-600">${service.price}</Text>
              </div>
            </div>

            <Alert
              message="Ready to Purchase"
              description="Click 'Complete Purchase' to finalize your order and get instant access to the service."
              type="success"
              showIcon
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Modal
      title="Purchase Service"
      visible={visible}
      onCancel={handleClose}
      width={600}
      footer={null}
      destroyOnClose
    >
      <div className="space-y-6">
        <Steps current={currentStep} className="mb-8">
          {steps.map((step, index) => (
            <Step key={index} title={step.title} icon={step.icon} />
          ))}
        </Steps>

        {renderStepContent()}

        <Divider />

        <div className="flex justify-between">
          <Button 
            onClick={currentStep === 0 ? handleClose : handlePrev}
            disabled={isProcessing}
          >
            {currentStep === 0 ? 'Cancel' : 'Previous'}
          </Button>
          
          <Space>
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={handleNext}>
                Next
              </Button>
            )}
            
            {currentStep === steps.length - 1 && (
              <Button 
                type="primary" 
                loading={isProcessing}
                onClick={handlePurchase}
                size="large"
                className="bg-green-600 hover:bg-green-700 border-green-600"
              >
                Complete Purchase
              </Button>
            )}
          </Space>
        </div>
      </div>
    </Modal>
  );
};

export default PurchaseModal;
