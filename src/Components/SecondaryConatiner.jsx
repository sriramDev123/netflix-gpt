import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryConatiner = () => {
  const movies = useSelector((store) => store.movies);
  return (
    <div className=" bg-black">
      {/* 

    MovieList-PopularMovies
    MovieList-TopRatedMovies
    MovieList-UpcomingMovies
    MovieList-NowPlayingMovies
    MovieList-ActionMovies
        
     */}
      <div className="-mt-52 pl-12 relative z-20">
        <MovieList
          title={"NowPlaying Movies"}
          movies={movies.nowPlayingMovies}
        />
        <MovieList title={"TopRated Movies"} movies={movies.topRatedMovies} />
        <MovieList title={"UpComing Movies"} movies={movies.upComingMovies} />
        <MovieList title={"Action Movies"} movies={movies.nowPlayingMovies} />
        <MovieList title={"Thriller Movies"} movies={movies.topRatedMovies} />
        <MovieList title={"Popular Movies"} movies={movies.upComingMovies} />
      </div>
    </div>
  );
};

export default SecondaryConatiner;
