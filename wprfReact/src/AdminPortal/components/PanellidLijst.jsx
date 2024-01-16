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