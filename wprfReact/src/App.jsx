import React, { useState } from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
<<<<<<< HEAD
=======
import './index.css'
>>>>>>> origin/Develop
import AppRouter from './AppRouter.jsx'; // Import the router
import ClickstreamApi from './ClickstreamApi.jsx';
import Onderzoek from './BedrijfsPortal/components/Onderzoek.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import SidebarAdminPortal from './SidebarAdminPortal.jsx';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPanellid, setIsPanellid] = useState(false);
  console.log(currentUser);
  return (
    <Router>
    <div className="App">
<<<<<<< HEAD
      <header className="App-header">
        <Navbar isLoggedIn={isLoggedIn} currentUser={currentUser} isAdmin={isAdmin}  isPanellid={isPanellid}/>
      </header>
      <AppRouter isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} currentUser={currentUser} 
      isAdmin={isAdmin} setIsAdmin={setIsAdmin} isPanellid={isPanellid} setIsPanellid={setIsPanellid} />
      <SidebarAdminPortal/>
      <footer>
        <Footer/>
      </footer>
=======
<       div className="header">
        <Navbar isLoggedIn={isLoggedIn} />
      </div>
      <div className="content">
      <AppRouter isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} currentUser={currentUser} />
      
      </div>
      <div className="footer">
      <Footer/>
      </div>
>>>>>>> origin/Develop
    </div>
    <ClickstreamApi/>
    </Router>
  
  );
}

export default App;