import './Sidebar.css';
import OpenOnderzoek from './images/icons8-research-50.png';
import Onderzoek from './images/icons8-case-study-50.png';
import Vergoedingen from './images/icons8-reimbursement-50.png';
import Chat from './images/icons8-chat-50.png';

export default function App() {

  return (
      <div>
          <div className="sidebar-container">
              <div className="sidebar-buttons">
                  <ul>
                      <li>
                          <img src={OpenOnderzoek} width="40" height="40"/>
                          <a>Open onderzoeken</a>
                      </li>
                      <li>
                          <img src={Onderzoek} width="40" height="40"/>
                          <a>Mijn onderzoeken</a>
                      </li>
                      <li>
                          <img src={Vergoedingen} width="40" height="40"/>
                          <a>Vergoedingen</a>
                      </li>
                      <li>
                          <img src={Chat} width="40" height="40"/>
                          <a>Chat</a>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
  );
}

