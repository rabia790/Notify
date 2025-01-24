import axios from 'axios';
import { getToken } from './auth';

const clientId = 'e6af3ca0-2d80-4bec-9797-f20f3d63c17a'; // Application (client) ID
const tenantId = 'c2883102-3f8d-4e6f-b65a-df3518b3b0f3'; // Directory (tenant) ID
const clientSecret = 'i3L8Q~1bfRsN8_5xVXLllm4z1TlNLdSHi3su9ady';

const baseURL = 'https://cygnisoft.crm3.dynamics.com/api/data/v9.1';


const deactivateAccount = async (accountId) => {
    const accessToken = await getToken();
    try {
      const response = await axios.patch(`${baseURL}/cygni_candidateses(${accountId})`, {
        statecode: 1, // or the field name that represents the inactive status
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Account deactivated:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deactivating account:', error.response ? error.response.data : error.message);
      throw error;
    }
  };
  

  
  export {deactivateAccount};