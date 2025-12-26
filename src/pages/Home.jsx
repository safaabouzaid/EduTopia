import { 
  AcademicCapIcon,
  DevicePhoneMobileIcon,
  ChartBarIcon,
  UsersIcon,
  SparklesIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Home = () => {
  const features = [
    {
      icon: AcademicCapIcon,
      title: 'Expert Instructors',
      desc: 'Learn from industry professionals'
    },
    {
      icon: DevicePhoneMobileIcon,
      title: 'Flexible Learning',
      desc: 'Access courses anytime, anywhere'
    },
    {
      icon: ChartBarIcon,
      title: 'Career Growth',
      desc: 'Skills that boost your career'
    },
    {
      icon: UsersIcon,
      title: 'Community',
      desc: 'Join thousands of learners'
    }
  ];

  const testimonials = [
    { name: 'Ali Ahmed', role: 'Web Developer', text: 'Changed my career path completely!', avatar: 'AA' },
    { name: 'Sarah Mohammed', role: 'UI/UX Designer', text: 'Best platform for design courses', avatar: 'SM' },
    { name: 'Omar Khalid', role: 'Student', text: 'Perfect balance of theory and practice', avatar: 'OK' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section  */}
      <section className="relative bg-gradient-to-br from-indigo-700 to-purple-700 text-white py-16 md:py-20 overflow-hidden">
        <div className="container mx-auto px-4 text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full mb-4 text-sm">
            <SparklesIcon className="w-4 h-4 text-yellow-300" />
            <span>Top Learning Platform</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            Master Your Future with 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400 mt-1">
              EduTopia 
            </span>
          </h1>
          
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-6">
            Transform your skills with expert-led online courses designed for your success
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link 
              to="/courses"
              className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-sky-600 transition-all duration-300 flex items-center gap-2 shadow-md"
            >
              Start Learning
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
            <Link 
              to="/courses"
              className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300"
            >
              View Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section - أصغر */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Why Choose <span className="text-indigo-600">EduTopia </span>?
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              A unique learning experience combining quality, flexibility, and support
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-indigo-200 hover:-translate-y-1"
              >
                <div className="mb-4 flex justify-center">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-3 rounded-lg">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - أصغر */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              What <span className="text-indigo-600">Students</span> Say
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Join thousands of students who achieved their career dreams with us
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-indigo-600 font-semibold text-sm">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-xs">{testimonial.role}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm mb-4">"{testimonial.text}"</p>
                
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - أصغر */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-indigo-700 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your Learning Journey?
            </h2>
            
            <p className="text-lg mb-6 opacity-90">
              Join over 10,000 students who transformed their careers
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link 
                to="/courses"
                className="bg-gradient-to-r from-emerald-400 to-sky-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:from-emerald-500 hover:to-sky-500 transition-all duration-300 flex items-center gap-2 shadow-lg"
              >
                Explore All Courses
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
              
              <Link 
                to="/courses"
                className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300"
              >
                Book Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;