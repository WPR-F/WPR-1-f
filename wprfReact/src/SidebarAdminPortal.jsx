import React, { useState } from 'react';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';
import Users from './images/icons8-users-50.png';
import Logs from './images/icons8-log-50.png';
import Aanvragen from './images/icons8-request-50.png';
import Documenten from './images/icons8-documents-50.png';

function SidebarAdminPortal() {

    const Authenticatation = ({  isAdmin, isLoggedIn }) => {
        const navigate = useNavigate();

        useEffect(() => {
            roleValidation(navigate, isAdmin, isLoggedIn);
            }, [isAdmin, isLoggedIn]);

        return (
            <div>
                <div className="sidebar-container">
                    <div className="sidebar-buttons">
                        <ul>
                            <li>
                                <img src={Users} width="40" height="40"/>
                                <a onClick={() => navigate("./PanellidLijst")}>Ervaringsdeskundigen</a>
                            </li>
                            <li>
                                <img src={Logs} width="40" height="40"/>
                                <a onClick={() => navigate("./HuidigeOnderzoeken")}>Huidige Onderzoeken</a>
                            </li>
                            <li>
                                <img src={Aanvragen} width="40" height="40"/>
                                <a onClick={() => navigate("./BedrijvenLijst")}>Bedrijven</a>
                            </li>
                            <li>
                                <img src={Documenten} width="40" height="40"/>
                                <a onClick={() => navigate("/profielpagina")}>Terug naar profiel</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default SidebarAdminPortal;
