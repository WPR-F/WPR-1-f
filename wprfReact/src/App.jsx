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
  console.log(currentUser);
  return (
    <Router>
    <div className="App">
<<<<<<< HEAD
      <div className="header">
        <Navbar isLoggedIn={isLoggedIn} />
      </div>
      <div className="content">
      <AppRouter isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} currentUser={currentUser} />
      
      </div>
      <div className="footer">
      <Footer/>
      </div>
=======
      <header className="App-header">
        <Navbar isLoggedIn={isLoggedIn} currentUser={currentUser} isAdmin={isAdmin}/>
        <SidebarAdminPortal/>
      </header>
      <AppRouter isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} currentUser={currentUser} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      <footer>
        <Footer/>
      </footer>
>>>>>>> Develop
    </div>
    </Router>
  
  );
}

export default App;