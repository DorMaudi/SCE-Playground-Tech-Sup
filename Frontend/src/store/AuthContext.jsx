// frontend/src/store/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider handles user state, token storage, etc.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // store entire user object
  const [token, setToken] = useState(null);

  // Load token from localStorage (or sessionStorage) on initial load.
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Save token to localStorage whenever it changes
  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  const signIn = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
  };

  const signOut = () => {
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    signIn,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
