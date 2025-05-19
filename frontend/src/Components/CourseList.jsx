import React, { useState, useEffect } from "react";
import "./CourseList.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        « Prev
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={page === currentPage ? "active" : ""}
        >
          {page}
        </button>
      ))}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next »
      </button>
    </div>
  );
};

const CourseList = ({ courses, searchQuery = "", filterCategory = "" }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterCategory ? course.category === filterCategory : true;
    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterCategory]);

 
  const indexOfLast = currentPage * coursesPerPage;
  const indexOfFirst = indexOfLast - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  return (
    <div>
      <div className="course-grid">
        {currentCourses.map((course) => (
          <div key={course.id} className="course-card">
            <img src={course.thumbnail} alt={course.title} className="course-img" />
            <div className="course-title">{course.title}</div>
            <div className="course-instructor">{course.instructor}</div>
            <div className="course-price">Rs. {course.price}</div>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default CourseList;
