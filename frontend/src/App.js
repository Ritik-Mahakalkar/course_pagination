
import './App.css';
import CourseList from './Components/CourseList';
import dummyCourses from './Assets/dummyCourses';

function App() {
  return (
    <div className="App">
      <CourseList courses={dummyCourses} />
    </div>
  );
}

export default App;
