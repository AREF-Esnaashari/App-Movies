export default function WatchList({ watchlist, setWatchList }) {
  let isAvarageRT =
    watchlist.reduce((total, curr) => {
      return total + curr.Runtime;
    }, 0) / watchlist.length;
  let IMRate =
    watchlist.reduce((total, curr) => {
      return total + curr.imdbRating;
    }, 0) / watchlist.length;
  let URate =
    watchlist.reduce((total, curr) => {
      return total + curr.userRating;
    }, 0) / watchlist.length;
  function handleDeleteLi(id) {
    setWatchList((watchlist) => watchlist.filter((movie) => movie.id !== id));
  }
  return (
    <div className="watchlist">
      <div className="header-watchlist">
        <span>Movie📺:{watchlist.length || ""}</span>
        <span>Runtime:{isAvarageRT.toFixed(2) || ""}</span>
        <span>IMRate⭐:{IMRate.toFixed(2) || ""}</span>
        <span>URate🌟:{URate.toFixed(2) || ""}</span>
      </div>
      <div className="section-watchlist">
        {watchlist.map((movie) => (
          <div className="item-watchlist" key={movie.id}>
            <div className="imageWatchList">
              <img src={movie.poster} alt={movie.title} />
            </div>
            <div className="metaWatchList">
              <p>{movie.title}</p>
              <p>⏳ {movie.Runtime}</p>
              <p>⭐ {movie.imdbRating}</p>
              <p>🌟 {movie.userRating}</p>
              <button
                className="closeBtn"
                style={{ backgroundColor: "red" }}
                onClick={() => handleDeleteLi(movie.id)}
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
