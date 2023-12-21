import React, { useState } from 'react';
import './registerform.css';
import { GoogleLogout } from 'react-google-login';

const clientId = "828244250147-lp4h35efg6s4o666t8emosrikt0ml8jm.apps.googleusercontent.com";

function Logout() {

    const onSuccess = (res) => {
        console.log("Uitloggen gelukt! Gebruiker: ");
    }
    return (
        <div class='signOutButton'>
            <GoogleLogout
                clientId={clientId}
                buttonText="Uitloggen"
                onSuccess={onSuccess}   
            ></GoogleLogout>        
        </div>
    );
}

export default Logout;