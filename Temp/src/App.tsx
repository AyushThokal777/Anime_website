import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AnimeProvider } from './context/AnimeContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { AuthModal } from './components/auth/AuthModal';

import { HomePage } from './pages/HomePage';
import { AnimeDetailsPage } from './pages/AnimeDetailsPage';
import { VideoPlayerPage } from './pages/VideoPlayerPage';
import { DiscoverPage } from './pages/DiscoverPage';
import { WatchlistPage } from './pages/WatchlistPage';
import { TrendingPage } from './pages/TrendingPage';
import { GenresPage } from './pages/GenresPage';
import { MoviesPage } from './pages/MoviesPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AnimeProvider>
          <div className="flex flex-col min-h-screen bg-[#08080c] text-slate-100">
            {/* Sticky Translucent Navbar */}
            <Navbar />

            {/* Main Application Routing */}
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/discover" element={<DiscoverPage />} />
                <Route path="/trending" element={<TrendingPage />} />
                <Route path="/genres" element={<GenresPage />} />
                <Route path="/movies" element={<MoviesPage />} />
                <Route path="/watchlist" element={<WatchlistPage />} />
                <Route path="/anime/:id" element={<AnimeDetailsPage />} />
                <Route path="/watch/:id" element={<VideoPlayerPage />} />
                {/* Fallback route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            {/* Global Footer */}
            <Footer />

            {/* Toast System & Auth Modal */}
            <ToastContainer />
            <AuthModal />
          </div>
        </AnimeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
