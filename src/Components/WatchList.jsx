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
    setWatchList((watchlist) =>
      watchlist.filter((movie) => movie.imdbID !== id),
    );
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
        {watchlist.map((move) => (
          <div className="item-watchlist" key={move.imdbID}>
            <div className="imageWatchList">
              <img src={move.poster} alt={move.title} />
            </div>
            <div className="metaWatchList">
              <p>{move.title}</p>
              <p>⏳ {move.Runtime}</p>
              <p>⭐ {move.imdbRating}</p>
              <p>🌟 {move.userRating}</p>
              <button
                className="closeBtn"
                style={{ backgroundColor: "red" }}
                onClick={() => handleDeleteLi(move.imdbID)}
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
