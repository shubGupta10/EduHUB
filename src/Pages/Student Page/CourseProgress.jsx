import React from 'react';

const CourseProgress = () => {
  // Example static data
  const courseTitle = "Introduction to React";
  const studentName = "John Doe";
  const progress = 50; // Progress in percentage
  const lessons = [
    { title: "Lesson 1: JSX", completed: true },
    { title: "Lesson 2: Components", completed: true },
    { title: "Lesson 3: Props and State", completed: false },
    { title: "Lesson 4: Lifecycle Methods", completed: false },
    { title: "Lesson 5: Hooks", completed: false },
  ];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1>{courseTitle}</h1>
        <h2>Welcome, {studentName}!</h2>
      </header>
      <section>
        <h3>Course Progress</h3>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ flex: 1, height: '20px', backgroundColor: '#e0e0e0', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', backgroundColor: '#76c7c0' }}></div>
          </div>
          <span style={{ marginLeft: '10px' }}>{progress}%</span>
        </div>
        <h3>Lessons</h3>
        <ul style={{ listStyle: 'none', padding: '0' }}>
          {lessons.map((lesson, index) => (
            <li key={index} style={{ marginBottom: '10px', padding: '10px', backgroundColor: lesson.completed ? '#d4edda' : '#f8d7da', borderRadius: '5px' }}>
              {lesson.title}
            </li>
          ))}
        </ul>
      </section>
      <footer style={{ textAlign: 'center', marginTop: '40px' }}>
        <p>&copy; 2024 Your Course Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CourseProgress;
