import React, { useEffect, useState } from 'react';
import { useFirebase } from '../../Context/FirebaseContext';
import { Card, Container, Row, Col } from 'react-bootstrap';

const ViewCourses = () => {
  const firebase = useFirebase();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesSnapshot = await firebase.getCoursesFromFirestore();
        const coursesList = coursesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCourses(coursesList);
      } catch (error) {
        console.error("Error fetching courses: ", error);
      }
    };

    fetchCourses();
  }, [firebase]);

  return (
    <Container>
      <Row>
        {courses.map(course => (
          <Col key={course.id} md={4} className="mb-4">
            <Card>
              {course.courseImage && <Card.Img variant="top" src={course.courseImage} alt={course.courseName} />}
              <Card.Body>
                <Card.Title>{course.courseName}</Card.Title>
                <Card.Text>{course.courseDescription }</Card.Text>
                <Card.Text>Duration: {course.courseDuration + "hrs"}</Card.Text>
                <Card.Text>Instructor: {course.courseInstructor}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ViewCourses;
