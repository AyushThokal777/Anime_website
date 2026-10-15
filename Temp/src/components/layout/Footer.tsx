import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAnime } from '../../context/AnimeContext';
import {
  Send,
  Sparkles,
  ShieldAlert,
  Heart,
  Globe,
  Tv,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { showToast } = useAnime();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    showToast('Subscribed to ANIMEVERSE updates! 🎉', 'success');
    setEmail('');
  };

  return (
    <footer className="relative bg-[#07070a] border-t border-white/5 pt-16 pb-12 overflow-hidden text-slate-400">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-rose-600/10 via-purple-600/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/5">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-purple-600 text-white font-black text-lg shadow-neon-red">
                A
              </div>
              <span className="text-xl font-black tracking-wider text-white font-display">
                ANIME<span className="text-rose-500">VERSE</span>
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              ANIMEVERSE is the premier next-generation anime streaming and discovery platform. Explore thousands of series, track your watching progress, and experience cinematic playback in high definition.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="space-y-2 pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Weekly Anime Digest
              </p>
              <div className="flex max-w-sm">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="w-full px-3.5 py-2.5 rounded-l-xl bg-white/[0.04] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-rose-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold rounded-r-xl shadow-neon-red transition-all flex items-center justify-center"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-rose-400 transition-colors">Home Page</Link>
              </li>
              <li>
                <Link to="/discover" className="hover:text-rose-400 transition-colors">Explore All Anime</Link>
              </li>
              <li>
                <Link to="/trending" className="hover:text-rose-400 transition-colors">Trending Series</Link>
              </li>
              <li>
                <Link to="/genres" className="hover:text-rose-400 transition-colors">Browse Genres</Link>
              </li>
              <li>
                <Link to="/movies" className="hover:text-rose-400 transition-colors">Anime Movies</Link>
              </li>
              <li>
                <Link to="/watchlist" className="hover:text-rose-400 transition-colors">My Watchlist</Link>
              </li>
            </ul>
          </div>

          {/* Genres */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Top Genres
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/discover?genre=Action" className="hover:text-rose-400 transition-colors">Action & Shounen</Link>
              </li>
              <li>
                <Link to="/discover?genre=Fantasy" className="hover:text-rose-400 transition-colors">Dark & High Fantasy</Link>
              </li>
              <li>
                <Link to="/discover?genre=Sci-Fi" className="hover:text-rose-400 transition-colors">Cyberpunk & Sci-Fi</Link>
              </li>
              <li>
                <Link to="/discover?genre=Romance" className="hover:text-rose-400 transition-colors">Romance & Drama</Link>
              </li>
              <li>
                <Link to="/discover?genre=Isekai" className="hover:text-rose-400 transition-colors">Isekai Reincarnation</Link>
              </li>
              <li>
                <Link to="/discover?genre=Horror" className="hover:text-rose-400 transition-colors">Supernatural & Horror</Link>
              </li>
            </ul>
          </div>

          {/* Legal & Platform Info */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">
              Platform & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="cursor-pointer hover:text-white transition-colors" onClick={() => showToast('About ANIMEVERSE: Built for anime fans worldwide.', 'info')}>
                  About Us
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors" onClick={() => showToast('Terms of Service: Respect creator rights.', 'info')}>
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors" onClick={() => showToast('Privacy Policy: We never sell your personal data.', 'info')}>
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors" onClick={() => showToast('DMCA Policy: Prompt takedown compliance supported.', 'info')}>
                  DMCA Compliance
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors" onClick={() => showToast('FAQ: All streaming samples are legally hosted demo videos.', 'info')}>
                  Frequently Asked Questions
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-500 text-center md:text-left">
            <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0" />
            <p>
              Disclaimer: ANIMEVERSE is an anime discovery platform. Video playback uses legally hosted public-domain and open creative-commons demonstration files. All anime titles, images, and trademarks belong to their respective copyright holders.
            </p>
          </div>

          <p className="text-slate-500 shrink-0 text-center">
            © {new Date().getFullYear()} ANIMEVERSE. Crafted with <Heart className="w-3.5 h-3.5 inline text-rose-500 fill-rose-500 mx-0.5" /> for anime lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};
