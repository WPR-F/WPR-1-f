import React, { useState, useEffect } from 'react';
import '../css/PanellidPortal.css';
import '../css/PanellidProfiel.css';
import { useNavigate } from 'react-router-dom';
import { roleValidation } from '../../roleValidation';
import { fetchPanellidInformation, updatePanellidInformation } from '../../apiService';


const PanellidProfiel = ({ currentUser, isPanellid, isLoggedIn }) => {
    const navigate = useNavigate();
    const [activeGroup, setActiveGroup] = useState('normal');
    const [isEditable, setIsEditable] = useState(false);
    const [selectedDays, setSelectedDays] = useState({});
    const [panellidinfo, setPanellidinfo] = useState({user: []});

    useEffect(() => {
        roleValidation(navigate, isPanellid, isLoggedIn);
        }, [isPanellid, isLoggedIn]);

    useEffect(() => {
        setPanellidinfo(fetchUserInformation());
    }, []);

    const fetchUserInformation = async () => {
        setPanellidinfo(await fetchPanellidInformation(currentUser.id));
    }

    const [form, setForm] = useState({
        voornaam: currentUser?.userName,
        achternaam: currentUser?.lastName,
        postcode: '',
        email: currentUser?.email,
        telefoonnummer: '',
        typeBeperking: '',
        hulpmiddelen: '',
        aandoening: '',
        typeOnderzoek: [],
        voorkeurBenadering: '',
        commercielePartijen: 'Ja',
        beschikbaarheid: ''
    });

    useEffect(() => {
        if (panellidinfo?.panellid) {
            setForm(prevForm => ({
                ...prevForm,
                postcode: panellidinfo.panellid.postalCode,
                telefoonnummer: panellidinfo.panellid.phoneNumber,
                typeBeperking: panellidinfo.panellid.disabilityType,
                hulpmiddelen: panellidinfo.panellid.tools,
                aandoening: panellidinfo.panellid.condition,
                typeOnderzoek: panellidinfo.panellid.researchType.split(', '),
                voorkeurBenadering: panellidinfo.panellid.preferdresearchApproach,
                commercielePartijen: panellidinfo.panellid.commercialApproach ? 'Ja' : 'Nee',
                beschikbaarheid: panellidinfo.panellid.availibility
            }));
        }
    }, [panellidinfo]);

    const slaGegevensOp = async (event) => {
    
        const panellidInfo = {
            UserId: currentUser.id,
            postalCode: form.postcode,
            phoneNumber: form.telefoonnummer,
            DisabilityType: form.typeBeperking,
            Tools: form.hulpmiddelen,
            condition: form.aandoening,
            ResearchType: form.typeOnderzoek.join(', '),
            PreferdresearchApproach: form.voorkeurBenadering,
            CommercialApproach: form.commercielePartijen === 'Ja', 
            Availibility: form.beschikbaarheid
        };
        console.log(panellidInfo);
        updatePanellidInformation(panellidInfo);
    };

    const handleTypeOnderzoekChange = (event) => {
        const { value, checked } = event.target;
    
        setForm(prevState => {
            let newTypeOnderzoek = [...prevState.typeOnderzoek];
            if (checked) {
                newTypeOnderzoek.push(value);
            } else {
                newTypeOnderzoek = newTypeOnderzoek.filter(item => item !== value);
            }
            return { ...prevState, typeOnderzoek: newTypeOnderzoek };
        });
    };
    
    const handleInputChange = (event) => {
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
                        <div className="form-group">
                            <label htmlFor="voornaam">Voornaam:</label>
                            <div className="form-input">
                                <input type="text" id="voornaam" name="voornaam" value={form.voornaam} onChange={handleInputChange} placeholder="Voornaam" readOnly={!isEditable} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="achternaam">Achternaam:</label>
                            <div className="form-input">
                                <input type="text" id="achternaam" name="achternaam" value={form.achternaam} onChange={handleInputChange} placeholder="Achternaam" readOnly={!isEditable} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="postcode">Postcode:</label>
                            <div className="form-input">
                                <input type="text" id="postcode" name="postcode" value={form.postcode} onChange={handleInputChange} placeholder="Postcode" readOnly={!isEditable} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <div className="form-input">
                                <input type="text" id="email" name="email" value={form.email} onChange={handleInputChange} placeholder="Email" readOnly={!isEditable} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="telefoonnummer">Telefoonnummer:</label>
                            <div className="form-input">
                                <input type="tel" id="telefoonnummer" name="telefoonnummer" value={form.telefoonnummer} onChange={handleInputChange} placeholder="Telefoonnummer"  readOnly={!isEditable} />
                            </div>
                        </div>
                    </>
                    )}
                    {activeGroup === 'beperking' && (
                       <>
                       <div className="form-group">
                           <label htmlFor="typeBeperking">wat voor type beperking heeft u?</label>
                           <div className="form-input">
                           <select id="typeBeperking" name="typeBeperking" value={form.typeBeperking} onChange={handleInputChange} disabled={!isEditable}>
                               <option value="">Selecteer type beperking</option>
                               <option value="Motorisch">Motorisch</option>
                               <option value="Zintuigelijk">Zintuigelijk</option>
                               <option value="Mentaal">Mentaal</option>
                           </select>
                           </div>
                       </div>
                       <div className="form-group">
                           <label htmlFor="hulpmiddelen">welke hulpmiddelen gebruikt u?</label>
                           <div className="form-input">
                               <input type="text" id="hulpmiddelen" name="hulpmiddelen" value={form.hulpmiddelen} onChange={handleInputChange} placeholder="Hulpmiddelen" readOnly={!isEditable}/>
                           </div>
                       </div>
                       <div className="form-group">
                           <label htmlFor="aandoening">Wat voor aandoening heeft u?</label>
                           <div className="form-input">
                               <input type="text" id="aandoening" name="aandoening" value={form.aandoening} onChange={handleInputChange} placeholder="Aandoening" readOnly={!isEditable}/>
                           </div>
                       </div>
                   </>
                    )}
                    {activeGroup === 'onderzoek' && (
                            <>
                            <div className="form-group">
                                <label htmlFor="typeOnderzoek">Type onderzoek</label>
                                <div className="form-input">
                                    <div class="typeonderzoekboxen">
                                    <label htmlFor="Interview">
                                        <span>Interview</span>
                                        <input
                                            type="checkbox"
                                            id="Interview"
                                            name="typeOnderzoek"
                                            value="Interview"
                                            checked={form.typeOnderzoek.includes('Interview')}
                                            onChange={handleTypeOnderzoekChange}
                                            aria-label="Interview"
                                        />
                                    </label>
                                    <label htmlFor="Groepsgesprekken">
                                        <span>Groepsgesprekken</span>
                                        <input
                                            type="checkbox"
                                            id="Groepsgesprekken"
                                            name="typeOnderzoek"
                                            value="Groepsgesprekken"
                                            checked={form.typeOnderzoek.includes('Groepsgesprekken')}
                                            onChange={handleTypeOnderzoekChange}
                                            aria-label="Groepsgesprekken"
                                        />
                                    </label>
                                    <label htmlFor="Engelstalig onderzoek">
                                        <span>Engelstalig onderzoek</span>
                                        <input
                                            type="checkbox"
                                            id="Engelstalig onderzoek"
                                            name="typeOnderzoek"
                                            value="Engelstalig onderzoek"
                                            checked={form.typeOnderzoek.includes('Engelstalig onderzoek')}
                                            onChange={handleTypeOnderzoekChange}
                                            aria-label="Engelstalig onderzoek"
                                        />
                                    </label>
                                    </div>
                        
                                </div>
                                    
                            </div>
                                <div className="form-group">
                                    <label htmlFor="voorkeurBenadering">Voorkeur benadering</label>
                                    <div className="form-input">
                                    <select id="voorkeurBenadering" name="voorkeurBenadering" value={form.voorkeurBenadering} onChange={handleInputChange} disabled={!isEditable}>
                                        <option value="">Selecteer type</option>
                                        <option value="Telefonisch">Telefonisch</option>
                                        <option value="Via Portal">Via Portal</option>
                                    </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="commercielePartijen">Wilt u deelnamen aan onderzoeken van commerciële partijen?</label>
                                    <div className="form-input">
                                        <input type="checkbox" id="commercielePartijen" name="commercielePartijen" checked={form.commercielePartijen === 'Ja'} onChange={handleInputChange} readOnly={!isEditable} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button onClick={() => setActiveGroup('dateTme')} disabled={!isEditable}>Beschikbaarheid</button>
                                </div>
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


