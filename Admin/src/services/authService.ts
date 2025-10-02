import { LoginRequest, LoginResponse, AdminUser } from "../types/auth";
import { apiService } from "./apiService";
import { store } from "../store";
import {
  setUser,
  setLoading,
  setError,
  logout,
} from "../store/slices/authSlice";

export type { AdminUser } from "../types/auth";

// Initialize auth state from localStorage on app start
export function initializeAuth() {
  const token = apiService.getAuthToken();
  
  if (token) {
    // You might want to validate the token with the backend here
    // For now, we'll just check if it exists
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user) {
      store.dispatch(setUser({ user, token }));
    } else {
      // Token exists but no user data, clear it
      apiService.removeAuthToken();
      store.dispatch(logout());
    }
  } else {
    store.dispatch(logout());
  }
}

export async function loginWithEmailPassword(
  email: string,
  password: string
): Promise<AdminUser> {
  try {
    store.dispatch(setLoading());

    const credentials: LoginRequest = { email, password };
    const response: LoginResponse = await apiService.login(credentials);

    if (response.success) {
      const { user, authToken } = response.data;

      // Store token and user data in localStorage
      apiService.setAuthToken(authToken);
      localStorage.setItem("user", JSON.stringify(user));

      // Update Redux store
      store.dispatch(setUser({ user, token: authToken }));

      return user;
    } else {
      throw new Error(response.message || "Login failed");
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Login failed";
    store.dispatch(setError(errorMessage));
    throw error;
  }
}

export async function logoutUser(): Promise<void> {
  try {
    // Clear localStorage
    apiService.removeAuthToken();
    localStorage.removeItem("user");

    // Update Redux store
    store.dispatch(logout());
  } catch (error) {
    console.error("Logout error:", error);
    // Even if there's an error, we should still clear the local state
    store.dispatch(logout());
  }
}

export function getCurrentUser(): AdminUser | null {
  const state = store.getState();
  return state.auth.user;
}

export function getAuthToken(): string | null {
  const state = store.getState();
  return state.auth.token;
}

export function isAuthenticated(): boolean {
  const state = store.getState();
  return state.auth.status === "authenticated" && !!state.auth.user;
}

export function mapAuthError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "Authentication failed. Please try again.";
}
