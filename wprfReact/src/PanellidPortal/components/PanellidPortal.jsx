import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/PanellidPortal.css';


const PanellidPortal = ({}) => {
    const navigate = useNavigate();

    return ( 
    <div className="PanellidPortallbg"><h1>PanellidPortal</h1>
    <div className="knoppen">
        <button onClick={() => navigate("./PanellidProfiel")}>Profiel</button>
        <button onClick={() => navigate("./OpenOnderzoeken")}>Onderzoeken</button>
        <button onClick={() => navigate("./ActieveOnderzoeken")} >Actieve Onderzoeken</button>
    </div>
    </div> 
    
    );
}
 
export default PanellidPortal;