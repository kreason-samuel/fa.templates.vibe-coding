import React from 'react';
import { Layout, Button, Space, Avatar, Dropdown, Switch } from 'antd';
import { 
  UserOutlined, 
  LoginOutlined, 
  UserAddOutlined, 
  SunOutlined, 
  MoonOutlined,
  MenuOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { toggleTheme, openAuthModal } from '../../store/slices/uiSlice';
import { logoutUser } from '../../store/slices/authSlice';
import { Theme } from '../../types';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useSelector((state: RootState) => state.ui);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleLoginClick = () => {
    dispatch(openAuthModal('login'));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: 'Profile',
      icon: <UserOutlined />,
    },
    {
      key: 'orders',
      label: 'My Orders',
      icon: <ShoppingCartOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LoginOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <AntHeader className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 h-16 flex items-center justify-between shadow-sm">
      {/* Logo and Brand */}
      <div className="flex items-center space-x-4" data-testid="brand-logo">
        <div className="text-2xl font-bold text-brand-blue dark:text-white">
          NewPAM
        </div>
      </div>

      {/* Navigation Menu - Desktop - REMOVED */}
      
      {/* Right Side Actions */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <div className="flex items-center space-x-2" data-testid="theme-toggle">
          <SunOutlined className="text-slate-500 dark:text-slate-400" />
          <Switch
            checked={theme === Theme.Dark}
            onChange={handleThemeToggle}
            size="small"
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
          />
          <MoonOutlined className="text-slate-500 dark:text-slate-400" />
        </div>

        {/* Authentication Section */}
        {isAuthenticated && user ? (
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
            <div className="flex items-center space-x-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 px-3 py-2 rounded-lg transition-colors">
              <Avatar 
                size="small" 
                icon={<UserOutlined />} 
                src={user.avatarUrl}
                className="bg-brand-blue"
              />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 hidden lg:block">
                {user.username}
              </span>
            </div>
          </Dropdown>
        ) : (
          <Space>
            <Button 
              type="text" 
              icon={<LoginOutlined />}
              onClick={handleLoginClick}
              className="text-slate-700 dark:text-slate-300 hover:text-brand-blue dark:hover:text-white"
            >
              Login
            </Button>
            <Button 
              type="primary" 
              icon={<UserAddOutlined />}
              onClick={handleLoginClick}
              className="bg-brand-blue border-brand-blue hover:bg-blue-700"
            >
              Sign Up
            </Button>
          </Space>
        )}

        {/* Mobile Menu Toggle */}
        <Button 
          type="text" 
          icon={<MenuOutlined />}
          className="md:hidden text-slate-700 dark:text-slate-300"
        />
      </div>
    </AntHeader>
  );
};

export default Header;
