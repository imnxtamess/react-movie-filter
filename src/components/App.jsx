import { useState, useEffect } from "react";
import movieData from "../data/movieData";

export default function App() {
  const [genreQuery, setGenreQuery] = useState(""); // store the genreQuery
  const [titleQuery, setTitleQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState(movieData);

  useEffect(() => {
    console.log(genreQuery);
    console.log(titleQuery);
    setFilteredMovies(
      movieData.filter(
        (movie) =>
          movie.genre.toLowerCase().includes(genreQuery.toLowerCase()) &&
          movie.title.toLowerCase().includes(titleQuery.toLowerCase())
      )
    );
  }, [genreQuery, titleQuery]);

  return (
    <>
      <header className="d-flex">
        <h1>Movie List</h1>
      </header>
      <main>
        <div className="container">
          <div className="filter_container d-flex justify-content-center gap-4 mt-4">
            <select
              onChange={(e) => setGenreQuery(e.target.value)} // change the genreQuery to the selected option
              name="genreFilter"
              className="genreFilter"
            >
              <option value="">Filtra per genere</option>
              {movieData.map((movie, index) => (
                <option key={index + 1} value={movie.genre}>
                  {movie.genre}
                </option>
              ))}
            </select>
            <select
              onChange={(e) => setTitleQuery(e.target.value)} // change the titleQuery to the selected option
              name="titleFilter"
              className="titleFilter"
            >
              <option value="">Filtra per titolo</option>
              {movieData.map((movie, index) => (
                <option key={index + 10} value={movie.title}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
          <div className="row row-cols-3 g-3 mt-2">
            {filteredMovies.map((movie, index) => (
              <div key={index} className="col">
                <div className="card card-body">
                  <h3>{`TITOLO: ${movie.title}`}</h3>
                  <h5>{`GENERE: ${movie.genre}`}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
