import React, { useEffect, useState } from "react";
import { Container, Button, Form, Row, Col, Card } from "react-bootstrap";
import { storage, useFirebase } from "../../Context/FirebaseContext";
import Loader from "../../Components/Loader";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const AssignmentPage = () => {
  const courseId = localStorage.getItem("courseId");

  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true);
  const { getCoursesById, user, matchUser, uploadAssignmentDocument } =
    useFirebase();
  const [course, setCourse] = useState(null);

  //formData
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
        console.log(courseData);
      } catch (error) {
        console.error("Error fetching data");
        throw new Error();
      }
    };
    fetchCourseData();
  }, [courseId, getCoursesById]);

  useEffect(() => {
    const fetchUserWithId = async () => {
      try {
        const fetchedUser = await matchUser(user);
        setUserRole(fetchedUser.role);
        setUserInfo(fetchedUser);
        console.log(fetchedUser.role);
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
        AssignmentUrl 
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

  return (
    <Container className="mt-4">
      {userRole === "student" ? (
        <>
          <Row>
            <Col className="text-center">
              <h2 className="text-primary">
                Welcome Student, Check your Assignments here
              </h2>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col>
              <Card className="shadow-sm">
                <Card.Header as="h5" className="bg-primary text-white">
                  Your Assignments
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    List of assignments will be displayed here.
                  </Card.Text>
                  <Button variant="primary">View Assignments</Button>
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
                Welcome to the Assignment Submission Page, {userInfo.displayName}
              </h2>
              <h5 className="text-secondary">
                Here you can submit your assignments
              </h5>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col md={{ span: 6, offset: 3 }}>
              <Card className="shadow-sm">
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
                        onChange={(e) => setInstructor(e.target.value)}
                        value={instructor}
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
  );
};

export default AssignmentPage;
