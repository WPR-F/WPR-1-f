import '../../Sidebar.css';
import CreateIcon from '../../images/icons8-create-50.png';
import OnderzoekIcon from '../../images/icons8-case-study-50.png';
import ChatIcon from '../../images/icons8-chat-50.png';
import BackIcon from '../../images/icons8-back-50.png';
import { useNavigate } from 'react-router-dom';


function SidebarBedrijfsPortal() {
    const navigate = useNavigate();

    return (
        <div>
            <div className="sidebar-container">
                <div className="sidebar-buttons">
                    <ul>
                        <li>
                            <img src={CreateIcon} width="40" height="40"/>
                            <a onClick={() => navigate("./BedrijfsPortal/Onderzoeken")}>Onderzoeken aanmaken</a>
                        </li>
                        <li>
                            <img src={ChatIcon} width="40" height="40"/> 
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

export default SidebarBedrijfsPortal;

