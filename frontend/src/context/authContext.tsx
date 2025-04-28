import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userImage: string | null;
  userName: string | null;
  login: (image: string, name: string) => void;
  logout: () => void;
  setUserImage: (image: string | null) => void;
  setUserName: (name: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedImage = localStorage.getItem("userImage");
    const storedName = localStorage.getItem("userName");

    setIsAuthenticated(!!token);
    setUserImage(storedImage);
    setUserName(storedName);
  }, []);

  const login = (image: string, name: string) => {
    setIsAuthenticated(true);
    setUserImage(image);
    setUserName(name);
    localStorage.setItem("userImage", image);
    localStorage.setItem("userName", name);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userImage");
    setIsAuthenticated(false);
    setUserImage(null);
    setUserName(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userImage,
        userName,
        login,
        logout,
        setUserImage,
        setUserName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
