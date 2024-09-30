import React, { useState } from "react";
import { motion } from "framer-motion";
import { useFirebase } from "../../Context/FirebaseContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../Context/FirebaseContext";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader";
import { v4 as uuidv4 } from "uuid";
import Footer from "../../Components/Footer";
import { toast } from "react-toastify";

const AddCourse = () => {
  const firebase = useFirebase();
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [courseInstructor, setCourseInstructor] = useState("");
  const [courseImage, setCourseImage] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      let imageUrl = "";
      if (courseImage) {
        const imageRef = ref(
          storage,
          `courseImages/${Date.now()}_${courseImage.name}`
        );
        const snapshot = await uploadBytes(imageRef, courseImage);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const courseId = uuidv4();

      const courseData = {
        courseId,
        courseName,
        courseDescription,
        courseDuration,
        courseInstructor,
        courseImage: imageUrl,
      };

      await firebase.addCourseToFirestore(courseData);
      toast.success("Course added successfully!");
      setCourseName("");
      setCourseDescription("");
      setCourseDuration("");
      setCourseInstructor("");
      setCourseImage(null);
      navigate("/dashboard/viewcourse");
    } catch (error) {
      toast.error("Failed to add course");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen pt-24 pb-12">
      {isLoading && <Loader />}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-10">
              Add New Course
            </h2>
            <form onSubmit={handleAddCourse} className="space-y-8">
              <div>
                <label
                  htmlFor="courseName"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Course Name
                </label>
                <input
                  type="text"
                  id="courseName"
                  className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm hover:shadow-lg transition-all"
                  placeholder="Enter course name"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="courseDescription"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Course Description
                </label>
                <textarea
                  id="courseDescription"
                  rows={4}
                  className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm hover:shadow-lg transition-all"
                  placeholder="Enter course description"
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="courseDuration"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Course Duration (hours)
                </label>
                <input
                  type="number"
                  id="courseDuration"
                  className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm hover:shadow-lg transition-all"
                  placeholder="Enter course duration"
                  value={courseDuration}
                  onChange={(e) => setCourseDuration(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="courseInstructor"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Course Instructor
                </label>
                <input
                  type="text"
                  id="courseInstructor"
                  className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm hover:shadow-lg transition-all"
                  placeholder="Enter course instructor"
                  value={courseInstructor}
                  onChange={(e) => setCourseInstructor(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="courseImage"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Upload Course Image
                </label>
                <input
                  type="file"
                  id="courseImage"
                  className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-black file:text-white hover:file:bg-gray-800 transition-all"
                  accept="image/*"
                  onChange={(e) => setCourseImage(e.target.files[0])}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 px-6 bg-black text-white rounded-md shadow-md hover:bg-gray-800 transition-all font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                type="submit"
              >
                Add Course
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default AddCourse;
