import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { RootState, AppDispatch } from './store';
import { initializeTheme } from './store/slices/uiSlice';
import { initializeAuth } from './store/slices/authSlice';
import Layout from './components/layout/Layout';
import ServiceDetailPage from './components/marketplace/ServiceDetailPage';
import TournamentPage from './components/tournaments/TournamentPage';
import JackpotDashboard from './components/gaming/JackpotDashboard';
import RandomPrizes from './components/gaming/RandomPrizes';
import VirtualPitBoss from './components/gaming/VirtualPitBoss';
import { Theme } from './types';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    // Initialize theme and auth on app start
    dispatch(initializeTheme());
    dispatch(initializeAuth());
  }, [dispatch]);

  // Configure Ant Design theme
  const antdThemeConfig = {
    algorithm: theme === Theme.Dark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    token: {
      colorPrimary: '#1E3A8A', // brand-blue
      colorSuccess: '#22C55E',
      colorWarning: '#F59E0B',
      colorError: '#EF4444',
      colorInfo: '#3B82F6',
      borderRadius: 8,
      fontFamily: 'Inter, system-ui, sans-serif',
    },
    components: {
      Button: {
        borderRadius: 8,
        fontWeight: 500,
      },
      Card: {
        borderRadius: 12,
      },
      Modal: {
        borderRadius: 16,
      },
      Input: {
        borderRadius: 8,
      },
      Select: {
        borderRadius: 8,
      },
    },
  };

  return (
    <ConfigProvider theme={antdThemeConfig}>
      <Router>
        <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200">
          <Routes>
            <Route path="/" element={<Layout />} />
            <Route path="/service/:serviceId" element={<ServiceDetailPage />} />
            <Route path="/tournaments" element={<TournamentPage />} />
            <Route path="/jackpot" element={<JackpotDashboard />} />
            <Route path="/prizes" element={<RandomPrizes />} />
            <Route path="/pit-boss" element={<VirtualPitBoss />} />
          </Routes>
        </div>
      </Router>
    </ConfigProvider>
  );
};

export default App;
