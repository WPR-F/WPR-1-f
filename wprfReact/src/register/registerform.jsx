import React from 'react';
import './registerform.css';

import './registerform.css';

function RegisterForm() {
    return (
    <div className='blok'>
        <img src="src\images\accessibilitylogo.png" alt="Logo" className="registerlogo" />
        <form>
            <input type="text" placeholder="Gebruikersnaam" required/>
            <input type="text" placeholder="E-mailadres" required/>
            <input type="text" placeholder="Wachtwoord" required/>
            <input type="text" placeholder="Herhaal Wachtwoord" required/>
            <button type="submit">Registreren</button>
        </form>
    </div>
    );
}

export default RegisterForm;

