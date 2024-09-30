import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useFirebase } from "../../Context/FirebaseContext";
import Footer from "../../Components/Footer";
import Loader from "../../Components/Loader";
import { motion } from "framer-motion";

const CourseOverview = () => {
  const { getCoursesById } = useFirebase();
  const { courseId, courseName } = useParams();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseData = await getCoursesById(courseId);
        setCourse(courseData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error occurred:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [courseId, getCoursesById]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className=" container min-h-80 mx-auto px-4 pt-28 mb-16">
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-xl rounded-lg overflow-hidden"
          >
            <div className="md:flex">
              <div className="md:w-1/2 flex items-center">
                <img
                  src={course && course.courseImage}
                  alt={courseName}
                  className="w-full h-full object-cover rounded-l-lg"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <h1 className="text-3xl font-bold text-black mb-4">
                  {courseName}
                </h1>
                <p className="text-gray-500 text-lg mb-3">
                  {course && course.courseCategory}
                </p>
                <p className="text-gray-700 mb-6">
                  {course && course.courseDescription}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <p className="text-black">
                    <strong>Instructor:</strong>{" "}
                    {course && course.courseInstructor}
                  </p>
                  <p className="text-black">
                    <strong>Duration:</strong> {course && course.courseDuration}{" "}
                    hours
                  </p>
                </div>
                <div className="flex justify-center space-x-4">
                  <Link to={`/studentdetails/${courseId}/${courseName}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="bg-black text-white text-lg px-5 py-3 rounded-md shadow-md transition-transform duration-200"
                    >
                      Buy Now
                    </motion.button>
                  </Link>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="bg-white text-black text-lg px-5 py-3 border border-black rounded-md shadow-md transition-transform duration-200 hover:bg-black hover:text-white"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseOverview;
