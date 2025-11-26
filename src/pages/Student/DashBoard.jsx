import React, { useState } from 'react';
import StudentNavbar from "../../components/StudentNavbar";
import Footer from "../../components/Footer";
import { 
  Search, 
  Heart, 
  Bookmark, 
  Clock, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle,
  Users,
  RefreshCw
} from 'lucide-react';

const DashBoard = () => {
  // Sample Data
  const continueLearning = [
    {
      id: '1',
      title: 'Mathematics & Physics Class',
      image: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=400&h=250&fit=crop',
      lesson: 'Lesson 5 of 7',
      progress: 71,
      tutor: {
        name: 'Baran Mercy',
        verified: true,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        title: 'Science Tutor'
      }
    },
    {
      id: '2',
      title: 'Mathematics & Physics Class',
      image: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=400&h=250&fit=crop',
      lesson: 'Lesson 5 of 7',
      progress: 71,
      tutor: {
        name: 'Baran Mercy',
        verified: true,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        title: 'Science Tutor'
      }
    },
    {
      id: '3',
      title: 'Mathematics & Physics Class',
      image: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=400&h=250&fit=crop',
      lesson: 'Lesson 5 of 7',
      progress: 71,
      tutor: {
        name: 'Baran Mercy',
        verified: true,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        title: 'Science Tutor'
      }
    }
  ];

  const courses = Array(6).fill(null).map((_, index) => ({
    id: `course-${index + 1}`,
    title: 'Advanced Mathematics',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=250&fit=crop',
    category: 'Secondary',
    subjects: ['Mathematics', 'Physics', 'Chemistry'],
    duration: '45 mins / 60 mins',
    price: '₦1,000 / ₦2,000per Hour',
    availability: 'Today, 4:30 PM',
    tutor: {
      name: 'Baran Mercy',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      title: 'Science Tutor'
    },
    rating: 4.8,
    reviews: 33,
    isFavorite: index === 0,
    isBookmarked: index === 1
  }));

  const recommendedCourses = Array(4).fill(null).map((_, index) => ({
    id: `rec-${index + 1}`,
    title: 'Preparing for Science Based JAMB/UTME Exams.',
    category: 'Sciences',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop',
    weeks: '8Weeks',
    students: '156 Students Taught',
    originalPrice: '₦150,000',
    price: '₦52,000'
  }));

  const [currentContinueIndex, setCurrentContinueIndex] = useState(0);
  const [currentRecommendedIndex, setCurrentRecommendedIndex] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50">
      <StudentNavbar />
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        
        {/* Navigation Pills */}
        <div className="relative z-10 px-6 pt-6">
          <div className="flex gap-3 text-sm flex-wrap">
            {['Sciences', 'English', 'Mathematics', 'Arts', 'Exam Prep', 'Literacy', 'Senior Classes', 'WAEC/NECO', 'JAMB/UTME'].map((subject) => (
              <button
                key={subject}
                className="px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors"
              >
                {subject}
              </button>
            ))}
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="relative z-10 px-6 py-16">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg"></div>
                <span className="text-xl font-bold">KYNDA</span>
              </div>

              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Unlock Your Potential<br />With Kynda Tutors!
              </h1>

              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                    🎨
                  </div>
                  <span className="font-semibold text-lg">Arts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                    🔬
                  </div>
                  <span className="font-semibold text-lg">Science</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    📚
                  </div>
                  <span className="font-semibold text-lg">other Subjects</span>
                </div>
              </div>

              <div className="space-y-3 text-lg">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle size={16} />
                  </div>
                  <span>Expert Tutors</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle size={16} />
                  </div>
                  <span>Flexible Scheduling</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle size={16} />
                  </div>
                  <span>Achieve your Goals</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle size={16} />
                  </div>
                  <span>Personalised Learning</span>
                </div>
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="relative">
              <div className="absolute top-1/2 left-0 w-96 h-96 bg-orange-500 rounded-full -translate-y-1/2 opacity-50"></div>
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop"
                alt="Tutor"
                className="relative rounded-3xl shadow-2xl object-cover w-full h-[500px]"
              />
              
              {/* Tutor Badge */}
              <div className="absolute bottom-8 left-8 bg-white rounded-xl p-3 shadow-lg flex items-center gap-3">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                  alt="Tutor"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-gray-800">Bel Mercy</span>
                    <CheckCircle size={14} className="text-blue-500" />
                  </div>
                  <p className="text-xs text-gray-600">Verified Kynda Tutor</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-semibold">4.9</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Learning Section */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Pick up from where you Stopped</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentContinueIndex(Math.max(0, currentContinueIndex - 1))}
              className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => setCurrentContinueIndex(Math.min(continueLearning.length - 1, currentContinueIndex + 1))}
              className="w-10 h-10 rounded-full bg-cyan-500 text-white flex items-center justify-center hover:bg-cyan-600 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {continueLearning.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100">
                  <Bookmark size={16} />
                </button>
              </div>
              
              <div className="p-5">
                <h3 className="font-semibold text-gray-800 mb-3">{item.title}</h3>
                
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>{item.lesson}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Tutor Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img 
                      src={item.tutor.avatar}
                      alt={item.tutor.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-semibold text-gray-800">{item.tutor.name}</span>
                        {item.tutor.verified && <CheckCircle size={12} className="text-blue-500" />}
                      </div>
                      <p className="text-xs text-gray-500">{item.tutor.title}</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-700 text-white text-sm font-medium rounded-lg hover:bg-blue-800 transition-colors">
                    Continue
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Courses Section */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Courses</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <img 
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                
                {/* Rating Badge */}
                <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded-lg flex items-center gap-1 text-sm backdrop-blur-sm">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-xs text-gray-300">{course.reviews} Reviews</span>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  <button className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-colors ${
                    course.isFavorite ? 'bg-red-500 text-white' : 'bg-white hover:bg-gray-100'
                  }`}>
                    <Heart size={16} className={course.isFavorite ? 'fill-white' : ''} />
                  </button>
                  <button className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-colors ${
                    course.isBookmarked ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'
                  }`}>
                    <Bookmark size={16} className={course.isBookmarked ? 'fill-white' : ''} />
                  </button>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-orange-600 font-medium">{course.category}</span>
                  <Clock size={12} className="text-gray-400" />
                  <span className="text-xs text-gray-500">2 weeks</span>
                </div>

                <div className="mb-3">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Subjects:</p>
                  <div className="flex flex-wrap gap-2">
                    {course.subjects.map((subject, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <p><span className="font-semibold">Duration:</span> {course.duration}</p>
                  <p><span className="font-semibold text-cyan-600">Price:</span> <span className="text-cyan-600">{course.price}</span></p>
                  <p><span className="font-semibold">Availability:</span> {course.availability}</p>
                </div>

                {/* Tutor Info */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <img 
                      src={course.tutor.avatar}
                      alt={course.tutor.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-semibold text-gray-800">{course.tutor.name}</span>
                        {course.tutor.verified && <CheckCircle size={12} className="text-blue-500" />}
                      </div>
                      <p className="text-xs text-gray-500">{course.tutor.title}</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-700 text-white text-sm font-medium rounded-lg hover:bg-blue-800 transition-colors">
                    Book Section
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-8">
          <button className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            Load More
            <RefreshCw size={18} />
          </button>
        </div>
      </section>

      {/* Recommended Section */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Recommended for You</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentRecommendedIndex(Math.max(0, currentRecommendedIndex - 1))}
              className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => setCurrentRecommendedIndex(Math.min(recommendedCourses.length - 1, currentRecommendedIndex + 1))}
              className="w-10 h-10 rounded-full bg-cyan-500 text-white flex items-center justify-center hover:bg-cyan-600 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <img 
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3 bg-cyan-500 text-white px-3 py-1 rounded-lg text-sm font-medium">
                  {course.category}
                </div>
              </div>
              
              <div className="p-5">
                <p className="text-xs text-orange-600 font-medium mb-2">Exam Prep</p>
                <h3 className="font-semibold text-gray-800 mb-4">{course.title}</h3>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{course.weeks}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    <span>{course.students}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-400 line-through text-sm">{course.originalPrice}</span>
                    <span className="text-cyan-600 font-bold text-lg ml-2">{course.price}</span>
                  </div>
                  <button className="px-4 py-2 border-2 border-blue-700 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors">
                    View More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default DashBoard;