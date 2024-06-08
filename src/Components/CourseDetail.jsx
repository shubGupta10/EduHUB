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
        {error}
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
            Master the art of JavaScript programming with our comprehensive course! Dive deep into the language that powers the web and unlock your full potential as a developer. Whether you're a beginner or an experienced coder, our JavaScript course will take your skills to the next level.
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
            <li>Introduction to JavaScript</li>
            <li>Data Types and Variables</li>
            <li>Operators and Expressions</li>
            <li>Control Structures (if statements, loops)</li>
            <li>Functions and Scope</li>
            <li>Arrays and Objects</li>
            <li>DOM Manipulation</li>
            <li>Events and Event Handling</li>
            <li>AJAX and Fetch API</li>
            <li>Error Handling</li>
            <li>ES6+ Features (Arrow Functions, Promises, Async/Await)</li>
            <li>Modules and Module Bundlers (Webpack, Parcel)</li>
            <li>Testing with Jest or Mocha</li>
            <li>Introduction to React or other JavaScript frameworks</li>
          </ul>
          <h3>Instructor</h3>
          <p>
            <strong>Name:</strong> {course.courseInstructor}
          </p>
          <p>
            <strong>About the Instructor:</strong> {course.courseInstructor}  is a seasoned software engineer with over 10 years of experience in JavaScript development. He has a passion for teaching and has helped hundreds of students master JavaScript programming. John's teaching style is engaging and practical, focusing on real-world examples and hands-on projects.
          </p>
          <p>{course.courseDescription}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default CourseDetail;
