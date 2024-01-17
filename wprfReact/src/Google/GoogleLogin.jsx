import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './GoogleButton.css';
import { clientId } from './GoogleserviceApi.js';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

function GoogleLoginButton({ googleResponse, setIsLoggedIn, currentUser, IsloggedIn}) {
    const [Name, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registerType, setRegisterType] = useState('Google');
    const [user, setUser] = useState([]);
    const [profileObj, setProfileObj] = useState(null);
    const navigate = useNavigate();
    

    
    //Vergelijkt de google email met de email bekend in de database. Indien er geen email bekend is wordt er een nieuwe account aangemaakt
    const isAccountregistered =  async (google) => { 

        try {
            const url = 'http://localhost:5210/api/accounts/getemail';
            const data = new FormData();
            data.append('email', google.email);
        
            const response = await axios.post(url, data);
            //console.log(response.data);
            if (response.data === google.email) {
                console.log("Emailadres: "+ google.email +" is al in gebruik!")
        }
            
        } catch (error) {
            //console.error(error);
            console.log(`Account aangemaakt Email: ${google.email}, Voornaam: ${google.givenName}, Achternaam: ${google.familyName}`);

        }
    };

    const addAccountToDataBase =  async () => { 
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
            const url = 'http://localhost:5210/api/accounts/register';
            const response = await axios.post(url, user);
            console.log(response.data);
            // Handle the response or do any necessary actions
        } catch (error) {
            console.error('Error adding account to database:', error);
            // Handle the error, show an error message, etc.
        }
        /*
        try {
            // Stuurt een POST request naar de registratie API endpoint met de ingevoerde gebruikersgegevens.
            // En geeft het response object de waarde van de response van de API.
            const response = await fetch('http://localhost:5210/api/accounts/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...user, password })
            });
    
            //print error in console als die er is
            //mist nog error bericht zoals : wachtwoord te kort of email al in gebruik
    
            
            //print netwerk error in console als die er is
        } catch (error) {
            console.error('Network error:', error);
        }
        */

       
    };

    const googleLoginAuthentication =  async (response) => {
        const { profileObj } = response;
        setProfileObj(profileObj);
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
        
        try {
           await isAccountregistered(profileObj);
            
        } catch (error) {
            await addAccountToDataBase();
            
            try {
                const url = 'http://localhost:5210/api/Accounts/register';
                const data = {user: user, password: password};
                //data.append('email', googleEmail);
               
            
                const response = await axios.post(url, data);
                //console.log(response.data);
                
            } catch (error) {
                console.log(error);
            }
            
        }
    }
        

          
    
    

    const responseGoogle = (response) => {
        const { profileObj } = response;
        console.log(`${profileObj}`);
    }
    
    
    return (
        <div className='google-Login-Button-container' >
            <GoogleLogin className='google-Login-Button'
                clientId={clientId}
                buttonText="Inloggen met Google"
                onSuccess={googleLoginAuthentication}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                isSignedIn={false}
                contentSecurityPolicy={'require-trusted-types-for'} />         
        </div>
    );
    }


export default GoogleLoginButton;