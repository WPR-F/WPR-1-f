import React, { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';


//loads the google api
export const loadGoogleServiceApi = async () => {
    const clientId = "828244250147-lp4h35efg6s4o666t8emosrikt0ml8jm.apps.googleusercontent.com";

    useEffect(() => {
        function start() {
          gapi.auth2.init({
            clientId: clientId,
            scope: ""
            
          })
        };
    
        gapi.load('client:auth2', start);
      });
}

