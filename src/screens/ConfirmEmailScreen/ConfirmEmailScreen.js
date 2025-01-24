import React, { useState, useEffect  } from 'react';
import { StyleSheet, View, ScrollView, Text, Alert, ActivityIndicator, Dimensions, TextInput, KeyboardAvoidingView } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { generateOTP, sendOTP } from '../../components/libraries/otp';
import { useModal } from '../../components/libraries/ModalContext';

const { width, height } = Dimensions.get('window');

const ConfirmEmailScreen = () => {
    const [code, setCode] = useState('');
    const navigation = useNavigation();
    const route = useRoute();
    const { showModal } = useModal();

    const params = route.params || {};

    const {
        otp ,
        firstname = '',
        lastname = '',
        address = '',
        email = '',
        phone = '',
        dob = '',
        auth = '',
        workauth = '',
        usVisa = '',
        crime = '',
        lift = '',
        azdz = '',
        glicense = '',
        shiftprefered = '',
        additional = '',
        source = '',
        userType = '',
    } = params;




    const [currentOtp, setCurrentOtp] = useState(otp);
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(60);
    
    useEffect(() => {
  
      setCurrentOtp(otp);
  }, );
    useEffect(() => {
        if (timer > 0) {
            const timeout = setTimeout(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [timer]);

    const onConfirmPressed = () => {
        console.log(currentOtp);
        if (source === 'register' || source === 'forgotPassword') {
            if (code === currentOtp) {
                console.log(code);
                showModal({
                    heading: 'Sucess',
                    message: 'Your email has been confirmed!',
                
                });
                navigation.navigate('NewPassword', {
                    firstname, lastname, address, email, phone, dob,
                    auth, workauth, usVisa, crime, lift,
                    azdz, glicense, shiftprefered, additional, source,  userType,
                });
            } else {
                showModal({
                    heading: 'Error',
                    message: 'Invalid confirmation code. Please try again.',
                
                });
            }
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
    const onResendPressed = async () => {
        setLoading(true);
        const generatedOtp = generateOTP(); // Generate OTP here
        const otpSent = await sendOTP(generatedOtp, email, showModal);
        console.log(generatedOtp);
        setLoading(false);
        if (otpSent) {
            setCurrentOtp(generatedOtp); // Update the current OTP state
            setTimer(60); // Reset the timer
            const interval = setInterval(() => {
                setTimer(prevTimer => {
                    if (prevTimer <= 1) {
                        clearInterval(interval);
                        return 0;
                    }
                    return prevTimer - 1;
                });
            }, 1000);
           showModal({
            heading: 'Success',
            message: 'OTP has been resent!',
        
        });
           Error
        } else {
           showModal({
            heading: 'Error',
            message: 'Failed to resend OTP. Please try again.',
        
        });
        }
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
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
                        <View style={styles.innerContainer}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>Confirm Your Email</Text>
                            </View>
                            <View style={styles.mainContent}>
                                <Text style={[styles.plaintext, { fontSize: scaleFontSize(20), fontFamily: 'Montserrat-Bold' }]}>Enter Your Confirmation Code</Text>
                                <TextInput
                                    placeholder="Your Confirmation Code"
                                    value={code}
                                    onChangeText={setCode}
                                    style={styles.customInput}
                                     placeholderTextColor="gray"
                                />
                                {loading ? (
                                    <ActivityIndicator size="large" color="#0000ff" />
                                ) : (
                                    <>
                                        <CustomButton text="Confirm" onPress={onConfirmPressed} type="SECONDARY" />
                                        {timer === 0 ? (
                                            <CustomButton text="Resend Code" onPress={onResendPressed} type='PRIMARY'/>
                                        ) : (
                                            <Text style={styles.timerText}>Resend Code in {timer} seconds</Text>
                                        )}
                                    </>
                                )}
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
    customInput: {
        backgroundColor: 'white',
        width: width * 0.9,
        height: 60,
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 40,
        paddingHorizontal: 20,
        marginVertical: 10,
        fontSize: 16,
        color: '#000',
    },
    mainContent: {
        backgroundColor: '#1E1E20',
        paddingHorizontal: width * 0.15,
        flex: 1,
        alignItems: 'center',
    },
    plaintext: {
        color: '#FFFF',
        paddingTop: 9,
        fontWeight: '100',
        textAlign: 'center',
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    timerText: {
        fontFamily: 'Montserrat-Bold',
        padding: 20,
        color:'#FFFF',
    },
    footerContainer: {
       
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#f5802c',
        paddingVertical: 10,
        alignItems: 'center',
    },
});

export default ConfirmEmailScreen;
