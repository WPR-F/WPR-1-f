import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './GoogleButton.css';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

const clientId = "828244250147-lp4h35efg6s4o666t8emosrikt0ml8jm.apps.googleusercontent.com";

function GoogleLoginButton({ setCurrentUser, setIsLoggedIn, currentUser, IsloggedIn}) {
    const [Name, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registerType, setRegisterType] = useState('Google');
    const [user, setUser] = useState([]);
    const navigate = useNavigate();


    const createAccount =  async (response) => {
        const { profileObj } = response;
        const googleGivenName = profileObj.givenName;
        setFirstName(googleGivenName);
        const googleFamilyName = profileObj.familyName;
        setLastName(googleFamilyName);
        const googleEmail = profileObj.email;
        setEmail(googleEmail);
        //Wachtwoord is hardcoded dit moet nog worden aangepast 
        const googlePassword = 'Abcabc123.';
        setPassword(googlePassword);
        setConfirmPassword(googlePassword);
        console.log(profileObj);
        console.log(`Account aangemaakt Email: ${profileObj.email}, Voornaam: ${profileObj.givenName}, Achternaam: ${profileObj.familyName} `);

        
        await axios.get('http://localhost:5210/api/accounts/email')
        .then(response => { 
            console.log(response.data); 
            console.log("Get request received");
        }, error => {
            console.log(error);
            console.log("Get request not received");
        });

        

        
       
        console.log("____________________________________");


        const accountIsRegistered = async (userEmail) => {
            
            try {
              const response = await fetch(`http://localhost:5210/api/accounts/getemail`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify(user)
              });

              const data = await response.json();

              JSON.stringify(data);
              console.log(data)
            
          
              // Assuming the API returns some data indicating whether the user is registered or not.
              // You need to adjust this based on the actual API response.
              console.log(user);
              if (data.email = userEmail) {
                console.log('User is already registered.');
                // Handle the case where the user is already registered.
              } else {
                console.log('User is not registered.');
                // Handle the case where the user is not registered.
              }
            } catch (error) {
              console.error('Network error:', error);
            }
            

          };
         

          
         await accountIsRegistered(googleEmail);


              // user object bestaat uit een User object met daarin de gebruikersgegevens en een password string.
            // op deze manier gedaan zodat de API de gebruikersgegevens en het wachtwoord apart kan verwerken.
            /*
            const user = {
                User: {
                    userName: Name,
                    lastName,
                    email,
                    registerType,
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
                    body: JSON.stringify({ ...user, password }),
                    if (user) {

                    }
                    
                });

                
                const data = await response.json();

                setCurrentUser(data);
                setIsLoggedIn(true);
                navigate('/profielpagina'); 
                
        
               
            } catch (error) {
                console.error('Network error:', error);
            }
            */


          
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
                contentSecurityPolicy={'require-trusted-types-for'} />         
        </div>
    );
}

export default GoogleLoginButton;