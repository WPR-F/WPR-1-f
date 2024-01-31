import React, { useState, useEffect, useContext } from 'react';
import '../css/AdminPortal.css';
import { useNavigate } from 'react-router-dom';
import { roleValidation } from '../../roleValidation';
import { AuthContext } from '../../authContext.js';

const AdminPortal = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    
    useEffect(() => {
    roleValidation(navigate, auth.isAdmin, auth.isLoggedIn);
    }, [auth.isAdmin, auth.isLoggedIn]);

    return ( 
    <div className="adminportalbg"><h1>AdminPortal</h1>
    <div className="knoppen">
        <button onClick={() => navigate("./PanellidLijst")}>Ervaringsdeskundigen</button>
        <button onClick={() => navigate("./HuidigeOnderzoeken")}>Onderzoeken</button>
        <button onClick={() => navigate("./BedrijvenLijst")} >Bedrijven</button>
    </div>
    <div className="terugknop">
        <button onClick={() => navigate("/profielpagina")}>Terug naar profiel</button>
    </div>
    </div> 
    
    );
}
 
export default AdminPortal;