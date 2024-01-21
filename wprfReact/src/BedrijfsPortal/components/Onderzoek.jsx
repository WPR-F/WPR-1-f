import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Onderzoek.css';

function Onderzoek() {
    const [titel, setTitel] = useState('');
    const [beschrijving, setBeschrijving] = useState('');
    const [locatie, setLocatie] = useState('');
    const [datum, setDatum] = useState('');
    const [uitvoerder, setUitvoerder] = useState('');
    const [beloning, setBeloning] = useState('');
    const [categorie, setCategorie] = useState('');
    const [aanmeldingen, setAanmelding] = useState('');
    const [typeBeperking, setTypeBeperking] = useState('');
    const [postcode, setPostcode] = useState('');
    const [leeftijd, setLeeftijd] = useState('');
    const [accounts, setAccounts] = useState([]);
    const [onderzoeken, setOnderzoeken] = useState([]);
    const [showFirst, setShowFirst] = useState(true);
    const [showSecond, setShowSecond] = useState(false);
    const [showThird, setShowThird] = useState(false);
    const [minimumDate, setMinimumDate] = useState(new Date().toLocaleDateString());
    
    const handleStep1 = () => {
      setShowFirst(true);
      setShowSecond(false);
      setShowThird(false);
    };
  
    const handleStep2 = () => {
      setShowFirst(false);
      setShowSecond(true);
      setShowThird(false);
    };

    const handleStep3 = () => {
      setShowFirst(false);
      setShowSecond(false);
      setShowThird(true);
    };
    
    const handleUitvoerderChange = (e) => {
      setUitvoerder(e.target.value);
    };
  
    const handleBeperkingChange = (e) => {
      setTypeBeperking(e.target.value);
    };

    useEffect(() => {
      async function fetchAccounts() {
        const response = await axios.get('http://localhost:5210/api/Accounts/getAccounts');
        console.log(response.data);
        setAccounts(response.data);
      }
      fetchAccounts();
    }, []);

    useEffect(() => {
      async function fetchOnderzoeken () {
        const response = await axios.get('http://localhost:5210/api/Onderzoek/getOnderzoeken');
        console.log(response.data);
        setOnderzoeken(response.data);
      }
      fetchOnderzoeken();
    }, []);
      

    const OnderzoekPlaatsen = async () => {
        const onderzoekData = {
                titel: titel,
                beschrijving: beschrijving, 
                locatie: locatie,
                datum: datum,
                uitvoerder: uitvoerder,
                beloning: beloning,
                categorie: categorie,
                aanmeldingen: aanmeldingen,
                typeBeperking: typeBeperking,
                postcode: postcode,
                leeftijd: leeftijd,
            };
            console.log(onderzoekData); 
            const url = 'http://localhost:5210/api/Onderzoek/createOnderzoek';
            const data = onderzoekData;

            try {
                const response = await axios.post(url, onderzoekData);
                console.log(response.data);
            } catch (error) {
                console.error('Error bij het plaatsen van een onderzoek:', error);
            }
            
            try {
                const response = axios.get('http://localhost:5210/api/Onderzoek/getOnderzoeken');
                setOnderzoeken(response.data);
              } catch (error) {
                console.error('Error bij het ophalen van een onderzoek:', error);
              }
            };


    return (
        <div className='onderzoek-container'>
          {showFirst && (
            <div className='onderzoek-form-container' id='form1'>
                <h2>Onderzoek Plaatsen</h2>
                <form>
                <label>Onderzoek titel:</label>
                <input type="text" placeholder='Onderzoek titel' required value={titel} onChange={(e) => setTitel(e.target.value)}/>
               
                <label>Beschrijving:</label>
                <textarea type="text" placeholder='Beschrijving' required value={beschrijving} onChange={(e) => setBeschrijving(e.target.value)}/>
               
                <label>Locatie:</label>
                <input type="text" placeholder='Locatie' required value={locatie} onChange={(e) => setLocatie(e.target.value)}/>
              
                <label>Datum:</label>
                <input type="date" placeholder='Datum' defaultValue={minimumDate} required value={datum} onChange={(e) => setDatum(e.target.value)}/>
                </form>
                <button id='volgende' onClick={handleStep2}>Volgende</button>
            </div>
            )}
            {showSecond && (
            <div className='onderzoek-form-container' id='form2'>
                <h2>Onderzoek Plaatsen</h2>
                <form>

                <label>Uitvoerder:</label>
                <select id="uitvoerders" onChange={handleUitvoerderChange}>
                  <option value="">Selecteer een uitvoerder</option>
                  {accounts.map((account) => (
                  <option key={account.id} value={account.username}>{account.userName} {account.lastName}</option>))}
                </select>
               
                <label>Beloning:</label>
                <input type="text" placeholder='Beloning' required value={beloning} onChange={(e) => setBeloning(e.target.value)}/>
                
                <label>Categorie:</label>
                <input type="text" placeholder='Categorie' required value={categorie} onChange={(e) => setCategorie(e.target.value)}/>
                
                <label>Aanmeldingen:</label>
                <input type="number" placeholder='Aanmeldingen' required value={aanmeldingen} onChange={(e) => setAanmelding(e.target.value)}/>

                </form>
                <div className='button-button'>
                <button className='back-button' onClick={handleStep1}>Terug</button>
                <button className='next-button' onClick={handleStep3}>Volgende</button>
                </div>
            </div>
            )}
            {showThird && (
            <div className='onderzoek-form-container' id='form3'>
                <h2>Onderzoek Plaatsen</h2>
                <form>

                <label>Type Beperking:</label>
                <select id="beperkingen" onChange={handleBeperkingChange}>
                  <option value="">Selecteer een beperking</option>
                  <option value="Beperkt zicht">Beperkt zicht</option>
                  <option value="Beperkte gehoor">Beperkte gehoor</option>
                  <option value="Beperkte mobiliteit">Beperkte mobiliteit</option>
                </select>
               
                <label>Postcode:</label>
                <input type="text" placeholder='postcode' required value={postcode} onChange={(e) => setPostcode(e.target.value)}/>
               
                <label>Leeftijd:</label>
                <input type="number" placeholder='Leeftijd' required value={leeftijd} onChange={(e) => setLeeftijd(e.target.value)}/>

                </form>
                <div className='button-button'>
                <button className='back-button' onClick={handleStep2}>Terug</button>
                <button id='Onderzoek Plaatsen' onClick={OnderzoekPlaatsen}>Plaats Onderzoek</button>
                </div>
               
            </div>
            )}
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
        </div>
    );
}

export default Onderzoek;
