import React, { useEffect, useState } from 'react';
import { useFirebase } from '../../Context/FirebaseContext';
import { useParams } from 'react-router-dom';
import { ProgressBar, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const CourseProgress = () => {
    const { courseId: paramCourseId, courseName: paramCourseName } = useParams();
    const courseId = paramCourseId || localStorage.getItem('courseId');
    const courseName = paramCourseName || localStorage.getItem('courseName');
  const { getCoursesById } = useFirebase();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseData = await getCoursesById(courseId);
        setCourse(courseData);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };
    fetchCourseData();
  }, [courseId, getCoursesById]);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      {course && (
        <>
          <header style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1>{course.courseName}</h1>
            <h2>Welcome to {course.courseDescription}!</h2>
          </header>
          <section>
            <h3>Course Progress</h3>
            <ProgressBar now={course.progress} label={`${course.progress}%`} />
            <h3>Lessons</h3>
            <ListGroup>
              {course.lessons && course.lessons.map((lesson, index) => (
                <ListGroup.Item key={index} variant={lesson.completed ? 'success' : 'danger'}>
                  <FontAwesomeIcon icon={lesson.completed ? faCheckCircle : faTimesCircle} className="me-2" />
                  {lesson.title}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </section>
        </>
      )}
      <footer style={{ textAlign: 'center', marginTop: '40px' }}>
        <p>&copy; {new Date().getFullYear()} Your Course Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CourseProgress;
