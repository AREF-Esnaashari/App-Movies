  import { CountainerMovies } from "./ContainerMovies";
  import { Logo } from "./Logo";
  import { MovieCard } from "./MovieCard";
  import { Navigation } from "./navigation";
  import { ResultsCount } from "./ResultsCount.jsx";
  import { Search_bar } from "./Search_bar";
  import { WatchlistIcon } from "./WatchlistIcon";

  export default function App() {
    return (
      <>
        <Navigation>
          <Logo />
          <Search_bar />
          <WatchlistIcon />
          <ResultsCount />
        </Navigation>
        <CountainerMovies>
          <MovieCard />
        </CountainerMovies>
      </>
    );
  }
