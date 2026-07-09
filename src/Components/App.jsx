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
import WatchList from "./watchList.jsx";
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
  const [userRating, setUserRating] = useState(0);
  const [watchlist, setWatchList] = useState([]);

  let [isOpenModalWatchList, setIsOpenModalWatchList] = useState(false);
  // functions
  function handleSelectMovie(id) {
    setSelectedId(id === selectedId ? null : id);
    setUserRating(0);
  }
  function handleModalWatchList() {
    setIsOpenModalWatchList(!isOpenModalWatchList);
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
        setIsOpenModalWatchList(false);

        let res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal },
        );
        if (!res.ok) throw new Error("Something went wrong. Please try again.");

        let data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found!");
        setSelectedId(null);
        setMovies(data.Search);

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
  useEffect(() => {
    function handleCloseWtahcList(e) {
      if (e.code === "Escape") setIsOpenModalWatchList(false);
    }

    document.addEventListener("keydown", handleCloseWtahcList);
    return () => {
      document.removeEventListener("keydown", handleCloseWtahcList);
    };
  }, []);
  return (
    <>
      <Navigation>
        <Logo />
        <Search_bar query={query} setQuery={setQuery} />
        <WatchlistIcon handleModalWatchList={handleModalWatchList} />

        <ResultsCount foundMovies={movies.length} />
      </Navigation>
      {isOpenModalWatchList && (
        <WatchList watchlist={watchlist} setWatchList={setWatchList} />
      )}
      <CountainerMovies>
        {selectedId ? (
          <MovieDetails
            setIsOpenModalWatchList={setIsOpenModalWatchList}
            setLoadingFetching={setLoadingFetching}
            loadingFetching={loadingFetching}
            errorFetching={errorFetching}
            setErrorFetching={setErrorFetching}
            watchlist={watchlist}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            setMovieDetails={setMovieDetails}
            movieDetails={movieDetails}
            setUserRating={setUserRating}
            userRating={userRating}
            setWatchList={setWatchList}
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
