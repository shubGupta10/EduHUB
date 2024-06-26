import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import { useFirebase } from '../Context/FirebaseContext';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import Loader from '../Components/Loader';
import Footer from '../Components/Footer';

const Login = () => {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

  const courseId = localStorage.getItem('courseId');
  const courseName = localStorage.getItem('courseName');

  const handleLoginForm = async (e) => {
    e.preventDefault();
    setIsLoading(true); 
    try {
      await firebase.LoginUser(email, password);
      toast.success("Login Successful!");
      navigate(`/dashboard/${courseId}/${courseName}`);
      setTimeout(() => {
        window.location.reload();
      }, 50);
    } catch (error) {
      console.error("Error Occurred", error);
      toast.error("Error occurred. Please try again!");
    }
    setIsLoading(false); 
  };

  return (
    <div>
      {isLoading && <Loader />} 
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Card style={{ width: '100%', maxWidth: '600px', height: 'auto', borderRadius: '20px', padding: '20px' }}>
          <Card.Body>
            <h2 className="text-center text-primary mb-4">Login</h2>
            <p className="text-center mb-4">Welcome back! Please log in to continue.</p>
            <Form onSubmit={handleLoginForm}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </Form.Group>
              <Row className="justify-content-center">
                <Col xs={12} md={6} className="text-center">
                  <Button variant="primary" type="submit" className="w-100 mt-4">
                    Login
                  </Button>
                </Col>
              </Row>
              <p className="text-center mt-3 mb-0">OR</p>
              <p className="text-center mt-2">
                <Link to="/register" style={{ textDecoration: 'none', fontWeight: 'bold', color: '#007bff' }}>
                  Create a new account
                </Link>
              </p>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </div>
  );
};

export default Login;
