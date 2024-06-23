import React, { useEffect, useState } from "react";
import { storage, useFirebase } from "../../Context/FirebaseContext";
import { useParams } from "react-router-dom";
import {
  ProgressBar,
  ListGroup,
  Card,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import Footer from "../../Components/Footer";

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
        case "Node Js":
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
    <>
      <Container style={{ fontFamily: "Arial, sans-serif", marginTop: "20px" }}>
        {course && (
          <>
            <header style={{ textAlign: "center", marginBottom: "40px" }}>
              <h1 style={{ color: "#343a40" }}>{course.courseName}</h1>
              <h2 style={{ color: "#6c757d" }}>
                Welcome to {course.courseDescription}!
              </h2>
            </header>

            <section style={{ marginBottom: "40px" }}>
              <h3 style={{ color: "#343a40", marginTop: "20px" }}>Lessons</h3>
              <ListGroup variant="flush">
                {lessons.map((lesson, index) => (
                  <ListGroup.Item
                    key={index}
                    style={{ cursor: "pointer", backgroundColor: "#f8f9fa" }}
                    variant="primary"
                  >
                    {lesson}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </section>

            {(userRole === "teacher" || userRole === "Admin") && (
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <Button
                  variant="primary"
                  onClick={() =>
                    document.getElementById("video-upload").click()
                  }
                  style={{ marginBottom: "10px" }}
                >
                  Upload Video
                </Button>
                <input
                  type="file"
                  id="video-upload"
                  onChange={handleVideoUpload}
                  style={{ display: "none" }}
                />
              </div>
            )}

            <section className="mt-5">
              <h3 style={{ color: "#343a40" }}>Videos</h3>
              {!videosLoaded ? (
                <p>Please wait, your videos will be available soon</p>
              ) : videos.length === 0 ? (
                <>
                  <p className="text-center mt-5 fs-5">No videos available</p>
                  <p className="text-center fs-5">
                    Please wait, your videos will be available soon 🙂
                  </p>
                </>
              ) : (
                <Row>
                  {videos.map((video, index) => (
                    <Col key={index} md={4} style={{ marginBottom: "20px" }}>
                      <Card
                        style={{
                          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
                          borderRadius: "10px",
                        }}
                      >
                        <Card.Body>
                          <Card.Title>{video.title}</Card.Title>
                          <Card.Text>{video.description}</Card.Text>
                          <video
                            src={video.url}
                            controls
                            style={{ width: "100%", borderRadius: "10px" }}
                            className="mb-5"
                          />
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </section>
          </>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default CourseProgress;
