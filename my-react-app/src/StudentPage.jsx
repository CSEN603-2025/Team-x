import { useState } from 'react'
import styles from './StudentPage.module.css'

function StudentPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [render, setRender] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [selectedDate, setSelectedDate] = useState('');
    const [visibleEvalTitles, setVisibleEvalTitles] = useState({});
    const [evalTexts, setEvalTexts] = useState({});
    const [internships, setInternships] = useState([
  {
    status: 'Current',
    startDate: '2025-03-01',
    endDate: null,
    title: 'Frontend Developer Intern',
    company: 'TechNova Solutions',
    eval: ''
  },
  {
    status: 'Completed',
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    title: 'Software Engineering Intern',
    company: 'InnovateX Labs',
    eval: ''
  },
  {
    status: 'Completed',
    startDate: '2024-01-15',
    endDate: '2024-05-15',
    title: 'Backend Developer Intern',
    company: 'CloudBridge Inc.',
    eval: ''
  },
  {
    status: 'Completed',
    startDate: '2023-07-01',
    endDate: '2023-09-30',
    title: 'Mobile App Intern',
    company: 'AppFusion',
    eval: ''
  },
  {
    status: 'Completed',
    startDate: '2023-02-10',
    endDate: '2023-05-10',
    title: 'AI Research Intern',
    company: 'NeuroNet AI',
    eval: ''
  },
  {
    status: 'Completed',
    startDate: '2022-06-01',
    endDate: '2022-08-30',
    title: 'Web Developer Intern',
    company: 'BrightByte',
    eval: ''
  }
]);

  
  const toggleEvalVisibility = (title) => {
    setVisibleEvalTitles(prev => ({
      ...prev,
      [title]: !prev[title]
      }));
  };

  function handleUpdate(title) {
  setInternships(prev =>
    prev.map(internship =>
      internship.title === title
        ? { ...internship, eval: evalTexts[title] || '' }
        : internship
    )
  );
}

function handleDelete(title) {
  setInternships(prev =>
    prev.map(internship =>
      internship.title === title
        ? { ...internship, eval: '' }
        : internship
    )
  );

  setEvalTexts(prev => {
    const updated = { ...prev };
    delete updated[title];
    return updated;
  });
}

  


    

  const csCourses = [
  "Introduction to Computer Science",
  "Mathematics for Computer Science I",
  "Introduction to Programming (Python/C++)",
  "Data Structures and Algorithms I",
  "Computer Architecture",
  "Linear Algebra",
  "Digital Logic Design",
  "Object-Oriented Programming",
  "Mathematics for Computer Science II (Probability and Statistics)",
  "Operating Systems",
  "Discrete Structures",
  "Database Management Systems",
  "Software Engineering",
  "Web Development",
  "Computer Networks",
  "Theory of Computation",
  "Algorithms II",
  "Artificial Intelligence",
  "Compilers",
  "Mobile Application Development",
  "Human-Computer Interaction",
  "Advanced Software Engineering",
  "Machine Learning",
  "Cybersecurity",
  "Cloud Computing",
  "Big Data and Data Mining",
  "Capstone Project",
  "Advanced Databases",
  "Computer Vision",
  "Natural Language Processing",
  "Game Development",
  "Blockchain Technology",
  "Distributed Systems",
  "Robotics",
  "Cloud"
  ]

    function showCourses(){
      setRender('courses');
    }
    function showInternships(){
      setRender('internships');
    }
    function showReport(){
      setRender('report');
    }

const filteredInternships = internships.filter((internship) => {
  const term = searchTerm.toLowerCase();
  const matchesSearch =
    internship.company.toLowerCase().includes(term) ||
    internship.title.toLowerCase().includes(term);

  const matchesStatus =
    statusFilter === 'All' || internship.status === statusFilter;

  const matchesEndDate =
    selectedDate === '' ||
    (internship.endDate && internship.endDate <= selectedDate);

  return matchesSearch && matchesStatus && matchesEndDate;
});


  return (
    <div className={styles.mainContainer}>
      <p className={styles.pageTitle}>Student Page</p>
      <div className={styles.sliderContainer}>
        <p className={styles.selector} onClick={showCourses}>Courses</p>
        <p className={styles.selector} onClick={showInternships}>Internships</p>
        <p className={styles.selector} onClick={showReport}>My report</p>
      </div>

      {render === 'courses' && csCourses.map((course, index) => (
      <div key={index} className={styles.internship}>
        <div className={styles.detailContainer}>
          <p>{course}</p>
          <form>
            <label>
              <input type="checkbox"
              checked={!!selectedCourses[course]}
              onChange={() => handleToggle(course)}/> Helped with internship
            </label>
          </form>
        </div>
      </div>
    ))}
      

     {render === 'internships' && (
  <div className={styles.searchContainer}>
    <div className={styles.filterAndSearch}>
      <input
        className={styles.search}
        onChange={(e) => setSearchTerm(e.target.value)}
        type="search"
        placeholder="Search your internships"
      />
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Current">Current</option>
        <option value="Completed">Completed</option>
      </select>
      <input
        className={styles.date}
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
    </div>

    {filteredInternships.map((internship, index) => (
      <div key={index} className={styles.internship}>
        <div className={styles.detailContainer}>
          <p>{internship.company}</p><button className={styles.eval} onClick={() => toggleEvalVisibility(internship.title)}>eval</button>
          <p>{internship.title}</p>
        </div>
       {visibleEvalTitles[internship.title] && (
      <div className={styles.evalContent}>
        <textarea className={styles.evalForm} placeholder={internship.eval} value={evalTexts[internship.title] || ''}
  onChange={(e) =>
    setEvalTexts(prev => ({
      ...prev,
      [internship.title]: e.target.value
    }))
  }/>
        <div className={styles.evalControls}>
          <button className={styles.update} onClick={() => handleUpdate(internship.title)}>Update</button>
          <button className={styles.delete} onClick={() => handleDelete(internship.title)}>Delete</button>
        </div>
      </div>
    )}
        
        <div className={styles.statusContainer}>
          <p>{internship.status}</p>
          <p>{internship.endDate || 'Ongoing'}</p>
        </div>
      </div>
    ))}
  </div>
)}

    {render === 'report' && <div className={styles.reportContainer}>
      <p className={styles.paragraph}>During my internship at TechNova Solutions as a Frontend Developer Intern, 
        I had the opportunity to work on several real-world web development projects using React.js. 
        The experience significantly enhanced my understanding of component-based architecture and responsive design. 
        I collaborated with a cross-functional team of developers and designers, which improved my communication skills and taught me the importance of version control with Git. 
        One of the highlights of the internship was contributing to a live product feature that is now used by real customers. 
        Overall, this internship not only helped me apply the concepts I learned in my university courses but also gave me confidence
         in my ability to work in a professional software development environment.</p>

         <button className={styles.submit}>Submit</button>
      </div>
      }
    </div>
  )
}

export default StudentPage
