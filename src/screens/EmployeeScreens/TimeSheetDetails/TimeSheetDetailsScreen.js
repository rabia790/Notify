import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Text, ActivityIndicator, TouchableOpacity, Animated } from 'react-native';
import HeaderWithBackButton from '../../../components/HeaderWithBackButton';
import { fetchTimesheetsForEmployee, handleDeleteTime } from '../../../api/TimeSheetCRM';
import TimeSheetStageButton from '../../../components/EmployeeComponents/TimeSheetStageButton';
import { Swipeable } from 'react-native-gesture-handler';


const { width, height } = Dimensions.get('window');


const TimeSheetDetailsScreen = ({ route, navigation }) => {
  const { employee, stageText } = route.params || {};
  const [timesheets, setTimesheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const stageTime = {
    814740000: 'Approved',
    814740001: 'Denied',
  };


  useEffect(() => {
    const loadTimesheets = async () => {
      try {
        const fetchedTimesheets = await fetchTimesheetsForEmployee(employee.cygni_employeeid);
        setTimesheets(fetchedTimesheets);
      } catch (err) {
        setError('Failed to fetch timesheets');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };


    loadTimesheets();
  }, [employee]);




  const handleDeleteTimesheet = async (id) => {
    const success = await handleDeleteTime(id);
    if (success) {
      setTimesheets((prevTimesheets) =>
        prevTimesheets.filter((timesheet) => timesheet.cygni_timesheetid !== id)
      );
    } else {
      console.error('Failed to delete timesheet');
    }
  };






  const renderRightActions = (progress, dragX, id) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });


    return (
      <TouchableOpacity onPress={() => handleDeleteTimesheet(id)}>
        <View style={styles.deleteButton}>
          <Animated.Text style={[styles.deleteText, { transform: [{ scale }] }]}>
            Delete
          </Animated.Text>
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


  const stageTimeText = timesheets.length > 0
    ? stageTime[timesheets[0].cygni_status] || 'Waiting for Approval'
    : 'Unknown Stage';


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <HeaderWithBackButton showTitle={true} title="TimeSheet Details" />
        <View style={styles.spacer} />
        <View style={styles.imageContainer}>
          {/* Optionally, add an image here */}
        </View>
        <View style={styles.contentContainer}>
          {timesheets.length > 0 ? (
            timesheets.map((timesheet) => (
              <Swipeable key={timesheet.cygni_timesheetid} renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, timesheet.cygni_timesheetid)}>
                <View style={styles.timesheetContainer}>
                  <View style={styles.timesheetRow}>
                    <Text style={styles.timesheetLabel}>Timesheet:</Text>
                    <Text style={styles.timesheetValue}>{timesheet.cygni_name}</Text>
                  </View>
                  <View style={styles.timesheetRow}>
                    <Text style={styles.timesheetLabel}>Start Date:</Text>
                    <Text style={styles.timesheetValue}>{new Date(timesheet.cygni_startdate).toLocaleDateString()}</Text>
                  </View>
                  <View style={styles.timesheetRow}>
                    <Text style={styles.timesheetLabel}>End Date:</Text>
                    <Text style={styles.timesheetValue}>{new Date(timesheet.cygni_enddate).toLocaleDateString()}</Text>
                  </View>
                  <View style={styles.timesheetRow}>
                    <Text style={styles.timesheetLabel}>Total Hours Worked:</Text>
                    <Text style={styles.timesheetValue}>{timesheet.cygni_totalhoursworked}</Text>
                  </View>
                  <TimeSheetStageButton stageTimeText={stageTimeText} />
                </View>
              </Swipeable>
            ))
          ) : (
            <Text style={styles.noTimesheetsText}>No timesheets found</Text>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
           onPress={() => navigation.navigate('CreateTimeSheet', { employee })}
          >
            <Text style={styles.buttonText}>Create New Timesheet</Text>
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
  imageContainer: {
    position: 'absolute',
    top: height * 0.1,
    left: (width / 2) - 60,
    zIndex: 10,
  },
  contentContainer: {
    flex: 1,
    paddingTop: height * 0.15,
    backgroundColor: '#1E1E20',
    borderTopLeftRadius: 200,
  },
  timesheetContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#2D2D2D',
    borderRadius: 12,
    borderColor: '#F5802C',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    margin: 20,
  },
  timesheetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  timesheetLabel: {
    color: '#F5802C',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  timesheetValue: {
    color: '#FFF',
    fontSize: 16,
    flex: 1,
    textAlign: 'right',
  },
  noTimesheetsText: {
    color: '#FFF',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
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
    textAlign: 'center',
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
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14, // Smaller font size
  },
});


export default TimeSheetDetailsScreen;





