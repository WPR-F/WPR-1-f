import React, { useState, useEffect } from 'react';
import '../css/PanellidPortal.css';
import '../css/PanellidProfiel.css';
import { useNavigate } from 'react-router-dom';


const PanellidProfiel = ({ currentUser }) => {
    const navigate = useNavigate();
    const [activeGroup, setActiveGroup] = useState('normal');
    const [isEditable, setIsEditable] = useState(false);
    const [selectedDays, setSelectedDays] = useState({});

    const [form, setForm] = useState({
        voornaam: currentUser.userName,
        achternaam: currentUser.lastName,
        postcode: '',
        email: currentUser.email,
        telefoonnummer: '',
        typeBeperking: '',
        hulpmiddelen: '',
        aandoening: '',
        typeOnderzoek: '',
        voorkeurBenadering: '',
        commercielePartijen: 'Ja',
        beschikbaarheid: ''
    });

    const slaGegevensOp = async (event) => {
    
        const panellidInfo = {
            UserId: currentUser.id,
            postalCode: form.postcode,
            phoneNumber: form.telefoonnummer,
            DisabilityType: form.typeBeperking,
            Tools: form.hulpmiddelen,
            condition: form.aandoening,
            ResearchType: form.typeOnderzoek,
            PreferdresearchApproach: form.voorkeurBenadering,
            CommercialApproach: form.commercielePartijen === 'Ja', // Convert to boolean
            Availibility: form.beschikbaarheid
        };
        console.log(panellidInfo);
    
        const response = await fetch('http://localhost:5210/api/Panellid/UpdatePanellidInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(panellidInfo),
        });
    
        if (response.ok) {
            const updatedPanellidInfo = await response.json();
            console.log(updatedPanellidInfo);
        } else {
            console.error('Failed to update panellid info');
        }
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setForm(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? (checked ? 'Ja' : 'Nee') : value
        }));
    };

    const handleDayChange = (e) => {
        setSelectedDays({
            ...selectedDays,
            [e.target.name]: e.target.checked
        });
    }

    const toggleEditable = () => {
        setIsEditable(!isEditable);
    }

    useEffect(() => { 
        if(currentUser === null)
        {
            navigate('/login');
        }
    }, [currentUser]);



    const handleBeschikbaarheidOpslaan = () => {
        const beschikbaarheid = Object.entries(selectedDays)
            .filter(([day, isSelected]) => isSelected)
            .map(([day]) => day)
            .join(', ');
    
 
        setForm(prevForm => ({
            ...prevForm,
            beschikbaarheid
        }));
        setActiveGroup('onderzoek');
    }

    

    return ( 
    <div className="PanellidPortallbg">
        <h1>Profiel</h1>
        <div className="scrollableForm">
                <form >
                    {activeGroup === 'normal' && (
                         <>
                         <input type="text" name="voornaam" value={form.voornaam} onChange={handleChange} placeholder="Voornaam" readOnly={!isEditable} />
                         <input type="text" name="achternaam" value={form.achternaam} onChange={handleChange} placeholder="Achternaam" readOnly={!isEditable} />
                         <input type="text" name="postcode" value={form.postcode} onChange={handleChange} placeholder="Postcode" readOnly={!isEditable} />
                         <input type="text" name="email" value={form.email} onChange={handleChange} placeholder="Email" readOnly={!isEditable} />
                         <input type="text" name="telefoonnummer" value={form.telefoonnummer} onChange={handleChange} placeholder="Telefoonnummer" readOnly={!isEditable} />
                         </>
                    )}
                    {activeGroup === 'beperking' && (
                        <>
                            
                        <input type="text" name="typeBeperking" value={form.typeBeperking} onChange={handleChange} placeholder="Type beperking" readOnly={!isEditable}/>
                        <input type="text" name="hulpmiddelen" value={form.hulpmiddelen} onChange={handleChange} placeholder="Hulpmiddelen" readOnly={!isEditable}/>
                        <input type="text" name="aandoening" value={form.aandoening} onChange={handleChange} placeholder="Aandoening" readOnly={!isEditable}/>
                        </>
                    )}
                    {activeGroup === 'onderzoek' && (
                        <>
                        <input type="text" name="typeOnderzoek" value={form.typeOnderzoek} onChange={handleChange} placeholder="Type onderzoek" readOnly={!isEditable}/>
                        <input type="text" name="voorkeurBenadering" value={form.voorkeurBenadering} onChange={handleChange} placeholder="Voorkeur benadering" readOnly={!isEditable}/>
                        <input type="checkbox" name="commercielePartijen" checked={form.commercielePartijen === 'Ja'} onChange={handleChange} readOnly={!isEditable} />
                        <button onClick={() => setActiveGroup('dateTme')} disabled={!isEditable}>Beschikbaarheid</button>
                        </>
                    )}
                    {activeGroup === 'dateTme' && (
                        <>
                          <div className='dateTime'>
                          <label>
                              <input type="checkbox" name="Monday" checked={selectedDays.Monday} onChange={handleDayChange} />
                              Monday
                          </label>
                          <label>
                              <input type="checkbox" name="Tuesday" checked={selectedDays.Tuesday} onChange={handleDayChange} />
                              Tuesday
                          </label>
                            <label>
                                <input type="checkbox" name="Wednesday" checked={selectedDays.Wednesday} onChange={handleDayChange} />
                                Wednesday
                            </label>
                            <label>
                                <input type="checkbox" name="Thursday" checked={selectedDays.Thursday} onChange={handleDayChange} />
                                Thursday
                            </label>
                            <label>
                                <input type="checkbox" name="Friday" checked={selectedDays.Friday} onChange={handleDayChange} />
                                Friday
                            </label>
                            <label>
                                <input type="checkbox" name="Saturday" checked={selectedDays.Saturday} onChange={handleDayChange} />
                                Saturday
                            </label>
                            <label>
                                <input type="checkbox" name="Sunday" checked={selectedDays.Sunday} onChange={handleDayChange} />
                                Sunday
                            </label>
                      </div>
                      <button onClick={handleBeschikbaarheidOpslaan} >Beschikbaarheid Opslaan</button>
                      </>
                    )}
                </form>
        </div>
        <div className='formKnoppen'>
            <button onClick={() => setActiveGroup('normal')}>Gegevens</button>
            <button onClick={() => setActiveGroup('beperking')}>Beperkings Gegevens</button>
            <button onClick={() => setActiveGroup('onderzoek')}>Onderzoek Info</button>
        </div>
        <div className="BottomRowButtons">
                <button onClick={() => navigate("/PanellidPortal")}>Terug</button>
                <button onClick={() => {
            if (isEditable) {
                slaGegevensOp();
                toggleEditable();
            }
            else toggleEditable();
            }}>
            {isEditable ? 'Opslaan' : 'Bewerk'}</button>
        </div>
    </div> 
    );
}
 
export default PanellidProfiel;


