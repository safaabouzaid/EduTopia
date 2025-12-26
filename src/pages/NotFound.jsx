import { Link } from "react-router-dom";
import { HomeIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-32 h-32 bg-linear-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center">
            <ExclamationTriangleIcon className="w-20 h-20 text-red-500" />
          </div>
        </div>

        {/* 404 Text */}
        <div className="mb-6">
          <h1 className="text-8xl md:text-9xl font-bold text-gray-800 mb-2">
            404
          </h1>
          <div className="w-24 h-1 bg-linear-to-r from-indigo-500 to-purple-500 mx-auto mb-4"></div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Home Button */}
        <div className="mt-10">
          <Link 
            to="/" 
            className="inline-flex items-center gap-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            <HomeIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Homepage</span>
          </Link>
        </div>

        {/* Additional Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm mb-4">
            You might be looking for:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/courses" 
              className="text-indigo-600 hover:text-indigo-700 font-medium hover:underline"
            >
              Browse Courses
            </Link>
            <Link 
              to="/" 
              className="text-indigo-600 hover:text-indigo-700 font-medium hover:underline"
            >
              Home
            </Link>
            <Link 
              to="/login" 
              className="text-indigo-600 hover:text-indigo-700 font-medium hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;