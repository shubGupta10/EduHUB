import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFirebase } from "../../Context/FirebaseContext";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const StudentDetailForm = () => {
  const { courseId, courseName } = useParams(); 
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [degreeProgram, setDegreeProgram] = useState("");
  const [yearOrSemester, setYearOrSemester] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDetails, setPaymentDetails] = useState("");
  const navigate = useNavigate();

  const { currentUser, createStudentDetails } = useFirebase();

  useEffect(() => {
    if (currentUser) {
      setStudentName(currentUser.displayName || "");
      setStudentEmail(currentUser.email || "");
      setStudentId(currentUser.uid);
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const studentCourseEnrollData = {
        studentName,
        studentEmail,
        courseId,
        courseName,
        studentId,
        phoneNumber,
        degreeProgram,
        yearOrSemester,
        paymentMethod,
        paymentDetails
      };
      await createStudentDetails(studentCourseEnrollData);
      toast.success("Student Enrolled into the Course");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Student Enrollment Failed");
      console.log(error);
    }
  };

  return (
    <Container className="mt-5 ">
      <Row className="justify-content-md-center ">
        <Col md={8}>
          <Card className="p-4 shadow-lg rounded">
            <h2 className="text-center mb-4">Student Course Enrollment Form</h2>
            <p className="text-center mb-4">
              Please fill in the form below to enroll in the course. Ensure all details are accurate.
            </p>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formStudentName">
                <Form.Label className="fw-bold">Student Name</Form.Label>
                <Form.Control
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter full name"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formStudentEmail">
                <Form.Label className="fw-bold">Student Email</Form.Label>
                <Form.Control
                  type="email"
                  readOnly
                  value={studentEmail || ""}
                  placeholder="Enter email"
                  onCopy={(e) => e.preventDefault()}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formCourseId">
                <Form.Label className="fw-bold">Course ID</Form.Label>
                <Form.Control
                  type="text"
                  value={courseId}
                  readOnly 
                  onCopy={(e) => e.preventDefault()}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formCourseName">
                <Form.Label className="fw-bold">Course Name</Form.Label>
                <Form.Control
                  type="text"
                  value={courseName}
                  readOnly 
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formStudentId">
                <Form.Label className="fw-bold">Student ID</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  value={studentId}
                  placeholder="Enter student ID"
                  onCopy={(e) => e.preventDefault()}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPhoneNumber">
                <Form.Label className="fw-bold">Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter phone number"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formDegreeProgram">
                <Form.Label className="fw-bold">Degree Program</Form.Label>
                <Form.Control
                  type="text"
                  value={degreeProgram}
                  onChange={(e) => setDegreeProgram(e.target.value)}
                  placeholder="Enter degree program"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formYearOrSemester">
                <Form.Label className="fw-bold">Year or Semester</Form.Label>
                <Form.Control
                  type="text"
                  value={yearOrSemester}
                  onChange={(e) => setYearOrSemester(e.target.value)}
                  placeholder="Enter year or semester"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPaymentMethod">
                <Form.Label className="fw-bold">Payment Method</Form.Label>
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
                  <Form.Label className="fw-bold">Payment Details</Form.Label>
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
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentDetailForm;
