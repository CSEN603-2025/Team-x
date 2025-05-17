import { useState } from "react";
import styles from './Login.module.css'
import { useNavigate } from 'react-router-dom'; // ← import this
import GUCLogo from './assets/GUC-logo.png';


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
      <section >
      <div><h1 className={styles.h1}>Welcome To Internship Haven</h1>
      <h1 >Login here</h1>
         <header className={styles.header}>
            <img src={GUCLogo} alt="GUC Logo" className={styles.siteLogo} />
          </header>
      <div className={styles.Wrapper}>
        
        <div className={styles.mainContainer}>
            <div className={styles.titleContainer}><p>Username</p> <p className={styles.error}>{userError}</p></div>
            <input className={styles.inputt} onChange={changeUsername} type="text"></input>
            <div className={styles.titleContainer}><p>Password</p> <p className={styles.error}>{passError}</p></div>
            <input className={styles.inputt} onChange={changePassword} type="text"></input>
            <button onClick={loginHandle}>Login</button>
            <button onClick={()=>register()}>Register as a Company</button>
        </div>
      </div>
        </div>
        </section>
    );
}

export default Login