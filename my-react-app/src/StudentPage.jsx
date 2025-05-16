import { useState } from 'react'
import styles from './StudentPage.module.css'
import jsPDF from 'jspdf';

function StudentPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [render, setRender] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedCourses, setSelectedCourses] = useState({});
    const [visibleEvalTitles, setVisibleEvalTitles] = useState({});
    const [evalTexts, setEvalTexts] = useState({});
    const [selectedReportInternship, setSelectedReportInternship] = useState('');
    const [reports, setReports] = useState({});
    const [appealText, setAppealText] = useState('');

    const [reportInputs, setReportInputs] = useState({
    title: '',
    introduction: '',
    body: ''
    });
    const [internships, setInternships] = useState([
  {
    status: 'Current',
    startDate: '2025-03-01',
    endDate: null,
    title: 'Frontend Developer Intern',
    company: 'TechNova Solutions',
    eval: '',
    report:{title:'',introduction:'', body:'',status:'pending'}
  },
  {
    status: 'Completed',
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    title: 'Software Engineering Intern',
    company: 'InnovateX Labs',
    eval: '',report:{title:'',introduction:'', body:'',status:'rejected'}

  },
  {
    status: 'Completed',
    startDate: '2024-01-15',
    endDate: '2024-05-15',
    title: 'Backend Developer Intern',
    company: 'CloudBridge Inc.',
    eval: ''
    ,
    report:{title:'',introduction:'', body:'',status:'flagged'}
  },
  {
    status: 'Completed',
    startDate: '2023-07-01',
    endDate: '2023-09-30',
    title: 'Mobile App Intern',
    company: 'AppFusion',
    eval: ''
    ,
    report:{title:'',introduction:'', body:'',status:'accepted'}
  },
  {
    status: 'Completed',
    startDate: '2023-02-10',
    endDate: '2023-05-10',
    title: 'AI Research Intern',
    company: 'NeuroNet AI',
    eval: '',
    report:{title:'',introduction:'', body:'',status:'accepted'}
  },
  {
    status: 'Completed',
    startDate: '2022-06-01',
    endDate: '2022-08-30',
    title: 'Web Developer Intern',
    company: 'BrightByte',
    eval: '',
    report:{title:'',introduction:'', body:'',status:'accepted'}
  }
]);

function handleDownloadPDF() {
  const { title, introduction, body } = reportInputs;
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(title || 'Internship Report', 10, 20);

  doc.setFontSize(14);
  doc.text('Introduction:', 10, 40);
  doc.setFontSize(12);
  doc.text(doc.splitTextToSize(introduction || '', 180), 10, 50);

  const bodyStartY = 50 + doc.splitTextToSize(introduction || '', 180).length * 10 + 10;
  doc.setFontSize(14);
  doc.text('Body:', 10, bodyStartY);
  doc.setFontSize(12);
  doc.text(doc.splitTextToSize(body || '', 180), 10, bodyStartY + 10);

  doc.save(`${title || 'Internship_Report'}.pdf`);
}

function handleReportInputChange(field, value) {
  setReportInputs(prev => ({
    ...prev,
    [field]: value
  }));
}

function handleSaveReport() {
  if (selectedReportInternship) {
    
    setInternships(prev => 
      prev.map(internship =>
        internship.title === selectedReportInternship
          ? { 
              ...internship, 
              report: { 
                title: reportInputs.title, 
                introduction: reportInputs.introduction, 
                body: reportInputs.body 
              }
            }
          : internship
      )
    );
    alert('Report saved!');
  }
}




function handleDeleteReport() {
  if (selectedReportInternship) {
    setReports(prev => {
      const updated = { ...prev };
      delete updated[selectedReportInternship];
      return updated;
    });
    setReportInputs({ title: '', introduction: '', body: '' });
    alert('Report deleted!');
  }
}

function handleInternshipSelect(e) {
  const internshipTitle = e.target.value;
  setSelectedReportInternship(internshipTitle);

  const selectedInternship = internships.find(internship => internship.title === internshipTitle);
  if (selectedInternship && selectedInternship.report) {
    setReportInputs(selectedInternship.report); 
  } else {
    setReportInputs({ title: '', introduction: '', body: '' });
}
}

  function handleToggle(course) {
  setSelectedCourses(prev => ({
    ...prev,
    [course]: !prev[course]
  }));
}

  
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

  {render === 'report' && (
  <div className={styles.reportContainer}>
    <div className={styles.reportHeader}>
      <p style={{ fontSize: 20 }}>Please select an internship to report</p>
      <select
        className={styles.dropdown}
        value={selectedReportInternship}
        onChange={handleInternshipSelect}
      >
        <option value="">Select Internship</option>
        {internships.map((internship, index) => (
          <option key={index} value={internship.title}>
            {internship.title}
          </option>
        ))}
      </select>
    </div>

    {selectedReportInternship && (
  <>
    <div className={styles.reportStructure}>
      <p>Title:</p>
      <textarea
      style={{height:30, width:200}}
        value={reportInputs.title}
        onChange={(e) => handleReportInputChange('title', e.target.value)}
        placeholder={reportInputs.title }
      />
      <p>Introduction:</p>
      <textarea
      style={{height:100, width:400}}
        value={reportInputs.introduction}
        onChange={(e) => handleReportInputChange('introduction', e.target.value)}
        placeholder={reportInputs.introduction }
      />
      <p >Body:</p>
      <textarea
      style={{height:250, width:600}}
        value={reportInputs.body}
        onChange={(e) => handleReportInputChange('body', e.target.value)}
        placeholder={reportInputs.body }
      />
    </div>
    <div>
      <button className={styles.submit} style={{marginRight:10}}onClick={handleSaveReport}>
        Save
      </button>
      <button className={styles.submit} onClick={handleDownloadPDF}>
      Download as PDF
      </button>
      <button className={styles.delete} onClick={handleDeleteReport}>
        Delete
      </button>
      

    </div>
    {selectedReportInternship && (
  <p>
    Report Status: {
      internships.find(internship => internship.title === selectedReportInternship)?.report?.status || 'N/A'
    }
  </p>
)}

{['rejected', 'flagged'].includes(
  internships.find(i => i.title === selectedReportInternship)?.report?.status
) && (
  <div style={{ marginTop: 20 }}>
    <p style={{ marginBottom: 5 }}>Appeal your report:</p>
    <textarea
      style={{ width: 400, height: 100 }}
      value={appealText}
      onChange={(e) => setAppealText(e.target.value)}
      placeholder="Write your appeal here..."
    />
    <div>
      <button
        className={styles.submit}
        style={{ marginTop: 10 }}
        onClick={() => {
          alert(`Appeal submitted: ${appealText}`);
          setAppealText('');
        }}
      >
        Submit Appeal
      </button>
    </div>
  </div>
)}

  </>
)}

  </div>
)}

    </div>
  )
}

export default StudentPage
