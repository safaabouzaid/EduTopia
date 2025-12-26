import { Link, useNavigate } from "react-router-dom";

const CourseCard = ({ course, addToCart }) => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleAdd = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    addToCart(course);
    
    // Show feedback
    const button = document.activeElement;
    const originalText = button.textContent;
    button.textContent = 'Added!';
    button.classList.remove('bg-emerald-500');
    button.classList.add('bg-emerald-600');
    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('bg-emerald-600');
      button.classList.add('bg-emerald-500');
    }, 1000);
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'Beginner': return 'bg-emerald-100 text-emerald-800';
      case 'Intermediate': return 'bg-sky-100 text-sky-800';
      case 'Advanced': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-indigo-200 group">
      {/* Course Image/Banner */}
      <div className="h-48 bg-linear-to-r from-indigo-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(course.level)} backdrop-blur-sm bg-white/90`}>
            {course.level}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 text-indigo-600 px-3 py-1 rounded-lg font-bold text-lg">
            ${course.price}
          </span>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {course.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {course.shortDescription}
        </p>

        {/* Course Meta */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-sky-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
            </svg>
            <span>{course.duration || '4 Weeks'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
            <span>{course.instructor || 'Expert Instructor'}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-3">
        <Link
  to={`/courses/${course.id}`}
  className="flex-1 border-2 border-indigo-600 text-indigo-600 px-4 py-3 rounded-lg hover:bg-indigo-50 transition-all duration-200 font-medium text-center hover:shadow-md"
>
  View Details
</Link>

          <button
            onClick={handleAdd}
            className="flex-1 bg-emerald-500 text-white px-4 py-3 rounded-lg hover:bg-emerald-600 transition-all duration-200 font-medium hover:shadow-md"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;