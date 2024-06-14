import React, { useEffect, useState } from 'react';
import { useFirebase } from '../Context/FirebaseContext';
import { Col, Container, Image, Row, Card, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Profile = () => {
    const { user, matchUser } = useFirebase();
    const [CurrentLoggedInUser, setCurrentLoggedInUser] = useState([]);

    useEffect(() => {
        const fetchLoggedInUser = async () => {
            try {
                const currentUser = await matchUser(user);
                setCurrentLoggedInUser(currentUser);
                console.log(currentUser);
            } catch (error) {
                console.error("Failed to get User", error);
                throw Error;
            }
        };
        fetchLoggedInUser();
    }, [user, matchUser]);

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <Card className="text-center shadow border-0">
                        <Card.Header className="bg-dark text-white">
                            <Card.Title className="mb-0">Profile</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Image 
                                src={CurrentLoggedInUser.dp} 
                                roundedCircle 
                                fluid 
                                className="mb-4 border border-3 border-secondary"
                                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                            />
                            <Card.Text className="mb-2">
                                <h4 className="mb-1">
                                    <strong>{CurrentLoggedInUser.displayName}</strong>
                                </h4>
                                <Badge bg="secondary">{CurrentLoggedInUser.role}</Badge>
                            </Card.Text>
                            <Card.Text>
                                <i className="bi bi-envelope-fill me-2"></i>
                                {CurrentLoggedInUser.email}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="bg-light text-muted">
                            <small>Last updated 3 mins ago</small>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
