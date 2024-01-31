import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../authContext.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Chat.css'

function Chat() {
    const auth = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [accounts, setAccounts] = useState([]);
    const [receiver, setReceiver] = useState('');

   
    const fetchMessages = async () => {
        try {
          const response = await axios.get('http://localhost:5210/api/Chat/getMessagesByDate');
          setMessages(response.data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };

      const handleReceiverChange = (e) => {
        setReceiver(e.target.value);
      };
    
      const sendMessage = async () => {
        const messageData = {
            sender: auth.currentUser.email,
            receiver: receiver, 
            text: messageInput,
            datum: Date.now(),
        };

        try {
          await axios.post('http://localhost:5210/api/Chat/postMessage', messageInput);
          fetchMessages();
          setMessageInput('');
        } catch (error) {
          console.error('Error sending message:', error);
        }
      };
      useEffect(() => {
        async function fetchAccounts() {
          const response = await axios.get('http://localhost:5210/api/Accounts/getAccounts');
          console.log(response.data);
          setAccounts(response.data);
        }
        fetchAccounts();
      }, []);
    
      useEffect(() => {
        fetchMessages();
        const intervalId = setInterval(fetchMessages, 5000);
    
        return () => clearInterval(intervalId); // Cleanup on component unmount
      }, []);



    return (
        <div>
            <div className="chat-container">
                <div className='chat-screen'>
                {/* {messages.map((message, index) => ( <span key={index}>{message.user}: {message.message}</span>))} */}
                </div>
                <div className="input-button-container">
                <input type="text" value={messageInput} onChange={e => setMessageInput(e.target.value)}/>
                <button onClick={sendMessage}>Send</button>
                <select id="Chatlist" onChange={handleReceiverChange}>
                  <option value="">Met wie wil je chatten?</option>
                  {accounts.map((account) => (
                  <option key={account.id} value={account.email}>{account.email}</option>))}
                </select>
                </div>
            </div>
        </div>
    );
}

export default Chat;