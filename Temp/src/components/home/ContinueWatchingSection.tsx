import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnime } from '../../context/AnimeContext';
import { Play, Clock, Trash2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const ContinueWatchingSection: React.FC = () => {
  const navigate = useNavigate();
  const { watchHistory, removeHistoryItem } = useAnime();

  if (!watchHistory || watchHistory.length === 0) {
    return null;
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-6 rounded-full bg-rose-500 shadow-neon-red" />
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide font-display">
            Continue Watching
          </h2>
        </div>
        <span className="text-xs text-slate-400 font-semibold">
          {watchHistory.length} in progress
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {watchHistory.slice(0, 4).map((item) => {
          const progressPercent = Math.min(
            100,
            Math.round((item.currentTime / (item.duration || 1440)) * 100)
          );

          return (
            <motion.div
              key={item.animeId}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              onClick={() => navigate(`/watch/${item.animeId}?ep=${item.episodeNumber}`)}
              className="group relative flex gap-3.5 p-3 rounded-2xl bg-[#11121a] hover:bg-[#181926] border border-white/5 hover:border-rose-500/40 transition-all duration-300 cursor-pointer shadow-lg overflow-hidden"
            >
              {/* Thumbnail with Play Overlay */}
              <div className="relative w-28 h-20 sm:w-32 sm:h-22 rounded-xl overflow-hidden shrink-0 bg-slate-900">
                <img
                  src={item.animePoster}
                  alt={item.animeTitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center transition-colors">
                  <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-neon-red group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  </div>
                </div>

                {/* Bottom Progress Bar on Thumbnail */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/60">
                  <div
                    className="h-full bg-rose-500 shadow-neon-red"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Information */}
              <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-rose-400 transition-colors truncate">
                    {item.animeTitle}
                  </h4>
                  <p className="text-xs text-purple-400 font-semibold mt-0.5 truncate">
                    Episode {item.episodeNumber}: {item.episodeTitle}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-1 text-[11px] text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {formatTime(item.currentTime)} / {formatTime(item.duration)}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeHistoryItem(item.animeId);
                    }}
                    className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                    title="Remove from history"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
