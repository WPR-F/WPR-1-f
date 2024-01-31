// stuurt een POST request naar de geselecteerde (registreer of login) API endpoint met de ingevoerde gebruikersgegevens.
// En geeft het response object de waarde van de response van de API. 

export const GebruikerApiCall = async (user, endpoint) => {
    const response = await fetch('http://localhost:5210/api/accounts/'+endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    return response;
}

    export const RoleCheck = async (user, endpoint) => {
    const response = await fetch(`http://localhost:5210/api/`+endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email })
        })
        
        if (response.status === 200) {
            return true;
        }
        else {
            return false;
        }
}

    export const GetUsers = async (endpoint) => {
        try {
        const response = await fetch('http://localhost:5210/api/'+endpoint);
        const users = await response.json();
        return users;
        }
        catch (error) {
            console.error('Network error:', error);
            return;
        }
    };

    export const fetchPanellidInformation = async (id) => {

        try {
            const response = await fetch('http://localhost:5210/api/Panellid/getPanellidInfo?id=' + id);
            const data = await response.json();
            return data;
            
            }
            catch (error) {
                console.error('Network error:', error);
                return;
            }

    }

    export const updatePanellidInformation = async (panellidInfo) => {
        try {
            await fetch('http://localhost:5210/api/Panellid/UpdatePanellidInfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(panellidInfo),
            }); }
            catch (error) {
                console.log("Er is iets mis gegaan met het updaten van Panellid"+error);
                alert("Er is iets mis gegaan met het updaten van Panellid. probeer het later opnieuw");
            }
    }



 



