import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './authContext.js';
import './Navbar.css';
import logo from './images/icon_accessibility.png';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [mobileButtonsVisible, setMobileButtonsVisible] = useState(false);
      
    const handleCheckboxClick = () => {
    setMobileButtonsVisible(!mobileButtonsVisible);
    };

    const logOut = () => {
        auth.setIsLoggedIn(false);
        auth.setCurrentUser(null);
    }

  return (
      <div>
          <div className="nav-container">
              <div className="logo">
                  <img src={logo} width="45" height="55"/>
              </div>
              <div className="nav-buttons">
                  <ul>
                      <li><a href="#Actueel">Actueel</a></li>
                      <li><a href="#Toegankelijkheid">Toegankelijkheid</a></li>
                      <li> <a href="#Hoe wij helpen">Hoe wij helpen</a></li>
                      <li><a href="#Sectoren">Sectoren</a></li>
                      <li><a href="#Cassussen">Cassussen</a></li>
                      <li><a href="#Over ons">Over ons</a></li>
                      <li><a href="#Contact">Contact</a> </li>
                      {!auth.isLoggedIn ? (
                        <>
                         <li onClick={() => navigate('/register')} id="register"><a>Registreren</a></li>
                         <li onClick={() => navigate('/login')} id="login"><a>Login</a></li>
                        </>
                        ) : (
                       <>
                         <li onClick={() => navigate('/profielpagina')} id="profile"><a>Profiel</a></li>
                         <li onClick={logOut} id="logout"><a>Uitloggen</a></li>
                         {auth.isAdmin && <li onClick={() => navigate('/AdminPortal')} id="Adminknop"><a>Adminportal</a></li>}
                         {auth.isPanellid && <li onClick={() => navigate('/PanellidPortal')} id="Panellidknop"><a>Panellidportal</a></li>}
                      </>
                    )}
                      
              
                  </ul>
              </div>
              <div className="mobile-menu-container">
                  <input className="checkbox" type="checkbox" id="checkbox"  onChange={handleCheckboxClick} checked={mobileButtonsVisible}/>
                  <div className="hamburger-lines">
                      <span className="line line1"></span>
                      <span className="line line2"></span>
                      <span className="line line3"></span>
                  </div>
              </div>
          </div>
          {mobileButtonsVisible && (
          <div className="mobile-buttons-container" id="mobilebuttons">
              <div className="mobile-buttons">
                  <ul>
                      <li><a href="#Actueel">Actueel</a></li>
                      <li><a href="#Toegankelijkheid">Toegankelijkheid</a></li>
                      <li><a href="#Hoe wij helpen">Hoe wij helpen</a></li>
                      <li><a href="#Sectoren">Sectoren</a></li>
                      <li><a href="#Cassussen">Cassussen</a></li>
                      <li><a href="#Over ons">Over ons</a></li>
                      <li><a href="#Contact">Contact</a> </li>
                  </ul>
              </div>
              <div className="register-login-container">
                  <ul>
                  {!auth.isLoggedIn ? (
                        <>
                      <li onClick={() => navigate('/register')} id="registerMobile"><a>Registreren</a></li>
                      <li onClick={() => navigate('/login')} id="loginMobile"><a>Login</a></li>
                      </>
                  ) : (
                    <>
                      <li onClick={() => navigate('/profielpagina')} id="profileMobile"><a>Profiel</a></li>
                         <li onClick={logOut} id="logoutMobile"><a>Uitloggen</a></li>
                     {auth.isAdmin && <li onClick={() => navigate('/Adminportal')} id="AdminknopMobile"><a>Adminportal</a></li>}
                     {auth.isPanellid && <li onClick={() => navigate('/PanellidPortal')} id="PanellidknopMobile"><a>Panellidportal</a></li>}
                     </>
                  )}
                  </ul>
              </div>
              </div>
              )}
      </div>
  );
}

export default Navbar;