import React, { useEffect, useState } from 'react'
import { useFirebase } from '../../Context/FirebaseContext';
import { Card, Col, Container, Row } from 'react-bootstrap';

const TeachersList = () => {
    const [teachers, setTeachers] = useState([]);
    const firebase = useFirebase();

    useEffect(() => {
        const fetchAllTeachers = async () => {
         try {
            const fetchingTeachers = await firebase.fetchAllUsers();
            setTeachers(fetchingTeachers);
            console.log(fetchingTeachers);
         } catch (error) {
            console.error("Failed to fetch users", error);
         }       
        };
        fetchAllTeachers();
    },[firebase])

  return (
    <div>
       <Container className="teachers-list-container">
            <h2 className="text-center my-4">Meet Our Teachers</h2>
            <Row className="g-4 mb-5">
                {teachers.map((teacher, index) => (
                    <Col key={index} md={4} sm={6}>
                        <Card className="teacher-card">
                            <Card.Img variant="top" src={teacher.dp || '/default-teacher.jpg'} />
                            <Card.Body>
                                <Card.Title>{teacher.displayName}</Card.Title>
                                <Card.Text>{teacher.email}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    </div>
  )
}

export default TeachersList