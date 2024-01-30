import React, { useState, useEffect } from 'react';
import '../css/PanellidPortal.css';
import { useNavigate } from 'react-router-dom';
import { roleValidation } from '../../roleValidation';

const ActieveOnderzoeken = ({ isPanellid, isLoggedIn }) => {
    const navigate = useNavigate();

    useEffect(() => {
        roleValidation(navigate, isPanellid, isLoggedIn);
        }, [isPanellid, isLoggedIn]);

    return ( 
    <div  className="PanellidPortallbg">
        <h1>Actieve Onderzoeken Niet af</h1>
        <div className="terugknop">
            <button onClick={() => navigate("/PanellidPortal")}>Terug</button>
        </div>
    
    </div> 
    
    );
}
 
export default ActieveOnderzoeken;