import React, { useState } from 'react';
import './ProfielPagina.css';

function ProfielPagina({ currentUser, setIsLoggedIn, setCurrentUser }) {
    const [isEditable, setIsEditable] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const loguit = () => {
        setIsLoggedIn(false);
        setCurrentUser(null);
        console.log("Uitgelogd");
    }

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
            <button onClick={toggleEditable}>{isEditable ? 'Opslaan' : 'Bewerk'}</button>
            <button onClick={loguit}>Uitloggen</button>
            <button>Verwijder account nf</button>
            <button>Meer nf</button>
            </div>
        </div>
    );
}

export default ProfielPagina;