import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const onSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  return (
    <header className="flex justify-between items-center px-6 py-3 inset-0 bg-gradient-to-t from-black/70 via-black/80 to-black/90 text-white">
      <img
        className="w-28 cursor-pointer"
        src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
        alt="Netflix Logo"
      />

      <div className="relative">
        {user && (
          <img
            className="w-10 h-10 rounded cursor-pointer flex"
            src={user?.photoURL}
            alt="user-icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        )}

        {isMenuOpen && user && (
          <div className="absolute right-0 mt-2 w-32 h-33 bg-gradient-to-t from-black/90 via-black/90 to-black/90  text-white rounded shadow-lg border border-gray-700">
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
