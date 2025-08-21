import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { useNavigate, Link } from "react-router-dom";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="navbar bg-black text-green-400 w-full 
                    shadow-lg shadow-green-600/40 border-b border-green-700 px-4"
    >
      {/* Left section: Logo */}
      <div className="flex-1">
        <Link
          to="/"
          className="text-2xl font-bold text-green-400 hover:text-green-300 
                     transition drop-shadow-[0_0_8px_rgba(0,255,102,0.9)]"
        >
          DevConnect
        </Link>
      </div>

      {/* Right section: Avatar + user name + menu */}
      {user && (
        <div className="flex items-center gap-4">
          <span
            className="font-medium hidden sm:inline 
                           drop-shadow-[0_0_6px_rgba(0,255,102,0.8)]"
          >
            Welcome, {user.firstName}
          </span>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar border border-green-600"
            >
              <div className="w-10 rounded-full">
                <img alt="user avatar" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-black text-green-400 rounded-lg z-10 mt-3 w-52 p-2 
                         shadow-lg shadow-green-600/40 border border-green-700"
            >
              <li>
                <Link to="/" className="hover:text-green-300">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="justify-between hover:text-green-300"
                >
                  Profile
                  <span className="badge bg-green-600 text-black">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections" className="hover:text-green-300">
                  My Connections
                </Link>
              </li>
              <li>
                <Link to="/requests" className="hover:text-green-300">
                  Connection Requests
                </Link>
              </li>
              <li>
                <Link to="/entry" className="hover:text-green-300">
                  Quick Requests
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left hover:text-red-500"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
