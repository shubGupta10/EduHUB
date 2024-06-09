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
} from "react-bootstrap";
import { useFirebase } from "../Context/FirebaseContext";
import Loader from "../Components/Loader";

const CourseDetail = () => {
  const navigate = useNavigate();
  const { getCoursesById } = useFirebase();
  const { courseId: paramCourseId, courseName: paramCourseName } = useParams();
  const courseId = paramCourseId || localStorage.getItem('courseId');
  const courseName = paramCourseName || localStorage.getItem('courseName');
  const [course, setCourse] = useState(null);
  const [error, setError] = useState("");

  // JSON data
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
      "Python: GUI Development with Tkinter or PyQt"
    ],
    "java": [
      "Java: Programming Fundamentals & Environment Setup",
      "Java: Control Flow & Functions",
      "Java: Object-Oriented Programming (OOP)",
      "Java: Data Structures & File I/O",
      "Java: Exception Handling & Collections",
      "Java: Introduction to Threads & Concurrency",
      "Java: Networking & Sockets",
      "Java: Database Connectivity (JDBC)",
      "Java: Testing Frameworks (JUnit)",
      "Java: Advanced Features (JavaFX, Swing)"
    ],
    "js": [
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
      "Introduction to React or other JavaScript frameworks"
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
        console.log(courseData);
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
    <Container className="text-center py-2" style={{ height: "40vh" }}>
      <Card className="mb-4" style={{ width: "60%", margin: "0 auto", boxShadow: "4px 4px 4px blue" }}>
        <Card.Body>
          <Card.Title as="h1">Welcome to {course.courseName} Course</Card.Title>
          <Image src={course.courseImage} alt="Course" fluid className="my-4" style={{ height: "40vh" }} />
          <Card.Text style={{ fontSize: "18px", lineHeight: "1.6" }}>
            {course.courseDescription}
          </Card.Text>
          <Button variant="primary" size="lg" onClick={handleStartContinue}>
            Start / Continue Course
          </Button>
        </Card.Body>
      </Card>
      <Row className="text-start mt-5">
        <Col>
          <h2>Know more about the Course</h2>
          <h3>Course Details</h3>
          <p>
            <strong>Duration:</strong> {course.courseDuration}
          </p>
          <p>
            <strong>Level: </strong><span>Intermediate</span>
          </p>
          <p>
            <strong>Content:</strong>
          </p>
          <ul>
            {courseName && lessonsData[courseName] && lessonsData[courseName].map((lesson, index) => (
              <li key={index}>{lesson}</li>
            ))}
          </ul>
          <h3>Instructor</h3>
          <p>
            <strong>Name:</strong> {course.courseInstructor}
          </p>
          <p>
            <strong>About the Instructor:</strong> {course.courseInstructor}  is a seasoned software engineer with over 10 years of experience in {course.courseName} course. He has a passion for teaching and has helped hundreds of students master {course.courseName} programming. {course.courseInstructor} teaching style is engaging and practical, focusing on real-world examples and hands-on projects.
          </p>
          <p>{course.courseDescription}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default CourseDetail;
