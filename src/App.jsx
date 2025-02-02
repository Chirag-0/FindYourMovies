import { useState, useEffect } from 'react';
import { debounce } from "lodash";
import Home from './components/Home';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [genres, setGenres] = useState([]);
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    rating: 0 // Default
  });

  const [page,setPage] = useState(1);
  
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
  const IMAGE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

  const handleMovieSelect = (movieId) => {
    if (movieId) {
      fetchMovieDetails(movieId);
    } else {
      setSelectedMovie(null); // Clear the selected movie directly
    }
  };

   // Fetch genres on mount
   useEffect(() => {
    const fetchGenres = async () => {
      try {
        
        const response = await fetch(
          `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
        );
        const data = await response.json();
        console.log(data);
        
        setGenres(data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    fetchGenres();
  }, []);
   
  const fetchMovies = async (signal) => {
    const controller = new AbortController();
   
    try {
      setIsLoading(true);
      setError(null);
      let url;
      if(searchTerm){
         url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchTerm)}&include_adult=false`;
      } else{
          url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&include_adult=false&sort_by=popularity.desc&page=${page}`;

          //Adding filter parameters

          const params = [];
          if (filters.genre) params.push(`with_genres=${filters.genre}`);
          if (filters.year) params.push(`primary_release_year=${filters.year}`);
          if (filters.rating > 0) params.push(`vote_average.gte=${filters.rating}`);

          if(params.length) url += `&${params.join('&')}`; 
      }
      const response = await fetch(url, { signal:controller.signal } );

      if (!response.ok) throw new Error(`HTTP ${response.status} Error`);

      const data = await response.json();
      if (!data.results) {
        throw new Error('Invalid data format');
      }

      // double checking adult content
      const safeMovies = data.results.filter(movie => !movie.adult);
       // Create a set of movie IDs to track uniqueness
       const existingMovieIds = new Set(movies.map((movie) => movie.id));

       // Filter out duplicates by checking movie IDs
       const newMovies = safeMovies.filter((movie) => !existingMovieIds.has(movie.id));
     
       setMovies((prevMovies) => {
        return page === 1 ? newMovies : [...prevMovies, ...newMovies]; // Prevents replacing old search results
      });

    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Fetch error:', error); 
      }
      setError(`Failed to load movies: ${error.message}`);
      // console.error('Error fetching movies:', error);
    }finally{
      setIsLoading(false); // Clear loading state
    }
  };

  const fetchMovieDetails = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
      const data = await response.json();
      console.log(data);
      
      setSelectedMovie(data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  useEffect(() => {
    setPage(1);  // Resetting the page when search term changes
  }, [searchTerm,filters]);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => fetchMovies(controller.signal), 500);
    return () => {
      clearTimeout(timer);
      controller.abort();
    }
  }, [searchTerm,filters,page]);

  const handleInfiniteScroll = debounce(async () => {
      // console.log("ScrollHeight: ",document.documentElement.scrollHeight);
      // console.log("Inner height: ",window.innerHeight);
      // console.log("Scroll top: ",document.documentElement.scrollTop);
      
      try{
        if(window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight){
          setIsLoading(true);
          setPage((prev) => prev + 1);
        }
      }catch(error){
          console.log(error);
          
      }
      
  },400);

  useEffect(() => {
    const debouncedScroll = debounce(handleInfiniteScroll, 500);
    window.addEventListener("scroll", debouncedScroll);
    return () => {
      window.removeEventListener("scroll", debouncedScroll);
    };
  }, [handleInfiniteScroll]);

  return (
    <div className="app">
      <Home
        movies={movies}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onMovieSelect={handleMovieSelect}
        selectedMovie={selectedMovie}
        genres={genres}
        filters={filters}
        setFilters={setFilters}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}

export default App;
