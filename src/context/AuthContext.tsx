import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  login: (username: string, role: UserRole) => boolean;
  register: (username: string, name: string, role?: UserRole) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('school_kitchen_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (username: string, role: UserRole) => {
    // In a real app, we would verify credentials here
    // For this demo, we'll check if the user exists in "registered_users"
    // or allow admin/admin default
    
    let foundUser: User | null = null;

    if (username === 'admin') {
       foundUser = { username: 'admin', role: 'admin', name: 'Administrator' };
    } else {
       const registeredUsersStr = localStorage.getItem('registered_users');
       const registeredUsers: User[] = registeredUsersStr ? JSON.parse(registeredUsersStr) : [];
       foundUser = registeredUsers.find(u => u.username === username) || null;
       
       // Fallback for demo if not registered but just typing a name
       if (!foundUser) {
         foundUser = {
           username,
           role: 'student',
           name: username.charAt(0).toUpperCase() + username.slice(1)
         };
       }
    }

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('school_kitchen_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const register = (username: string, name: string, role: UserRole = 'student') => {
    const newUser: User = { username, name, role };
    
    const registeredUsersStr = localStorage.getItem('registered_users');
    const registeredUsers: User[] = registeredUsersStr ? JSON.parse(registeredUsersStr) : [];
    
    // Check if already exists
    if (registeredUsers.some(u => u.username === username)) {
      return false;
    }

    const updatedUsers = [...registeredUsers, newUser];
    localStorage.setItem('registered_users', JSON.stringify(updatedUsers));
    
    // Auto login
    setUser(newUser);
    localStorage.setItem('school_kitchen_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('school_kitchen_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
