import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Onderzoek.css';

function Onderzoek() {
    const [titel, setTitel] = useState('');
    const [typeBeperking, setTypeBeperking] = useState('');
    const [postcode, setPostcode] = useState('');
    const [leeftijd, setLeeftijd] = useState('');
    const [onderzoeken, setOnderzoeken] = useState([]);

    useEffect(() => {
        
        const fetchOnderzoeken = async () => {
          try {
            const response = await axios.get('http://localhost:5210/api/Onderzoek/getOnderzoeken');
            setOnderzoeken(response.data);
          } catch (error) {
            console.error('Error fetching onderzoeken:', error);
          }
        };
      
        fetchOnderzoeken();
      }, []); 
      

    const OnderzoekPlaatsen = async () => {
        const onderzoekData = {
                titel: titel,
                typeBeperking: typeBeperking, 
                postcode: postcode,
                leeftijd: leeftijd,
            };
            const url = 'http://localhost:5210/api/Onderzoek/createOnderzoek';
            const data = onderzoekData;

            try {
                const response = await axios.post(url, onderzoekData);
                console.log('Onderzoek geplaatst:', response.data);
                // Update the state or perform any other actions based on the response if needed
            } catch (error) {
                console.error('Error bij het plaatsen van onderzoek:', error);
            }
            
            try {
                const response = axios.get('http://localhost:5210/api/Onderzoek/getOnderzoeken');
                setOnderzoeken(response.data);
              } catch (error) {
                console.error('Error bij het ophalen van onderzoek:', error);
              }
            };


    return (
        <div className='onderzoek-container'>
            <div className='onderzoek-form-container'>
                <h2>Onderzoek Plaatsen</h2>
                <form>
                <label>Onderzoek titel:</label>
                <input type="text" placeholder='Onderzoek titel' required value={titel} onChange={(e) => setTitel(e.target.value)}/>
                <br />
                <label> Type beperking:</label>
                <input type="text" placeholder='Type beperking' required value={typeBeperking} onChange={(e) => setTypeBeperking(e.target.value)}/>
                <br />
                <label>Postcode:</label>
                <input type="text" placeholder='Postcode' required value={postcode} onChange={(e) => setPostcode(e.target.value)}/>
                <br />
                <label>Leeftijd:</label>
                <input type="number" placeholder='Leeftijd' required value={leeftijd} onChange={(e) => setLeeftijd(e.target.value)}/>
                </form>
                <button onClick={OnderzoekPlaatsen}>Plaats Onderzoek</button>
            </div>
            <div className='onderzoek-table-container'>
            <h2>Alle Onderzoeken</h2>
            <table className='styled-table'>
                <thead>
                <tr>
                    <th>Titel</th>
                    <th>Beperking</th> 
                    <th>Postcode</th>
                    <th>Leeftijd</th>
                </tr>
                </thead>
                <tbody>
                {onderzoeken.map((onderzoek) => (
                    <tr key={onderzoek.id}>
                    <td>{onderzoek.titel}</td>
                    <td>{onderzoek.typeBeperking}</td>
                    <td>{onderzoek.postcode}</td>
                    <td>{onderzoek.leeftijd}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
    );
}

export default Onderzoek;
