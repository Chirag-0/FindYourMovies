 # Movie Browser Application (Find Your Movies)

This is a React-based Movie Browsing Web Application that uses the TMDB API to fetch and display movie details. Users can search for movies, filter results by genre, release year, and rating. The application is designed to be responsive, accessible.

## Features

- **Movie Search**: Users can search any movie.
- **Filtering Options**:
  -  Users can filter movies according to genres,release year and ratings.
- **Movie Details**:  Users can click on any movie to know additional details.
- **Infinite Scroll**: This application contains feature of infinite scroll.

## How to Run the Application
### Prerequisite
Ensure you have the following installed:
- Node.js (Latest LTS version recommended)
- npm or yarn

### Setup Instructions
1. **Clone the Repository**:
   
   ```sh
   git clone https://github.com/Chirag-0/FindYourMovies.git
   ```   
   
3. **Navigate to movies-browser folder**:
        
   cd movies-browser
   
3.**Install Dependencies**:
   ```sh
   npm install
   ```
   or
   ```sh
   yarn install
   ```


  
   
4. **Set Up API Keys**:

  - Create a `.env` file in the root directory.
  
  - Add the following environment variables:   
     ```env
    VITE_TMDB_API_KEY=your_tmdb_api_key
    VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
    VITE_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500/
     ```
   
   - Replace `your_tmdb_api_key` with your actual TMDB API key.

5.  **Run the Application**:
   ```sh
   npm run dev
   ```
   or
   ```sh
   yarn dev
   ```
