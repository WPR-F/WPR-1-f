import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../authContext.js';
import './loginform.css';
import { useNavigate } from 'react-router-dom';
import { GebruikerApiCall, RoleCheck } from '../apiService';
import GoogleLoginButton from '../Google/GoogleLogin.jsx';
import { loadGoogleServiceApi } from '../Google/GoogleserviceApi.js';
import { jwtDecode } from "jwt-decode";

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const TokenDecoder = {
    decodeToken: (token) => {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);

        // Extract the user role from the decoded token
        const userRole = decodedToken.role;

        return userRole;
    },
  };


    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = {
            email,
            password,
        };
        
    
        try {
            const response = await GebruikerApiCall(user,"login");
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

            if (data.user && data.token) {
                const decodedToken = jwtDecode(data.token);
                const userRoles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
                console.log('User roles:', userRoles);
            
                auth.setCurrentUser(data.user);
                auth.setIsLoggedIn(true);
                auth.setUserRole(userRoles); 
                
                navigate('/profielpagina');
            }
                

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
            <GoogleLoginButton/>
        </div>
    );
}

export default LoginForm;