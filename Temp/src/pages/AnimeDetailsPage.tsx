import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getAnimeById, getSimilarAnime } from '../services/animeApi';
import { Anime, WatchlistStatus } from '../types/anime';
import { useAnime } from '../context/AnimeContext';
import { AnimeCard } from '../components/anime/AnimeCard';
import {
  Play,
  Bookmark,
  Heart,
  Star,
  Calendar,
  Clock,
  Tv,
  Film,
  Layers,
  Share2,
  Check,
  ChevronDown,
  Sparkles,
  ArrowLeft,
  Youtube,
  X,
} from 'lucide-react';

export const AnimeDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    isInWatchlist,
    getWatchlistItem,
    addToWatchlist,
    removeFromWatchlist,
    updateWatchlistStatus,
    isFavorite,
    toggleFavorite,
    showToast,
  } = useAnime();

  const [anime, setAnime] = useState<Anime | null>(null);
  const [similarAnime, setSimilarAnime] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [synopsisExpanded, setSynopsisExpanded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!id) return;

    let isMounted = true;
    setIsLoading(true);

    Promise.all([getAnimeById(id), getSimilarAnime(id)])
      .then(([animeData, similarData]) => {
        if (isMounted) {
          setAnime(animeData);
          setSimilarAnime(similarData);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error loading anime details:', err);
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-28 pb-16 flex flex-col items-center justify-center text-slate-400 gap-4">
        <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-base font-semibold">Loading anime details...</p>
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="min-h-screen pt-32 pb-16 px-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Anime Not Found</h2>
        <p className="text-slate-400 mb-6">We couldn't retrieve information for this title.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-rose-500 text-white font-bold text-sm shadow-neon-red"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
      </div>
    );
  }

  const inWatchlist = isInWatchlist(anime.mal_id);
  const watchlistItem = getWatchlistItem(anime.mal_id);
  const currentStatus: WatchlistStatus = watchlistItem?.status || 'watching';
  const favorited = isFavorite(anime.mal_id);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Anime link copied to clipboard! 📋', 'success');
  };

  const handleStatusChange = (status: WatchlistStatus) => {
    if (inWatchlist) {
      updateWatchlistStatus(anime.mal_id, status);
    } else {
      addToWatchlist(anime, status);
    }
    setIsStatusDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#08080c] text-slate-100 pb-20">
      {/* Hero Backdrop Banner */}
      <div className="relative w-full h-[55vh] min-h-[420px] max-h-[600px] overflow-hidden">
        <img
          src={anime.banner_image || anime.images.jpg.large_image_url}
          alt={anime.title}
          className="w-full h-full object-cover object-center filter brightness-[0.6] contrast-[1.1]"
        />

        {/* Ambient Gradient Overlays */}
        <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-[#08080c]/60 to-transparent pointer-events-none" />

        {/* Top Back Button */}
        <div className="absolute top-24 left-4 sm:left-8 z-20">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/60 hover:bg-black/80 border border-white/10 text-white text-xs font-bold backdrop-blur-md transition-all group"
          >
            <ArrowLeft className="w-4 h-4 text-rose-400 group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* Main Details Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-48 relative z-20">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Left Column: Poster & Quick Action Panel */}
          <div className="w-full sm:w-64 md:w-72 shrink-0 flex flex-col gap-4 mx-auto md:mx-0">
            {/* Poster Card */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl bg-slate-900 group">
              <img
                src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
                alt={anime.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-amber-400 text-xs font-bold border border-white/10 flex items-center gap-1 shadow-lg">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{anime.score ? anime.score.toFixed(1) : '8.0'}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2.5 w-full">
              <button
                onClick={() => navigate(`/watch/${anime.mal_id}`)}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-rose-500 via-rose-600 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-extrabold text-sm shadow-neon-red hover:shadow-neon-purple active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Watch Episode 1</span>
              </button>

              {/* Watchlist Toggle with Dropdown */}
              <div className="relative">
                <div className="flex rounded-xl overflow-hidden border border-white/10">
                  <button
                    onClick={() => {
                      if (inWatchlist) {
                        removeFromWatchlist(anime.mal_id);
                      } else {
                        addToWatchlist(anime, 'watching');
                      }
                    }}
                    className={`flex-1 py-3 px-3 text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      inWatchlist
                        ? 'bg-purple-600/30 text-purple-300'
                        : 'bg-white/10 hover:bg-white/15 text-white'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${inWatchlist ? 'fill-purple-400 text-purple-400' : ''}`} />
                    <span>{inWatchlist ? `In Watchlist (${currentStatus.replace(/_/g, ' ')})` : 'Add to Watchlist'}</span>
                  </button>

                  <button
                    onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                    className="px-3 bg-white/10 hover:bg-white/20 border-l border-white/10 text-white"
                    title="Change status"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                {isStatusDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setIsStatusDropdownOpen(false)}
                    />
                    <div className="absolute left-0 right-0 mt-2 bg-[#141520] border border-white/10 rounded-xl shadow-2xl p-1.5 z-40 backdrop-blur-xl">
                      <p className="text-[10px] uppercase font-bold text-slate-400 px-3 py-1">Set Watch Status</p>
                      {(['watching', 'plan_to_watch', 'completed', 'dropped'] as WatchlistStatus[]).map((status) => (
                        <button
                          key={status}
                          onClick={() => handleStatusChange(status)}
                          className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-colors capitalize ${
                            inWatchlist && currentStatus === status
                              ? 'bg-purple-600/30 text-purple-300 font-bold'
                              : 'text-slate-300 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <span>{status.replace(/_/g, ' ')}</span>
                          {inWatchlist && currentStatus === status && <Check className="w-3.5 h-3.5" />}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Extra Utility Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => toggleFavorite(anime)}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    favorited
                      ? 'bg-rose-600/30 border-rose-500/50 text-rose-300'
                      : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-400 text-rose-400' : ''}`} />
                  <span>Favorite</span>
                </button>

                <button
                  onClick={handleShare}
                  className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>

              {/* Trailer Button */}
              {anime.trailer?.youtube_id && (
                <button
                  onClick={() => setIsTrailerOpen(true)}
                  className="w-full py-2.5 px-3 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-300 text-xs font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <Youtube className="w-4 h-4 text-red-400" />
                  <span>Watch Official Trailer</span>
                </button>
              )}
            </div>

            {/* Quick Metadata Card */}
            <div className="p-4 rounded-2xl bg-[#11121a] border border-white/5 space-y-3 text-xs">
              <h4 className="text-white font-bold uppercase tracking-wider text-[11px] pb-2 border-b border-white/5">
                Anime Information
              </h4>

              <div className="flex justify-between">
                <span className="text-slate-400">Type</span>
                <span className="text-white font-semibold">{anime.type || 'TV Series'}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Status</span>
                <span className="text-rose-400 font-semibold">{anime.status}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Episodes</span>
                <span className="text-white font-semibold">{anime.episodes || 'Ongoing'}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Duration</span>
                <span className="text-white font-semibold">{anime.duration || '24 min'}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Premiered</span>
                <span className="text-white font-semibold capitalize">
                  {anime.season} {anime.year}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Studios</span>
                <span className="text-purple-400 font-semibold text-right">
                  {anime.studios?.map((s) => s.name).join(', ') || 'Unknown'}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Age Rating</span>
                <span className="text-white font-semibold">{anime.rating}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Synopsis, Episode List, Recommendations */}
          <div className="flex-1 space-y-8 min-w-0">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-rose-600 text-white shadow-neon-red">
                  {anime.type || 'TV'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/10 text-slate-300">
                  {anime.year || '2024'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-950/60 border border-purple-500/30 text-purple-300">
                  Rank #{anime.rank || 100}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-950/60 border border-amber-500/30 text-amber-300 flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400" />
                  {anime.score} ({anime.scored_by?.toLocaleString()} users)
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display mb-1">
                {anime.title}
              </h1>

              {anime.title_japanese && (
                <p className="text-sm sm:text-base text-rose-300/80 font-medium">
                  {anime.title_japanese}
                </p>
              )}

              {anime.title_english && anime.title_english !== anime.title && (
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  English: {anime.title_english}
                </p>
              )}

              {/* Genre Pills */}
              <div className="flex flex-wrap gap-2 mt-4">
                {anime.genres.map((g) => (
                  <Link
                    key={g.mal_id}
                    to={`/discover?genre=${g.name}`}
                    className="text-xs font-medium px-3 py-1 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-200 hover:text-rose-300 border border-white/10 transition-colors"
                  >
                    {g.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Synopsis Section */}
            <div className="p-6 rounded-2xl bg-[#11121a] border border-white/5 space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-500" />
                <span>Synopsis & Overview</span>
              </h3>
              <p
                className={`text-sm text-slate-300 leading-relaxed ${
                  !synopsisExpanded ? 'line-clamp-4' : ''
                }`}
              >
                {anime.synopsis}
              </p>
              {anime.synopsis.length > 280 && (
                <button
                  onClick={() => setSynopsisExpanded(!synopsisExpanded)}
                  className="text-xs font-bold text-rose-400 hover:text-rose-300 pt-1 focus:outline-none"
                >
                  {synopsisExpanded ? 'Show Less ▲' : 'Read Full Synopsis ▼'}
                </button>
              )}
            </div>

            {/* Episode List Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Tv className="w-5 h-5 text-rose-500" />
                  <h3 className="text-xl font-bold text-white font-display">
                    Episodes ({anime.episodeList?.length || anime.episodes || 12})
                  </h3>
                </div>
                <span className="text-xs text-slate-400">Audio: Japanese • Subtitles: English</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {(anime.episodeList || []).map((ep) => (
                  <div
                    key={ep.id}
                    onClick={() => navigate(`/watch/${anime.mal_id}?ep=${ep.number}`)}
                    className="group relative flex gap-3 p-2.5 rounded-xl bg-[#11121a] hover:bg-[#181926] border border-white/5 hover:border-rose-500/40 transition-all cursor-pointer shadow-md overflow-hidden"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-28 h-18 sm:w-32 sm:h-20 rounded-lg overflow-hidden shrink-0 bg-slate-900">
                      <img
                        src={ep.thumbnail}
                        alt={ep.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 flex items-center justify-center transition-colors">
                        <div className="w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-neon-red group-hover:scale-110 transition-transform">
                          <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                        </div>
                      </div>
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.2 rounded bg-black/80 text-[10px] font-bold text-white">
                        {ep.duration}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <span className="text-[11px] font-bold text-rose-400">
                        Episode {ep.number}
                      </span>
                      <h4 className="text-xs font-bold text-white group-hover:text-rose-300 transition-colors truncate">
                        {ep.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {ep.synopsis || `Watch episode ${ep.number} of ${anime.title}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Characters Section (if any) */}
            {anime.characters && anime.characters.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-white font-display mb-4">
                  Characters & Voice Actors
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {anime.characters.map((char) => (
                    <div
                      key={char.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-[#11121a] border border-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={char.image}
                          alt={char.name}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div>
                          <p className="text-xs font-bold text-white">{char.name}</p>
                          <p className="text-[10px] text-rose-400 font-semibold">{char.role}</p>
                        </div>
                      </div>

                      {char.voiceActor && (
                        <div className="flex items-center gap-3 text-right">
                          <div>
                            <p className="text-xs font-bold text-slate-200">{char.voiceActor.name}</p>
                            <p className="text-[10px] text-slate-500">{char.voiceActor.language}</p>
                          </div>
                          <img
                            src={char.voiceActor.image}
                            alt={char.voiceActor.name}
                            className="w-10 h-10 rounded-xl object-cover"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Similar Anime Recommendations */}
            {similarAnime.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white font-display">
                    Similar Anime Recommendations
                  </h3>
                  <Link
                    to="/discover"
                    className="text-xs font-bold text-rose-400 hover:underline"
                  >
                    Explore More →
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {similarAnime.slice(0, 4).map((sim) => (
                    <AnimeCard key={sim.mal_id} anime={sim} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {isTrailerOpen && anime.trailer?.youtube_id && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <button
              onClick={() => setIsTrailerOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-rose-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}?autoplay=1&enablejsapi=1`}
                title={`${anime.title} Trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
