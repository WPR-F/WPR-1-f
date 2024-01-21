import React, { useState } from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import './index.css'
import AppRouter from './AppRouter.jsx'; // Import the router
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPanellid, setIsPanellid] = useState(false);
  console.log(currentUser);
  return (
    <Router>
    <div className="App">
<       div className="header">
        <Navbar isLoggedIn={isLoggedIn} />
      </div>
      <div className="content">
      <AppRouter isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} currentUser={currentUser} />
      
      </div>
      <div className="footer">
      <Footer/>
      </div>
    </div>
    </Router>
  
  );
}

export default App;