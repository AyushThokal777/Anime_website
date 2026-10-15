import React, { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { getAnimeById, getSimilarAnime } from '../services/animeApi';
import { Anime, Episode } from '../types/anime';
import { useAnime } from '../context/AnimeContext';
import { AnimeCard } from '../components/anime/AnimeCard';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  SkipBack,
  SkipForward,
  RotateCcw,
  RotateCw,
  Settings,
  Tv,
  List,
  Sparkles,
  Bookmark,
  Share2,
  Heart,
  ChevronDown,
  Info,
  ShieldCheck,
  Check,
} from 'lucide-react';

export const VideoPlayerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    updateWatchProgress,
    isInWatchlist,
    addToWatchlist,
    removeFromWatchlist,
    isFavorite,
    toggleFavorite,
    showToast,
  } = useAnime();

  const episodeParam = searchParams.get('ep');
  const currentEpNumber = episodeParam ? parseInt(episodeParam, 10) : 1;

  const [anime, setAnime] = useState<Anime | null>(null);
  const [similarAnime, setSimilarAnime] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Player controls state
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState(false);
  const [autoPlayNext, setAutoPlayNext] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef<number | null>(null);

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
        console.error('Error fetching player anime:', err);
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  const episodes: Episode[] = anime?.episodeList || [];
  const activeEpisode =
    episodes.find((ep) => ep.number === currentEpNumber) ||
    episodes[0] || {
      id: 1,
      number: 1,
      title: 'Episode 1',
      duration: '24:00',
      thumbnail: anime?.images.jpg.large_image_url || '',
      videoUrl: anime?.demoVideoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    };

  // Video Events
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const cur = videoRef.current.currentTime;
      const dur = videoRef.current.duration || 1440;
      setCurrentTime(cur);
      setDuration(dur);

      // Periodically update continue watching progress
      if (anime && Math.floor(cur) % 5 === 0) {
        updateWatchProgress(
          anime.mal_id,
          anime.title,
          anime.images.jpg.large_image_url,
          activeEpisode.number,
          activeEpisode.title,
          cur,
          dur
        );
      }
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    if (autoPlayNext && currentEpNumber < episodes.length) {
      showToast(`Autoplaying Episode ${currentEpNumber + 1}...`, 'info');
      handleSelectEpisode(currentEpNumber + 1);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      if (val === 0) {
        setIsMuted(true);
        videoRef.current.muted = true;
      } else {
        setIsMuted(false);
        videoRef.current.muted = false;
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      setIsMuted(nextMuted);
      videoRef.current.muted = nextMuted;
    }
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setIsSpeedMenuOpen(false);
  };

  const skipSeconds = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + seconds));
    }
  };

  const handleSelectEpisode = (epNum: number) => {
    setSearchParams({ ep: epNum.toString() });
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = window.setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-28 pb-16 flex flex-col items-center justify-center text-slate-400 gap-4">
        <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-base font-semibold">Preparing video stream player...</p>
      </div>
    );
  }

  if (!anime) return null;

  const inWatchlist = isInWatchlist(anime.mal_id);
  const favorited = isFavorite(anime.mal_id);

  return (
    <div className="min-h-screen bg-[#08080c] text-slate-100 pt-20 pb-20">
      <div
        className={`mx-auto px-4 sm:px-6 transition-all duration-300 ${
          isTheaterMode ? 'max-w-full px-0' : 'max-w-7xl'
        }`}
      >
        {/* Top Breadcrumb & Status */}
        <div className="flex items-center justify-between mb-3 text-xs text-slate-400 px-2 sm:px-0">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to={`/anime/${anime.mal_id}`} className="hover:text-white transition-colors truncate max-w-[150px] sm:max-w-[300px]">
              {anime.title}
            </Link>
            <span>/</span>
            <span className="text-rose-400 font-bold">Episode {activeEpisode.number}</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-emerald-400 font-semibold bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>High Definition 1080p Stream (Demo Public-Domain)</span>
          </div>
        </div>

        {/* Video Player Main Viewport */}
        <div
          ref={playerContainerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => isPlaying && setShowControls(false)}
          className={`relative aspect-video w-full bg-black overflow-hidden shadow-2xl transition-all duration-300 ${
            isTheaterMode ? 'rounded-none' : 'rounded-2xl border border-white/10'
          }`}
        >
          {/* HTML5 Video Element */}
          <video
            ref={videoRef}
            src={activeEpisode.videoUrl}
            poster={activeEpisode.thumbnail || anime.banner_image}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnded}
            onClick={togglePlay}
            className="w-full h-full object-contain cursor-pointer"
            playsInline
          />

          {/* Watermark Logo in Corner */}
          <div className="absolute top-4 left-4 z-20 pointer-events-none flex items-center gap-1.5 opacity-70">
            <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-rose-500 to-purple-600 flex items-center justify-center text-white font-black text-xs">
              A
            </div>
            <span className="text-xs font-black tracking-wider text-white">ANIMEVERSE</span>
          </div>

          {/* Big Center Play Button when Paused */}
          {!isPlaying && (
            <div
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer z-20"
            >
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-rose-500/90 text-white flex items-center justify-center shadow-neon-red hover:scale-110 active:scale-95 transition-all">
                <Play className="w-8 h-8 fill-white ml-1" />
              </div>
            </div>
          )}

          {/* Custom Player Controls Bar */}
          <div
            className={`absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-3 sm:p-5 transition-opacity duration-300 ${
              showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Scrubber Timeline */}
            <div className="relative mb-3 flex items-center group/scrub">
              <input
                type="range"
                min={0}
                max={duration || 100}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-rose-500 focus:outline-none"
              />
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between gap-3 text-white">
              {/* Left: Play/Pause, Skip, Time, Volume */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={togglePlay}
                  className="p-1.5 hover:text-rose-400 transition-colors"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
                </button>

                <button
                  onClick={() => skipSeconds(-10)}
                  className="p-1.5 hover:text-rose-400 transition-colors hidden sm:inline"
                  title="Rewind 10s"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => skipSeconds(10)}
                  className="p-1.5 hover:text-rose-400 transition-colors hidden sm:inline"
                  title="Forward 10s"
                >
                  <RotateCw className="w-4 h-4" />
                </button>

                {/* Volume Slider */}
                <div className="flex items-center gap-1.5 group/vol">
                  <button
                    onClick={toggleMute}
                    className="p-1.5 hover:text-rose-400 transition-colors"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-5 h-5 text-rose-400" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-16 sm:w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-rose-500 hidden sm:inline"
                  />
                </div>

                {/* Time Display */}
                <div className="text-xs font-mono text-slate-300 ml-1">
                  <span>{formatTime(currentTime)}</span>
                  <span className="text-slate-500 mx-1">/</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Right: Ep Nav, Speed, Theater, Fullscreen */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Prev Episode */}
                <button
                  disabled={currentEpNumber <= 1}
                  onClick={() => handleSelectEpisode(currentEpNumber - 1)}
                  className="p-1.5 text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-300"
                  title="Previous Episode"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                {/* Next Episode */}
                <button
                  disabled={currentEpNumber >= episodes.length}
                  onClick={() => handleSelectEpisode(currentEpNumber + 1)}
                  className="p-1.5 text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-300"
                  title="Next Episode"
                >
                  <SkipForward className="w-4 h-4" />
                </button>

                {/* Playback Speed Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsSpeedMenuOpen(!isSpeedMenuOpen)}
                    className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-xs font-bold transition-all"
                  >
                    {playbackSpeed}x
                  </button>
                  {isSpeedMenuOpen && (
                    <div className="absolute bottom-9 right-0 bg-[#141520] border border-white/10 rounded-xl p-1 shadow-2xl z-40 text-xs">
                      {[0.5, 0.75, 1, 1.25, 1.5, 2].map((spd) => (
                        <button
                          key={spd}
                          onClick={() => handleSpeedChange(spd)}
                          className={`w-full px-3 py-1.5 rounded-lg text-left transition-colors ${
                            playbackSpeed === spd
                              ? 'bg-rose-500 text-white font-bold'
                              : 'text-slate-300 hover:bg-white/10'
                          }`}
                        >
                          {spd}x
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Theater Mode Toggle */}
                <button
                  onClick={() => setIsTheaterMode(!isTheaterMode)}
                  className="p-1.5 hover:text-rose-400 transition-colors hidden md:inline text-xs font-semibold px-2 rounded bg-white/10"
                  title="Toggle Theater Mode"
                >
                  {isTheaterMode ? 'Standard' : 'Theater'}
                </button>

                {/* Fullscreen Toggle */}
                <button
                  onClick={toggleFullscreen}
                  className="p-1.5 hover:text-rose-400 transition-colors"
                  title="Fullscreen"
                >
                  {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Beneath Player: Episode Navigation & Actions */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Anime Title, Episode Info, Watchlist Button */}
          <div className="lg:col-span-2 space-y-4">
            <div className="p-5 rounded-2xl bg-[#11121a] border border-white/5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      Episode {activeEpisode.number} of {episodes.length}
                    </span>
                    <span className="text-xs text-slate-400">1080p Ultra HD</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black text-white font-display">
                    {activeEpisode.title}
                  </h1>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (inWatchlist) {
                        removeFromWatchlist(anime.mal_id);
                      } else {
                        addToWatchlist(anime, 'watching');
                      }
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                      inWatchlist
                        ? 'bg-purple-600/30 border-purple-500 text-purple-300'
                        : 'bg-white/10 hover:bg-white/15 border-white/10 text-white'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${inWatchlist ? 'fill-purple-400' : ''}`} />
                    <span>{inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}</span>
                  </button>

                  <button
                    onClick={() => toggleFavorite(anime)}
                    className={`p-2 rounded-xl border transition-all ${
                      favorited
                        ? 'bg-rose-600/30 border-rose-500 text-rose-300'
                        : 'bg-white/10 hover:bg-white/15 border-white/10 text-white'
                    }`}
                    title="Favorite"
                  >
                    <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-400 text-rose-400' : ''}`} />
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      showToast('Player link copied to clipboard!', 'success');
                    }}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white"
                    title="Share Episode"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeEpisode.synopsis}
              </p>

              {/* Anime metadata summary */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                <Link
                  to={`/anime/${anime.mal_id}`}
                  className="text-rose-400 hover:underline font-bold flex items-center gap-1"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>View Full Details & Season Cast</span>
                </Link>

                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-300 select-none">
                    <input
                      type="checkbox"
                      checked={autoPlayNext}
                      onChange={(e) => setAutoPlayNext(e.target.checked)}
                      className="accent-rose-500 rounded"
                    />
                    <span>Autoplay Next Episode</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Related Anime Row */}
            {similarAnime.length > 0 && (
              <div className="pt-4">
                <h3 className="text-lg font-bold text-white font-display mb-3">
                  You Might Also Like
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {similarAnime.slice(0, 4).map((sim) => (
                    <AnimeCard key={sim.mal_id} anime={sim} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Col: Episode Selection Sidebar */}
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-[#11121a] border border-white/5">
              <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3">
                <div className="flex items-center gap-2">
                  <List className="w-4 h-4 text-rose-500" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Select Episode
                  </h3>
                </div>
                <span className="text-xs text-slate-400 font-semibold">
                  1 - {episodes.length}
                </span>
              </div>

              {/* Scrollable Episode List */}
              <div className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
                {episodes.map((ep) => (
                  <div
                    key={ep.id}
                    onClick={() => handleSelectEpisode(ep.number)}
                    className={`flex items-center gap-3 p-2 rounded-xl transition-all cursor-pointer ${
                      ep.number === currentEpNumber
                        ? 'bg-rose-500/20 border border-rose-500/50 text-white'
                        : 'bg-white/[0.03] hover:bg-white/[0.08] border border-transparent text-slate-300'
                    }`}
                  >
                    <div className="relative w-16 h-11 rounded-lg overflow-hidden shrink-0 bg-slate-900">
                      <img
                        src={ep.thumbnail}
                        alt={ep.title}
                        className="w-full h-full object-cover"
                      />
                      {ep.number === currentEpNumber && (
                        <div className="absolute inset-0 bg-rose-600/40 flex items-center justify-center">
                          <Play className="w-3 h-3 fill-white text-white" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${ep.number === currentEpNumber ? 'text-rose-400' : 'text-slate-200'}`}>
                          EP {ep.number}
                        </span>
                        <span className="text-[10px] text-slate-500">{ep.duration}</span>
                      </div>
                      <p className="text-xs text-slate-300 truncate">
                        {ep.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
