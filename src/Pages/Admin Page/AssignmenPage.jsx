import React, { useEffect, useState } from "react";
import { Container, Button, Form, Row, Col, Card } from "react-bootstrap";
import { storage, useFirebase } from "../../Context/FirebaseContext";
import Loader from "../../Components/Loader";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import Footer from "../../Components/Footer";

const AssignmentPage = () => {
  const courseId = localStorage.getItem("courseId");

  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true);
  const {
    getCoursesById,
    user,
    matchUser,
    uploadAssignmentDocument,
    fetchAssignment,
    completeAssignment,
  } = useFirebase();
  const [course, setCourse] = useState(null);
  const [fetchingAssignment, setFetchingAssignment] = useState([]);
  const [submitAssignmentFile, setSubmitAssignmentFile] = useState(null);

  // Form data
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentDate, setAssignmentDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [instructor, setInstructor] = useState("");
  const [assignmentFile, setAssignmentFile] = useState(null);
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseData = await getCoursesById(courseId);
        setCourse(courseData);
      } catch (error) {
        console.error("Error fetching data");
        throw new Error();
      }
    };
    fetchCourseData();
  }, [courseId, getCoursesById]);

  useEffect(() => {
    const fetchingAssignmentfromDb = async (courseId) => {
      try {
        const fetchAssignmentfromfirebase = await fetchAssignment(courseId);
        setFetchingAssignment(fetchAssignmentfromfirebase);
        console.log(fetchAssignmentfromfirebase);
      } catch (error) {
        console.error("Failed to fetch Assignments, Please Try Again");
      }
    };

    fetchingAssignmentfromDb(courseId);
  }, [courseId]);

  useEffect(() => {
    const fetchUserWithId = async () => {
      try {
        const fetchedUser = await matchUser(user);
        setUserRole(fetchedUser.role);
        setUserInfo(fetchedUser);
      } catch (error) {
        console.error("Can't find the user");
        throw new Error();
      } finally {
        setLoading(false);
      }
    };
    fetchUserWithId();
  }, [user, matchUser]);

  if (loading) {
    return <Loader />;
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      let AssignmentUrl = "";
      if (assignmentFile) {
        const DocRef = ref(
          storage,
          `AssignmentsQuestions/${Date.now()}_${assignmentFile.name}`
        );
        const snapshot = await uploadBytes(DocRef, assignmentFile);
        AssignmentUrl = await getDownloadURL(snapshot.ref);
      }

      const AssignmentDocumentId = uuidv4();
      const AssignmentData = {
        AssignmentDocumentId,
        assignmentTitle,
        assignmentDate,
        deadline,
        instructor,
        AssignmentUrl,
        courseId,
      };

      await uploadAssignmentDocument(AssignmentData);
      toast.success("Assignment Uploaded!");
      setAssignmentTitle("");
      setAssignmentDate("");
      setDeadline("");
      setInstructor("");
      setAssignmentFile(null);
    } catch (error) {
      toast.error("Failed to add Assignment");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setSubmitAssignmentFile(e.target.files[0]);
  };

  const handleSubmitAssignment = async (e, assignmentId) => {
    e.preventDefault();
    try {
      setLoading(true);

      let SubmitAssignmentUrl = "";
      if (submitAssignmentFile) {
        const SubmitDocRef = ref(
          storage,
          `SubmittedAssignments/${Date.now()}_${submitAssignmentFile.name}`
        );
        const snapshot = await uploadBytes(SubmitDocRef, submitAssignmentFile);
        SubmitAssignmentUrl = await getDownloadURL(snapshot.ref);

        const CompletedAssignmentData = {
          AssignmentDocumentId: uuidv4(),
          studentId: user.uid,
          submissionDate: new Date().toISOString(),
          SubmitAssignmentUrl,
          courseId,
        };

        await completeAssignment(CompletedAssignmentData);
        toast.success("Assignment Submitted!");
        setSubmitAssignmentFile(null);
      } else {
        toast.error("Please select a file to submit.");
      }
    } catch (error) {
      console.error("Failed to submit assignment:", error);
      toast.error("Failed to submit assignment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Container className="mt-4  min-vh-100">
      {userRole === "student" ? (
        <>
          <Row className="mt-4">
            <Col className="text-center">
              <h2 className="text-primary">
                Welcome {userInfo.displayName}, Check your Assignments here
              </h2>
            </Col>
          </Row>

          <Row className="mt-4">
            {fetchingAssignment.map((assignment) => (
              <Col
                key={assignment.AssignmentDocumentId}
                xs={12}
                md={6}
                lg={4}
                className="mb-4"
              >
                <Card
                  className="shadow-sm h-100 border-dark"
                  style={{ backgroundColor: "#E6E6E6" }}
                >
                  <Card.Body>
                    <Card.Title className="bg-primary text-white mb-3 p-2">
                      Assignment: {assignment.assignmentTitle}
                    </Card.Title>
                    <Card.Text>
                      <p className="lead font-montserrat">
                        Assignment Date: {assignment.assignmentDate}
                      </p>
                      <p className="lead text-danger">
                        Deadline:{" "}
                        <span className="">{assignment.deadline}</span>
                      </p>
                      <p className="lead">
                        Instructor: {course.courseInstructor}
                      </p>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="bg-transparent border-0 d-flex justify-content-center">
                    <Button
                      variant="primary bg-danger"
                      onClick={() =>
                        window.open(assignment.AssignmentUrl, "_blank")
                      }
                    >
                      Download
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>

          <Row className="mt-5">
            <Col md={{ span: 6, offset: 3 }}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Form onSubmit={handleSubmitAssignment}>
                    <Form.Group controlId="formSubmitAssignmentFile">
                      <Row className="mb-3">
                        <Form.Label className="text-center fw-bold fs-5 text-primary">
                          Once completed, you can upload your assignments here
                        </Form.Label>
                      </Row>
                      <Form.Label>Upload Assignment File</Form.Label>
                      <Form.Control
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-3">
                      Submit
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Row>
            <Col className="text-center">
              <h2 className="text-primary">
              Welcome to the Assignment Management Page,{" "}
                {userInfo.displayName}
              </h2>
              <h5 className="text-secondary">
              Here you can create and review assignments
              </h5>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col md={{ span: 6, offset: 3 }}>
              <Card className="shadow-sm">
              <Form.Label className="text-center text-primary fs-4 mt-2 fw-bold">Upload Assignments for student</Form.Label>
                <Card.Body>
                  <Form onSubmit={handleSubmitForm}>
                    <Form.Group controlId="formAssignmentTitle">
                      <Form.Label>Assignment Title</Form.Label>
                      <Form.Control
                        onChange={(e) => setAssignmentTitle(e.target.value)}
                        value={assignmentTitle}
                        type="text"
                        placeholder="Enter title"
                      />
                    </Form.Group>

                    <Form.Group controlId="formAssignmentDate" className="mt-3">
                      <Form.Label>Assignment Date</Form.Label>
                      <Form.Control
                        onChange={(e) => setAssignmentDate(e.target.value)}
                        value={assignmentDate}
                        type="date"
                      />
                    </Form.Group>

                    <Form.Group
                      controlId="formAssignmentDeadline"
                      className="mt-3"
                    >
                      <Form.Label>Deadline</Form.Label>
                      <Form.Control
                        onChange={(e) => setDeadline(e.target.value)}
                        value={deadline}
                        type="date"
                      />
                    </Form.Group>

                    <Form.Group
                      controlId="formAssignmentInstructor"
                      className="mt-3"
                    >
                      <Form.Label>Instructor</Form.Label>
                      <Form.Control
                        type="text"
                        readOnly
                        onChange={(e) => setInstructor(e.target.value)}
                        value={course ? course.courseInstructor : ""}
                        placeholder="Enter instructor's name"
                      />
                    </Form.Group>

                    <Form.Group controlId="formAssignmentFile" className="mt-3">
                      <Form.Label>Upload File</Form.Label>
                      <Form.Control
                        onChange={(e) => setAssignmentFile(e.target.files[0])}
                        type="file"
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-3">
                      Submit
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
    <Footer/>
    </>
  );
};

export default AssignmentPage;
