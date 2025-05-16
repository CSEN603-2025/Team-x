import { createRoot } from 'react-dom/client'
import './index.css'
<<<<<<< HEAD
import StudentPage from './StudentPage.jsx'
import StudentHeader from './StudentHeader.jsx'

createRoot(document.getElementById('root')).render(
    <>
        <StudentHeader/>
        <StudentPage/>

    </>
    
=======
import TeslaInfo from './TeslaInfo.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TeslaInfo />
  </StrictMode>,
>>>>>>> origin/my-new-branch
)
