import { useState } from "react";
import styles from './Workshop.module.css'

const workshopsData = [
  {
    id: 1,
    title: "React Basics",
    tutor: "Alice Johnson",
    startDate: "2025-06-01",
    endDate: "2025-06-07",
    description: "Learn the fundamentals of React including components, state, and props.",
    location: "Online - Zoom",
    seatsAvailable: 15,
    isLive: true,
    price: "$99"
  },
  {
    id: 2,
    title: "Advanced CSS",
    tutor: "Bob Smith",
    startDate: "2025-06-10",
    endDate: "2025-06-15",
    description: "Master CSS Grid, Flexbox, and responsive design techniques.",
    location: "In-person - Room 101",
    seatsAvailable: 0,
    isLive: false,
    price: "Free"
  },
  {
    id: 3,
    title: "Node.js Introduction",
    tutor: "Carol Davis",
    startDate: "2025-07-01",
    endDate: "2025-07-05",
    description: "Get started with backend development using Node.js and Express.",
    location: "Online - Teams",
    seatsAvailable: 5,
    isLive: true,
    price: "$150"
  }
];

function Workshop() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleWorkshop = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleJoin = (title) => {
    alert(`You joined the workshop: ${title}`);
  };

  return (
    <div className={styles.mainContainer}>
      <p>Workshops</p>
      <div className={styles.WorkshopContainer}>
        {workshopsData.map(workshop => (
          <div key={workshop.id} className={styles.workshopItem}>
            <button
              className={styles.workshopTitle}
              onClick={() => toggleWorkshop(workshop.id)}
              aria-expanded={expandedId === workshop.id}
            >
              {workshop.title}{" "}
              {workshop.isLive && <span className={styles.liveLabel}>LIVE</span>}
            </button>
            {expandedId === workshop.id && (
              <div className={styles.workshopDetails}>
                <p><strong>Tutor:</strong> {workshop.tutor}</p>
                <p><strong>Start Date:</strong> {workshop.startDate}</p>
                <p><strong>End Date:</strong> {workshop.endDate}</p>
                <p><strong>Location:</strong> {workshop.location}</p>
                <p><strong>Seats Available:</strong> {workshop.seatsAvailable}</p>
                <p><strong>Price:</strong> {workshop.price}</p>
                <p><strong>Description:</strong> {workshop.description}</p>

                <button
                  className={styles.joinButton}
                  onClick={() => handleJoin(workshop.title)}
                  disabled={workshop.seatsAvailable === 0}
                >
                  {workshop.seatsAvailable === 0 ? "Full" : "Register"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workshop;
