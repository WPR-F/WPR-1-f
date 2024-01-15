import React, { useState, useEffect } from 'react';
import '../css/AdminPortal.css';
import '../css/PanellidLijst.css';
import { useNavigate } from 'react-router-dom';

const PanellidLijst = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]); // Define users as a state variable

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:5210/api/Panellid/getPanellidUsers');
            const users = await response.json();
            setUsers(users); // Set the state of users to the fetched users
            console.log(users);
        } catch (error) {
            console.error('Network error:', error);
        }
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