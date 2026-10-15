import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Anime } from '../../types/anime';
import { useAnime } from '../../context/AnimeContext';
import { Star, Play, Bookmark, Heart, Film, Tv, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface AnimeCardProps {
  anime: Anime;
  rank?: number;
  featuredBadge?: string;
  variant?: 'portrait' | 'compact' | 'landscape';
}

export const AnimeCard: React.FC<AnimeCardProps> = ({
  anime,
  rank,
  featuredBadge,
  variant = 'portrait',
}) => {
  const navigate = useNavigate();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist, isFavorite, toggleFavorite } = useAnime();

  const inWatchlist = isInWatchlist(anime.mal_id);
  const favorited = isFavorite(anime.mal_id);

  const handleCardClick = () => {
    navigate(`/anime/${anime.mal_id}`);
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/watch/${anime.mal_id}`);
  };

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWatchlist) {
      removeFromWatchlist(anime.mal_id);
    } else {
      addToWatchlist(anime, 'watching');
    }
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(anime);
  };

  if (variant === 'landscape') {
    return (
      <div
        onClick={handleCardClick}
        className="group relative flex flex-col sm:flex-row gap-4 p-3.5 rounded-2xl bg-[#11121a] hover:bg-[#181926] border border-white/5 hover:border-rose-500/40 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-card-glow-red"
      >
        {/* Poster */}
        <div className="relative w-full sm:w-36 h-48 sm:h-auto rounded-xl overflow-hidden shrink-0">
          <img
            src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
            alt={anime.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {rank && (
            <div className="absolute top-2 left-2 w-8 h-8 rounded-lg bg-rose-600/90 text-white font-black text-sm flex items-center justify-center shadow-neon-red">
              #{rank}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                {anime.type || 'TV'}
              </span>
              {anime.year && (
                <span className="text-xs text-slate-400 font-medium">{anime.year}</span>
              )}
              {anime.episodes && (
                <span className="text-xs text-slate-400 font-medium">{anime.episodes} eps</span>
              )}
              <div className="flex items-center gap-1 text-amber-400 text-xs ml-auto">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span className="font-bold">{anime.score ? anime.score.toFixed(1) : '8.0'}</span>
              </div>
            </div>

            <h3 className="text-base font-bold text-white group-hover:text-rose-400 transition-colors line-clamp-1 mb-1">
              {anime.title}
            </h3>

            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
              {anime.synopsis}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {anime.genres.slice(0, 3).map((g) => (
                <span
                  key={g.mal_id}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/5"
                >
                  {g.name}
                </span>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-2 pt-2 border-t border-white/5">
            <button
              onClick={handlePlayClick}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold shadow-neon-red transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Watch Now</span>
            </button>
            <button
              onClick={handleWatchlistToggle}
              className={`p-1.5 rounded-lg text-xs font-medium border transition-all ${
                inWatchlist
                  ? 'bg-purple-600/30 border-purple-500 text-purple-300'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
              }`}
              title={inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
            >
              <Bookmark className={`w-4 h-4 ${inWatchlist ? 'fill-purple-400 text-purple-400' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default: Portrait Poster Card
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onClick={handleCardClick}
      className="group relative flex flex-col rounded-2xl bg-[#11121a] border border-white/5 hover:border-rose-500/40 transition-all duration-300 cursor-pointer overflow-hidden shadow-lg hover:shadow-card-glow-red"
    >
      {/* Poster Media Box */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-900">
        <img
          src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
          alt={anime.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Floating Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1 z-10 pointer-events-none">
          {rank ? (
            <div className="w-7 h-7 rounded-lg bg-rose-600/90 text-white font-black text-xs flex items-center justify-center shadow-neon-red backdrop-blur-md">
              #{rank}
            </div>
          ) : featuredBadge || anime.badge ? (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-rose-600/90 text-white shadow-neon-red backdrop-blur-md">
              {featuredBadge || anime.badge}
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/60 text-slate-200 backdrop-blur-md border border-white/10">
              {anime.type || 'TV'}
            </span>
          )}

          <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-amber-400 text-xs font-bold border border-white/10">
            <Star className="w-3 h-3 fill-amber-400" />
            <span>{anime.score ? anime.score.toFixed(1) : '8.0'}</span>
          </div>
        </div>

        {/* Quick Action Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5 z-20">
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={handlePlayClick}
              className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white font-bold text-xs shadow-neon-red hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Watch</span>
            </button>
            <button
              onClick={handleWatchlistToggle}
              className={`p-2 rounded-xl border backdrop-blur-md transition-all ${
                inWatchlist
                  ? 'bg-purple-600 border-purple-500 text-white'
                  : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
              }`}
              title={inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${inWatchlist ? 'fill-white' : ''}`} />
            </button>
            <button
              onClick={handleFavoriteToggle}
              className={`p-2 rounded-xl border backdrop-blur-md transition-all ${
                favorited
                  ? 'bg-rose-600 border-rose-500 text-white'
                  : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
              }`}
              title={favorited ? 'Remove Favorite' : 'Add to Favorites'}
            >
              <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-white' : ''}`} />
            </button>
          </div>

          <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
            {anime.synopsis}
          </p>
        </div>
      </div>

      {/* Info Underneath */}
      <div className="p-3.5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
            <span>{anime.year || '2024'}</span>
            <span>•</span>
            <span>{anime.episodes ? `${anime.episodes} eps` : 'Ongoing'}</span>
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-rose-400 transition-colors line-clamp-1 leading-snug">
            {anime.title}
          </h3>
        </div>

        <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-white/5">
          <span className="text-[11px] text-purple-400 font-medium truncate">
            {anime.genres[0]?.name || 'Anime'}
          </span>
          <span className="text-[10px] text-slate-500 uppercase font-semibold">
            {anime.status === 'Currently Airing' ? 'Airing' : 'Completed'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
