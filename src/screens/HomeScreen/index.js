import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchAllCandidates } from '../../api/dynamicsCRM';
import { getToken } from '../../api/auth';
import { useRoute, useNavigation } from '@react-navigation/native';
import CandidateDetails from '../../components/HomeComponent/CandidateDetails';
import { deleteToken, retrieveUserInfo } from '../../api/tokenManager';
import { useAuth } from '../../components/libraries/AuthContext';
import { useModal } from '../../components/libraries/ModalContext';


const HomeScreen = ({ clientId, tenantId, clientSecret }) => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(null); // Use state to store email
  const route = useRoute();
  const navigation = useNavigation(); 
  const { handleAuthChange } = useAuth();
  const { showModal } = useModal();

 
  // Fetch email from storage
  const fetchEmailFromStorage = async () => {
    try {
      const userInfo = await retrieveUserInfo();
      if (userInfo && userInfo.cygni_emailaddress) {
        setEmail(userInfo.cygni_emailaddress);
        fetchData(userInfo.cygni_emailaddress);
      } else {
        console.error('No email found in user info');
      }
    } catch (error) {
      console.error('Error retrieving email from storage:', error);
    }
  };

  useEffect(() => {
    // Check if email is coming from route parameters
    const { email: routeEmail } = route.params || {};

    if (routeEmail) {
      // If email is provided in route params, use it
      setEmail(routeEmail);
      fetchData(routeEmail);
    } else {
      // Otherwise, retrieve email from storage
      fetchEmailFromStorage();
    }
  }, [route.params]);

  const fetchData = async (email) => {
    setLoading(true);
    try {
      const accessToken = await getToken(clientId, tenantId, clientSecret);
      const response = await fetchAllCandidates(accessToken);
      const fetchedCandidates = response.value; // Adjust if your response is different

      if (Array.isArray(fetchedCandidates)) {
        // Filter candidates based on the email
        const filteredCandidates = fetchedCandidates.filter(candidate => candidate.cygni_emailaddress === email);
        setCandidates(filteredCandidates);
      } else {
        console.error('Fetched candidates is not an array:', fetchedCandidates);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      showModal('Error', 'Failed to fetch data. Please try again later.','Ok');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    // Navigate to the sign-in screen
    await deleteToken();
    handleAuthChange(false);
      navigation.navigate('SignIn');
   
  };

  const onUpdatePressed = () => {
    if (candidates.length > 0) {
      navigation.navigate('ProfileDetails', { candidate: candidates[0] });
    }
  };

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Find the candidate with the email provided
  const candidate = candidates.length > 0 ? candidates[0] : null;

  return (
    <CandidateDetails candidate={candidate} onLogout={handleLogout} onUpdatePressed={onUpdatePressed} email={email} />
  );
};

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});

export default HomeScreen;
