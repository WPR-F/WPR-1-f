import React, { useState } from 'react';
import './GoogleButton.css';
import { GoogleLogin } from 'react-google-login';

const clientId = "828244250147-lp4h35efg6s4o666t8emosrikt0ml8jm.apps.googleusercontent.com";

function Login() {
    const [Name, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const createAccount =  async (response) => {
        const { profileObj } = response;
        setFirstName(profileObj.givenName);
        setLastName(`${profileObj.familyName}`);
        setEmail(`${profileObj.email}`);
        setPassword(null);
        setConfirmPassword(null);
        console.log(`Account aangemaakt Email: ${profileObj.email}, Voornaam: ${profileObj.givenName}, Achternaam: ${profileObj.email} `);
       
    }
    const addAccountToDatabase = async () => {

        createAccount();

        const user = {
            Name,
            lastName,
            email,
            password,
            confirmPassword
        };
        

    
        
        try {
            const response = await fetch('http://localhost:5210/api/accounts/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error details:', errorData);
                return;
            }
    
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Network error:', error);
        }
    };
   


    const responseGoogle = (response) => {
        const { profileObj } = response;
        console.log(`${profileObj}`);
    }
    
    
    return (
        <div className='google-Login-Button-container' >
            <GoogleLogin className='google-Login-Button'
                clientId={clientId}
                buttonText="Inloggen met Google"
                onSuccess={addAccountToDatabase}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                isSignedIn={false}
                contentSecurityPolicy={'require-trusted-types-for'}
            />         
        </div>
    );
}

export default Login;