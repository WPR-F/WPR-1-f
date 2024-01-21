import './Sidebar.css';
import CreateIcon from './images/icons8-create-50.png';
import OnderzoekIcon from './images/icons8-case-study-50.png';
import ChatIcon from './images/icons8-chat-50.png';


export default function App() {

  return (
      <div>
          <div className="sidebar-container">
              <div className="sidebar-buttons">
                  <ul>
                      <li>
                          <img src={CreateIcon} width="40" height="40"/>
                          <a>Onderzoeken aanmaken</a>
                      </li>
                      <li>
                          <img src={OnderzoekIcon} width="40" height="40"/>
                          <a>Mijn onderzoeken</a>
                      </li>
                      <li>
                          <img src={ChatIcon} width="40" height="40"/> 
                          <a>Chat</a>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
  );
}

