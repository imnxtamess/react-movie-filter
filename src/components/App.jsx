import { useState, useEffect } from "react";
import movieData from "../data/movieData";

export default function App() {
  const [inputTitle, setInputTitle] = useState(""); // store the inputTitle
  const [inputGenre, setInputGenre] = useState(""); // store the inputGenre
  const [genreQuery, setGenreQuery] = useState(""); // store the genreQuery
  const [titleQuery, setTitleQuery] = useState(""); // store the titleQuery
  const [filteredMovies, setFilteredMovies] = useState(movieData); //stores the filteredMovies Array and sets it by default to the original Data array

  function handleSubmit(e) {
    e.preventDefault();
    console.log(inputTitle);
    console.log(inputGenre);
    const newMovie = {
      title: inputTitle,
      genre: inputGenre,
    };
    console.log(newMovie);
  }

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
        <div className="container text-center">
          <div className="form-container mt-4">
            <h2>Aggiungi un film</h2>
            <span type="submit">+</span>
            <form onSubmit={() => handleSubmit(e)}>
              <div className="d-flex mt-3">
                <input
                  type="text"
                  placeholder="Inserisci un titolo..."
                  value={inputTitle}
                  onChange={(e) => setInputTitle(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Inserisci un genere..."
                  value={inputGenre}
                  onChange={(e) => setInputGenre(e.target.value)}
                />
              </div>
            </form>
          </div>

          <div className="filter_container d-flex justify-content-center gap-5 mt-4">
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
            <input
              className="filterInput"
              type="text"
              onChange={(e) => setTitleQuery(e.target.value)}
            />
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
