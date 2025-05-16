import React, { useState, useEffect, useRef } from 'react';
import styles from './StudentCall.module.css';

const StudentCall = () => {
  const [incomingCall, setIncomingCall] = useState(false);
  const [inCall, setInCall] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
const [userToCheck, setUserToCheck] = useState('');
const [onlineStatus, setOnlineStatus] = useState('');

const [isSharingScreen, setIsSharingScreen] = useState(false);
const screenStreamRef = useRef(null);


  const localVideoRef = useRef(null);
  const localStreamRef = useRef(null);

  const [mockAppointments, setMockAppointments] = useState([
  {
    id: 1,
    name: "John Doe",
    purpose: "Discuss Internship Opportunities",
    datetime: "2025-05-20 10:00 AM",
    status: "Pending",
  },
  {
    id: 2,
    name: "Sarah Smith",
    purpose: "Project Review Meeting",
    datetime: "2025-05-21 2:00 PM",
    status: "Pending",
  },
  // Add more if needed
]);

const getStatusColor = (status) => {
  switch (status) {
    case "Accepted":
      return "green";
    case "Rejected":
      return "red";
    case "Pending":
      return "orange";
    default:
      return "gray";
  }
};

const handleAppointmentAction = (id, action) => {
  const updated = mockAppointments.map((appointment) =>
    appointment.id === id ? { ...appointment, status: action } : appointment
  );
  setMockAppointments(updated);
  alert(`Appointment ${action.toLowerCase()}!`);
};



const handleShareScreen = async () => {
  try {
    if (!isSharingScreen) {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true
      });
      screenStreamRef.current = screenStream;

      // Replace local video feed with screen share
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = screenStream;
      }

      setIsSharingScreen(true);

      // Stop sharing when user stops screen manually
      screenStream.getVideoTracks()[0].addEventListener("ended", () => {
        stopShareScreen();
      });
    } else {
      stopShareScreen();
    }
  } catch (err) {
    console.error("Error sharing screen:", err);
  }
};

const stopShareScreen = () => {
  if (screenStreamRef.current) {
    screenStreamRef.current.getTracks().forEach((track) => track.stop());
    screenStreamRef.current = null;
  }

  // Restore camera feed
  if (localStreamRef.current && localVideoRef.current) {
    localVideoRef.current.srcObject = localStreamRef.current;
  }

  setIsSharingScreen(false);
};


const handleCheckOnline = () => {
  if (userToCheck.trim() === '') {
    setOnlineStatus('Please enter a user ID');
    return;
  }

  // Simulate a response (replace with real logic later)
  const isOnline = Math.random() > 0.5;
  setOnlineStatus(isOnline ? '🟢 User is online' : '⚫ User is offline');
};

  // Simulate incoming call randomly
  useEffect(() => {
    const timer = setTimeout(() => setIncomingCall(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleAcceptCall = async () => {
    console.log("Attempting to accept call...");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      localStreamRef.current = stream;
      setIncomingCall(false);
      setInCall(true);

      // Delay assigning to video element until it's rendered
      setTimeout(() => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (error) {
  if (error.name === 'NotAllowedError') {
    alert("Access denied: Please allow camera and microphone.");
  } else if (error.name === 'NotFoundError') {
    alert("No camera/microphone found.");
  } else {
    alert("Unexpected error: " + error.message);
  }
}

  };

  const handleRejectCall = () => {
    setIncomingCall(false);
  };

  const leaveCall = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    setInCall(false);
    setVideoEnabled(true);
    setMicEnabled(true);
  };

  const toggleVideo = () => {
    const videoTrack = localStreamRef.current?.getTracks().find((t) => t.kind === 'video');
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setVideoEnabled(videoTrack.enabled);
    }
  };

  const toggleMic = () => {
    const audioTrack = localStreamRef.current?.getTracks().find((t) => t.kind === 'audio');
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setMicEnabled(audioTrack.enabled);
    }
  };

  return (
     
    <div className={styles.callContainer}>
      
      <div className={styles.actionPanel}>
        
  <div className={styles.row}>
    
<div className={styles.container} >
  <h2 style={{ marginBottom: '10px' }}>My Appointments</h2>
  <div >
    {mockAppointments.map((appointment) => (
      <div key={appointment.id} style={{
        minWidth: '250px',
        backgroundColor: '#2a2a2a',
        padding: '15px',
        borderRadius: '8px',
        flexShrink: 0,
        border: '1px solid #444'
      }}>
        <strong>{appointment.name}</strong><br />
        {appointment.purpose}<br />
        📅 {appointment.datetime}<br />
        Status: <span style={{ color: getStatusColor(appointment.status) }}>{appointment.status}</span><br />
        <button
          onClick={() => handleAppointmentAction(appointment.id, 'Accepted')}
          style={{
           marginTop: '10px',
  marginRight: 'auto', // 👈 pushes the button to the left
  padding: '6px 12px',
  backgroundColor: 'green',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  display: 'block' // o
          }}
        >
          Accept
        </button>
        <button
          onClick={() => handleAppointmentAction(appointment.id, 'Rejected')}
          style={{
            marginTop: '10px',
            padding: '6px 12px',
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Reject
        </button>
      </div>
    ))}
  </div>
</div>

   
  </div>

  <div className={styles.row}>
    <label className={styles.checkboxLabel}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={notificationsEnabled}
        onChange={(e) => setNotificationsEnabled(e.target.checked)}
      />
      Receive notification when the SCAD Officer/Student accepts
    </label>
  </div>

  <div className={styles.row}>
    <input
      type="text"
      placeholder="Enter appointment user ID"
      value={userToCheck}
      onChange={(e) => setUserToCheck(e.target.value)}
      className={styles.input}
    />
    <button className={styles.checkButton} onClick={handleCheckOnline}>
      Check if User is Online
    </button>
    {onlineStatus && <span className={styles.status}>{onlineStatus}</span>}
  </div>
</div>

    {!inCall && incomingCall && (
    <>
      

      <div className={styles.incoming}>
        <p>📞 Incoming call...</p>
        <button onClick={handleAcceptCall} className={styles.accept}>Accept</button>
        <button onClick={handleRejectCall} className={styles.reject}>Decline</button>
      </div>
    </>
  )}

      {inCall && (
        <>
          <div className={styles.videoSection}>
            <div className={styles.remoteVideo}></div>
            <div className={styles.localVideo}>
              <video ref={localVideoRef} autoPlay playsInline muted className={styles.video} />
            </div>
          </div>
          
          <div className={styles.controls}>
            <button onClick={toggleMic} className={styles.controlButton}>
              {micEnabled ? '🎙️' : '🔇'}
            </button>
            <button onClick={toggleVideo} className={styles.controlButton}>
              {videoEnabled ? '🎥' : '📷'}
            </button>
 <button
  onClick={handleShareScreen}
  className={`${styles.controlButton} ${isSharingScreen ? styles.screenActive : ''}`}
>
  {isSharingScreen ? "🛑" : "🖥️"}
</button>

             <button onClick={leaveCall} className={`${styles.controlButton} ${styles.leaveButton}`}>
              🔚
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentCall;
