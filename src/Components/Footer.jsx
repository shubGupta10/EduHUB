import React from 'react';
import { Container, Nav } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-4" id="contact">
      <Container>
        <p>&copy; {new Date().getFullYear()} EduHUB. All rights reserved.</p>
        <p>Contact us: info@eduhub.com | +123 456 7890</p>
        <Nav className="justify-content-center">
          <Nav.Link href="/" className="text-white">
            Home
          </Nav.Link>
          <Nav.Link href="#features" className="text-white">
            Features
          </Nav.Link>
          <Nav.Link href="#courses" className="text-white">
            Courses
          </Nav.Link>
          <Nav.Link href="#contact" className="text-white">
            Contact
          </Nav.Link>
        </Nav>
      </Container>
    </footer>
  );
};

export default Footer;
