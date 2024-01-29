import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { Link } from 'react-router-dom';
import './Chat.css'

function Chat() {
    const [connection, setConnection] = useState();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState('');
    

    const connect = async () => { 
        try {
            const connection = new signalR.HubConnectionBuilder().withUrl('https://localhost:5173/chat').configureLogging(signalR.LogLevel.Information).build();
            setUser('test');
            connection.on('ReceiveMessage', (user, message) => {
                console.log('ReceiveMessage: ', user, message); 
            });
            await connection.start();
            await connection.invoke("SendMessage", {user, message});
            setConnection(connection);
        } catch (error) {
            console.log(error);
        }
    }

    const sendMessage = async () => {
        connect();
        setConnection(connection);
        console.log(message);
        await connection.invoke("SendMessage", {user, message});
        
        }

    return (
        <div>
            <div className='chat-screen'>
            {messages.map((message, index) => ( <span key={index}>{message.user}: {message.message}</span>))}
            </div>
            <div className="input-button-container">
            <input type="text" value={message} onChange={e => setMessage(e.target.value)}/>
            <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chat;