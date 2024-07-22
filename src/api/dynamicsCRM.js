import axios from 'axios';
import { Alert } from 'react-native';

const baseURL = 'https://cygnisoft.crm3.dynamics.com/api/data/v9.1';

const fetchAccounts = async (accessToken) => {  
  try {
    const response = await axios.get(`${baseURL}/accounts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (response.data && response.data.value) {
      console.log('Fetched accounts:', response.data.value);
      return response.data.value;
    } else {
      console.log('No accounts found.');
      return [];
    }
  } catch (error) {
    console.error('Error fetching accounts:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const fetchContacts = async (accessToken) => {  
  try {
    const response = await axios.get(`${baseURL}/contacts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (response.data && response.data.value) {
      console.log('Fetched contacts:', response.data.value);
      return response.data.value;
    } else {
      console.log('No contacts found.');
      return [];
    }
  } catch (error) {
    console.error('Error fetching contacts:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const createAccount = async (accessToken, accountData) => {
  try {
    // Check if an account with the same name already exists
    const existingAccounts = await fetchAccountsByName(accessToken, accountData.name);
    if (existingAccounts.length > 0) {
      throw new Error('Account with the same name already exists.');
     
    }

    // If no existing account, proceed to create new account
    const response = await axios.post(`${baseURL}/accounts`, accountData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    console.log('Account created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating account:', error);
    throw error;
  }
};


const fetchAccountsByName = async (accessToken, accountName) => {
  try {
    const response = await axios.get(`${baseURL}/accounts?$filter=name eq '${encodeURIComponent(accountName)}'`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (response.data && response.data.value) {
      console.log('Fetched accounts by name:', response.data.value);
      return response.data.value;
    } else {
      console.log('No accounts found.');
      return [];
    }
  } catch (error) {
    console.error('Error fetching accounts by name:', error.response ? error.response.data : error.message);
    throw error;
  }
};


export { fetchAccounts, fetchContacts, createAccount };
