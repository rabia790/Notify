import axios from 'axios';
import { getToken } from './auth';




const clientId = 'e6af3ca0-2d80-4bec-9797-f20f3d63c17a';
const tenantId = 'c2883102-3f8d-4e6f-b65a-df3518b3b0f3';
const clientSecret = 'i3L8Q~1bfRsN8_5xVXLllm4z1TlNLdSHi3su9ady';






const baseURL = 'https://cygnisoft.crm3.dynamics.com/api/data/v9.1';








const fetchMetadata = async () => {
  try {
    const accessToken = await getToken(clientId, tenantId, clientSecret);
 
    const response = await axios.get('https://cygnisoft.crm3.dynamics.com/api/data/v9.1/EntityDefinitions(LogicalName=\'incident\')/Attributes', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json' // Change to JSON if necessary
      }
    });
 
    console.log(response.data); // Handle the response here
  } catch (error) {
    console.error(`Error fetching attributes: ${error.response?.data || error.message}`);
  }
};










const fetchTimesheetsForEmployee = async (employeeId) => {
  const accessToken = await getToken(clientId, tenantId, clientSecret);
    try {
      const response = await axios.get(`${baseURL}/cygni_timesheets?$filter=_cygni_employee_value eq ${employeeId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
 
      // Extract timesheets from the response
      const timesheets = response.data.value || [];






      if (Array.isArray(timesheets)) {  


        const countActive = timesheets.filter(timesheet => timesheet.statecode === 0);
        //const countInactive = candidates.filter(candidate => candidate.statecode === 1).length;
   
        //console.log(`Count of inactive candidates: ${countInactive}`);
 
        return countActive;
     
      } else {
        console.error('timesheets data is not an array');
        console.log('dd');
 
        return [];
      }


    } catch (error) {
      console.error('Error fetching timesheets:', error.response ? error.response.data : error.message);
      throw error;
    }
  };


  const fetchVacationsForEmployee = async (employeeId) => {
    const accessToken = await getToken(clientId, tenantId, clientSecret);
      try {
        const response = await axios.get(`${baseURL}/cygni_vacations?$filter=_cygni_employee_value eq ${employeeId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
   
        // Extract timesheets from the response
        const vacations = response.data.value || [];
     
       
      if (Array.isArray(vacations)) {  


        const countActive = vacations.filter(vacation => vacation.statecode === 0);
        //const countInactive = candidates.filter(candidate => candidate.statecode === 1).length;
   
        //console.log(`Count of inactive candidates: ${countInactive}`);
 
        return countActive;
     
      } else {
        console.error('timesheets data is not an array');
        console.log('dd');
 
        return [];
      }


      } catch (error) {
        console.error('Error fetching vacations:', error.response ? error.response.data : error.message);
        throw error;
      }
    };




 
    const fetchCasesForEmployee = async (employeeId) => {
      const accessToken = await getToken(clientId, tenantId, clientSecret);
        try {
          const response = await axios.get(`${baseURL}/incidents?$filter=_cygni_employee_value eq ${employeeId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          });
   
          // Extract timesheets from the response
          const incidents = response.data.value || [];
       
          if (Array.isArray(incidents)) {  


            const countActive = incidents.filter(incident => incident.statecode === 0);
            //const countInactive = candidates.filter(candidate => candidate.statecode === 1).length;
       
            //console.log(`Count of inactive candidates: ${countInactive}`);
     
            return countActive;
         
          } else {
            console.error('incidents data is not an array');
            console.log('dd');
     
            return [];
          }
   
        } catch (error) {
          console.error('Error fetching incidents:', error.response ? error.response.data : error.message);
          throw error;
        }
      };






  const createTimesheet = async (timesheetData) => {
    const accessToken = await getToken(clientId, tenantId, clientSecret);
    try {
      const response = await axios.post(`${baseURL}/cygni_timesheets`, timesheetData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating timesheet:', error.response ? error.response.data : error.message);
      throw error;
    }
  };


  const createVacation = async (vacationData) => {
    const accessToken = await getToken(clientId, tenantId, clientSecret);
    try {
      const response = await axios.post(`${baseURL}/cygni_vacations`, vacationData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
 
      return response.data;
    } catch (error) {
      console.error('Error creating vacation:', error.response ? error.response.data : error.message);
      throw error;
    }
  };
 


  const createIssue = async (issueData) => {
    const accessToken = await getToken(clientId, tenantId, clientSecret);
    try {
      const response = await axios.post(`${baseURL}/incidents`, issueData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
 
      console.log('Case Created:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating Case:', error.response ? error.response.data : error.message);
      throw error;
    }
  };






  const fetchAllCompanies = async () => {
    const accessToken = await getToken(clientId, tenantId, clientSecret);


    try {
      const response = await axios.get(`${baseURL}/accounts`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
 
   
      const companies = response.data.value || []; // Replace 'value' with the actual property if different
      return Array.isArray(companies) ? companies : [];


    } catch (error) {
      // Throw an error with a descriptive message
      throw new Error(`Failed to fetch companies: ${error.message}`);
    }
  };


  const fetchManager = async (companyId) => {
    const accessToken = await getToken(clientId, tenantId, clientSecret);
    try {
      const response = await axios.get(`${baseURL}/contacts(${companyId})`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json'
        }
      });
      return response.data; // Assuming the company name is in the 'name' field
    } catch (error) {
      console.error('Error fetching manager details:', error);
      return 'Unknown Manager'; // Handle error with a default value
    }
  };




 const handleDeleteTime = async (id) => {
    const accessToken = await getToken(); // You should get clientId, tenantId, clientSecret from context or config
   
    try {
      // Update the timesheet to inactive
      await axios.patch(
        `${baseURL}/cygni_timesheets(${id})`,
        { statecode: 1 }, // Assuming '1' represents inactive state
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      return true; // Return success response
    } catch (error) {
      console.error('Error updating timesheet status:', error.response ? error.response.data : error.message);
      return false; // Return failure response
    }
  };




 
 const handleDeleteVac = async (id) => {
  const accessToken = await getToken();
  try {
   
    await axios.patch(
      `${baseURL}/cygni_vacations(${id})`,
      { statecode: 1 }, // Assuming '1' represents inactive state
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    return true; // Return success response
  } catch (error) {
    console.error('Error updating vacation status:', error.response ? error.response.data : error.message);
    return false; // Return failure response
  }
};


const handleDeleteRep = async (id) => {
  const accessToken = await getToken();
  try {
    // Make a PATCH request to update the specific incident
    await axios.patch(
      `${baseURL}/incidents(${id})`,
      {  statecode: 2, // Ensure this is the correct state code for cancellation
        statuscode: 6}, // Update with the new status code
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    return true;
  } catch (error) {
    // Log detailed error information
    if (error.response) {
      console.error('Error response data:', error.response.data); // Log response data
      console.error('Error response status:', error.response.status); // Log response status
      console.error('Error response headers:', error.response.headers); // Log response headers
    } else {
      console.error('Error message:', error.message); // Log error message
    }
    return false; // Return failure response
  }
};










export {handleDeleteRep, handleDeleteVac, handleDeleteTime, fetchManager, fetchAllCompanies, createIssue, fetchCasesForEmployee, createVacation, fetchVacationsForEmployee, fetchMetadata, fetchTimesheetsForEmployee, createTimesheet};



