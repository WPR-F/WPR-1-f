import React, { useState, useEffect } from 'react';
import './loginform.css';

function LoginForm({ setCurrentUser, setIsLoggedIn, currentUser}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        console.log(currentUser);
    }, [currentUser]);
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = {
            email,
            password,
        };
        
        try {
            const response = await fetch('http://localhost:5210/api/accounts/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
    
            const data = await response.json();

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error details:', errorData);
                return;
            }
            if (data.success === false) {
                setErrorMessage(data.message || 'Login failed');
                return;
            }
           
            setCurrentUser(data);
            setIsLoggedIn(true);
            console.log(currentUser)
           
            console.log(data.name)
            
            console.log("Successvol ingelogd");
        } catch (error) {
            console.error('Network error:', error);
        }
        
    };
    
    return (
        <div className='blok'>
            <img src="src\images\accessibilitylogo.png" alt="Logo" className="registerlogo" />
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="E-mailadres" required value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Wachtwoord" required value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginForm;