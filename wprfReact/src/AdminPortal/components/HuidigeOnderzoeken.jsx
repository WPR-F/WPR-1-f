import React, { useState } from 'react';
import '../css/AdminPortal.css';
import { useNavigate } from 'react-router-dom';

const HuidigeOnderzoeken = () => {
    const navigate = useNavigate();
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