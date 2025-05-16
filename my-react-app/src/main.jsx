import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TeslaInfo from './TeslaInfo.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TeslaInfo />
  </StrictMode>,
)
