import { Anime, Episode, FilterState } from '../types/anime';
import { MOCK_ANIME_LIST, SAMPLE_VIDEOS } from '../data/mockAnime';

const JIKAN_BASE_URL = 'https://api.jikan.moe/v4';

// In-memory cache to prevent redundant API calls
const cache = new Map<string, { timestamp: number; data: any }>();
const CACHE_TTL = 1000 * 60 * 15; // 15 minutes

const getCachedData = (key: string) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  return null;
};

const setCachedData = (key: string, data: any) => {
  cache.set(key, { timestamp: Date.now(), data });
};

// Safe fetch with fallback to curated data on rate limit or network failure
async function safeFetch<T>(endpoint: string, fallbackData: T): Promise<T> {
  const cacheKey = `jikan_${endpoint}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached as T;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

    const res = await fetch(`${JIKAN_BASE_URL}${endpoint}`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.status === 429) {
      console.warn('Jikan API rate limited (429). Using curated fallback data.');
      return fallbackData;
    }

    if (!res.ok) {
      console.warn(`Jikan API responded with status ${res.status}. Using fallback.`);
      return fallbackData;
    }

    const json = await res.json();
    setCachedData(cacheKey, json.data);
    return json.data as T;
  } catch (error) {
    console.warn(`Error fetching ${endpoint} from Jikan API:`, error);
    return fallbackData;
  }
}

// Convert Jikan Anime item to our Anime interface
function mapJikanToAnime(item: any): Anime {
  // If we already have this in our curated list, merge it with our rich data
  const curated = MOCK_ANIME_LIST.find((a) => a.mal_id === item.mal_id);
  if (curated) {
    return curated;
  }

  // Choose appropriate demo video based on primary genre
  let demoVideo = SAMPLE_VIDEOS.fantasy;
  const genreNames = item.genres?.map((g: any) => g.name.toLowerCase()) || [];
  if (genreNames.includes('action')) demoVideo = SAMPLE_VIDEOS.action;
  else if (genreNames.includes('sci-fi')) demoVideo = SAMPLE_VIDEOS.scifi;
  else if (genreNames.includes('adventure')) demoVideo = SAMPLE_VIDEOS.adventure;

  return {
    mal_id: item.mal_id,
    title: item.title,
    title_english: item.title_english || item.title,
    title_japanese: item.title_japanese || null,
    synopsis: item.synopsis || 'No synopsis available for this anime.',
    background: item.background || null,
    banner_image: item.images?.jpg?.large_image_url || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1920&auto=format&fit=crop',
    images: {
      jpg: {
        image_url: item.images?.jpg?.image_url || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=400&auto=format&fit=crop',
        large_image_url: item.images?.jpg?.large_image_url || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop',
      },
    },
    trailer: {
      youtube_id: item.trailer?.youtube_id || null,
      url: item.trailer?.url || null,
      embed_url: item.trailer?.embed_url || null,
    },
    type: item.type || 'TV',
    episodes: item.episodes || 12,
    status: item.status || 'Finished Airing',
    airing: item.airing || false,
    aired_string: item.aired?.string || `${item.year || 2023}`,
    duration: item.duration || '24 min per ep',
    rating: item.rating || 'PG-13',
    score: item.score || 8.0,
    scored_by: item.scored_by || 100000,
    rank: item.rank || 500,
    popularity: item.popularity || 500,
    season: item.season || 'fall',
    year: item.year || 2023,
    studios: item.studios?.map((s: any) => ({ mal_id: s.mal_id, name: s.name })) || [{ mal_id: 1, name: 'Animation Studio' }],
    genres: item.genres?.map((g: any) => ({ mal_id: g.mal_id, name: g.name })) || [{ mal_id: 1, name: 'Action' }],
    themes: item.themes?.map((t: any) => ({ mal_id: t.mal_id, name: t.name })) || [],
    featured: false,
    demoVideoUrl: demoVideo,
    episodeList: generateMockEpisodes(item.mal_id, item.title, item.episodes || 12, demoVideo),
  };
}

// Generates fallback episodes with nice titles and thumbnails for video player
export function generateMockEpisodes(animeId: number, title: string, count: number, videoUrl: string): Episode[] {
  const epCount = Math.min(count || 12, 24);
  const episodes: Episode[] = [];

  const thumbs = [
    'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=640&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=640&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=640&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=640&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=640&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=640&auto=format&fit=crop',
  ];

  const episodeTitles = [
    'The Beginning of the Awakening',
    'Whispers in the Dark Shadow',
    'The Trial of Crimson Flame',
    'Convergence of Fates',
    'Breaking Through the Boundary',
    'Echoes of the Forgotten Realm',
    'Unleashed Potential',
    'Beyond the Horizon of Stars',
    'The Final Stand at Dawn',
    'Clash of Destinies',
    'Truth Revealed Under Moonlight',
    'A New Journey Commences'
  ];

  for (let i = 1; i <= epCount; i++) {
    episodes.push({
      id: animeId * 1000 + i,
      number: i,
      title: episodeTitles[(i - 1) % episodeTitles.length] || `Episode ${i}`,
      title_japanese: `第${i}話`,
      thumbnail: thumbs[(i - 1) % thumbs.length],
      duration: '23:45',
      synopsis: `Episode ${i} follows our protagonists as high stakes and unexpected discoveries test their conviction to the utmost limit.`,
      videoUrl: videoUrl || SAMPLE_VIDEOS.fantasy,
    });
  }

  return episodes;
}

// 1. Hero Carousel Anime
export async function getHeroFeaturedAnime(): Promise<Anime[]> {
  // Returns top curated featured anime
  return MOCK_ANIME_LIST.slice(0, 5);
}

// 2. Trending Anime (Horizontal Scroll)
export async function getTrendingAnime(): Promise<Anime[]> {
  const fallback = MOCK_ANIME_LIST.slice(0, 10);
  const apiData = await safeFetch<any[]>('/top/anime?filter=airing&limit=10', null as any);

  if (apiData && Array.isArray(apiData) && apiData.length > 0) {
    return apiData.map(mapJikanToAnime);
  }
  return fallback;
}

// 3. Popular This Season
export async function getPopularThisSeason(): Promise<Anime[]> {
  const fallback = MOCK_ANIME_LIST.slice(2, 14);
  const apiData = await safeFetch<any[]>('/seasons/now?limit=12', null as any);

  if (apiData && Array.isArray(apiData) && apiData.length > 0) {
    return apiData.map(mapJikanToAnime);
  }
  return fallback;
}

// 4. Top Rated Anime (Ranked 1..N)
export async function getTopRatedAnime(): Promise<Anime[]> {
  const fallback = [...MOCK_ANIME_LIST]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  const apiData = await safeFetch<any[]>('/top/anime?limit=10', null as any);
  if (apiData && Array.isArray(apiData) && apiData.length > 0) {
    return apiData.map(mapJikanToAnime);
  }
  return fallback;
}

// 5. Recently Added Anime
export async function getRecentlyAddedAnime(): Promise<Anime[]> {
  const fallback = [
    MOCK_ANIME_LIST[0],
    MOCK_ANIME_LIST[3],
    MOCK_ANIME_LIST[11],
    MOCK_ANIME_LIST[12],
    MOCK_ANIME_LIST[13],
    MOCK_ANIME_LIST[1],
  ];

  const apiData = await safeFetch<any[]>('/seasons/upcoming?limit=8', null as any);
  if (apiData && Array.isArray(apiData) && apiData.length > 0) {
    return apiData.map(mapJikanToAnime);
  }
  return fallback;
}

// 6. Anime Details by ID
export async function getAnimeById(id: number | string): Promise<Anime | null> {
  const numId = Number(id);

  // Check curated list first (has best banners, episodes, and trailers)
  const curated = MOCK_ANIME_LIST.find((a) => a.mal_id === numId);
  if (curated) {
    return curated;
  }

  // Fetch from Jikan API
  const apiItem = await safeFetch<any>(`/anime/${numId}/full`, null);
  if (apiItem) {
    return mapJikanToAnime(apiItem);
  }

  // Fallback to first item if completely not found
  return MOCK_ANIME_LIST[0];
}

// 7. Similar Anime Recommendations
export async function getSimilarAnime(id: number | string): Promise<Anime[]> {
  const numId = Number(id);
  const current = MOCK_ANIME_LIST.find((a) => a.mal_id === numId);

  if (current && current.genres.length > 0) {
    const mainGenre = current.genres[0].name;
    const matches = MOCK_ANIME_LIST.filter(
      (a) => a.mal_id !== numId && a.genres.some((g) => g.name === mainGenre)
    );
    if (matches.length >= 4) return matches.slice(0, 6);
  }

  return MOCK_ANIME_LIST.filter((a) => a.mal_id !== numId).slice(0, 6);
}

// 8. Search & Filter Anime
export async function searchAnime(filters: FilterState): Promise<Anime[]> {
  const { searchQuery, genre, status, type, year, sortBy, minScore } = filters;

  // Let's filter our robust dataset first
  let results = [...MOCK_ANIME_LIST];

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    results = results.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        (a.title_english && a.title_english.toLowerCase().includes(q)) ||
        (a.title_japanese && a.title_japanese.toLowerCase().includes(q)) ||
        a.synopsis.toLowerCase().includes(q)
    );

    // If query has few results in mock and network is available, try Jikan search
    if (results.length < 3 && q.length > 2) {
      const apiResults = await safeFetch<any[]>(`/anime?q=${encodeURIComponent(q)}&limit=12&sfw=true`, null as any);
      if (apiResults && Array.isArray(apiResults) && apiResults.length > 0) {
        const mapped = apiResults.map(mapJikanToAnime);
        // Deduplicate
        const existingIds = new Set(results.map((r) => r.mal_id));
        for (const item of mapped) {
          if (!existingIds.has(item.mal_id)) {
            results.push(item);
          }
        }
      }
    }
  }

  // Filter by genre
  if (genre && genre !== 'all') {
    results = results.filter((a) =>
      a.genres.some((g) => g.name.toLowerCase() === genre.toLowerCase())
    );
  }

  // Filter by status
  if (status && status !== 'all') {
    results = results.filter((a) => a.status.toLowerCase().replace(/\s+/g, '-') === status.toLowerCase());
  }

  // Filter by type
  if (type && type !== 'all') {
    results = results.filter((a) => a.type.toLowerCase() === type.toLowerCase());
  }

  // Filter by year
  if (year && year !== 'all') {
    results = results.filter((a) => a.year?.toString() === year);
  }

  // Filter by minScore
  if (minScore > 0) {
    results = results.filter((a) => a.score >= minScore);
  }

  // Sorting
  switch (sortBy) {
    case 'score':
      results.sort((a, b) => b.score - a.score);
      break;
    case 'popularity':
      results.sort((a, b) => (a.popularity || 999) - (b.popularity || 999));
      break;
    case 'newest':
      results.sort((a, b) => (b.year || 0) - (a.year || 0));
      break;
    case 'title':
      results.sort((a, b) => a.title.localeCompare(b.title));
      break;
  }

  return results;
}
