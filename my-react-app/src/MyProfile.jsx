import React, { useState } from 'react';
import styles from './MyProfile.module.css';
import GUCLogo from './assets/GUC-logo.png';

const dummyInternships = [
  {
    id: 1,
    title: 'Frontend Intern',
    company: 'TechCorp',
    industry: 'Software',
    duration: '3 months',
    paid: true,
    salary: '1000 USD',
    skills: 'React, JavaScript, HTML',
    description: 'Work on frontend UI features and design.',
  },
  {
    id: 2,
    title: 'Marketing Analyst Intern',
    company: 'MarketMinds',
    industry: 'Marketing',
    duration: '2 months',
    paid: false,
    salary: '',
    skills: 'Excel, Google Analytics',
    description: 'Assist in market trend analysis.',
  },
  {
    id: 3,
    title: 'UX Designer Intern',
    company: 'Designify',
    industry: 'Design',
    duration: '3 months',
    paid: true,
    salary: '800 USD',
    skills: 'Figma, Adobe XD',
    description: 'Create and improve UI/UX wireframes.',
  },
];

function MyProfile() {
  const [profile, setProfile] = useState({
    jobInterests: 'Full-stack web development, UI/UX design, and data analytics.',
    internships: `• Frontend Developer Intern at TechNova Inc. (June - August 2023)\n  - Built reusable components with React\n  - Collaborated in Agile sprints with UI/UX team\n\n• Data Analyst Intern at MarketSolve (Jan - Feb 2024)\n  - Cleaned and visualized sales data using Python and Power BI`,
    partTimeJobs: `• Barista at CoffeeZone (Sep 2022 - Jan 2023)\n  - Handled cash and digital transactions\n  - Trained new staff on POS system\n\n• Freelance Graphic Designer (2021 - present)\n  - Designed logos and social media content for startups`,
    collegeActivities: `• Organizer - GUC Hackathon 2023\n• Member - Student Developers Club\n• Volunteer - Annual Career Fair & Blood Donation Camp`
  });

  const [selectedInternship, setSelectedInternship] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [editing, setEditing] = useState(false);
  const [showMajors, setShowMajors] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [showInternships, setShowInternships] = useState(false);
  const [industryFilter, setIndustryFilter] = useState('');
  const [durationFilter, setDurationFilter] = useState('');
  const [paidFilter, setPaidFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedInternships, setAppliedInternships] = useState([]);
  const [showMyInternships, setShowMyInternships] = useState(false);

  const majors = ['Computer Science', 'Multimedia Design', 'Business Informatics', 'Digital Media Engineering'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setEditing(false);
    alert('Profile saved!');
  };

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <img src={GUCLogo} alt="GUC Logo" className={styles.logo} />
        <div className={styles.headerButtons}>
          <button className={styles.headerBtn}>Account</button>
          <button className={styles.headerBtn}>Log Out</button>
        </div>
      </header>

      <div className={styles.profileContainer}>
        <h1 className={styles.centeredHeader}>My Profile</h1>

        <div className={styles.section}>
          <label>Job Interests:</label>
          {editing ? (
            <textarea name="jobInterests" value={profile.jobInterests} onChange={handleChange} className={styles.textarea} />
          ) : (
            <p>{profile.jobInterests}</p>
          )}
        </div>

        <div className={styles.section}>
          <label>Previous Internships:</label>
          {editing ? (
            <textarea name="internships" value={profile.internships} onChange={handleChange} className={styles.textarea} />
          ) : (
            <pre>{profile.internships}</pre>
          )}
        </div>

        <div className={styles.section}>
          <label>Part-Time Jobs:</label>
          {editing ? (
            <textarea name="partTimeJobs" value={profile.partTimeJobs} onChange={handleChange} className={styles.textarea} />
          ) : (
            <pre>{profile.partTimeJobs}</pre>
          )}
        </div>

        <div className={styles.section}>
          <label>College Activities:</label>
          {editing ? (
            <textarea name="collegeActivities" value={profile.collegeActivities} onChange={handleChange} className={styles.textarea} />
          ) : (
            <pre>{profile.collegeActivities}</pre>
          )}
        </div>

        {editing && (
          <div className={styles.section}>
            <label><strong>Upload Supporting Documents (PDFs only):</strong></label>
            <input
              type="file"
              accept=".pdf"
              multiple
              onChange={(e) => setUploadedFiles(Array.from(e.target.files))}
              className={styles.input}
            />
            {uploadedFiles.length > 0 && (
              <ul className={styles.list}>
                {uploadedFiles.map((file, index) => (
                  <li key={index} className={styles.listItem}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        <button onClick={() => editing ? handleSave() : setEditing(true)} className={styles.primaryButton}>
          {editing ? 'Save' : 'Edit Profile'}
        </button>

        <div className={styles.section}>
          <button onClick={() => setShowMyInternships(prev => !prev)} className={styles.primaryButton}>
            {showMyInternships ? 'Hide My Internships' : 'View My Internships'}
          </button>

          {showMyInternships && (
            <ul className={styles.list}>
              {appliedInternships.length === 0 ? (
                <li className={styles.listItem}>You haven’t applied to any internships yet.</li>
              ) : (
                appliedInternships.map((app, idx) => (
                  <li key={idx} className={styles.listItem}>
                    <strong>{app.title}</strong> at {app.company} — <em>Status: {app.status}</em>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>

        <hr />

        <div className={styles.section}>
          <button onClick={() => setShowMajors(prev => !prev)} className={styles.primaryButton}>
            {showMajors ? 'Hide Majors' : 'Select Major & Semester'}
          </button>
          {showMajors && (
            <div>
              <label>Select Major:</label>
              <select value={selectedMajor} onChange={(e) => setSelectedMajor(e.target.value)} className={styles.select}>
                <option value="">--Select--</option>
                {majors.map((major, index) => (
                  <option key={index} value={major}>{major}</option>
                ))}
              </select>

              <label>Select Semester:</label>
              <select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)} className={styles.select}>
                <option value="">--Select--</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>

              <label>Search Internships:</label>
              <input
                type="text"
                placeholder="Search by job title or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.input}
              />

              <label>Industry:</label>
              <select value={industryFilter} onChange={(e) => setIndustryFilter(e.target.value)} className={styles.select}>
                <option value="">All</option>
                <option value="Software">Software</option>
                <option value="Marketing">Marketing</option>
                <option value="Design">Design</option>
              </select>

              <label>Duration:</label>
              <select value={durationFilter} onChange={(e) => setDurationFilter(e.target.value)} className={styles.select}>
                <option value="">All</option>
                <option value="2 months">2 months</option>
                <option value="3 months">3 months</option>
              </select>

              <label>Paid:</label>
              <select value={paidFilter} onChange={(e) => setPaidFilter(e.target.value)} className={styles.select}>
                <option value="">All</option>
                <option value="true">Paid</option>
                <option value="false">Unpaid</option>
              </select>
            </div>
          )}
        </div>

        <div className={styles.section}>
          <button onClick={() => setShowInternships(prev => !prev)} className={styles.primaryButton}>
            {showInternships ? 'Hide Internships' : 'View Available Internships in SCAD'}
          </button>

          {showInternships && (
            <div>
              <h4 className={styles.centeredHeader}>Filtered Internships:</h4>
              <ul className={styles.list}>
                {dummyInternships
                  .filter(intern =>
                    (!industryFilter || intern.industry === industryFilter) &&
                    (!durationFilter || intern.duration === durationFilter) &&
                    (paidFilter === '' || intern.paid === (paidFilter === 'true')) &&
                    (!searchQuery || intern.title.toLowerCase().includes(searchQuery.toLowerCase()) || intern.company.toLowerCase().includes(searchQuery.toLowerCase()))
                  )
                  .map(intern => (
                    <li key={intern.id} className={`${styles.listItem} ${styles.internshipCard}`}>
                      <strong>{intern.title}</strong> at <strong>{intern.company}</strong><br />
                      <em>{intern.industry}</em> | {intern.duration} | {intern.paid ? `Paid (${intern.salary})` : 'Unpaid'}<br />
                      <strong>Skills:</strong> {intern.skills}<br />
                      <strong>Description:</strong> {intern.description}<br />
                      <button onClick={() => setSelectedInternship(intern)} className={styles.primaryButton}>
                        {selectedInternship?.id === intern.id ? 'Selected' : 'Select'}
                      </button>
                    </li>
                  ))}
              </ul>

              <button
                onClick={() => {
                  if (!selectedInternship) {
                    alert("Please select an internship before applying.");
                    return;
                  }
                  const alreadyApplied = appliedInternships.some(app => app.id === selectedInternship.id);
                  if (alreadyApplied) {
                    alert("You have already applied to this internship.");
                    return;
                  }
                  const status = "pending";
                  setAppliedInternships(prev => [...prev, { ...selectedInternship, status }]);
                  alert("Application submitted!");
                }}
                className={styles.primaryButton}
              >
                Apply Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
