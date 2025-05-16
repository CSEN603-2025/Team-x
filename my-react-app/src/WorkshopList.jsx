import React from "react";


export default function WorkshopList({ workshops, onEdit, onDelete }) {
  if (workshops.length === 0) {
    return <p>No workshops yet.</p>;
  }

  return (
    <table
  border="1"
  cellPadding="8"
  style={{
    margin: "20px auto",
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#111",  // dark background for table
    color: "#eee",            // light text
    fontSize: "1.1rem"        // bigger font
  }}
>

      <thead>
        <tr>
          <th>Name</th>
          <th>Start</th>
          <th>End</th>
          <th>Description</th>
          <th>Speaker Bio</th>
          <th>Agenda</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {workshops.map((w) => (
          <tr key={w.id}>
            <td>{w.name}</td>
            <td>{w.start}</td>
            <td>{w.end}</td>
            <td>{w.description}</td>
            <td>{w.speakerBio}</td>
            <td>{w.agenda}</td>
            <td>
              <button onClick={() => onEdit(w)}  style={{
    backgroundColor: "#1e90ff",
    color: "white",
    padding: "8px 10px",
    fontSize: "1.1rem",
    borderRadius: 6,
    border: "none",
    cursor: "pointer"
  }}>Edit</button>{" "}
              <button onClick={() => onDelete(w.id)}  style={{
    backgroundColor: "#1e90ff",
    color: "white",
    padding: "8px 10px",
    fontSize: "1.1rem",
    borderRadius: 6,
    border: "none",
    cursor: "pointer"
  }}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
