import React, { useEffect, useState } from 'react';
import { useFirebase } from '../../Context/FirebaseContext';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import './ViewCourses.css'; 
import Loader from '../../Components/Loader';
import { Link } from 'react-router-dom';
import Footer from '../../Components/Footer';
import "bootstrap/dist/css/bootstrap.min.css";

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

  return (
    <div>
      {isLoading ? <Loader/> : (
        <Container className='min-vh-100 my-5'>
          <header className="text-center mb-5">
            <h1 className="display-4 text-primary">Explore Our Courses</h1>
            <p className="lead text-muted">Browse through our extensive range of courses and find the perfect one for you.</p>
          </header>
          <Row className="justify-content-center">
            {courses.map(course => (
              <Col key={course.id} md={6} lg={4} className="mb-4">
                <Card className="h-100 shadow-sm border-0 rounded overflow-hidden">
                  {course.courseImage && <Card.Img variant="top" src={course.courseImage} alt={course.courseName} className="course-image" />}
                  <Card.Body>
                    <Card.Title className="text-primary">{course.courseName}</Card.Title>
                    <Card.Text className="text-muted">{course.courseDescription.substring(0, 100)}...</Card.Text>
                    <Card.Text><strong>Duration:</strong> {course.courseDuration} hrs</Card.Text>
                    <Card.Text><strong>Instructor:</strong> {course.courseInstructor}</Card.Text>
                    <div className="d-flex justify-content-center mt-4">
                      <Link to={`/courseoverview/${course.id}/${course.courseName}`}>
                        <Button className="enroll-button" variant="primary">Enroll Now</Button>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
      <Footer/>
    </div>
  );
};

export default ViewCourses;
