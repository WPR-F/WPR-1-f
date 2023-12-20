import React, { useState } from 'react';
import './GoogleButton.css';
import { GoogleLogin } from 'react-google-login';

const clientId = "828244250147-lp4h35efg6s4o666t8emosrikt0ml8jm.apps.googleusercontent.com";

function Login() {

    const onSuccess = (res) => {
        console.log("Inloggen gelukt! Gebruiker: ", );
    }

    const onFailure = (res) => {
        console.log("Inloggen niet gelukt! ", res);
    }
    return (
        <div className='google-Login-Button-container' >
            <GoogleLogin className='google-Login-Button'
                clientId={clientId}
                buttonText="Inloggen met Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />         
        </div>
    );
}

export default Login;