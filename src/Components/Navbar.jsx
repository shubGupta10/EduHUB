// MyNavbar.js
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useFirebase } from '../Context/FirebaseContext';


function MyNavbar() {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const users = await firebase.getAllUsers();
        setUserRoles(users.map(user => user.role)); 
      } catch (error) {
        console.error("Failed to get all users", error);
      }
    };
    fetchAllUsers();
  }, []);

  const logoutUser = () => {
    firebase.SignOutUser();
    navigate("/login");
  };

  if (firebase.loading || userRoles.length === 0) {
    return null; 
  }

  const courseId = localStorage.getItem('courseId');
  const courseName = localStorage.getItem('courseName');

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container fluid>
        <Navbar.Brand className='navbrand' href="/">EduHub</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link className='navbrand' href="/">Home</Nav.Link>
            {firebase.isLoggedIn && (
              <>
                <Nav.Link className='navbrand' href={`/dashboard/${courseId}/${courseName}`}>Dashboard</Nav.Link>
                <Nav.Link className='navbrand' href={"/listallteachers"}>Our Teachers</Nav.Link>
                {userRoles.includes("teacher") || userRoles.includes("Admin") || !userRoles === "student" ? (
                  <Nav.Link className='navbrand' href="/addcourse">Add Courses</Nav.Link>
                ) : null}
              </>
            )}
          </Nav>
          {firebase.isLoggedIn ? (
            <Button variant="outline-red" onClick={logoutUser} className="register-button me-2 ms-2">Logout</Button>
          ) : (
            <>
              <Link to="/login">
                <Button variant="" className="register-button me-2">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="outline-light" className="register-button">Register</Button>
              </Link>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
