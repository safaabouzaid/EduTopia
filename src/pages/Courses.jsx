import { useState } from "react";
import { coursesData } from "../data/coursesData";
import CourseCard from "../components/CourseCard";

const Courses = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;
  const totalPages = Math.ceil(coursesData.length / coursesPerPage);
  const indexOfLast = currentPage * coursesPerPage;
  const indexOfFirst = indexOfLast - coursesPerPage;
  const currentCourses = coursesData.slice(indexOfFirst, indexOfLast);

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const addToCart = (course) => {
    setCart([...cart, course]);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore Our Courses
          </h1>
          <p className="text-gray-600 text-lg">
            Discover {coursesData.length} expertly crafted courses to boost your skills
          </p>
        </div>

        

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentCourses.map((course) => (
            <CourseCard key={course.id} course={course} addToCart={addToCart} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
          >
            Previous
          </button>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`w-10 h-10 rounded-lg font-medium transition-all ${
                  currentPage === pageNum
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : 'border hover:bg-gray-100'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition"
          >
            Next
          </button>
        </div>

        {/* Page Info */}
        <p className="text-center text-gray-600 mt-4">
          Showing {indexOfFirst + 1}-{Math.min(indexOfLast, coursesData.length)} of {coursesData.length} courses
        </p>
      </div>
    </div>
  );
};

export default Courses;