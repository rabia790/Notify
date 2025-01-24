// src/api/auth.js

import axios from 'axios';

const clientId = 'e6af3ca0-2d80-4bec-9797-f20f3d63c17a'; // Application (client) ID
const tenantId = 'c2883102-3f8d-4e6f-b65a-df3518b3b0f3'; // Directory (tenant) ID
const clientSecret = 'azN8Q~gLRp22DUiGq872~bb1wCYH4AzhX_Ezwaic'; // Client Secret for your Azure AD app
const crmResourceId = 'https://cygnisoft.crm3.dynamics.com/'; // Resource ID for Dynamics CRM API



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
