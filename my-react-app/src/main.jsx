
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import StudentCall from './StudentCall.jsx';
import ScadCompanySearch from './ScadCompanySearch.jsx';
import WorkshopEdit from './WorkshopEdit.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

