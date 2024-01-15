import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import './chat.css'

function Chat() {
    const [hubConnection, setHubConnection] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const createHubConnection = async () => {
            const hubConnect = new signalR.HubConnectionBuilder()
                .withUrl('https://localhost:5173/chat')
                .build();
            try {
                await hubConnect.start();
                console.log('Connection successful');
            } catch (err) {
                alert(err);
            }

            hubConnect.on('ReceiveMessage', (user, receivedMessage) => {
                const updatedMessages = [...messages];
                updatedMessages.push({user, message: receivedMessage});
                setMessages(updatedMessages);
            });

            setHubConnection(hubConnect);
        }

        createHubConnection();
    }, []);

    const sendMessage = async () => {
        try {
            await hubConnection.invoke('SendMessage', 'user', message);
            setMessage('');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <div className="input-button-container">
            <input
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>

            {messages.map((message, index) => (
                <span key={index}>{message.user}: {message.message}</span>
            ))}
            </div>
        </div>
    );
}

export default Chat;