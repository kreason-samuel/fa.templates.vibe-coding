import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { JackpotGame, Prize, GameSession, GamingState, ApiResponse } from '../../types';

// Mock gaming data
const mockJackpotGames: JackpotGame[] = [
  {
    id: '1',
    name: 'Mega Fortune',
    currentJackpot: 1250000,
    minimumBet: 10,
    lastWinner: 'PlayerX123',
    lastWinDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    isActive: true,
    imageUrl: '/api/placeholder/300/200',
  },
  {
    id: '2',
    name: 'Golden Dragon',
    currentJackpot: 875000,
    minimumBet: 5,
    isActive: true,
    imageUrl: '/api/placeholder/300/200',
  },
  {
    id: '3',
    name: 'Diamond Rush',
    currentJackpot: 2100000,
    minimumBet: 20,
    lastWinner: 'LuckyPlayer99',
    lastWinDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    isActive: true,
    imageUrl: '/api/placeholder/300/200',
  },
];

const mockPrizes: Prize[] = [
  {
    id: '1',
    name: '1000 Bonus Credits',
    value: 1000,
    type: 'credits' as any,
    isAvailable: true,
    imageUrl: '/api/placeholder/150/150',
  },
  {
    id: '2',
    name: 'Premium Account Upgrade',
    value: 50,
    type: 'service' as any,
    isAvailable: true,
    imageUrl: '/api/placeholder/150/150',
  },
  {
    id: '3',
    name: 'Gaming Headset',
    value: 199,
    type: 'physical' as any,
    isAvailable: true,
    imageUrl: '/api/placeholder/150/150',
  },
  {
    id: '4',
    name: 'VIP Tournament Entry',
    value: 500,
    type: 'experience' as any,
    isAvailable: true,
    imageUrl: '/api/placeholder/150/150',
  },
  {
    id: '5',
    name: '$100 Cash Prize',
    value: 100,
    type: 'cash' as any,
    isAvailable: true,
    imageUrl: '/api/placeholder/150/150',
  },
];

// Mock API calls
const gamingAPI = {
  getJackpotGames: async (): Promise<ApiResponse<JackpotGame[]>> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      success: true,
      data: mockJackpotGames,
    };
  },

  getPrizes: async (): Promise<ApiResponse<Prize[]>> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return {
      success: true,
      data: mockPrizes.filter(prize => prize.isAvailable),
    };
  },

  claimRandomPrize: async (userId: string): Promise<ApiResponse<Prize>> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const availablePrizes = mockPrizes.filter(prize => prize.isAvailable);
    if (availablePrizes.length === 0) {
      return {
        success: false,
        error: 'No prizes available',
      };
    }
    
    // Select random prize
    const randomIndex = Math.floor(Math.random() * availablePrizes.length);
    const selectedPrize = availablePrizes[randomIndex];
    
    // Mark as claimed
    selectedPrize.isAvailable = false;
    selectedPrize.claimedBy = userId;
    selectedPrize.claimedAt = new Date().toISOString();
    
    return {
      success: true,
      data: selectedPrize,
    };
  },

  startGameSession: async (userId: string, gameType: string): Promise<ApiResponse<GameSession>> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const session: GameSession = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      gameType,
      startTime: new Date().toISOString(),
      isCompleted: false,
    };
    
    return {
      success: true,
      data: session,
    };
  },

  endGameSession: async (sessionId: string, score: number): Promise<ApiResponse<GameSession>> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock game session update
    const session: GameSession = {
      id: sessionId,
      userId: 'current-user',
      gameType: 'demo',
      startTime: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      endTime: new Date().toISOString(),
      score,
      isCompleted: true,
    };
    
    return {
      success: true,
      data: session,
    };
  },
};

// Async thunks
export const fetchJackpotGames = createAsyncThunk(
  'gaming/fetchJackpotGames',
  async (_, { rejectWithValue }) => {
    try {
      const response = await gamingAPI.getJackpotGames();
      if (response.success && response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.error || 'Failed to fetch jackpot games');
      }
    } catch (error) {
      return rejectWithValue('Network error. Please try again.');
    }
  }
);

export const fetchPrizes = createAsyncThunk(
  'gaming/fetchPrizes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await gamingAPI.getPrizes();
      if (response.success && response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.error || 'Failed to fetch prizes');
      }
    } catch (error) {
      return rejectWithValue('Network error. Please try again.');
    }
  }
);

export const claimRandomPrize = createAsyncThunk(
  'gaming/claimRandomPrize',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await gamingAPI.claimRandomPrize(userId);
      if (response.success && response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.error || 'Failed to claim prize');
      }
    } catch (error) {
      return rejectWithValue('Network error. Please try again.');
    }
  }
);

export const startGameSession = createAsyncThunk(
  'gaming/startGameSession',
  async ({ userId, gameType }: { userId: string; gameType: string }, { rejectWithValue }) => {
    try {
      const response = await gamingAPI.startGameSession(userId, gameType);
      if (response.success && response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.error || 'Failed to start game session');
      }
    } catch (error) {
      return rejectWithValue('Network error. Please try again.');
    }
  }
);

export const endGameSession = createAsyncThunk(
  'gaming/endGameSession',
  async ({ sessionId, score }: { sessionId: string; score: number }, { rejectWithValue }) => {
    try {
      const response = await gamingAPI.endGameSession(sessionId, score);
      if (response.success && response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.error || 'Failed to end game session');
      }
    } catch (error) {
      return rejectWithValue('Network error. Please try again.');
    }
  }
);

const initialState: GamingState = {
  jackpotGames: [],
  freeGames: [],
  prizes: [],
  gameSession: null,
  isLoading: false,
  error: null,
};

const gamingSlice = createSlice({
  name: 'gaming',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setJackpotGames: (state, action: PayloadAction<JackpotGame[]>) => {
      state.jackpotGames = action.payload;
    },
    setPrizes: (state, action: PayloadAction<Prize[]>) => {
      state.prizes = action.payload;
    },
    updateJackpotAmount: (state, action: PayloadAction<{ gameId: string; amount: number }>) => {
      const game = state.jackpotGames.find(g => g.id === action.payload.gameId);
      if (game) {
        game.currentJackpot = action.payload.amount;
      }
    },
    setGameSession: (state, action: PayloadAction<GameSession | null>) => {
      state.gameSession = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch jackpot games cases
    builder
      .addCase(fetchJackpotGames.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchJackpotGames.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jackpotGames = action.payload;
        state.error = null;
      })
      .addCase(fetchJackpotGames.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch prizes cases
      .addCase(fetchPrizes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPrizes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.prizes = action.payload;
        state.error = null;
      })
      .addCase(fetchPrizes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Claim prize cases
      .addCase(claimRandomPrize.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(claimRandomPrize.fulfilled, (state, action) => {
        state.isLoading = false;
        // Remove claimed prize from available prizes
        state.prizes = state.prizes.filter(prize => prize.id !== action.payload.id);
        state.error = null;
      })
      .addCase(claimRandomPrize.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Start game session cases
      .addCase(startGameSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(startGameSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.gameSession = action.payload;
        state.error = null;
      })
      .addCase(startGameSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // End game session cases
      .addCase(endGameSession.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(endGameSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.gameSession = action.payload;
        state.error = null;
      })
      .addCase(endGameSession.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  clearError, 
  setJackpotGames, 
  setPrizes, 
  updateJackpotAmount, 
  setGameSession 
} = gamingSlice.actions;

export default gamingSlice.reducer;
