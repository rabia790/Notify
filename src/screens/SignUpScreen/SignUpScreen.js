import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Alert, TextInput } from 'react-native';
import LabeledInput from '../../components/LabeledInput';
import LabeledRadioButton from '../../components/LabeledRadioButton';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import CountrySelectorModal from '../../components/libraries/CountrySelectorModal';
import DateTimePicker from '@react-native-community/datetimepicker';
import { sendOTP, generateOTP } from '../../components/libraries/otp';
import RegistrationForm from '../../components/libraries/RegistrationForm';
import { useModal } from '../../components/libraries/ModalContext';
import { checkEmailExists} from '../../api/dynamicsCRM';
import { getToken } from '../../api/auth';
import { useRoute } from '@react-navigation/native';


const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
const validatePhone = (phone) => /^\d{10}$/.test(String(phone));


const SignUpScreen = () => {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    //const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [auth, setAuth] = useState(true);
    const [workauth, setWorkAuth] = useState('');
    //const [condition, setCondition] = useState('');
    /* const [usVisa, setUsVisa] = useState(false);
    const [crime, setCrime] = useState(false);
    const [lift, setLift] = useState(true);
    const [azdz, setAzdz] = useState(814740000);
    const [glicense, setGlicense] = useState(true);
    const [shiftprefered, setShiftprefered] = useState(814740000);
    const [additional, setAdditional] = useState(null);
    const [dob, setDob] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);*/
    const [firstnameError, setFirstNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [workAuthError, setWorkAuthError] = useState('');
    const [otp, setOtp] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCountryCode, setSelectedCountryCode] = useState('+1');




    const { showModal } = useModal();


    const navigation = useNavigation();
    const route = useRoute();
    const userType = route.params?.userType || null;


    const onRegisterPressed = async () => {
        let isValid = true;


        const normalizedEmail = email.trim().toLowerCase();


        if (!firstname) {
            setFirstNameError('First name is required');
            showModal({
                heading: 'Error',
                message: 'First name is required',
           
            });
            isValid = false;
        } else {
            setFirstNameError('');
        }


        if (!normalizedEmail) {
            setEmailError('Email is required');
            showModal({
                heading: 'Error',
                message: 'Email is required',
            });
            isValid = false;
        } else if (!validateEmail(normalizedEmail)) {
            setEmailError('Invalid email format');
            isValid = false;
        } else {
            setEmailError('');
        }






        if (!phone) {
            setPhoneError('Phone number is required');
            showModal({
                heading: 'Error',
                message: 'Phone number is required',
           
            });
            isValid = false;
        } else if (!validatePhone(phone)) {
            setPhoneError('Invalid phone number');
            showModal({
                heading: 'Error',
                message: 'Invalid phone number',
           
            });
            isValid = false;
        } else {
            setPhoneError('');
        }


        if (!workauth) {
            setWorkAuthError('Work authorization is required');
            showModal({
                heading: 'Error',
                message: 'Work authorization is required',
           
            });
            isValid = false;
        } else {
            setWorkAuthError('');
        }


       if (!selectedCountryCode) {
            Alert.alert('Error', 'Country is required');
            isValid = false;
        }


        if (!isValid) {
            return;
        }


        const clientId = 'e6af3ca0-2d80-4bec-9797-f20f3d63c17a';
        const tenantId = 'c2883102-3f8d-4e6f-b65a-df3518b3b0f3';
        const clientSecret = 'i3L8Q~1bfRsN8_5xVXLllm4z1TlNLdSHi3su9ady';


        const accessToken = await getToken(clientId, tenantId, clientSecret);
        const emailExists = await checkEmailExists(email, accessToken);
        if (emailExists.length > 0) {
            showModal({
                heading: 'Error',
                message: 'Email is already registered',
            });
            return;
        }


        const generatedOtp = generateOTP();
        const otpSent = await sendOTP(generatedOtp, email, showModal);
        console.log(generatedOtp);
        console.log(otpSent);
        if (otpSent) {
            navigation.navigate('ConfirmEmail', {
                firstname,
                lastname,
                //address,
                email: normalizedEmail,
                phone: `${selectedCountryCode}${phone}`,
                auth,
                workauth,
                /*usVisa,
                crime,
                lift,
                azdz,
                glicense,
                shiftprefered,
                additional,*/
                otp: generatedOtp,
               // dob: dob.toDateString(),
                source: 'register',
                userType
            });
        } else {
            console.error('OTP could not be sent');
        }
    };


    const showDatePickerHandler = () => setShowDatePicker(true);
    const onDateChange = (event, selectedDate) => {
       
        if (event.type === 'set') {
            console.log('Selected Date sign up:', selectedDate);
            setDob(selectedDate || dob); // Set the dob state to the selected date
            setShowDatePicker(false); // Hide the date picker after selection
        } else if (event.type === 'dismissed') {
            setShowDatePicker(false); // Hide the date picker if dismissed
        }
    };


    const onSignPressed = () => {
       
        navigation.navigate('SignIn');
    };
    const options = [
        { label: 'Any', value: 814740000 },
        { label: 'Day', value: 814740001 },
        { label: 'Evening', value: 814740002 },
        { label: 'Night', value: 814740003 }
    ];
    const optionsyesno = [
        { label: 'Yes', value: 'true' },
        { label: 'No', value: 'false' },
       
    ];
    const optionsnoyes = [
        { label: 'No', value: 'true' },
        { label: 'Yes', value: 'false' },
       
    ];
    const optionsazdz = [
        { label: 'Yes', value: 814740000 },
        { label: 'No', value: 814740001 },
        { label: 'Applied', value: 814740002 },
       
    ];


    return (
        <View style={styles.root}>
       
        <View style={styles.spacer} />
        <RegistrationForm
            firstname={firstname}
            setFirstName={setFirstName}
            lastname={lastname}
            setLastName={setLastName}
            //address={address}
            //setAddress={setAddress}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            //dob={dob}
            //setDob={setDob}
            auth={auth}
            setAuth={setAuth}
            workauth={workauth}
            setWorkAuth={setWorkAuth}
            //usVisa={usVisa}
            //setUsVisa={setUsVisa}
            //crime={crime}
            //setCrime={setCrime}
            //lift={lift}
            //setLift={setLift}
            //azdz={azdz}
            //setAzdz={setAzdz}
            //glicense={glicense}
            //setGlicense={setGlicense}
            //shiftprefered={shiftprefered}
            //setShiftprefered={setShiftprefered}
            //additional={additional}
            //setAdditional={setAdditional}
            firstnameError={firstnameError}
            emailError={emailError}
            phoneError={phoneError}
            workAuthError={workAuthError}
            selectedCountryCode={selectedCountryCode}
            setSelectedCountryCode={setSelectedCountryCode}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            //showDatePicker={showDatePicker}
            //setShowDatePicker={setShowDatePicker}
           // onDateChange={onDateChange}
            onRegisterPressed={onRegisterPressed}
            //showDatePickerHandler={showDatePickerHandler}
            onSignPressed={onSignPressed}
            //options={options}
            //optionsyesno={optionsyesno}
            //optionsnoyes={optionsnoyes}
            //optionsazdz={optionsazdz}
        />
    </View>
    );
};


const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    spacer: {
        height: 0,
    },
});


export default SignUpScreen;



