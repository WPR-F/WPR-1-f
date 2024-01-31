import React, { useState, useEffect } from 'react';
import '../css/PanellidPortal.css';
import { useNavigate } from 'react-router-dom';


const OpenOnderzoeken = ({ isPanellid, isLoggedIn }) => {
    const navigate = useNavigate();

    
    return ( 
        <div className='onderzoek-table-container'>
        <h2>Alle Onderzoeken</h2>
        <table className='styled-table'>
            <thead>
            <tr>
                <th>Titel</th>
                <th>Locatie</th> 
                <th>Datum</th>
                <th>Uitvoerder</th>
            </tr>
            </thead>
            <tbody>
            {onderzoeken && onderzoeken.map((onderzoek) => (
                <tr key={onderzoek.id}>
                <td>{onderzoek.titel}</td>
                <td>{onderzoek.locatie}</td>
                <td>{onderzoek.datum}</td>
                <td>{onderzoek.uitvoerder}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    
    );
}
 
export default OpenOnderzoeken;