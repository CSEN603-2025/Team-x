// TeslaInfo.jsx
import React from 'react';
import './TeslaInfo.css';

function TeslaInfo() {
  return (
    <div className="companies-wrapper">
      {/* Tesla */}
      <div className="company-card">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg"
          alt="Tesla Logo"
          className="company-logo"
        />
        <p className="company-description">
          Tesla, Inc. is a global leader in electric vehicles, energy storage, and solar energy solutions.
          Founded in 2003, Tesla's mission is to accelerate the world’s transition to sustainable energy.
        </p>
      </div>

      {/* Apple */}
      <div className="company-card">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg
"
          alt=""
          className="company-logo"
        />
        <p className="company-description">
          Apple Inc. is a technology company known for innovative products like the iPhone, MacBook, and iPad.
          Founded in 1976, Apple designs both hardware and software, and leads in user-focused design.
        </p>
      </div>

      {/* Google */}
      <div className="company-card">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
          alt="Google Logo"
          className="company-logo"
        />
        <p className="company-description">
          Google LLC specializes in internet-related services like search, cloud computing, and advertising.
          Founded in 1998, Google is a core subsidiary of Alphabet Inc. and operates products like Gmail, Maps, and Android.
        </p>
      </div>
    </div>
  );
}

export default TeslaInfo;
