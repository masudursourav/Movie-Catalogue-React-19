import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite";
import CardSkeleton from "./components/CardSkeleton";
import MovieCard from "./components/MovieCard";
import Search from "./components/search";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};
function App() {
  const [isError, setIsError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);
  useDebounce(
    () => {
      setDebouncedSearchTerm(searchTerm);
    },
    500,
    [searchTerm]
  );
  const fetchTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchMovie = async (query = "") => {
    setIsLoading(true);
    try {
      const response = await fetch(
        query
          ? `api/search/movie?query=${encodeURIComponent(query)}`
          : "api/discover/movie?sort_by=popularity.desc",
        API_OPTIONS
      );
      const data = await response.json();

      if (data.Response === "False") throw new Error("Something went wrong");
      setMovies(data.results);
      if (query && data.results.length > 0) {
        updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      setIsError(true);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchMovie(debouncedSearchTerm);
  }, [debouncedSearchTerm]);
  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You&apos;ll Enjoy
            Without Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.searchTerm} />
                </li>
              ))}
            </ul>
          </section>
        )}
        <section className="all-movies">
          <h2>
            {debouncedSearchTerm
              ? `Search Result Of: ${debouncedSearchTerm}`
              : "All Movies"}
          </h2>
          {isLoading ? (
            <div className="flex">
              {Array.from({ length: 3 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))}
            </div>
          ) : isError ? (
            <h2 className="text-white">
              Something went wrong. Please Try Again.
            </h2>
          ) : (
            <ul>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
