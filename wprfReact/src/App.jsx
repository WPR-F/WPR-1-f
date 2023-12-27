import React from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import SidebarAdminPortal from './SidebarAdminPortal.jsx';
import SidebarBedrijfPortal from './SidebarBedrijfPortal.jsx';
import SidebarPanellidPortal from './SidebarPanellidPortal.jsx';
import AppRouter from './AppRouter.jsx'; // Import the router
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <Navbar/>
      </header>
     
      <SidebarAdminPortal/>
      <AppRouter /> {/* Render the AppRouter component here */}
      <footer>
        <Footer/>
      </footer>
    </div>
    </Router>
  );
}

export default App;