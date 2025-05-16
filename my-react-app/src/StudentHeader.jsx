import styles from './StudentHeader.module.css'
import { useState } from 'react'
import whiteBell from './assets/bell.png'
import blackBell from './assets/bell-ring.png'
import viewOff from './assets/profile.png'
import viewOn from './assets/view.png'
import { useNavigate } from 'react-router-dom'

function StudentHeader(){
    const navigate = useNavigate();
    const [notification,setNotification]=useState(false);
    const [profileView, setProfileView]= useState(false);

    const studentInfo = {
        name: 'Francesco',
        proStatus :true
    }
    function notificationToggle() {
  setNotification(prevState => {
    if (!prevState) setProfileView(false); 
    return !prevState;
  });
}

function myProfile(){
  navigate('/MyProfile');
}

function profileViewToggle() {
  setProfileView(prevState => {
    if (!prevState) setNotification(false);
    return !prevState;
  });
}


   const notifications = [
    { id: 1, text: "New internship cycle Begins in June 3rd 2025.", read: false },
    { id: 2, text: "New internship opportunity available.", read: false },
    { id: 3, text: "Omar sent you a new workshop message.", read: true },
    { id: 4, text: "Deadline for your internship evaluation is approaching.", read: false },
    { id: 5, text: "You received feedback on your last project.", read: true },
    { id: 6, text: "The upcoming workshop is scheduled to start next week.", read: false },
    { id: 7, text: "Your internship report status has been updated.", read: false }
  ];

  const companyNames = [
  "TechCorp",
  "InnovaWorks",
  "RecruitX",
  "InternTrack",
  "CodeBase",
  "CareerFlow"
];


  const unreadCount = notifications.filter(notification => !notification.read).length;

   
    return(
        <div className={styles.mainContainer}> <p onClick={()=>{myProfile()}} style={{fontSize:20, fontWeight:'bolder',margin:0}}>Welcome, {studentInfo.name}</p>
       {studentInfo.proStatus && (
        <p>
          <span className={styles.proText}>PRO+</span>
        </p>
      )}

      <div className={styles.leftSection}>
        <img className={styles.notificationIcon} src={profileView ? viewOn : viewOff} onClick={profileViewToggle} ></img>
        {profileView && 
            <div className={styles.notificationContainer}>
                <p style={{fontSize:20, marginBottom:20, fontWeight:'bold'}}> Companies that viewed your profile</p>
                {companyNames.map((company,index)=>{
                    return <p className={styles.notification}>{company}</p>
                })}
            </div>
            }

      <img className={styles.notificationIcon}src={notification ? blackBell : whiteBell}onClick={notificationToggle}></img>
      <p className={styles.notificationCount}>{unreadCount}</p>

       {notification && 
            <div className={styles.notificationContainer}>
                {notifications.map((notification,index)=>{
                    return <p className={styles.notification}>{notification.text}</p>
                })}
            </div>
            }

        </div>
      </div>
      
       
        
    );
}

export default StudentHeader