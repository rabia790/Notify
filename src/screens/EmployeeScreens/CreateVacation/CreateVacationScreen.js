import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import HeaderWithBackButton from '../../../components/HeaderWithBackButton'; // Import your custom header component
import { createVacation } from '../../../api/TimeSheetCRM'; // Assuming you will update this function


const { width } = Dimensions.get('window');


const CreateVacationScreen = ({ route, navigation }) => {
  const { employee } = route.params || {};


  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);


  const handleDateChange = (event, selectedDate, isStart) => {
    const currentDate = selectedDate || new Date();
    isStart ? setStartDate(currentDate) : setEndDate(currentDate);
    isStart ? setShowStartDatePicker(false) : setShowEndDatePicker(false);
  };


  const handleSubmit = async () => {
    if (!employee || !employee.cygni_employeeid) {
      Alert.alert('Error', 'Employee ID is missing.');
      return;
    }




    const vacationData = {
      "cygni_Employee@odata.bind": `/cygni_employees(${employee.cygni_employeeid})`,
      cygni_startdate: startDate.toISOString(),
      cygni_enddate: endDate.toISOString(),
   
      cygni_description: description,
    };


    setLoading(true);
    try {
      await createVacation(vacationData);
      Alert.alert('Success', 'Vacation request created successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', `Failed to create vacation request: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.container}>
      <HeaderWithBackButton
        showTitle={true}
        title="Apply Vacation"
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <View style={styles.formContainer}>
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


         


          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholderTextColor="#888888"
            placeholder="Enter description (optional)"
            multiline={true}
            numberOfLines={4}
          />
        </View>


        {loading ? (
          <ActivityIndicator size="large" color="#F5802C" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit Vacation</Text>
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
    alignItems:'center',
    justifyContent: 'space-between', // This will push the button to the bottom
  },
  formContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    margin:10,
  },
  label: {
    color: '#F5802C',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E48143',
    borderRadius: 10,
    borderWidth: 2,
    padding: 12,
    fontSize: 16,
    color: '#FFF',
    marginBottom: 20,
    width: width * 0.8,
  },
  textArea: {
    height: 100,
  },
  dateContainer: {
    marginBottom: 20,
    width: width * 0.8,
  },
  dateButton: {
    backgroundColor: '#2D2D2D',
    padding: 14,
    borderRadius: 10,
    borderColor: '#E48143',
    borderWidth: 2,
    alignItems: 'center',
  },
  dateText: {
    color: '#FFF',
    fontSize: 20,
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


export default CreateVacationScreen;





