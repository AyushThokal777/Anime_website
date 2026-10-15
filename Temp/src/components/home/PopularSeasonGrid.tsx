import React, { useState } from 'react';
import { Anime } from '../../types/anime';
import { AnimeCard } from '../anime/AnimeCard';
import { Flame, Star, Sparkles, Clock, ArrowUpDown } from 'lucide-react';

interface PopularSeasonGridProps {
  animeList: Anime[];
}

export const PopularSeasonGrid: React.FC<PopularSeasonGridProps> = ({ animeList }) => {
  const [sortBy, setSortBy] = useState<'popularity' | 'rating' | 'latest'>('popularity');

  const sortedList = [...animeList].sort((a, b) => {
    if (sortBy === 'rating') {
      return (b.score || 0) - (a.score || 0);
    } else if (sortBy === 'latest') {
      return (b.year || 0) - (a.year || 0);
    }
    // Popularity
    return (a.popularity || 999) - (b.popularity || 999);
  });

  return (
    <section className="py-8">
      {/* Header with Sort Filters */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-6 rounded-full bg-rose-500 shadow-neon-red" />
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-500" />
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide font-display">
                Popular This Season
              </h2>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            The most watched and talked about series airing right now
          </p>
        </div>

        {/* Sort Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/5 self-start sm:self-auto">
          <button
            onClick={() => setSortBy('popularity')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              sortBy === 'popularity'
                ? 'bg-rose-500 text-white shadow-neon-red'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Popularity</span>
          </button>

          <button
            onClick={() => setSortBy('rating')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              sortBy === 'rating'
                ? 'bg-rose-500 text-white shadow-neon-red'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>Top Rated</span>
          </button>

          <button
            onClick={() => setSortBy('latest')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              sortBy === 'latest'
                ? 'bg-rose-500 text-white shadow-neon-red'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Latest</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {sortedList.slice(0, 12).map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>
    </section>
  );
};
