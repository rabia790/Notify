import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, ScrollView, Dimensions, useWindowDimensions } from 'react-native';
import HeaderWithoutBackButton from '../../../components/HeaderWithoutBackButton';
import EmployeeStageButton from '../../../components/EmployeeComponents/EmployeeStageButton';
import ProfileButtonGrid from '../../../components/EmployeeComponents/ProfileButtonGrid';
import LogoutButton from '../../../components/EmployeeComponents/LogoutButton';
import { deleteToken, retrieveUserInfo } from '../../../api/tokenManager';
import { fetchAllActiveEmployees } from '../../../api/EmployeeCRM';
import { getToken } from '../../../api/auth';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../components/libraries/AuthContext';
import { useModal } from '../../../components/libraries/ModalContext';


const clientId = 'e6af3ca0-2d80-4bec-9797-f20f3d63c17a';
const tenantId = 'c2883102-3f8d-4e6f-b65a-df3518b3b0f3';
const clientSecret = 'i3L8Q~1bfRsN8_5xVXLllm4z1TlNLdSHi3su9ady';


const stageMapping = {
  814740000: 'Onboarding',
  814740001: 'Onboarding',
  814740002: 'In Probation',
  814740003: 'Full Time',
  814740004: 'Resigned',
  814740005: 'Terminated',
  814740006: 'No Show',
 
};


const EmployeeHomeScreen = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();
  const { handleAuthChange } = useAuth();
  const { showModal } = useModal();
  const { width, height } = useWindowDimensions();


  useEffect(() => {


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


    const { email: routeEmail } = route.params || {};
    if (routeEmail) {
      setEmail(routeEmail);
      fetchData(routeEmail);
    } else {
      fetchEmailFromStorage();
    }
  }, [route.params]);


  const fetchData = async (email) => {
    setLoading(true);
    try {
      const accessToken = await getToken(clientId, tenantId, clientSecret);
      const response = await fetchAllActiveEmployees(accessToken);
      const fetchedEmployees = response;
      if (Array.isArray(fetchedEmployees)) {
        const filteredEmployees = fetchedEmployees.filter(employee => employee.cygni_emailaddress === email);
        setEmployees(filteredEmployees);
      } else {
        console.error('Fetched employees is not an array:', fetchedEmployees);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      showModal('Error', 'Failed to fetch data. Please try again later.', 'Ok');
    } finally {
      setLoading(false);
    }
  };


  const handleViewProfile = () => {
   
    navigation.navigate('EmployeeProfile', { employee: employees[0] });
  };


  const handleJobDetails = () => {
    navigation.navigate('EmployeeJobDetails' , { employee, stageText });
  };


  const handleTimeSheet = () => {
    navigation.navigate('TimeSheetDetails' , { employee, stageText });
  };


  const handleVacation = () => {
    navigation.navigate('VacationDetails', { employee: employees[0] });
  };


  const handleReport = () => {
    navigation.navigate('ReportDetails', { employee: employees[0] });
  };


  const handleLogout = async () => {
    await deleteToken();
    handleAuthChange(false);
    navigation.navigate('EmployeeSignIn');
  };


  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }


  const employee = employees.length > 0 ? employees[0] : null;
  const stageText = employee ? stageMapping[employee.cygni_stage] || 'Unknown Stage' : 'Unknown Stage';


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.root, { minHeight: height }]}>
        <HeaderWithoutBackButton showTitle={true} title="My Dashboard" />
        <View style={styles.spacer} />
        <View style={[styles.contentContainer, { paddingHorizontal: width * 0.05 }]}>
        <EmployeeStageButton stageText={stageText} />
          <ProfileButtonGrid
            onProfilePress={handleViewProfile}
            onJobDetailsPress={handleJobDetails}
            onTimeSheetPress={handleTimeSheet}
            onVacationPress={handleVacation}
            onReportPress={handleReport}
          />
          <LogoutButton onLogout={handleLogout} />
        </View>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F5802C',
  },
  spacer: {
    height: '5%',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#1E1E20',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 20,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default EmployeeHomeScreen;





