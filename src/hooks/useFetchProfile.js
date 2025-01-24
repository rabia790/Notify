import { useState, useEffect } from 'react';
import { getToken } from '../api/auth'; // Adjust the path as needed
import { getCandidateProfile } from '../api/dynamicsCRM'; // Adjust the path as needed

const clientId = 'e6af3ca0-2d80-4bec-9797-f20f3d63c17a';
const tenantId = 'c2883102-3f8d-4e6f-b65a-df3518b3b0f3';
const clientSecret = 'i3L8Q~1bfRsN8_5xVXLllm4z1TlNLdSHi3su9ady';

const statusMapping = {
  814740000: 'Applied',
  814740006: 'Waiting for Interview',
  814740001: 'Interview Scheduled',
  814740003: 'Rejected',
  814740004: 'Hired',
  814740005: 'Onboarded',
};

const useFetchCandidateProfile = (email) => {
  const [profilePicture, setProfilePicture] = useState(require('../../assets/images/profile.png'));
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        // Get the access token
        const accessToken = await getToken(clientId, tenantId, clientSecret);

        // Fetch candidate profile data
        const profileData = await getCandidateProfile(accessToken, email);
        // Check if the response is an array and has data
        if (Array.isArray(profileData) && profileData.length > 0) {
          const profilePicUri = profileData[0].cygni_profile; // Adjust if needed based on actual response structure

          setProfilePicture(profilePicUri ? { uri: profilePicUri } : require('../../assets/images/profile.png'));
        
          const statusNumber = profileData[0].cygni_stage; // Adjust field name if necessary
          setStatus(statusMapping[statusNumber] || 'Status not available');
        } else {
          setProfilePicture(require('../../assets/images/profile.png')); // Fallback image
          setStatus('No profile found');
        }
      } catch (err) {
        setError(err.message);
        setProfilePicture(require('../../assets/images/profile.png')); // Fallback image on error
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [email]);

  return { profilePicture, status, loading, error };
};

export default useFetchCandidateProfile;
