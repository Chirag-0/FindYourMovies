import { useEffect, useState } from "react"; 
  
function useMovies(searchTerm) {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
    // eslint-disable-next-line no-unused-vars
    const IMAGE_URL = import.meta.env.VITE_IMAGE_BASE_URL;
    
    const [movies, setMovies] = useState([]);

    const fetchMovies = async (search = '') => {
    
        try {
          const url = search 
            ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${search}`
            : `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
    
          const response = await fetch(url);
          const data = await response.json();
          console.log(data);
          
          setMovies(data.results);
        } catch (error) {
          console.error('Error fetching movies:', error);
        }
      };
    
     
      useEffect(() => {
        const timer = setTimeout(() => fetchMovies(searchTerm), 500);
        return () => clearTimeout(timer);
      }, [searchTerm]);
    
    
    return {movies,searchTerm}
    
  }
  
  export default useMovies;