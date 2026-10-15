import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Star, Play, Sparkles, Filter, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { searchAnime } from '../../services/animeApi';
import { Anime } from '../../types/anime';
import { GENRE_CATEGORIES } from '../../data/mockAnime';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [results, setResults] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSelectedGenre('all');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const data = await searchAnime({
          searchQuery: query,
          genre: selectedGenre,
          status: 'all',
          type: 'all',
          year: 'all',
          sortBy: 'popularity',
          minScore: 0,
        });
        setResults(data);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query, selectedGenre, isOpen]);

  if (!isOpen) return null;

  const handleSelectAnime = (id: number) => {
    onClose();
    navigate(`/anime/${id}`);
  };

  const handleQuickWatch = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    onClose();
    navigate(`/watch/${id}`);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -20 }}
          className="relative w-full max-w-3xl bg-[#0f1017] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        >
          {/* Top Search Input Box */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center gap-3">
            <Search className="w-5 h-5 text-rose-500 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search anime by title, character, or studio (e.g. Solo Leveling, Gojo, MAPPA)..."
              className="w-full bg-transparent text-white placeholder-slate-400 text-base sm:text-lg focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors text-xs font-semibold px-2 border border-white/10"
            >
              ESC
            </button>
          </div>

          {/* Quick Genre Pills */}
          <div className="px-4 py-2.5 bg-white/[0.02] border-b border-white/5 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-xs text-slate-500 font-semibold flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            <button
              onClick={() => setSelectedGenre('all')}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all shrink-0 ${
                selectedGenre === 'all'
                  ? 'bg-rose-500 text-white shadow-neon-red'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              All Genres
            </button>
            {GENRE_CATEGORIES.slice(0, 8).map((g) => (
              <button
                key={g.id}
                onClick={() => setSelectedGenre(g.name)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all shrink-0 ${
                  selectedGenre.toLowerCase() === g.name.toLowerCase()
                    ? 'bg-purple-600 text-white shadow-neon-purple'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {g.name}
              </button>
            ))}
          </div>

          {/* Results Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {isLoading ? (
              <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-400">
                <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm">Searching anime database...</p>
              </div>
            ) : results.length > 0 ? (
              results.map((anime) => (
                <div
                  key={anime.mal_id}
                  onClick={() => handleSelectAnime(anime.mal_id)}
                  className="group flex items-center gap-4 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-rose-500/30 transition-all cursor-pointer"
                >
                  <img
                    src={anime.images.jpg.image_url}
                    alt={anime.title}
                    className="w-14 h-20 sm:w-16 sm:h-24 object-cover rounded-lg shrink-0 group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-semibold border border-rose-500/30">
                        {anime.type || 'TV'}
                      </span>
                      {anime.year && (
                        <span className="text-xs text-slate-400">{anime.year}</span>
                      )}
                      <div className="flex items-center gap-1 text-amber-400 text-xs ml-auto">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="font-bold">{anime.score || '8.0'}</span>
                      </div>
                    </div>

                    <h4 className="text-white font-bold text-sm sm:text-base group-hover:text-rose-400 transition-colors truncate">
                      {anime.title}
                    </h4>

                    {anime.title_japanese && (
                      <p className="text-xs text-slate-500 truncate font-sans">
                        {anime.title_japanese}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {anime.genres.slice(0, 3).map((g) => (
                        <span
                          key={g.mal_id}
                          className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300"
                        >
                          {g.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => handleQuickWatch(e, anime.mal_id)}
                      className="p-2 sm:px-3 sm:py-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-neon-red transition-all"
                      title="Watch Episode 1"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span className="hidden sm:inline">Watch</span>
                    </button>
                    <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center text-slate-400">
                <Sparkles className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">No anime found</h4>
                <p className="text-sm max-w-sm mx-auto text-slate-400">
                  We couldn't find any anime matching "{query}". Try checking for spelling or searching by genre instead.
                </p>
              </div>
            )}
          </div>

          {/* Footer of modal */}
          <div className="p-3 bg-white/[0.02] border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
            <span>Press ESC to exit</span>
            <button
              onClick={() => {
                onClose();
                navigate(`/discover?q=${encodeURIComponent(query)}`);
              }}
              className="text-rose-400 hover:underline font-medium"
            >
              Open in Advanced Filter Page →
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
