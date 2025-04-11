import { createContext, useContext, useState, useEffect } from 'react';

// Created to manage authentication state
const AuthContext = createContext();

// Provides the auth context to child components of the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user: { userId, username, email }

  // Placeholder for future initialization logic
  useEffect(() => {
  }, []);

  // Function to set user state with userData after successful authentication
  const login = (userData) => {
    setUser(userData);
  };

  // Logout function to clear the user state (if/when we need it)
  const logout = () => {
    setUser(null);
  };

  // Provide the auth context to child components, exposing user, login, and logout
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
