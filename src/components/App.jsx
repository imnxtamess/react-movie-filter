import { useState, useEffect } from "react";
import movieData from "../data/movieData";

export default function App() {
  return (
    <>
      <div className="main">
        <div className="container">
          <div className="row row-cols-3 g-3 mt-5">
            {movieData.map((movie, index) => (
              <div key={index} className="col">
                <div className="card card-body">
                  <h1>{`Title: ${movie.title}`}</h1>
                  <h2>{`Genre: ${movie.genre}`}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
