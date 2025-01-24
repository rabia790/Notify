import axios from 'axios';
import { getToken } from './auth';

const baseURL = 'https://cygnisoft.crm3.dynamics.com/api/data/v9.1';


const fetchAllActiveEmployees = async () => {
  accessToken = await getToken();
    try {
      const response = await axios.get(`${baseURL}/cygni_employees`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
  
      // Extract employees from the response
      const employees = response.data.employees || response.data.results || response.data.value || []; // Adjust to match your structure
  
      // Check if employees is an array
      if (Array.isArray(employees)) {  
  
        const countActive = employees.filter(employee => employee.statecode === 0);
        //const countInactive = employees.filter(candidate => candidate.statecode === 1).length;
   
  
        return countActive;
      
      } else {
        console.error('employees data is not an array');
        console.log('dd');
  
        return [];
      }
    } catch (error) {
      console.error('Error fetching employees:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const checkEmailExistsEmployee = async (email, accessToken) => {
    try {
 
      if (!accessToken) {
        throw new Error('Access token is missing');
      }
 
      const url = `${baseURL}/cygni_employees`;
 
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });


      const employees = response.data.employees || response.data.results || response.data.value || []; // Adjust to match your structure
 
      if (Array.isArray(employees)) {  
 
        const filteredEmployees= employees.filter(employee => employee.cygni_emailaddress === email);
        const countActive = filteredEmployees.filter(employee => employee.statecode === 0);
       
        return countActive ;
     
      } else {
        console.error('employees data is not an array');
        console.log('dd');
 
 
 
 
        return [];
      }
    } catch (error) {
      console.error('Error fetching employees:', error.response ? error.response.data : error.message);
      throw error;
    }
 
 
  }





  const fetchEmployeesByEmail = async (accessToken, cygni_emailaddress) => {
    try {
  
      if (!accessToken) {
        throw new Error('Access token is missing');
      }
  
      const url = `${baseURL}/cygni_employees?$filter=cygni_emailaddress eq '${encodeURIComponent(cygni_emailaddress)}'`;
  
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
  
      const employees = response.data.employees || response.data.results || response.data.value || []; // Adjust to match your structure
  
  
  
  
      // Check if employees is an array
      if (Array.isArray(employees)) {  
  
        const countActive = employees.filter(employee => employee.statecode === 0);
       
        return countActive ;
     
      } else {
        console.error('employees data is not an array');
        console.log('dd');
  
  
  
  
        return [];
      }
    } catch (error) {
      console.error('Error fetching employees:', error.response ? error.response.data : error.message);
      throw error;
    }
  
  
  }

  const updateEmployeePassword = async (accessToken, email, password) => {
    try {
      const existingEmployees = await checkEmailExistsEmployee(email, accessToken);

      if (existingEmployees.length === 0) {
        throw new Error('Employee not found.');
      }
  
      const cygni_employeeid = existingEmployees[0].cygni_employeeid; // Replace with the actual candidate ID field name
      const response = await axios.patch(`${baseURL}/cygni_employees(${cygni_employeeid})`, {
        cygni_pwd: password // Replace with the actual field name
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Employee password updated:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating employee password:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const updateEmployeeDetails = async (accessToken, cygni_emailaddress, details) => {
    try {
      const existingEmployees = await checkEmailExistsEmployee(cygni_emailaddress, accessToken);
      if (existingEmployees.length === 0) {
        throw new Error('Employee not found.');
      }
  
      const cygni_employeeid = existingEmployees[0].cygni_employeeid; // Replace with the actual candidate ID field name
  
      const response = await axios.patch(`${baseURL}/cygni_employees(${cygni_employeeid})`, {
        ...details,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Employee details updated:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating employee details:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  const fetchJob = async (jobId) => {
    const accessToken = await getToken();
    try {
      const response = await axios.get(`${baseURL}/cygni_jobs(${jobId})`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json'
        }
      });
   
      const jobData = response.data;
      return jobData.cygni_name;
    } catch (error) {
      console.error('Error fetching job:', error);
    }
  };

  const fetchCompany = async (companyId) => {
    const accessToken = await getToken();
    try {
      const response = await axios.get(`${baseURL}/accounts(${companyId})`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json'
        }
      });
  
  
      return response.data; // Assuming the company name is in the 'name' field
    } catch (error) {
      console.error('Error fetching company details:', error);
      return 'Unknown Company'; // Handle error with a default value
    }
  };
  
  
  
  
export { fetchCompany,  fetchJob, updateEmployeeDetails, fetchAllActiveEmployees, checkEmailExistsEmployee, updateEmployeePassword,fetchEmployeesByEmail };