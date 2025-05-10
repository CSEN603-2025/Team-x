import { useState } from "react";
import styles from './Login.module.css'

function Login(){
    const [username,setUsername]= useState('');
    const [password, setPassword]= useState('');
    const [userError, setUserError] = useState('');
    const [passError, setPassError] = useState('');

    const users = [
        { username: "alice", password: "password123" },
        { username: "bob", password: "secure456" },
        { username: "charlie", password: "qwerty789" },
        { username: "diana", password: "letmein321" },
        { username: "eve", password: "admin007" },
        { username: "frank", password: "mobility2025" }
      ];
      
    
  function changeUsername(e) {
    setUsername(e.target.value);
    setUserError('');
  }

  function changePassword(e) {
    setPassword(e.target.value);
    setUserError('');
  }

  function loginHandle(){
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
    }


  

    return(
        <div className={styles.mainContainer}>
            <div className={styles.titleContainer}><p>Username</p> <p className={styles.error}>{userError}</p></div>
            <input onChange={changeUsername} type="text"></input>
            <div className={styles.titleContainer}><p>Password</p> <p className={styles.error}>{passError}</p></div>
            <input onChange={changePassword} type="text"></input>
            <button onClick={loginHandle}>Login</button>
        </div>
        
    );
}

export default Login