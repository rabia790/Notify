import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Text, ActivityIndicator, TouchableOpacity, Animated } from 'react-native';
import HeaderWithBackButton from '../../../components/HeaderWithBackButton';
import { fetchVacationsForEmployee, handleDeleteVac } from '../../../api/TimeSheetCRM'; // Add deleteVacation API
import VacationStageButton from '../../../components/EmployeeComponents/VacationStageButton';
import { Swipeable } from 'react-native-gesture-handler'; // Import Swipeable


const { height } = Dimensions.get('window');


const VacationDetailsScreen = ({ route, navigation }) => {
  const { employee } = route.params || {};
  const [vacations, setVacations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const stageVacation = {
    814740000: 'Requested',
    814740001: 'Reviewed-decision awaited',
    814740002: 'Approved',
    814740003: 'Rejected'
  };


  useEffect(() => {
    const loadVacations = async () => {
      try {
        const fetchedVacations = await fetchVacationsForEmployee(employee.cygni_employeeid);
        setVacations(fetchedVacations);
      } catch (err) {
        setError('Failed to fetch vacations');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };


    loadVacations();
  }, [employee]);


  const stageVacationText = vacations.length > 0
    ? stageVacation[vacations[0].cygni_stage] || 'Unknown Stage'
    : 'Unknown Stage';


  const handleDelete = async (id) => {
    try {
      // API call to delete the vacation
      await handleDeleteVac(id);
      // Update the state to remove the deleted vacation
      setVacations(vacations.filter(vacation => vacation.cygni_vacationid !== id));
    } catch (err) {
      console.error('Failed to delete vacation:', err);
    }
  };


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
        <HeaderWithBackButton showTitle={true} title="Vacation Details" />
        <View style={styles.spacer} />
        <View style={styles.contentContainer}>
          {vacations.length > 0 ? (
            vacations.map((vacation) => (
              <Swipeable
                key={vacation.cygni_vacationid}
                renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, vacation.cygni_vacationid)}
              >
                <View style={styles.vacationContainer}>
                  <View style={styles.vacationHeader}>
                    <Text style={styles.vacationTitle}>{vacation.cygni_name}</Text>
                  </View>
                  <VacationStageButton stageVacationText={stageVacationText} />


                  <View style={styles.vacationDetails}>
                  {vacation.cygni_stage === 814740003 && (
                      <View style={styles.vacationRow}>
                        <Text style={styles.vacationLabel}>Reason:</Text>
                        <Text style={styles.vacationValue}>{vacation.cygni_reason}</Text>
                      </View>
                    )}
                  </View>
                </View>
              </Swipeable>
            ))
          ) : (
            <Text style={styles.noVacationsText}>No vacations found</Text>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('CreateVacation', { employee })}
          >
            <Text style={styles.buttonText}>Apply New Vacation</Text>
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
    flexGrow: 1,
  },
  spacer: {
    height: height * 0.05,
  },
  contentContainer: {
    flex: 1,
    paddingTop: height * 0.15,
    backgroundColor: '#1E1E20',
    borderTopLeftRadius: 200,
  },
  vacationContainer: {
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
  vacationHeader: {
    marginBottom: 12,
    borderBottomColor: '#F5802C',
    borderBottomWidth: 2,
    paddingBottom: 8,
  },
  vacationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F5802C',
  },
  vacationDetails: {
    marginTop: 8,
  },
  vacationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  vacationLabel: {
    color: '#F5802C',
    fontSize: 20,
    fontWeight: 'bold',
  },
  vacationValue: {
    color: '#FFF',
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
  },
  button: {
    backgroundColor: '#F5802C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: 'black',
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
  noVacationsText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150, // Reduced width
    height: '85%', // Reduced height
    borderRadius: 15, // Rounded corners
    margin: 10, // Margin around button
    elevation: 5, // Shadow for smoother appearance
    marginTop:20,
  },
  deleteText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});


export default VacationDetailsScreen;





