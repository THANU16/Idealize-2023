import './App.css';
import React from 'react';
import Login from './Pages/login';
import OwnerDetailsPage from './Pages/hospital/Signup/OwnerDetailsPage';
import { BrowserRouter ,Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* code to route login and signup */}
      <OwnerDetailsPage></OwnerDetailsPage>

    </div>
  );
}

export default App;
