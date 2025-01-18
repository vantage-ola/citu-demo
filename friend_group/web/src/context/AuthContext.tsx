import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../utils/Types';
import { api } from '../services/API';

interface AuthContextType {
  user: User | null;
  login: (user: User, accessToken: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      api.setToken(token);
      api
        .getUsers() // Or fetch the current user if an endpoint exists
        .then((users) => {
          const jwtPayload = parseJwt(token);
          const currentUser = jwtPayload ? users.find((u) => u.id === Number(jwtPayload.user_id)) : null; // Replace parseJwt logic with your own.
          if (currentUser) {
            setUser(currentUser);
          } else {
            logout();
          }
        })
        .catch(() => logout());
    }
  }, []);

  const login = (user: User, accessToken: string) => {
    setUser(user);
    localStorage.setItem('access', accessToken);
    api.setToken(accessToken);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    window.location.href = ('/');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Utility function to decode JWT (if needed)
interface JwtPayload {
  user_id: string;
  // Add other properties if needed
}

function parseJwt(token: string): JwtPayload | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}
