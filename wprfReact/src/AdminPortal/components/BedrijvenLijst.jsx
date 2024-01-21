import React, { useState, useEffect } from 'react';
import '../css/AdminPortal.css';
import '../css/PanellidLijst.css';
import { useNavigate } from 'react-router-dom';
import { GetUsers } from '../../apiService';
import { roleValidation } from '../../roleValidation';

const BedrijvenLijst = ({ isAdmin, isLoggedIn }) => {
    const [users, setUsers] = useState([]); 
    const navigate = useNavigate();

    useEffect(() => {
        roleValidation(navigate, isAdmin, isLoggedIn);
        }, [isAdmin, isLoggedIn]);

    const fetchUsers = async () => {
        try {
            setUsers(await GetUsers('Company/getCompanyUsers'));
        }
        catch (error) {
            console.log(error);
        };
    }
    
        useEffect(() => {
            fetchUsers();
        }, []);


    return ( 
        <div  className="blok">
        <h1>Bedrijvenlijst niet af</h1>
        <div className="terugknop">
            <button onClick={() => navigate("/AdminPortal")}>Terug</button>
        </div>
        <h2>Alle Bedrijven:</h2>
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
 
export default BedrijvenLijst;