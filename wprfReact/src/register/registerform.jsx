import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './registerForm.css';
import { gapi } from 'gapi-script';
import GoogleLoginButton from '../Google/GoogleLogin.jsx';
import { loadGoogleServiceApi } from '../Google/GoogleserviceApi.js';


function RegisterForm() {
    const [Name, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registerType, setRegisterType] = useState('System');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (password !== confirmPassword) {
            alert('Wachtwoord and Herhaal Wachtwoord must be the same.');
            return;
        }
    
            // user object bestaat uit een User object met daarin de gebruikersgegevens en een password string.
            // op deze manier gedaan zodat de API de gebruikersgegevens en het wachtwoord apart kan verwerken.
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
                headers: { 'Content-Type': 'application/json' },
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
                return navigate('/login');
            }
            
            //print netwerk error in console als die er is
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    loadGoogleServiceApi();

    return (
        <div className='register-form-container'>
            <img src="src\images\accessibilitylogo.png" alt="Logo" className="registerlogo" />
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Voornaam" required value={Name} onChange={e => setFirstName(e.target.value)} />
                <input type="text" placeholder="Achternaam" required value={lastName} onChange={e => setLastName(e.target.value)} />
                <input type="text" placeholder="E-mailadres" required value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Wachtwoord" required value={password} onChange={e => setPassword(e.target.value)} />
                <input type="password" placeholder="Herhaal Wachtwoord" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                <button type="submit">Registreren</button>
            </form>
            <GoogleLoginButton/>
        </div>
    );
}

export default RegisterForm;