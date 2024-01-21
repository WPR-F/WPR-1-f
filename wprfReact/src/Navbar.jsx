import './Navbar.css';
import logo from './images/icon_accessibility.png';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function App({ isLoggedIn, currentUser, isAdmin, isPanellid }) {
      const [mobileButtonsVisible, setMobileButtonsVisible] = useState(false);
      const navigate = useNavigate();
      

      const handleCheckboxClick = () => {
        setMobileButtonsVisible(!mobileButtonsVisible);
      };

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
                      {!isLoggedIn ? (
                        <>
                         <li id="register" onClick={() => navigate("./register")}><a>Registreren</a></li>
                         <li id="login" onClick={() => navigate("./login")}><a>login</a></li>
                            </>
                        ) : (
                       <>
                         <li id="profile" onClick={() => navigate("./profielpagina")}><a>Profiel</a></li>
                         {isAdmin && <li id="Adminknop" onClick={() => navigate("./AdminPortal")}><a>Adminportal</a></li>}
                         {isPanellid && <li id="Panellidknop" onClick={() => navigate("./PanellidPortal")}><a>Panellidportal</a></li>}
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
                  {!isLoggedIn ? (
                        <>
                      <li id="registerMobile" onClick={() => navigate("./register")}><a>Registreren</a></li>
                      <li id="loginMobile" onClick={() => navigate("./login")}><a>login</a></li>
                      </>
                  ) : (
                    <>
                      <li id="profile" onClick={() => navigate("./profielpagina")}><a>Profiel</a></li>
                        {isAdmin && <li id="Adminknop" onClick={() => navigate("./AdminPortal")}><a>Adminportal</a></li>}
                        {isPanellid && <li id="Panellidknop" onClick={() => navigate("./PanellidPortal")}><a>Panellidportal</a></li>}
                     </>
                  )}
                  </ul>
              </div>
              </div>
              )}
      </div>
  );
}

