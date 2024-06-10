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

const CourseProgress = () => {
  const { courseId: paramCourseId, courseName: paramCourseName } = useParams();
  const courseId = paramCourseId || localStorage.getItem("courseId");
  const courseName = paramCourseName || localStorage.getItem("courseName");
  const { getCoursesById, matchUser, user } = useFirebase();
  const [course, setCourse] = useState(null);
  const [videos, setVideos] = useState([]);
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
        default:
          return [];
      }
    };

    setLessons(getLessons(courseName));
  }, [courseName]);

  return (
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
            <h3 style={{ color: "#343a40" }}>Course Progress</h3>
            <ProgressBar now={course.progress} label={`${course.progress}%`} />
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
                onClick={() => document.getElementById("video-upload").click()}
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

          <section>
            <h3 style={{ color: "#343a40" }}>Videos</h3>
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
                      />
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </section>
        </>
      )}
    </Container>
  );
};

export default CourseProgress;