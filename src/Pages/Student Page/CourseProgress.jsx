import React, { useEffect, useState } from "react";
import { storage, useFirebase } from "../../Context/FirebaseContext";
import { useParams } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import Footer from "../../Components/Footer";
import { motion } from "framer-motion";

const CourseProgress = () => {
  const { courseId: paramCourseId, courseName: paramCourseName } = useParams();
  const courseId = paramCourseId || localStorage.getItem("courseId");
  const courseName = paramCourseName || localStorage.getItem("courseName");
  const { getCoursesById, matchUser, user } = useFirebase();
  const [course, setCourse] = useState(null);
  const [videos, setVideos] = useState([]);
  const [videosLoaded, setVideosLoaded] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseData = await getCoursesById(courseId);
        setCourse(courseData);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };
    fetchCourseData();
  }, [courseId, getCoursesById]);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const matchedUser = await matchUser(user);
        setUserRole(matchedUser.role);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchUserId();
  }, [user, matchUser]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const listRef = ref(storage, `CourseVideos/${courseName}/`);
        const res = await listAll(listRef);
        const videoPromises = res.items.map((itemRef) =>
          getDownloadURL(itemRef)
        );
        const videoUrls = await Promise.all(videoPromises);

        const videoData = videoUrls.map((url, index) => ({
          title: `Video ${index + 1}`,
          description: `${courseName} Video ${index + 1}`,
          url,
        }));

        setVideos(videoData);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setVideosLoaded(true);
      }
    };
    fetchVideos();
  }, [courseName]);

  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const storageRef = ref(
        storage,
        `CourseVideos/${courseName}/${Date.now()}_${file.name}`
      );
      await uploadBytes(storageRef, file);
      console.log("Video uploaded successfully");
      const res = await listAll(ref(storage, `CourseVideos/${courseName}/`));
      const videoPromises = res.items.map((itemRef) => getDownloadURL(itemRef));
      const videoUrls = await Promise.all(videoPromises);

      const videoData = videoUrls.map((url, index) => ({
        title: `Video ${index + 1}`,
        description: `${courseName} Video ${index + 1}`,
        url,
      }));

      setVideos(videoData);
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  useEffect(() => {
    const getLessons = (courseName) => {
      switch (courseName) {
        case "Python Course":
          return [
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
          ];
        case "Java":
          return [
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
          ];
        case "JavaScript":
          return [
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
          ];
        case "React Js":
          return [
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
          ];
        case "Node js":
          return [
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
          ];
        case "Android Development":
          return [
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
          ];
        default:
          return [];
      }
    };

    setLessons(getLessons(courseName));
  }, [courseName]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        {course && (
          <>
            <header className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">{course.courseName}</h1>
              <h2 className="text-2xl text-gray-600">Welcome to {course.courseDescription}!</h2>
            </header>

            <section className="mb-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Lessons</h3>
              <motion.ul 
                className="bg-white shadow-md rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {lessons.map((lesson, index) => (
                  <motion.li 
                    key={index}
                    className="border-b last:border-b-0 border-gray-200 px-4 py-3 hover:bg-gray-50 cursor-pointer transition duration-150 ease-in-out"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {lesson}
                  </motion.li>
                ))}
              </motion.ul>
            </section>

            {(userRole === "teacher" || userRole === "Admin") && (
              <div className="text-center mb-8">
                <input
                  type="file"
                  id="video-upload"
                  onChange={handleVideoUpload}
                  className="hidden"
                />
                <motion.label
                  htmlFor="video-upload"
                  className="inline-block px-6 py-3 bg-black text-white rounded-lg cursor-pointer hover:bg-gray-800 transition duration-150 ease-in-out"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Upload Video
                </motion.label>
              </div>
            )}

            <section>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Videos</h3>
              {!videosLoaded ? (
                <p className="text-center text-gray-600">Please wait, your videos will be available soon</p>
              ) : videos.length === 0 ? (
                <div className="text-center">
                  <p className="text-xl text-gray-600 mb-2">No videos available</p>
                  <p className="text-lg text-gray-500">Please wait, your videos will be available soon 🙂</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.map((video, index) => (
                    <motion.div
                      key={index}
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="p-4">
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">{video.title}</h4>
                        <p className="text-gray-600 mb-4">{video.description}</p>
                        <video
                          src={video.url}
                          controls
                          className="w-full rounded-lg"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CourseProgress;
