import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchAnime } from '../services/animeApi';
import { Anime, FilterState } from '../types/anime';
import { AnimeCard } from '../components/anime/AnimeCard';
import { GENRE_CATEGORIES } from '../data/mockAnime';
import {
  Search,
  Filter,
  Sparkles,
  RotateCcw,
  SlidersHorizontal,
  Flame,
  Star,
  Film,
  Calendar,
  X,
} from 'lucide-react';

export const DiscoverPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get('q') || '';
  const initialGenre = searchParams.get('genre') || 'all';
  const initialSort = (searchParams.get('sortBy') as any) || 'popularity';

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: initialQuery,
    genre: initialGenre,
    status: 'all',
    type: 'all',
    year: 'all',
    sortBy: initialSort,
    minScore: 0,
  });

  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sync state with URL params
  useEffect(() => {
    const q = searchParams.get('q');
    const g = searchParams.get('genre');
    const s = searchParams.get('sortBy');

    setFilters((prev: FilterState) => ({
      ...prev,
      searchQuery: q !== null ? q : prev.searchQuery,
      genre: g !== null ? g : prev.genre,
      sortBy: s ? (s as any) : prev.sortBy,
    }));
  }, [searchParams]);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const timer = setTimeout(async () => {
      try {
        const results = await searchAnime(filters);
        if (isMounted) {
          setAnimeList(results);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Discover search error:', err);
        if (isMounted) setIsLoading(false);
      }
    }, 250);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [filters]);

  const updateFilter = (key: keyof FilterState, val: any) => {
    setFilters((prev: FilterState) => {
      const next: FilterState = { ...prev, [key]: val };
      // Update URL query parameters seamlessly
      const params: Record<string, string> = {};
      if (next.searchQuery) params.q = next.searchQuery;
      if (next.genre !== 'all') params.genre = next.genre;
      if (next.sortBy !== 'popularity') params.sortBy = next.sortBy;
      setSearchParams(params);
      return next;
    });
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      genre: 'all',
      status: 'all',
      type: 'all',
      year: 'all',
      sortBy: 'popularity',
      minScore: 0,
    });
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-[#08080c] text-slate-100 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Search Bar */}
        <div className="mb-8">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-2.5 h-6 rounded-full bg-rose-500 shadow-neon-red" />
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-wide font-display">
              Discover & Filter Anime
            </h1>
          </div>
          <p className="text-sm text-slate-400">
            Search our comprehensive database with advanced genre, rating, and status filters
          </p>

          {/* Search Box Input */}
          <div className="mt-5 relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-500" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => updateFilter('searchQuery', e.target.value)}
              placeholder="Search by title, characters, or Japanese names..."
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all shadow-inner"
            />
            {filters.searchQuery && (
              <button
                onClick={() => updateFilter('searchQuery', '')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mb-8 p-4 rounded-2xl bg-[#11121a] border border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <SlidersHorizontal className="w-4 h-4 text-rose-500" />
              <span>Filters & Sorting</span>
            </div>

            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* Genre Select */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">
                Genre
              </label>
              <select
                value={filters.genre}
                onChange={(e) => updateFilter('genre', e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs focus:outline-none focus:border-rose-500 cursor-pointer"
              >
                <option value="all" className="bg-[#11121a]">All Genres</option>
                {GENRE_CATEGORIES.map((g) => (
                  <option key={g.id} value={g.name} className="bg-[#11121a]">
                    {g.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">
                Sort By
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => updateFilter('sortBy', e.target.value as any)}
                className="w-full p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs focus:outline-none focus:border-rose-500 cursor-pointer"
              >
                <option value="popularity" className="bg-[#11121a]">Most Popular</option>
                <option value="score" className="bg-[#11121a]">Highest Rated</option>
                <option value="newest" className="bg-[#11121a]">Newest First</option>
                <option value="title" className="bg-[#11121a]">A-Z Title</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => updateFilter('status', e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs focus:outline-none focus:border-rose-500 cursor-pointer"
              >
                <option value="all" className="bg-[#11121a]">All Status</option>
                <option value="currently-airing" className="bg-[#11121a]">Currently Airing</option>
                <option value="finished-airing" className="bg-[#11121a]">Finished Airing</option>
              </select>
            </div>

            {/* Format / Type */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">
                Format
              </label>
              <select
                value={filters.type}
                onChange={(e) => updateFilter('type', e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs focus:outline-none focus:border-rose-500 cursor-pointer"
              >
                <option value="all" className="bg-[#11121a]">All Formats</option>
                <option value="tv" className="bg-[#11121a]">TV Series</option>
                <option value="movie" className="bg-[#11121a]">Anime Movie</option>
                <option value="ona" className="bg-[#11121a]">ONA / Special</option>
              </select>
            </div>

            {/* Release Year */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">
                Release Year
              </label>
              <select
                value={filters.year}
                onChange={(e) => updateFilter('year', e.target.value)}
                className="w-full p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs focus:outline-none focus:border-rose-500 cursor-pointer"
              >
                <option value="all" className="bg-[#11121a]">All Years</option>
                <option value="2024" className="bg-[#11121a]">2024</option>
                <option value="2023" className="bg-[#11121a]">2023</option>
                <option value="2022" className="bg-[#11121a]">2022</option>
                <option value="2021" className="bg-[#11121a]">2021</option>
                <option value="2020" className="bg-[#11121a]">2020 & Older</option>
              </select>
            </div>

            {/* Min Score */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">
                Min Score
              </label>
              <select
                value={filters.minScore}
                onChange={(e) => updateFilter('minScore', parseFloat(e.target.value))}
                className="w-full p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs focus:outline-none focus:border-rose-500 cursor-pointer"
              >
                <option value="0" className="bg-[#11121a]">Any Score</option>
                <option value="8.5" className="bg-[#11121a]">8.5+ Masterpieces</option>
                <option value="8.0" className="bg-[#11121a]">8.0+ Great</option>
                <option value="7.5" className="bg-[#11121a]">7.5+ Good</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Info Bar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-semibold text-slate-300">
            Showing <span className="text-rose-400 font-bold">{animeList.length}</span> anime titles
          </p>
        </div>

        {/* Results Grid */}
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
            <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-semibold">Filtering anime catalog...</p>
          </div>
        ) : animeList.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {animeList.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center p-8 rounded-3xl bg-[#11121a] border border-white/5">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4 text-slate-500">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Matching Anime Found</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
              We couldn't find any anime matching your current search parameters. Try removing some filters or searching with a different term.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 rounded-xl bg-rose-500 text-white text-xs font-bold shadow-neon-red hover:bg-rose-600 transition-all"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
