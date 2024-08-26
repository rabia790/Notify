import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView, Dimensions, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { checkEmailExists } from '../../api/dynamicsCRM';
import { getToken } from '../../api/auth';
import { sendOTP, generateOTP } from '../../components/libraries/otp';
import Lock from '../../../assets/images/lock_icon.png';
import { useModal } from '../../components/libraries/ModalContext';

const { width, height } = Dimensions.get('window');

const clientId = 'e6af3ca0-2d80-4bec-9797-f20f3d63c17a';
const tenantId = 'c2883102-3f8d-4e6f-b65a-df3518b3b0f3';
const clientSecret = 'i3L8Q~1bfRsN8_5xVXLllm4z1TlNLdSHi3su9ady';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { showModal } = useModal();



  const onSendPressed = async () => {
    if (!email.trim()) {
      showModal({
        heading: 'Error',
        message: 'Please enter your email address.',
    
    });
      return;
    }
    setLoading(true);
    try {
      const accessToken = await getToken(clientId, tenantId, clientSecret);
      const exists = await checkEmailExists(email, accessToken);
      if (exists  && Object.keys(exists).length > 0) {
        const generatedOtp = generateOTP();
        const otpSent = await sendOTP(generatedOtp, email, showModal);
        console.log(generatedOtp);
        console.log(otpSent);
        if (otpSent) {
          navigation.navigate('ConfirmEmail', {
            email,
            otp: generatedOtp, 
            source: 'forgotPassword'
          });
        } else {
          console.error('OTP could not be sent');
        }
      } else {
        showModal({
          heading: 'Error',
          message: 'Email does not exist in the database.',
      
      });
      }
    } catch (error) {
      console.error('Error checking email existence:', error);
      showModal({
        heading: 'Error',
        message: 'An error occurred while checking the email. Please try again.',
    
    });    } finally {
      setLoading(false);
    }
  };

  const onHaveAccountPressed = () => {
    navigation.navigate('SignIn');
  };

  const scaleFontSize = (size) => {
    const baseWidth = 375;
    return (size / baseWidth) * width;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {loading ? (
        <View style={styles.centeredContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.innerContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>FORGOT{'\n'} PASSWORD</Text>
              </View>
              <View style={styles.mainContent}>
                <View style={styles.iconContainer}>
                  <Image source={Lock} style={styles.icon} />
                </View>
                <Text style={[styles.plaintext, { fontSize: scaleFontSize(20), fontFamily: 'Montserrat-Bold' }]}>Trouble Logging In?</Text>
                <Text style={[styles.plaintext, { fontSize: scaleFontSize(12), fontFamily: 'Montserrat-Regular' }]}>Enter your email, and we'll send you an OTP to reset your password.</Text>

                <TextInput
                  placeholder="Your Email"
                  value={email}
                  onChangeText={setEmail}
                  style={styles.customInput}
                  placeholderTextColor="#5D5757"
                />

                <CustomButton text="Reset Password" onPress={onSendPressed} type="SECONDARY" style={styles.button} />
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
    backgroundColor: '#1E1E20', // Updated background color
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
  icon: {
    width: width * 0.25,
    height: width * 0.25,
  },
  customInput: {
    backgroundColor: 'white',
    width: width * 0.9,
    height: 60,
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 40,
    paddingHorizontal: 20,
    marginVertical: 10,
    fontFamily: 'Montserrat-Regular',
    color: '#000',
  },
  mainContent: {
    backgroundColor: '#1E1E20', // Updated background color
    paddingHorizontal: width * 0.15,
    flex: 1,
    alignItems: 'center',
  },
  plaintext: {
    color: '#ffffff', // Updated text color for contrast
    paddingTop: 9,
    fontWeight: '100',
    textAlign: 'center',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E20', // Updated background color
  },
  footerContainer: {
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f5802c',
    paddingVertical: 10,
    alignItems: 'center',

  },
  button: {
    width: width * 0.9,

  },
});

export default ForgotPasswordScreen;
