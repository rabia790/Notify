import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import HeaderWithBackButton from '../../../components/HeaderWithBackButton'; // Import your custom header component
import { createTimesheet } from '../../../api/TimeSheetCRM';


const { width } = Dimensions.get('window');


const CreateTimesheetScreen = ({ route, navigation }) => {
  const { employee } = route.params || {};


  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [totalHoursWorked, setTotalHoursWorked] = useState('');
  const [loading, setLoading] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);


  const handleDateChange = (event, selectedDate, isStart) => {
    const currentDate = selectedDate || new Date();
    isStart ? setStartDate(currentDate) : setEndDate(currentDate);
    isStart ? setShowStartDatePicker(false) : setShowEndDatePicker(false);
  };


  const handleSubmit = async () => {
    const formattedTotalHoursWorked = parseFloat(totalHoursWorked);


    if (isNaN(formattedTotalHoursWorked) || formattedTotalHoursWorked <= 0) {
      Alert.alert('Error', 'Invalid number format for Total Hours Worked.');
      return;
    }


    if (!employee || !employee.cygni_employeeid) {
      Alert.alert('Error', 'Employee ID is missing.');
      return;
    }


    if (!startDate || !endDate) {
      Alert.alert('Error', 'Start Date and End Date are required.');
      return;
    }


    const timesheetData = {
      "cygni_Employee@odata.bind": `/cygni_employees(${employee.cygni_employeeid})`,
      cygni_startdate: startDate.toISOString(),
      cygni_enddate: endDate.toISOString(),
      cygni_totalhoursworked: formattedTotalHoursWorked,
    };


    setLoading(true);
    try {
      await createTimesheet(timesheetData);
      Alert.alert('Success', 'Timesheet created successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', `Failed to create timesheet: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.container}>
      <HeaderWithBackButton
        showTitle={true}
        title="Create Timesheet"
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <View style={styles.dateContainer}>
          <Text style={styles.label}>Start Date:</Text>
          <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.dateButton}>
            <Text style={styles.dateText}>{startDate.toDateString()}</Text>
          </TouchableOpacity>
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="spinner"
              onChange={(event, selectedDate) => handleDateChange(event, selectedDate, true)}
            />
          )}
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.label}>End Date:</Text>
          <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.dateButton}>
            <Text style={styles.dateText}>{endDate.toDateString()}</Text>
          </TouchableOpacity>
          {showEndDatePicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display="spinner"
              onChange={(event, selectedDate) => handleDateChange(event, selectedDate, false)}
            />
          )}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Total Hours Worked:</Text>
          <TextInput
            style={styles.input}
            value={totalHoursWorked}
            onChangeText={setTotalHoursWorked}
            placeholder="e.g., 40"
            placeholderTextColor="gray"
            keyboardType="numeric"
          />
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#F5802C" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Save Timesheet</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5802C',
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1E1E20',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#F5802C',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    width: width * 0.8,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#F5802C',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#FFF',
    marginBottom: 20,
  },
  dateContainer: {
    width: width * 0.8,
    marginBottom: 20,
  },
  dateButton: {
    backgroundColor: '#2D2D2D',
    padding: 14,
    borderRadius: 10,
    borderColor: '#F5802C',
    borderWidth: 1,
    alignItems: 'center',
  },
  dateText: {
    color: '#FFF',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#F5802C',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: width * 0.8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default CreateTimesheetScreen;





