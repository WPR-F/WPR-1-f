import React, { useState } from 'react';
import './GoogleButton.css';
import { GoogleLogin } from 'react-google-login';

const clientId = "828244250147-lp4h35efg6s4o666t8emosrikt0ml8jm.apps.googleusercontent.com";

function Login() {

    const response = () => {
        console.log(response);
    }

   
    return (
        <div className='google-Login-Button-container' >
            <GoogleLogin className='google-Login-Button'
                clientId={clientId}
                buttonText="Inloggen met Google"
                onSuccess={response}
                onFailure={response}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />         
        </div>
    );
}

export default Login;