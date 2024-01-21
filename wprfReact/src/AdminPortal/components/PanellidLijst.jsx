import React, { useState, useEffect } from 'react';
import '../css/AdminPortal.css';
import '../css/PanellidLijst.css';
import { GetUsers } from '../../apiService';
import { useNavigate } from 'react-router-dom';

const PanellidLijst = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]); 

    const fetchUsers = async () => {
    setUsers(await GetUsers('Panellid/getPanellidUsers'));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return ( 
        <div className="blok">
            <h1>PanellidLijst Niet af</h1>
            <div className="terugknop">
                <button onClick={() => navigate("/AdminPortal")}>Terug</button>
            </div>
<<<<<<< HEAD
            <div className="filterOptions">
            <select onChange={(e) => setSortOption(e.target.value)}
            style={{ 
                backgroundColor: 'white', 
                color: 'black', 
                width: '150px', 
                height: '30px',
                fontSize: '12px'
            }}
            > 
                    <option value="">Sorteer op naam</option>
                    <option value="Naam">Naam</option>
            </select>
            <select onChange={(e) => setDisabilityType(e.target.value)}
            style={{ 
                backgroundColor: 'white', 
                color: 'black', 
                width: '150px', 
                height: '30px',
                fontSize: '12px'
            }}> 
                    <option value="">Filter by disability type...</option>
                    <option value="Motorisch">Motorisch</option>
                    <option value="Zintuigelijk">Zintuigelijk</option>
                    <option value="Mentaal">Mentaal</option>
            </select>
                    <select onChange={(e) => setResearchApproachOption(e.target.value)}
                    style={{ 
                        backgroundColor: 'white', 
                        color: 'black', 
                        width: '150px', 
                        height: '30px',
                        fontSize: '12px'
                    }}>
                <option value="">Filter op Voorkeur benadering</option>
                <option value="Telefonisch">Telefonisch</option>
                <option value="Portal">Via portal</option>
            </select>
            <select onChange={(e) => setCommercialApproachOption(e.target.value)}
            style={{ 
                backgroundColor: 'white', 
                color: 'black', 
                width: '170px', 
                height: '30px',
                fontSize: '12px'
            }}>
                <option value="">filter op commerciële benadering</option>
                <option value="true">commerciële benadering</option>
                <option value="false">geen commerciële benadering</option>
            </select>
            </div>
=======
>>>>>>> origin/Develop
            <h2>Alle Panelleden:</h2>
            <div className='PanellidList'> 
            <ul>
            {users.map((user, index) => (
            <li key={index} className="listItem">
                <button onClick={() => console.log("Clicked user: " + user.userName)}>
                    {user.userName + " " + user.lastName }
                </button>
            </li>
        ))}
            </ul>
            </div>
        </div> 
    );
}
 
export default PanellidLijst;