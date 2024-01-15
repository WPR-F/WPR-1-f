import React, { useState } from 'react';
import '../css/AdminPortal.css';
import { useNavigate } from 'react-router-dom';

const AdminPortal = () => {
    const [melding, setMelding] = useState(0);
    const navigate = useNavigate();

    return ( 
    <div className="blok"><h1>AdminPortal</h1>
    <div className="knoppen">
        <button onClick={() => navigate("./ErvaringsDeskundigenLijst")}>Ervaringsdeskundigen</button>
        <button onClick={() => navigate("./HuidigeOnderzoeken")}>Onderzoeken</button>
        <button onClick={() => navigate("./BedrijvenLijst")} >Bedrijven</button>
        <button onClick={() => navigate("./Aanvragen")}>Aanvragen {melding} </button>
    </div>
    </div> 
    
    );
}
 
export default AdminPortal;