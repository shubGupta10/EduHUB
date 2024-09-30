import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChalkboardTeacher,
  FaCertificate,
  FaBook,
  FaClipboardList,
  FaQuestionCircle,
  FaTasks,
  FaLaptopCode,
  FaGraduationCap,
  FaNetworkWired,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { fetchAllUsers } from "../FireStoreDB/Db";

const Home = () => {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);

  const handleGoing = () => {
    navigate("/dashboard/viewcourse");
  };

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const users = await fetchAllUsers();
        setTeachers(users);
      } catch (error) {
        console.error("Failed to get users", error);
      }
    };

    fetchInstructors();

  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black">
        <div className="absolute inset-0 bg-[url('https://t4.ftcdn.net/jpg/02/07/15/43/360_F_207154340_wLIJus4m3SBl5sAQmpqN3Um7REnUhskU.jpg')] bg-cover bg-center opacity-10"></div>
        <motion.div
          className="relative text-center z-10 max-w-4xl mx-auto px-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-6xl sm:text-8xl font-extrabold tracking-tight mb-4">
            Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">EduHUB</span>
          </h1>
          <p className="mt-6 text-2xl sm:text-3xl text-gray-300">Your journey to knowledge begins here.</p>
          <p className="mt-4 text-lg text-gray-400">
            Discover courses tailored to your needs, whether you're a beginner or an expert.
          </p>
          <motion.button
            onClick={handleGoing}
            className="mt-8 px-8 py-3 bg-white text-black font-semibold text-lg rounded-full hover:bg-gray-200 transition-colors duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold mb-4">Key Features</h2>
            <p className="text-xl text-gray-400">
              Explore what makes EduHUB the perfect platform for your learning journey
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: FaBook, title: "Interactive Courses", description: "Engage with hands-on courses designed by experts." },
              { icon: FaChalkboardTeacher, title: "Expert Tutors", description: "Learn from industry-leading professionals." },
              { icon: FaCertificate, title: "Certifications", description: "Earn certificates to advance your career." },
              { icon: FaClipboardList, title: "Assignments", description: "Test your knowledge with practical assignments." },
              { icon: FaTasks, title: "Quizzes", description: "Reinforce your learning with interactive quizzes." },
              { icon: FaQuestionCircle, title: "Discussion Forum", description: "Engage with peers in our community forums." }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-8 rounded-xl shadow-lg text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <feature.icon className="text-5xl mb-4 text-blue-400 mx-auto" />
                <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold mb-4">Popular Courses</h2>
            <p className="text-xl text-gray-400">Discover our most sought-after learning experiences</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Python for Beginners",
                img: "https://contentstatic.techgig.com/photo/88712201.cms",
                description: "Learn Python from scratch and build your first application.",
              },
              {
                title: "JavaScript Essentials",
                img: "https://i.ytimg.com/vi/jS4aFq5-91M/maxresdefault.jpg",
                description: "Master the fundamentals of JavaScript and modern web development.",
              },
              {
                title: "Web Development Bootcamp",
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiEjBilP-PBEbL7NAsVh5jU2PEYPgaGhh8-g&s",
                description: "Become a full-stack web developer with this comprehensive course.",
              },
            ].map((course, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              >
                <img
                  className="w-full h-48 object-cover"
                  src={course.img}
                  alt={course.title}
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-gray-400 mb-4">{course.description}</p>
                  <Link to="/dashboard/viewcourse">
                    <motion.button
                      className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Enroll Now
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section id="instructors" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold mb-4">Meet Our Instructors</h2>
            <p className="text-xl text-gray-400">Learn from industry experts with real-world experience</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatePresence>
              {teachers.map((teacher, index) => (
                <motion.div
                  key={teacher.id}
                  className="bg-gray-800 rounded-xl overflow-hidden shadow-lg"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="p-6">
                    <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                      <img
                        className="w-full h-full object-cover"
                        src={teacher.dp}
                        alt={teacher.displayName}
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-center mb-2">{teacher.displayName}</h3>
                    <p className="text-gray-400 text-center mb-2">{teacher.email}</p>
                    <p className="text-center text-gray-300">
                      <span className="font-semibold">Experience:</span> {teacher.experience} years
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">EduHUB</h3>
              <p className="text-gray-400">Empowering learners worldwide</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
              <nav className="flex flex-col space-y-2">
                <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-300">Home</Link>
                <a href="#features" className="text-gray-400 hover:text-white transition-colors duration-300">Features</a>
                <a href="#courses" className="text-gray-400 hover:text-white transition-colors duration-300">Courses</a>
                <a href="#instructors" className="text-gray-400 hover:text-white transition-colors duration-300">Instructors</a>
              </nav>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
              <p className="text-gray-400">Email: info@eduhub.com</p>
              <p className="text-gray-400">Phone: +123 456 7890</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p>&copy; {new Date().getFullYear()} EduHUB. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;