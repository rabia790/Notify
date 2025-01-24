import axios from 'axios';

const baseURL = 'https://cygnisoft.crm3.dynamics.com/api/data/v9.1';

// Fetch all accounts
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

// Fetch all contacts
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

// Create a new account
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
    // Check if accessToken and accountName are provided
    if (!accessToken || !accountName) {
      throw new Error('Access token or account name is missing');
    }

    // Fetch all accounts
    const response = await axios.get(`${baseURL}/accounts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    // Log full API response for debugging
 

    // Check if the response contains data
    if (response.data && response.data.value) {
      // Filter accounts locally based on name
      const accounts = response.data.value;
      const filteredAccounts = accounts.filter(account => account.name === accountName);

      console.log('Filtered accounts by name:', filteredAccounts);
      return filteredAccounts;
    } else {
      console.log('No accounts found.');
      return [];
    }
  } catch (error) {
    console.error('Error fetching accounts by name:', error.response ? error.response.data : error.message);
    throw error;
  }
};


const fetchCandidatesByEmail = async (accessToken, cygni_emailaddress) => {
  try {
    // Validate input parameters
    if (!accessToken) {
      throw new Error('Access token is missing');
    }
    if (!cygni_emailaddress || typeof cygni_emailaddress !== 'string' || cygni_emailaddress.trim() === '') {
      throw new Error('Invalid email address provided');
    }

    // Fetch all candidates
    const response = await axios.get(`${baseURL}/cygni_candidateses`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    // Log full API response for debugging
    console.log('Fetched candidates:', response.data);

    // Adjust the way candidate data is accessed based on API response
    const candidates = response.data.candidates || response.data.results || response.data.value || []; 

    // Check if candidates is an array
    if (Array.isArray(candidates)) {
      // Filter candidates locally based on the provided email address
      const filteredCandidates = candidates.filter(candidate => candidate.cygni_emailaddress === cygni_emailaddress);

      // Count active candidates
      const countActive = filteredCandidates.filter(candidate => candidate.statecode === 0);

      return countActive;
    } else {
      console.error('Candidates data is not an array');
      return [];
    }
  } catch (error) {
    console.error('Error fetching candidates:', error.response ? error.response.data : error.message);
    throw new Error('Failed to fetch candidates. Please try again later.');
  }
};




// Create a new candidate
const createCandidate = async (accessToken, candidateData) => {
  try {
    // Check if a candidate with the same email already exists
    const existingCandidates = await fetchCandidatesByEmail(accessToken, candidateData.cygni_emailaddress);
    if (existingCandidates.length > 0) {
      throw new Error('Candidate with the same email already exists.');
    }

    const response = await axios.post(`${baseURL}/cygni_candidateses`, candidateData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    console.log('Candidate created:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log('Error status code:', error.response.status);
      throw error;
  }
  throw error;
  }
};
const fetchAllCandidates = async (accessToken) => {
  try {
    // Make an API request to fetch all candidates
    const response = await axios.get(`${baseURL}/cygni_candidateses`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    // Return the array of candidates found
    return response.data;
  } catch (error) {
    console.error('Error fetching all candidates:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const fetchAllActiveCandidates = async (accessToken) => {
  try {
    const response = await axios.get(`${baseURL}/cygni_candidateses`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    // Extract candidates from the response
    const candidates = response.data.candidates || response.data.results || response.data.value || []; // Adjust to match your structure

    // Check if candidates is an array
    if (Array.isArray(candidates)) {  

      const countActive = candidates.filter(candidate => candidate.statecode === 0);
      //const countInactive = candidates.filter(candidate => candidate.statecode === 1).length;
    
      //console.log(`Count of inactive candidates: ${countInactive}`);

      return countActive;
    
    } else {
      console.error('Candidates data is not an array');
      console.log('dd');

      return [];
    }
  } catch (error) {
    console.error('Error fetching candidates:', error.response ? error.response.data : error.message);
    throw error;
  }
};



const checkEmailExists = async (email, accessToken) => {
  try {
    // Log the access token for debugging
  

    if (!accessToken) {
      throw new Error('Access token is missing');
    }

    // Fetch all candidates
    const response = await axios.get(`${baseURL}/cygni_candidateses`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    // Log full API response for debugging
   

    // Inspect response data structure
  

    // Extract candidates based on possible response structures
    const candidates = response.data.value || response.data.results || response.data.candidates || [];
    
    // Log extracted candidates
    

    // Check if candidates is an array
    if (Array.isArray(candidates)) {
      // Manually filter candidates by email
      const filteredCandidates = candidates.filter(candidate => candidate.cygni_emailaddress === email);
      
      // Log filtered candidates

      // Count active candidates
      const countActive = filteredCandidates.filter(candidate => candidate.statecode === 0);
      
      // Log count of active candidates

      return countActive;
    } else {
      console.error('Candidates data is not an array');
      return [];
    }
  } catch (error) {
    console.error('Error fetching candidates:', error.response ? error.response.data : error.message);
    throw error;
  }
};
const updateCandidatePassword = async (accessToken, email, password) => {
  try {
    const existingCandidates = await fetchCandidatesByEmail(accessToken, email);
    if (existingCandidates.length === 0) {
      throw new Error('Candidate not found.');
    }

    const cygni_candidatesid = existingCandidates[0].cygni_candidatesid; // Replace with the actual candidate ID field name
    const response = await axios.patch(`${baseURL}/cygni_candidateses(${cygni_candidatesid})`, {
      cygni_pwd: password // Replace with the actual field name
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    console.log('Candidate password updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating candidate password:', error.response ? error.response.data : error.message);
    throw error;
  }
};

//Update candidate record

const updateCandidateDetails = async (accessToken, cygni_emailaddress, details) => {
  try {
    const existingCandidates = await fetchCandidatesByEmail(accessToken, cygni_emailaddress);
    if (existingCandidates.length === 0) {
      throw new Error('Candidate not found.');
    }

    const cygni_candidatesid = existingCandidates[0].cygni_candidatesid; // Replace with the actual candidate ID field name

    const response = await axios.patch(`${baseURL}/cygni_candidateses(${cygni_candidatesid})`, {
      ...details,
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    console.log('Candidate details updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating candidate details:', error.response ? error.response.data : error.message);
    throw error;
  }
};



const getCandidateProfile = async (accessToken, email) => {
  try {
    // Perform GET request to fetch all candidate profiles
    const response = await axios.get(`${baseURL}/cygni_candidateses`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    // Check if data and value exist in response
    if (response.data && response.data.value) {
      // Filter profiles client-side based on email
      const candidates = response.data.value;
      const filteredCandidates = candidates.filter(candidate => candidate.cygni_emailaddress === email);

      if (filteredCandidates.length > 0) {
        return filteredCandidates;
      } else {
        console.log('No candidate found with the provided email.');
        return [];
      }
    } else {
      console.log('No candidates found.');
      return [];
    }
  } catch (error) {
    console.error('Error fetching candidate profile:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const updateProfilePictureURL = async (accessToken, email, profilePictureURL) => {
  try {
    // Fetch the candidate by email
    const existingCandidates = await fetchCandidatesByEmail(accessToken, email);
    if (existingCandidates.length === 0) {
      throw new Error('Candidate not found.');
    }

    // Get the candidate ID
    const cygni_candidatesid = existingCandidates[0].cygni_candidatesid;

    // Update the profile picture URL
    const response = await axios.patch(`${baseURL}/cygni_candidateses(${cygni_candidatesid})`, {
      cygni_profile : profilePictureURL, // Replace with your actual field name
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    console.log('Candidate profile picture URL updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating candidate profile picture URL:', error.response ? error.response.data : error.message);
    throw error;
  }
};


const fetchCurrentUser = async (accessToken) => {
  try {
    // Replace `/api/data/v9.1/me` with the correct endpoint for fetching current user
    const response = await axios.get(`${baseURL}/WhoAmI`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching current user info:', error.response ? error.response.data : error.message);
    throw error;
  }
};




export {  fetchCandidatesByEmail, fetchCurrentUser,  getCandidateProfile, updateProfilePictureURL, fetchAllActiveCandidates, fetchAccounts, fetchContacts, createAccount, createCandidate, fetchAllCandidates, checkEmailExists,updateCandidatePassword, updateCandidateDetails };
