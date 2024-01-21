import React, { useState, useEffect } from 'react';
import '../css/AdminPortal.css';
import { useNavigate, useParams } from 'react-router-dom';

const PanellidInfo = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [panellidinfo, setPanellidinfo] = useState([]);

    const fetchUserInformation = async () => {

        try {
            const response = await fetch('http://localhost:5210/api/Panellid/getPanellidInfo?id=' + id);
            const data = await response.json();
            setPanellidinfo(data);
            
            }
            catch (error) {
                console.error('Network error:', error);
            }

    }

    useEffect(() => {
        fetchUserInformation();
        console.log(panellidinfo);
        
    }, []);
    return (  <>
    <div className='blok'>
        <h1>{panellidinfo.user && panellidinfo.user.userName +" "+ panellidinfo.user.lastName}</h1>
        <ul className='panellidInfo'>
            <li>Voornaam: {panellidinfo.panellid && panellidinfo.user.userName}</li>
            <li>Achternaam: {panellidinfo.panellid && panellidinfo.user.lastName}</li>
            <li>E-mail adres: {panellidinfo.panellid && panellidinfo.user.email}</li>
            <li>Postcode: {panellidinfo.panellid && panellidinfo.panellid.postalCode}</li>
            <li>Telefoonnummer: {panellidinfo.panellid && panellidinfo.panellid.phoneNumber}</li>
            <li>Beschikbaarheid: {panellidinfo.panellid && panellidinfo.panellid.availibility}</li>
            <li>Commercial Approach: {panellidinfo.panellid && String(panellidinfo.panellid.commercialApproach)}</li>
            <li>Condition: {panellidinfo.panellid && panellidinfo.panellid.condition}</li>
            <li>Disability Type: {panellidinfo.panellid && panellidinfo.panellid.disabilityType}</li>
            
            
            <li>Preferred Research Approach: {panellidinfo.panellid && panellidinfo.panellid.preferdresearchApproach}</li>
            <li>Research Type: {panellidinfo.panellid && panellidinfo.panellid.researchType}</li>
            <li>Tools: {panellidinfo.panellid && panellidinfo.panellid.tools}</li>
        </ul>
            <div className="terugknop">
                <button onClick={() => navigate("/AdminPortal/PanellidLijst")}>Terug</button>
            </div>
    </div>
    </>);
}
 
export default PanellidInfo;