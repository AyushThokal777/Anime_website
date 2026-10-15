import React, { useState, useEffect } from 'react';
import { getTrendingAnime } from '../services/animeApi';
import { Anime } from '../types/anime';
import { AnimeCard } from '../components/anime/AnimeCard';
import { Flame } from 'lucide-react';

export const TrendingPage: React.FC = () => {
  const [trending, setTrending] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    getTrendingAnime().then((data: Anime[]) => {
      setTrending(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#08080c] text-slate-100 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-2.5 h-6 rounded-full bg-rose-500 shadow-neon-red" />
            <div className="flex items-center gap-2">
              <Flame className="w-6 h-6 text-rose-500" />
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-wide font-display">
                Trending Anime Now
              </h1>
            </div>
          </div>
          <p className="text-sm text-slate-400">
            Real-time viral sensations, high engagement discussions, and chart toppers across the anime universe
          </p>
        </div>

        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
            <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-semibold">Loading trending chart...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {trending.map((anime, index) => (
              <AnimeCard
                key={anime.mal_id}
                anime={anime}
                rank={index + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
