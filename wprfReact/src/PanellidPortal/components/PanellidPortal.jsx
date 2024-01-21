import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/PanellidPortal.css';
import { roleValidation } from '../../roleValidation';


const PanellidPortal = ({ isPanellid, isLoggedIn }) => {
    const navigate = useNavigate();

    useEffect(() => {
        roleValidation(navigate, isPanellid, isLoggedIn);
        }, [isPanellid, isLoggedIn]);

    return ( 
    <div className="PanellidPortallbg"><h1>PanellidPortal</h1>
    <div className="knoppen">
        <button onClick={() => navigate("./PanellidProfiel")}>Panellidprofiel</button>
        <button onClick={() => navigate("./OpenOnderzoeken")}>Onderzoeken</button>
        <button onClick={() => navigate("./ActieveOnderzoeken")} >Actieve Onderzoeken</button>
    </div>
    <div className="terugknop">
        <button onClick={() => navigate("/profielpagina")}>Terug naar profiel</button>
    </div>
    </div> 
    
    );
}
 
export default PanellidPortal;