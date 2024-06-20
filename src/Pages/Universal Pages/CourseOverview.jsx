import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useFirebase } from '../../Context/FirebaseContext';
import Footer from '../../Components/Footer';
import Loader from '../../Components/Loader';

const CourseOverview = () => {
    const { getCoursesById } = useFirebase();
    const { courseId, courseName } = useParams();
    const [course, setCourse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const courseData = await getCoursesById(courseId);
                setCourse(courseData);
                setIsLoading(false);
            } catch (error) {
                console.error("Error occurred:", error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [courseId, getCoursesById]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <Container className="my-5">
                <Row className="justify-content-center">
                    <Col lg={8}>
                        <Card className="border-0 shadow-lg rounded-lg">
                            <Row className="g-0">
                                <Col md={5} className="d-flex align-items-center">
                                    <Card.Img src={course && course.courseImage} alt={courseName} className="img-fluid rounded-start" />
                                </Col>
                                <Col md={7}>
                                    <Card.Body className="py-4">
                                        <Card.Title className="mb-4 text-primary fs-2">{courseName}</Card.Title>
                                        <Card.Text className="text-muted mb-3 fs-5">{course && course.courseCategory}</Card.Text>
                                        <Card.Text className="mb-4">{course && course.courseDescription}</Card.Text>
                                        <Row className="mb-3">
                                            <Col xs={6}>
                                                <Card.Text><strong>Instructor:</strong> {course && course.courseInstructor}</Card.Text>
                                            </Col>
                                            <Col xs={6}>
                                                <Card.Text><strong>Duration:</strong> {course && course.courseDuration} hours</Card.Text>
                                            </Col>
                                        </Row>
                                        <div className="text-center">
                                            <Link to={`/studentdetails/${courseId}/${courseName}`}>
                                                <Button variant="primary" size="lg" className="mx-2 px-5 py-3">Add to Cart</Button>
                                            </Link>
                                            <Button variant="success" size="lg" className="mx-2 px-5 py-3">Buy Now</Button>
                                        </div>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default CourseOverview;
