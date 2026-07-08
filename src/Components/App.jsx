import { useEffect, useState } from "react";
import { CountainerMovies } from "./ContainerMovies";
import { ErrorFetching } from "./ErrorFetching.jsx";
import { LoadingFetch } from "./LoadingFetch.jsx";
import { Logo } from "./Logo";
import { MovieCard } from "./MovieCard";
import { MovieDetails } from "./MovieDetails.jsx";
import { Navigation } from "./navigation";
import { ResultsCount } from "./ResultsCount.jsx";
import { Search_bar } from "./Search_bar";
import { WatchlistIcon } from "./WatchlistIcon";
const KEY = "f4177a14";

export default function App() {
  // states
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loadingFetching, setLoadingFetching] = useState(false);
  const [errorFetching, setErrorFetching] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [movieDetails, setMovieDetails] = useState({});

  // functions
  function handleSelectMovie(id) {
    setSelectedId(id === selectedId ? null : id);
  }
  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        if (query.length <= 3) {
          setSelectedId(null);
          setMovies([]);
          setErrorFetching("");
          setLoadingFetching(false);
          return;
        }

        setLoadingFetching(true);
        setErrorFetching("");
        let res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal },
        );
        if (!res.ok) throw new Error("Something went wrong. Please try again.");

        let data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found!");
        setSelectedId(null);
        setMovies(data.Search);
        console.log(data)

        setLoadingFetching(false);
        setErrorFetching("");
      } catch (err) {
        if (err.name !== "AbortError") {
          setErrorFetching(err.message);
        }
      } finally {
        setLoadingFetching(false);
      }
    }
    fetchMovies();
  }, [query]);
  return (
    <>
      <Navigation>
        <Logo />
        <Search_bar query={query} setQuery={setQuery} />
        <WatchlistIcon />
        <ResultsCount foundMovies={movies.length} />
      </Navigation>
      <CountainerMovies>
        {selectedId ? (
          <MovieDetails
            setLoadingFetching={setLoadingFetching}
            loadingFetching={loadingFetching}
            errorFetching={errorFetching}
            setErrorFetching={setErrorFetching}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            setMovieDetails={setMovieDetails}
            movieDetails={movieDetails}
          />
        ) : (
          <>
            {loadingFetching && <LoadingFetch />}
            {!loadingFetching && !errorFetching && (
              <MovieCard
                movies={movies}
                onHandleSelectMovie={handleSelectMovie}
              />
            )}
            {errorFetching && <ErrorFetching messageError={errorFetching} />}
          </>
        )}
      </CountainerMovies>
    </>
  );
}
