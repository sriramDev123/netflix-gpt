import React, { useEffect } from "react";
import { useState } from "react";

const VideoTitle = ({ title, overview }) => {
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTitle(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className=" w-screen aspect-video  pt-[17%]  absolute px-26  bg-gradient-to-r from-black text-white">
      {/* Title - moves down into overview space */}
      <h1
        className={`font-bold transition-all duration-1000 ease-in-out text-6xl
          ${showTitle ? "translate-y-9" : "translate-y-0"}
          text-5xl
        `}
      >
        {title}
      </h1>

      {/* Overview - fades out smoothly */}
      <p
        className={`py-6 text-lg text-gray-300 w-1/4 transition-all duration-700 ease-in-out
          ${
            showTitle ? "opacity-0 h-0 py-0 m-0 overflow-hidden" : "opacity-100"
          }
        `}
      >
        {overview}
      </p>
      <div className="flex gap-4 ">
        <button className="bg-white w-40 text-black font-bold py-2 px-6 rounded hover:opacity-80">
          ▶ Play
        </button>
        <button className="opacity-70 hover:opacity-70 w-40 bg-gray-500 text-white text-xl py-2 px-6 rounded ">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
