import React from "react";
import MovieCards from "./MovieCards";

const MovieList = ({ title, movies }) => {
  //console.log(movies);
  return (
    <div className="px-6">
      <h1 className="text-3xl py-2 text-white font-sans">{title}</h1>
      <div className="flex overflow-x-scroll scrollbar-hide space-x-4">
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCards key={movie.id} poster_path={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
