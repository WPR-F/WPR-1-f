import React, { useState, useEffect } from 'react';
import '../css/PanellidPortal.css';
import '../css/PanellidProfiel.css';
import { useNavigate } from 'react-router-dom';
import { roleValidation } from '../../roleValidation';
import { fetchPanellidInformation, updatePanellidInformation } from '../../apiService';
import PanellidProfielForm from './PanellidProfielForm';


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

    const openDateTime = () => {
    setActiveGroup('dateTme');
    }

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
        <PanellidProfielForm 
                form={form} 
                handleInputChange={handleInputChange} 
                isEditable={isEditable} 
                activeGroup={activeGroup} 
                handleTypeOnderzoekChange={handleTypeOnderzoekChange} 
                handleDayChange={handleDayChange} 
                handleBeschikbaarheidOpslaan={handleBeschikbaarheidOpslaan} 
                selectedDays={selectedDays} 
                openDateTime={openDateTime}
            />
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


