import './Navbar.css';
import logo from './images/icon_accessibility.png';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';



export default function App({ isLoggedIn, currentUser, isAdmin, isPanellid }) {
   
      const [mobileButtonsVisible, setMobileButtonsVisible] = useState(false);
      

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
                         <li id="register"><Link to="/register">Registreren</Link></li>
                         <li id="login"><Link to="/login">Login</Link></li>
                            </>
                        ) : (
                       <>
                         <li id="profile"><a><Link to="/profielpagina">Profiel</Link></a></li>
                         {isAdmin && <li id="Adminknop"><a><Link to="/AdminPortal">Adminportal</Link></a></li>}
                         {isPanellid && <li id="Panellidknop"><a><Link to="/PanellidPortal">Panellidportal</Link></a></li>}
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
                      <li id="registerMobile"><Link to="/register">Registreren</Link></li>
                      <li id="loginMobile"><Link to="/login">Login</Link></li>
                      </>
                  ) : (
                    <>
                     <li id="profileMobile"><a><Link to="/profielpagina">Profiel</Link></a></li>
                     {isAdmin && <li id="AdminknopMobile"><a><Link to="/AdminPortal">Adminportal</Link></a></li>}
                     </>
                  )}
                  </ul>
              </div>
              </div>
              )}
      </div>
  );
}

