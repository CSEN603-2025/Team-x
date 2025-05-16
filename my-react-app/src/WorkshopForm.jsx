import React, { useState, useEffect } from "react";

export default function WorkshopForm({ workshop, onCancel, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    start: "",
    end: "",
    description: "",
    speakerBio: "",
    agenda: "",
  });

  useEffect(() => {
    if (workshop) setFormData(workshop);
  }, [workshop]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((fd) => ({ ...fd, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Workshop name is required");
      return;
    }
    onSave(formData);
  }

  return (
    <form
  onSubmit={handleSubmit}
  style={{
    maxWidth: 600,
    margin: "auto",
    textAlign: "left",
    backgroundColor: "#111",
    color: "#fff",
    padding: 20,
    borderRadius: 8,
    fontSize: "1.1rem"
  }}
>

      <div>
        <label>Workshop Name:</label><br />
        <input
  name="name"
  value={formData.name}
  onChange={handleChange}
  required
  style={{
    width: "100%",
    padding: "8px",
    marginBottom: "12px",
    fontSize: "1rem",
    borderRadius: 4,
    border: "1px solid #444",
    backgroundColor: "#222",
    color: "#fff"
  }}
/>
      </div>
      <div>
        <label>Start Date & Time:</label><br />
        <input type="datetime-local" name="start" value={formData.start} onChange={handleChange} required style={{
    width: "100%",
    padding: "8px",
    marginBottom: "12px",
    fontSize: "1rem",
    borderRadius: 4,
    border: "1px solid #444",
    backgroundColor: "#222",
    color: "#fff"
  }} />
      </div>
      <div>
        <label>End Date & Time:</label><br />
        <input type="datetime-local" name="end" value={formData.end} onChange={handleChange} required style={{
    width: "100%",
    padding: "8px",
    marginBottom: "12px",
    fontSize: "1rem",
    borderRadius: 4,
    border: "1px solid #444",
    backgroundColor: "#222",
    color: "#fff"
  }}/>
      </div>
      <div>
        <label>Short Description:</label><br />
        <textarea name="description" value={formData.description} onChange={handleChange} required rows={2} style={{
    width: "100%",
    padding: "8px",
    marginBottom: "12px",
    fontSize: "1rem",
    borderRadius: 4,
    border: "1px solid #444",
    backgroundColor: "#222",
    color: "#fff"
  }}/>
      </div>
      <div>
        <label>Speaker Bio:</label><br />
        <textarea name="speakerBio" value={formData.speakerBio} onChange={handleChange} required rows={2}style={{
    width: "100%",
    padding: "8px",
    marginBottom: "12px",
    fontSize: "1rem",
    borderRadius: 4,
    border: "1px solid #444",
    backgroundColor: "#222",
    color: "#fff"
  }} />
      </div>
      <div>
        <label>Workshop Agenda:</label><br />
        <textarea name="agenda" value={formData.agenda} onChange={handleChange} required rows={3}style={{
    width: "100%",
    padding: "8px",
    marginBottom: "12px",
    fontSize: "1rem",
    borderRadius: 4,
    border: "1px solid #444",
    backgroundColor: "#222",
    color: "#fff"
  }} />
      </div>
      <div style={{ marginTop: 10 }}>
<button
  type="submit"
  style={{
    backgroundColor: "#28a745",
    color: "white",
    padding: "10px 20px",
    fontSize: "1.1rem",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
    marginRight: "10px"
  }}
>
  Save
</button>

<button
  type="button"
  onClick={onCancel}
  style={{
    backgroundColor: "#dc3545",
    color: "white",
    padding: "10px 20px",
    fontSize: "1.1rem",
    borderRadius: 6,
    border: "none",
    cursor: "pointer"
  }}
>
  Cancel
</button>

      </div>
    </form>
  );
}
