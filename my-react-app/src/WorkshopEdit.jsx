import React, { useState } from 'react';
import styles from './Form.module.css';

function WorkshopManager() {
  const [workshops, setWorkshops] = useState([
    {
      id: '1',
      name: 'Intro to React',
      description: 'Learn the basics of React.js',
      speakerBio: 'John Doe is a senior developer at TechCorp',
      agenda: 'JSX, components, props, state, hooks',
      startDateTime: '2025-05-20T10:00',
      endDateTime: '2025-05-20T12:00',
    },
    {
      id: '2',
      name: 'Advanced CSS Workshop',
      description: 'Master Flexbox, Grid and animations',
      speakerBio: 'Jane Smith, UI/UX expert from Designify',
      agenda: 'Layout techniques, responsive design, transitions',
      startDateTime: '2025-05-22T14:00',
      endDateTime: '2025-05-22T16:30',
    },
  ]);

  const initialFormState = {
    id: '',
    name: '',
    description: '',
    speakerBio: '',
    agenda: '',
    startDateTime: '',
    endDateTime: '',
  };

  const [form, setForm] = useState(initialFormState);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setWorkshops((prev) =>
        prev.map((w) => (w.id === form.id ? form : w))
      );
      alert('Workshop updated!');
    } else {
      setWorkshops((prev) => [
        ...prev,
        { ...form, id: Date.now().toString() },
      ]);
      alert('Workshop added!');
    }
    setForm(initialFormState);
    setIsEditing(false);
  };

  const handleEdit = (workshop) => {
    setForm(workshop);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this workshop?')) {
      setWorkshops((prev) => prev.filter((w) => w.id !== id));
    }
  };

  const handleCancel = () => {
    setForm(initialFormState);
    setIsEditing(false);
  };

  return (
    <div>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h2>{isEditing ? 'Edit Workshop' : 'Add Workshop'}</h2>
        {['name', 'description', 'speakerBio', 'agenda'].map((field) => (
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
        <button type="submit" className={styles.submitBtn}>
          {isEditing ? 'Update' : 'Add'}
        </button>
        {isEditing && (
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}
      </form>

      <div className={styles.workshopListContainer}>
        <h2>Existing Workshops</h2>
        {workshops.map((workshop) => (
          <div key={workshop.id} className={styles.workshopCard}>
            <h3>{workshop.name}</h3>
            <p><strong>Description:</strong> {workshop.description}</p>
            <p><strong>Speaker Bio:</strong> {workshop.speakerBio}</p>
            <p><strong>Agenda:</strong> {workshop.agenda}</p>
            <p><strong>Start:</strong> {workshop.startDateTime}</p>
            <p><strong>End:</strong> {workshop.endDateTime}</p>
            <div className={styles.cardActions}>
              <button
                className={`${styles.cardBtn}`}
                onClick={() => handleEdit(workshop)}
              >
                Edit
              </button>
              <button
                className={`${styles.cardBtn} ${styles.deleteBtn}`}
                onClick={() => handleDelete(workshop.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkshopManager;
