import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GENRE_CATEGORIES } from '../data/mockAnime';
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
  Layers,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const GenresPage: React.FC = () => {
  const navigate = useNavigate();

  const getIcon = (name: string) => {
    switch (name) {
      case 'Sword': return <Sword className="w-6 h-6" />;
      case 'Compass': return <Compass className="w-6 h-6" />;
      case 'Wand2': return <Wand2 className="w-6 h-6" />;
      case 'Cpu': return <Cpu className="w-6 h-6" />;
      case 'Heart': return <Heart className="w-6 h-6" />;
      case 'Smile': return <Smile className="w-6 h-6" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      case 'Skull': return <Skull className="w-6 h-6" />;
      case 'HelpCircle': return <HelpCircle className="w-6 h-6" />;
      case 'Coffee': return <Coffee className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#08080c] text-slate-100 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-2.5 h-6 rounded-full bg-purple-500 shadow-neon-purple" />
            <div className="flex items-center gap-2">
              <Layers className="w-6 h-6 text-purple-400" />
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-wide font-display">
                Browse by Genre
              </h1>
            </div>
          </div>
          <p className="text-sm text-slate-400">
            Explore diverse anime storylines by style, mood, and genre themes
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {GENRE_CATEGORIES.map((genre) => (
            <motion.div
              key={genre.id}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              onClick={() => navigate(`/discover?genre=${genre.name}`)}
              className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-rose-500/50 shadow-xl"
            >
              {/* Background Art */}
              <img
                src={genre.bg}
                alt={genre.name}
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.35] group-hover:brightness-[0.5] group-hover:scale-110 transition-all duration-500"
              />

              {/* Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-t ${genre.color} opacity-40 group-hover:opacity-60 transition-opacity`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

              {/* Card Body */}
              <div className="relative z-10 p-5 h-full flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-white/15 backdrop-blur-md text-white group-hover:bg-rose-500 group-hover:shadow-neon-red transition-all">
                    {getIcon(genre.icon)}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/50 group-hover:text-white group-hover:bg-rose-500 transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-black text-white tracking-wide group-hover:text-rose-300 transition-colors">
                    {genre.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1 opacity-90">
                    {genre.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
