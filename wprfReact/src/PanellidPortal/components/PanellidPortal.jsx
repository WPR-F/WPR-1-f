import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../authContext.js';
import { useNavigate } from 'react-router-dom';
import '../css/PanellidPortal.css';



const PanellidPortal = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

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