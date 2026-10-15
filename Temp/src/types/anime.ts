export interface Genre {
  mal_id: number;
  name: string;
  slug?: string;
}

export interface Studio {
  mal_id: number;
  name: string;
}

export interface Trailer {
  youtube_id: string | null;
  url: string | null;
  embed_url: string | null;
}

export interface AnimeImageUrls {
  image_url: string;
  small_image_url?: string;
  large_image_url: string;
}

export interface AnimeImages {
  jpg: AnimeImageUrls;
  webp?: AnimeImageUrls;
}

export interface Episode {
  id: number;
  number: number;
  title: string;
  title_japanese?: string;
  thumbnail: string;
  duration: string;
  synopsis?: string;
  videoUrl: string;
  isFiller?: boolean;
}

export interface Character {
  id: number;
  name: string;
  role: 'Main' | 'Supporting';
  image: string;
  voiceActor: {
    name: string;
    language: string;
    image: string;
  };
}

export interface Anime {
  mal_id: number;
  id?: number | string;
  title: string;
  title_english: string | null;
  title_japanese: string | null;
  synopsis: string;
  background?: string | null;
  banner_image?: string;
  images: AnimeImages;
  trailer: Trailer;
  type: 'TV' | 'Movie' | 'OVA' | 'ONA' | 'Special';
  episodes: number | null;
  status: 'Currently Airing' | 'Finished Airing' | 'Not yet aired';
  airing: boolean;
  aired_string?: string;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  season?: string;
  year?: number;
  studios: Studio[];
  genres: Genre[];
  themes?: Genre[];
  featured?: boolean;
  badge?: string;
  demoVideoUrl?: string;
  episodeList?: Episode[];
  characters?: Character[];
}

export type WatchlistStatus = 'watching' | 'plan_to_watch' | 'completed' | 'dropped';

export interface WatchlistItem {
  anime: Anime;
  status: WatchlistStatus;
  addedAt: string;
  updatedAt: string;
  currentEpisode?: number;
  userRating?: number;
}

export interface WatchHistoryItem {
  animeId: number;
  animeTitle: string;
  animePoster: string;
  episodeNumber: number;
  episodeTitle: string;
  currentTime: number;
  duration: number;
  lastWatched: string;
}

export interface FilterState {
  searchQuery: string;
  genre: string;
  status: string;
  type: string;
  year: string;
  sortBy: 'popularity' | 'score' | 'newest' | 'title';
  minScore: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinedDate: string;
  favoriteGenres: string[];
}
