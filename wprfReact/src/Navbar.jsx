import './Navbar.css';
import logo from './images/icon_accessibility.png';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export default function App() {
   
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
                      <li id="register"><a><Link to="/register">Registreren</Link></a></li>
                      <li id="login"><a><Link to="/login">Login</Link></a></li>
                  </ul>
              </div>
              <div className="mobile-menu-container">
                  <input class="checkbox" type="checkbox" id="checkbox"  onChange={handleCheckboxClick} checked={mobileButtonsVisible}/>
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
                      <li id="registerMobile"><a><Link to="/register">Registreren</Link></a></li>
                      <li id="loginMobile"><a href="#Login">Log in</a></li>
                  </ul>
              </div>
              </div>
              )}
      </div>
  );
}

