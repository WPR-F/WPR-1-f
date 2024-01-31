import React, { useState, useEffect } from 'react';
import '../css/AdminPortal.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const HuidigeOnderzoeken = ({ isAdmin, isLoggedIn }) => {
    const navigate = useNavigate();
    const [onderzoeken, setOnderzoeken] = useState([]);


    useEffect(() => {
        async function fetchOnderzoeken () {
          const response = await axios.get('http://localhost:5210/api/Onderzoek/getOnderzoeken');
          console.log(response.data);
          setOnderzoeken(response.data);
        }
        fetchOnderzoeken();
      }, []);

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
 
export default HuidigeOnderzoeken;