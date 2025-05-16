import { useState } from "react";
import styles from './Login.module.css'
import { useNavigate } from 'react-router-dom'; // ← import this



function Login(){
    const [username,setUsername]= useState('');
    const [password, setPassword]= useState('');
    const [userError, setUserError] = useState('');
    const [passError, setPassError] = useState('');

    const users = [
        { username: "Scad", password: "Scad" },
        { username: "Student", password: "Student" },
        { username: "Company", password: "Company" },
      ];
      
    
  function changeUsername(e) {
    setUsername(e.target.value);
    setUserError('');
  }

  function changePassword(e) {
    setPassword(e.target.value);
    setUserError('');
  }



  const navigate = useNavigate(); // ← hook setup

  function loginHandle() {
    const user = users.find((user) => user.username === username);

    if (!user) {
      setUserError('Incorrect username.');
      setPassError('');
      return;
    }

    if (user.password !== password) {
      setPassError('Incorrect password.');
      return;
    }

    setUserError('');
    setPassError('');
    alert(`Welcome, ${user.username}!`);

    if (user.username === 'Student') {
  navigate('/StudentPage');
} else if (user.username === 'Company') {
  navigate('/CompanyProfile');
} else if (user.username === 'Scad') {
  navigate('/Scad');
}

    
  }
  
  function register(){
    navigate('/CompanyRegister');
  }
    return(
        <div className={styles.mainContainer}>
            <div className={styles.titleContainer}><p>Username</p> <p className={styles.error}>{userError}</p></div>
            <input onChange={changeUsername} type="text"></input>
            <div className={styles.titleContainer}><p>Password</p> <p className={styles.error}>{passError}</p></div>
            <input onChange={changePassword} type="text"></input>
            <button onClick={loginHandle}>Login</button>
            <button onClick={()=>register()}>Register as a Company</button>
        </div>
        
    );
}

export default Login