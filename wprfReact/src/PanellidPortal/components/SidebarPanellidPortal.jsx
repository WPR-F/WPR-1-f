import '../../Sidebar.css';
import OpenOnderzoek from '../../images/icons8-research-50.png';
import Onderzoek from '../../images/icons8-case-study-50.png';
import Vergoedingen from '../../images/icons8-reimbursement-50.png';
import Chat from '../../images/icons8-chat-50.png';
import BackIcon from '../../images/icons8-back-50.png';
import { useNavigate } from 'react-router-dom';

function SidebarPanellidPortal() {
    const navigate = useNavigate();

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
                            <a onClick={() => navigate("./PanellidProfiel")}>Panellidprofiel</a>
                        </li>
                        <li>
                            <img src={Vergoedingen} width="40" height="40"/>
                            <a onClick={() => navigate("./OpenOnderzoeken")}>Onderzoeken</a>
                        </li>
                        <li>
                            <img src={Vergoedingen} width="40" height="40"/>
                            <a onClick={() => navigate("./ActieveOnderzoeken")}>Actieve Onderzoeken</a>
                        </li>
                        <li>
                            <img src={Chat} width="40" height="40"/>
                            <a>Chat</a>
                        </li>
                        <li>
                            <img src={BackIcon} width="40" height="40"/>
                            <a onClick={() => navigate("/profielpagina")}>Terug naar profiel</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
        

export default SidebarPanellidPortal;