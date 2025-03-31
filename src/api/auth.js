// src/api/auth.js

import axios from 'axios';





const getToken = async () => {
  try {
    const requestBody = new URLSearchParams();
    requestBody.append('grant_type', 'client_credentials');
    requestBody.append('client_id', clientId);
    requestBody.append('client_secret', clientSecret);
    requestBody.append('scope', `${crmResourceId}/.default`); // Append /.default to the resource identifier

    const response = await axios.post(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, requestBody.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (response.status !== 200) {
      throw new Error(`Failed to fetch access token. Status: ${response.status}, ${response.statusText}`);
    }

    const accessToken = response.data.access_token;
   
   
    return accessToken;
  
  } catch (error) {
    console.error('Error fetching access token:', error.message);
    throw error;
  }
};

export { getToken };
