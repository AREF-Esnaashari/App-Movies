import { useEffect } from "react";
import { ErrorFetching } from "./ErrorFetching";
import { LoadingFetch } from "./LoadingFetch";
const KEY = "f4177a14";

export function MovieDetails({
  selectedId,
  setSelectedId,
  setMovieDetails,
  movieDetails,
  setErrorFetching,
  errorFetching,
  loadingFetching,
  setLoadingFetching,
}) {
  useEffect(() => {
    if (!selectedId) return;
    
    const controller = new AbortController();
    async function fetchMovieDetails() {
      try {
        setLoadingFetching(true);
        setErrorFetching("");

        let res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`,
          { signal: controller.signal },
        );

        if (!res.ok) throw new Error("Something went wrong");
        let data = await res.json();
        if (data.Response === "False") throw new Error("Incorrect IMDb ID.");

        setMovieDetails(data);

  
      } catch (err) {
        if (err.name !== "AbortError") {
          setErrorFetching(err.message);
        }
      } finally {
        setLoadingFetching(false);
      }
    }
    fetchMovieDetails();

    return () => controller.abort();
  }, [selectedId]);
  useEffect(() => {
    function closeMovieDetails(e) {
      if (e.key === "Escape") {
        setSelectedId(null);
      }
    }

    document.addEventListener("keydown", closeMovieDetails);

    return () => {
      document.removeEventListener("keydown", closeMovieDetails);
    };
  }, [setSelectedId]);
  return (
    <>
      {loadingFetching && <LoadingFetch />}
      {!loadingFetching && !errorFetching && (
        <Details movieDetails={movieDetails} setSelectedId={setSelectedId} />
      )}
      {errorFetching && <ErrorFetching messageError={errorFetching} />}
    </>
  );
}
function Details({ movieDetails, setSelectedId }) {
  return (
    <div className="detailsMovie">
      <button className="closeBtn" onClick={() => setSelectedId(null)}>
        ✕
      </button>

      <div className="headerSection">
        <img
          className="imgDetails"
          src={movieDetails.Poster}
          alt={movieDetails.Title}
        />
        <span className="imdbRating">{movieDetails.imdbRating}⭐</span>
      </div>

      <div className="section">
        <div className="titles">
          <p>{movieDetails.Title}</p>

          <p className="movieMeta">
            <span>{movieDetails.Year}📅</span>
            <span>{movieDetails.Runtime}⏱️</span>
            <span>{movieDetails.Genre}🎬</span>
          </p>
        </div>

        <br />

        <div className="plot">
          <p>{movieDetails.Plot}</p>
        </div>

        <br />

        <div className="footer">
          <div className="Director">
            <span>🎥Director:</span>
            <span>{movieDetails.Director}</span>

            <div>
              <span>👥Actors:</span>
              <span>{movieDetails.Actors}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
