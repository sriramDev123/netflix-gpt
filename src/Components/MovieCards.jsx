import React from "react";
import { IMG_URL } from "../utils/constants";

const MovieCards = ({ poster_path }) => {
  return (
    <div className="w-45 pr-2">
      <img src={IMG_URL + poster_path} alt="Movie_Img" />
    </div>
  );
};

export default MovieCards;
