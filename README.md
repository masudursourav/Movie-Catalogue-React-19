# 🎬 Movie Catalogue React 19

A modern, responsive movie discovery application built with React 19, featuring real-time search, trending movies, and a sleek user interface powered by TailwindCSS.

## ✨ Features

- 🔍 **Real-time Movie Search** - Search movies with debounced input for optimal performance
- 📈 **Trending Movies** - Track and display most searched movies using Appwrite database
- 🎨 **Modern UI** - Beautiful, responsive design with TailwindCSS v4
- ⚡ **React 19** - Built with the latest React features and optimizations
- 🏗️ **Vite Build Tool** - Lightning-fast development and build process
- 💾 **Appwrite Backend** - Cloud database for storing search analytics
- 🎭 **TMDB Integration** - Real movie data from The Movie Database API

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Movie Catalogue App                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│  │   Search    │    │ Movie Card  │    │ Card Skeleton│     │
│  │ Component   │    │ Component   │    │  Component   │     │
│  └─────────────┘    └─────────────┘    └─────────────┘     │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                 App.jsx (Main Component)                │ │
│  │  • Search State Management                             │ │
│  │  • Movie Data Fetching                                 │ │
│  │  • Trending Movies Display                             │ │
│  │  • Loading & Error States                              │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                    External Services                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐              ┌─────────────────┐       │
│  │   TMDB API      │              │   Appwrite DB   │       │
│  │                 │              │                 │       │
│  │ • Movie Search  │◄────────────►│ • Search Count  │       │
│  │ • Movie Details │              │ • Trending Data │       │
│  │ • Poster Images │              │ • Movie Cache   │       │
│  └─────────────────┘              └─────────────────┘       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- yarn
- TMDB API key
- Appwrite account and project

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
```

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Movie-Catalogue-React-19
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Set up TMDB API**

   - Visit [TMDB](https://www.themoviedb.org/settings/api)
   - Create an account and get your API key
   - Add it to your `.env` file

4. **Set up Appwrite**

   - Create an account at [Appwrite Cloud](https://cloud.appwrite.io)
   - Create a new project
   - Create a database with a collection for search analytics
   - Collection should have fields: `searchTerm`, `count`, `movie_id`, `poster_url`
   - Add your project details to `.env` file

5. **Start the development server**
   ```bash
   yarn dev
   ```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
Movie-Catalogue-React-19/
├── public/
│   ├── hero-bg.png         # Hero background image
│   ├── hero.png            # Hero section image
│   ├── logo.png            # Application logo
│   ├── no-movie.png        # Placeholder for missing posters
│   ├── search.svg          # Search icon
│   └── star.svg            # Rating star icon
├── src/
│   ├── components/
│   │   ├── CardSkeleton.jsx # Loading skeleton component
│   │   ├── MovieCard.jsx    # Movie display component
│   │   └── Search.jsx       # Search input component
│   ├── App.jsx              # Main application component
│   ├── appwrite.js          # Appwrite database functions
│   ├── index.css            # Global styles
│   └── main.jsx             # Application entry point
├── eslint.config.js         # ESLint configuration
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
└── README.md                # Project documentation
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite 6.0.5
- **Styling**: TailwindCSS 4.0.0
- **Backend**: Appwrite Cloud
- **API**: The Movie Database (TMDB)
- **State Management**: React Hooks
- **HTTP Client**: Fetch API
- **Development Tools**: ESLint, Vite Dev Server

## 🎯 Key Features Explained

### Search Functionality

- **Debounced Search**: Uses `react-use` debounce to optimize API calls
- **Real-time Results**: Updates movie list as user types
- **Search Analytics**: Tracks search terms and popular movies in Appwrite

### Trending Movies

- **Dynamic Ranking**: Based on search frequency stored in Appwrite
- **Top 5 Display**: Shows most searched movies with ranking
- **Visual Indicators**: Movie posters with search position

### Performance Optimizations

- **Skeleton Loading**: Smooth loading experience with skeleton components
- **Image Optimization**: Responsive images from TMDB CDN
- **Debounced API Calls**: Prevents excessive API requests during typing

## 🔧 Available Scripts

```bash
yarn dev      # Start development server
yarn build    # Build for production
yarn preview  # Preview production build
yarn lint     # Run ESLint checks
```

## 🌐 API Integration

### TMDB API

- **Search Endpoint**: `/search/movie`
- **Discover Endpoint**: `/discover/movie`
- **Image CDN**: `https://image.tmdb.org/t/p/w500/`

### Appwrite Database

- **Search Tracking**: Stores search terms and frequency
- **Trending Analysis**: Queries most searched movies
- **Real-time Updates**: Updates search counts on each query

## 🎨 UI Components

### MovieCard

Displays individual movie information including:

- Movie poster with fallback image
- Title, rating, language, and release year
- Responsive design for different screen sizes

### Search

- Clean, modern search interface
- Search icon and placeholder text
- Controlled input with real-time updates

### CardSkeleton

- Animated loading placeholder
- Maintains layout during data fetching
- Smooth transition to actual content

## 🚀 Deployment

### Build for Production

```bash
yarn build
```

### Environment Setup

Ensure all environment variables are properly configured in your deployment platform:

- `VITE_TMDB_API_KEY`
- `VITE_APPWRITE_PROJECT_ID`
- `VITE_APPWRITE_DATABASE_ID`
- `VITE_APPWRITE_COLLECTION_ID`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie data API
- [Appwrite](https://appwrite.io/) for the backend database services
- [React](https://reactjs.org/) for the amazing frontend framework
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS framework
