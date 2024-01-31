import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../authContext.js';
import './ProfielPagina.css';
import { useNavigate } from 'react-router-dom';

function ProfielPagina() {
    const [isEditable, setIsEditable] = useState(false);
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const loguit = () => {
        auth.setIsLoggedIn(false);
        auth.setCurrentUser(null);
    }

    useEffect(() => {
    if (!auth.isLoggedIn)
    {
        navigate('/login');
    }
    }, [auth.isLoggedIn]);
    

    const toggleEditable = () => {
        setIsEditable(!isEditable);
    }

    return (
        <div className='blok'>
            {auth.currentUser ? (
                <div className='profiel'>
                    <h1>Welkom {auth.currentUser.userName}!</h1>
                    <div className='gegevens'>
                    <h2>Voornaam: {isEditable ? <textarea>{auth.currentUser.userName}</textarea> : auth.currentUser.userName}</h2>
                    <h2>Achternaam: {isEditable ? <textarea>{auth.currentUser.lastName}</textarea> : auth.currentUser.lastName}</h2>
                    <h2>E-mail: {isEditable ? <textarea>{auth.currentUser.email}</textarea> : auth.currentUser.email}</h2>
                    </div>
                </div>
            ) : (
                <p>Log eerst in</p>
            )}
            <div className='onderkant'>
               
            {auth.userRole.includes('Panellid') && <button onClick={() => navigate('/PanellidPortal')}>Panellidportal</button>}
            {auth.userRole.includes('Company') && <button onClick={() => navigate('/BedrijfPortal')}>BedrijfPortal</button>}
            {auth.userRole.includes('Admin') && <button onClick={() => navigate('/Adminportal')}>Adminportal</button>}
            
            <button onClick={loguit}>Uitloggen</button>
            </div>
        </div>
    );
}

export default ProfielPagina;