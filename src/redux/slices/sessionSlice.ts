import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SessionState {
  apiToken: string | null;
  currency: string;
  isInitialized: boolean;
}

const initialState: SessionState = {
  apiToken: null,
  currency: "€",
  isInitialized: false,
};

const sessionSlice = createSlice({
  name: "SESSION_CONTROLLER",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.apiToken = action.payload;
      state.isInitialized = true;
    },
    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    },
    clearToken: (state) => {
      state.apiToken = null;
      state.currency = "€";
      state.isInitialized = false;
    },
  },
});

export const { setToken, clearToken, setCurrency } = sessionSlice.actions;
export default sessionSlice.reducer; 