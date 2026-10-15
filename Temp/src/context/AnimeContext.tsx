import React, { createContext, useContext, useState, useEffect } from 'react';
import { Anime, WatchlistItem, WatchlistStatus, WatchHistoryItem } from '../types/anime';
import { MOCK_ANIME_LIST } from '../data/mockAnime';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AnimeContextType {
  watchlist: WatchlistItem[];
  favorites: number[];
  watchHistory: WatchHistoryItem[];
  toasts: ToastMessage[];
  addToWatchlist: (anime: Anime, status?: WatchlistStatus) => void;
  removeFromWatchlist: (animeId: number) => void;
  updateWatchlistStatus: (animeId: number, status: WatchlistStatus) => void;
  isInWatchlist: (animeId: number) => boolean;
  getWatchlistItem: (animeId: number) => WatchlistItem | undefined;
  toggleFavorite: (anime: Anime) => void;
  isFavorite: (animeId: number) => boolean;
  updateWatchProgress: (
    animeId: number,
    animeTitle: string,
    animePoster: string,
    episodeNumber: number,
    episodeTitle: string,
    currentTime: number,
    duration: number
  ) => void;
  getContinueWatching: () => WatchHistoryItem[];
  removeHistoryItem: (animeId: number) => void;
  clearHistory: () => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  dismissToast: (id: string) => void;
}

const INITIAL_WATCHLIST: WatchlistItem[] = [
  {
    anime: MOCK_ANIME_LIST[0], // Solo Leveling
    status: 'watching',
    addedAt: '2024-10-10T12:00:00Z',
    updatedAt: '2024-10-14T15:30:00Z',
    currentEpisode: 3,
  },
  {
    anime: MOCK_ANIME_LIST[2], // Frieren
    status: 'watching',
    addedAt: '2024-10-08T12:00:00Z',
    updatedAt: '2024-10-12T19:20:00Z',
    currentEpisode: 14,
  },
  {
    anime: MOCK_ANIME_LIST[1], // Jujutsu Kaisen S2
    status: 'completed',
    addedAt: '2024-09-20T12:00:00Z',
    updatedAt: '2024-10-01T20:00:00Z',
    currentEpisode: 23,
    userRating: 10,
  },
  {
    anime: MOCK_ANIME_LIST[3], // Demon Slayer
    status: 'plan_to_watch',
    addedAt: '2024-10-11T10:00:00Z',
    updatedAt: '2024-10-11T10:00:00Z',
  },
];

const INITIAL_HISTORY: WatchHistoryItem[] = [
  {
    animeId: MOCK_ANIME_LIST[0].mal_id, // Solo Leveling
    animeTitle: 'Solo Leveling',
    animePoster: MOCK_ANIME_LIST[0].images.jpg.large_image_url,
    episodeNumber: 3,
    episodeTitle: 'It\'s Like a Game',
    currentTime: 780,
    duration: 1440,
    lastWatched: '2024-10-15T10:20:00Z',
  },
  {
    animeId: MOCK_ANIME_LIST[2].mal_id, // Frieren
    animeTitle: 'Frieren: Beyond Journey\'s End',
    animePoster: MOCK_ANIME_LIST[2].images.jpg.large_image_url,
    episodeNumber: 1,
    episodeTitle: 'The Journey\'s End',
    currentTime: 1200,
    duration: 1440,
    lastWatched: '2024-10-14T18:45:00Z',
  },
];

const AnimeContext = createContext<AnimeContextType | undefined>(undefined);

