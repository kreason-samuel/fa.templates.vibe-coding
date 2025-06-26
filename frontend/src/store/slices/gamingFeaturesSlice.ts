import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Types for Gaming Features
export interface JackpotGame {
  id: string;
  name: string;
  currentJackpot: number;
  basePrize: number;
  lastWinner?: string;
  lastWinAmount?: number;
  lastWinDate?: string;
  participants: number;
  category: 'mega' | 'major' | 'minor';
  isActive: boolean;
}

export interface PrizeDistribution {
  id: string;
  userId: string;
  prizeType: 'cash' | 'bonus' | 'freespins' | 'item';
  prizeValue: number;
  description: string;
  claimedAt?: string;
  expiresAt: string;
  isActive: boolean;
}

export interface VirtualPitBossMessage {
  id: string;
  userId: string;
  message: string;
  messageType: 'welcome' | 'tip' | 'warning' | 'congratulations' | 'assistance';
  timestamp: string;
  isRead: boolean;
}

export interface GamingFeaturesState {
  // Jackpot Games
  jackpotGames: JackpotGame[];
  totalJackpotPool: number;
  
  // Random Prizes
  availablePrizes: PrizeDistribution[];
  claimedPrizes: PrizeDistribution[];
  dailyPrizesRemaining: number;
  
  // Virtual Pit Boss
  pitBossMessages: VirtualPitBossMessage[];
  pitBossOnline: boolean;
  assistanceRequests: number;
  
  // General state
  isLoading: boolean;
  error: string | null;
}

// Mock data
const mockJackpotGames: JackpotGame[] = [
  {
    id: 'mega-1',
    name: 'Mega Fortune Jackpot',
    currentJackpot: 2450000,
    basePrize: 1000000,
    lastWinner: 'Player***123',
    lastWinAmount: 1890000,
    lastWinDate: '2024-01-20T15:30:00Z',
    participants: 15678,
    category: 'mega',
    isActive: true,
  },
  {
    id: 'major-1',
    name: 'Major Wins Network',
    currentJackpot: 125000,
    basePrize: 50000,
    participants: 3456,
    category: 'major',
    isActive: true,
  },
  {
    id: 'minor-1',
    name: 'Quick Draw Jackpot',
    currentJackpot: 8500,
    basePrize: 1000,
    lastWinner: 'Lucky***789',
    lastWinAmount: 7800,
    lastWinDate: '2024-01-25T09:15:00Z',
    participants: 890,
    category: 'minor',
    isActive: true,
  },
];

const mockPrizes: PrizeDistribution[] = [
  {
    id: 'prize-1',
    userId: 'current-user',
    prizeType: 'cash',
    prizeValue: 50,
    description: '$50 Cash Bonus',
    expiresAt: '2024-02-01T23:59:59Z',
    isActive: true,
  },
  {
    id: 'prize-2',
    userId: 'current-user',
    prizeType: 'freespins',
    prizeValue: 25,
    description: '25 Free Spins on Slot Games',
    expiresAt: '2024-01-28T23:59:59Z',
    isActive: true,
  },
];

const mockPitBossMessages: VirtualPitBossMessage[] = [
  {
    id: 'msg-1',
    userId: 'current-user',
    message: 'Welcome back! I see you\'re interested in our tournament games. Would you like some tips on strategy?',
    messageType: 'welcome',
    timestamp: '2024-01-26T10:00:00Z',
    isRead: false,
  },
  {
    id: 'msg-2',
    userId: 'current-user',
    message: 'Great win on the slots! Consider trying our jackpot games for even bigger prizes.',
    messageType: 'congratulations',
    timestamp: '2024-01-26T09:30:00Z',
    isRead: true,
  },
];

const initialState: GamingFeaturesState = {
  jackpotGames: [],
  totalJackpotPool: 0,
  availablePrizes: [],
  claimedPrizes: [],
  dailyPrizesRemaining: 3,
  pitBossMessages: [],
  pitBossOnline: true,
  assistanceRequests: 0,
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchJackpotGames = createAsyncThunk(
  'gamingFeatures/fetchJackpotGames',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockJackpotGames;
  }
);

