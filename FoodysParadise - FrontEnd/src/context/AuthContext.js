import React, { createContext, useContext, useState } from "react";
import axios from "axios";

// Minimal auth context: JWT in localStorage, attached to every axios request
// via the default Authorization header. There was no auth of any kind in
// the old app -- this is new, additive infrastructure, not a refactor of
// how Search/Cuisines/Recipe already call the API.
const AuthContext = createContext(null);

const TOKEN_KEY = "foodysparadise_token";
const USER_KEY = "foodysparadise_user";

function applyAuthHeader(token) {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}

// Runs once at module load, synchronously -- NOT inside a useEffect. A
// useEffect here ran AFTER child components' own effects (React fires child
// effects before parent effects on mount), so pages like MyFridge/Favorites
// fired their GET /api/fridge and GET /api/favorites calls before this ever
// attached the Authorization header, and got 403s on an otherwise-valid
// saved session. Module-load-time execution guarantees it's set before any
// component effect can possibly run.
applyAuthHeader(localStorage.getItem(TOKEN_KEY));

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email, password) => {
    const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/auth/login`, { email, password });
    persistSession(response.data);
  };

  const signup = async (email, password) => {
    const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/auth/signup`, { email, password });
    persistSession(response.data);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    applyAuthHeader(null);
    setUser(null);
  };

  const persistSession = ({ user: sessionUser, token }) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(sessionUser));
    applyAuthHeader(token);
    setUser(sessionUser);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
