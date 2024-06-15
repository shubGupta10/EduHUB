import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faChartLine,
  faClipboard,
  faComments,
  faUser,
  faFileAlt,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Components/Footer";
import "./Dashboard.css";
import { useFirebase } from "../Context/FirebaseContext";

const Dashboard = () => {
  const courseId = localStorage.getItem("courseId");
  const courseName = localStorage.getItem("courseName");
  const { matchUser, user } = useFirebase();
  const [currentUser, setCurrentUser] = useState(null); // Initialize as null
  const [userrole, setUserRole] = useState(""); // Initialize as empty string

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const result = await matchUser(user);
        setCurrentUser(result);
        setUserRole(result.role); // Set user role after fetching user
      } catch (error) {
        console.error("Failed to fetch Current User", error);
      }
    };
    fetchCurrentUser();
  }, [user, matchUser]);

  // Handle loading state
  if (currentUser === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="bg-primary text-white text-center py-5">
        <h1 className="display-3">Welcome to the EduHub Dashboard</h1>
      </div>
      <Container className="mt-5">
        <Row className="mb-4">
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-lg custom-card">
              <Card.Img
                variant="top"
                src="https://seeingthebrightside.com/wp-content/uploads/2020/11/output-onlinejpgtools-62-1140x760.jpg"
                className="custom-card-img"
              />
              <Card.Body>
                <Card.Title className="custom-card-title">
                  <FontAwesomeIcon icon={faChartLine} className="me-2" />
                  Course Progress
                </Card.Title>
                <Card.Text>Track your progress in enrolled courses.</Card.Text>
                <Link to={`/dashboard/coursedetail/${courseId}/${courseName}`}>
                  <Button variant="primary" className="custom-button">
                    View Courses
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-lg custom-card">
              <Card.Img
                variant="top"
                src="https://sdsinstitute.org.in/wp-content/uploads/2019/08/vgce-course.png"
                className="custom-card-img"
              />
              <Card.Body>
                <Card.Title className="custom-card-title">
                  <FontAwesomeIcon icon={faBook} className="me-2" />
                  View Courses
                </Card.Title>
                <Card.Text>View the courses we offer.</Card.Text>
                <Link to="/dashboard/viewcourse">
                  <Button variant="primary" className="custom-button">
                    View Courses
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-lg custom-card">
              <Card.Img
                variant="top"
                src="https://i0.wp.com/iserotope.com/wp-content/uploads/2014/02/8151789_orig.png"
                className="custom-card-img"
              />
              <Card.Body>
                <Card.Title className="custom-card-title">
                  <FontAwesomeIcon icon={faClipboard} className="me-2" />
                  Assignments
                </Card.Title>
                <Card.Text>View and submit assignments.</Card.Text>
                <Link to="/assignmentpage">
                  <Button variant="primary" className="custom-button">
                    View Assignments
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-lg custom-card">
              <Card.Img
                variant="top"
                src="https://americanlibrariesmagazine.org/wp-content/uploads/2016/01/digital-librarian.jpg"
                className="custom-card-img"
              />
              <Card.Body>
                <Card.Title className="custom-card-title">
                  <FontAwesomeIcon icon={faFileAlt} className="me-2" />
                  Resource Library
                </Card.Title>
                <Card.Text>
                  Access educational resources and materials.
                </Card.Text>
                <Link to="/resources">
                  <Button variant="primary" className="custom-button">
                    View Resources
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-lg custom-card">
              <Card.Img
                variant="top"
                src="https://media.istockphoto.com/id/1616906708/vector/vector-speech-bubble-with-quiz-time-words-trendy-text-balloon-with-geometric-grapic-shape.jpg?s=612x612&w=0&k=20&c=3-qsji8Y5QSuShaMi6cqONlVZ3womknA5CiJ4PCeZEI="
                alt="Quiz Competition"
                className="custom-card-img"
              />
              <Card.Body>
                <Card.Title className="custom-card-title">
                  <FontAwesomeIcon icon={faPencilAlt} className="me-2" />
                  Quiz Competition
                </Card.Title>
                <Card.Text>
                  Challenge yourself with daily quizzes related to your course.
                </Card.Text>
                <Link to="/quizrules">
                  <Button variant="primary" className="custom-button">
                    Take a Quiz
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-lg custom-card">
              <Card.Img
                variant="top"
                src="https://d56vh6ph4jjmq.cloudfront.net/fb-main/heros/8/hero-discussions@2x.png"
                className="custom-card-img"
              />
              <Card.Body>
                <Card.Title className="custom-card-title">
                  <FontAwesomeIcon icon={faComments} className="me-2" />
                  Discussion Forums
                </Card.Title>
                <Card.Text>Participate in course discussions.</Card.Text>
                <Link to="/forums">
                  <Button variant="primary" className="custom-button">
                    Visit Forums
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          {userrole === "Admin" || userrole === "teacher" ? (
            <Col md={4} className="mb-4">
              <Card className="h-100 shadow-lg custom-card">
                <Card.Img
                  variant="top"
                  src="https://img.favpng.com/15/13/21/computer-icons-user-login-desktop-wallpaper-png-favpng-50cVSt0m1jw7SRtPEv8KvVUvF.jpg"
                  className="custom-card-img"
                />
                <Card.Body>
                  <Card.Title className="custom-card-title">
                    <FontAwesomeIcon icon={faUser} className="me-2" />
                    Add Courses
                  </Card.Title>
                  <Card.Text>Add your courses</Card.Text>
                  <Link to="/addcourse">
                    <Button variant="primary" className="custom-button">
                      Add Courses
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ) : null}
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-lg custom-card">
              <Card.Img
                variant="top"
                src="https://epe.brightspotcdn.com/cb/cd/f8213ccb4203abdae3aad13a1eef/ai-gpt-teacher-08162022-966654886-949652688.jpg"
                className="custom-card-img"
              />
              <Card.Body>
                <Card.Title className="custom-card-title">
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  Our Teachers
                </Card.Title>
                <Card.Text>Meet our Instructors</Card.Text>
                <Link to="/listallteachers">
                  <Button variant="primary" className="custom-button">
                    View Instructors
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;
