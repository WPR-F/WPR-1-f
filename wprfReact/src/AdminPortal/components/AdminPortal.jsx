import React, { useState, useEffect } from 'react';
import '../css/AdminPortal.css';
import { useNavigate } from 'react-router-dom';


const AdminPortal = ({ isAdmin, isLoggedIn }) => {
    const [melding, setMelding] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
            console.log("niet ingelogd");
        }
        if (!isAdmin) {
            navigate("/profielpagina");
            console.log(isAdmin+"geen admin");
        }
     
    }, [isAdmin, isLoggedIn]);

    return ( 
    <div className="adminportalbg"><h1>AdminPortal</h1>
    <div className="knoppen">
        <button onClick={() => navigate("./PanellidLijst")}>Ervaringsdeskundigen</button>
        <button onClick={() => navigate("./HuidigeOnderzoeken")}>Onderzoeken</button>
        <button onClick={() => navigate("./BedrijvenLijst")} >Bedrijven</button>
        <button onClick={() => navigate("./Aanvragen")}>Aanvragen {melding} </button>
    </div>
    </div> 
    
    );
}
 
export default AdminPortal;