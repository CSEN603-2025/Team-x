import React, { useState } from "react";
import WorkshopList from "./WorkshopList";
import WorkshopForm from "./WorkshopForm";

export default function SCADOfficeApp() {
  const [workshops, setWorkshops] = useState([]);
  const [mode, setMode] = useState("list"); // "list", "add", "edit"
  const [editWorkshop, setEditWorkshop] = useState(null);

  function addWorkshop(workshop) {
    setWorkshops([...workshops, { ...workshop, id: Date.now() }]);
    setMode("list");
  }

  function updateWorkshop(updatedWorkshop) {
    setWorkshops(
      workshops.map((w) => (w.id === updatedWorkshop.id ? updatedWorkshop : w))
    );
    setMode("list");
    setEditWorkshop(null);
  }

  function deleteWorkshop(id) {
    setWorkshops(workshops.filter((w) => w.id !== id));
  }

  function startEdit(workshop) {
    setEditWorkshop(workshop);
    setMode("edit");
  }

  return (
<div style={{ 
  maxWidth: 800, 
  margin: "auto", 
  padding: 20, 
  textAlign: "center",
  backgroundColor: "#000",       // add black background
  color: "#fff",                 // white text
  fontSize: "1.2rem",            // make text bigger
  borderRadius: 10,              // optional, rounded corners for nicer look
  boxShadow: "0 0 15px #444"    // subtle shadow
}}>

      <h1>SCAD Office Workshops</h1>
      {mode === "list" && (
        <>
          <button
  onClick={() => setMode("add")}
  style={{
    backgroundColor: "#1e90ff",  // cooler blue
    border: "none",
    color: "white",
    padding: "12px 24px",
    fontSize: "1.2rem",
    cursor: "pointer",
    borderRadius: "8px",
    margin: "20px 0"
  }}
>
  Add Workshop
</button>

          <WorkshopList
            workshops={workshops}
            onEdit={startEdit}
            onDelete={deleteWorkshop}
          />
        </>
      )}
      {(mode === "add" || mode === "edit") && (
        <WorkshopForm
          workshop={mode === "edit" ? editWorkshop : null}
          onCancel={() => {
            setMode("list");
            setEditWorkshop(null);
          }}
          onSave={mode === "add" ? addWorkshop : updateWorkshop}
        />
      )}
    </div>
  );
}
