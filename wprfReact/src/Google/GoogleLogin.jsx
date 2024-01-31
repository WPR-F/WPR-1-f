import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../authContext.js';
import { useNavigate } from 'react-router-dom';
import './GoogleButton.css';
import { GebruikerApiCall, RoleCheck } from '../apiService';
import { clientId } from './GoogleserviceApi.js';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';

function GoogleLoginButton() {
    const [Name, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registerType, setRegisterType] = useState('Google');
    const [profileObj, setProfileObj] = useState(null);
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    

    
    //Vergelijkt de google email met de email bekend in de database. Indien er geen email bekend is wordt er een nieuwe account aangemaakt
    const isAccountregistered =  async (google) => { 
        
        try {
            const url = 'http://localhost:5210/api/accounts/postbyemail';
            const data = new FormData();
            data.append('email', google.email);
        
            const response = await axios.post(url, data);

            if (response.data.email === google.email) {
                console.log("Emailadres: "+ google.email +" is al in gebruik!")

                const isadmin = await RoleCheck(data, "Admin/checkAdmin");
                if (isadmin === true) {
                    auth.setIsAdmin(true);
                }
                else auth.setIsAdmin(false);

                const ispanellid = await RoleCheck(data, "Panellid/checkPanellid");
                if (ispanellid === true) {
                    console.log("ispanellid1"+ispanellid);
                    auth.setIsPanellid(true);
                }
                else auth.setIsPanellid(false);

                const isbedrijf = await RoleCheck(data, "Company/checkCompany");
                if (isbedrijf === true) {
                    
                    auth.setIsBedrijf(true);
                }
                else auth.setIsBedrijf(false);

                auth.setCurrentUser(response.data);
                auth.setIsLoggedIn(true);
                
                navigate('/profielpagina');
            } else if (response.data !== google.email){
                console.log("Emailadres: "+ google.email +" is nog niet in gebruik!")
                await addAccountToDataBase(google);
            }
                
        } catch (error) {
            console.error(error);

        }
    };
    
    //Voegt een nieuwe account toe aan de database
    const addAccountToDataBase =  async (google) => { 
        console.log(`Account aangemaakt Email: ${google.email}, Voornaam: ${google.givenName}, Achternaam: ${google.familyName}`);
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
            auth.setCurrentUser(response.data);
            auth.setIsLoggedIn(true);
            navigate('/profielpagina');
        } catch (error) {
            console.error('Error adding account to database:', error);
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