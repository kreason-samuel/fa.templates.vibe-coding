import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, AuthState, LoginForm, RegisterForm, ApiResponse } from '../../types';

// Mock API calls - replace with actual API integration
const authAPI = {
  login: async (credentials: LoginForm): Promise<ApiResponse<{ user: User; token: string }>> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful login
    if (credentials.email === 'demo@marketplace.com' && credentials.password === 'demo123') {
      return {
        success: true,
        data: {
          user: {
            id: '1',
            email: credentials.email,
            username: 'demo_user',
            firstName: 'Demo',
            lastName: 'User',
            kycStatus: 'verified' as any,
            createdAt: new Date().toISOString(),
            isActive: true,
          },
          token: 'mock-jwt-token'
        }
      };
    }
    
    return {
      success: false,
      error: 'Invalid credentials'
    };
  },

  register: async (userData: RegisterForm): Promise<ApiResponse<{ user: User; token: string }>> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      success: true,
      data: {
        user: {
          id: Math.random().toString(36).substr(2, 9),
          email: userData.email,
          username: userData.username,
          firstName: userData.firstName,
          lastName: userData.lastName,
          kycStatus: 'not_started' as any,
          createdAt: new Date().toISOString(),
          isActive: true,
        },
        token: 'mock-jwt-token'
      }
    };
  },

  logout: async (): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
  }
};

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginForm, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(credentials);
      if (response.success && response.data) {
        // Store token in localStorage
        localStorage.setItem('auth_token', response.data.token);
        return response.data.user;
      } else {
        return rejectWithValue(response.error || 'Login failed');
      }
    } catch (error) {
      return rejectWithValue('Network error. Please try again.');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: RegisterForm, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(userData);
      if (response.success && response.data) {
        // Store token in localStorage
        localStorage.setItem('auth_token', response.data.token);
        return response.data.user;
      } else {
        return rejectWithValue(response.error || 'Registration failed');
      }
    } catch (error) {
      return rejectWithValue('Network error. Please try again.');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await authAPI.logout();
      localStorage.removeItem('auth_token');
      return;
    } catch (error) {
      return rejectWithValue('Logout failed');
    }
  }
);

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    initializeAuth: (state) => {
      // Check for stored token and initialize user if valid
      const token = localStorage.getItem('auth_token');
      if (token) {
        // In a real app, you'd validate the token with the server
        // For now, we'll set a mock user if token exists
        state.user = {
          id: '1',
          email: 'demo@marketplace.com',
          username: 'demo_user',
          firstName: 'Demo',
          lastName: 'User',
          kycStatus: 'verified' as any,
          createdAt: new Date().toISOString(),
          isActive: true,
        };
        state.isAuthenticated = true;
      }
    },
  },
  extraReducers: (builder) => {
    // Login cases
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Logout cases
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setUser, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
