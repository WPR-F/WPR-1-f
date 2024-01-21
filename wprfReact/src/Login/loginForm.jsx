import React, { useState, useEffect } from 'react';
import './loginForm.css';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
<<<<<<< HEAD
import GoogleLoginButton from '../Google/GoogleLogin.jsx';
import { loadGoogleServiceApi } from '../Google/GoogleserviceApi.js';


=======
import { GebruikerApiCall, Admincheck } from '../apiService';
>>>>>>> Develop
=======
import { GebruikerApiCall, RoleCheck } from '../apiService';
>>>>>>> origin/Develop

function LoginForm({ setCurrentUser, setIsLoggedIn, setIsAdmin, setIsPanellid}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
   
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = {
            email,
            password,
        };
        
        
        // stuurt een POST request naar de login API endpoint met de ingevoerde gebruikersgegevens.
        // En geeft het response object de waarde van de response van de API. 
        try {
            const response = await fetch('http://localhost:5210/api/accounts/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            });
    
            const data = await response.json();


            //zet de error message als er of geen account met ingevoerde email bestaat of als het wachtwoord niet klopt
            if (!response.ok) {
                if (response.status === 401) {
                    setErrorMessage('Onjuist wachtwoord of emailadres');
                    return;
                }
                else if (response.status === 404) {
                    setErrorMessage('Gebruiker niet gevonden');
                    return;
                }

                console.error('Error details:', errorData);   
                return;
            }

            //Als de login faalt om een onbekende reden, print dan de error in de console en laat de gebruiker weten dat er iets mis gegaan is
            if (data.success === false) {
                setErrorMessage('Er is iets fout gegaan');
                console.error('Error details:', data);
                return;
            }
                const isadmin = await RoleCheck(data, "Admin/checkAdmin");
                if (isadmin === true) {
                    setIsAdmin(true);
                }
                else setIsAdmin(false);

                const ispanellid = await RoleCheck(data, "Panellid/checkPanellid");
                if (ispanellid === true) {
                    console.log("ispanellid1"+ispanellid);
                    setIsPanellid(true);
                }
                else setIsPanellid(false);
               
                setCurrentUser(data);
                setIsLoggedIn(true);              
                navigate('/profielpagina');

        } catch (error) {
            console.error('Network error:', error);
        }
        
    };

    loadGoogleServiceApi();

   
    
    return  (
        <div className='login-form-container'>
            <img src="src\images\accessibilitylogo.png" alt="Logo" className="registerlogo" />
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="E-mailadres" required value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Wachtwoord" required value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
            
            <div className='errormessage-container'>
            <p className='errormessage'>{errorMessage}</p>
            </div>
            <GoogleLoginButton />
        </div>
    );
    
}

export default LoginForm;