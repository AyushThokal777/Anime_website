import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Anime } from '../../types/anime';
import { useAnime } from '../../context/AnimeContext';
import {
  Play,
  Info,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Star,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroCarouselProps {
  featuredAnime: Anime[];
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ featuredAnime }) => {
  const navigate = useNavigate();
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useAnime();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const anime = featuredAnime[currentIndex] || featuredAnime[0];

  useEffect(() => {
    if (!isAutoPlay || featuredAnime.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredAnime.length);
    }, 6500);

    return () => clearInterval(interval);
  }, [isAutoPlay, featuredAnime.length]);

  if (!anime) return null;

  const inWatchlist = isInWatchlist(anime.mal_id);

  const handlePrev = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev === 0 ? featuredAnime.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % featuredAnime.length);
  };

  return (
    <div
      className="relative w-full h-[78vh] min-h-[580px] max-h-[850px] overflow-hidden bg-[#08080c] select-none"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* Background Banner with Crossfade Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={anime.mal_id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <img
            src={anime.banner_image || anime.images.jpg.large_image_url}
            alt={anime.title}
            className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.1]"
          />
        </motion.div>
      </AnimatePresence>

      {/* Cinematic Vignettes & Gradients */}
      <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
      <div className="absolute inset-0 bg-hero-side-gradient pointer-events-none" />
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-60" />

      {/* Hero Content Information */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 sm:pb-20">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={anime.mal_id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {/* Top Tag & Stats */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-600 text-white shadow-neon-red flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {anime.badge || 'Featured Spotlight'}
                </span>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-400 text-xs font-bold border border-white/10">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{anime.score} Score</span>
                </div>

                <span className="text-xs text-slate-300 font-semibold bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                  {anime.year || '2024'}
                </span>

                <span className="text-xs text-slate-300 font-semibold bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                  {anime.episodes ? `${anime.episodes} Episodes` : 'Airing'}
                </span>

                <span className="text-xs text-purple-400 font-bold bg-purple-950/60 border border-purple-500/30 px-2.5 py-1 rounded-full">
                  {anime.rating}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight font-display leading-[1.1] glow-text-red">
                {anime.title}
              </h1>

              {/* Japanese Title */}
              {anime.title_japanese && (
                <p className="text-sm sm:text-base text-rose-300/80 font-medium tracking-wide">
                  {anime.title_japanese}
                </p>
              )}

              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {anime.genres.map((g) => (
                  <span
                    key={g.mal_id}
                    className="text-xs font-medium px-3 py-1 rounded-lg bg-white/[0.08] backdrop-blur-md text-slate-200 border border-white/10"
                  >
                    {g.name}
                  </span>
                ))}
              </div>

              {/* Short Synopsis */}
              <p className="text-sm sm:text-base text-slate-300 line-clamp-3 leading-relaxed max-w-xl text-shadow">
                {anime.synopsis}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2 flex-wrap">
                <button
                  onClick={() => navigate(`/watch/${anime.mal_id}`)}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-500 via-rose-600 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-extrabold text-sm sm:text-base shadow-neon-red hover:shadow-neon-purple active:scale-95 transition-all flex items-center gap-2.5"
                >
                  <Play className="w-5 h-5 fill-white" />
                  <span>Watch Now</span>
                </button>

                <button
                  onClick={() => navigate(`/anime/${anime.mal_id}`)}
                  className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-md text-white font-bold text-sm sm:text-base hover:border-white/30 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Info className="w-5 h-5 text-slate-300" />
                  <span>More Details</span>
                </button>

                <button
                  onClick={() => {
                    if (inWatchlist) {
                      removeFromWatchlist(anime.mal_id);
                    } else {
                      addToWatchlist(anime, 'watching');
                    }
                  }}
                  className={`p-3.5 rounded-xl border backdrop-blur-md transition-all active:scale-95 ${
                    inWatchlist
                      ? 'bg-purple-600 border-purple-500 text-white shadow-neon-purple'
                      : 'bg-white/10 hover:bg-white/20 border-white/15 text-white'
                  }`}
                  title={inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                >
                  <Bookmark className={`w-5 h-5 ${inWatchlist ? 'fill-white' : ''}`} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Carousel Navigation Arrows */}
      <div className="absolute right-6 bottom-16 sm:bottom-20 z-30 hidden sm:flex items-center gap-2">
        <button
          onClick={handlePrev}
          className="p-3 rounded-full bg-black/60 hover:bg-black/90 border border-white/15 text-white backdrop-blur-md hover:border-rose-500 transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="p-3 rounded-full bg-black/60 hover:bg-black/90 border border-white/15 text-white backdrop-blur-md hover:border-rose-500 transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Indicators / Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {featuredAnime.map((item, idx) => (
          <button
            key={item.mal_id}
            onClick={() => {
              setIsAutoPlay(false);
              setCurrentIndex(idx);
            }}
            className={`transition-all duration-300 rounded-full ${
              idx === currentIndex
                ? 'w-8 h-2 bg-rose-500 shadow-neon-red'
                : 'w-2 h-2 bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
