import { useParams, useNavigate, Link } from "react-router-dom";
import { coursesData } from "../data/CoursesData";
import { useState, useEffect } from "react";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = coursesData.find((c) => c.id === parseInt(id));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [relatedCourses, setRelatedCourses] = useState([]);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoggedIn(loggedIn === "true");
    
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);

    if (course) {
      const related = coursesData
        .filter(c => c.category === course.category && c.id !== course.id)
        .slice(0, 3);
      setRelatedCourses(related);
    }
  }, [course]);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.218 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <p className="text-gray-600 mb-8">The course you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/courses"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-sky-500 transition-all duration-300"
          >
            Browse All Courses
          </Link>
        </div>
      </div>
    );
  }

  const getLevelColor = (level) => {
    switch(level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-sky-100 text-sky-800';
      case 'Advanced': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Frontend': return 'bg-indigo-100 text-indigo-800';
      case 'Backend': return 'bg-sky-100 text-sky-800';
      case 'UI/UX': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const existingItem = cart.find(item => item.id === course.id);
    if (!existingItem) {
      const updatedCart = [...cart, course];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const isInCart = cart.some(item => item.id === course.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 animate-bounce">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl flex items-center space-x-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">Course added to cart successfully!</span>
          </div>
        </div>
      )}

      {/* Course Hero Section */}
      <div className="relative bg-linear-to-r from-indigo-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 py-12 relative">
          <div className="flex items-center space-x-2 text-sm mb-4 text-white/80">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span>
            <Link to="/courses" className="hover:text-white transition-colors">Courses</Link>
            <span>›</span>
            <span>{course.title}</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className={`px-4 py-1 rounded-full text-sm font-semibold mb-4 inline-block ${getLevelColor(course.level)} backdrop-blur-sm bg-white/90`}>
                {course.level}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-white/90 mb-6">{course.shortDescription}</p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                  </svg>
                  <span>{course.instructor}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
                  </svg>
                  <span>{course.duration || '4 Weeks'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" />
                  </svg>
                  <span>{course.lessonsCount} Lessons</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold mb-2">${course.price}</div>
                <p className="text-white/80">One-time payment</p>
              </div>
              
              <button
                onClick={handleAddToCart}
                disabled={isInCart}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 mb-4 ${
                  isInCart
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-sky-500 text-white hover:bg-indigo-600 hover:shadow-xl'
                }`}
              >
                {isInCart ? 'Already in Cart' : 'Add to Cart'}
              </button>
              
              <button className="w-full bg-white/20 hover:bg-white/30 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 border border-white/30">
                Enroll Now
              </button>
              
              <div className="mt-6 pt-6 border-t border-white/20">
                <h3 className="font-bold mb-3">This course includes:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                    <span>{course.lessonsCount} on-demand lessons</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                    <span>Certificate of completion</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                    <span>Lifetime access</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                    <span>Community access</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Course Details */}
          <div className="lg:col-span-2">
            {/* Course Overview */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Course Overview</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {course.fullDescription}
                </p>
                
                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What You'll Learn</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Master React fundamentals and advanced concepts",
                    "Build real-world applications",
                    "Understand state management with Redux",
                    "Learn best practices and patterns",
                    "Deploy applications to production",
                    "Work with APIs and external services"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-green-500 mt-1 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Course Curriculum */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Course Curriculum</h2>
              <div className="space-y-4">
                {Array.from({ length: 6 }).map((_, week) => (
                  <div key={week} className="border border-gray-200 rounded-xl overflow-hidden hover:border-indigo-200 transition-colors">
                    <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
                      <h3 className="font-bold text-gray-900">Week {week + 1}: Introduction to Core Concepts</h3>
                      <span className="text-gray-600">{4} lessons</span>
                    </div>
                    <div className="p-6 space-y-3">
                      {Array.from({ length: 4 }).map((_, lesson) => (
                        <div key={lesson} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
                              {lesson + 1}
                            </div>
                            <span>Lesson {lesson + 1}: Understanding Fundamentals</span>
                          </div>
                          <span className="text-gray-500">45 min</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructor */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About the Instructor</h2>
              <div className="flex items-start space-x-6">
                <div className="w-24 h-24 bg-linear-to-r from-indigo-500 to-sky-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {course.instructor?.charAt(0) || 'J'}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{course.instructor || 'John Doe'}</h3>
                  <p className="text-gray-600 mb-4">Senior Developer & Instructor with 10+ years experience</p>
                  <p className="text-gray-700">
                    With over a decade of experience in web development, {course.instructor?.split(' ')[0] || 'John'} has taught thousands of students worldwide. Passionate about making complex concepts easy to understand.
                  </p>
                  <div className="flex items-center space-x-6 mt-4">
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-bold">4.9</span>
                      <span className="text-gray-600">instructor rating</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                      </svg>
                      <span className="font-bold">12,450</span>
                      <span className="text-gray-600">students</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" />
                      </svg>
                      <span className="font-bold">15</span>
                      <span className="text-gray-600">courses</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Course Info */}
          <div className="space-y-8">
            {/* Course Details Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Course Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Level</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(course.category)}`}>
                    {course.category}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Language</span>
                  <span className="font-medium">{course.language || 'English'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">{course.duration || '4 Weeks'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lessons</span>
                  <span className="font-medium">{course.lessonsCount} lessons</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Schedule</span>
                  <span className="font-medium">{course.days?.join(', ') || 'Flexible'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time</span>
                  <span className="font-medium">{course.time || 'Self-paced'}</span>
                </div>
              </div>
            </div>

            {/* Related Courses */}
            {relatedCourses.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Related Courses</h3>
                <div className="space-y-4">
                  {relatedCourses.map((relatedCourse) => (
                    <Link
                      key={relatedCourse.id}
                      to={`/courses/${relatedCourse.id}`}
                      className="group block"
                    >
                      <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="w-16 h-16 bg-linear-to-r from-indigo-400 to-sky-400 rounded-lg shrink-0"></div>
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                            {relatedCourse.title}
                          </h4>
                          <p className="text-sm text-gray-600">${relatedCourse.price}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${getLevelColor(relatedCourse.level)}`}>
                            {relatedCourse.level}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-linear-to-r from-indigo-600 to-indigo-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl text-white/90 mb-8">Join thousands of students who have transformed their careers</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleAddToCart}
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-sky-50 hover:text-sky-600 transition-all duration-300"
            >
              {isInCart ? 'Go to Cart' : 'Add to Cart'}
            </button>
            <button className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-white/10 transition-all duration-300">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;