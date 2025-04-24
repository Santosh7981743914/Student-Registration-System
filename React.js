///StudentRegistration System.js///


import React, { useState } from 'react';

export default function StudentRegistrationSystem() {
  const [courseTypes, setCourseTypes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [offerings, setOfferings] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [courseTypeName, setCourseTypeName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [selectedCourseType, setSelectedCourseType] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedOffering, setSelectedOffering] = useState('');
  const [studentName, setStudentName] = useState('');
  const [filterCourseType, setFilterCourseType] = useState('');

  const addCourseType = () => {
    if (courseTypeName.trim()) {
      setCourseTypes([...courseTypes, { id: Date.now(), name: courseTypeName }]);
      setCourseTypeName('');
    }
  };

  const updateCourseType = (id, name) => {
    setCourseTypes(courseTypes.map(ct => ct.id === id ? { ...ct, name } : ct));
  };

  const deleteCourseType = id => {
    setCourseTypes(courseTypes.filter(ct => ct.id !== id));
  };

  const addCourse = () => {
    if (courseName.trim()) {
      setCourses([...courses, { id: Date.now(), name: courseName }]);
      setCourseName('');
    }
  };

  const updateCourse = (id, name) => {
    setCourses(courses.map(c => c.id === id ? { ...c, name } : c));
  };

  const deleteCourse = id => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const addOffering = () => {
    const course = courses.find(c => c.id === parseInt(selectedCourse));
    const courseType = courseTypes.find(ct => ct.id === parseInt(selectedCourseType));
    if (course && courseType) {
      setOfferings([...offerings, {
        id: Date.now(),
        name: `${courseType.name} - ${course.name}`,
        courseId: course.id,
        courseTypeId: courseType.id
      }]);
    }
  };

  const deleteOffering = id => {
    setOfferings(offerings.filter(o => o.id !== id));
  };

  const registerStudent = () => {
    const offering = offerings.find(o => o.id === parseInt(selectedOffering));
    if (offering && studentName.trim()) {
      setRegistrations([...registrations, {
        id: Date.now(),
        name: studentName,
        offeringId: offering.id
      }]);
      setStudentName('');
    }
  };

  const filteredOfferings = filterCourseType
    ? offerings.filter(o => o.courseTypeId === parseInt(filterCourseType))
    : offerings;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Course Types</h2>
      <input value={courseTypeName} onChange={e => setCourseTypeName(e.target.value)} placeholder="New Course Type" />
      <button onClick={addCourseType}>Add</button>
      {courseTypes.map(ct => (
        <div key={ct.id}>
          <input value={ct.name} onChange={e => updateCourseType(ct.id, e.target.value)} />
          <button onClick={() => deleteCourseType(ct.id)}>Delete</button>
        </div>
      ))}

      <hr />

      <h2>Courses</h2>
      <input value={courseName} onChange={e => setCourseName(e.target.value)} placeholder="New Course" />
      <button onClick={addCourse}>Add</button>
      {courses.map(c => (
        <div key={c.id}>
          <input value={c.name} onChange={e => updateCourse(c.id, e.target.value)} />
          <button onClick={() => deleteCourse(c.id)}>Delete</button>
        </div>
      ))}

      <hr />

      <h2>Course Offerings</h2>
      <select onChange={e => setSelectedCourseType(e.target.value)}>
        <option value="">Select Course Type</option>
        {courseTypes.map(ct => (
          <option key={ct.id} value={ct.id}>{ct.name}</option>
        ))}
      </select>
      <select onChange={e => setSelectedCourse(e.target.value)}>
        <option value="">Select Course</option>
        {courses.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
      <button onClick={addOffering}>Add Offering</button>
      {offerings.map(o => (
        <div key={o.id}>
          {o.name} <button onClick={() => deleteOffering(o.id)}>Delete</button>
        </div>
      ))}

      <hr />

      <h2>Student Registration</h2>
      <select onChange={e => setSelectedOffering(e.target.value)}>
        <option value="">Select Offering</option>
        {offerings.map(o => (
          <option key={o.id} value={o.id}>{o.name}</option>
        ))}
      </select>
      <input value={studentName} onChange={e => setStudentName(e.target.value)} placeholder="Student Name" />
      <button onClick={registerStudent}>Register</button>

      <h3>Registered Students</h3>
      {registrations.map(r => {
        const offering = offerings.find(o => o.id === r.offeringId);
        return <div key={r.id}>{r.name} - {offering?.name}</div>;
      })}

      <hr />

      <h2>Filter Offerings by Course Type</h2>
      <select onChange={e => setFilterCourseType(e.target.value)}>
        <option value="">All</option>
        {courseTypes.map(ct => (
          <option key={ct.id} value={ct.id}>{ct.name}</option>
        ))}
      </select>
      <div>
        {filteredOfferings.map(o => (
          <div key={o.id}>{o.name}</div>
        ))}
      </div>
    </div>
  );
}


///App.js///

import React from 'react';
import './App.css';
import StudentRegistrationSystem from './StudentRegistrationSystem';

function App() {
  return (
    <div className="App">
      <h1 className="text-2xl font-bold p-4">Student Registration System</h1>
      <StudentRegistrationSystem />
    </div>
  );
}

export default App;
