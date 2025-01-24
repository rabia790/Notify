import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, ActivityIndicator, KeyboardAvoidingView, Dimensions } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createCandidate, updateCandidatePassword } from '../../api/dynamicsCRM';
import { getToken } from '../../api/auth';
import { useModal } from '../../components/libraries/ModalContext';
import { updateEmployeePassword } from '../../api/EmployeeCRM';


const { width, height } = Dimensions.get('window');




const NewPasswordScreen = ({ clientId, tenantId, clientSecret }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [securePasswordEntry, setSecurePasswordEntry] = useState(true);
    const [secureConfirmPasswordEntry, setSecureConfirmPasswordEntry] = useState(true)
    const navigation = useNavigation();
    const route = useRoute();
    const { showModal } = useModal();


    const {
        firstname = '',
        lastname = '',
        //address = '',
        email = '',
        phone = '',
        //dob = '',
        auth = '',
        workauth = '',
        //usVisa = '',
        //crime = '',
        //lift = '',
        //azdz = '',
        //glicense = '',
        //shiftprefered = '',
        //additional = '',
        source = '',
        userType,
    } = route.params || {};




    const validatePassword = (password) => {
      const minLength = 8;
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);


      if (password.length < minLength) {
          return `Password must be at least ${minLength} characters long.`;
      }
      if (!hasUpperCase) {
          return 'Password must contain at least one uppercase letter.';
      }
      if (!hasLowerCase) {
          return 'Password must contain at least one lowercase letter.';
      }
      if (!hasNumber) {
          return 'Password must contain at least one number.';
      }
      if (!hasSpecialChar) {
          return 'Password must contain at least one special character.';
      }
      return null;
  };




    const onSendPressed = async () => {
        if (!password || !confirmPassword) {
            showModal({
              heading: 'Error',
              message: 'Both password fields are required',
         
          });
            return;
        }
        const passwordError = validatePassword(password);
        if (passwordError) {
            showModal({
              heading: 'Error',
              message: passwordError,
         
          });
            return;
        }


        if (password !== confirmPassword) {
           showModal({
            heading: 'Error',
            message: 'Passwords do not match',
       
        });
            return;
        }


        setLoading(true);
        try {
            const accessToken = await getToken(clientId, tenantId, clientSecret);


            if (source === 'register') {
                const newCandidateData = {
                    cygni_firstname: firstname,
                    cygni_lastname: lastname,
                   // cygni_homeaddress: address,
                    cygni_emailaddress: email,
                    cygni_phonenumber: phone,
                    cygni_currentworkauthorization: workauth,
                    cygni_pwd: password,
                    //cygni_birthday: dob,
             
                    //cygni_notes: additional,
                    //cygni_authorizetoworkincanada: auth,
                    //cygni_usvisa: usVisa,
               
                    //cygni_lbslift: lift,
                    //cygni_criminalconvictions: crime,
                    //cygni_glicense: glicense,
                    //cygni_shift: shiftprefered,
                    //cygni_dzorazlicense: azdz,
                   
                   /*
                       
                 
                   
                    */
                };
                console.log('Creating candidate with data:', newCandidateData);
                const response = await createCandidate(accessToken, newCandidateData);
                showModal({
                  heading: 'Success',
                  message: 'Successfully Registered!',
             
              });                navigation.navigate('SignIn', { email, password });
            } else if (source === 'forgotPassword') {
              if (userType === 'candidate') {
                console.log('Updating candidate password for email:', email);
                await updateCandidatePassword(accessToken, email, password);
            } else if (userType === 'employee') {
                console.log('Updating employee password for email:', email);
                await updateEmployeePassword(accessToken, email, password);
            }
            showModal({
                heading: 'Success',
                message: 'Password Updated Successfully! You can now sign in.',
            });
            navigation.navigate(userType === 'candidate' ? 'SignIn' : 'EmployeeSignIn', { email });
               
            }
        } catch (error) {
          if (error.message === 'Candidate with the same email already exists.') {
            showModal({
              heading: 'Error',
              message: 'A candidate with this email already exists.',
         
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


    const onHaveAccountPressed = () => {
      if (userType === 'candidate') {
        navigation.navigate('SignIn');
      } else if (userType === 'employee') {
        navigation.navigate('EmployeeSignIn');
      } else {
        // Handle other user types or show an error
        console.log('Unknown user type');
      }
    };


    const scaleFontSize = (size) => {
        const baseWidth = 375;
        return (size / baseWidth) * width;
      };


      const togglePasswordVisibility = () => {
        setSecurePasswordEntry(!securePasswordEntry);
    };


    const toggleConfirmPasswordVisibility = () => {
        setSecureConfirmPasswordEntry(!secureConfirmPasswordEntry);
    };
    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {loading ? (
          <View style={styles.centeredContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <>
         <ScrollView contentContainerStyle={styles.scrollViewContent}>
         <View style={styles.innerContainer}>
         <View style={styles.titleContainer}>
                <Text style={styles.title}>Set Your New Password</Text>
                </View>
        <View style={styles.mainContent}>
                <CustomInput
                    placeholder="Password"
                    value={password}
                    setValue={setPassword}
                    secureTextEntry={securePasswordEntry}
                    rightIcon={securePasswordEntry ? require('../../../assets/images/passwordnot.png') : require('../../../assets/images/password.png')}
                    onRightIconPress={togglePasswordVisibility}
                />
                <CustomInput
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    setValue={setConfirmPassword}
                    secureTextEntry={secureConfirmPasswordEntry}
                    rightIcon={secureConfirmPasswordEntry  ? require('../../../assets/images/passwordnot.png') : require('../../../assets/images/password.png')}
                    onRightIconPress={toggleConfirmPasswordVisibility}
                />
               
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <CustomButton
                        text="Submit"
                        onPress={onSendPressed}
                        type='PRIMARY'
                    />
                )}


<Text style ={styles.adviceText}>Create a strong password: Use at least 8 characters, including numbers and a special character.</Text>


                </View>
           
            </View>
            <View style={styles.footerContainer}>
      <CustomButton text="Return to Login Page" onPress={onHaveAccountPressed} type="QUATERNARY" style={styles.button} />
    </View>
        </ScrollView>
   
        </>
      )}  


    </KeyboardAvoidingView>
   
    );
 
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1E20',
      },
      scrollViewContent: {
        flexGrow: 1,
      },
      innerContainer: {
        flex: 1,
        justifyContent: 'space-between',
       
        width: '100%',
      },
      titleContainer: {
        backgroundColor: '#f5802c',
        borderRadius: 20,
        paddingHorizontal: width * 0.05,
        marginBottom: height * 0.02,
        alignItems: 'center',
        width: '100%',
        height: height * 0.30,
        justifyContent: 'flex-end',
      },
      title: {
        fontSize: width * 0.09,
        color: '#1E1E20',
        textAlign: 'center',
        paddingBottom: height * 0.02,
        fontFamily: 'Montserrat-Bold',
      },
      iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      mainContent: {
        backgroundColor: '#1E1E20',
        paddingHorizontal: width * 0.15,
        flex: 1,
        alignItems: 'center',
      },
      centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
      },
      footerContainer: {
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#f5802c',
        paddingVertical: 10,
        alignItems: 'center',
      },
      adviceText: {
        fontFamily:'Montserrat-Regular',
        fontSize: 13,
        color: '#FFFF',
        marginTop: 10,
        marginBottom: 20,
        lineHeight: 20,
        textAlign: 'center',
      },
});


export default NewPasswordScreen;





