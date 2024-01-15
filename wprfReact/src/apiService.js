
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

export const Admincheck = async (user , endpoint) => {
    const response = await fetch(`http://localhost:5210/api/admin/`+endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email })
        })
        return response;
}

