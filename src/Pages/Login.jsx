import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import { useFirebase } from '../Context/FirebaseContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
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
    } catch (error) {
      console.error("Error Occurred", error);
      toast.error("Error occurred. Please try again!");
    }
    setIsLoading(false); 
  };

  return (
    <div>
      {isLoading && <Loader />} 
      <Container className="d-flex mt-5 justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Card style={{ width: '100%', maxWidth: '500px' , borderRadius: "20px" }}>
          <Card.Body>
            <h2 className="text-center text-primary mb-4">Login</h2>
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
              <p className="text-center mt-2 fs-4 fw-bold">OR</p>
              <Row className="justify-content-center">
                <Col xs={12} md={6} className="text-center">
                  <Button variant="primary" type="submit" className="w-100 ">
                    Login with Google
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <Footer/>
    </div>
  );
};

export default Login;
