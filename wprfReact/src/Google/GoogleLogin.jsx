import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './GoogleButton.css';
import { clientId } from './GoogleserviceApi.js';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

function GoogleLoginButton({setCurrentUser, setIsLoggedIn, currentUser, IsloggedIn}) {
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
            if (response.data === google.email) {
                console.log("Emailadres: "+ google.email +" is al in gebruik!")

                //setCurrentUser(response.data);
                //setIsLoggedIn(true);
                navigate('/profielpagina');
            } 
                
        } catch (error) {
            //console.error(error);
            console.log(`Account aangemaakt Email: ${google.email}, Voornaam: ${google.givenName}, Achternaam: ${google.familyName}`);
            await addAccountToDataBase(google);

        }
    };
    

    const addAccountToDataBase =  async (google) => { 
        console.log("Test addAccountToDataBase");
        const user = {
            User: {
                userName : google.givenName,
                lastName : google.familyName,
                email : google.email,
                registerType,
            }

        };

        
        try {
            const url = 'http://localhost:5210/api/accounts/google';
            const response = await axios.post(url, user);
            console.log(response.data);
            //setCurrentUser(response.data);
            //setIsLoggedIn(true);
            navigate('/profielpagina');
        } catch (error) {
            console.error('Error adding account to database:', error);
            // Handle the error, show an error message, etc.
        }
        
    
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
        const googlePassword = '';
        setPassword(googlePassword);
        setConfirmPassword(googlePassword);
        
        try {
            await isAccountregistered(profileObj);
            
        } catch (error) {
            console.log(error);
            
           
            
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