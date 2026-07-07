import { useEffect, useState } from "react";
import { CountainerMovies } from "./ContainerMovies";
import { ErrorFetching } from "./ErrorFetching.jsx";
import { LodingFetch } from "./LodingFetch.jsx";
import { Logo } from "./Logo";
import { MovieCard } from "./MovieCard";
import { Navigation } from "./navigation";
import { ResultsCount } from "./ResultsCount.jsx";
import { Search_bar } from "./Search_bar";
import { WatchlistIcon } from "./WatchlistIcon";
const KEY = "f4177a14";

export default function App() {
  let [query, setQuery] = useState("");
  let [movies, setMovies] = useState([]);
  let [lodingFetching, setLodingFetching] = useState(false);
  let [errorFetching, setErrorFetching] = useState("");
  useEffect(() => {
    async function fetchMovies() {
      try {
        if (query.length <= 3) return;
        setLodingFetching(true);
        setErrorFetching("");
        let res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
        );
        if (!res.ok) throw new Error("Something went wrong. Please try again.");

        let data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found!");
        setMovies(data.Search);
        setLodingFetching(false);
        setErrorFetching("");
      } catch (err) {
        setErrorFetching(err.message);
      }
      finally{
        setLodingFetching(false)
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
        {lodingFetching && <LodingFetch />}
        {!lodingFetching && !errorFetching && <MovieCard movies={movies} />}
        {errorFetching && <ErrorFetching messageError={errorFetching} />}
      </CountainerMovies>
    </>
  );
}
