import React, { useState } from 'react';
import './ProfielPagina.css';
import { useNavigate } from 'react-router-dom';

function ProfielPagina({ currentUser, setIsLoggedIn, setCurrentUser }) {
    const [isEditable, setIsEditable] = useState(false);
    const navigate = useNavigate();

    const loguit = () => {
        setIsLoggedIn(false);
        setCurrentUser(null);
        navigate('/login')
        console.log("Uitgelogd");
    }

    // NOG NIET AF (aangepaste gegevens worden nog niet opgeslagen)
    // zorgt er nu voor dat de gegevens van de gebruiker in een textarea komen te staan
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
                // Als er geen gebruiker is ingelogd, laat dan dit zien (eigenlijk zou dit niet moeten kunnen gebeuren) 
                <p>Log eerst in</p>
            )}
            <div className='onderkant'>
            <button onClick={toggleEditable}>{isEditable ? 'Opslaan' : 'Bewerk'}</button>
            <button onClick={loguit}>Uitloggen</button>

            {/*Alle knoppen hieronder niet functioneel (NF) */}
            <button>Verwijder account nf</button>
            <button>Meer nf</button>
            </div>
        </div>
    );
}

export default ProfielPagina;