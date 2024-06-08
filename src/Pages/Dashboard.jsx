import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faChartLine, faClipboard, faComments, faUser, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  return (
    <>
      <div className='bg-primary text-white text-center py-5'>
        <h1 className='display-3 fw-bolder text-warning'>Welcome to the EduHub Dashboard 🙂</h1>
      </div>
      <Container className="mt-5">
        <Row className="mb-4">
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src="https://seeingthebrightside.com/wp-content/uploads/2020/11/output-onlinejpgtools-62-1140x760.jpg" />
              <Card.Body>
                <Card.Title>
                  <FontAwesomeIcon icon={faChartLine} className="me-2" />
                  Course Progress
                </Card.Title>
                <Card.Text>
                  Track your progress in enrolled courses.
                </Card.Text>
                <Link to="/courses">
                  <Button variant="primary">View Courses</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src="https://sdsinstitute.org.in/wp-content/uploads/2019/08/vgce-course.png" />
              <Card.Body>
                <Card.Title>
                  <FontAwesomeIcon icon={faBook} className="me-2" />
                  View Courses
                </Card.Title>
                <Card.Text>
                  View the courses we can offer.
                </Card.Text>
                <Link to="/dashboard/viewcourse">
                  <Button variant="primary">View Courses</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src="https://americanlibrariesmagazine.org/wp-content/uploads/2016/01/digital-librarian.jpg" />
              <Card.Body>
                <Card.Title>
                  <FontAwesomeIcon icon={faFileAlt} className="me-2" />
                  Resource Library
                </Card.Title>
                <Card.Text>
                  Access educational resources and materials.
                </Card.Text>
                <Link to="/resources">
                  <Button variant="primary">View Resources</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src="https://i0.wp.com/iserotope.com/wp-content/uploads/2014/02/8151789_orig.png" />
              <Card.Body>
                <Card.Title>
                  <FontAwesomeIcon icon={faClipboard} className="me-2" />
                  Assignments
                </Card.Title>
                <Card.Text>
                  View and submit assignments.
                </Card.Text>
                <Link to="/assignments">
                  <Button variant="primary">View Assignments</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src="https://d56vh6ph4jjmq.cloudfront.net/fb-main/heros/8/hero-discussions@2x.png" />
              <Card.Body>
                <Card.Title>
                  <FontAwesomeIcon icon={faComments} className="me-2" />
                  Discussion Forums
                </Card.Title>
                <Card.Text>
                  Participate in course discussions.
                </Card.Text>
                <Link to="/forums">
                  <Button variant="primary">Visit Forums</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src="https://via.placeholder.com/300x200" />
              <Card.Body>
                <Card.Title>
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  Profile
                </Card.Title>
                <Card.Text>
                  Update your profile information.
                </Card.Text>
                <Link to="/profile">
                  <Button variant="primary">View Profile</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
