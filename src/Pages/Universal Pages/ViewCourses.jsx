import React, { useEffect, useState } from 'react';
import { useFirebase } from '../../Context/FirebaseContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../../Components/Footer';
import Loader from '../../Components/Loader';

const ViewCourses = () => {
  const firebase = useFirebase();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesSnapshot = await firebase.getCoursesFromFirestore();
        const coursesList = coursesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(coursesList);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching courses: ", error);
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, [firebase]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <div className="pt-28 pb-12"> 
          <div className="container mx-auto px-4">
            <header className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Explore Our Courses</h1>
              <p className="text-xl text-gray-600">
                Browse through our extensive range of courses and find the perfect one for you.
              </p>
            </header>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {courses.map(course => (
                <motion.div
                  key={course.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                  variants={itemVariants}
                >
                  {course.courseImage && (
                    <img
                      src={course.courseImage}
                      alt={course.courseName}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-2">{course.courseName}</h2>
                    <p className="text-gray-600 mb-4">
                      {course.courseDescription.substring(0, 100)}...
                    </p>
                    <div className="mb-4">
                      <p className="text-sm"><strong>Duration:</strong> {course.courseDuration} hrs</p>
                      <p className="text-sm"><strong>Instructor:</strong> {course.courseInstructor}</p>
                    </div>
                    <Link
                      to={`/courseoverview/${course.id}/${course.courseName}`}
                      className="block"
                    >
                      <motion.button
                        className="w-full bg-black text-white py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Enroll Now
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ViewCourses;