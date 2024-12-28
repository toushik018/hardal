import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface GuestCountState {
  count: number | null;
}

const initialState: GuestCountState = {
  count: null,
};

export const guestCountSlice = createSlice({
  name: 'guestCount',
  initialState,
  reducers: {
    setGuestCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
    clearGuestCount: (state) => {
      state.count = null;
    },
  },
});

export const { setGuestCount, clearGuestCount } = guestCountSlice.actions;

export const selectGuestCount = (state: RootState): number | null => state.guestCount.count;

export default guestCountSlice.reducer; 