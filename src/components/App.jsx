import { useState, useEffect } from "react";
import movieData from "../data/movieData";

export default function App() {
  return (
    <>
      <header className="d-flex">
        <h1>Movie List</h1>
      </header>
      <main>
        <div className="container">
          <div className="filter_container d-flex mt-4">
            <select name="genreFilter" className="genreFilter">
              <option value="">Filtra per genere</option>
              {movieData.map((movie) => (
                <option value={movie.genre}>{movie.genre}</option>
              ))}
            </select>
          </div>
          <div className="row row-cols-3 g-3 mt-2">
            {movieData.map((movie, index) => (
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
