import React, { useEffect, useState } from 'react';
import { useFirebase } from '../Context/FirebaseContext';
import { Col, Container, Image, Row, Card, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Profile = () => {
    const { user, matchUser } = useFirebase();
    const [CurrentLoggedInUser, setCurrentLoggedInUser] = useState({});

    useEffect(() => {
        const fetchLoggedInUser = async () => {
            try {
                const currentUser = await matchUser(user);
                setCurrentLoggedInUser(currentUser);
            } catch (error) {
                console.error("Failed to get User", error);
            }
        };
        fetchLoggedInUser();
    }, [user, matchUser]);

    return (
        <Container className="mt-5 pt-24 ">
            <Row className="justify-content-center ">
                <Col xs={12} md={8} lg={6} >
                    <Card className="text-center  shadow-lg border-0 rounded-lg overflow-hidden">
                        <Card.Header className="bg-dark text-white py-4">
                            <Card.Title className="mb-0">Profile</Card.Title>
                        </Card.Header>
                        <Card.Body className="py-5">
                            {/* Centering the profile image */}
                            <div className="d-flex justify-content-center">
                                <Image
                                    src={CurrentLoggedInUser.dp || '/default-profile.jpg'}
                                    roundedCircle
                                    fluid
                                    className="mb-4 border-4 border-secondary shadow-sm"
                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                    alt="Profile"
                                />
                            </div>
                            <Card.Text className="mb-2">
                                <h4 className="mb-1 font-weight-bold text-gray-900">
                                    {CurrentLoggedInUser.displayName || 'User Name'}
                                </h4>
                                <Badge bg="secondary" className="px-3 py-1">
                                    {CurrentLoggedInUser.role || 'Role'}
                                </Badge>
                            </Card.Text>
                            <Card.Text className="mt-3 text-muted">
                                <i className="bi bi-envelope-fill me-2"></i>
                                {CurrentLoggedInUser.email || 'user@example.com'}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="bg-light text-muted py-3">
                            <small>Last updated 3 mins ago</small>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
