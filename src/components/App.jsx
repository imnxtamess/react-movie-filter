import { useState, useEffect } from "react";
import movieData from "../data/movieData";

export default function App() {
  const [inputTitle, setInputTitle] = useState(""); // store the inputTitle
  const [inputGenre, setInputGenre] = useState(""); // store the inputGenre
  const [genreQuery, setGenreQuery] = useState(""); // store the genreQuery
  const [titleQuery, setTitleQuery] = useState(""); // store the titleQuery
  const [filteredMovies, setFilteredMovies] = useState(movieData); //stores the filteredMovies Array and sets it by default to the original Data array
  const [invalidInput, setInvalidInput] = useState(false);

  useEffect(() => {
    // console.log(genreQuery);
    // console.log(titleQuery);
    setFilteredMovies(
      filteredMovies.filter(
        (movie) =>
          movie.genre.toLowerCase().includes(genreQuery.toLowerCase()) &&
          movie.title.toLowerCase().includes(titleQuery.toLowerCase())
      )
    );
  }, [genreQuery, titleQuery]);

  function handleSubmit(e) {
    e.preventDefault();
    setInvalidInput(false);
    // console.log("form inviato");
    // console.log(inputTitle);
    // console.log(inputGenre);
    if (inputTitle.length && inputGenre.length >= 1) {
      const newMovie = {
        title: inputTitle,
        genre: inputGenre,
      };
      // console.log(newMovie);

      setFilteredMovies([newMovie, ...filteredMovies]);
    } else {
      setInvalidInput(true);
      setTimeout(() => {
        setInvalidInput(false);
      }, 3000);
    }
  }

  return (
    <>
      <header className="d-flex">
        <h1>Movie List</h1>
      </header>
      <main>
        <div className="container text-center">
          <div className="form-container mt-4">
            <h2>Aggiungi un film</h2>

            <form onSubmit={handleSubmit} className="d-flex mt-3">
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
              <button className="submitButton" type="submit">
                +
              </button>
            </form>
          </div>
          <div
            className={`invalidInputBanner ${
              invalidInput === false ? "d-none" : "d:block"
            }`}
          >
            Entrambi i campi devono contenere almeno un carattere!
          </div>
          <div className="filter_container d-flex justify-content-center gap-5 mt-4">
            <select
              onChange={(e) => setGenreQuery(e.target.value)} // change the genreQuery to the selected option
              name="genreFilter"
              className="genreFilter"
            >
              <option value="">Filtra per genere</option>
              {filteredMovies.map((movie, index) => (
                <option key={index + 1} value={movie.genre}>
                  {movie.genre}
                </option>
              ))}
            </select>
            <input
              className="filterInput"
              type="text"
              onChange={(e) => setTitleQuery(e.target.value)}
              placeholder="Filtra per titolo..."
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
