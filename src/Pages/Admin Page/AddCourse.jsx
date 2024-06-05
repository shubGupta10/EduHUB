import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useFirebase } from '../../Context/FirebaseContext';

const AddCourse = () => {
    const firebase = useFirebase();
    const [courseName, setCourseName] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [courseDuration, setCourseDuration] = useState("");
    const [courseInstructor, setCourseInstructor] = useState("");
    // const [courseImage, setCourseImage] = useState();

    const handleAddCourse = async (e) => {
        e.preventDefault();
        try {
            const courseData = {
                courseName,
                courseDescription,
                courseDuration,
                courseInstructor,
                // courseImage
            };
            await firebase.addCourseToFirestore(courseData);
            toast.success("Course added successfully!");
            setCourseName("");
            setCourseDescription("");
            setCourseDuration("");
            setCourseInstructor("");
            // setCourseImage(null);
        } catch (error) {
            toast.error("Failed to add course")
        }
        
    };

    return (
        <Container className="d-flex mt-4 justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <Card className='card' style={{ width: '100%', maxWidth: '500px', borderRadius: "20px" }}>
                <Card.Body>
                    <h2 className="text-center text-primary mb-4">Add Course</h2>
                    <Form onSubmit={handleAddCourse}>
                        <Form.Group controlId="formCourseName">
                            <Form.Label>Course Name</Form.Label>
                            <Form.Control
                                onChange={(e) => setCourseName(e.target.value)}
                                value={courseName}
                                type="text"
                                placeholder="Enter course name"
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formCourseDescription" className="mt-3">
                            <Form.Label>Course Description</Form.Label>
                            <Form.Control
                                onChange={(e) => setCourseDescription(e.target.value)}
                                value={courseDescription}
                                as="textarea"
                                rows={3}
                                placeholder="Enter course description"
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formCourseDuration" className="mt-3">
                            <Form.Label>Course Duration</Form.Label>
                            <Form.Control
                                onChange={(e) => setCourseDuration(e.target.value)}
                                value={courseDuration}
                                type="number"
                                placeholder="Enter course duration"
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formCourseInstructor" className="mt-3">
                            <Form.Label>Course Instructor</Form.Label>
                            <Form.Control
                                onChange={(e) => setCourseInstructor(e.target.value)}
                                value={courseInstructor}
                                type="text"
                                placeholder="Enter course instructor"
                                required
                            />
                        </Form.Group>
                        {/* <Form.Group controlId="formCourseInstructor" className="mt-3">
                            <Form.Label>Upload Course Image</Form.Label>
                            <Form.Control
                                onChange={(e) => setCourseImage(e.target.file[0])}
                                value={courseImage}
                                type="file"
                                placeholder="Upload your Image"
                            />
                        </Form.Group> */}
                        <Button variant="primary" type="submit" className="w-100 mt-4 btn-color">
                            Add Course
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AddCourse;
