import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      {/* LEFT */}
      <h2 className="text-xl font-semibold text-gray-800">
        My Red Reddit
      </h2>

      {/* RIGHT */}
      <div className="flex items-center gap-4 text-sm">
        {!user ? (
          <>
            <Link
              to="/login"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/create"
              className="px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Create Post
            </Link>

            <span className="text-gray-600">
              Hi 👋
            </span>

            <button
              onClick={logout}
              className="text-gray-600 hover:text-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
