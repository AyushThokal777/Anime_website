import React from 'react';
import { Anime } from '../../types/anime';
import { AnimeCard } from '../anime/AnimeCard';
import { Trophy, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TopRatedListSectionProps {
  animeList: Anime[];
}

export const TopRatedListSection: React.FC<TopRatedListSectionProps> = ({ animeList }) => {
  if (!animeList || animeList.length === 0) return null;

  return (
    <section className="py-8">
      <div className="flex items-end justify-between mb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-6 rounded-full bg-amber-500 shadow-lg" />
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide font-display">
                Top Rated Anime of All Time
              </h2>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            The highest scoring masterpieces celebrated by millions of anime critics
          </p>
        </div>

        <Link
          to="/discover?sortBy=score"
          className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
        >
          <span>Full Rankings</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {animeList.slice(0, 6).map((anime, index) => (
          <AnimeCard
            key={anime.mal_id}
            anime={anime}
            rank={index + 1}
            variant="landscape"
          />
        ))}
      </div>
    </section>
  );
};
