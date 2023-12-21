import React, { useState } from 'react';
import '../register/registerform.css';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';
import Login from '../Google/GoogleLogin.jsx';

const clientId = "828244250147-lp4h35efg6s4o666t8emosrikt0ml8jm.apps.googleusercontent.com";

function RegisterForm() {
    const [Name, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (password !== confirmPassword) {
            alert('Wachtwoord and Herhaal Wachtwoord must be the same.');
            return;
        }
    
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

    useEffect(() => {
        function start() {
          gapi.client.init({
            clientId: clientId,
            scope: ""
            
          })
        };
    
        gapi.load('client:auth2', start);
      });

    return (
        <div className='blok'>
            <img src="src\images\accessibilitylogo.png" alt="Logo" className="registerlogo" />
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Voornaam" required value={Name} onChange={e => setFirstName(e.target.value)} />
                <input type="text" placeholder="Achternaam" required value={lastName} onChange={e => setLastName(e.target.value)} />
                <input type="text" placeholder="E-mailadres" required value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Wachtwoord" required value={password} onChange={e => setPassword(e.target.value)} />
                <input type="password" placeholder="Herhaal Wachtwoord" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                <button type="submit">Registreren</button> 
            </form>  
            <Login/>
        </div>
    );
}

export default RegisterForm;