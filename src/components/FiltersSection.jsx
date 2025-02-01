function FiltersSection({ filters, setFilters, genres, onFilterChange }) {
  return (
    <div className="filters">
    <div className="filter-group">
      <label>Genre:</label>
      <select
        value={filters.genre}
        onChange={(e) => onFilterChange('genre', e.target.value)}
      >
        <option value="">All Genres</option>
        {genres.map(genre => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>

    <div className="filter-group">
      <label>Release Year:</label>
      <input
        type="number"
        placeholder="Enter year"
        min="1900"
        max={new Date().getFullYear()}
        value={filters.year}
        onChange={(e) => onFilterChange('year', e.target.value)}
      />
    </div>

    <div className="filter-group">
      <label>Minimum Rating: {filters.rating}</label>
      <input
        type="range"
        min="0"
        max="10"
        step="0.1"
        value={filters.rating}
        onChange={(e) => onFilterChange('rating', e.target.value)}
      />
    </div>
  </div>
  )
}

export default FiltersSection