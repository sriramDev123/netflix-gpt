import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { auth } from "../firebase";
import { USERICON, NETFLIXLOGO } from "../utils/constants";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const onSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened .
        console.log(error);
      });
  };

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // When User is signed in or signed up
        const { uid, email, displayName } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
          })
        );
        navigate("/browse");
      } else {
        // When User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    //this will unsubcribe when components unmounts or gone...
    return () => unsubcribe();
  }, []);

  return (
    <div className=" absolute w-screen bg-gradient-to-b from-black px-8 py-2 z-10 flex justify-between ">
      <img
        className="w-44 cursor-pointer"
        src={NETFLIXLOGO}
        alt="Netflix Logo"
      />

      <div className="flex p-2">
        {user && (
          <img
            className="w-12 h-12 rounded cursor-pointer"
            src={USERICON}
            alt="user-icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        )}

        {isMenuOpen && user && (
          <div className="absolute right-0 mr-5 mt-12 z-20 w-32 h-33 bg-gradient-to-t from-black/90 via-black/90 to-black/90  text-white rounded-xl shadow-lg border border-gray-700 ">
            <p className="hover:underline cursor-pointer">Manage Profile</p>
            <p className="hover:underline cursor-pointer">Transfer Profile</p>
            <p className="hover:underline cursor-pointer">Account</p>
            <p className="hover:underline cursor-pointer">Help Center</p>
            <button
              onClick={onSignOut}
              className="block w-full text-left hover:underline cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
