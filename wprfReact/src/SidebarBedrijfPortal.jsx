import './Sidebar.css';
import Create from './images/icons8-create-50.png';
import Onderzoek from './images/icons8-case-study-50.png';
import Chat from './images/icons8-chat-50.png';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function App() {

  return (
      <div>
          <div className="sidebar-container">
              <div className="sidebar-buttons">
                  <ul>
                      <li>
                          <img src={Create} width="40" height="40"/>
                          <a>Onderzoeken aanmaken</a>
                      </li>
                      <li>
                          <img src={Onderzoek} width="40" height="40"/>
                          <a>Mijn onderzoeken</a>
                      </li>
                      <li>
                          <img src={Chat} width="40" height="40"/> 
                          <Link to="/chat">Chat</Link>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
  );
}

