import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import HeaderWithBackButton from '../../../components/HeaderWithBackButton'; // Custom header component
import { createIssue} from '../../../api/TimeSheetCRM';
import { fetchCompany } from '../../../api/EmployeeCRM';




const { width } = Dimensions.get('window');


const CreateReportIssueScreen = ({ route, navigation }) => {
  const { employee } = route.params || {};


  const [caseTitle, setCaseTitle] = useState('');


  const [description, setDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);


  // Fetch company when the component mounts
  useEffect(() => {
    if (employee && employee._cygni_company_value) {
        fetchCompany(employee._cygni_company_value)
            .then((companyData) => {
                if (companyData) {
                    setCompanyName(companyData.name || 'Unknown Company');
               
                }
            })
            .catch((error) => {
                console.error('Error fetching company:', error);
                setCompanyName('Unknown Company');
            });
    }
}, [employee]);


  const handleSubmit = async () => {
    if (!caseTitle) {
      Alert.alert('Error', 'Case Title is required.');
      return;
    }


    if (!description) {
      Alert.alert('Error', 'Description is required.');
      return;
    }


    if (!companyName) {
      Alert.alert('Error', 'Company selection is required.');
      return;
    }


    if (!employee || !employee.cygni_employeeid) {
      Alert.alert('Error', 'Employee ID is missing.');
      return;
    }
 
    const issueData = {
      "cygni_Employee@odata.bind": `/cygni_employees(${employee.cygni_employeeid})`, // Employee reference
      title: caseTitle, // Title of the issue
      //subjectid: subject, // Subject or category of the issue
      description: description, // Description of the issue
      "customerid_account@odata.bind": `/accounts(${employee._cygni_company_value})`,


 
    };
   
    setLoading(true);
    try {
      await createIssue(issueData);
      Alert.alert('Success', 'Issue reported successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', `Failed to report issue: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={styles.container}>
      <HeaderWithBackButton
        showTitle={true}
        title="Report An Issue"
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Case Title:</Text>
          <TextInput
            style={styles.input}
            value={caseTitle}
            onChangeText={setCaseTitle}
            placeholder="Enter case title"
            placeholderTextColor="gray"
          />
        </View>
 
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter description"
            placeholderTextColor="gray"
            multiline
          />
        </View>
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Company</Text>
        <Text style={styles.text}>{companyName}</Text>
        </View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Report Issue</Text>
          </TouchableOpacity>
       
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
    fontFamily:'Montserrat-Bold',
    color: '#F5802C',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#F5802C',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#FFF',
    marginBottom: 20,
    width: width * 0.8,
  },
 text:{
  fontFamily:'Montserrat-Bold',
  color:'#fff',
 fontSize:17,
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
  inputContainer: {
    marginBottom: 20,
    width: width * 0.8,
  },
});


export default CreateReportIssueScreen;





