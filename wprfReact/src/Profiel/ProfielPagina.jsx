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

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className='blok'>
            {currentUser ? (
                <div className='profiel'>
                    <h1>Welkom {currentUser.name}!</h1>
                    <div className='gegevens'>
                    <h2>Voornaam: {isEditable ? <textarea>{currentUser.name}</textarea> : currentUser.name}</h2>
                    <h2>Achternaam: {isEditable ? <textarea>{currentUser.lastName}</textarea> : currentUser.lastName}</h2>
                    <h2>E-mail: {isEditable ? <textarea>{currentUser.email}</textarea> : currentUser.email}</h2>
                    <h2>Wachtwoord: {isEditable ? <textarea>{showPassword ? currentUser.password : '******'}</textarea> : showPassword ? currentUser.password : '******'}</h2>
                    </div>
                </div>
            ) : (
                <p>Log eerst in</p>
            )}

            <button className='toonww' onClick={toggleShowPassword}>{showPassword ? 'verstop wachtwoord' : 'Toon wachtwoord'}</button>
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