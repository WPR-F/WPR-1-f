import React, { useState, useEffect } from 'react';
import '../css/AdminPortal.css';
import { useNavigate } from 'react-router-dom';
import { Admincheck } from '../../apiService';

const AdminPortal = ({ currentUser }) => {
    const [melding, setMelding] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if(currentUser && currentUser.email !== undefined) {
        Admincheck(currentUser, "checkadmin")
        .then(response => {
            if (!response.ok) {
                navigate("profielpagina");
                console.log("geen toegang tot adminportal");
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }

    else {
        navigate("/Login");
    }
    }, [currentUser]);

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