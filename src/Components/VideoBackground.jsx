import React from "react";
import useMovieTrailer from "../Hooks/useMovieTrailer";
import { useSelector } from "react-redux";

const VideoBackground = ({ movieId }) => {
  const trailerKey = useSelector((store) => store.movies?.trailerVideo?.key);
  useMovieTrailer(movieId);
  if (!trailerKey) return null;
  return (
    <div className="relative ">
      <iframe
        className="w-screen h-screen absolute top-0 left-0 z-0"
        src={
          "https://www.youtube.com/embed/" +
          trailerKey +
          "?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackground;
