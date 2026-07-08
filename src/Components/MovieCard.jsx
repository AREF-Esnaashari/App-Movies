export function MovieCard({ movies, onHandleSelectMovie }) {
  return movies.map((movie) => (
    <>
      <div
        className="movie-card"
        key={movie.imdbID}
        onClick={() => onHandleSelectMovie(movie.imdbID)}
      >
        <img className="movie-poster" src={movie.Poster} alt={movie.Title} />

        <div className="movie-info">
          <h3 className="movie-title">{movie.Title}</h3>
          <p className="movie-year">{movie.Year}</p>
        </div>
      </div>
    </>
  ));
}
