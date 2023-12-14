import './Navbar.css';
import logo from './images/icon_accessibility.png';

export default function App() {

  return (
      <div>
          <div className="nav-container">
              <div className="logo">
                  <img src={logo} width="45" height="55"/>
              </div>
              <div className="nav-buttons">
                  <ul>
                      <li>
                          <a href="#Actueel">Actueel</a>
                      </li>
                      <li>
                          <a href="#Toegankelijkheid">Toegankelijkheid</a>
                      </li>
                      <li>
                          <a href="#Hoe wij helpen">Hoe wij helpen</a>
                      </li>
                      <li>
                          <a href="#Sectoren">Sectoren</a>
                      </li>
                      <li>
                          <a href="#Cassussen">Cassussen</a>
                      </li>
                      <li>
                          <a href="#Over ons">Over ons</a>
                      </li>
                      <li>
                          <a href="#Contact">Contact</a>
                      </li>
                      <li id="register">
                          <a href="#Registreren">Registreren</a>
                      </li>
                      <li id="login">
                          <a href="#Login">Log in</a>
                      </li>
                  </ul>
              </div>
              <div className="mobile-hamburger-menu-container">
                  <input class="checkbox" type="checkbox"/>
                  <div className="hamburger-lines">
                      <span className="line line1"></span>
                      <span className="line line2"></span>
                      <span className="line line3"></span>
                  </div>
              </div>
          </div>
          <div className="mobile-menu-container">
              <div className="mobile-menu-buttons">
                  <ul>
                      <li>
                          <a href="#Actueel">Actueel</a>
                      </li>
                      <li>
                          <a href="#Toegankelijkheid">Toegankelijkheid</a>
                      </li>
                      <li>
                          <a href="#Hoe wij helpen">Hoe wij helpen</a>
                      </li>
                      <li>
                          <a href="#Sectoren">Sectoren</a>
                      </li>
                      <li>
                          <a href="#Cassussen">Cassussen</a>
                      </li>
                      <li>
                          <a href="#Over ons">Over ons</a>
                      </li>
                      <li>
                          <a href="#Contact">Contact</a>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
  );
}

