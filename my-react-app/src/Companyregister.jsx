import React, { useState } from 'react';
import styles from './CompanyRegister.module.css';
import GUCLogo from './assets/GUC-logo.png';
function CompanyRegister() {
  const [company, setCompany] = useState({
    Name: '',
    Logo: '',
    Industry: '',
    Email: '',
    Size: '',
  });

  function setname(value) {
    setCompany(prev => ({ ...prev, Name: value }));
  }

  function setlogo(value) {
    setCompany(prev => ({ ...prev, Logo: value }));
  }

  function setindustry(value) {
    setCompany(prev => ({ ...prev, Industry: value }));
  }

  function setemail(value) {
    setCompany(prev => ({ ...prev, Email: value }));
  }

  function setsize(value) {
    setCompany(prev => ({ ...prev, Size: value }));
  }

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setlogo(imageUrl);
    }
  }

  function handleSubmit() {
 
  console.log("Submitting company info:", company);

  
}

  return (
   <><header className={styles.header}>
      <img src={GUCLogo} alt="GUC Logo" className={styles.siteLogo} />
    </header><div className={styles.container}>
        <div className={styles.formCard}>
          <h1>Welcome to SCAD Internship Website</h1>
          <h2>Company Register</h2>

          <div>
            <label>Company Name:</label><br />
            <input
              className={styles.input}
              type="text"
              placeholder="Company Name"
              value={company.Name}
              onChange={(e) => setname(e.target.value)} />
          </div>

          <div>
            <label>Upload Logo from Computer:</label><br />
            <input
              className={styles.input}
              type="file"
              accept="image/*"
              onChange={handleFileUpload} />
          </div>

          <input
            className={styles.input}
            type="text"
            placeholder="Or paste image URL (e.g. from Google Drive)"
            value={company.Logo}
            onChange={(e) => setlogo(e.target.value)} />

          {company.Logo && (
            <div>
              <img
                src={company.Logo}
                alt="Company Logo"
                className={styles.logoPreview} />
            </div>
          )}

          <div>
            <label>Company Industry:</label><br />
            <input
              className={styles.input}
              type="text"
              placeholder="Industry"
              value={company.Industry}
              onChange={(e) => setindustry(e.target.value)} />
          </div>

          <div>
            <label>Company Email:</label><br />
            <input
              className={styles.input}
              type="email"
              placeholder="Email"
              value={company.Email}
              onChange={(e) => setemail(e.target.value)} />
          </div>

          <div>
            <label>Company Size:</label><br />
            <select
              className={styles.input}
              value={company.Size}
              onChange={(e) => setsize(e.target.value)}
            >
              <option value="">Select size</option>
              <option value="Small">Small (Less than 50 employees)</option>
              <option value="Medium">Medium (51 - 100 employees)</option>
              <option value="Large">Large (101 - 500 employees)</option>
              <option value="Corporate">Corporate (More than 500 employees)</option>
            </select>


          </div>

          <button className={styles.button} onClick={handleSubmit}>Reigster Now</button>

        </div>
      </div></>
    
  );
}

export default CompanyRegister;
