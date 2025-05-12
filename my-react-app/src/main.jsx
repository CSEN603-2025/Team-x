import { createRoot } from 'react-dom/client'
import './index.css'
import StudentPage from './StudentPage.jsx'
import StudentHeader from './StudentHeader.jsx'

createRoot(document.getElementById('root')).render(
    <>
        <StudentHeader/>
        <StudentPage/>

    </>
    
)
