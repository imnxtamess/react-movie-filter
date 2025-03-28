import { useState, useEffect } from "react";
import movieData from "../data/movieData";

export default function App() {
  const [movieList, setMovieList] = useState(movieData); // store the movieData
  const [inputTitle, setInputTitle] = useState(""); // store the inputTitle
  const [inputGenre, setInputGenre] = useState(""); // store the inputGenre
  const [genreQuery, setGenreQuery] = useState(""); // store the genreQuery
  const [titleQuery, setTitleQuery] = useState(""); // store the titleQuery
  const [filteredMovies, setFilteredMovies] = useState(movieList); //stores the filteredMovies Array and sets it by default to movieList date
  const [invalidInput, setInvalidInput] = useState(false);

  useEffect(() => {
    // console.log(genreQuery);
    // console.log(titleQuery);

    setFilteredMovies(
      movieList.filter(
        (movie) =>
          movie.genre.toLowerCase().includes(genreQuery.toLowerCase()) &&
          movie.title.toLowerCase().includes(titleQuery.toLowerCase())
      )
    );
  }, [genreQuery, titleQuery, movieList]);

  function handleSubmit(e) {
    e.preventDefault();
    setInvalidInput(false);
    // console.log("form inviato");
    // console.log(inputTitle);
    // console.log(inputGenre);
    if (inputTitle.length && inputGenre.length) {
      const newMovie = {
        title: inputTitle,
        genre: inputGenre,
      };
      // console.log(newMovie);

      setMovieList([newMovie, ...movieList]);
    } else {
      setInvalidInput(true);
      setTimeout(() => {
        setInvalidInput(false);
      }, 3000);
    }
  }

  const genrelist = [];

  function checkDuplicateGenres() {
    movieList.forEach((movie) => {
      if (!genrelist.includes(movie.genre.toLowerCase())) {
        genrelist.push(movie.genre.toLowerCase());
      }
    });
  }

  checkDuplicateGenres();

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
              <div
                className={`invalidInputBanner ${
                  invalidInput === false ? "d-none" : "d:block"
                }`}
              >
                Entrambi i campi devono contenere almeno un carattere!
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
              {genrelist.map((movie, index) => (
                <option key={index + 1} value={movie}>
                  {movie}
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
