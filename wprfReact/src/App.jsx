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
  console.log(currentUser);
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <Navbar isLoggedIn={isLoggedIn} />
        <SidebarAdminPortal/>
      </header>
      <AppRouter isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} currentUser={currentUser} />
      <footer>
        <Footer/>
      </footer>
    </div>
    </Router>
  );
}

export default App;