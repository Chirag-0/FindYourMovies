import MoviesSearch from "./MoviesSearch";
import FiltersSection from "./FiltersSection";
import MovieList from "./MovieList";
import Loader from "./Loader";
import Error from "./Error";

function Home({
  movies,
  searchTerm,
  setSearchTerm,
  onMovieSelect,
  selectedMovie,
  genres,
  filters,
  setFilters,
  isLoading,
  error,
}) {

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value !== "" ? Number(value) : "",
    }));
  };

  return (
    <div className="container">
      <MoviesSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Filter Section */}
      <div className="filters">
        <FiltersSection
          filters={filters}
          setFilters={setFilters}
          genres={genres}
          onFilterChange={handleFilterChange}
        />
      </div>

      {/* Loading & Status Messages */}
      <div className="status-container">
        {isLoading && <Loader />}
        {error && <Error error={error} />}
        {!isLoading && !error && movies.length === 0 && (
          <div className="no-results">
            No movies found matching your criteria
          </div>
        )}
      </div>

      <MovieList
        movies={movies}
        onMovieSelect={onMovieSelect}
        selectedMovie={selectedMovie}
      />
    </div>
  );
}

export default Home;
