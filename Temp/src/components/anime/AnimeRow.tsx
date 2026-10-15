import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Anime } from '../../types/anime';
import { AnimeCard } from './AnimeCard';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface AnimeRowProps {
  title: string;
  subtitle?: string;
  animeList: Anime[];
  viewAllLink?: string;
  showRank?: boolean;
}

export const AnimeRow: React.FC<AnimeRowProps> = ({
  title,
  subtitle,
  animeList,
  viewAllLink,
  showRank = false,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!animeList || animeList.length === 0) return null;

  return (
    <section className="py-8 relative group/row">
      {/* Header */}
      <div className="flex items-end justify-between mb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-6 rounded-full bg-rose-500 shadow-neon-red" />
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide font-display">
              {title}
            </h2>
          </div>
          {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-3">
          {viewAllLink && (
            <Link
              to={viewAllLink}
              className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}

          {/* Navigation Controls */}
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white transition-all disabled:opacity-30"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white transition-all disabled:opacity-30"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontally Scrollable Cards Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {animeList.map((anime, index) => (
          <div
            key={anime.mal_id}
            className="w-[180px] sm:w-[210px] md:w-[230px] shrink-0"
          >
            <AnimeCard
              anime={anime}
              rank={showRank ? index + 1 : undefined}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
