import React, { useState } from 'react';
import styles from './ScadOffice.module.css';

function ScadOffice() {
  // Dummy data
  const initialStudents = [
    { id: 1, name: 'John Doe', internshipStatus: 'completed', major: 'Computer Science', profile: { email: 'john@example.com', phone: '123-456-7890' } },
    { id: 2, name: 'Jane Smith', internshipStatus: 'current', major: 'Marketing', profile: { email: 'jane@example.com', phone: '987-654-3210' } },
    { id: 3, name: 'Ali Mohamed', internshipStatus: 'pending', major: 'Design', profile: { email: 'ali@example.com', phone: '555-555-5555' } }
  ];

  const initialReports = [
    {
      id: 101,
      studentId: 1,
      major: 'Computer Science',
      status: 'pending',
      company: 'TechCorp',
      supervisor: 'Alice Johnson',
      startDate: '2025-01-10',
      endDate: '2025-04-10',
      content: 'Completed front-end module...',
      evaluation: 'Great progress, proactive.',
      clarification: '' // Added clarification field
    },
    {
      id: 102,
      studentId: 2,
      major: 'Marketing',
      status: 'flagged',
      company: 'MarketMinds',
      supervisor: 'Bob Lee',
      startDate: '2025-02-01',
      endDate: '2025-05-01',
      content: 'Developed social media campaign...',
      evaluation: 'Needs better time management.',
      clarification: 'Report lacks specific metrics for campaign performance.' // Example clarification
    }
  ];

  // State hooks
  const [students] = useState(initialStudents);
  const [reports, setReports] = useState(initialReports);
  const [clarificationText, setClarificationText] = useState('');

  const [studentStatusFilter, setStudentStatusFilter] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const [reportMajorFilter, setReportMajorFilter] = useState('');
  const [reportStatusFilter, setReportStatusFilter] = useState('');
  const [selectedReportId, setSelectedReportId] = useState(null);

  // Filtered lists
  const filteredStudents = students.filter(s =>
    (!studentStatusFilter || s.internshipStatus === studentStatusFilter)
  );

  const filteredReports = reports.filter(r =>
    (!reportMajorFilter || r.major === reportMajorFilter) &&
    (!reportStatusFilter || r.status === reportStatusFilter)
  );

  // Selected entities
  const selectedStudent = students.find(s => s.id === selectedStudentId);
  const selectedReport = reports.find(r => r.id === selectedReportId);

  // Handlers
  const handleReportStatusChange = (newStatus) => {
    if (!selectedReportId) return;
    setReports(reports.map(r =>
      r.id === selectedReportId ? { 
        ...r, 
        status: newStatus,
        clarification: newStatus === 'flagged' || newStatus === 'rejected' ? clarificationText : r.clarification
      } : r
    ));
    setClarificationText(''); // Clear the input after submission
  };

 return (
  <div className={styles.container}>
    {/* Header with buttons */}
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1 className={styles.title}>SCAD Office Dashboard</h1>
        <div className={styles.headerButtons}>
          <button className={styles.headerBtn}>Settings</button>
          <button className={styles.headerBtn}>Log Out</button>
        </div>
      </div>
    </header>

    {/* Main content area with grid layout */}
    <main className={styles.mainContent}>
      {/* Left column - Students */}
      <section className={`${styles.section} ${styles.studentsSection}`}>
        <div className={styles.sectionHeader}>
          <h2>All Students</h2>
          <div className={styles.filters}>
            <select
              value={studentStatusFilter}
              onChange={e => setStudentStatusFilter(e.target.value)}
              className={styles.input}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="current">Current</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        <div className={styles.scrollableContent}>
          <ul className={styles.list}>
            {filteredStudents.map(s => (
              <li key={s.id} className={styles.listItem}>
                <span>{s.name} ({s.major})</span>
                <section>
               <button 
                onClick={() => {
                  setSelectedStudentId(s.id);
                  setSelectedReportId(null); // Clear selected report
                }} 
                className={styles.button1}
              >
                View Profile
              </button>
                </section>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Middle column - Reports */}
      <section className={`${styles.section} ${styles.reportsSection}`}>
        <div className={styles.sectionHeader}>
          <h2>Submitted Reports</h2>
          <div className={styles.filters}>
            <select
              value={reportMajorFilter}
              onChange={e => setReportMajorFilter(e.target.value)}
              className={styles.input}
            >
              <option value="">All Majors</option>
              {[...new Set(reports.map(r => r.major))].map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <select
              value={reportStatusFilter}
              onChange={e => setReportStatusFilter(e.target.value)}
              className={styles.input}
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="flagged">Flagged</option>
              <option value="rejected">Rejected</option>
              <option value="accepted">Accepted</option>
            </select>
          </div>
        </div>
        <div className={styles.scrollableContent}>
          <ul className={styles.list}>
            {filteredReports.map(r => (
              <li key={r.id} className={styles.listItem}>
                <span>Report #{r.id} ({r.major})</span>
                <section>
               <button 
                onClick={() => {
                  setSelectedReportId(r.id);
                  setSelectedStudentId(null); // Clear selected student
                }} 
                className={styles.button1}
              >
                View Report
              </button>
</section>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Right column - Details */}
      <section className={`${styles.section} ${styles.detailsSection}`}>
        {/* Student Profile */}
        {selectedStudent && (
          <div className={styles.detailCard}>
            <h2>Student Profile</h2>
            <div className={styles.details}>
              <p><strong>Name:</strong> {selectedStudent.name}</p>
              <p><strong>Major:</strong> {selectedStudent.major}</p>
              <p><strong>Status:</strong> {selectedStudent.internshipStatus}</p>
              <p><strong>Email:</strong> {selectedStudent.profile.email}</p>
              <p><strong>Phone:</strong> {selectedStudent.profile.phone}</p>
            </div>
          </div>
        )}

        {/* Report Details */}
        <section className={`${styles.section} ${styles.detailsSection}`}>
       <div className={styles.scrollableDetailsWrapper}>
        {selectedReport && (
          <div className={styles.detailCard}>
            <h2>Report Details</h2>
            <div className={styles.scrollableEvaluation}>
  <div className={styles.details}>
    <p><strong>Student:</strong> {students.find(s => s.id === selectedReport.studentId)?.name}</p>
    <p><strong>Company:</strong> {selectedReport.company}</p>
    <p><strong>Main Supervisor:</strong> {selectedReport.supervisor}</p>
    <p><strong>Internship Dates:</strong> {selectedReport.startDate} to {selectedReport.endDate}</p>
    <h3>Evaluation</h3>
    <p>{selectedReport.evaluation}</p>
  </div>


              {(selectedReport.status === 'flagged' || selectedReport.status === 'rejected') && (
                <div className={styles.clarification}>
                  <h3>Clarification:</h3>
                  <p>{selectedReport.clarification}</p>
                </div>
              )}
              
              <div className={styles.statusSection}>
                <h3>Review Report</h3>
                <textarea
                  value={clarificationText}
                  onChange={(e) => setClarificationText(e.target.value)}
                  placeholder="Provide clarification for flagging/rejecting..."
                  className={styles.clarificationInput}
                  disabled={selectedReport.status === 'accepted'}
                />
                <div className={styles.statusButtons}>
                  <button 
                    onClick={() => handleReportStatusChange('flagged')} 
                    className={styles.button}
                  >
                    Flag
                  </button>
                  <button 
                    onClick={() => handleReportStatusChange('rejected')} 
                    className={styles.button}
                  >
                    Reject
                  </button>
                  <button 
                    onClick={() => handleReportStatusChange('accepted')} 
                    className={styles.button}
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          
       </div> )}

        {/* Evaluation Report */}
        {selectedReport && (
          <div className={styles.detailCard}>
            <h2>Evaluation Report</h2>
            <div className={styles.details}>
              <p><strong>Student:</strong> {students.find(s => s.id === selectedReport.studentId)?.name}</p>
              <p><strong>Company:</strong> {selectedReport.company}</p>
              <p><strong>Main Supervisor:</strong> {selectedReport.supervisor}</p>
              <p><strong>Internship Dates:</strong> {selectedReport.startDate} to {selectedReport.endDate}</p>
              <h3>Evaluation</h3>
              <p>{selectedReport.evaluation}</p>
            </div>
          </div>
          
        )}</div>
      </section>
      
      </section>
    </main>
  </div>
);
}

export default ScadOffice;  