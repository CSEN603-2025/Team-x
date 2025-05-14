import React, { useState } from 'react';
import styles from './MyCompanyProfile.module.css';

const detailedApplications = {
  'Ali Mohamed': {
    jobInterests: ['Frontend Development', 'React'],
    previousExperience: [
      {
        role: 'Web Developer Intern',
        company: 'TechCorp',
        duration: '2 months',
        responsibilities: 'Built UI components using React.'
      },
      {
        role: 'Part-time IT Support',
        company: 'LocalNet',
        duration: '6 months',
        responsibilities: 'Provided desktop support and troubleshooting.'
      }
    ],
    collegeActivities: ['Coding Club President', 'Hackathon Participant']
  },
  'Lina Hossam': {
    jobInterests: ['UX Design', 'Prototyping'],
    previousExperience: [],
    collegeActivities: ['Art Club Member']
  },
  'Youssef Nader': {
    jobInterests: ['Digital Marketing'],
    previousExperience: [],
    collegeActivities: []
  }
};

const dummyInternships = [
  {
    id: 1,
    title: 'Frontend Developer Intern',
    industry: 'Software',
    duration: '3 months',
    paid: true,
    applications: [
      {
        applicantName: 'Ali Mohamed',
        title: 'Frontend Developer Intern',
        status: 'pending'
      },
      {
        applicantName: 'Lina Hossam',
        title: 'Frontend Developer Intern',
        status: 'accepted'
      }
    ]
  },
  {
    id: 2,
    title: 'Marketing Intern',
    industry: 'Marketing',
    duration: '2 months',
    paid: false,
    applications: [
      {
        applicantName: 'Youssef Nader',
        title: 'Marketing Intern',
        status: 'finalized'
      }
    ]
  }
];

