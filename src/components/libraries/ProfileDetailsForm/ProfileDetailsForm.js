    // ProfileDetailsForm.js
    import React, { useState, useEffect } from 'react';
    import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
    import DateTimePicker from '@react-native-community/datetimepicker';
    import CustomButton from '../../CustomButton';
    import CountrySelectorModal from '../CountrySelectorModal';
    import BooleanCustomInput from '../BooleanCustomInput';
    import LabeledInput from '../../LabeledInput';
    import HeaderWithBackButton from '../../HeaderWithBackButton';
    import { useModal } from '../ModalContext';

    const extractCountryCodeAndPhone = (fullPhone) => {
        const match = fullPhone.match(/^(\+\d{1,3})(\d{10})$/);
        return match ? { countryCode: match[1], phoneNumber: match[2] } : { countryCode: '', phoneNumber: fullPhone };
    };

    const validatePhone = (phone) => /^\d{10}$/.test(String(phone));

    const ProfileDetailsForm = ({ candidate, onSave }) => {
        const { countryCode: initialCountryCode, phoneNumber: initialPhone } = extractCountryCodeAndPhone(candidate.cygni_phonenumber);

        const [firstname, setFirstName] = useState(candidate.cygni_firstname);
        const [lastname, setLastname] = useState(candidate.cygni_lastname);
        const [address, setAddress] = useState(candidate.cygni_homeaddress);
        const [email, setEmail] = useState(candidate.cygni_emailaddress);
        const [phone, setPhone] = useState(initialPhone);
        const [dob, setDob] = useState(new Date(candidate.cygni_birthday));
        const [workauth, setWorkAuth] = useState(candidate.cygni_currentworkauthorization);
        const [auth, setAuth] = useState(candidate.cygni_authorizetoworkincanada);
        const [usVisa, setUsVisa] = useState(candidate.cygni_usvisa);
        const [crime, setCrime] = useState(candidate.cygni_criminalconvictions);
        const [lift, setLift] = useState(candidate.cygni_lbslift);
        const [azdz, setAzdz] = useState(candidate.cygni_dzorazlicense);
        const [glicense, setGlicense] = useState(candidate.cygni_glicense);
        const [shiftprefered, setShiftprefered] = useState(candidate.cygni_shift);
        const [additional, setAdditional] = useState(candidate.cygni_notes);
        const [showDatePicker, setShowDatePicker] = useState(false);
        const [selectedCountryCode, setSelectedCountryCode] = useState(initialCountryCode);
        const [modalVisible, setModalVisible] = useState(false);
        const [phoneError, setPhoneError] = useState('');
        const [firstnameError, setFirstNameError] = useState('');
        const [workAuthError, setWorkAuthError] = useState('');
        const [passwordError, setPasswordError] = useState('');
        const [password, setPassword] = useState(candidate.cygni_pwd);
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

        const handleDateChange = (event, selectedDate) => {
            const currentDate = selectedDate || dob;
            setShowDatePicker(false);
            setDob(currentDate);
        };

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
            const fullPhoneNumber = `${selectedCountryCode}${phone}`;
            if (!isValid) {
        
                return;
            }
            if (!workauth) {
                setWorkAuthError('Work authorization is required');
                isValid = false;
            } else {
                setWorkAuthError('');
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
            
            onSave({
                firstname,
                lastname,
                address,
                email,
                phone: fullPhoneNumber,
                dob,
                workauth,
                auth,
                usVisa,
                crime,
                lift,
                azdz,
                glicense,
                shiftprefered,
                additional,
                password,
            });
        };

        const optionsyesno = [
            { label: 'Yes', value: 'true' },
            { label: 'No', value: 'false' },
        ];
        const optionsnoyes = [
            { label: 'No', value: 'false' },
            { label: 'Yes', value: 'true' },
        ];
        const optionsazdz = [
            { label: 'Yes', value: 814740000 },
            { label: 'No', value: 814740001 },
            { label: 'Applied', value: 814740002 },
            
        ];
        const options = [
            { label: 'Any', value: 814740000 },
            { label: 'Day', value: 814740001 },
            { label: 'Evening', value: 814740002 },
            { label: 'Night', value: 814740003 }
        ];
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.root}>
                            <HeaderWithBackButton />
                            <View style={styles.spacer} />
                            <View style={styles.contentContainer}>
                <Text style={styles.title}>Profile Details</Text>
                <LabeledInput
                    label=" First Name"
                    placeholder="Input for First Name"
                    value={firstname}
                    setValue={setFirstName}
                     accessibilityLabel="First Name Input"
                        accessibilityHint="Enter your first name"
                />
                {firstnameError ? <Text style={styles.errorText}>{firstnameError}</Text> : null}
                <LabeledInput
                    label= "Last Name"
                    placeholder="Input for Last Name"
                    value={lastname}
                    setValue={setLastname}
                />
                <LabeledInput
                        label="Home Address"
                        placeholder="Your answer"
                        value={address}
                        setValue={setAddress}
                    />
                <LabeledInput
                    label= "Email"
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

                <Text style={styles.label}>Date of Birth</Text>

                <CountrySelectorModal
                style={styles.countryField}
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onSelect={(countryCode) => setSelectedCountryCode(countryCode)}
                    selectedCountryCode={selectedCountryCode}
                />
                <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)} accessibilityLabel="Select Date of Birth"
                accessibilityHint="Opens a date picker to select your date of birth">
                    <Text style={styles.dateText}>{dob.toDateString()}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={dob}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                           accessibilityLabel="Date Picker"
        accessibilityHint="Select your date of birth. Navigate through months to choose a date."
                    />
                )}
                <BooleanCustomInput
                    label="Authorized to work in Canada without sponsorship?"
                    value={auth}
                    setValue={setAuth}
                    options={optionsyesno}
                    accessibilityLabel="Select if you are authorized to work in Canada without sponsorship"
        accessibilityHint="Double-tap to select if you are authorized to work in Canada without sponsorship"
                />
                <LabeledInput
                        label="Current Work Authorization?"
                        placeholder="Your answer"
                        value={workauth}
                        setValue={setWorkAuth}
                        
                    />
                    {workAuthError ? <Text style={styles.errorText}>{workAuthError}</Text> : null}           
                    
                <BooleanCustomInput
                    label="US Visa"
                    value={usVisa}
                    setValue={setUsVisa}
                    options={optionsyesno}
                    accessibilityLabel="Select if you have a US visa"
        accessibilityHint="Double-tap to choose Yes or No"
                />

                <BooleanCustomInput
                    label="Any Criminal Convictions?"
                    value={crime}
                    setValue={setCrime}
                    options={optionsnoyes}
                    accessibilityLabel="Select if you have any Criminal Convictions"
        accessibilityHint="Double-tap to choose Yes or No"
                />
                <BooleanCustomInput
                    label="Can you lift 25lbs?"
                    value={lift}
                    setValue={setLift}
                    options={optionsnoyes}
                    accessibilityLabel="Select if you can you lift 25lbs"
        accessibilityHint="Double-tap to choose Yes or No"
                />
                <BooleanCustomInput
                    label="DZ or AZ license"
                    value={azdz}
                    setValue={setAzdz}
                    options={optionsazdz}
                    accessibilityLabel="Select if you have a DZ or AZ license"
        accessibilityHint="Double-tap to choose Yes or No"
                />
                <BooleanCustomInput
                    label="G license"
                    value={glicense}
                    setValue={setGlicense}
                    options={optionsyesno}
                    accessibilityLabel="Select if you have G license"
        accessibilityHint="Double-tap to choose Yes or No"
                />
                <BooleanCustomInput
                    label="Preferred Shift?"
                    value={shiftprefered}
                    setValue={setShiftprefered}
                    options={options}
                    accessibilityLabel="Select your preferred shift"
        accessibilityHint="Double-tap to choose your preferred shift"
                />

                <LabeledInput
                        label="Additional Notes"
                        placeholder="Your answer"
                        value={additional}
                        setValue={setAdditional}
                        accessibilityLabel="Additional Information"
        accessibilityHint="Double-tap to enter any additional information"
                    />
                    <LabeledInput
                        label="Password"
                        placeholder="Your answer"
                        value={password}
                        setValue={setPassword}
                    />
                <CustomButton text="Save" onPress={handleSave} type="PRIMARY" />
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
            height: 50,
        },
        
        contentContainer: {
            flex: 1,
            padding: 22,
            backgroundColor: '#1E1E20', 
            borderTopLeftRadius:200,
        },
            
        
        title: {
            marginBottom: 3,
            fontFamily: 'Montserrat-Bold',
            fontSize: 40,
            color: '#FFFF',
            marginLeft:55,
            marginTop:30
            
        },
        
        
        input: {
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 15,
            marginBottom: 10,
            borderRadius: 5,
            justifyContent: 'center',
            backgroundColor:'#ffff',
        },
        phoneContainer: {
            marginBottom: 10,
        },
        phoneInputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        countrySelector: {
            height: 54, // Ensure height is 48dp for a proper touch target
            minWidth: 48, // Ensure width is at least 48dp
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 10, // Adjust padding as needed
            backgroundColor: '#B35715', // Optional: for better visibility
            borderRadius: 5, // 
        },
        countryText: {
            color:'black',
            fontSize: 16,
        },
        phoneInput: {
            flex: 1,
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 12,
            borderRadius: 5,
            marginLeft: 10,
            backgroundColor: '#fff',
            color:"#000"
        },
        label: {
            marginBottom: 15,
            marginTop:15,
            fontFamily:'Montserrat-Bold',
            fontSize: 16,
            color: '#FFFF',
            textAlign: 'left',
        },
        dateText: {
            fontSize: 16,
            color: '#333',
        },
        errorText: {
             color: '#811111',
            fontSize: 14,
        },
    });

    export default ProfileDetailsForm;
