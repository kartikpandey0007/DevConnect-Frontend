import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { useNavigate, Link } from "react-router-dom";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const onDocClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <div className="w-full bg-gray-900 text-green-300 border-b border-green-700 px-4 py-3 flex items-center justify-between">
      {/* Left section: Logo */}
      <div className="flex-1">
        <Link
          to="/"
          className="text-lg sm:text-2xl font-bold text-green-300 hover:text-green-200 transition"
        >
          DevConnect
        </Link>
      </div>

      {/* Right section: Avatar + user name + menu */}
      {user && (
        <div className="flex items-center gap-3 sm:gap-4" ref={menuRef}>
          <span className="hidden sm:inline text-sm sm:text-base font-medium">
            Welcome, <span className="text-green-400">{user.firstName}</span>
          </span>

          <div className="relative">
            <div
              role="button"
              onClick={() => setMenuOpen((s) => !s)}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-green-600 cursor-pointer"
            >
              <img
                alt="user avatar"
                src={user.photoUrl}
                className="w-full h-full object-cover"
              />
            </div>

            {/* menu shown/hidden by state */}
            {menuOpen && (
              <ul className="absolute right-0 mt-3 w-44 sm:w-52 bg-gray-900 text-green-300 rounded-lg p-2 shadow-lg border border-green-700 space-y-1 z-50">
                <li>
                  <Link to="/" className="block px-2 py-1 text-sm hover:text-green-200">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="flex items-center justify-between px-2 py-1 text-sm hover:text-green-200"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>Profile</span>
                    <span className="ml-2 inline-block bg-green-600 text-black text-xs px-2 py-0.5 rounded">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections" className="block px-2 py-1 text-sm hover:text-green-200" onClick={() => setMenuOpen(false)}>
                    My Connections
                  </Link>
                </li>
                <li>
                  <Link to="/requests" className="block px-2 py-1 text-sm hover:text-green-200" onClick={() => setMenuOpen(false)}>
                    Connection Requests
                  </Link>
                </li>
                <li>
                  <Link to="/entry" className="block px-2 py-1 text-sm hover:text-green-200" onClick={() => setMenuOpen(false)}>
                    Quick Requests
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-2 py-1 text-sm hover:text-red-400 cursor-pointer"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
