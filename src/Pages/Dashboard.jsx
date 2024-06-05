import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Course Progress</Card.Title>
              <Card.Text>
                Track your progress in enrolled courses.
              </Card.Text>
              <Link to="/courses">
                <Button variant="primary">View Courses</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        
        
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>View Courses</Card.Title>
              <Card.Text>
                View the courses we can offer.
              </Card.Text>
              <Link to="/dashboard/viewcourse">
                <Button variant="primary">View Events</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Resource Library</Card.Title>
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
      <Row className="mt-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Assignments</Card.Title>
              <Card.Text>
                View and submit assignments.
              </Card.Text>
              <Link to="/assignments">
                <Button variant="primary">View Assignments</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Discussion Forums</Card.Title>
              <Card.Text>
                Participate in course discussions.
              </Card.Text>
              <Link to="/forums">
                <Button variant="primary">Visit Forums</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Profile</Card.Title>
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
  );
};

export default Dashboard;
