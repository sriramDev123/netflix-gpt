import React from "react";
import lang from "../utils/languageConstants";
import { useSelector } from "react-redux";
const GptSearchBar = () => {
  const langkey = useSelector((store) => store.config.lang);
  return (
    <div className="pt-[5%] flex justify-center">
      <form className=" w-1/2 bg-black grid grid-cols-12">
        <input
          className="p-4 m-4 bg-white col-span-9"
          type="text"
          placeholder={lang[langkey].gtpSearchPlaceholder}
        />
        <button className="py-3 px-4 col-span-3 m-4 bg-red-700 text-white rounded-xl">
          {lang[langkey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
