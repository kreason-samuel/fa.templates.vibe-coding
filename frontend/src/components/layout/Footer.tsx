import React from 'react';
import { Layout, Row, Col, Typography, Space, Divider } from 'antd';
import { 
  TwitterOutlined, 
  FacebookOutlined, 
  InstagramOutlined, 
  YoutubeOutlined,
  LinkedinOutlined,
  GithubOutlined
} from '@ant-design/icons';

const { Footer: AntFooter } = Layout;
const { Title, Text, Link } = Typography;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <AntFooter className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <Row gutter={[32, 32]}>
          {/* Brand and Description */}
          <Col xs={24} sm={12} lg={6}>
            <div className="space-y-4">
              <Title level={4} className="text-brand-blue dark:text-white mb-3">
                NewPAM
              </Title>
              <Text className="text-slate-600 dark:text-slate-400">
                Your premier destination for gaming services, tournaments, and digital solutions. 
                Connecting gamers with the tools they need to succeed.
              </Text>
              <div className="flex space-x-3 mt-4">
                <TwitterOutlined className="text-slate-500 hover:text-brand-blue cursor-pointer text-lg" />
                <FacebookOutlined className="text-slate-500 hover:text-brand-blue cursor-pointer text-lg" />
                <InstagramOutlined className="text-slate-500 hover:text-brand-blue cursor-pointer text-lg" />
                <YoutubeOutlined className="text-slate-500 hover:text-brand-blue cursor-pointer text-lg" />
                <LinkedinOutlined className="text-slate-500 hover:text-brand-blue cursor-pointer text-lg" />
                <GithubOutlined className="text-slate-500 hover:text-brand-blue cursor-pointer text-lg" />
              </div>
            </div>
          </Col>

          {/* Services */}
          <Col xs={12} sm={6} lg={4}>
            <div className="space-y-3">
              <Title level={5} className="text-slate-800 dark:text-slate-200">
                Services
              </Title>
              <div className="space-y-2">
                <Link className="block text-slate-600 dark:text-slate-400 hover:text-brand-blue">
                  SmartICO.ai Plugins
                </Link>
                <Link className="block text-slate-600 dark:text-slate-400 hover:text-brand-blue">
                  SEON Fraud/KYC
                </Link>
                <Link className="block text-slate-600 dark:text-slate-400 hover:text-brand-blue">
                  iGaming Servers
                </Link>
                <Link className="block text-slate-600 dark:text-slate-400 hover:text-brand-blue">
                  Virtual Pit Boss
                </Link>
              </div>
            </div>
          </Col>

          {/* Gaming */}
          <Col xs={12} sm={6} lg={4}>
            <div className="space-y-3">
              <Title level={5} className="text-slate-800 dark:text-slate-200">
                Gaming
              </Title>
              <div className="space-y-2">
                <Link className="block text-slate-600 dark:text-slate-400 hover:text-brand-blue">
                  Tournaments
                </Link>
                <Link className="block text-slate-600 dark:text-slate-400 hover:text-brand-blue">
                  Free Games
                </Link>
                <Link className="block text-slate-600 dark:text-slate-400 hover:text-brand-blue">
                  Jackpot Games
                </Link>
                <Link className="block text-slate-600 dark:text-slate-400 hover:text-brand-blue">
                  Prize Games
                </Link>
              </div>
            </div>
          </Col>

          {/* Support */}
          <Col xs={12} sm={6} lg={4}>
            <div className="space-y-3">
              <Title level={5} className="text-slate-800 dark:text-slate-200">
                Support
              </Title>
              <div className="space-y-2">
                <Link className="block text-slate-600 dark:text-slate-400 hover:text-brand-blue">
                  Help Center
                </Link>
                <Link className="block text-slate-600 dark:text-slate-400 hover:text-brand-blue">
                  Contact Us
                </Link>
                <Link className="block text-slate-600 dark:text-slate-400 hover:text-brand-blue">
                  Documentation
                </Link>
                <Link className="block text-slate-600 dark:text-slate-400 hover:text-brand-blue">
                  API Reference
                </Link>
              </div>
            </div>
          </Col>

          {/* Legal */}
          <Col xs={12} sm={6} lg={6}>
            <div className="space-y-3">
              <Title level={5} className="text-slate-800 dark:text-slate-200">
                Legal & Company
              </Title>
              <div className="space-y-2">
                <Link className="block text-slate-600 dark:text-slate-400 hover:text-brand-blue">
                  Privacy Policy
                </Link>
                <Link className="block text-slate-600 dark:text-slate-400 hover:text-brand-blue">
                  Terms of Service
                </Link>
                <Link className="block text-slate-600 dark:text-slate-400 hover:text-brand-blue">
                  Cookie Policy
                </Link>
                <Link className="block text-slate-600 dark:text-slate-400 hover:text-brand-blue">
                  About Us
                </Link>
                <Link className="block text-slate-600 dark:text-slate-400 hover:text-brand-blue">
                  Careers
                </Link>
                <Link className="block text-slate-600 dark:text-slate-400 hover:text-brand-blue">
                  Press Kit
                </Link>
              </div>
            </div>
          </Col>
        </Row>

        <Divider className="border-slate-300 dark:border-slate-600 my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <Text className="text-slate-500 dark:text-slate-500 text-sm">
            © {currentYear} NewPAM. All rights reserved.
          </Text>
          <Space className="text-slate-500 dark:text-slate-500 text-sm">
            <Text>Powered by modern web technologies</Text>
            <Text>•</Text>
            <Text>Built with ❤️ for gamers</Text>
          </Space>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;
