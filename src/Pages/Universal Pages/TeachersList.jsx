import React, { useEffect, useState } from 'react';
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
            } catch (error) {
                console.error("Failed to fetch users", error);
            }
        };
        fetchAllTeachers();
    }, [firebase]);

    return (
        <div className="bg-gray-100 min-h-screen pt-24">
            <Container>
                <h2 className="text-3xl font-bold text-center mb-8">Meet Our Teachers</h2>
                <Row className="g-4">
                    {teachers.map((teacher, index) => (
                        <Col key={index} md={4} sm={6}>
                            <Card className="teacher-card shadow-lg hover:shadow-xl transition-all">
                                <Card.Img
                                    variant="top"
                                    src={teacher.dp || '/default-teacher.jpg'}
                                    alt={teacher.displayName}
                                    className="rounded-top object-cover"
                                    style={{ height: '250px', objectFit: 'cover' }}
                                />
                                <Card.Body className="bg-white p-4 text-center">
                                    <Card.Title className="text-lg font-semibold text-gray-900">
                                        {teacher.displayName}
                                    </Card.Title>
                                    <Card.Text className="text-sm text-gray-700">
                                        {teacher.email}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default TeachersList;
