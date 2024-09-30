import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFirebase } from "../Context/FirebaseContext";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../Components/Loader";
import Footer from "./Footer";

const CourseDetail = () => {
  const navigate = useNavigate();
  const { getCoursesById } = useFirebase();
  const { courseId: paramCourseId, courseName: paramCourseName } = useParams();
  const courseId = paramCourseId || localStorage.getItem("courseId");
  const courseName = paramCourseName || localStorage.getItem("courseName");
  const [course, setCourse] = useState(null);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("details");

  const lessonsData = {
    "Python Course": [
      "Python: Programming Fundamentals & Environment Setup",
      "Python: Control Flow & Functions",
      "Python: Data Structures & File I/O",
      "Python: Modules & Exception Handling",
      "Python: Introduction to Popular Libraries (NumPy, Matplotlib)",
      "Python: Web Development with Frameworks (Django, Flask)",
      "Python: Data Analysis with pandas & scikit-learn",
      "Python: Automation with Selenium",
      "Python: Object-Oriented Programming",
      "Python: GUI Development with Tkinter or PyQt",
    ],
    "Java": [
      "Java: Programming Fundamentals & Environment Setup",
      "Java: Control Flow & Functions",
      "Java: Object-Oriented Programming (OOP)",
      "Java: Data Structures & File I/O",
      "Java: Exception Handling & Collections",
      "Java: Introduction to Threads & Concurrency",
      "Java: Networking & Sockets",
      "Java: Database Connectivity (JDBC)",
      "Java: Testing Frameworks (JUnit)",
      "Java: Advanced Features (JavaFX, Swing)",
    ],
    "JavaScript": [
      "Introduction to JavaScript",
      "Data Types and Variables",
      "Operators and Expressions",
      "Control Structures (if statements, loops)",
      "Functions and Scope",
      "Arrays and Objects",
      "DOM Manipulation",
      "Events and Event Handling",
      "AJAX and Fetch API",
      "Error Handling",
      "ES6+ Features (Arrow Functions, Promises, Async/Await)",
      "Modules and Module Bundlers (Webpack, Parcel)",
      "Testing with Jest or Mocha",
      "Introduction to React or other JavaScript frameworks",
    ],
    "React Js": [
      "Introduction to React",
      "Components and Props",
      "State and Lifecycle Methods",
      "Handling Events",
      "Conditional Rendering",
      "Lists and Keys",
      "Forms and Controlled Components",
      "Component Lifecycle",
      "Context API and useContext Hook",
      "Introduction to React Router",
      "Redux Overview",
      "Actions and Action Creators",
      "Reducers and Store",
      "Connecting React with Redux",
      "Async Actions with Redux Thunk",
      "Redux Middleware",
      "Using Redux with React Hooks",
      "Immutable Data and Redux Toolkit",
      "Testing Redux Applications",
      "Best Practices in Redux",
    ],
    "Node js": [
      "Introduction to Node.js",
      "Node.js Modules (CommonJS)",
      "npm and package.json",
      "Asynchronous JavaScript (Callbacks, Promises, Async/Await)",
      "Express.js Framework",
      "Routing and Middleware",
      "Handling HTTP Requests and Responses",
      "Working with JSON and RESTful APIs",
      "Data Persistence with Databases (MongoDB, SQL)",
      "Authentication and Authorization",
      "Real-time Applications with WebSockets (using Socket.IO)",
      "Security Best Practices",
      "Error Handling and Debugging",
      "Testing Node.js Applications (Mocha, Chai)",
      "Performance Optimization",
      "Deployment and Scalability",
    ],
    "Android Development": [
      "Introduction to Android Development",
      "Setting up Android Studio",
      "Activities and Intents",
      "Fragments and UI Layouts",
      "RecyclerView and Adapter Pattern",
      "Handling User Input",
      "Permissions and Security",
      "Working with SQLite Database",
      "Networking with Retrofit",
      "Using RESTful APIs",
      "Background Processing with AsyncTask and Threads",
      "Material Design Principles",
      "Firebase Integration (Authentication, Realtime Database)",
      "Location and Maps Integration",
      "Publishing Apps on Google Play Store",
      "Testing and Debugging Android Apps",
      "Performance Optimization Techniques",
    ]
  };

  const handleStartContinue = () => {
    navigate(`/dashboard/coursedetail/${courseId}/courseprogress`);
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseData = await getCoursesById(courseId);
        setCourse(courseData);
      } catch (error) {
        setError("Error fetching course data.");
      }
    };
    fetchCourseData();
  }, [courseId, getCoursesById]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center p-8 bg-white rounded-lg shadow-lg"
        >
          <h1 className="text-2xl font-bold text-red-600 mb-4">Can't find any Course...</h1>
          <h2 className="text-xl text-gray-700">Please enroll into one.</h2>
        </motion.div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-24">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
        >
          <div className="relative h-64">
            <img
              src={course.courseImage}
              alt="Course"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h1 className="text-4xl font-bold text-white">{course.courseName} Course</h1>
            </div>
          </div>
          <div className="p-8">
            <p className="text-lg text-gray-600 mb-8">{course.courseDescription}</p>
            <button
              onClick={handleStartContinue}
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105"
            >
              Start / Continue Course
            </button>
          </div>
        </motion.div>

        <div className="mt-12 max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setActiveSection("details")}
              className={`px-4 py-2 mx-2 rounded-full ${
                activeSection === "details" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              Course Details
            </button>
            <button
              onClick={() => setActiveSection("content")}
              className={`px-4 py-2 mx-2 rounded-full ${
                activeSection === "content" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              Course Content
            </button>
            <button
              onClick={() => setActiveSection("instructor")}
              className={`px-4 py-2 mx-2 rounded-full ${
                activeSection === "instructor" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              Instructor
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeSection === "details" && (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow p-6 mb-8"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Course Details</h2>
                <p className="text-lg mb-2"><span className="font-semibold">Duration:</span> {course.courseDuration}</p>
                <p className="text-lg"><span className="font-semibold">Level:</span> Intermediate</p>
              </motion.div>
            )}

            {activeSection === "content" && (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Course Content</h3>
                <ul className="space-y-3 mb-8">
                  {courseName &&
                    lessonsData[courseName] &&
                    lessonsData[courseName].map((lesson, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition duration-300"
                      >
                        {lesson}
                      </motion.li>
                    ))}
                </ul>
              </motion.div>
            )}

            {activeSection === "instructor" && (
              <motion.div
                key="instructor"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Instructor</h3>
                <p className="text-lg mb-4"><span className="font-semibold">Name:</span> {course.courseInstructor}</p>
                <p className="text-lg">
                  <span className="font-semibold">About the Instructor:</span> {course.courseInstructor} is a seasoned software engineer
                  with over 10 years of experience in {course.courseName}. He has a passion for teaching and has helped hundreds of
                  students master {course.courseName}. His teaching style is engaging and practical, focusing on real-world examples and
                  hands-on projects.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CourseDetail;