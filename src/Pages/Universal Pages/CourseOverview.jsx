import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useParams } from 'react-router-dom';
import { useFirebase } from '../../Context/FirebaseContext';

const CourseOverview = () => {
    const { getCoursesById } = useFirebase();
    const { courseId, courseName } = useParams();
    const [course, setCourse] = useState(null);
    const [instructor, setInstructor] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const courseData = await getCoursesById(courseId);
                console.log("Here is result baby", courseData);
                setCourse(courseData);
            } catch (error) {
                console.error("Error occurred:", error);
            }
        };

        fetchData();
    }, [courseId, getCoursesById]);

    return (
        <Container className="my-5">
            <Row>
                <Col md={6} className="mb-4">
                    <Card className="h-100 shadow">
                        <Card.Img variant="top" src="course_image.jpg" />
                        <Card.Body>
                            <Card.Title>Course Name: {courseName}</Card.Title>
                            <Card.Title>Course ID: {courseId}</Card.Title>
                            <Card.Title>Course Instructor: {course && course.courseInstructor}</Card.Title>
                            <Card.Title>Course Description:</Card.Title>
                            <Card.Text className='fs-4'>
                                {course && course.courseDescription}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <span className="fw-bold">Instructor:</span> {course && course.instructor}
                                </div>
                                <Link to={`/studentdetails/${courseId}/${courseName}`}>
                                    <Button variant="primary">Buy Now</Button>
                                </Link>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CourseOverview;
