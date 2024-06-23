import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { storage, useFirebase } from '../Context/FirebaseContext.js';
import { toast } from 'react-toastify';
import "./Register.css";
import { useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader';
import { v4 as uuidv4 } from 'uuid';
import Footer from '../Components/Footer';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const Register = () => {
    const navigate = useNavigate();
    const firebase = useFirebase();
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [dp, setDp] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleRegisterForm = async (e) => {
        e.preventDefault();
        if (password !== confirmPass) {
            toast.error("Passwords do not match");
            return;
        }
        setIsLoading(true);
        try {
            await firebase.RegisterUser(email, password);

            let DpUrl = "";
            if (dp) {
                const dpRef = ref(storage, `UserDp/${Date.now()}_${dp.name}`);
                const snapshot = await uploadBytes(dpRef, dp);
                DpUrl = await getDownloadURL(snapshot.ref);
            }

            const userData = {
                displayName,
                email,
                role,
                userID: uuidv4(),
                dp: DpUrl,
            };
            await firebase.createUser(userData);

            toast.success("Account creation successful");
            navigate("/dashboard/viewcourse");
            setTimeout(() => {
                window.location.reload();
            }, 50);
        } catch (error) {
            console.error("Failed in account creation", error);
            toast.error("Failed to create account");
        }
        setIsLoading(false);
    };

    const handleGoogleRegister = async () => {
        // const GoogleLoggedInUser = await firebase.registerWithGoogle();
        // console.log(GoogleLoggedInUser);
        // navigate("/login")
    };

    return (
        <div>
            {isLoading && <Loader />}
            <Container className="d-flex mt-5 justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <Card className='card' style={{ width: '100%', maxWidth: '500px', borderRadius: "20px" }}>
                    <Card.Body>
                        <h2 className="text-center text-primary mb-4">Register</h2>
                        <Form onSubmit={handleRegisterForm}>
                            <Form.Group controlId="formDisplayName">
                                <Form.Label>Display Name</Form.Label>
                                <Form.Control onChange={(e) => setDisplayName(e.target.value)} value={displayName} type="text" placeholder="Enter your Display Name" required />
                            </Form.Group>
                            <Form.Group controlId="formEmail" className="mt-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Enter your email" required />
                            </Form.Group>
                            <Form.Group controlId="formRole" className="mt-3">
                                <Form.Label>Select Your Role</Form.Label>
                                <Form.Select onChange={(e) => setRole(e.target.value)} value={role} required>
                                    <option value="">Choose...</option>
                                    <option value="teacher">Teacher</option>
                                    <option value="student">Student</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group controlId="formPassword" className="mt-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" value={password} placeholder="Enter your password" required />
                            </Form.Group>
                            <Form.Group controlId="formConfirmPassword" className="mt-3">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control onChange={(e) => setConfirmPass(e.target.value)} type="password" value={confirmPass} placeholder="Confirm your password" required />
                            </Form.Group>
                            <Form.Group controlId="formUserdp" className='mt-3'>
                                <Form.Label>Upload your Image</Form.Label>
                                <Form.Control
                                    onChange={(e) => setDp(e.target.files[0])}
                                    type='file'
                                    accept='image/*'
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100 mt-4 btn-color">
                                Register
                            </Button>
                            <p className='text-center mt-2 fs-4 fw-bold'>OR</p>
                            <Button variant="primary" type="button" className="w-100 btn-color" onClick={handleGoogleRegister}>
                                Register with Google
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
            <Footer />
        </div>
    );
};

export default Register;
