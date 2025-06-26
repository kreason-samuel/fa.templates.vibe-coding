import React, { useState } from 'react';
import { Modal, Form, Input, Button, Tabs, Divider, message, Space } from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  MailOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  GoogleOutlined,
  GithubOutlined,
  FacebookOutlined
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { closeAuthModal } from '../../store/slices/uiSlice';
import { loginUser, registerUser } from '../../store/slices/authSlice';
import { LoginForm, RegisterForm } from '../../types';

const AuthModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthModalOpen } = useSelector((state: RootState) => state.ui);
  const { isLoading } = useSelector((state: RootState) => state.auth);
  
  const [loginForm] = Form.useForm<LoginForm>();
  const [registerForm] = Form.useForm<RegisterForm>();
  const [activeTab, setActiveTab] = useState<string>('login');

  const handleClose = () => {
    dispatch(closeAuthModal());
    loginForm.resetFields();
    registerForm.resetFields();
  };

  const handleLogin = async (values: LoginForm) => {
    try {
      await dispatch(loginUser(values)).unwrap();
      message.success('Login successful!');
      handleClose();
    } catch (error) {
      message.error(typeof error === 'string' ? error : 'Login failed. Please try again.');
    }
  };

  const handleRegister = async (values: RegisterForm) => {
    try {
      await dispatch(registerUser(values)).unwrap();
      message.success('Registration successful! Please check your email for verification.');
      handleClose();
    } catch (error) {
      message.error(typeof error === 'string' ? error : 'Registration failed. Please try again.');
    }
  };

  const handleSocialLogin = (provider: string) => {
    message.info(`${provider} login will be implemented soon!`);
  };

  const loginFormContent = (
    <Form
      form={loginForm}
      name="login"
      onFinish={handleLogin}
      layout="vertical"
      size="large"
      className="space-y-4"
    >
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: 'Please input your email!' },
          { type: 'email', message: 'Please enter a valid email!' }
        ]}
      >
        <Input 
          prefix={<MailOutlined className="text-slate-400" />} 
          placeholder="Enter your email"
          className="rounded-lg h-12"
        />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          { required: true, message: 'Please input your password!' },
          { min: 6, message: 'Password must be at least 6 characters!' }
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="text-slate-400" />}
          placeholder="Enter your password"
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          className="rounded-lg h-12"
        />
      </Form.Item>

      <div className="flex justify-between items-center">
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <span className="text-sm text-brand-blue hover:text-blue-700 cursor-pointer">
            Remember me
          </span>
        </Form.Item>
        <a className="text-sm text-brand-blue hover:text-blue-700">
          Forgot password?
        </a>
      </div>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          block
          size="large"
          className="bg-brand-blue hover:bg-blue-700 border-0 font-semibold h-12 rounded-lg"
        >
          Sign In
        </Button>
      </Form.Item>

      <Divider className="text-slate-400">or continue with</Divider>

      <Space className="w-full" direction="vertical">
        <Button
          block
          size="large"
          icon={<GoogleOutlined />}
          onClick={() => handleSocialLogin('Google')}
          className="h-12 rounded-lg border-slate-300 hover:border-brand-blue hover:text-brand-blue"
        >
          Continue with Google
        </Button>
        <div className="grid grid-cols-2 gap-3">
          <Button
            size="large"
            icon={<GithubOutlined />}
            onClick={() => handleSocialLogin('GitHub')}
            className="h-12 rounded-lg border-slate-300 hover:border-brand-blue hover:text-brand-blue"
          >
            GitHub
          </Button>
          <Button
            size="large"
            icon={<FacebookOutlined />}
            onClick={() => handleSocialLogin('Facebook')}
            className="h-12 rounded-lg border-slate-300 hover:border-brand-blue hover:text-brand-blue"
          >
            Facebook
          </Button>
        </div>
      </Space>

      <div className="text-center text-sm text-slate-600 dark:text-slate-400">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={() => setActiveTab('register')}
          className="text-brand-blue hover:text-blue-700 font-medium"
        >
          Sign up here
        </button>
      </div>
    </Form>
  );

  const registerFormContent = (
    <Form
      form={registerForm}
      name="register"
      onFinish={handleRegister}
      layout="vertical"
      size="large"
      className="space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input 
            prefix={<UserOutlined className="text-slate-400" />} 
            placeholder="First name"
            className="rounded-lg h-12"
          />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: 'Please input your last name!' }]}
        >
          <Input 
            prefix={<UserOutlined className="text-slate-400" />} 
            placeholder="Last name"
            className="rounded-lg h-12"
          />
        </Form.Item>
      </div>

      <Form.Item
        name="username"
        label="Username"
        rules={[
          { required: true, message: 'Please input your username!' },
          { min: 3, message: 'Username must be at least 3 characters!' }
        ]}
      >
        <Input 
          prefix={<UserOutlined className="text-slate-400" />} 
          placeholder="Choose a username"
          className="rounded-lg h-12"
        />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: 'Please input your email!' },
          { type: 'email', message: 'Please enter a valid email!' }
        ]}
      >
        <Input 
          prefix={<MailOutlined className="text-slate-400" />} 
          placeholder="Enter your email"
          className="rounded-lg h-12"
        />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          { required: true, message: 'Please input your password!' },
          { min: 8, message: 'Password must be at least 8 characters!' }
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="text-slate-400" />}
          placeholder="Create a password"
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          className="rounded-lg h-12"
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label="Confirm Password"
        dependencies={['password']}
        rules={[
          { required: true, message: 'Please confirm your password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The passwords do not match!'));
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="text-slate-400" />}
          placeholder="Confirm your password"
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          className="rounded-lg h-12"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={isLoading}
          block
          size="large"
          className="bg-brand-blue hover:bg-blue-700 border-0 font-semibold h-12 rounded-lg"
        >
          Create Account
        </Button>
      </Form.Item>

      <div className="text-center text-sm text-slate-600 dark:text-slate-400">
        Already have an account?{' '}
        <button
          type="button"
          onClick={() => setActiveTab('login')}
          className="text-brand-blue hover:text-blue-700 font-medium"
        >
          Sign in here
        </button>
      </div>
    </Form>
  );

  const tabItems = [
    {
      key: 'login',
      label: 'Sign In',
      children: loginFormContent,
    },
    {
      key: 'register',
      label: 'Sign Up',
      children: registerFormContent,
    },
  ];

  return (
    <Modal
      title={null}
      open={isAuthModalOpen}
      onCancel={handleClose}
      footer={null}
      width={480}
      centered
      className="auth-modal"
    >
      <div className="p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Welcome to NewPAM
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Access premium gaming services and solutions
          </p>
        </div>

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          centered
          className="auth-tabs"
        />
      </div>
    </Modal>
  );
};

export default AuthModal;