export const fetchRandomPrizes = createAsyncThunk(
  'gamingFeatures/fetchRandomPrizes',
  async (userId: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockPrizes.filter(prize => prize.userId === userId);
  }
);

export const claimRandomPrize = createAsyncThunk(
  'gamingFeatures/claimRandomPrize',
  async (prizeId: string) => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    return prizeId;
  }
);

export const fetchPitBossMessages = createAsyncThunk(
  'gamingFeatures/fetchPitBossMessages',
  async (userId: string) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockPitBossMessages.filter(msg => msg.userId === userId);
  }
);

export const requestPitBossAssistance = createAsyncThunk(
  'gamingFeatures/requestPitBossAssistance',
  async (request: { userId: string; message: string }) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const response: VirtualPitBossMessage = {
      id: `msg-${Date.now()}`,
      userId: request.userId,
      message: 'Thanks for your question! I\'ll help you with that right away. Let me analyze your gaming patterns and provide personalized recommendations.',
      messageType: 'assistance',
      timestamp: new Date().toISOString(),
      isRead: false,
    };
    return response;
  }
);

export const enterJackpotGame = createAsyncThunk(
  'gamingFeatures/enterJackpotGame',
  async (params: { gameId: string; entryFee: number }) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return params;
  }
);

const gamingFeaturesSlice = createSlice({
  name: 'gamingFeatures',
  initialState,
  reducers: {
    updateJackpotAmount: (state, action: PayloadAction<{ gameId: string; newAmount: number }>) => {
      const game = state.jackpotGames.find(g => g.id === action.payload.gameId);
      if (game) {
        game.currentJackpot = action.payload.newAmount;
        state.totalJackpotPool = state.jackpotGames.reduce((sum, g) => sum + g.currentJackpot, 0);
      }
    },
    markMessageAsRead: (state, action: PayloadAction<string>) => {
      const message = state.pitBossMessages.find(msg => msg.id === action.payload);
      if (message) {
        message.isRead = true;
      }
    },
    setPitBossOnlineStatus: (state, action: PayloadAction<boolean>) => {
      state.pitBossOnline = action.payload;
    },
    resetDailyPrizes: (state) => {
      state.dailyPrizesRemaining = 3;
    },
  },
  extraReducers: (builder) => {
    // Fetch jackpot games
    builder
      .addCase(fetchJackpotGames.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchJackpotGames.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jackpotGames = action.payload;
        state.totalJackpotPool = action.payload.reduce((sum, game) => sum + game.currentJackpot, 0);
      })
      .addCase(fetchJackpotGames.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch jackpot games';
      })
      // Fetch random prizes
      .addCase(fetchRandomPrizes.fulfilled, (state, action) => {
        state.availablePrizes = action.payload;
      })
      // Claim random prize
      .addCase(claimRandomPrize.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(claimRandomPrize.fulfilled, (state, action) => {
        state.isLoading = false;
        const prizeIndex = state.availablePrizes.findIndex(p => p.id === action.payload);
        if (prizeIndex !== -1) {
          const [claimedPrize] = state.availablePrizes.splice(prizeIndex, 1);
          claimedPrize.claimedAt = new Date().toISOString();
          state.claimedPrizes.push(claimedPrize);
          state.dailyPrizesRemaining = Math.max(0, state.dailyPrizesRemaining - 1);
        }
      })
      // Fetch pit boss messages
      .addCase(fetchPitBossMessages.fulfilled, (state, action) => {
        state.pitBossMessages = action.payload;
      })
      // Request pit boss assistance
      .addCase(requestPitBossAssistance.fulfilled, (state, action) => {
        state.pitBossMessages.unshift(action.payload);
        state.assistanceRequests += 1;
      })
      // Enter jackpot game
      .addCase(enterJackpotGame.fulfilled, (state, action) => {
        const game = state.jackpotGames.find(g => g.id === action.payload.gameId);
        if (game) {
          game.participants += 1;
          game.currentJackpot += Math.floor(action.payload.entryFee * 0.8); // 80% goes to jackpot
        }
      });
  },
});

export const {
  updateJackpotAmount,
  markMessageAsRead,
  setPitBossOnlineStatus,
  resetDailyPrizes,
} = gamingFeaturesSlice.actions;

export default gamingFeaturesSlice.reducer;
