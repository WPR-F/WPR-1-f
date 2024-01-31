import React, { useState, useEffect } from 'react';
import '../css/PanellidPortal.css';
import { useNavigate } from 'react-router-dom';


const OpenOnderzoeken = ({ isPanellid, isLoggedIn }) => {
    const navigate = useNavigate();

    return ( 
    <div  className="PanellidPortallbg">
        <h1>Open Onderzoeken Niet af</h1>
        <div className="terugknop">
            <button onClick={() => navigate("/PanellidPortal")}>Terug</button>
        </div>
    
    </div> 
    
    );
}
 
export default OpenOnderzoeken;