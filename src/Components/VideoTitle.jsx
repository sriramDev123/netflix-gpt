import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className=" absolute bottom-20 left-27 z-10 max-w-xl pt[20%] text-white">
      <h1 className="text-5xl font-bold mb-4">{title}</h1>
      <p className="mb-6 text-lg">{overview}</p>
      <div className="flex gap-4">
        <button className="bg-white text-black font-bold py-2 px-6 rounded hover:opacity-80">
          ▶ Play
        </button>
        <button className="bg-gray-700 bg-opacity-70 text-white  py-2 px-6 rounded hover:opacity-60">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
