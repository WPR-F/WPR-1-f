import React, { useState } from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import SidebarAdminPortal from './SidebarAdminPortal.jsx';
import SidebarBedrijfPortal from './SidebarBedrijfPortal.jsx';
import SidebarPanellidPortal from './SidebarPanellidPortal.jsx';
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
      <header className="App-header">
        <Navbar isLoggedIn={isLoggedIn} currentUser={currentUser} isAdmin={isAdmin}/>
        <SidebarAdminPortal/>
      </header>
      <AppRouter isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} currentUser={currentUser} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      <footer>
        <Footer/>
      </footer>
    </div>
    </Router>
  );
}

export default App;