import { Anime } from '../types/anime';

export const SAMPLE_VIDEOS = {
  action: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  fantasy: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  adventure: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  cyber: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  scifi: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
};

export const MOCK_ANIME_LIST: Anime[] = [
  {
    mal_id: 52299,
    title: 'Solo Leveling',
    title_english: 'Solo Leveling',
    title_japanese: '俺だけレベルアップな件',
    synopsis: 'Ten years ago, the "Gate" appeared and connected the real world with the realm of magic and monsters. To combat these vile beasts, ordinary people received superhuman powers and became known as "Hunters." Twenty-year-old Sung Jin-Woo is one such Hunter, but he is known as the "World\'s Weakest," owing to his pathetic power compared to even a lowly E-Rank. Still, he hunts monsters tirelessly in low-rank Gates to pay for his mother\'s medical bills. However, this miserable lifestyle changes when Jin-Woo awakens in a hospital to find a mysterious quest log floating before him.',
    banner_image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1920&auto=format&fit=crop',
    images: {
      jpg: {
        image_url: 'https://cdn.myanimelist.net/images/anime/1170/124312.jpg',
        large_image_url: 'https://cdn.myanimelist.net/images/anime/1170/124312l.jpg'
      }
    },
    trailer: {
      youtube_id: '9n_m_Kj_q3E',
      url: 'https://www.youtube.com/watch?v=9n_m_Kj_q3E',
      embed_url: 'https://www.youtube.com/embed/9n_m_Kj_q3E?enablejsapi=1&wmode=opaque&autoplay=1'
    },
    type: 'TV',
    episodes: 12,
    status: 'Finished Airing',
    airing: false,
    aired_string: 'Jan 7, 2024 to Mar 31, 2024',
    duration: '24 min per ep',
    rating: 'R - 17+ (violence & profanity)',
    score: 8.35,
    scored_by: 432500,
    rank: 185,
    popularity: 28,
    season: 'winter',
    year: 2024,
    studios: [{ mal_id: 56, name: 'A-1 Pictures' }],
    genres: [
      { mal_id: 1, name: 'Action' },
      { mal_id: 2, name: 'Adventure' },
      { mal_id: 10, name: 'Fantasy' }
    ],
    themes: [{ mal_id: 62, name: 'Isekai' }],
    featured: true,
    badge: 'Trending #1',
    demoVideoUrl: SAMPLE_VIDEOS.action,
    episodeList: [
      {
        id: 1,
        number: 1,
        title: 'I\'m Used to It',
        title_japanese: '慣れっこですから',
        thumbnail: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=640&auto=format&fit=crop',
        duration: '23:45',
        synopsis: 'Sung Jin-Woo joins a low-level dungeon expedition only to discover an uncharted double dungeon filled with colossal stone statues.',
        videoUrl: SAMPLE_VIDEOS.action,
      },
      {
        id: 2,
        number: 2,
        title: 'If I Had One More Chance',
        title_japanese: 'もう一度チャンスがあれば',
        thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=640&auto=format&fit=crop',
        duration: '24:10',
        synopsis: 'Cornered by the smiling god statue, Jin-Woo attempts to decipher the commandments of the temple before time runs out.',
        videoUrl: SAMPLE_VIDEOS.action,
      },
      {
        id: 3,
        number: 3,
        title: 'It\'s Like a Game',
        title_japanese: 'まるでゲームのようだ',
        thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=640&auto=format&fit=crop',
        duration: '23:55',
        synopsis: 'Waking up in a modern hospital room, Jin-Woo discovers a system UI visible only to him offering daily training quests.',
        videoUrl: SAMPLE_VIDEOS.action,
      },
      {
        id: 4,
        number: 4,
        title: 'I\'ve Gotta Get Stronger',
        title_japanese: '強くなりたい',
        thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=640&auto=format&fit=crop',
        duration: '24:00',
        synopsis: 'Entering an instant dungeon inside a subway station, Jin-Woo encounters feral beasts to test his rapid power scaling.',
        videoUrl: SAMPLE_VIDEOS.action,
      }
    ],
    characters: [
      {
        id: 1,
        name: 'Sung Jin-Woo',
        role: 'Main',
        image: 'https://cdn.myanimelist.net/images/characters/11/531278.jpg',
        voiceActor: {
          name: 'Taito Ban',
          language: 'Japanese',
          image: 'https://cdn.myanimelist.net/images/voiceactors/3/64835.jpg'
        }
      },
      {
        id: 2,
        name: 'Cha Hae-In',
        role: 'Supporting',
        image: 'https://cdn.myanimelist.net/images/characters/16/534346.jpg',
        voiceActor: {
          name: 'Reina Ueda',
          language: 'Japanese',
          image: 'https://cdn.myanimelist.net/images/voiceactors/3/54823.jpg'
        }
      }
    ]
  },
  {
    mal_id: 51179,
    title: 'Jujutsu Kaisen Season 2',
    title_english: 'Jujutsu Kaisen Season 2',
    title_japanese: '呪術廻戦 懐玉・玉折 / 渋谷事変',
    synopsis: 'The past comes to light when second-year students Satoru Gojo and Suguru Geto are tasked with escorting the Star Plasma Vessel, Riko Amanai, to Master Tengen. But when the Sorcerer Killer Toji Fushiguro enters the fray, the tragedy that forever breaks Gojo and Geto\'s friendship unfolds, setting the stage for the catastrophic Shibuya Incident.',
    banner_image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920&auto=format&fit=crop',
    images: {
      jpg: {
        image_url: 'https://cdn.myanimelist.net/images/anime/1792/138022.jpg',
        large_image_url: 'https://cdn.myanimelist.net/images/anime/1792/138022l.jpg'
      }
    },
    trailer: {
      youtube_id: 'O6qVieflwqs',
      url: 'https://www.youtube.com/watch?v=O6qVieflwqs',
      embed_url: 'https://www.youtube.com/embed/O6qVieflwqs?enablejsapi=1&wmode=opaque&autoplay=1'
    },
    type: 'TV',
    episodes: 23,
    status: 'Finished Airing',
    airing: false,
    aired_string: 'Jul 6, 2023 to Dec 28, 2023',
    duration: '23 min per ep',
    rating: 'R - 17+ (violence & profanity)',
    score: 8.81,
    scored_by: 680000,
    rank: 29,
    popularity: 19,
    season: 'summer',
    year: 2023,
    studios: [{ mal_id: 569, name: 'MAPPA' }],
    genres: [
      { mal_id: 1, name: 'Action' },
      { mal_id: 10, name: 'Fantasy' },
      { mal_id: 14, name: 'Horror' }
    ],
    featured: true,
    badge: 'Popular #1',
    demoVideoUrl: SAMPLE_VIDEOS.fantasy,
    episodeList: [
      {
        id: 1,
        number: 1,
        title: 'Hidden Inventory',
        title_japanese: '懐玉',
        thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=640&auto=format&fit=crop',
        duration: '23:50',
        synopsis: 'In 2006, young Satoru Gojo and Suguru Geto are assigned the mission of escorting Riko Amanai to preserve Tengen\'s immortality.',
        videoUrl: SAMPLE_VIDEOS.fantasy,
      },
      {
        id: 2,
        number: 2,
        title: 'Hidden Inventory 2',
        title_japanese: '懐玉-弐-',
        thumbnail: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=640&auto=format&fit=crop',
        duration: '23:45',
        synopsis: 'Toji Fushiguro schemes behind the scenes as bounty hunters attempt to capture Riko in Okinawa.',
        videoUrl: SAMPLE_VIDEOS.fantasy,
      }
    ],
    characters: [
      {
        id: 1,
        name: 'Satoru Gojo',
        role: 'Main',
        image: 'https://cdn.myanimelist.net/images/characters/15/422168.jpg',
        voiceActor: {
          name: 'Yuichi Nakamura',
          language: 'Japanese',
          image: 'https://cdn.myanimelist.net/images/voiceactors/2/54823.jpg'
        }
      }
    ]
  },
  {
    mal_id: 52991,
    title: 'Frieren: Beyond Journey\'s End',
    title_english: 'Frieren: Beyond Journey\'s End',
    title_japanese: '葬送のフリーレン',
    synopsis: 'The demon king has been defeated, and the victorious hero party returns home before disbanding. The four—mage Frieren, hero Himmel, priest Heiter, and warrior Eisen—reminisce about their decade-long journey as the moment to bid each other farewell arrives. But the passing of time is different for elves. Frieren witnesses her companions slowly pass away, prompting her to embark on a new journey to understand humanity.',
    banner_image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1920&auto=format&fit=crop',
    images: {
      jpg: {
        image_url: 'https://cdn.myanimelist.net/images/anime/1015/138006.jpg',
        large_image_url: 'https://cdn.myanimelist.net/images/anime/1015/138006l.jpg'
      }
    },
    trailer: {
      youtube_id: 'qgQunxD0qLk',
      url: 'https://www.youtube.com/watch?v=qgQunxD0qLk',
      embed_url: 'https://www.youtube.com/embed/qgQunxD0qLk?enablejsapi=1&wmode=opaque&autoplay=1'
    },
    type: 'TV',
    episodes: 28,
    status: 'Finished Airing',
    airing: false,
    aired_string: 'Sep 29, 2023 to Mar 22, 2024',
    duration: '24 min per ep',
    rating: 'PG-13 - Teens 13 or older',
    score: 9.32,
    scored_by: 580000,
    rank: 1,
    popularity: 56,
    season: 'fall',
    year: 2023,
    studios: [{ mal_id: 11, name: 'Madhouse' }],
    genres: [
      { mal_id: 2, name: 'Adventure' },
      { mal_id: 10, name: 'Fantasy' },
      { mal_id: 8, name: 'Drama' }
    ],
    featured: true,
    badge: 'Top Rated #1',
    demoVideoUrl: SAMPLE_VIDEOS.fantasy,
    episodeList: [
      {
        id: 1,
        number: 1,
        title: 'The Journey\'s End',
        title_japanese: '冒険の終わり',
        thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=640&auto=format&fit=crop',
        duration: '24:00',
        synopsis: 'Following the 10-year quest to fell the Demon King, the hero party witnesses the Era Meteors before going their separate ways.',
        videoUrl: SAMPLE_VIDEOS.fantasy,
      },
      {
        id: 2,
        number: 2,
        title: 'It Didn\'t Have to Be Magic...',
        title_japanese: '別に魔法じゃなくたって…',
        thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=640&auto=format&fit=crop',
        duration: '23:50',
        synopsis: 'Frieren takes on Fern as her young apprentice at the request of Heiter and explores spell decodings.',
        videoUrl: SAMPLE_VIDEOS.fantasy,
      }
    ],
    characters: [
      {
        id: 1,
        name: 'Frieren',
        role: 'Main',
        image: 'https://cdn.myanimelist.net/images/characters/7/522530.jpg',
        voiceActor: {
          name: 'Atsumi Tanezaki',
          language: 'Japanese',
          image: 'https://cdn.myanimelist.net/images/voiceactors/1/54823.jpg'
        }
      }
    ]
  },
  {
    mal_id: 55701,
    title: 'Demon Slayer: Kimetsu no Yaiba - Hashira Training Arc',
    title_english: 'Demon Slayer: Hashira Training Arc',
    title_japanese: '鬼滅の刃 柱稽古編',
    synopsis: 'Tanjiro visits Stone Hashira Himejima to prepare for upcoming battles against Muzan Kibutsuji. The training to become a Hashira—a high-ranking member of the Demon Slayer Corps—is intense and demanding, testing Tanjiro and his comrades beyond their limits as Muzan\'s shadow creeps closer.',
    banner_image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1920&auto=format&fit=crop',
    images: {
      jpg: {
        image_url: 'https://cdn.myanimelist.net/images/anime/1065/141819.jpg',
        large_image_url: 'https://cdn.myanimelist.net/images/anime/1065/141819l.jpg'
      }
    },
    trailer: {
      youtube_id: 'q6v23X7zO_c',
      url: 'https://www.youtube.com/watch?v=q6v23X7zO_c',
      embed_url: 'https://www.youtube.com/embed/q6v23X7zO_c?enablejsapi=1&wmode=opaque&autoplay=1'
    },
    type: 'TV',
    episodes: 8,
    status: 'Finished Airing',
    airing: false,
    aired_string: 'May 12, 2024 to Jun 30, 2024',
    duration: '28 min per ep',
    rating: 'R - 17+ (violence & profanity)',
    score: 8.52,
    scored_by: 320000,
    rank: 120,
    popularity: 42,
    season: 'spring',
    year: 2024,
    studios: [{ mal_id: 43, name: 'ufotable' }],
    genres: [
      { mal_id: 1, name: 'Action' },
      { mal_id: 10, name: 'Fantasy' }
    ],
    featured: true,
    badge: 'Blockbuster',
    demoVideoUrl: SAMPLE_VIDEOS.action,
    episodeList: [
      {
        id: 1,
        number: 1,
        title: 'To Defeat Muzan Kibutsuji',
        title_japanese: '鬼舞辻󠄀無惨を倒すために',
        thumbnail: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=640&auto=format&fit=crop',
        duration: '48:30',
        synopsis: 'The Hashira gather at the Ubuyashiki mansion for an emergency Hashira meeting to coordinate rigorous training regimen.',
        videoUrl: SAMPLE_VIDEOS.action,
      }
    ],
    characters: [
      {
        id: 1,
        name: 'Tanjiro Kamado',
        role: 'Main',
        image: 'https://cdn.myanimelist.net/images/characters/9/385686.jpg',
        voiceActor: {
          name: 'Natsuki Hanae',
          language: 'Japanese',
          image: 'https://cdn.myanimelist.net/images/voiceactors/2/54823.jpg'
        }
      }
    ]
  },
  {
    mal_id: 40028,
    title: 'Attack on Titan: The Final Season',
    title_english: 'Attack on Titan: The Final Season',
    title_japanese: '進撃の巨人 The Final Season',
    synopsis: 'Gabi Braun and Falco Grice have been training their entire lives to inherit one of the seven titans under Marley\'s control. With Eren Yeager and the Survey Corps invading Marleyan territory, the clash between Eldia and the world culminates in apocalyptic scale.',
    banner_image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1920&auto=format&fit=crop',
    images: {
      jpg: {
        image_url: 'https://cdn.myanimelist.net/images/anime/1000/110531.jpg',
        large_image_url: 'https://cdn.myanimelist.net/images/anime/1000/110531l.jpg'
      }
    },
    trailer: {
      youtube_id: 'M_OauHnAFc8',
      url: 'https://www.youtube.com/watch?v=M_OauHnAFc8',
      embed_url: 'https://www.youtube.com/embed/M_OauHnAFc8?enablejsapi=1&wmode=opaque&autoplay=1'
    },
    type: 'TV',
    episodes: 28,
    status: 'Finished Airing',
    airing: false,
    aired_string: 'Dec 7, 2020 to Mar 29, 2021',
    duration: '23 min per ep',
    rating: 'R - 17+ (violence & profanity)',
    score: 8.80,
    scored_by: 1200000,
    rank: 34,
    popularity: 5,
    season: 'winter',
    year: 2021,
    studios: [{ mal_id: 569, name: 'MAPPA' }],
    genres: [
      { mal_id: 1, name: 'Action' },
      { mal_id: 8, name: 'Drama' },
      { mal_id: 41, name: 'Suspense' }
    ],
    featured: true,
    badge: 'Masterpiece',
    demoVideoUrl: SAMPLE_VIDEOS.adventure,
    episodeList: [
      {
        id: 1,
        number: 1,
        title: 'The Other Side of the Sea',
        title_japanese: '海の向こう側',
        thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=640&auto=format&fit=crop',
        duration: '23:55',
        synopsis: 'Marley\'s war with the Mid-East Allied Forces reaches its bloody climax at Fort Slava.',
        videoUrl: SAMPLE_VIDEOS.adventure,
      }
    ],
    characters: [
      {
        id: 1,
        name: 'Eren Yeager',
        role: 'Main',
        image: 'https://cdn.myanimelist.net/images/characters/10/386832.jpg',
        voiceActor: {
          name: 'Yuki Kaji',
          language: 'Japanese',
          image: 'https://cdn.myanimelist.net/images/voiceactors/2/54823.jpg'
        }
      }
    ]
  },
  {
    mal_id: 44511,
    title: 'Chainsaw Man',
    title_english: 'Chainsaw Man',
    title_japanese: 'チェンソーマン',
    synopsis: 'Denji is robbed of a normal teenage life, left with nothing but his deceased father\'s overwhelming debt. His only companion is his pet, the chainsaw devil Pochita, with whom he slays devils for money. After a betrayal leads to his demise, Pochita merges with Denji\'s heart, resurrecting him as a human-devil hybrid capable of chainsaw transformation.',
    banner_image: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1920&auto=format&fit=crop',
    images: {
      jpg: {
        image_url: 'https://cdn.myanimelist.net/images/anime/1806/126216.jpg',
        large_image_url: 'https://cdn.myanimelist.net/images/anime/1806/126216l.jpg'
      }
    },
    trailer: {
      youtube_id: 'q15CRdE5Bv0',
      url: 'https://www.youtube.com/watch?v=q15CRdE5Bv0',
      embed_url: 'https://www.youtube.com/embed/q15CRdE5Bv0?enablejsapi=1&wmode=opaque&autoplay=1'
    },
    type: 'TV',
    episodes: 12,
    status: 'Finished Airing',
    airing: false,
    aired_string: 'Oct 12, 2022 to Dec 28, 2022',
    duration: '24 min per ep',
    rating: 'R - 17+ (violence & profanity)',
    score: 8.48,
    scored_by: 840000,
    rank: 135,
    popularity: 20,
    season: 'fall',
    year: 2022,
    studios: [{ mal_id: 569, name: 'MAPPA' }],
    genres: [
      { mal_id: 1, name: 'Action' },
      { mal_id: 10, name: 'Fantasy' },
      { mal_id: 14, name: 'Horror' }
    ],
    featured: false,
    badge: 'Action Hit',
    demoVideoUrl: SAMPLE_VIDEOS.cyber,
    episodeList: [
      {
        id: 1,
        number: 1,
        title: 'Dog & Chainsaw',
        title_japanese: '犬とチェンソー',
        thumbnail: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=640&auto=format&fit=crop',
        duration: '24:10',
        synopsis: 'Denji struggles to pay his father\'s massive debts alongside Pochita, until the Zombie Devil ambushes them.',
        videoUrl: SAMPLE_VIDEOS.cyber,
      }
    ],
    characters: [
      {
        id: 1,
        name: 'Denji',
        role: 'Main',
        image: 'https://cdn.myanimelist.net/images/characters/3/492407.jpg',
        voiceActor: {
          name: 'Kikunosuke Toya',
          language: 'Japanese',
          image: 'https://cdn.myanimelist.net/images/voiceactors/2/54823.jpg'
        }
      }
    ]
  },
  {
    mal_id: 52034,
    title: 'Oshi no Ko',
    title_english: 'Oshi no Ko',
    title_japanese: '【推しの子】',
    synopsis: 'Sixteen-year-old Ai Hoshino is a talented and charismatic idol revered by her fans. When country gynecologist Gorou Amemiya is reincarnated as one of Ai\'s twin infants alongside another fan, they uncover the dark, cynical reality of the entertainment industry when tragedy strikes.',
    banner_image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1920&auto=format&fit=crop',
    images: {
      jpg: {
        image_url: 'https://cdn.myanimelist.net/images/anime/1812/134736.jpg',
        large_image_url: 'https://cdn.myanimelist.net/images/anime/1812/134736l.jpg'
      }
    },
    trailer: {
      youtube_id: 'g3bbz_953sM',
      url: 'https://www.youtube.com/watch?v=g3bbz_953sM',
      embed_url: 'https://www.youtube.com/embed/g3bbz_953sM?enablejsapi=1&wmode=opaque&autoplay=1'
    },
    type: 'TV',
    episodes: 11,
    status: 'Finished Airing',
    airing: false,
    aired_string: 'Apr 12, 2023 to Jun 28, 2023',
    duration: '29 min per ep',
    rating: 'PG-13 - Teens 13 or older',
    score: 8.64,
    scored_by: 510000,
    rank: 68,
    popularity: 75,
    season: 'spring',
    year: 2023,
    studios: [{ mal_id: 95, name: 'Doga Kobo' }],
    genres: [
      { mal_id: 8, name: 'Drama' },
      { mal_id: 41, name: 'Mystery' },
      { mal_id: 37, name: 'Supernatural' }
    ],
    featured: false,
    badge: 'Critically Acclaimed',
    demoVideoUrl: SAMPLE_VIDEOS.fantasy,
    episodeList: [
      {
        id: 1,
        number: 1,
        title: 'Mother and Children',
        title_japanese: 'Mother and Children',
        thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=640&auto=format&fit=crop',
        duration: '1:22:00',
        synopsis: 'A feature-length prologue chronicling the rise of idol superstar Ai Hoshino and the births of Aqua and Ruby.',
        videoUrl: SAMPLE_VIDEOS.fantasy,
      }
    ],
    characters: [
      {
        id: 1,
        name: 'Ai Hoshino',
        role: 'Main',
        image: 'https://cdn.myanimelist.net/images/characters/15/487392.jpg',
        voiceActor: {
          name: 'Rie Takahashi',
          language: 'Japanese',
          image: 'https://cdn.myanimelist.net/images/voiceactors/2/54823.jpg'
        }
      }
    ]
  },
  {
    mal_id: 41467,
    title: 'Bleach: Thousand-Year Blood War',
    title_english: 'Bleach: Thousand-Year Blood War',
    title_japanese: 'BLEACH 千年血戦篇',
    synopsis: 'Peace is suddenly broken when warning sirens blare through the Soul Society. Residents are disappearing without a trace, and nobody knows who is behind it. Meanwhile, a dark shadow reaches out toward Ichigo and his friends in Karakura Town as Yhwach and the Wandenreich army declare holy war.',
    banner_image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1920&auto=format&fit=crop',
    images: {
      jpg: {
        image_url: 'https://cdn.myanimelist.net/images/anime/1764/126627.jpg',
        large_image_url: 'https://cdn.myanimelist.net/images/anime/1764/126627l.jpg'
      }
    },
    trailer: {
      youtube_id: 'e8YBesRKq_o',
      url: 'https://www.youtube.com/watch?v=e8YBesRKq_o',
      embed_url: 'https://www.youtube.com/embed/e8YBesRKq_o?enablejsapi=1&wmode=opaque&autoplay=1'
    },
    type: 'TV',
    episodes: 13,
    status: 'Finished Airing',
    airing: false,
    aired_string: 'Oct 11, 2022 to Dec 27, 2022',
    duration: '24 min per ep',
    rating: 'R - 17+ (violence & profanity)',
    score: 9.01,
    scored_by: 395000,
    rank: 10,
    popularity: 210,
    season: 'fall',
    year: 2022,
    studios: [{ mal_id: 1, name: 'Pierrot' }],
    genres: [
      { mal_id: 1, name: 'Action' },
      { mal_id: 2, name: 'Adventure' },
      { mal_id: 10, name: 'Fantasy' }
    ],
    featured: false,
    badge: 'Epic Finale',
    demoVideoUrl: SAMPLE_VIDEOS.action,
    episodeList: [
      {
        id: 1,
        number: 1,
        title: 'The Blood Warfare',
        title_japanese: 'THE BLOOD WARFARE',
        thumbnail: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=640&auto=format&fit=crop',
        duration: '24:00',
        synopsis: 'Hollows are mysteriously annihilated en masse as Quincy invaders declare war upon the Soul Society.',
        videoUrl: SAMPLE_VIDEOS.action,
      }
    ],
    characters: []
  },
  {
    mal_id: 21,
    title: 'One Piece',
    title_english: 'One Piece',
    title_japanese: 'ONE PIECE',
    synopsis: 'Gol D. Roger was renowned as the "Pirate King," the strongest and most infamous being to have sailed the Grand Line. Monkey D. Luffy, a 17-year-old boy who defies your standard definition of a pirate, sets off to find the greatest treasure in the world and become the Pirate King.',
    banner_image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1920&auto=format&fit=crop',
    images: {
      jpg: {
        image_url: 'https://cdn.myanimelist.net/images/anime/6/73245.jpg',
        large_image_url: 'https://cdn.myanimelist.net/images/anime/6/73245l.jpg'
      }
    },
    trailer: {
      youtube_id: 'MCb13lbKps8',
      url: 'https://www.youtube.com/watch?v=MCb13lbKps8',
      embed_url: 'https://www.youtube.com/embed/MCb13lbKps8?enablejsapi=1&wmode=opaque&autoplay=1'
    },
    type: 'TV',
    episodes: 1120,
    status: 'Currently Airing',
    airing: true,
    aired_string: 'Oct 20, 1999 to ?',
    duration: '24 min per ep',
    rating: 'PG-13 - Teens 13 or older',
    score: 8.73,
    scored_by: 1450000,
    rank: 45,
    popularity: 18,
    season: 'fall',
    year: 1999,
    studios: [{ mal_id: 18, name: 'Toei Animation' }],
    genres: [
      { mal_id: 1, name: 'Action' },
      { mal_id: 2, name: 'Adventure' },
      { mal_id: 10, name: 'Fantasy' }
    ],
    featured: false,
    badge: 'Legendary',
    demoVideoUrl: SAMPLE_VIDEOS.adventure,
    episodeList: [
      {
        id: 1100,
        number: 1100,
        title: 'Powers on a Different Level! Luffy vs. Lucci!',
        thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=640&auto=format&fit=crop',
        duration: '23:50',
        synopsis: 'Gear 5 Luffy engages Rob Lucci\'s awakened leopard form in the futuristic laboratory of Egghead Island.',
        videoUrl: SAMPLE_VIDEOS.adventure,
      }
    ],
    characters: []
  },
  {
    mal_id: 50265,
    title: 'Spy x Family',
    title_english: 'Spy x Family',
    title_japanese: 'SPY×FAMILY',
    synopsis: 'World peace is at stake and secret agent Twilight must undergo his most difficult mission yet—pretend to be a family man. Posing as the loving husband and father, he will infiltrate an elite school. What he doesn\'t know is that his wife is an assassin and both have no idea that their adopted daughter is a telepath!',
    banner_image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1920&auto=format&fit=crop',
    images: {
      jpg: {
        image_url: 'https://cdn.myanimelist.net/images/anime/1441/122795.jpg',
        large_image_url: 'https://cdn.myanimelist.net/images/anime/1441/122795l.jpg'
      }
    },
    trailer: {
      youtube_id: 'ofXigq9aIpo',
      url: 'https://www.youtube.com/watch?v=ofXigq9aIpo',
      embed_url: 'https://www.youtube.com/embed/ofXigq9aIpo?enablejsapi=1&wmode=opaque&autoplay=1'
    },
    type: 'TV',
    episodes: 25,
    status: 'Finished Airing',
    airing: false,
    aired_string: 'Apr 9, 2022 to Jun 25, 2022',
    duration: '24 min per ep',
    rating: 'PG-13 - Teens 13 or older',
    score: 8.51,
    scored_by: 890000,
    rank: 112,
    popularity: 38,
    season: 'spring',
    year: 2022,
    studios: [{ mal_id: 858, name: 'Wit Studio' }, { mal_id: 1835, name: 'CloverWorks' }],
    genres: [
      { mal_id: 4, name: 'Comedy' },
      { mal_id: 1, name: 'Action' },
      { mal_id: 36, name: 'Slice of Life' }
    ],
    featured: false,
    badge: 'Fan Favorite',
    demoVideoUrl: SAMPLE_VIDEOS.scifi,
    episodeList: [],
    characters: []
  },
  {
    mal_id: 42310,
    title: 'Cyberpunk: Edgerunners',
    title_english: 'Cyberpunk: Edgerunners',
    title_japanese: 'サイバーパンク エッジランナーズ',
    synopsis: 'Night City is a sprawling, neon-soaked, and corrupt dystopia where chrome implants define humanity. Following a personal tragedy, a street kid named David Martinez decides to survive on the wrong side of the law by becoming an edgerunner—a mercenary outlaw.',
    banner_image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1920&auto=format&fit=crop',
    images: {
      jpg: {
        image_url: 'https://cdn.myanimelist.net/images/anime/1818/126435.jpg',
        large_image_url: 'https://cdn.myanimelist.net/images/anime/1818/126435l.jpg'
      }
    },
    trailer: {
      youtube_id: 'JtqIas3bYhg',
      url: 'https://www.youtube.com/watch?v=JtqIas3bYhg',
      embed_url: 'https://www.youtube.com/embed/JtqIas3bYhg?enablejsapi=1&wmode=opaque&autoplay=1'
    },
    type: 'ONA',
    episodes: 10,
    status: 'Finished Airing',
    airing: false,
    aired_string: 'Sep 13, 2022',
    duration: '24 min per ep',
    rating: 'R - 17+ (violence & profanity)',
    score: 8.60,
    scored_by: 620000,
    rank: 78,
    popularity: 58,
    season: 'fall',
    year: 2022,
    studios: [{ mal_id: 803, name: 'Trigger' }],
    genres: [
      { mal_id: 1, name: 'Action' },
      { mal_id: 24, name: 'Sci-Fi' }
    ],
    featured: false,
    badge: 'Must Watch',
    demoVideoUrl: SAMPLE_VIDEOS.cyber,
    episodeList: [],
    characters: []
  },
  {
    mal_id: 32281,
    title: 'Your Name.',
    title_english: 'Your Name.',
    title_japanese: '君の名は。',
    synopsis: 'Mitsuha Miyamizu, a high school girl living in the rural mountain town of Itomori, yearns for a life in Tokyo. Taki Tachibana is a high school student juggling part-time work in busy Tokyo. One day, Mitsuha awakens in a boy\'s body, while Taki finds himself living Mitsuha\'s rural life, initiating a mind-bending cosmic connection across space and time.',
    banner_image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1920&auto=format&fit=crop',
    images: {
      jpg: {
        image_url: 'https://cdn.myanimelist.net/images/anime/1935/127974.jpg',
        large_image_url: 'https://cdn.myanimelist.net/images/anime/1935/127974l.jpg'
      }
    },
    trailer: {
      youtube_id: 's0wTdCQoc2k',
      url: 'https://www.youtube.com/watch?v=s0wTdCQoc2k',
      embed_url: 'https://www.youtube.com/embed/s0wTdCQoc2k?enablejsapi=1&wmode=opaque&autoplay=1'
    },
    type: 'Movie',
    episodes: 1,
    status: 'Finished Airing',
    airing: false,
    aired_string: 'Aug 26, 2016',
    duration: '1 hr 46 min',
    rating: 'PG-13 - Teens 13 or older',
    score: 8.84,
    scored_by: 1900000,
    rank: 25,
    popularity: 11,
    season: 'summer',
    year: 2016,
    studios: [{ mal_id: 291, name: 'CoMix Wave Films' }],
    genres: [
      { mal_id: 8, name: 'Drama' },
      { mal_id: 22, name: 'Romance' },
      { mal_id: 37, name: 'Supernatural' }
    ],
    featured: false,
    badge: 'Movie Legend',
    demoVideoUrl: SAMPLE_VIDEOS.fantasy,
    episodeList: [
      {
        id: 1,
        number: 1,
        title: 'Your Name. (Feature Film)',
        thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=640&auto=format&fit=crop',
        duration: '1:46:35',
        synopsis: 'Mitsuha and Taki switch bodies and race against an impending celestial disaster.',
        videoUrl: SAMPLE_VIDEOS.fantasy,
      }
    ],
    characters: []
  },
  {
    mal_id: 54744,
    title: 'Kaiju No. 8',
    title_english: 'Kaiju No. 8',
    title_japanese: '怪獣８号',
    synopsis: 'Grotesque monsters known as "Kaiju" emerge across Japan, threatening human existence. Kafka Hibino works as a cleanup technician disposing of Kaiju corpses, abandoning his childhood promise to join the Defense Force. But after an unexpected symbiotic creature enters his body, Kafka gains the ability to transform into Kaiju No. 8.',
    banner_image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1920&auto=format&fit=crop',
    images: {
      jpg: {
        image_url: 'https://cdn.myanimelist.net/images/anime/1169/142340.jpg',
        large_image_url: 'https://cdn.myanimelist.net/images/anime/1169/142340l.jpg'
      }
    },
    trailer: {
      youtube_id: 'tNnZphf9h40',
      url: 'https://www.youtube.com/watch?v=tNnZphf9h40',
      embed_url: 'https://www.youtube.com/embed/tNnZphf9h40?enablejsapi=1&wmode=opaque&autoplay=1'
    },
    type: 'TV',
    episodes: 12,
    status: 'Finished Airing',
    airing: false,
    aired_string: 'Apr 13, 2024 to Jun 29, 2024',
    duration: '24 min per ep',
    rating: 'PG-13 - Teens 13 or older',
    score: 8.29,
    scored_by: 310000,
    rank: 220,
    popularity: 110,
    season: 'spring',
    year: 2024,
    studios: [{ mal_id: 10, name: 'Production I.G' }],
    genres: [
      { mal_id: 1, name: 'Action' },
      { mal_id: 24, name: 'Sci-Fi' }
    ],
    featured: false,
    badge: 'Monster Smash',
    demoVideoUrl: SAMPLE_VIDEOS.scifi,
    episodeList: [],
    characters: []
  },
  {
    mal_id: 57334,
    title: 'Dan Da Dan',
    title_english: 'DAN DA DAN',
    title_japanese: 'ダンダダン',
    synopsis: 'Momo Ayase, a high school girl who believes in ghosts but not aliens, and her classmate Okarun, who believes in aliens but not ghosts, make a wager to see who is right by visiting occult hotspots. Both discover supernatural terrors that are horrifyingly real.',
    banner_image: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1920&auto=format&fit=crop',
    images: {
      jpg: {
        image_url: 'https://cdn.myanimelist.net/images/anime/1113/144943.jpg',
        large_image_url: 'https://cdn.myanimelist.net/images/anime/1113/144943l.jpg'
      }
    },
    trailer: {
      youtube_id: 'i8N5uY5x97Q',
      url: 'https://www.youtube.com/watch?v=i8N5uY5x97Q',
      embed_url: 'https://www.youtube.com/embed/i8N5uY5x97Q?enablejsapi=1&wmode=opaque&autoplay=1'
    },
    type: 'TV',
    episodes: 12,
    status: 'Currently Airing',
    airing: true,
    aired_string: 'Oct 4, 2024 to ?',
    duration: '24 min per ep',
    rating: 'R - 17+ (violence & profanity)',
    score: 8.78,
    scored_by: 280000,
    rank: 41,
    popularity: 65,
    season: 'fall',
    year: 2024,
    studios: [{ mal_id: 1591, name: 'Science SARU' }],
    genres: [
      { mal_id: 1, name: 'Action' },
      { mal_id: 4, name: 'Comedy' },
      { mal_id: 37, name: 'Supernatural' }
    ],
    featured: false,
    badge: 'New Sensation',
    demoVideoUrl: SAMPLE_VIDEOS.action,
    episodeList: [],
    characters: []
  },
  {
    mal_id: 54857,
    title: 'Wind Breaker',
    title_english: 'WIND BREAKER',
    title_japanese: 'ウィンドブレイカー',
    synopsis: 'Haruka Sakura wants nothing to do with weaklings—he\'s only interested in the strongest of the strong. He\'s just started at Furin High School, a school of degenerates known only for their brawling strength—strength they use to protect their town from anyone who wishes it ill.',
    banner_image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1920&auto=format&fit=crop',
    images: {
      jpg: {
        image_url: 'https://cdn.myanimelist.net/images/anime/1865/141838.jpg',
        large_image_url: 'https://cdn.myanimelist.net/images/anime/1865/141838l.jpg'
      }
    },
    trailer: {
      youtube_id: 'V1z3_jLq-1E',
      url: 'https://www.youtube.com/watch?v=V1z3_jLq-1E',
      embed_url: 'https://www.youtube.com/embed/V1z3_jLq-1E?enablejsapi=1&wmode=opaque&autoplay=1'
    },
    type: 'TV',
    episodes: 13,
    status: 'Finished Airing',
    airing: false,
    aired_string: 'Apr 5, 2024 to Jun 28, 2024',
    duration: '23 min per ep',
    rating: 'PG-13 - Teens 13 or older',
    score: 8.01,
    scored_by: 175000,
    rank: 512,
    popularity: 390,
    season: 'spring',
    year: 2024,
    studios: [{ mal_id: 1835, name: 'CloverWorks' }],
    genres: [
      { mal_id: 1, name: 'Action' }
    ],
    featured: false,
    badge: 'Hot Delinquents',
    demoVideoUrl: SAMPLE_VIDEOS.action,
    episodeList: [],
    characters: []
  },
  {
    mal_id: 5114,
    title: 'Fullmetal Alchemist: Brotherhood',
    title_english: 'Fullmetal Alchemist: Brotherhood',
    title_japanese: '鋼の錬金術師 FULLMETAL ALCHEMIST',
    synopsis: 'After a horrific alchemy experiment goes wrong in the Elric household, brothers Edward and Alphonse are left in catastrophic reality. Edward loses his leg and arm, while Alphonse loses his entire body, his soul bound to a suit of armor. Together, they seek the Philosopher\'s Stone to restore what was lost.',
    banner_image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1920&auto=format&fit=crop',
    images: {
      jpg: {
        image_url: 'https://cdn.myanimelist.net/images/anime/1208/94745.jpg',
        large_image_url: 'https://cdn.myanimelist.net/images/anime/1208/94745l.jpg'
      }
    },
    trailer: {
      youtube_id: '--IcmZkvL0Q',
      url: 'https://www.youtube.com/watch?v=--IcmZkvL0Q',
      embed_url: 'https://www.youtube.com/embed/--IcmZkvL0Q?enablejsapi=1&wmode=opaque&autoplay=1'
    },
    type: 'TV',
    episodes: 64,
    status: 'Finished Airing',
    airing: false,
    aired_string: 'Apr 5, 2009 to Jul 4, 2010',
    duration: '24 min per ep',
    rating: 'R - 17+ (violence & profanity)',
    score: 9.09,
    scored_by: 2100000,
    rank: 3,
    popularity: 3,
    season: 'spring',
    year: 2009,
    studios: [{ mal_id: 4, name: 'Bones' }],
    genres: [
      { mal_id: 1, name: 'Action' },
      { mal_id: 2, name: 'Adventure' },
      { mal_id: 8, name: 'Drama' },
      { mal_id: 10, name: 'Fantasy' }
    ],
    featured: false,
    badge: 'All-Time Classic',
    demoVideoUrl: SAMPLE_VIDEOS.fantasy,
    episodeList: [],
    characters: []
  },
  {
    mal_id: 9253,
    title: 'Steins;Gate',
    title_english: 'Steins;Gate',
    title_japanese: 'STEINS;GATE',
    synopsis: 'Self-proclaimed mad scientist Rintarou Okabe rents out a room in Akihabara, where he and his fellow lab members invent the "Phone Microwave," which can send emails into the past and alter the flow of time itself.',
    banner_image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1920&auto=format&fit=crop',
    images: {
      jpg: {
        image_url: 'https://cdn.myanimelist.net/images/anime/1935/127974.jpg',
        large_image_url: 'https://cdn.myanimelist.net/images/anime/7375/112414l.jpg'
      }
    },
    trailer: {
      youtube_id: 'uMYhjVwp0Fk',
      url: 'https://www.youtube.com/watch?v=uMYhjVwp0Fk',
      embed_url: 'https://www.youtube.com/embed/uMYhjVwp0Fk?enablejsapi=1&wmode=opaque&autoplay=1'
    },
    type: 'TV',
    episodes: 24,
    status: 'Finished Airing',
    airing: false,
    aired_string: 'Apr 6, 2011 to Sep 14, 2011',
    duration: '24 min per ep',
    rating: 'PG-13 - Teens 13 or older',
    score: 9.07,
    scored_by: 1400000,
    rank: 4,
    popularity: 14,
    season: 'spring',
    year: 2011,
    studios: [{ mal_id: 314, name: 'White Fox' }],
    genres: [
      { mal_id: 8, name: 'Drama' },
      { mal_id: 24, name: 'Sci-Fi' },
      { mal_id: 41, name: 'Suspense' }
    ],
    featured: false,
    badge: 'Sci-Fi Legend',
    demoVideoUrl: SAMPLE_VIDEOS.scifi,
    episodeList: [],
    characters: []
  },
  {
    mal_id: 28851,
    title: 'A Silent Voice',
    title_english: 'A Silent Voice',
    title_japanese: '聲の形',
    synopsis: 'As a wild youth, elementary school student Shouya Ishida sought to beat boredom in the cruelest ways. When the deaf Shouko Nishimiya transfers into his class, Shouya and his class bully her for their amusement. Years later, haunted by guilt, Shouya sets out on a path of redemption.',
    banner_image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1920&auto=format&fit=crop',
    images: {
      jpg: {
        image_url: 'https://cdn.myanimelist.net/images/anime/1122/96481.jpg',
        large_image_url: 'https://cdn.myanimelist.net/images/anime/1122/96481l.jpg'
      }
    },
    trailer: {
      youtube_id: 'nfK6UgLra7g',
      url: 'https://www.youtube.com/watch?v=nfK6UgLra7g',
      embed_url: 'https://www.youtube.com/embed/nfK6UgLra7g?enablejsapi=1&wmode=opaque&autoplay=1'
    },
    type: 'Movie',
    episodes: 1,
    status: 'Finished Airing',
    airing: false,
    aired_string: 'Sep 17, 2016',
    duration: '2 hr 10 min',
    rating: 'PG-13 - Teens 13 or older',
    score: 8.93,
    scored_by: 1600000,
    rank: 16,
    popularity: 22,
    season: 'summer',
    year: 2016,
    studios: [{ mal_id: 2, name: 'Kyoto Animation' }],
    genres: [
      { mal_id: 8, name: 'Drama' },
      { mal_id: 22, name: 'Romance' }
    ],
    featured: false,
    badge: 'Tearjerker',
    demoVideoUrl: SAMPLE_VIDEOS.fantasy,
    episodeList: [],
    characters: []
  }
];

