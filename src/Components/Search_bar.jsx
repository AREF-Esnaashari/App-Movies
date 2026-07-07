
export function Search_bar({ query, setQuery }) {
  return (
    <input
      className="search-bar"
      type="text"
      value={query}
      placeholder="Searching Movie..."
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
