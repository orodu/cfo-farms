import React, { createContext, useState, useContext, useEffect } from 'react';
import { appParams } from '@/lib/app-params';

const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = 'cfo_farms_auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [appPublicSettings, setAppPublicSettings] = useState({ id: 'cfo-farms' });

  useEffect(() => {
    checkUserAuth();
    setIsLoadingPublicSettings(false);
  }, []);

  const checkAppState = async () => {
    setAppPublicSettings({ id: 'cfo-farms' });
  };

  const checkUserAuth = async () => {
    setIsLoadingAuth(true);
    try {
      const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
      if (storedAuth) {
        const authData = JSON.parse(storedAuth);
        // Check if session is still valid (24 hours)
        const sessionAge = Date.now() - authData.timestamp;
        if (sessionAge < 24 * 60 * 60 * 1000) { // 24 hours
          setUser(authData.user);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const login = async (userData) => {
    const authData = {
      user: userData,
      timestamp: Date.now()
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
    setUser(userData);
    setIsAuthenticated(true);
    setAuthError(null);
  };

  const logout = (shouldRedirect = true) => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
    setIsAuthenticated(false);
    setAuthError(null);
  };

  const navigateToLogin = () => {
    // This will be handled by the ProtectedRoute component
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoadingAuth,
        isLoadingPublicSettings,
        authError,
        appPublicSettings,
        checkAppState,
        checkUserAuth,
        login,
        logout,
        navigateToLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
