import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, Alert } from 'react-native';
import LabeledInput from '../../components/LabeledInput';
import LabeledRadioButton from '../../components/LabeledRadioButton';
import CustomButton from '../../components/CustomButton';
//import SocialSignInButtons from '../../components/SocialSignInButtons/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';



const SignUpScreen = () => {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [auth, setAuth] = useState('');
    const [workauth, setWorkAuth] = useState('');
    const [condition, setCondition] = useState('');
    const [usVisa, setUsVisa] = useState(null);
    const [crime, setCrime] = useState(null);
    const [lift, setLift] = useState(null);
    const [azdz, setAzdz] = useState(null);
    const [glicense, setGlicense] = useState(null);
    const [shiftprefered, setShiftprefered] = useState(null);
    const [additional, setAdditional] = useState(null);
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [firstnameError, setFirstNameError] = useState('');
    const [otp, setOtp] = useState('');
    

    
    const navigation = useNavigation();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
      };


    const generateOTP = () => {
        const digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 6; i++) {
          OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
      };
    const sendOTP = async () => {
        const url = 'https://prod2-13.canadacentral.logic.azure.com:443/workflows/bbc50f34ed024e60af732c678668e5b5/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=DJ7HuO9XkvU5SN5IzggZB4MoCI3bpsvxSRg1_h7zOmQ'; // Replace with the endpoint URL
        const otp = generateOTP(); // Function to generate OTP
      
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ otp: otp, email: email }), // Include OTP and recipient email
          });
      
          if (response.ok) {
            console.log('OTP email sent successfully');
            // Handle success - display a confirmation message to the user
          } else {
            console.log(response);
            console.error('Failed to send OTP email');
            // Handle failure - display an error message to the user
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
      


    const onRegisterPressed = () => {
        if (!firstname) {
            setFirstNameError('First name is required');
            return;
        }
        setFirstNameError('');

         if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
        console.warn("Registered!");
        navigation.navigate('ConfirmEmail');

        if (!email) {
            Alert.alert('Error', 'Please enter an email address');
            return;
          }
      
          sendOTP(); 
      
    };

    const onTermsOfUsePressed = () => {
        console.warn("Terms of Use!");
    };

    const onPrivacyPolicyPressed = () => {
        console.warn("Privacy Policy!");
    };

    const onHaveAccountPressed = () => {
        console.warn("Go To Sign IN!");
        navigation.navigate('SignIn');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Register with US!</Text>

                <LabeledInput
                    label="First Name"
                    placeholder="First Name"
                    value={firstname}
                    setValue={setFirstName}
                />
                {firstnameError ? <Text style={styles.errorText}>{firstnameError}</Text> : null}
                <LabeledInput
                    label="Last Name"
                    placeholder="First Name"
                    value={lastname}
                    setValue={setLastName}
                />

                <LabeledInput
                    label="Home Address"
                    placeholder="Enter your Home Address"
                    value={address}
                    setValue={setAddress}
                />

                <LabeledInput
                    label="Email"
                    placeholder="Email"
                    value={email}
                    setValue={setEmail}
                />

                <LabeledInput
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    value={phone}
                    setValue={setPhone}
                />
                <LabeledInput
                    label="Date of Birth"
                    placeholder="Enter your dob"
                    value={dob}
                    setValue={setDob}
                />
                <LabeledInput
                    label="Authorized to work in Canada without sponsorship?"
                    placeholder="your answer"
                    value={auth}
                    setValue={setAuth}
                />
                <LabeledInput
                    label="Current work authorization"
                    placeholder="your answer"
                    value={workauth}
                    setValue={setWorkAuth}
                />
                <LabeledInput
                    label="Medical Condition"
                    placeholder="your answer"
                    value={condition}
                    setValue={setCondition}
                />

                <Text style={styles.question}>Do you have a US visa?</Text>
                <View style={styles.radioGroup}>
                    <LabeledRadioButton
                        label="Yes"
                        selected={usVisa === 'yes'}
                        onPress={() => setUsVisa('yes')}
                    />
                    <LabeledRadioButton
                        label="No"
                        selected={usVisa === 'no'}
                        onPress={() => setUsVisa('no')}
                    />
                </View>

                <Text style={styles.question}>Any Criminal Convictions?</Text>
                <View style={styles.radioGroup}>
                    <LabeledRadioButton
                        label="Yes"
                        selected={crime === 'yes'}
                        onPress={() => setCrime('yes')}
                    />
                    <LabeledRadioButton
                        label="No"
                        selected={crime === 'no'}
                        onPress={() => setCrime('no')}
                    />
                </View>

                <Text style={styles.question}>Can you lift 25lbs?</Text>
                <View style={styles.radioGroup}>
                    <LabeledRadioButton
                        label="Yes"
                        selected={lift === 'yes'}
                        onPress={() => setLift('yes')}
                    />
                    <LabeledRadioButton
                        label="No"
                        selected={lift === 'no'}
                        onPress={() => setLift('no')}
                    />
                </View>

                <Text style={styles.question}>DZ or AZ license</Text>
                <View style={styles.radioGroup}>
                    <LabeledRadioButton
                        label="Yes"
                        selected={azdz === 'yes'}
                        onPress={() => setAzdz('yes')}
                    />
                    <LabeledRadioButton
                        label="No"
                        selected={azdz === 'no'}
                        onPress={() => setAzdz('no')}
                    />
                    <LabeledRadioButton
                        label="Applied"
                        selected={azdz === 'applied'}
                        onPress={() => setAzdz('applied')}
                    />
                </View>

                <Text style={styles.question}>G License</Text>
                <View style={styles.radioGroup}>
                    <LabeledRadioButton
                        label="Yes"
                        selected={glicense === 'yes'}
                        onPress={() => setGlicense('yes')}
                    />
                    <LabeledRadioButton
                        label="No"
                        selected={glicense === 'no'}
                        onPress={() => setGlicense('no')}
                    />
                    
                </View>

                <Text style={styles.question}>Shift preferred?</Text>
                <View style={styles.radioGroup}>
                    <LabeledRadioButton
                        label="Any"
                        selected={shiftprefered === 'any'}
                        onPress={() => setShiftprefered('any')}
                    />
                    <LabeledRadioButton
                        label="day"
                        selected={shiftprefered === 'day'}
                        onPress={() => setShiftprefered('day')}
                    />
                     <LabeledRadioButton
                        label="Evening"
                        selected={shiftprefered === 'evening'}
                        onPress={() => setShiftprefered('evening')}
                    />
                    <LabeledRadioButton
                        label="Night"
                        selected={shiftprefered === 'night'}
                        onPress={() => setShiftprefered('night')}
                    />
                    
                </View>

                <LabeledInput
                    label="Additional Notes"
                    placeholder="your answer"
                    value={additional}
                    setValue={setAdditional}
                />

                <LabeledInput
                    label="Password"
                    placeholder="Password"
                    value={password}
                    setValue={setPassword}
                    secureTextEntry={true}
                />
                <LabeledInput
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    value={passwordRepeat}
                    setValue={setPasswordRepeat}
                    secureTextEntry={true}
                />

                <CustomButton text="Register" onPress={onRegisterPressed} />
                
                <Text style={styles.text}>
                    By registering, you confirm that you accept our {' '}
                    <Text style={styles.link} onPress={onTermsOfUsePressed}>Terms of Use</Text> and <Text style={styles.link} onPress={onPrivacyPolicyPressed}>Privacy Policy</Text>.
                </Text>

                <CustomButton text="Have an Account? Sign In" onPress={onHaveAccountPressed} type="TERTIARY" />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
    text: {
        color: 'gray',
        marginVertical: 10,
    },
    link: {
        color: "orange",
    },
    errorText: {
        color: 'red',
        marginVertical: 5,
    },
    question: {
        fontSize: 16,
        color: 'black',
        fontWeight: '600',
        marginVertical: 10,
    },
    radioGroup: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 10,
    },

});

export default SignUpScreen;
