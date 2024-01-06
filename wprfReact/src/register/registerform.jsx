import React, { useState } from 'react';
import './registerform.css';

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
            User: {
                userName: Name,
                lastName,
                email,
            },
            password
        };
        
    
        try {
            console.log('Password:', password);
            console.log('Request body:', JSON.stringify({ ...user, password }));
            const response = await fetch('http://localhost:5210/api/accounts/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...user, password })
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error details:', errorData);
                if (errorData.errors && errorData.errors.password) {
                    console.error('Password error:', errorData.errors.password);
                }
                return;
            }
    
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Network error:', error);
        }
    };

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
        </div>
    );
}

export default RegisterForm;