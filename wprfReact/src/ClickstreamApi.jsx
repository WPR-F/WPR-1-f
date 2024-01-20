import axios from 'axios';

export const ClickstreamApi = () => {
    document.addEventListener('click', function (event) {
        
        const clickstreamData = {
            GebeurtenisType: 'click',
            ElementId: event.target.id, 
            PaginaUrl: window.location.href,
            Tijd: new Date().toISOString(),
        };
        const url = 'http://localhost:5210/api/Clickstream/clickstream';
        const data = clickstreamData;

        axios.post(url, data);
        console.log(clickstreamData);
        
    });
    
};

export default ClickstreamApi;