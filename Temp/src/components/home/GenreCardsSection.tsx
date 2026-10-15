import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GENRE_CATEGORIES } from '../../data/mockAnime';
import {
  Sword,
  Compass,
  Wand2,
  Cpu,
  Heart,
  Smile,
  Sparkles,
  Skull,
  HelpCircle,
  Coffee,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const GenreCardsSection: React.FC = () => {
  const navigate = useNavigate();

  const getIcon = (name: string) => {
    switch (name) {
      case 'Sword': return <Sword className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'Wand2': return <Wand2 className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Heart': return <Heart className="w-5 h-5" />;
      case 'Smile': return <Smile className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Skull': return <Skull className="w-5 h-5" />;
      case 'HelpCircle': return <HelpCircle className="w-5 h-5" />;
      case 'Coffee': return <Coffee className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section className="py-8">
      <div className="flex items-end justify-between mb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-6 rounded-full bg-purple-500 shadow-neon-purple" />
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide font-display">
              Browse by Genre
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Dive into handpicked anime collections categorized by genre
          </p>
        </div>

        <button
          onClick={() => navigate('/genres')}
          className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
        >
          <span>All Genres</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
        {GENRE_CATEGORIES.map((genre) => (
          <motion.div
            key={genre.id}
            whileHover={{ y: -4, scale: 1.02 }}
            transition={{ duration: 0.2 }}
            onClick={() => navigate(`/discover?genre=${genre.name}`)}
            className="group relative h-28 sm:h-32 rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-rose-500/50 shadow-lg"
          >
            {/* Background Image */}
            <img
              src={genre.bg}
              alt={genre.name}
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4] group-hover:brightness-[0.55] group-hover:scale-110 transition-all duration-500"
              loading="lazy"
            />

            {/* Gradient Overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-t ${genre.color} opacity-40 group-hover:opacity-60 transition-opacity`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Content */}
            <div className="relative z-10 p-3.5 h-full flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-white/15 backdrop-blur-md text-white group-hover:scale-110 group-hover:bg-rose-500 transition-all">
                  {getIcon(genre.icon)}
                </div>
                <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-black text-white tracking-wide group-hover:text-rose-300 transition-colors">
                  {genre.name}
                </h3>
                <p className="text-[10px] text-slate-300 line-clamp-1 opacity-80 group-hover:opacity-100">
                  {genre.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
