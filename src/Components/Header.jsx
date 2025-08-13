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
        // An error happened.
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
    <header className=" inset-0 bg-black opacity-100  flex justify-between items-center px-6 py-3">
      <img
        className="w-28 cursor-pointer"
        src={NETFLIXLOGO}
        alt="Netflix Logo"
      />

      <div className="relative">
        {user && (
          <img
            className="w-10 h-10 rounded cursor-pointer flex"
            src={USERICON}
            alt="user-icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        )}

        {isMenuOpen && user && (
          <div className="absolute right-0 mt-2 z-20 w-32 h-33 bg-gradient-to-t from-black/90 via-black/90 to-black/90  text-white rounded-xl shadow-lg border border-gray-700">
            <p>Manage Profile</p>
            <p>Transfer Profile</p>
            <p>Account</p>
            <p>Help Center</p>
            <button
              onClick={onSignOut}
              className="block w-full text-left   hover:bg-gray-800"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
