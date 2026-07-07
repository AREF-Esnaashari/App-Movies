export function MovieCard({ movies }) {
  return (
    <>
      {movies.map((movie) => (
        <div className="movie-card" key={movie.Imdb}>
          <img className="movie-poster" src={movie.Poster} alt={movie.Title} />

          <div className="movie-info">
            <h3 className="movie-title">{movie.Title}</h3>
            <p className="movie-year">{movie.Year}</p>
          </div>
        </div>
      ))}
    </>
  );
}
