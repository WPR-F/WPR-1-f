import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../authContext.js';
import '../css/PanellidPortal.css';
import { useNavigate } from 'react-router-dom';
import { roleValidation } from '../../roleValidation';

const ActieveOnderzoeken = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    useEffect(() => {
        roleValidation(navigate, auth.isPanellid, auth.isLoggedIn);
        }, [auth.isPanellid, auth.isLoggedIn]);

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