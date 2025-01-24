import React,{useState, useEffect, Text} from 'react';
import  { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import HeaderWithBackButton from '../../../components/HeaderWithBackButton';
import ProfilePhoto from '../../../components/EmployeeComponents/ProfilePhoto';
import PhotoProfile from '../../../../assets/images/profilepic.png';
import { useModal } from '../../../components/libraries/ModalContext';
import { getToken } from '../../../api/auth';
import ProfileDetailsEmployeeForm from '../../../components/EmployeeComponents/ProfileDetailsEmployeeForm';
const { width, height } = Dimensions.get('window');
import { updateEmployeeDetails } from '../../../api/EmployeeCRM';


const EmployeeProfileScreen = ({ route, navigation, clientId, tenantId, clientSecret }) => {
  const [loading, setLoading] = useState(false);
  const { employee } = route.params  || {};
  const { showModal } = useModal();
  console.log(employee);


  const handleSave = async (details) => {
    console.log('Profile saved:', details);
    setLoading(true);
    try {
        const accessToken = await getToken(clientId, tenantId, clientSecret);


        const {
            firstname,
            lastname,
            address,
            email,
            phone,
            resume,
            password,
            healthconditions,
            emergencyname,
            emergencyphone,
            refonename,
            refoneemail,
            refonephone,
            reftwoname,
            reftwoemail,
            reftwophone,
           
        } = details;


        const newEmployeeData = {
            cygni_firstname: firstname,
            cygni_lastname: lastname,
            cygni_address: address,
            cygni_emailaddress: email,
            cygni_phone: phone,
            cygni_resume_name: resume,
            cygni_pwd: password,
            cygni_healthconditions: healthconditions,
            cygni_fullname: emergencyname,
            cygni_emergencyphone: emergencyphone,
            cygni_reference1fullname: refonename,
            cygni_emailreference1: refoneemail,
            cygni_phonereference1: refonephone,
            cygni_fullnamereference2: reftwoname,
            cygni_emailreference2: reftwoemail,
            cygni_phonereference2: reftwophone,
        };


        console.log('Updating employee with data:', newEmployeeData);
        const response = await updateEmployeeDetails(accessToken, email, newEmployeeData);
     
       showModal({
        heading: 'Success',
        message: 'Successfully Updated!',
   
    });
        navigation.navigate('EmployeeHome', { updatedEmployee: newEmployeeData });


    } catch (error) {
        if (error.message === 'Employee not found.') {
            showModal({
                heading: 'Error',
                message: 'A employee with this email not found.',
           
            });
        } else {
            console.error('Error handling password action:', error);
            showModal({
                heading: 'Error',
                message: 'An error occurred. Please try again.',
           
            });
        }
    } finally {
        setLoading(false);
    }
};








  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <HeaderWithBackButton showTitle={true} title="My Profile" />
        <View style={styles.spacer} />
        <View style={styles.imageContainer}>
        <ProfilePhoto source={PhotoProfile} />
        </View>


        <View style={styles.contentContainer}>
        <ProfileDetailsEmployeeForm employee={employee} onSave={handleSave} />


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
    height: height * 0.05,
  },
  imageContainer: {
    position: 'absolute', // This allows the image to overlap other elements
    top: height * 0.1, // Position it above the content container
    left: (width / 2) - 60, // Center the image horizontally (adjust 60 based on image size)
    zIndex: 10, // Ensure the image stays on top
  },
  contentContainer: {
    flex: 1,
    paddingTop: height * 0.12, // Add padding to make space for the profile image
    backgroundColor: '#1E1E20',
    borderTopLeftRadius: 200,
  },


});


export default EmployeeProfileScreen;



