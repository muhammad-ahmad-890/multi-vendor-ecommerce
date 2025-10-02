import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AdminUser } from "../../types/auth";

export interface AuthState {
  user: AdminUser | null;
  token: string | null;
  status: "idle" | "loading" | "authenticated" | "unauthenticated";
  error: string | null;
  initialized: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
  initialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ user: AdminUser; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.status = "authenticated";
      state.error = null;
      state.initialized = true;
    },
    setLoading(state) {
      state.status = "loading";
      state.error = null;
    },
    setError(state, action: PayloadAction<string>) {
      state.status = "unauthenticated";
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = "unauthenticated";
      state.error = null;
      state.initialized = true;
    },
    resetAuth() {
      return initialState;
    },
  },
});

export const { setUser, setLoading, setError, logout, resetAuth } =
  authSlice.actions;
export default authSlice.reducer;
