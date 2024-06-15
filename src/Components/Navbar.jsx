import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link, useNavigate } from 'react-router-dom';
import { useFirebase } from '../Context/FirebaseContext';

function MyNavbar() {
  const firebase = useFirebase();
  const { matchUser, user } = useFirebase();
  const navigate = useNavigate();
  const [userRoles, setUserRoles] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const result = await matchUser(user);
        setCurrentUser(result);
      } catch (error) {
        console.error("Failed to fetch Current User", error);
      }
    };
    fetchCurrentUser();
  }, [user, matchUser]);

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
  }, [firebase]);

  const logoutUser = () => {
    firebase.SignOutUser();
    navigate("/login");
  };

  if (firebase.loading || userRoles.length === 0 || !currentUser) {
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
          <Nav className="ms-auto mb-2 mb-lg-0 justify-content-center" navbarScroll>
            <Nav.Link className='navbrand' href="/">Home</Nav.Link>
            {firebase.isLoggedIn && (
              <>
                <Nav.Link className='navbrand' href={`/dashboard/${courseId}/${courseName}`}>Dashboard</Nav.Link>
                {(userRoles.includes("teacher") || userRoles.includes("Admin") || userRoles.includes("student")) && (
                  <Nav.Link className='navbrand' href="/addcourse">Add Courses</Nav.Link>
                )}
              </>
            )}
          </Nav>
          <Nav className="ms-auto">
            {firebase.isLoggedIn ? (
              <Dropdown
                show={showDropdown}
                onToggle={setShowDropdown}
                align="end"
              >
                <Dropdown.Toggle
                  id="dropdown-profile"
                  variant="transparent"
                  className="profile-dropdown-button text-warning d-flex align-items-center"
                >
                  <img
                    src={currentUser.dp}
                    alt="Profile"
                    width="45"
                    height="45"
                    className="d-inline-block rounded-circle profile-image"
                  />
                  <span className="text-warning fs-5 ms-2">{currentUser.displayName}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile">View Profile</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/settings">Settings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>
                    <Button variant="outline-danger" onClick={logoutUser} className="w-100">Logout</Button>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="primary" className="me-2">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline-light">Register</Button>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
