import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Text, ActivityIndicator, TouchableOpacity, Animated } from 'react-native';
import HeaderWithBackButton from '../../../components/HeaderWithBackButton';
import { fetchCasesForEmployee, handleDeleteRep } from '../../../api/TimeSheetCRM';
import { fetchCompany } from '../../../api/EmployeeCRM';
import ReportStageButton from '../../../components/EmployeeComponents/ReportStageButton';
import { Swipeable } from 'react-native-gesture-handler'; // Import Swipeable


const { height } = Dimensions.get('window');


const ReportDetailsScreen = ({ route, navigation }) => {
  const { employee } = route.params || {};
  const [incidents, setIncidents] = useState([]);
  const [companyNames, setCompanyNames] = useState({}); // Store company names for each incident
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const stageReport = {
    1: 'In Progress',
    2: 'Hold',
    3: 'Waiting for Details',
    4: 'Researching',
  };


  // Fetch incidents for the employee
  useEffect(() => {
    const loadIncidents = async () => {
      try {
        const fetchedIncidents = await fetchCasesForEmployee(employee.cygni_employeeid);
        setIncidents(fetchedIncidents);
      } catch (err) {
        setError('Failed to fetch incidents');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };


    loadIncidents();
  }, [employee]);


  // Fetch company names for each incident after incidents are loaded
  useEffect(() => {
    const loadCompanyNames = async () => {
      const names = {};
      for (const incident of incidents) {
        if (incident._customerid_value) {
          try {
            const companyData = await fetchCompany(incident._customerid_value);
            names[incident.cygni_incidentid] = companyData ? companyData.name : 'Unknown Company';
          } catch (error) {
            console.error('Error fetching company:', error);
            names[incident.cygni_incidentid] = 'Unknown Company';
          }
        }
      }
      setCompanyNames(names); // Set company names after fetching for all incidents
    };


    if (incidents.length > 0) {
      loadCompanyNames();
    }
  }, [incidents]);


  // Handle delete functionality
  const handleDelete = async (id) => {
    try {
      // API call to delete the incident
       await handleDeleteRep(id); // Ensure to implement handleDeleteRep function
      // Update the state to remove the deleted incident
      setIncidents(incidents.filter(incident => incident.incidentid !== id));
    } catch (err) {
      console.error('Failed to delete incident:', err);
    }
  };


  // Render swipeable right actions
  const renderRightActions = (progress, dragX, id) => {
    return (
      <TouchableOpacity onPress={() => handleDelete(id)}>
        <View style={styles.deleteButton}>
          <Animated.Text style={styles.deleteText}>Delete</Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F5802C" />
      </View>
    );
  }


  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <HeaderWithBackButton showTitle={true} title="Report Details" />
        <View style={styles.spacer} />
        <View style={styles.contentContainer}>
          {incidents.length > 0 ? (
            incidents.map((incident) => (
              <Swipeable
                key={incident.incidentid}
                renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, incident.incidentid)}
              >
                <View style={styles.incidentContainer}>
                  <View style={styles.incidentHeader}>
                    <Text style={styles.incidentTitle}>{incident.title}</Text>
                  </View>
                  <View style={styles.incidentDetails}>
                    <ReportStageButton stageReportText={stageReport[incident.statuscode] || 'Unknown Stage'} />
                    <View style={styles.incidentRow}>
                      <Text style={styles.incidentLabel}>Ticket Number:</Text>
                      <Text style={styles.incidentValue}>{incident.ticketnumber}</Text>
                    </View>
                    <View style={styles.incidentRow}>
                      <Text style={styles.incidentLabel}>Customer:</Text>
                      <Text style={styles.incidentValue}>{companyNames[incident.cygni_incidentid] || 'Unknown Company'}</Text>
                    </View>
                   
                  </View>
                </View>
              </Swipeable>
            ))
          ) : (
            <Text style={styles.noIncidentsText}>No incidents found</Text>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('CreateReportIssue', { employee })}
          >
            <Text style={styles.buttonText}>Report New Incident</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5802C',
  },
  scrollViewContent: {
    flexGrow: 1, // Allows ScrollView content to grow and take full height
  },
  spacer: {
    height: height * 0.05,
  },
  contentContainer: {
    flex: 1, // Make sure the content container takes up the remaining space
    paddingTop: height * 0.15, // Add padding to make space for the profile image
    backgroundColor: '#1E1E20',
    borderTopLeftRadius: 200,
  },
  incidentContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#3E3E3E',
    borderRadius: 12,
    borderColor: '#F5802C',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    margin: 20,
  },
  incidentHeader: {
    marginBottom: 12,
    borderBottomColor: '#F5802C',
    borderBottomWidth: 2,
    paddingBottom: 8,
  },
  incidentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F5802C',
  },
  incidentDetails: {
    marginTop: 8,
  },
  incidentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  incidentLabel: {
    color: '#F5802C',
    fontSize: 20,
    fontWeight: 'bold',
  },
  incidentValue: {
    color: '#FFF',
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16, // Add padding to the container if needed
  },
  button: {
    backgroundColor: '#F5802C', // Background color of the button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 2, // Black border width
    borderColor: '#000', // Black border color
    shadowColor: '#000', // Black shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow offset
    shadowOpacity: 0.5, // Shadow opacity
    shadowRadius: 6, // Shadow blur radius
    elevation: 4, // For Android shadow
  },
  buttonText: {
    color: 'black', // Text color of the button
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5802C',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5802C',
  },
  errorText: {
    color: '#FFF',
    fontSize: 16,
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    width: 150,
    height: '88%',
    borderRadius: 8,
    marginRight: 10,
    marginTop:20,
  },
  deleteText: {
    color: '#FFF',
    fontSize: 16,
  },
  noIncidentsText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
  },
});


export default ReportDetailsScreen;





