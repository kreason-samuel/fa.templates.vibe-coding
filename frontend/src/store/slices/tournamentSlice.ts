import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Tournament, TournamentState, TournamentStatus, ApiResponse } from '../../types';

// Mock tournament data
const mockTournaments: Tournament[] = [
  {
    id: '1',
    name: 'Winter Championship 2024',
    gameType: 'Poker',
    startDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Next week
    maxParticipants: 100,
    currentParticipants: 45,
    prizePool: 10000,
    entryFee: 100,
    status: TournamentStatus.Registration,
    description: 'Elite poker championship with massive prizes',
    rules: ['No Limit Texas Hold\'em', 'Starting chips: 10,000', 'Blinds increase every 15 minutes'],
    organizerId: 'org-1',
    createdAt: '2024-12-01T00:00:00Z',
    updatedAt: '2024-12-25T00:00:00Z',
  },
  {
    id: '2',
    name: 'Speed Blackjack Tournament',
    gameType: 'Blackjack',
    startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    maxParticipants: 50,
    currentParticipants: 23,
    prizePool: 5000,
    entryFee: 50,
    status: TournamentStatus.Registration,
    description: 'Fast-paced blackjack tournament',
    rules: ['Speed blackjack rules', 'Quick decisions required', 'Top 10 advance to finals'],
    organizerId: 'org-2',
    createdAt: '2024-12-10T00:00:00Z',
    updatedAt: '2024-12-25T00:00:00Z',
  },
  {
    id: '3',
    name: 'Slots Master Challenge',
    gameType: 'Slots',
    startDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // In 2 hours
    endDate: new Date(Date.now() + 26 * 60 * 60 * 1000).toISOString(),
    maxParticipants: 200,
    currentParticipants: 178,
    prizePool: 15000,
    entryFee: 25,
    status: TournamentStatus.Registration,
    description: 'Ultimate slots competition',
    rules: ['Classic slots gameplay', 'Maximum 100 spins per round', 'Highest score wins'],
    organizerId: 'org-3',
    createdAt: '2024-12-15T00:00:00Z',
    updatedAt: '2024-12-25T00:00:00Z',
  },
  {
    id: '4',
    name: 'Roulette Royale',
    gameType: 'Roulette',
    startDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // Started 2 hours ago
    endDate: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(),
    maxParticipants: 75,
    currentParticipants: 75,
    prizePool: 7500,
    entryFee: 75,
    status: TournamentStatus.Active,
    description: 'Royal roulette tournament in progress',
    rules: ['European roulette rules', 'Live dealer format', 'Real-time scoring'],
    organizerId: 'org-4',
    createdAt: '2024-12-20T00:00:00Z',
    updatedAt: '2024-12-25T00:00:00Z',
  },
];

// Mock API calls
const tournamentAPI = {
  getTournaments: async (): Promise<ApiResponse<Tournament[]>> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return {
      success: true,
      data: mockTournaments,
    };
  },

  joinTournament: async (tournamentId: string, userId: string): Promise<ApiResponse<{ success: boolean }>> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const tournament = mockTournaments.find(t => t.id === tournamentId);
    if (!tournament) {
      return {
        success: false,
        error: 'Tournament not found',
      };
    }
    
    if (tournament.currentParticipants >= tournament.maxParticipants) {
      return {
        success: false,
        error: 'Tournament is full',
      };
    }
    
    if (tournament.status !== 'registration') {
      return {
        success: false,
        error: 'Registration is closed',
      };
    }
    
    // Update participant count
    tournament.currentParticipants += 1;
    
    // Mock user joining - in real app, would persist user registration
    console.log(`User ${userId} joined tournament ${tournamentId}`);
    
    return {
      success: true,
      data: { success: true },
    };
  },
};

// Async thunks
export const fetchTournaments = createAsyncThunk(
  'tournaments/fetchTournaments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await tournamentAPI.getTournaments();
      if (response.success && response.data) {
        return response.data;
      } else {
        return rejectWithValue(response.error || 'Failed to fetch tournaments');
      }
    } catch (error) {
      return rejectWithValue('Network error. Please try again.');
    }
  }
);

export const joinTournament = createAsyncThunk(
  'tournaments/joinTournament',
  async ({ tournamentId, userId }: { tournamentId: string; userId: string }, { rejectWithValue }) => {
    try {
      const response = await tournamentAPI.joinTournament(tournamentId, userId);
      if (response.success) {
        return { tournamentId };
      } else {
        return rejectWithValue(response.error || 'Failed to join tournament');
      }
    } catch (error) {
      return rejectWithValue('Network error. Please try again.');
    }
  }
);

const initialState: TournamentState = {
  tournaments: [],
  userTournaments: [],
  isLoading: false,
  error: null,
};

const tournamentSlice = createSlice({
  name: 'tournaments',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setTournaments: (state, action: PayloadAction<Tournament[]>) => {
      state.tournaments = action.payload;
    },
    setUserTournaments: (state, action: PayloadAction<Tournament[]>) => {
      state.userTournaments = action.payload;
    },
    updateTournamentParticipants: (state, action: PayloadAction<{ tournamentId: string; count: number }>) => {
      const tournament = state.tournaments.find(t => t.id === action.payload.tournamentId);
      if (tournament) {
        tournament.currentParticipants = action.payload.count;
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch tournaments cases
    builder
      .addCase(fetchTournaments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTournaments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tournaments = action.payload;
        state.error = null;
      })
      .addCase(fetchTournaments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Join tournament cases
      .addCase(joinTournament.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(joinTournament.fulfilled, (state, action) => {
        state.isLoading = false;
        // Update participant count
        const tournament = state.tournaments.find(t => t.id === action.payload.tournamentId);
        if (tournament) {
          tournament.currentParticipants += 1;
        }
        state.error = null;
      })
      .addCase(joinTournament.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setTournaments, setUserTournaments, updateTournamentParticipants } = tournamentSlice.actions;
export default tournamentSlice.reducer;
