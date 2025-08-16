import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { auth } from "../firebase";
import { USERICON, NETFLIXLOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const gptSearchView = useSelector((store) => store.gpt.gptSearchView);

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

  const handleClick = () => {
    //toggle the GPT search component
    dispatch(toggleGptSearchView());
  };

  const handleLangChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className=" absolute w-screen bg-gradient-to-b from-black px-8 py-2 z-10 flex justify-between ">
      <img
        className="w-44 cursor-pointer"
        src={NETFLIXLOGO}
        alt="Netflix Logo"
      />

      <div className="flex p-2">
        {user && (
          <div className="flex items-center relative">
            {gptSearchView && (
              <select
                className="p-2 m-2 bg-black text-white border-none rounded-lg cursor-pointer"
                onChange={handleLangChange}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
              </select>
            )}

            <button
              className="py-2 px-4 m-2 bg-purple-700 text-white rounded-lg hover:bg-purple-600 transition duration-300 cursor-pointer font-bold"
              onClick={handleClick}
            >
              {gptSearchView ? "Homepage" : "GPT Search"}
            </button>
            <img
              className="w-12 h-12 rounded cursor-pointer"
              src={USERICON}
              alt="user-icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>
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
