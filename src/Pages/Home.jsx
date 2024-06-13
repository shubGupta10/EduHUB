import React from "react";
import {
  Container,
  Nav,
  Button,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import {
  FaChalkboardTeacher,
  FaCertificate,
  FaBook,
  FaClipboardList,
  FaQuestionCircle,
  FaTasks
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleGoing = () => {
    navigate("/dashboard/courseoverview");
  };

  return (
    <>
      {/* Hero Section */}
      <div
        className="text-center py-2 position-relative"
        style={{
          backgroundImage:
            "url(https://i.pinimg.com/736x/b1/be/fa/b1befaa027145d7665cc915f10f91091.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="position-absolute w-100 h-100"
          style={{
            backdropFilter: "blur(5px)",
          }}
        />
        <Container className="position-relative text-dark">
          <h1 className="display-1">Welcome to EduHUB</h1>
          <p className="lead fs-3">Your journey to knowledge begins here.</p>
          <Button variant="primary" onClick={handleGoing} size="lg">
            Get Started
          </Button>
        </Container>
      </div>

      {/* Features Section */}
      <Container className="py-5" id="features">
        <Row className="text-center mb-4">
          <Col>
            <h2 className="text-primary">Features</h2>
            <p>Explore the key features of our platform</p>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>
                  <FaBook className="me-2" />
                  Interactive Courses
                </Card.Title>
                <Card.Text>
                  Engage with our interactive and hands-on courses designed by
                  experts.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>
                  <FaChalkboardTeacher className="me-2" />
                  Expert Tutors
                </Card.Title>
                <Card.Text>
                  Learn from industry-leading professionals who are passionate
                  about teaching.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>
                  <FaCertificate className="me-2" />
                  Certifications
                </Card.Title>
                <Card.Text>
                  Earn certificates to showcase your achievements and advance
                  your career.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>
                  <FaClipboardList className="me-2" />
                  Assignments
                </Card.Title>
                <Card.Text>
                  Complete assignments to test your knowledge and track your
                  progress.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>
                  <FaTasks className="me-2" />
                  Quizzes
                </Card.Title>
                <Card.Text>
                  Participate in quizzes to reinforce your learning and compete
                  with peers.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>
                  <FaQuestionCircle className="me-2" />
                  Discussion Forum
                </Card.Title>
                <Card.Text>
                  Engage with peers and experts in our community forums to
                  enhance your learning experience.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Courses Section */}
      <Container className="py-5" id="courses">
        <Row className="text-center mb-4">
          <Col>
            <h2 className="text-primary">Popular Courses</h2>
            <p>Browse our most popular courses</p>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Card className="mb-4 shadow-sm">
              <Card.Img
                variant="top"
                src="https://contentstatic.techgig.com/photo/88712201.cms"
              />
              <Card.Body>
                <Card.Title>Python for Beginners</Card.Title>
                <Card.Text>
                  Learn Python from scratch with our beginner-friendly course.
                </Card.Text>
                <Button variant="primary">Enroll Now</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4 shadow-sm">
              <Card.Img
                variant="top"
                src="https://i.ytimg.com/vi/jS4aFq5-91M/maxresdefault.jpg"
              />
              <Card.Body>
                <Card.Title>JavaScript Essentials</Card.Title>
                <Card.Text>
                  Master the fundamentals of JavaScript with this comprehensive
                  course.
                </Card.Text>
                <Button variant="primary">Enroll Now</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4 shadow-sm">
              <Card.Img
                variant="top"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiEjBilP-PBEbL7NAsVh5jU2PEYPgaGhh8-g&s"
              />
              <Card.Body>
                <Card.Title>Web Development Bootcamp</Card.Title>
                <Card.Text>
                  Become a full-stack web developer with our intensive bootcamp.
                </Card.Text>
                <Button variant="primary">Enroll Now</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Card className="mb-4 shadow-sm">
              <Card.Img
                variant="top"
                src="https://5.imimg.com/data5/SELLER/Default/2021/6/EY/CO/VZ/23999962/core-java-programming-500x500.jpg"
              />
              <Card.Body>
                <Card.Title>Java Ultimate Course</Card.Title>
                <Card.Text>
                  Learn Java from scratch with our ultimate course.
                </Card.Text>
                <Button variant="primary">Enroll Now</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4 shadow-sm">
              <Card.Img
                variant="top"
                src="https://successive.tech/wp-content/uploads/2020/01/app-development-with-reactJS.jpeg"
              />
              <Card.Body>
                <Card.Title>React Js</Card.Title>
                <Card.Text>
                  Master the React Js with this complete course.
                </Card.Text>
                <Button variant="primary">Enroll Now</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4 shadow-sm">
              <Card.Img
                variant="top"
                src="https://media.geeksforgeeks.org/wp-content/uploads/20230331172641/NodeJS-copy.webp"
              />
              <Card.Body>
                <Card.Title>Nodejs</Card.Title>
                <Card.Text>
                  Become a Node Js developer with our comprehensive course.
                </Card.Text>
                <Button variant="primary">Enroll Now</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
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
    </>
  );
};

export default Home;
