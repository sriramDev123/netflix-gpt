import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [isSignInform, setisSignInform] = useState(true);

  const toggleSignInfrom = () => {
    setisSignInform(!isSignInform);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/IN-en-20250721-TRIFECTA-perspective_cadc8408-df6e-4313-a05d-daa9dcac139f_large.jpg"
          alt="logo"
        />
      </div>

      <form className="inset-0 bg-gradient-to-t from-black/80 via-black/80 to-black/80 p-20 text-center w-130 h-170 absolute my-28 mx-auto right-0 left-0 text-white rounded-xl">
        <h1 className=" text-4xl font-bold text-left relative left-2 pb-5 ">
          {isSignInform ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInform && (
          <input
            className="m-3 p-3 w-85 border-1 rounded-sm"
            type="text"
            placeholder="Full Name"
          />
        )}

        <input
          className="m-3 p-3 w-85 border-1 rounded-sm"
          type="text"
          placeholder="Email or mobile number"
        />
        <input
          className="m-3 p-3 w-85 border-1 rounded-sm"
          type="password"
          placeholder="Password"
        />
        <button className="bg-red-600 hover:bg-red-800 transition duration-300 ease-in-out  font-bold w-85 m-2 pt-2 pb-2 rounded-sm cursor-pointer">
          {isSignInform ? "Sign In" : "Sign Up"}
        </button>
        {isSignInform && <h1 className=" font-bold pb-2 ">OR</h1>}
        {isSignInform && (
          <button class="bg-white/10  font-semibold w-85 px-6 py-3 rounded-lg backdrop-blur-md hover:bg-white/20 cursor-pointer transition duration-300 ease-in-out">
            Use a sign-in code
          </button>
        )}
        <br></br>
        <br></br>
        {isSignInform && (
          <Link className=" text-cyan-50 underline" to="#">
            Forgot password?
          </Link>
        )}
        <br></br>
        <div className="flex">
          {isSignInform && (
            <input
              className="flex ml-3 mr-2 w-5 h-5 text-blue-600 accent-blue-500 rounded focus:ring focus:ring-blue-200"
              type="checkbox"
            />
          )}
          {isSignInform && <h1 className=" text-cyan-50 ">Remember me</h1>}
        </div>
        <br></br>
        <p>
          {isSignInform ? "New to Netflix?" : "Already Registered"}
          <a
            className=" mr-35 text-gray-300 underline"
            onClick={toggleSignInfrom}
            href="#"
          >
            {isSignInform ? "Sign up now" : "Sign in now"}
          </a>
        </p>

        <br></br>
        {isSignInform && (
          <p className="text-gray-400 text-sm">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.
          </p>
        )}
        {isSignInform && (
          <a className=" text-blue-700 underline text-left" href="#">
            Learn more.
          </a>
        )}
      </form>
    </div>
  );
};

export default Login;
