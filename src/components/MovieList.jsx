function MovieList({ movies, onMovieSelect, selectedMovie }) {
  return (
    <div className="movies-grid">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="movie-card"
          onClick={() => onMovieSelect(movie.id)}
        >
          <img
            src={`${import.meta.env.VITE_IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            onError={(e) => {
              if (!e.target.dataset.errorHandled) { // Prevent infinite loop
                e.target.dataset.errorHandled = true;
                e.target.src = 'placeholder-image.jpg'; // Set valid fallback image
              }
            }}
          />
          <h3>{movie.title}</h3>
          <p>{movie.release_date}</p>
        </div>
      ))}

       {/* Movie Details Overlay */}
       {selectedMovie && (
        <div className="movie-details-overlay">
          <div className="movie-details">
            <button onClick={() => onMovieSelect(null)}>❌</button>
            <img
              src={`${import.meta.env.VITE_IMAGE_BASE_URL}${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
            />
            <h1>{selectedMovie.title}</h1>
            <p>{selectedMovie.overview}</p>
            <p>Rating: {selectedMovie.vote_average}</p>
            <p>Release Date: {selectedMovie.release_date}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieList;
