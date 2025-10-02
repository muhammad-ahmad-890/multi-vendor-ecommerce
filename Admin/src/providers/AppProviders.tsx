import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { initializeAuth } from "../services/authService";
import { Toaster } from "sonner";

type AppProvidersProps = {
  children: React.ReactNode;
};

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  useEffect(() => {
    // Initialize auth state from localStorage
    initializeAuth();
  }, []);

  return (
    <Provider store={store}>
      {children}
      <Toaster position="top-right" richColors />
    </Provider>
  );
};

export default AppProviders;
