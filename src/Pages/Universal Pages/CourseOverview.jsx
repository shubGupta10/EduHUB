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
                    </Card>
                </Col>
                <Col md={6} className="mb-4">
                    <Card className="h-100 shadow">
                        <Card.Body>
                            <Card.Title className="text-center mb-4">Buy Now</Card.Title>
                            <div className="d-flex flex-column align-items-center">
                                <Button className="mb-3" variant="primary">Add to Cart</Button>
                                <Button variant="success">Buy Now</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CourseOverview;