import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AdminPortal.css';
import '../css/PanellidLijst.css';
import { GetUsers } from '../../apiService';
import { roleValidation } from '../../roleValidation';


const PanellidLijst = ({ isAdmin, isLoggedIn }) => {
    const navigate = useNavigate();
    const [panelledenList, setpanelledenList] = useState({user: []});
    const [unsortedList, setUnsortedList] = useState({user: []}); 
    const [sortOption, setSortOption] = useState('');
    const [disabilityType, setDisabilityType] = useState('');
    const [researchApproachOption, setResearchApproachOption] = useState('');
    const [commercialApproachOption, setCommercialApproachOption] = useState('');
    
    useEffect(() => {
        roleValidation(navigate, isAdmin, isLoggedIn);
        }, [isAdmin, isLoggedIn]);

    const fetchUsers = async () => {
        const users = await GetUsers('Panellid/getPanellidUsers');
        setUnsortedList(users); 
        setpanelledenList(users); 
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        let users = {...unsortedList}; 
        if (sortOption === 'Naam') {
            users.user.sort((a, b) => a.userName.localeCompare(b.userName)); 
        }
        if (disabilityType|| researchApproachOption || commercialApproachOption) {
            users.user = users.user.filter(user => {
                const panellid = users.panellid.find(p => p.userId === user.id); 
                return panellid && (
                    (!disabilityType || panellid.disabilityType === disabilityType) &&
                    (!researchApproachOption || panellid.preferdresearchApproach === researchApproachOption) &&
                    (!commercialApproachOption || panellid.commercialApproach.toString() === commercialApproachOption)
                );
            });
        }
        setpanelledenList(users); 
    }, [sortOption, disabilityType, researchApproachOption, commercialApproachOption]);

    return ( 
        <div className="blok">
            <h1>PanellidLijst</h1>
            <div className="terugknop">
                <button onClick={() => navigate("/AdminPortal")}>Terug</button>
            </div>
            <div className="filterOptions">
            <select onChange={(e) => setSortOption(e.target.value)}> {/* New dropdown menu */}
                    <option value="">Sort by...</option>
                    <option value="Naam">Naam</option>
            </select>
            <select onChange={(e) => setDisabilityType(e.target.value)}> {/* New dropdown menu for the filter */}
                    <option value="">Filter by disability type...</option>
                    <option value="Motorisch">Motorisch</option>
                    <option value="Zintuigelijk">Zintuigelijk</option>
                    <option value="Mentaal">Mentaal</option>
            </select>
                    <select onChange={(e) => setResearchApproachOption(e.target.value)}>
                <option value="">Filter op Voorkeur benadering</option>
                <option value="Telefonisch">Telefonisch</option>
                <option value="Portal">Via portal</option>
            </select>
            <select onChange={(e) => setCommercialApproachOption(e.target.value)}>
                <option value="">filter op commerciële benadering</option>
                <option value="true">commerciële benadering</option>
                <option value="false">geen commerciële benadering</option>
            </select>
            </div>
            <h2>Alle Panelleden:</h2>
            <div className='PanellidList'> 
            <ul className='PanellidUL'>
            {panelledenList.user.map((user, index) => (
            <li key={index} className="listItem">
                <button onClick={() => navigate(`./Panellidinfo/${user.id}`)}>
                    {user.userName + " " + user.lastName }
                </button>
            </li>
        ))}
            </ul>
            </div>
        </div> 
    );
}
 
export default PanellidLijst;