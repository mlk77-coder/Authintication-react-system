import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, AuthState, LoginCredentials, RegisterData } from '../types/auth';
import { api } from '../services/api';
import toast from 'react-hot-toast';

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial auth state
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true
};

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);

  // Check for existing token on mount
  useEffect(() => {
    const initialize = async () => {
      const token = localStorage.getItem('auth_token');
      
      if (token) {
        try {
          const user = await api.getUserProfile(token);
          setState({
            user,
            token,
            isAuthenticated: true,
            isLoading: false
          });
        } catch (error) {
          // Invalid token, clear storage
          localStorage.removeItem('auth_token');
          setState({
            ...initialState,
            isLoading: false
          });
        }
      } else {
        setState({
          ...initialState,
          isLoading: false
        });
      }
    };

    initialize();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials) => {
    try {
      const { token, user } = await api.login(credentials);
      
      // Save token to localStorage
      localStorage.setItem('auth_token', token);
      
      // Update state
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false
      });
      
      toast.success('Logged in successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to login');
      throw error;
    }
  };

  // Register function
  const register = async (data: RegisterData) => {
    try {
      const { token, user } = await api.register(data);
      
      // Save token to localStorage
      localStorage.setItem('auth_token', token);
      
      // Update state
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false
      });
      
      toast.success('Registered successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to register');
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    // Remove token
    localStorage.removeItem('auth_token');
    
    // Reset state
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false
    });
    
    toast.success('Logged out successfully!');
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};