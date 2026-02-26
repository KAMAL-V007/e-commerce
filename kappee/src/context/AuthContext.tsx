import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("brew-haven-user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("brew-haven-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("brew-haven-user");
    }
  }, [user]);

  const login = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("brew-haven-users") || "[]");
    const found = users.find(
      (u: any) => u.email === email && u.password === password
    );
    if (found) {
      setUser({ email: found.email, name: found.name });
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("brew-haven-users") || "[]");
    if (users.find((u: any) => u.email === email)) return false;
    users.push({ name, email, password });
    localStorage.setItem("brew-haven-users", JSON.stringify(users));
    setUser({ email, name });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
