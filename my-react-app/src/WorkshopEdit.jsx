// WorkshopEdit.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './Form.css';

function WorkshopEdit() {
  const [form, setForm] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/api/workshops/${id}`)
      .then(res => {
        const w = res.data;
        setForm({
          ...w,
          startDateTime: new Date(w.startDateTime).toISOString().slice(0, 16),
          endDateTime: new Date(w.endDateTime).toISOString().slice(0, 16),
        });
      });
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.put(`http://localhost:3000/api/workshops/${id}`, form);
    navigate('/');
  };

  if (!form) return <p>Loading...</p>;

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Edit Workshop</h2>
      {['name', 'description', 'speakerBio', 'agenda'].map(field => (
        <div key={field} className="form-group">
          <label>{field}</label>
          <input name={field} value={form[field]} onChange={handleChange} required />
        </div>
      ))}
      <div className="form-group">
        <label>Start Date & Time</label>
        <input type="datetime-local" name="startDateTime" value={form.startDateTime} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>End Date & Time</label>
        <input type="datetime-local" name="endDateTime" value={form.endDateTime} onChange={handleChange} required />
      </div>
      <button type="submit" className="submit-btn">Update</button>
    </form>
  );
}

export default WorkshopEdit;
