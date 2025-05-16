import { useState } from "react";
import styles from './WorkshopRecording.module.css';
const recordings = [
    {
      id: 1,
      title: "Intro to React & JSX",
      youtubeId: "EgjljI7d5J4"  
    },
    {
      id: 2,
      title: "React Components & Props",
      youtubeId: "Oe4Ic7fHWf8"  
    },
    {
      id: 3,
      title: "React State & Hooks",
      youtubeId: "KqZm3c1O-eU"  
    }
  ];
  
  

function WorkshopRecording() {

  const [selectedVideo, setSelectedVideo] = useState(recordings[0]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [notes, setNotes] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const renderStars = () => {
    return [...Array(5)].map((_, index) => {
      const starValue = index + 1;
      return (
        <span
          key={index}
          className={starValue <= (hoverRating || rating) ? styles.starFilled : styles.starEmpty}
          onClick={() => setRating(starValue)}
          onMouseEnter={() => setHoverRating(starValue)}
          onMouseLeave={() => setHoverRating(0)}
        >
          ★
        </span>
      );
    });
  };

  return (
    <>
      <p className={styles.title}>React Basics</p>
      <div className={styles.mainContainer}>
        <div className={styles.videoList}>
          {recordings.map(video => (
            <button
              key={video.id}
              onClick={() => {
                setSelectedVideo(video);
                setRating(0);
                setHoverRating(0);
                setFeedback("");
                setNotes("");
              }}
              className={`${styles.videoButton} ${selectedVideo.id === video.id ? styles.active : ''}`}
            >
              {video.title}
            </button>
          ))}
          {isChatOpen ? (
  <div className={styles.chatContainer}>
    <button 
      className={styles.closeChat}
      onClick={() => setIsChatOpen(false)}
    >
      X
    </button>
    <div className={styles.chatSpace}></div>
    <div className={styles.sendMessage}>
      <textarea placeholder='Send a message' className={styles.textMsg}></textarea>
      <button className={styles.send}>send</button>
    </div>
  </div>
) : (
  <button className={styles.send} onClick={() => setIsChatOpen(true)}>
    💬
  </button>
)}


        </div>

        <div className={styles.videoContainer}>
          <video key={selectedVideo.id} controls className={styles.videoPlayer}>
            <source src={selectedVideo.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className={styles.feedbackSection}>
            <div className={styles.ratingBlock}>
              <label><strong>Rate this workshop:</strong></label>
              <div className={styles.stars}>{renderStars()}</div>
            </div>

            <div className={styles.feedbackBlock}>
              <label><strong>Feedback:</strong></label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="What did you think of this workshop?"
                className={styles.textArea}
              />
            </div>

            <div className={styles.notesBlock}>
              <label><strong>My Notes:</strong></label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Write your notes here..."
                className={styles.textArea}
              />
              <button>Apply for certificate</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WorkshopRecording;
