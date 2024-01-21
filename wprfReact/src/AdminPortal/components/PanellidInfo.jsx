import React, { useState, useEffect } from 'react';
import '../css/AdminPortal.css';
import { useNavigate, useParams } from 'react-router-dom';
import { roleValidation } from '../../roleValidation';

const PanellidInfo = ({ isAdmin, isLoggedIn }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [panellidinfo, setPanellidinfo] = useState([]);

    useEffect(() => {
        roleValidation(navigate, isAdmin, isLoggedIn);
        }, [isAdmin, isLoggedIn]);

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
        
    <h1>
    {panellidinfo.user 
        ? panellidinfo.user.userName +" "+ panellidinfo.user.lastName
        : "Dit panellid heeft zijn/haar profiel nog niet aangemaakt"
    }
    </h1>
        <ul className='panellidInfo'>
        <li style={{color: 'white'}}>Voornaam: {panellidinfo.panellid && panellidinfo.user.userName}</li>
        <li style={{color: 'white'}}>Achternaam: {panellidinfo.panellid && panellidinfo.user.lastName}</li>
        <li style={{color: 'white'}}>E-mail adres: {panellidinfo.panellid && panellidinfo.user.email}</li>
        <li style={{color: 'white'}}>Postcode: {panellidinfo.panellid && panellidinfo.panellid.postalCode}</li>
        <li style={{color: 'white'}}>Telefoonnummer: {panellidinfo.panellid && panellidinfo.panellid.phoneNumber}</li>
        <li style={{color: 'white'}}>Beschikbaarheid: {panellidinfo.panellid && panellidinfo.panellid.availibility}</li>
        <li style={{color: 'white'}}>Commercial Approach: {panellidinfo.panellid && String(panellidinfo.panellid.commercialApproach)}</li>
        <li style={{color: 'white'}}>Condition: {panellidinfo.panellid && panellidinfo.panellid.condition}</li>
        <li style={{color: 'white'}}>Disability Type: {panellidinfo.panellid && panellidinfo.panellid.disabilityType}</li>
        <li style={{color: 'white'}}>Preferred Research Approach: {panellidinfo.panellid && panellidinfo.panellid.preferdresearchApproach}</li>
        <li style={{color: 'white'}}>Research Type: {panellidinfo.panellid && panellidinfo.panellid.researchType}</li>
        <li style={{color: 'white'}}>Tools: {panellidinfo.panellid && panellidinfo.panellid.tools}</li>
        </ul>
            <div className="terugknop">
                <button onClick={() => navigate("/AdminPortal/PanellidLijst")}>Terug</button>
            </div>
    </div>
    </>);
}
 
export default PanellidInfo;