export const AnimeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(() => {
    const saved = localStorage.getItem('animeverse_watchlist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_WATCHLIST;
      }
    }
    return INITIAL_WATCHLIST;
  });

  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('animeverse_favorites');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [52299, 52991];
      }
    }
    return [52299, 52991];
  });

  const [watchHistory, setWatchHistory] = useState<WatchHistoryItem[]>(() => {
    const saved = localStorage.getItem('animeverse_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_HISTORY;
      }
    }
    return INITIAL_HISTORY;
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    localStorage.setItem('animeverse_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem('animeverse_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('animeverse_history', JSON.stringify(watchHistory));
  }, [watchHistory]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToWatchlist = (anime: Anime, status: WatchlistStatus = 'watching') => {
    setWatchlist((prev) => {
      const existing = prev.find((item) => item.anime.mal_id === anime.mal_id);
      if (existing) {
        const updated = prev.map((item) =>
          item.anime.mal_id === anime.mal_id
            ? { ...item, status, updatedAt: new Date().toISOString() }
            : item
        );
        showToast(`Updated "${anime.title}" status to ${status.replace(/_/g, ' ')}`, 'info');
        return updated;
      } else {
        const newItem: WatchlistItem = {
          anime,
          status,
          addedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          currentEpisode: 1,
        };
        showToast(`Added "${anime.title}" to Watchlist`, 'success');
        return [newItem, ...prev];
      }
    });
  };

  const removeFromWatchlist = (animeId: number) => {
    setWatchlist((prev) => {
      const item = prev.find((i) => i.anime.mal_id === animeId);
      const title = item ? item.anime.title : 'Anime';
      showToast(`Removed "${title}" from Watchlist`, 'info');
      return prev.filter((i) => i.anime.mal_id !== animeId);
    });
  };

  const updateWatchlistStatus = (animeId: number, status: WatchlistStatus) => {
    setWatchlist((prev) =>
      prev.map((item) =>
        item.anime.mal_id === animeId
          ? { ...item, status, updatedAt: new Date().toISOString() }
          : item
      )
    );
    showToast(`Updated status to ${status.replace(/_/g, ' ')}`, 'info');
  };

  const isInWatchlist = (animeId: number) => {
    return watchlist.some((item) => item.anime.mal_id === animeId);
  };

  const getWatchlistItem = (animeId: number) => {
    return watchlist.find((item) => item.anime.mal_id === animeId);
  };

  const toggleFavorite = (anime: Anime) => {
    setFavorites((prev) => {
      if (prev.includes(anime.mal_id)) {
        showToast(`Removed "${anime.title}" from Favorites`, 'info');
        return prev.filter((id) => id !== anime.mal_id);
      } else {
        showToast(`Added "${anime.title}" to Favorites! ❤️`, 'success');
        return [...prev, anime.mal_id];
      }
    });
  };

  const isFavorite = (animeId: number) => {
    return favorites.includes(animeId);
  };

  const updateWatchProgress = (
    animeId: number,
    animeTitle: string,
    animePoster: string,
    episodeNumber: number,
    episodeTitle: string,
    currentTime: number,
    duration: number
  ) => {
    setWatchHistory((prev) => {
      const filtered = prev.filter((item) => item.animeId !== animeId);
      const newItem: WatchHistoryItem = {
        animeId,
        animeTitle,
        animePoster,
        episodeNumber,
        episodeTitle,
        currentTime: Math.floor(currentTime),
        duration: Math.floor(duration || 1440),
        lastWatched: new Date().toISOString(),
      };
      return [newItem, ...filtered].slice(0, 20); // Keep last 20
    });

    // Also update currentEpisode in watchlist if it exists
    setWatchlist((prev) =>
      prev.map((item) =>
        item.anime.mal_id === animeId
          ? {
              ...item,
              currentEpisode: Math.max(item.currentEpisode || 1, episodeNumber),
              updatedAt: new Date().toISOString(),
            }
          : item
      )
    );
  };

  const getContinueWatching = () => {
    return watchHistory;
  };

  const removeHistoryItem = (animeId: number) => {
    setWatchHistory((prev) => prev.filter((item) => item.animeId !== animeId));
    showToast('Removed from watch history', 'info');
  };

  const clearHistory = () => {
    setWatchHistory([]);
    showToast('Watch history cleared', 'info');
  };

  return (
    <AnimeContext.Provider
      value={{
        watchlist,
        favorites,
        watchHistory,
        toasts,
        addToWatchlist,
        removeFromWatchlist,
        updateWatchlistStatus,
        isInWatchlist,
        getWatchlistItem,
        toggleFavorite,
        isFavorite,
        updateWatchProgress,
        getContinueWatching,
        removeHistoryItem,
        clearHistory,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </AnimeContext.Provider>
  );
};

export const useAnime = () => {
  const context = useContext(AnimeContext);
  if (!context) {
    throw new Error('useAnime must be used within an AnimeProvider');
  }
  return context;
};
