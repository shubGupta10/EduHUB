import React, { useEffect, useState } from 'react';
import { useFirebase } from '../../Context/FirebaseContext';
import { Card, Container, Row, Col } from 'react-bootstrap';
import './ViewCourses.css'; 
import Loader from '../../Components/Loader';
import { Link } from 'react-router-dom';
import Footer from '../../Components/Footer';

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
            <Container className='min-vh-100'>
            <Row>
              {courses.map(course => (
                <Col key={course.id} md={4} className="mb-4 mt-5 ">
                  <Card>
                    {course.courseImage && <Card.Img variant="top" src={course.courseImage} alt={course.courseName} className="course-image" />}
                    <Card.Body>
                      <Card.Title>{course.courseName}</Card.Title>
                      <Card.Text>{course.courseDescription}</Card.Text>
                      <Card.Text>Duration: {course.courseDuration + " hrs"}</Card.Text>
                      <Card.Text>Instructor: {course.courseInstructor}</Card.Text>
                      <div className="d-flex justify-content-center">
                        <Link to={`/courseoverview/${course.id}/${course.courseName}`}>
                        <button className="enroll-button">Enroll</button>
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
