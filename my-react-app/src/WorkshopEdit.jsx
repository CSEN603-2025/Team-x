// WorkshopEdit.jsx
import React, { useEffect, useState } from 'react';
import styles from './Form.module.css';

function WorkshopEdit() {
  const [form, setForm] = useState(null);

  // Simulated prop or predefined "workshop to edit"
  const workshopToEdit = {
    id: '1',
    name: 'Intro to React',
    description: 'Learn the basics of React.js',
    speakerBio: 'John Doe is a senior developer at TechCorp',
    agenda: 'JSX, components, props, state, hooks',
    startDateTime: '2025-05-20T10:00',
    endDateTime: '2025-05-20T12:00',
  };

  useEffect(() => {
    // Load the workshop data into form state
    setForm(workshopToEdit);
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Updated Workshop:', form);
    alert('Workshop updated (frontend only)!');
  };

  if (!form) return <p>Loading form...</p>;

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h2>Edit Workshop</h2>
      {['name', 'description', 'speakerBio', 'agenda'].map(field => (
        <div key={field} className={styles.formGroup}>
          <label>{field}</label>
          <input
            name={field}
            value={form[field]}
            onChange={handleChange}
            required
          />
        </div>
      ))}
      <div className={styles.formGroup}>
        <label>Start Date & Time</label>
        <input
          type="datetime-local"
          name="startDateTime"
          value={form.startDateTime}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label>End Date & Time</label>
        <input
          type="datetime-local"
          name="endDateTime"
          value={form.endDateTime}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className={styles.submitBtn}>Update</button>
    </form>
  );
}

export default WorkshopEdit;
