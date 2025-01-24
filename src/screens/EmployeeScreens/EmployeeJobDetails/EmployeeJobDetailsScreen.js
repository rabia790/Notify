import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import HeaderWithBackButton from '../../../components/HeaderWithBackButton';
import JobDetailsEmployeeForm from '../../../components/EmployeeComponents/JobDetailsEmployeeForm';
import ProfilePhoto from '../../../components/EmployeeComponents/ProfilePhoto';
import Photoprofile from '../../../../assets/images/profilepic.png';


const { width, height } = Dimensions.get('window');


const EmployeeJobDetailsScreen = ({ route, navigation }) => {
  const { employee, stageText } = route.params || {};


 
 
 
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <HeaderWithBackButton showTitle={true} title="Job Details" />
        <View style={styles.spacer} />
        <View style={styles.imageContainer}>
          <ProfilePhoto source={Photoprofile} />
        </View>
        <View style={styles.contentContainer}>
          <JobDetailsEmployeeForm employee={employee} stageText={stageText} />
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
  imageContainer: {
    position: 'absolute', // This allows the image to overlap other elements
    top: height * 0.1, // Position it above the content container
    left: (width / 2) - 60, // Center the image horizontally (adjust 60 based on image size)
    zIndex: 10, // Ensure the image stays on top
  },
  contentContainer: {
    flex: 1, // Make sure the content container takes up the remaining space
    paddingTop: height * 0.15, // Add padding to make space for the profile image
    backgroundColor: '#1E1E20',
    borderTopLeftRadius: 200,
  },
});


export default EmployeeJobDetailsScreen;





