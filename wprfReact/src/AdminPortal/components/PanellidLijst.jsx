import React, { useState, useEffect } from 'react';
import '../css/AdminPortal.css';
import { useNavigate } from 'react-router-dom';

const PanellidLijst = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/getPanellidUsers')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setUsers(data))
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }, []);

    return ( 
        <div className="blok">
            <h1>PanellidLijst Niet af</h1>
            <div className="terugknop">
                <button onClick={() => navigate("/AdminPortal")}>Terug</button>
            </div>
            <h2>Users</h2>
            <ul>
                {users.map((user, index) => (
                    <li key={index}>{user.userName}</li>
                ))}
            </ul>
        </div> 
    );
}
 
export default PanellidLijst;