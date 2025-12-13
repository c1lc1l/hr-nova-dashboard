import { useState, useEffect, useCallback } from 'react';
import { User } from '@/types';
import { authApi } from '@/services/api';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('hr_nova_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const user = await authApi.login(email, password);
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('hr_nova_user', JSON.stringify(user));
      return user;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await authApi.logout();
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('hr_nova_user');
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout
  };
}
