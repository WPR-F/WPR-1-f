import React, { useState, useEffect } from 'react';
import '../css/AdminPortal.css';
import { useNavigate } from 'react-router-dom';
import { Admincheck } from '../../apiService';

const AdminPortal = ({ currentUser }) => {
    const [melding, setMelding] = useState(0);
    const navigate = useNavigate();


    //Check kan client side gedaan worden aanpassen
    useEffect(() => {
        const checkAdmin = async () => {
            if(currentUser?.email !== undefined) {
                try {
                    const response = await Admincheck(currentUser, "checkadmin");
                    if (!response.ok) {
                        navigate("profielpagina");
                        console.log("geen toegang tot adminportal");
                    }
                } catch (error) {
                    console.error('There was an error!', error);
                }
            } else {
                navigate("/Login");
            }
        };
    
        checkAdmin();
    }, [currentUser]);

    return ( 
    <div className="adminportalbg"><h1>AdminPortal</h1>
    <div className="knoppen">
        <button onClick={() => navigate("./PanellidLijst")}>Ervaringsdeskundigen</button>
        <button onClick={() => navigate("./HuidigeOnderzoeken")}>Onderzoeken</button>
        <button onClick={() => navigate("./BedrijvenLijst")} >Bedrijven</button>
        <button onClick={() => navigate("./Aanvragen")}>Aanvragen {melding} </button>
    </div>
    </div> 
    
    );
}
 
export default AdminPortal;