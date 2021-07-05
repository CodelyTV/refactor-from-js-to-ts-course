import React from 'react';
import './styles/App.css';
import { useCourses } from './useCourses';
import { CourseInfo } from './CourseInfo';

function App() {
  const { courses } = useCourses();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Courses</h1>
      </header>
      <div id="courses" className="courses-grid">
        {courses.map(course => (
          <CourseInfo key={course.title} course={course} />
        ))}
      </div>
    </div>
  );
}

export default App;
