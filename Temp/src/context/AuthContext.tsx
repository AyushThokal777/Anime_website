import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types/anime';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup';
  openLoginModal: () => void;
  openSignUpModal: () => void;
  closeAuthModal: () => void;
  login: (email: string, name?: string) => void;
  signup: (name: string, email: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'usr-1049',
  name: 'Ren Shindo',
  email: 'ren.anime@animeverse.tv',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop',
  joinedDate: 'October 2024',
  favoriteGenres: ['Action', 'Fantasy', 'Sci-Fi'],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('animeverse_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_USER;
      }
    }
    return DEFAULT_USER; // Default logged in for pleasant demo experience
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    if (user) {
      localStorage.setItem('animeverse_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('animeverse_user');
    }
  }, [user]);

  const openLoginModal = () => {
    setAuthModalMode('login');
    setIsAuthModalOpen(true);
  };

  const openSignUpModal = () => {
    setAuthModalMode('signup');
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = (email: string, name?: string) => {
    const newUser: UserProfile = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name: name || email.split('@')[0] || 'Anime Explorer',
      email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop',
      joinedDate: 'Just now',
      favoriteGenres: ['Action', 'Adventure'],
    };
    setUser(newUser);
    closeAuthModal();
  };

  const signup = (name: string, email: string) => {
    const newUser: UserProfile = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name,
      email,
      avatar: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=256&auto=format&fit=crop',
      joinedDate: 'Just now',
      favoriteGenres: ['Action', 'Fantasy'],
    };
    setUser(newUser);
    closeAuthModal();
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthModalOpen,
        authModalMode,
        openLoginModal,
        openSignUpModal,
        closeAuthModal,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
