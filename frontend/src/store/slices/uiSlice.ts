import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UIState, Theme, Notification } from '../../types';

const initialState: UIState = {
  theme: Theme.Dark,
  isAuthModalOpen: false,
  authModalMode: 'login',
  isMobileMenuOpen: false,
  notifications: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === Theme.Light ? Theme.Dark : Theme.Light;
      // Apply theme to document
      if (typeof document !== 'undefined') {
        const root = document.documentElement;
        if (state.theme === Theme.Dark) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
        // Store theme preference
        localStorage.setItem('theme', state.theme);
      }
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      if (typeof document !== 'undefined') {
        const root = document.documentElement;
        if (state.theme === Theme.Dark) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
        localStorage.setItem('theme', state.theme);
      }
    },
    initializeTheme: (state) => {
      // Check for stored theme preference
      if (typeof window !== 'undefined') {
        const storedTheme = localStorage.getItem('theme') as Theme;
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        const theme = storedTheme || (systemPrefersDark ? Theme.Dark : Theme.Light);
        state.theme = theme;
        
        const root = document.documentElement;
        if (theme === Theme.Dark) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
    },
    openAuthModal: (state, action: PayloadAction<'login' | 'register'>) => {
      state.isAuthModalOpen = true;
      state.authModalMode = action.payload;
    },
    closeAuthModal: (state) => {
      state.isAuthModalOpen = false;
    },
    setAuthModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isAuthModalOpen = action.payload;
    },
    setAuthModalMode: (state, action: PayloadAction<'login' | 'register'>) => {
      state.authModalMode = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false;
    },
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'isRead' | 'createdAt'>>) => {
      const notification: Notification = {
        ...action.payload,
        id: Math.random().toString(36).substr(2, 9),
        isRead: false,
        createdAt: new Date().toISOString(),
      };
      state.notifications.unshift(notification);
      
      // Auto-remove notification after duration
      if (notification.duration) {
        setTimeout(() => {
          // Note: This won't work in Redux as setTimeout is not pure
          // You'd need to handle this in the component or use middleware
        }, notification.duration);
      }
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    markNotificationAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.isRead = true;
      }
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
    },
    showSuccessNotification: (state, action: PayloadAction<{ title: string; message: string; duration?: number }>) => {
      const notification: Notification = {
        ...action.payload,
        id: Math.random().toString(36).substr(2, 9),
        type: 'success',
        isRead: false,
        createdAt: new Date().toISOString(),
        duration: action.payload.duration || 5000,
      };
      state.notifications.unshift(notification);
    },
    showErrorNotification: (state, action: PayloadAction<{ title: string; message: string; duration?: number }>) => {
      const notification: Notification = {
        ...action.payload,
        id: Math.random().toString(36).substr(2, 9),
        type: 'error',
        isRead: false,
        createdAt: new Date().toISOString(),
        duration: action.payload.duration || 8000,
      };
      state.notifications.unshift(notification);
    },
    showWarningNotification: (state, action: PayloadAction<{ title: string; message: string; duration?: number }>) => {
      const notification: Notification = {
        ...action.payload,
        id: Math.random().toString(36).substr(2, 9),
        type: 'warning',
        isRead: false,
        createdAt: new Date().toISOString(),
        duration: action.payload.duration || 6000,
      };
      state.notifications.unshift(notification);
    },
    showInfoNotification: (state, action: PayloadAction<{ title: string; message: string; duration?: number }>) => {
      const notification: Notification = {
        ...action.payload,
        id: Math.random().toString(36).substr(2, 9),
        type: 'info',
        isRead: false,
        createdAt: new Date().toISOString(),
        duration: action.payload.duration || 5000,
      };
      state.notifications.unshift(notification);
    },
  },
});

export const {
  toggleTheme,
  setTheme,
  initializeTheme,
  openAuthModal,
  closeAuthModal,
  setAuthModalOpen,
  setAuthModalMode,
  toggleMobileMenu,
  closeMobileMenu,
  addNotification,
  removeNotification,
  markNotificationAsRead,
  clearAllNotifications,
  showSuccessNotification,
  showErrorNotification,
  showWarningNotification,
  showInfoNotification,
} = uiSlice.actions;

export default uiSlice.reducer;