export const GENRE_CATEGORIES = [
  { id: 1, name: 'Action', slug: 'action', color: 'from-red-600 to-orange-600', icon: 'Sword', bg: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop', desc: 'High-octane fights, intense battles, and heroic clashes' },
  { id: 2, name: 'Adventure', slug: 'adventure', color: 'from-amber-500 to-emerald-600', icon: 'Compass', bg: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop', desc: 'Expansive worlds, epic journeys, and uncharted quests' },
  { id: 10, name: 'Fantasy', slug: 'fantasy', color: 'from-purple-600 to-indigo-600', icon: 'Wand2', bg: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop', desc: 'Magic spells, mythical monsters, and enchanted realms' },
  { id: 24, name: 'Sci-Fi', slug: 'sci-fi', color: 'from-cyan-500 to-blue-600', icon: 'Cpu', bg: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=600&auto=format&fit=crop', desc: 'Cyberpunk cities, mechas, space travel, and future tech' },
  { id: 22, name: 'Romance', slug: 'romance', color: 'from-pink-500 to-rose-600', icon: 'Heart', bg: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop', desc: 'Heartwarming love stories, emotional bonds, and fateful encounters' },
  { id: 4, name: 'Comedy', slug: 'comedy', color: 'from-yellow-400 to-orange-500', icon: 'Smile', bg: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=600&auto=format&fit=crop', desc: 'Hilarious antics, slapstick humor, and heartwarming laughter' },
  { id: 62, name: 'Isekai', slug: 'isekai', color: 'from-violet-600 to-fuchsia-600', icon: 'Sparkles', bg: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600&auto=format&fit=crop', desc: 'Reincarnated into another world with overpowered abilities' },
  { id: 14, name: 'Horror', slug: 'horror', color: 'from-neutral-900 to-red-950', icon: 'Skull', bg: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop', desc: 'Terrifying curses, spine-chilling demons, and psychological dread' },
  { id: 41, name: 'Mystery', slug: 'mystery', color: 'from-blue-900 to-indigo-950', icon: 'HelpCircle', bg: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=600&auto=format&fit=crop', desc: 'Unsolved crimes, detective investigations, and dark secrets' },
  { id: 36, name: 'Slice of Life', slug: 'slice-of-life', color: 'from-teal-500 to-emerald-600', icon: 'Coffee', bg: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop', desc: 'Daily school life, cozy moments, friendship, and gentle stories' }
];
