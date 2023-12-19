import './Sidebar.css';
import Users from './images/icons8-users-50.png';
import Logs from './images/icons8-log-50.png';
import Aanvragen from './images/icons8-request-50.png';
import Documenten from './images/icons8-documents-50.png';

export default function App() {

  return (
          <div className="sidebar-container">
              <div className="sidebar-buttons">
                  <ul>
                      <li>
                          <img src={Users} width="40" height="40"/>
                          <a href="#Users">Users</a>
                      </li>
                      <li>
                          <img src={Logs} width="40" height="40"/>
                          <a href="#Logs">Logs</a>
                      </li>
                      <li>
                          <img src={Aanvragen} width="40" height="40"/>
                          <a href="#Aanvragen">Aanvragen</a>
                      </li>
                      <li>
                          <img src={Documenten} width="40" height="40"/>
                          <a href="#Documenten">Documenten</a>
                      </li>
                  </ul>
              </div>
          </div>
  );
}

