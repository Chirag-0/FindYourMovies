function MoviesSearch({searchTerm,setSearchTerm}) {
  return (
    <div>
     
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
    </div>
  )
}
export default MoviesSearch;