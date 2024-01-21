import './Sidebar.css';
import { useNavigate } from 'react-router-dom';
import CreateIcon from './images/icons8-create-50.png';
import OnderzoekIcon from './images/icons8-case-study-50.png';
import ChatIcon from './images/icons8-chat-50.png';

function SidebarBedrijfsPortal() {
    const Authenticatation = ({ isBedrijf, isLoggedIn }) => {
        const navigate = useNavigate();

        useEffect(() => {
            roleValidation(navigate, isBedrijf, isLoggedIn);
            }, [isBedrijf, isLoggedIn]);

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
                            </ul>
                        </div>
                    </div>
                </div>
        
        );
    }
}
 
export default SidebarBedrijfsPortal;

