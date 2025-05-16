import React, { useState } from 'react';
import styles from './JobPostManager.module.css';
import GUCLogo from './assets/GUC-logo.png';

function JobPostManager() {
  const [posts, setPosts] = useState([
    {
      duration: '3 months',
      paid: true,
      salary: '1000 USD',
      skills: 'React, Node.js',
      description: 'Frontend and backend development for internal tools.',
    },
    {
      duration: '6 weeks',
      paid: false,
      salary: '',
      skills: 'Python, Data Analysis',
      description: 'Assist in analyzing marketing data using pandas and Jupyter.',
    },
    {
      duration: '2 months',
      paid: true,
      salary: '500 USD',
      skills: 'UI/UX, Figma',
      description: 'Design user-friendly mobile interfaces for our new app.',
    }
  ]);

  const [form, setForm] = useState({
    duration: '',
    paid: false,
    salary: '',
    skills: '',
    description: '',
  });

  const [menuIndex, setMenuIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

    const handleSubmit = () => {
  const { duration, paid, salary, skills, description } = form;

  // Validation
  if (
    !duration.trim() ||
    !skills.trim() ||
    !description.trim() ||
    (paid && !salary.trim())
  ) {
    alert("Please fill in all required fields.");
    return;
  }

  if (editingIndex !== null) {
    const updated = [...posts];
    updated[editingIndex] = form;
    setPosts(updated);
    setEditingIndex(null);
  } else {
    setPosts([...posts, form]);
  }

  setForm({
    duration: '',
    paid: false,
    salary: '',
    skills: '',
    description: '',
  });
};
  

  const handleRead = (index) => {
    alert(JSON.stringify(posts[index], null, 2));
    setMenuIndex(null);
  };

  const handleEdit = (index) => {
    setForm(posts[index]);
    setEditingIndex(index);
    setMenuIndex(null);
  };

  const handleDelete = (index) => {
    const updated = posts.filter((_, i) => i !== index);
    setPosts(updated);
    setMenuIndex(null);
  };

  return (
 <> <header className={styles.header}>
  <img src={GUCLogo} alt="GUC Logo" className={styles.siteLogo} />
  <div className={styles.headerButtons}>
    <button className={styles.headerBtn} onClick={() => alert('Account details placeholder')}>
      Account
    </button>
    <button className={styles.headerBtn} onClick={() => alert('Logged out placeholder')}>
      Log Out
    </button>
  </div>
</header>


    <div className={styles.container}>
      <div className={styles.formCard}>
        <h1>company name internship</h1>
        <h2>Internship Post</h2>
        <input
          className={styles.input}
          name="duration"
          value={form.duration}
          onChange={handleChange}
          placeholder="Duration"
        />
<div className={styles.checkboxContainer}>
  <label className={styles.checkboxLabel}>
    <input
      type="checkbox"
      name="paid"
      checked={form.paid}
      onChange={handleChange}
    />
    Paid
  </label>
</div>

        <input
  className={`${styles.input} ${!form.paid ? styles.hidden : ''}`}
  name="salary"
  value={form.salary}
  onChange={handleChange}
  placeholder="Expected Salary"
/>

        <input
          className={styles.input}
          name="skills"
          value={form.skills}
          onChange={handleChange}
          placeholder="Skills Required"
        />
        <textarea
          className={styles.input}
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Job Description"
        />
        <button className={styles.button1} onClick={handleSubmit}>
          {editingIndex !== null ? 'Update Post' : 'Create Post'}
        </button>
      </div>

      <div className={styles.postList}>
        {posts.map((post, index) => (
          <div key={index} className={styles.postItem}>
            <button className={styles.postButton} onClick={() => handleRead(index)}>
              <strong>{post.skills}</strong> - {post.duration}
            </button>
            <div className={styles.menuWrapper}>
              <span
                className={styles.menuTrigger}
                onClick={() => setMenuIndex(menuIndex === index ? null : index)}
              >
                ...
              </span>
              {menuIndex === index && (
                <div className={styles.dropdown}>
                  <button onClick={() => handleRead(index)}>Read</button>
                  <button onClick={() => handleEdit(index)}>Update</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div></>
  );
}

export default JobPostManager;