function MyCompanyProfile() {
  const [internships, setInternships] = useState(dummyInternships);
  const [expandedInternshipId, setExpandedInternshipId] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [internshipSearch, setInternshipSearch] = useState('');
  const [internshipIndustryFilter, setInternshipIndustryFilter] = useState('');
  const [applicationFilter, setApplicationFilter] = useState('');
  const [showCurrentInterns, setShowCurrentInterns] = useState(false);
  const [showCompletedInterns, setShowCompletedInterns] = useState(false);
  const [internSearch, setInternSearch] = useState('');
  const [internStatusFilter, setInternStatusFilter] = useState('');
  const [activeView, setActiveView] = useState('all'); // 'all', 'current', 'completed'
const [showAddInternForm, setShowAddInternForm] = useState(null); // stores internshipId
const [newInternData, setNewInternData] = useState({
  applicantName: '',
  title: '',
  status: 'pending',
  jobInterests: [],
  college: '',
  collegeActivities: [],
  previousExperience: []
});


  const allApplications = internships.flatMap(internship =>
    internship.applications.map(app => ({
      ...app,
      internshipTitle: internship.title,
      internshipId: internship.id
    }))
  );
  const [openMenu, setOpenMenu] = useState(null);

const toggleMenu = (applicantName) => {
  setOpenMenu(openMenu === applicantName ? null : applicantName);
};

const handleDeleteApplication = (internshipId, applicantName) => {
  const updatedInternships = internships.map(post => {
    if (post.id === internshipId) {
      return {
        ...post,
        applications: post.applications.filter(app => app.applicantName !== applicantName)
      };
    }
    return post;
  });
  setInternships(updatedInternships);
};

const handleEditApplication = (app) => {
  setSelectedApplication({
    ...app,
    internshipId: app.internshipId,
    ...detailedApplications[app.applicantName]
  });
};
const handleAddNewIntern = (internshipId) => {
  const newApp = {
    applicantName: 'New Intern',
    title: internships.find(post => post.id === internshipId).title,
    status: 'pending'
  };

  const updatedInternships = internships.map(post => {
    if (post.id === internshipId) {
      return {
        ...post,
        applications: [...post.applications, newApp]
      };
    }
    return post;
  });

  setInternships(updatedInternships);
};


  const handleStatusChange = (newStatus) => {
    if (!selectedApplication) return;

    const updatedInternships = internships.map(post => {
      if (post.id === selectedApplication.internshipId) {
        const updatedApplications = post.applications.map(app =>
          app.applicantName === selectedApplication.applicantName
            ? { ...app, status: newStatus }
            : app
        );
        return { ...post, applications: updatedApplications };
      }
      return post;
    });

    setInternships(updatedInternships);

    const updatedApp = {
      ...updatedInternships.find(p => p.id === selectedApplication.internshipId)
        .applications.find(app => app.applicantName === selectedApplication.applicantName),
      internshipId: selectedApplication.internshipId,
      ...detailedApplications[selectedApplication.applicantName]
    };

    setSelectedApplication(updatedApp);
  };
  const submitNewIntern = (internshipId) => {
  const updatedInternships = internships.map(post => {
    if (post.id === internshipId) {
      return {
        ...post,
        applications: [...post.applications, {
          applicantName: newInternData.applicantName,
          title: newInternData.title,
          status: newInternData.status,
          evaluation: '',
          ...newInternData
        }]
      };
    }
    return post;
  });

  setInternships(updatedInternships);
  detailedApplications[newInternData.applicantName] = {
    jobInterests: newInternData.jobInterests,
    previousExperience: newInternData.previousExperience,
    collegeActivities: newInternData.collegeActivities
  };

  setShowAddInternForm(null); // close the form
};


  const filteredInternships = internships.filter(post =>
    (!internshipSearch || post.title.toLowerCase().includes(internshipSearch.toLowerCase())) &&
    (!internshipIndustryFilter || post.industry === internshipIndustryFilter)
  );

  const currentInterns = allApplications.filter(app => app.status === 'current intern');
  const completedInterns = allApplications.filter(app => app.status === 'internship complete');

  const displayedInterns = (internStatusFilter === 'current intern' ? currentInterns : internStatusFilter === 'internship complete' ? completedInterns : allApplications)
    .filter(intern =>
      (!internSearch ||
        intern.applicantName.toLowerCase().includes(internSearch.toLowerCase()) ||
        intern.title.toLowerCase().includes(internSearch.toLowerCase()))
    );

  return (
   <div className={styles.container}>
  {/* Header Section */}
  <header className={styles.header}>
    <h1 className={styles.heading}>Company Dashboard</h1>
    <div className={styles.headerButtons}>
      <button className={styles.headerBtn}>Settings</button>
      <button className={styles.headerBtn}>Log Out</button>
    </div>
  </header>

  {/* Main Content Area */}
  <div className={styles.mainContent}>
    {/* Left Column */}
    <div className={styles.leftColumn}>
      {/* Filters Section */}
      <section className={styles.section}>
        <h2>Filter Internships</h2>
        <div className={styles.filterControls}>
          <input
            type="text"
            placeholder="Search by title..."
            value={internshipSearch}
            onChange={(e) => setInternshipSearch(e.target.value)}
            className={styles.input}
          />
          <select
            value={internshipIndustryFilter}
            onChange={(e) => setInternshipIndustryFilter(e.target.value)}
            className={styles.input}
          >
            <option value="">All Industries</option>
            <option value="Software">Software</option>
            <option value="Marketing">Marketing</option>
            <option value="Design">Design</option>
          </select>
        </div>
      </section>

      {/* Internship Posts Section */}
      <section className={styles.section}>
        <h2>My Internship Posts</h2>
        <div className={styles.internshipList}>
          {filteredInternships.map(post => (
            <div key={post.id} className={styles.internshipCard}>
              <div className={styles.internshipHeader}>
                <h3>{post.title}</h3>
                <span className={styles.internshipMeta}>{post.industry} • {post.duration} • {post.paid ? 'Paid' : 'Unpaid'}</span>
                <span className={styles.applicationsCount}>{post.applications.length} applications</span>
              </div>

              <div className={styles.internshipActions}>
                <button
                  onClick={() => {
                    setShowAddInternForm(post.id);
                    setNewInternData({
                      applicantName: '',
                      title: post.title,
                      status: 'pending',
                      jobInterests: [],
                      college: '',
                      collegeActivities: [],
                      previousExperience: []
                    });
                  }}
                  className={styles.button}
                >
                  Add New Intern
                </button>

                <button
                  onClick={() => setExpandedInternshipId(expandedInternshipId === post.id ? null : post.id)}
                  className={styles.button}
                >
                  {expandedInternshipId === post.id ? 'Hide' : 'View'} Applications
                </button>
              </div>

              {/* Add Intern Form */}
              {showAddInternForm === post.id && (
                <div className={styles.formSection}>
                  <input
                    type="text"
                    placeholder="Name"
                    value={newInternData.applicantName}
                    onChange={(e) => setNewInternData({ ...newInternData, applicantName: e.target.value })}
                    className={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="College"
                    value={newInternData.college}
                    onChange={(e) => setNewInternData({ ...newInternData, college: e.target.value })}
                    className={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="College Activities (comma separated)"
                    value={newInternData.collegeActivities.join(', ')}
                    onChange={(e) => setNewInternData({ ...newInternData, collegeActivities: e.target.value.split(',').map(x => x.trim()) })}
                    className={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="Job Interests (comma separated)"
                    value={newInternData.jobInterests.join(', ')}
                    onChange={(e) => setNewInternData({ ...newInternData, jobInterests: e.target.value.split(',').map(x => x.trim()) })}
                    className={styles.input}
                  />
                  <textarea
                    placeholder="Previous Experience (format: role@company@duration@responsibilities, one per line)"
                    onChange={(e) => {
                      const parsed = e.target.value
                        .split('\n')
                        .map(line => {
                          const [role, company, duration, responsibilities] = line.split('@');
                          return { role, company, duration, responsibilities };
                        });
                      setNewInternData({ ...newInternData, previousExperience: parsed });
                    }}
                    className={styles.input}
                  />
                  <button
                    onClick={() => submitNewIntern(post.id)}
                    className={styles.button}
                  >
                    Submit Intern
                  </button>
                </div>
              )}

              {/* Applications List */}
              {expandedInternshipId === post.id && (
                <div className={styles.applicationsSection}>
                  <select
                    value={applicationFilter}
                    onChange={(e) => setApplicationFilter(e.target.value)}
                    className={styles.input}
                  >
                    <option value="">All Statuses</option>
                    <option value="pending">Pending</option>
                    <option value="finalized">Finalized</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                    <option value="current intern">Current Intern</option>
                    <option value="internship complete">Internship Complete</option>
                  </select>

                  <div className={styles.applicationsList}>
                    {post.applications
                      .filter(app => !applicationFilter || app.status === applicationFilter)
                      .map((app, idx) => (
                        <div key={idx} className={styles.applicationCard}>
                          <div className={styles.applicationInfo}>
                            <span className={styles.applicantName}>{app.applicantName}</span>
                            <span className={styles.applicationStatus}>{app.status}</span>
                          </div>
                          <div className={styles.applicationActions}>
                            <button
                              onClick={() => setSelectedApplication({
                                ...app,
                                internshipId: post.id,
                                ...detailedApplications[app.applicantName]
                              })}
                              className={styles.button}
                            >
                              View Details
                            </button>
                            <div className={styles.menuContainer}>
                              <button onClick={() => toggleMenu(app.applicantName)} className={styles.menuButton}>⋯</button>
                              {openMenu === app.applicantName && (
                                <div className={styles.dropdownMenu}>
                                  <button onClick={() => handleEditApplication(app)}>Edit</button>
                                  <button onClick={() => handleDeleteApplication(post.id, app.applicantName)}>Delete</button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>

    {/* Right Column */}
    <div className={styles.rightColumn}>
      {/* Application Details Section */}
      {selectedApplication && (
        <section className={styles.section}>
          <h2>Application Details</h2>
          <div className={styles.applicationDetails}>
            <div className={styles.detailSection}>
              <h3>Basic Information</h3>
              <p><strong>Name:</strong> {selectedApplication.applicantName}</p>
              <p><strong>Status:</strong> {selectedApplication.status}</p>
            </div>

            <div className={styles.detailSection}>
              <h3>Evaluation</h3>
              <textarea
                placeholder="Write evaluation..."
                value={selectedApplication.evaluation || ''}
                onChange={(e) => {
                  const updated = { ...selectedApplication, evaluation: e.target.value };
                  setSelectedApplication(updated);
                  setInternships(internships.map(post =>
                    post.id === selectedApplication.internshipId
                      ? {
                          ...post,
                          applications: post.applications.map(app =>
                            app.applicantName === selectedApplication.applicantName
                              ? { ...app, evaluation: e.target.value }
                              : app
                          )
                        }
                      : post
                  ));
                }}
                className={styles.textarea}
              />
            </div>

            <div className={styles.detailSection}>
              <h3>Job Interests</h3>
              <ul className={styles.skillsList}>
                {selectedApplication.jobInterests?.map((interest, idx) => (
                  <li key={idx}>{interest}</li>
                ))}
              </ul>
            </div>

            <div className={styles.detailSection}>
              <h3>Previous Experience</h3>
              <ul className={styles.experienceList}>
                {selectedApplication.previousExperience?.map((exp, idx) => (
                  <li key={idx}>
                    <strong>{exp.role}</strong> at {exp.company} ({exp.duration})<br />
                    <span className={styles.responsibilities}>{exp.responsibilities}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.detailSection}>
              <h3>College Activities</h3>
              <ul className={styles.activitiesList}>
                {selectedApplication.collegeActivities?.map((activity, idx) => (
                  <li key={idx}>{activity}</li>
                ))}
              </ul>
            </div>

            <div className={styles.statusButtons}>
              <button onClick={() => handleStatusChange('finalized')} className={styles.statusButton}>Finalize</button>
              <button onClick={() => handleStatusChange('accepted')} className={styles.statusButton}>Accept</button>
              <button onClick={() => handleStatusChange('rejected')} className={styles.statusButton}>Reject</button>
              <button onClick={() => handleStatusChange('current intern')} className={styles.statusButton}>Set as Current</button>
              <button onClick={() => handleStatusChange('internship complete')} className={styles.statusButton}>Mark Complete</button>
            </div>
          </div>
        </section>
      )}

      {/* All Applications View */}
      <section className={styles.section}>
        <div className={styles.viewControls}>
          <button className={styles.viewButton} onClick={() => setActiveView('all')}>All Applications</button>
          <button className={styles.viewButton} onClick={() => setActiveView('current')}>Current Interns</button>
          <button className={styles.viewButton} onClick={() => setActiveView('completed')}>Completed</button>
        </div>

        <h2>
          {activeView === 'all' && 'All Applications'}
          {activeView === 'current' && 'Current Interns'}
          {activeView === 'completed' && 'Completed Internships'}
        </h2>

        <div className={styles.viewFilters}>
          <input
            type="text"
            placeholder="Search by name or job title..."
            value={internSearch}
            onChange={(e) => setInternSearch(e.target.value)}
            className={styles.input}
          />
          <select
            value={internStatusFilter}
            onChange={(e) => setInternStatusFilter(e.target.value)}
            className={styles.input}
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="finalized">Finalized</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
            <option value="current intern">Current Intern</option>
            <option value="internship complete">Internship Complete</option>
          </select>
        </div>

        <div className={styles.applicationsOverview}>
          {displayedInterns
            .filter(app => {
              if (activeView === 'current') return app.status === 'current intern';
              if (activeView === 'completed') return app.status === 'internship complete';
              return true;
            })
            .filter(app => {
              const search = internSearch.toLowerCase();
              return (
                !internSearch ||
                app.applicantName.toLowerCase().includes(search) ||
                app.title.toLowerCase().includes(search)
              );
            })
            .filter(app => !internStatusFilter || app.status === internStatusFilter)
            .map((app, idx) => (
              <div key={idx} className={styles.overviewCard}>
                <span className={styles.overviewName}>{app.applicantName}</span>
                <span className={styles.overviewTitle}>{app.title}</span>
                <span className={styles.overviewStatus}>{app.status}</span>
              </div>
            ))
          }
        </div>
      </section>
    </div>
  </div>
</div>);}

export default MyCompanyProfile;
