import './App.css';
import React from 'react';
import Login from './Pages/login';
import OwnerDetailsPage from './Pages/hospital/Signup/OwnerDetailsPage';
import HospitalDetailsPage from './Pages/hospital/Signup/HospitalDetailsPage';
import UploadHospitalDocumentsPage from './Pages/hospital/Signup/UploadHospitalDocumentsPage';
import { BrowserRouter ,Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* code to route login and signup */}
      <UploadHospitalDocumentsPage></UploadHospitalDocumentsPage>

    </div>
  );
}

export default App;
