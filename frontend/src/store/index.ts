import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import marketplaceSlice from './slices/marketplaceSlice';
import uiSlice from './slices/uiSlice';
import tournamentSlice from './slices/tournamentSlice';
import gamingSlice from './slices/gamingSlice';
import gamingFeaturesSlice from './slices/gamingFeaturesSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    marketplace: marketplaceSlice,
    ui: uiSlice,
    tournaments: tournamentSlice,
    gaming: gamingSlice,
    gamingFeatures: gamingFeaturesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
