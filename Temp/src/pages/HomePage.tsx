import React, { useState, useEffect } from 'react';
import {
  getHeroFeaturedAnime,
  getTrendingAnime,
  getPopularThisSeason,
  getTopRatedAnime,
  getRecentlyAddedAnime,
} from '../services/animeApi';
import { Anime } from '../types/anime';
import { HeroCarousel } from '../components/home/HeroCarousel';
import { ContinueWatchingSection } from '../components/home/ContinueWatchingSection';
import { AnimeRow } from '../components/anime/AnimeRow';
import { PopularSeasonGrid } from '../components/home/PopularSeasonGrid';
import { GenreCardsSection } from '../components/home/GenreCardsSection';
import { TopRatedListSection } from '../components/home/TopRatedListSection';

export const HomePage: React.FC = () => {
  const [featured, setFeatured] = useState<Anime[]>([]);
  const [trending, setTrending] = useState<Anime[]>([]);
  const [popularSeason, setPopularSeason] = useState<Anime[]>([]);
  const [topRated, setTopRated] = useState<Anime[]>([]);
  const [recentlyAdded, setRecentlyAdded] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    let isMounted = true;
    Promise.all([
      getHeroFeaturedAnime(),
      getTrendingAnime(),
      getPopularThisSeason(),
      getTopRatedAnime(),
      getRecentlyAddedAnime(),
    ])
      .then(([feat, trend, season, rated, recent]) => {
        if (isMounted) {
          setFeatured(feat);
          setTrending(trend);
          setPopularSeason(season);
          setTopRated(rated);
          setRecentlyAdded(recent);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error fetching homepage data:', err);
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#08080c] text-slate-100 pb-20">
      {/* 1. Hero Carousel */}
      {featured.length > 0 && <HeroCarousel featuredAnime={featured} />}

      {/* Main Home Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* 2. Continue Watching (if user has watch history) */}
        <ContinueWatchingSection />

        {/* 3. Trending Anime (Horizontally Scrollable Row) */}
        <AnimeRow
          title="Trending Anime"
          subtitle="Top viewed and most talked about series this week"
          animeList={trending}
          viewAllLink="/trending"
          showRank={true}
        />

        {/* 4. Popular This Season (Grid with Interactive Sorting) */}
        <PopularSeasonGrid animeList={popularSeason} />

        {/* 5. Browse by Genre Cards */}
        <GenreCardsSection />

        {/* 6. Recently Added Episodes */}
        <AnimeRow
          title="Recently Added & Airing"
          subtitle="New simulcast episodes freshly uploaded to the catalog"
          animeList={recentlyAdded}
          viewAllLink="/discover?status=currently-airing"
        />

        {/* 7. Top Rated Anime Ranked List */}
        <TopRatedListSection animeList={topRated} />
      </div>
    </div>
  );
};
