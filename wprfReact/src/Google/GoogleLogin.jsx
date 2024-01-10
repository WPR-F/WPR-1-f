import React, { useState } from 'react';
import './GoogleButton.css';
import { GoogleLogin } from 'react-google-login';

const clientId = "828244250147-lp4h35efg6s4o666t8emosrikt0ml8jm.apps.googleusercontent.com";

function GoogleLoginButton() {
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
        //setPassword(null);
        //setConfirmPassword(null);
        setPassword("Abcabc123!");
        setConfirmPassword("Abcabc123!");
        console.log(profileObj);
        console.log(`Account aangemaakt Email: ${profileObj.email}, Voornaam: ${profileObj.givenName}, Achternaam: ${profileObj.email} `);
       

              // user object bestaat uit een User object met daarin de gebruikersgegevens en een password string.
            // op deze manier gedaan zodat de API de gebruikersgegevens en het wachtwoord apart kan verwerken.
            const user = {
                User: {
                    userName: Name,
                    lastName,
                    email,
                },
                password
            };
            
        
            try {
                // Stuurt een POST request naar de registratie API endpoint met de ingevoerde gebruikersgegevens.
                // En geeft het response object de waarde van de response van de API.
                const response = await fetch('http://localhost:5210/api/accounts/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ...user, password })
                });
        
                //print error in console als die er is
                //mist nog error bericht zoals : wachtwoord te kort of email al in gebruik
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error details:', errorData);
                    if (errorData.errors && errorData.errors.password) {
                        console.error('Password error:', errorData.errors.password);
                    }
                    return;
                }
        
                //als registratie successvol is, ga naar login pagina en log response data voor debugging
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    navigate('/login'); 
                }
                
                //print netwerk error in console als die er is
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
                onSuccess={createAccount}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                isSignedIn={false}
                contentSecurityPolicy={'require-trusted-types-for'}
            />         
        </div>
    );
}

export default GoogleLoginButton;