import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAnime } from '../../context/AnimeContext';
import {
  Search,
  Bookmark,
  Sparkles,
  Menu,
  X,
  Compass,
  Flame,
  Film,
  Layers,
  LogOut,
  User,
  Heart,
  PlaySquare,
  ChevronDown,
} from 'lucide-react';
import { SearchModal } from '../search/SearchModal';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, openLoginModal, openSignUpModal, logout } = useAuth();
  const { watchlist, favorites } = useAnime();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut CMD+K or / to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Discover', path: '/discover' },
    { name: 'Trending', path: '/trending' },
    { name: 'Genres', path: '/genres' },
    { name: 'Movies', path: '/movies' },
    { name: 'My Watchlist', path: '/watchlist', badge: watchlist.length },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav py-3 shadow-2xl'
            : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo with Anime-themed Brand Mark */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group shrink-0 focus:outline-none"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-rose-500 to-purple-600 shadow-neon-red group-hover:shadow-neon-purple transition-all duration-300">
              <span className="font-black text-xl text-white tracking-tighter">A</span>
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-tr from-rose-500 to-purple-500 opacity-0 group-hover:opacity-40 blur transition-all" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-xl font-black tracking-wider text-white font-display">
                  ANIME<span className="text-rose-500 glow-text-red">VERSE</span>
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-black uppercase tracking-widest bg-purple-600/30 text-purple-400 rounded border border-purple-500/30">
                  PRO
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 -mt-1 font-semibold">
                Streaming & Discovery
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-white/[0.04] p-1.5 rounded-full border border-white/5 backdrop-blur-md">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-neon-red'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <span>{link.name}</span>
                {typeof link.badge === 'number' && link.badge > 0 && (
                  <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-rose-950 text-rose-300 border border-rose-500/40">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center gap-3">
            {/* Quick Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-300 hover:text-white text-xs font-medium transition-all group"
              title="Search Anime (Ctrl+K or /)"
            >
              <Search className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden md:inline text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-slate-400 border border-white/10 font-mono">
                /
              </kbd>
            </button>

            {/* User Profile or Login/Sign Up */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-all text-left"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-rose-500/60"
                  />
                  <span className="text-xs font-bold text-white hidden sm:inline max-w-[90px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-[#11121a] border border-white/10 rounded-2xl shadow-2xl p-2 z-40 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="p-3 border-b border-white/5">
                        <p className="text-xs font-bold text-white truncate">{user.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                        <div className="mt-2 flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                            VIP Otaku Member
                          </span>
                        </div>
                      </div>

                      <div className="py-1">
                        <Link
                          to="/watchlist"
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                        >
                          <Bookmark className="w-4 h-4 text-purple-400" />
                          <span>My Watchlist ({watchlist.length})</span>
                        </Link>
                        <Link
                          to="/watchlist?tab=favorites"
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                        >
                          <Heart className="w-4 h-4 text-rose-400" />
                          <span>Favorites ({favorites.length})</span>
                        </Link>
                      </div>

                      <div className="pt-1 border-t border-white/5">
                        <button
                          onClick={() => {
                            setIsProfileDropdownOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={openLoginModal}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  Login
                </button>
                <button
                  onClick={openSignUpModal}
                  className="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-rose-500 to-rose-600 shadow-neon-red hover:shadow-neon-purple hover:brightness-110 active:scale-95 transition-all"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white bg-white/[0.05] border border-white/10"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden glass-modal border-t border-white/10 mt-3 px-4 py-5 shadow-2xl animate-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors ${
                      isActive
                        ? 'bg-rose-500 text-white font-bold'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  <span>{link.name}</span>
                  {typeof link.badge === 'number' && link.badge > 0 && (
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-rose-950 text-rose-300">
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              ))}

              <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2">
                {!isAuthenticated ? (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        openLoginModal();
                      }}
                      className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold text-center"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        openSignUpModal();
                      }}
                      className="w-full py-2.5 rounded-xl bg-rose-500 text-white text-xs font-bold text-center shadow-neon-red"
                    >
                      Sign Up
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      logout();
                    }}
                    className="w-full py-2.5 rounded-xl bg-white/5 text-rose-400 text-xs font-bold text-center"
                  >
                    Log Out
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
