import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useFirebase } from '../Context/FirebaseContext';
import { toast } from 'react-toastify';
import "./Register.css";
import { useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader';

const Register = () => {
    const navigate = useNavigate();
    const firebase = useFirebase();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [isLoading, setIsLoading] = useState(false); // State to track loading state

    const handleRegisterForm = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Start loader when register button is clicked
        try {
            await firebase.RegisterUser(email, password);
            toast.success("Account creation successful");
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPass("");
            navigate("/login");
        } catch (error) {
            console.error("Failed in account creation", error);
            toast.error("Failed to create account");
        }
        setIsLoading(false); // Stop loader after register attempt is complete
    };

    return (
        <div>
            {isLoading && <Loader />} {/* Render loader when isLoading is true */}
            <Container className="d-flex mt-5 justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <Card className='card' style={{ width: '100%', maxWidth: '500px', borderRadius: "20px" }}>
                    <Card.Body>
                        <h2 className="text-center text-primary mb-4">Register</h2>
                        <Form>
                            <Form.Group controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Enter your Name" required />
                            </Form.Group>
                            <Form.Group controlId="formEmail" className="mt-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter your email" required />
                            </Form.Group>
                            <Form.Group controlId="formPassword" className="mt-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" value={password} placeholder="Enter your password" required />
                            </Form.Group>
                            <Form.Group controlId="formConfirmPassword" className="mt-3">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control onChange={(e) => setConfirmPass(e.target.value)} type="password" value={confirmPass} placeholder="Confirm your password" required />
                            </Form.Group>
                            <Button onClick={handleRegisterForm} variant="primary" type="submit" className="w-100 mt-4 btn-color">
                                Register
                            </Button>
                            <p className='text-center mt-2 fs-4 fw-bold'>OR</p>
                            <Button variant="primary" type="submit" className="w-100 btn-color ">
                                Register with Google
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default Register;
