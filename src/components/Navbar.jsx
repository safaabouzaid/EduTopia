import { Link } from "react-router-dom";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <nav className="sticky top-0 z-50 bg-linear-to-r from-indigo-700 to-purple-700 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo  */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-linear-to-br from-white to-gray-100 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
              <AcademicCapIcon className="w-7 h-7 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                EduTopia
              </h1>
              <p className="text-xs text-gray-300 font-medium">
                Learn. Grow. Succeed.
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-10">
            <Link 
              to="/" 
              className="text-white/90 hover:text-white font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-emerald-400 pb-1"
            >
              Home
            </Link>
            <Link 
              to="/courses" 
              className="text-white/90 hover:text-white font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-emerald-400 pb-1"
            >
              Courses
            </Link>
            <Link 
              to="/cart" 
              className="relative text-white/90 hover:text-white font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-emerald-400 pb-1 flex items-center gap-2"
            >
              <ShoppingCartIcon className="w-5 h-5" />
              Cart
              {isLoggedIn && JSON.parse(localStorage.getItem("cart"))?.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {JSON.parse(localStorage.getItem("cart"))?.length}
                </span>
              )}
            </Link>
          </div>

          {/* Auth Button */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-white">
                  <UserCircleIcon className="w-6 h-6" />
                  <span className="font-medium">User</span>
                </div>
                <button
                  onClick={() => {
                    localStorage.removeItem("isLoggedIn");
                    localStorage.removeItem("cart");
                    window.location.reload();
                  }}
                  className="bg-white/10 text-white px-5 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 font-medium border border-white/20"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-white text-indigo-700 px-6 py-2.5 rounded-lg hover:bg-gray-100 transition-all duration-300 font-medium shadow-sm hover:shadow flex items-center gap-2"
              >
                <UserCircleIcon className="w-5 h-5" />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;