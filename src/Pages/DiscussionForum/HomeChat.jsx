import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useFirebase } from '../../Context/FirebaseContext';
import { useNavigate } from 'react-router-dom';

const HomeChat = () => {
  const { user, matchUser } = useFirebase();
  const [userInfo, setUserInfo] = useState({ displayName: '', role: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const currentUser = await matchUser(user);
        setUserInfo(currentUser);
      } catch (error) {
        console.error("Failed to get Current User", error);
      }
    };

    if (user) {
      getCurrentUser();
    }
  }, [user, matchUser]);

  const handleJoinClick = () => {
    if (userInfo.displayName.trim()) {
      console.log(`${userInfo.displayName}`);
      navigate("/chatRoom")
    } else {
      console.log("Name input is empty");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Card style={{ width: '100%', maxWidth: '600px', borderRadius: '20px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Card.Body>
          <h1 className="text-center mb-4">Join the Discussion</h1>
          <Form>
            <Form.Group controlId="formUserInfo" className="text-center">
              <Form.Label className="fs-4">Ready to participate in the discussion?</Form.Label>
              <p className="fs-5 mt-3"><strong>Name:</strong> {userInfo.displayName}</p>
              <p className="fs-5"><strong>Role:</strong> {userInfo.role}</p>
            </Form.Group>
            <Button variant="primary" className="w-100 mt-4" onClick={handleJoinClick}>
              Click to Join
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default HomeChat;
