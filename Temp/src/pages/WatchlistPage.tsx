import React from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useAnime } from '../context/AnimeContext';
import { WatchlistStatus, WatchlistItem } from '../types/anime';
import { AnimeCard } from '../components/anime/AnimeCard';
import {
  Bookmark,
  Heart,
  Play,
  Trash2,
  Clock,
  CheckCircle2,
  SlidersHorizontal,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const WatchlistPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { watchlist, favorites, removeFromWatchlist, updateWatchlistStatus } = useAnime();

  const currentTab = searchParams.get('tab') || 'all';

  const filterStatus = (status: string) => {
    setSearchParams(status === 'all' ? {} : { tab: status });
  };

  const filteredWatchlist = watchlist.filter((item: WatchlistItem) => {
    if (currentTab === 'all') return true;
    if (currentTab === 'favorites') return favorites.includes(item.anime.mal_id);
    return item.status === currentTab;
  });

  const watchingCount = watchlist.filter((i: WatchlistItem) => i.status === 'watching').length;
  const completedCount = watchlist.filter((i: WatchlistItem) => i.status === 'completed').length;
  const planToWatchCount = watchlist.filter((i: WatchlistItem) => i.status === 'plan_to_watch').length;

  return (
    <div className="min-h-screen bg-[#08080c] text-slate-100 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header with Stats Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-2.5 h-6 rounded-full bg-purple-500 shadow-neon-purple" />
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-wide font-display">
                My Anime Library
              </h1>
            </div>
            <p className="text-sm text-slate-400">
              Manage your personal watchlist, track series progression, and revisit favorites
            </p>
          </div>

          {/* Quick Stats Pill Cards */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
            <div className="p-3 sm:px-4 sm:py-3 rounded-2xl bg-[#11121a] border border-white/5 text-center">
              <p className="text-lg sm:text-2xl font-black text-rose-400">{watchingCount}</p>
              <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase">Watching</p>
            </div>
            <div className="p-3 sm:px-4 sm:py-3 rounded-2xl bg-[#11121a] border border-white/5 text-center">
              <p className="text-lg sm:text-2xl font-black text-emerald-400">{completedCount}</p>
              <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase">Completed</p>
            </div>
            <div className="p-3 sm:px-4 sm:py-3 rounded-2xl bg-[#11121a] border border-white/5 text-center">
              <p className="text-lg sm:text-2xl font-black text-purple-400">{favorites.length}</p>
              <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase">Favorites</p>
            </div>
          </div>
        </div>

        {/* Tab Filter Controls */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8 border-b border-white/5">
          <button
            onClick={() => filterStatus('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 ${
              currentTab === 'all'
                ? 'bg-rose-500 text-white shadow-neon-red'
                : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>All Anime ({watchlist.length})</span>
          </button>

          <button
            onClick={() => filterStatus('watching')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 ${
              currentTab === 'watching'
                ? 'bg-rose-500 text-white shadow-neon-red'
                : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Watching ({watchingCount})</span>
          </button>

          <button
            onClick={() => filterStatus('plan_to_watch')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 ${
              currentTab === 'plan_to_watch'
                ? 'bg-rose-500 text-white shadow-neon-red'
                : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Plan to Watch ({planToWatchCount})</span>
          </button>

          <button
            onClick={() => filterStatus('completed')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 ${
              currentTab === 'completed'
                ? 'bg-rose-500 text-white shadow-neon-red'
                : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Completed ({completedCount})</span>
          </button>

          <button
            onClick={() => filterStatus('favorites')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 ${
              currentTab === 'favorites'
                ? 'bg-purple-600 text-white shadow-neon-purple'
                : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Favorites ({favorites.length})</span>
          </button>
        </div>

        {/* Content Grid */}
        {filteredWatchlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredWatchlist.map((item: WatchlistItem) => (
              <motion.div
                key={item.anime.mal_id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative flex flex-col rounded-2xl bg-[#11121a] border border-white/5 hover:border-purple-500/40 transition-all p-3.5 shadow-lg"
              >
                {/* Media Row */}
                <div className="flex gap-3.5">
                  <img
                    src={item.anime.images.jpg.image_url}
                    alt={item.anime.title}
                    className="w-20 h-28 object-cover rounded-xl shrink-0 cursor-pointer"
                    onClick={() => navigate(`/anime/${item.anime.mal_id}`)}
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">
                        {item.anime.type || 'TV'}
                      </span>
                      <h3
                        onClick={() => navigate(`/anime/${item.anime.mal_id}`)}
                        className="text-sm font-bold text-white hover:text-rose-400 transition-colors line-clamp-2 cursor-pointer mt-1"
                      >
                        {item.anime.title}
                      </h3>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Current Progress</span>
                        <span className="text-white font-bold">
                          Ep {item.currentEpisode || 1} / {item.anime.episodes || '?'}
                        </span>
                      </div>

                      {/* Status Dropdown */}
                      <select
                        value={item.status}
                        onChange={(e) =>
                          updateWatchlistStatus(item.anime.mal_id, e.target.value as WatchlistStatus)
                        }
                        className="w-full text-[11px] p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 cursor-pointer focus:outline-none"
                      >
                        <option value="watching" className="bg-[#11121a]">Watching</option>
                        <option value="plan_to_watch" className="bg-[#11121a]">Plan to Watch</option>
                        <option value="completed" className="bg-[#11121a]">Completed</option>
                        <option value="dropped" className="bg-[#11121a]">Dropped</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
                  <button
                    onClick={() => navigate(`/watch/${item.anime.mal_id}?ep=${item.currentEpisode || 1}`)}
                    className="flex-1 py-2 px-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold shadow-neon-red flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Resume Ep {item.currentEpisode || 1}</span>
                  </button>

                  <button
                    onClick={() => removeFromWatchlist(item.anime.mal_id)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                    title="Remove from Watchlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center p-8 rounded-3xl bg-[#11121a] border border-white/5">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4 text-purple-400">
              <Bookmark className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              No anime found in this category
            </h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
              You haven't added any series to "{currentTab.replace(/_/g, ' ')}" yet. Discover popular and trending anime to start your personalized collection.
            </p>
            <Link
              to="/discover"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 text-white text-xs font-bold shadow-neon-red"
            >
              <Sparkles className="w-4 h-4" />
              <span>Explore Trending Anime</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
