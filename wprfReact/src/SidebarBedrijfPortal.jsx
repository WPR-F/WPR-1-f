import './Sidebar.css';
import logo from './images/icon_accessibility.png';

export default function App() {

  return (
      <div>
          <div className="sidebar-container">
              <div className="sidebar-buttons">
                  <ul>
                      <li>
                          <a>Onderzoeken aanmaken</a>
                      </li>
                      <li>
                          <a>Mijn onderzoeken</a>
                      </li>
                      <li>
                          <a>Chat</a>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
  );
}

