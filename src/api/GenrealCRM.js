import axios from 'axios';
import { getToken } from './auth';


const baseURL = 'https://cygnisoft.crm3.dynamics.com/api/data/v9.1';


// Fetch all current job openings
const fetchJobOpenings = async () => {
   
    const accessToken = await getToken();


    try {
        const response = await axios.get(`${baseURL}/cygni_currentopenings`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        // Extract openings from the response
        const openings = response.data.openings || response.data.results || response.data.value || [];


        // Check if openings is an array
        if (Array.isArray(openings)) {
            const countActive = openings.filter(opening => opening.statecode === 0);  
            return countActive;
        } else {
            console.error('Openings data is not an array');
            return [];
        }
    } catch (error) {
        console.error('Error fetching openings:', error.response ? error.response.data : error.message);
        throw error;
    }
};








const applyForJob = async (candidateId, openingId) => {
    const accessToken = await getToken();
    try {
      // Create an association between the candidate and the current opening
      const response = await axios.post(
        `${baseURL}/cygni_candidateses(${candidateId})/cr7e9_cygni_candidates_cygni_CurrentOpening_cygni_CurrentOpening/$ref`, // Using the correct URI for the relationship
        {
            "@odata.id": `${baseURL}/cygni_currentopenings(${openingId})`, // Reference to the opening
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
 
      console.log('Success', 'Application submitted successfully!');
     
      const jobStatusPayload = {
        "cr7e9_Candidate@odata.bind": `/cygni_candidateses(${candidateId})`, // Lookup field for candidate
        "cr7e9_JobApplied@odata.bind": `/cygni_currentopenings(${openingId})`, // Lookup field for current opening
      };
 
      const jobStatusResponse = await axios.post(
        `${baseURL}/cygni_jobstatuses`,
        jobStatusPayload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
 
      console.log('Success', 'Job status record created successfully!');


      return response.data, jobStatusResponse.data;


    } catch (error) {
      console.error('Error submitting application:', error.response ? error.response.data : error.message);
      console.log('Error', 'Failed to apply for the job.');
      throw error;
    }
  };
 




 
  const fetchAppliedJobsFromCRM = async (candidateId) => {
    const accessToken = await getToken();
    try {
        const response = await axios.get(`${baseURL}/cygni_candidateses(${candidateId})/cr7e9_cygni_candidates_cygni_CurrentOpening_cygni_CurrentOpening/$ref`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
   
        return response.data; // Adjust based on your API response structure
    } catch (error) {
        console.error('Error fetching applied jobs from CRM:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
};


const fetchLatestUpdates = async () => {
   
    const accessToken = await getToken();


    try {
        const response = await axios.get(`${baseURL}/cygni_latestupdateses`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        // Extract openings from the response
        const updates = response.data.updates || response.data.results || response.data.value || [];


        // Check if openings is an array
        if (Array.isArray(updates)) {
            const countActive = updates.filter(update => update.statecode === 0);  
            return countActive;
        } else {
            console.error('Updates data is not an array');
            return [];
        }
    } catch (error) {
        console.error('Error fetching Updates:', error.response ? error.response.data : error.message);
        throw error;
    }
};

const fetchJobStatus = async (candidateId) => {
    const accessToken = await getToken(); // Get the access token


    try {
        const response = await axios.get(`${baseURL}/cygni_jobstatuses`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });


     
        const statuses = response.data.value || response.data.results || [];


        // Find the correct field for candidate linkage and filter active statuses
        const activeStatuses = statuses.filter((status) => {
           
            return status._cr7e9_candidate_value === candidateId && status.statecode === 0;
        });
       
        return activeStatuses; // Return filtered active job statuses for the given candidate
     
    } catch (error) {
        console.error('Error fetching status:', error.response ? error.response.data : error.message);
        return []; // Return an empty array on error
    }
};





export { fetchJobStatus, fetchJobOpenings, applyForJob, fetchAppliedJobsFromCRM, fetchLatestUpdates };





