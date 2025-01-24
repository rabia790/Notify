import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import CustomButton from '../CustomButton';
import LabeledInput from '../LabeledInput';
import { useModal } from '../libraries/ModalContext';
import CountrySelectorModal from '../libraries/CountrySelectorModal';


const extractCountryCodeAndPhone = (fullPhone) => {
    const match = fullPhone.match(/^(\+\d{1,3})(\d{10})$/);
    return match ? { countryCode: match[1], phoneNumber: match[2] } : { countryCode: '', phoneNumber: fullPhone };
};


const validatePhone = (phone) => /^\d{10}$/.test(String(phone));


const ProfileDetailsEmployeeForm = ({ employee, onSave }) => {
    const { countryCode: initialCountryCode, phoneNumber: initialPhone } = extractCountryCodeAndPhone(employee.cygni_phone);


    const [firstname, setFirstName] = useState(employee.cygni_firstname || '');
    const [lastname, setLastname] = useState(employee.cygni_lastname || '');
    const [address, setAddress] = useState(employee.cygni_address);
    const [email, setEmail] = useState(employee.cygni_emailaddress);
    const [phone, setPhone] = useState(initialPhone);
    const [selectedCountryCode, setSelectedCountryCode] = useState(initialCountryCode || '+1');
    const [modalVisible, setModalVisible] = useState(false);
    const [phoneError, setPhoneError] = useState('');
    const [firstnameError, setFirstNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [password, setPassword] = useState(employee.cygni_pwd);
    const [healthconditions, setHealthconditions] = useState(employee.cygni_healthconditions);
    const [emergencyname, setEmergencyname] = useState(employee.cygni_fullname);
    const [emergencyphone, setEmergencyphone] = useState(employee.cygni_emergencyphone);
    const [refonename, setRefonename] = useState(employee.cygni_reference1fullname);
    const [refoneemail, setRefoneemail] = useState(employee.cygni_emailreference1);
    const [refonephone, setRefonephone] = useState(employee.cygni_phonereference1);
    const [reftwoname, setReftwoname] = useState(employee.cygni_fullnamereference2);
    const [reftwoemail, setReftwoemail] = useState(employee.cygni_emailreference2);
    const [reftwophone, setReftwophone] = useState(employee.cygni_phonereference2);




    const { showModal } = useModal();


    useEffect(() => {
        if (!phone) {
            setPhoneError('Phone number is required');
        } else if (!validatePhone(phone)) {
            setPhoneError('Invalid phone number');
        } else {
            setPhoneError('');
        }
    }, [phone]);


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




   
       


    const handleSave = () => {
        let isValid = true;
        if (phoneError) {
            showModal({
                heading: 'Error',
                message: phoneError,
            });
            return;
        }


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


        if (!isValid) {
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


        if (!isValid) {
            return;
        }


        const fullPhoneNumber = `${selectedCountryCode}${phone}`;
        onSave({
            firstname,
            lastname,
            address,
            email,
            phone: fullPhoneNumber,
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
         
        });
    };


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.root}>
                <View style={styles.spacer} />
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>Employee Profile Details</Text>
                    <LabeledInput
                        label="First Name"
                        placeholder="Input for First Name"
                        value={firstname}
                        setValue={setFirstName}
                        accessibilityLabel="First Name Input"
                    />
                    {firstnameError ? <Text style={styles.errorText}>{firstnameError}</Text> : null}
                    <LabeledInput
                        label="Last Name"
                        placeholder="Input for Last Name"
                        value={lastname}
                        setValue={setLastname}
                    />
                    <LabeledInput
                        label="Address"
                        placeholder="Your answer"
                        value={address}
                        setValue={setAddress}
                    />
                    <LabeledInput
                        label="Email"
                        placeholder="Input for Your Email"
                        value={email}
                        setValue={setEmail}
                    />
                    <View style={styles.phoneContainer}>
                        <Text style={styles.label}>Phone Number</Text>
                        <View style={styles.phoneInputContainer}>
                            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.countrySelector}>
                                <Text style={styles.countryText}>{selectedCountryCode}</Text>
                            </TouchableOpacity>
                            <TextInput
                                style={styles.phoneInput}
                                placeholder="Enter your phone number"
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="numeric"
                            />
                        </View>
                        {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
                    </View>


                    <CountrySelectorModal
                        style={styles.countryField}
                        visible={modalVisible}
                        onClose={() => setModalVisible(false)}
                        onSelect={(countryCode) => setSelectedCountryCode(countryCode)}
                        selectedCountryCode={selectedCountryCode}
                    />


                    <LabeledInput
                        label="Health Conditions"
                        placeholder="---"
                        value={healthconditions}
                        setValue={setHealthconditions}
                    />


                    <Text style={styles.subtitle}>Emergency Contact</Text>


                    <LabeledInput
                        label="Emergency Contact Full Name"
                        placeholder="Input for Emergency Contact Name"
                        value={emergencyname}
                        setValue={setEmergencyname}
                    />


                    <LabeledInput
                        label="Emergency Contact Phone Number"
                        placeholder="Input for Emergency Contact Phone"
                        value={emergencyphone}
                        setValue={setEmergencyphone}
                    />




                    <Text style={styles.subtitle}>References</Text>


                    <LabeledInput
                        label="Full Name (Reference 1)"
                        placeholder="Input for Name (Reference 1)"
                        value={refonename}
                        setValue={setRefonename}
                    />


                    <LabeledInput
                        label="Email (Reference 1)"
                        placeholder="Input for Email (Reference 1)"
                        value={refoneemail}
                        setValue={setRefoneemail}
                    />


                    <LabeledInput
                        label="Phone # (Reference 1)"
                        placeholder="Input for Phone # (Reference 1)"
                        value={refonephone}
                        setValue={setRefonephone}
                    />


                    <LabeledInput
                        label="Full Name (Reference 2)"
                        placeholder="Input for Name (Reference 2)"
                        value={reftwoname}
                        setValue={setReftwoname}
                    />


                    <LabeledInput
                        label="Email (Reference 2)"
                        placeholder="Input for Email (Reference 2)"
                        value={reftwoemail}
                        setValue={setReftwoemail}
                    />


                    <LabeledInput
                        label="Phone # (Reference 2)"
                        placeholder="Input for Phone # (Reference 2)"
                        value={reftwophone}
                        setValue={setReftwophone}
                    />


                <Text style={styles.subtitle}>Password </Text>


                    <LabeledInput
                        label="Password"
                        placeholder="********"
                        value={password}
                        setValue={setPassword}
                    />
                    {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}


                 


                    <CustomButton text="Save" onPress={handleSave} type="PRIMARY" />
                </View>
            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    root: {
        flex: 1,
        padding: 20,
    },
    spacer: {
        height: 20,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },
    title: {
        fontFamily: 'Montserrat-Bold',
        color: '#FFD4A8',
        fontSize: 30,
        marginBottom: 10,
        textAlign: 'left',
        marginLeft:10,
    },
    subtitle: {
        fontFamily: 'Montserrat-Bold',
        color: '#FFD4A8',
        fontSize: 30,
        marginBottom: 10,
        textAlign: 'left',
        marginLeft:10,
        marginTop:40,
    },
    label: {
        fontFamily: 'Montserrat-Bold',
        color: '#FFFF',
        marginBottom: 10,
        fontSize: 16,
    },
    input: {
    height: 50, // Increase height for better touch interaction
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8, // Increase the radius for a smoother, modern look
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#FFF', // Make the background color white for better contrast
},
    phoneContainer: {
        marginVertical: 10,
        width: '100%',
    },
    phoneInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        overflow: 'hidden',
    },
    countrySelector: {
        paddingHorizontal: 10,
        justifyContent: 'center',
        borderRightWidth: 1,
        borderRightColor: '#e8e8e8',
        backgroundColor: 'white',
        height: 60,
    },
    phoneInput: {
        flex: 1,
        height: 60,
        paddingHorizontal: 10,
    },
    countryText: {
        fontSize: 16,
        color: '#333',
    },
    resumeContainer: {
        marginVertical: 20,
    },
    resumeDetails: {
        marginVertical: 10,
    },
    resumePreviewText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 17,
        color: 'lightblue',
        marginBottom: 10,
    },
    downloadButton: {
        backgroundColor: '#9F7A52',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    downloadButtonText: {
        color: 'black',
        fontSize: 16,
    },
    noResumeText: {
        fontFamily: 'Montserrat-Regular',
        color: '#666',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});


export default ProfileDetailsEmployeeForm;





