import './Sidebar.css';
import logo from './images/icon_accessibility.png';

export default function App() {

  return (
      <div>
          <div className="sidebar-container">
              <div className="sidebar-buttons">
                  <ul>
                      <li>
                          <a href="#Users">Users</a>
                      </li>
                      <li>
                          <a href="#Logs">Logs</a>
                      </li>
                      <li>
                          <a href="#Aanvragen">Aanvragen</a>
                      </li>
                      <li>
                          <a href="#Documenten">Documenten</a>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
  );
}

