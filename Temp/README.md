# ANIMEVERSE 🎬✨
### Modern, Premium, Fully Responsive Anime Streaming & Discovery Platform

**ANIMEVERSE** is an anime streaming and discovery web application built with React, TypeScript, Tailwind CSS, Framer Motion, and Lucide icons. It features a dark anime aesthetic with neon-red (`#ff2a5f`) and deep purple accents, cinematic visual effects, smooth transitions, real-time search, interactive video streaming player, and persistent watchlist tracking.

---

## 🌟 Key Features

### 1. 🎨 Design & Aesthetic
- **Cinematic Dark Theme**: Crafted with `#08080c` charcoal backgrounds, vibrant neon-red accents, and glowing purple ambient lighting.
- **Glassmorphic UI**: Translucent navigation bar, blurred backdrop overlays, and frosted action cards.
- **Micro-Interactions**: Framer Motion animations for hover elevations, modal entrances, glowing button states, and toast notifications.
- **Responsive Layout**: Designed for seamless experience across mobile, tablet, and widescreen desktop displays.

### 2. 🏠 Homepage Highlights
- **Hero Spotlight Carousel**: Auto-rotating feature banner displaying trending blockbusters (*Solo Leveling*, *Jujutsu Kaisen*, *Frieren*, *Demon Slayer*, *Attack on Titan*) with metadata badges, synopsis, "Watch Now", and "More Details" actions.
- **Continue Watching Row**: Real-time progress bars showing where you left off with one-click episode resumption.
- **Trending Anime (Horizontal Slider)**: Horizontally scrollable row with hover reveal overlays, quick watch, and watchlist toggles.
- **Popular This Season**: Interactive grid with on-the-fly sorting by Popularity, Top Rated, and Latest Releases.
- **Browse by Genre**: 10 animated genre category cards (*Action, Adventure, Fantasy, Sci-Fi, Romance, Comedy, Isekai, Horror, Mystery, Slice of Life*).
- **Top Rated Anime**: Ranked leaderboard of all-time critically acclaimed masterpieces.

### 3. 📺 Advanced Video Player (`/watch/:id`)
- **Custom Player Controls**:
  - Play / Pause with large center animated toggle.
  - Interactive timeline scrubber with live timestamp formatting.
  - Volume slider and one-click mute/unmute.
  - Playback speed selector (`0.5x`, `0.75x`, `1x`, `1.25x`, `1.5x`, `2x`).
  - Theater Mode and Fullscreen toggles.
  - Previous / Next Episode navigation with Autoplay Next toggle.
- **Interactive Episode Drawer**: Browse and switch episodes directly beside the stream.
- **Progress Tracking**: Automatically saves playback timestamp and percentage to `localStorage` for the Continue Watching section.
- **Legal Public-Domain Streams**: Powered by Creative Commons open animation sample streams clearly labeled for demo streaming.

### 4. 📖 Dedicated Anime Details Page (`/anime/:id`)
- High-resolution cover backdrop and poster art.
- Comprehensive metadata: Japanese & English titles, score, rank, popularity, season, studios, duration, age rating.
- Expandable synopsis overview.
- Clickable Episode List with thumbnails and episode titles.
- Official YouTube Trailer embed modal.
- Character & Voice Actor gallery.
- Contextual Similar Anime recommendations.

### 5. 🔍 Search & Filtering (`/discover` & Quick Search Modal)
- **Universal Search Modal**: Press `Ctrl + K` or `/` anywhere on the site for instant modal search with autocomplete suggestions and genre filter pills.
- **Advanced Discover Engine**: Multi-faceted filtering by genre, release status (*Currently Airing*, *Finished*), format (*TV Series*, *Movie*, *ONA*), release year, and minimum score threshold.
- Instant client-side sorting (*Most Popular*, *Highest Rated*, *Newest*, *A-Z*).
- Responsive empty state with one-click filter reset.

### 6. 👤 User Accounts & Watchlist Management
- **Demo Authentication**: Sign in or create an account, or use one-click demo profiles (*Eren Yeager*, *Gon Freecss*).
- **My Anime Library (`/watchlist`)**:
  - Category tabs: *All Anime*, *Watching*, *Plan to Watch*, *Completed*, and *Favorites*.
  - Change watch status on the fly with real-time feedback.
  - Persistent storage in `localStorage` across browser refreshes.
- **Toast Notifications**: Feedback when adding/removing series, updating progress, or sharing anime links.

---

## 🛠️ Technology Stack

- **Framework**: React 18 with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom neon anime palette
- **Icons**: Lucide React
- **Routing**: React Router DOM (v6)
- **Animations**: Framer Motion
- **Data Source**: Curated high-definition dataset + Jikan REST API fallback

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm

### Development Server
```bash
# Start development server
npm run dev
```
The application will be live at `http://localhost:3000/`.

### Production Build
```bash
# Build optimized production bundle
npm run build

# Preview production build
npm run preview
```
