import React, { useState, useEffect } from 'react';
import { searchAnime } from '../services/animeApi';
import { Anime } from '../types/anime';
import { AnimeCard } from '../components/anime/AnimeCard';
import { Film } from 'lucide-react';

export const MoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    searchAnime({
      searchQuery: '',
      genre: 'all',
      status: 'all',
      type: 'movie',
      year: 'all',
      sortBy: 'score',
      minScore: 0,
    }).then((data: Anime[]) => {
      // In case type filter had fewer results, ensure top movies are shown
      if (data.length === 0) {
        searchAnime({
          searchQuery: '',
          genre: 'all',
          status: 'all',
          type: 'all',
          year: 'all',
          sortBy: 'score',
          minScore: 8.5,
        }).then(setMovies);
      } else {
        setMovies(data);
      }
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
              <Film className="w-6 h-6 text-rose-500" />
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-wide font-display">
                Feature Anime Movies
              </h1>
            </div>
          </div>
          <p className="text-sm text-slate-400">
            Award-winning theatrical masterpieces, breathtaking cinematic animation, and emotional storytelling
          </p>
        </div>

        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
            <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-semibold">Loading anime movies...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movies.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
