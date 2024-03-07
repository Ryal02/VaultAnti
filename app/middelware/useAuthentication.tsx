'use client'
import { useContext } from 'react';
import { AuthContext, AuthContextType } from './AuthContext';

export const useAuthentication = (): boolean => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthentication must be used within an AuthProvider');
  }
  return context.isAuthenticated;
};
