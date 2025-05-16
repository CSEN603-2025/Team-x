import { Routes, Route } from 'react-router-dom';
import Login from './Login.jsx'

import MainStudentPage from './MainStudentPage.jsx';
import MyCompanyProfile from "./MyCompanyProfile.jsx";
import ScadOffice from './ScadOffice.jsx';
import MyProfile from './MyProfile.jsx';
import CompanyRegister from './companyregister.jsx';
import JobPostManager from './JobPostManager.jsx';
import StudentCall from './StudentCall.jsx';
import Assessments from './Assessments.jsx';
import Workshop from "./Workshop.jsx"
import WorkshopRecording from './WorkshopRecording.jsx';
import ScadCompanySearch from './ScadCompanySearch.jsx';
import TeslaInfo from './TeslaInfo.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/StudentPage" element={<MainStudentPage />} />
       <Route path="/CompanyProfile" element={<MyCompanyProfile />} />
        <Route path="/Scad" element={<ScadOffice />} />
        <Route path="/MyProfile" element={<MyProfile />} />
        <Route path="/CompanyRegister" element={<CompanyRegister />} />
         <Route path="/JobPost" element={<JobPostManager />} />
         <Route path="/Zoom" element={<StudentCall />} />
           <Route path="/Assessment" element={<Assessments />} />
              <Route path="/Works" element={<Workshop />} />
                <Route path="/WorksRecord" element={<WorkshopRecording />} />
                 <Route path="/Comp" element={<ScadCompanySearch />} />
                                  <Route path="/info" element={<TeslaInfo />} />
    </Routes>
  );
}

export default App;