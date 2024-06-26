import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Card,
  Alert,
  ListGroup,
} from "react-bootstrap";
import { useFirebase } from "../Context/FirebaseContext";
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
      <Alert variant="danger" className="text-center">
        <h1>Can't find any Course...</h1>
        <h1>Please enroll into one.</h1>
      </Alert>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-5">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          paddingBottom: "100px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Container className="text-center py-5">
          <Card
            className="mb-4 shadow-lg"
            style={{ maxWidth: "800px", margin: "0 auto" }}
          >
            <Card.Body>
              <Card.Title as="h1" className="mb-4 text-primary">
                {course.courseName} Course
              </Card.Title>
              <Image
                src={course.courseImage}
                alt="Course"
                fluid
                className="mb-4"
                style={{
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <Card.Text
                style={{
                  fontSize: "18px",
                  lineHeight: "1.6",
                  marginBottom: "30px",
                  color: "#555",
                }}
              >
                {course.courseDescription}
              </Card.Text>
              <Button variant="primary" size="lg" onClick={handleStartContinue}>
                Start / Continue Course
              </Button>
            </Card.Body>
          </Card>
          <Row className="mt-5 text-start">
            <Col md={8} className="mx-auto">
              <h2 className="text-secondary mb-4">Course Details</h2>
              <Card className="p-3 mb-4">
                <Card.Body>
                  <p>
                    <strong>Duration:</strong> {course.courseDuration}
                  </p>
                  <p>
                    <strong>Level:</strong> Intermediate
                  </p>
                </Card.Body>
              </Card>
              <h3 className="text-secondary mb-4">Course Content</h3>
              <ListGroup variant="flush" className="mb-4">
                {courseName &&
                  lessonsData[courseName] &&
                  lessonsData[courseName].map((lesson, index) => (
                    <ListGroup.Item
                      key={index}
                      style={{
                        backgroundColor: "#e7f3ff",
                        margin: "5px 0",
                        borderRadius: "5px",
                      }}
                    >
                      {lesson}
                    </ListGroup.Item>
                  ))}
              </ListGroup>
              <h3 className="mt-4 text-secondary mb-4">Instructor</h3>
              <Card className="p-3 mb-4">
                <Card.Body>
                  <p>
                    <strong>Name:</strong> {course.courseInstructor}
                  </p>
                  <p>
                    <strong>About the Instructor:</strong>{" "}
                    {course.courseInstructor} is a seasoned software engineer
                    with over 10 years of experience in {course.courseName}. He
                    has a passion for teaching and has helped hundreds of
                    students master {course.courseName}. His teaching style is
                    engaging and practical, focusing on real-world examples and
                    hands-on projects.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default CourseDetail;
