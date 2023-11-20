import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../utils/AuthContext';

export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');

  }
  return context;
}