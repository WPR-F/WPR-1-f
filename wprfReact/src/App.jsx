import React, { useState } from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import ClickstreamApi from './ClickstreamApi.jsx';  
import { AuthContext } from './authContext.js';
import AppRouter from './AppRouter.jsx'; // Import the router
import { BrowserRouter as Router } from 'react-router-dom';
import Onderzoek from './BedrijfsPortal/components/Onderzoek.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPanellid, setIsPanellid] = useState(false);
  const [isBedrijf, setIsBedrijf] = useState(false);
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser, isAdmin, setIsAdmin, isPanellid, setIsPanellid, isBedrijf, setIsBedrijf }}>
    <Router>
    <div className="App">
      <header className="App-header">
        <Navbar/>
      </header>
      <AppRouter/>
      <footer>
        <Footer/>
      </footer>
    </div>
    <ClickstreamApi/>
    
    </Router>
    </AuthContext.Provider>
  );
}

export default App;