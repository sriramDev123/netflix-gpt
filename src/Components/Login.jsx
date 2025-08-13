import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { checkValidaData } from "../utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";

const Login = () => {
  const [isSignInform, setisSignInform] = useState(true);
  const [errormsg, seterrormsg] = useState();

  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonCick = () => {
    //validate the form data
    const currentName = !isSignInform && name.current ? name.current.value : "";

    const message = checkValidaData(
      email.current.value,
      password.current.value,
      currentName,
      isSignInform
    );
    seterrormsg(message);
    if (message) return;

    if (!isSignInform) {
      //signUp Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
          updateProfile(auth.currentUser, {
            displayName: currentName,
          })
            .then(() => {
              // Profile updated!
              //console.log(user);
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              console.log(seterrormsg(error.message));
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrormsg(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      //signIn Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode && errorMessage) {
            seterrormsg("Invalid UserName or Password");
          }
        });
    }
  };

  const toggleSignInfrom = () => {
    setisSignInform(!isSignInform);
  };

  return (
    <div className="relative min-h-screen bg-black">
      <Header />
      <div className="relative inset-0 bg-black/80  flex justify-center items-center">
        <img className="absolute inset-0 z-0" src={LOGO} alt="logo" />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="inset-0 bg-gradient-to-t from-black/80 via-black/80 to-black/80 p-20 text-center w-130 h-170 relative z-10 my-28 mx-auto right-0 left-0 text-white rounded-xl"
      >
        <h1 className=" text-4xl font-bold text-left relative left-2 pb-5 ">
          {isSignInform ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInform && (
          <input
            ref={name}
            className="m-3 p-3 w-85 border-1 rounded-sm"
            type="text"
            placeholder="Full Name"
          />
        )}

        <input
          ref={email}
          className="m-3 p-3 w-85 border-1 rounded-sm"
          type="text"
          placeholder="Email or mobile number"
        />

        <input
          ref={password}
          className="m-3 p-3 w-85 border-1 rounded-sm"
          type="password"
          placeholder="Password"
        />

        <p className="text-red-500 text-sm  m-6-">{errormsg}</p>

        <button
          className="bg-red-600 hover:bg-red-800 transition duration-300 ease-in-out  font-bold w-85 m-2 pt-2 pb-2 rounded-sm cursor-pointer"
          onClick={handleButtonCick}
        >
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
