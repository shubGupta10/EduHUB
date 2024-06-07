import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFirebase } from "../../Context/FirebaseContext";

const StudentDetailForm = () => {
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [degreeProgram, setDegreeProgram] = useState("");
  const [yearOrSemester, setYearOrSemester] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDetails, setPaymentDetails] = useState("");

  const { currentUser } = useFirebase();

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);
      setStudentName(currentUser.displayName || "");
      setStudentEmail(currentUser.email || "");
      setStudentId(currentUser.uid);
    }
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h2 className="text-center mb-4">Student Enrollment Form</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formStudentName">
              <Form.Label>Student Name</Form.Label>
              <Form.Control
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter full name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formStudentEmail">
              <Form.Label>Student Email</Form.Label>
              <Form.Control
                type="email"
                disabled={studentEmail ? true : false} 
                value={studentEmail || ""}
                onChange={(e) => setStudentEmail(e.target.value)}
                placeholder="Enter email"
                onCopy={(e) => e.preventDefault()} 
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCourseId">
              <Form.Label>Course ID</Form.Label>
              <Form.Control
                type="text"
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                placeholder="Enter course ID"
                onCopy={(e) => e.preventDefault()}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCourseName">
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Enter course name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formStudentId">
              <Form.Label>Student ID</Form.Label>
              <Form.Control
                type="text"
                disabled
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Enter student ID"
                onCopy={(e) => e.preventDefault()}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDegreeProgram">
              <Form.Label>Degree Program</Form.Label>
              <Form.Control
                type="text"
                value={degreeProgram}
                onChange={(e) => setDegreeProgram(e.target.value)}
                placeholder="Enter degree program"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formYearOrSemester">
              <Form.Label>Year or Semester</Form.Label>
              <Form.Control
                type="text"
                value={yearOrSemester}
                onChange={(e) => setYearOrSemester(e.target.value)}
                placeholder="Enter year or semester"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPaymentMethod">
              <Form.Label>Payment Method</Form.Label>
              <Form.Select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="">Select Payment Method</option>
                <option value="creditCard">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bankTransfer">Bank Transfer</option>
              </Form.Select>
            </Form.Group>

            {paymentMethod === "creditCard" && (
              <Form.Group className="mb-3" controlId="formPaymentDetails">
                <Form.Label>Payment Details</Form.Label>
                <Form.Control
                  type="text"
                  value={paymentDetails}
                  onChange={(e) => setPaymentDetails(e.target.value)}
                  placeholder="Enter credit card details"
                />
              </Form.Group>
            )}

            <div className="text-center">
              <Button variant="primary" type="submit">
                Enroll
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentDetailForm;
