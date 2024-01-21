import React, { useState, useEffect } from 'react';
import './ProfielPagina.css';
import { useNavigate } from 'react-router-dom';

function ProfielPagina({ currentUser, setIsLoggedIn, setCurrentUser, isLoggedIn, isAdmin, isPanellid }) {
    const [isEditable, setIsEditable] = useState(false);
    const navigate = useNavigate();

    const loguit = () => {
        setIsLoggedIn(false);
        setCurrentUser(null);
    }

    useEffect(() => {
    if (!isLoggedIn)
    {
        navigate('/login');
        console.log(isLoggedIn);
    }
    }, [isLoggedIn]);
    

    const toggleEditable = () => {
        setIsEditable(!isEditable);
    }

    return (
        <div className='blok'>
            {currentUser ? (
                <div className='profiel'>
                    <h1>Welkom {currentUser.userName}!</h1>
                    <div className='gegevens'>
                    <h2>Voornaam: {isEditable ? <textarea>{currentUser.userName}</textarea> : currentUser.userName}</h2>
                    <h2>Achternaam: {isEditable ? <textarea>{currentUser.lastName}</textarea> : currentUser.lastName}</h2>
                    <h2>E-mail: {isEditable ? <textarea>{currentUser.email}</textarea> : currentUser.email}</h2>
                    </div>
                </div>
            ) : (
                <p>Log eerst in</p>
            )}
            <div className='onderkant'>
               
                    {isPanellid && <button onClick={() => navigate('/PanellidPortal')}>Panellidportal</button>}
                    {isAdmin && <button onClick={() => navigate('/Adminportal')}>Adminportal</button>}
            
            <button onClick={loguit}>Uitloggen</button>
            </div>
        </div>
    );
}

export default ProfielPagina;