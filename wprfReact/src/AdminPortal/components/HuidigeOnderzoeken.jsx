import React, { useState, useEffect } from 'react';
import '../css/AdminPortal.css';
import { useNavigate } from 'react-router-dom';
import { roleValidation } from '../../roleValidation';

const HuidigeOnderzoeken = ({ isAdmin, isLoggedIn }) => {
    const navigate = useNavigate();
  
    useEffect(() => {
        roleValidation(navigate, isAdmin, isLoggedIn);
        }, [isAdmin, isLoggedIn]);

    return ( 
    <div  className="blok">
        <h1>Huidige Onderzoeken Niet af</h1>
        <div className="terugknop">
            <button onClick={() => navigate("/AdminPortal")}>Terug</button>
        </div>
    
    </div> 
    
    );
}
 
export default HuidigeOnderzoeken;