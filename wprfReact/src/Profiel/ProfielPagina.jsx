import React from 'react';
import './ProfielPagina.css';

function ProfielPagina({ currentUser, setIsLoggedIn, setCurrentUser }) {
    
    const loguit = () => {
        setIsLoggedIn(false);
        setCurrentUser(null);
        console.log("Uitgelogd");
    }

    return (
        <div className='blok'>
            {currentUser ? (
                <div>
                    <h1>{currentUser.name}</h1>
                    <p>{currentUser.email}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}

            <button onClick={loguit}>Uitloggen</button>
        </div>
    );
}

export default ProfielPagina;