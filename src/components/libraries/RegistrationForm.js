import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import LabeledInput from '../LabeledInput';
import CustomInput from '../CustomInput';
import LabeledRadioButton from '../LabeledRadioButton';
import CustomButton from '../CustomButton';
import CountrySelectorModal from './CountrySelectorModal';
import DateTimePicker from '@react-native-community/datetimepicker'; // Adjust import based on your setup
import HeaderWithBackButton from '../HeaderWithBackButton';
    import BooleanCustomInput from './BooleanCustomInput';


const RegistrationForm = ({
    firstname,
    setFirstName,
    lastname,
    setLastName,
    /*address,
    setAddress,*/
    email,
    setEmail,
    phone,
    setPhone,
   /* dob,
    setDob,*/
    auth,
    setAuth,
    workauth,
    setWorkAuth,
    /*usVisa,
    setUsVisa,
    crime,
    setCrime,
    lift,
    setLift,
    azdz,
    setAzdz,
    glicense,
    setGlicense,
    shiftprefered,
    setShiftprefered,
    additional,
    setAdditional,*/
    firstnameError,
    emailError,
    phoneError,
    workAuthError,
    selectedCountryCode,
    setSelectedCountryCode,
    modalVisible,
    setModalVisible,
    /*showDatePicker,
    setShowDatePicker,
    onDateChange,*/
    onRegisterPressed,
    //showDatePickerHandler,
    onSignPressed,
    /*options,
    optionsyesno,
    optionsnoyes,
    optionsazdz*/
}) => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
            <HeaderWithBackButton />
            <View style={styles.spacer} />
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Create your job profile</Text>
                <CustomButton text="Already registered, login here"
                onPress={onSignPressed}
                type="TERTIARY" />
               <CustomInput
               
                placeholder="Enter your first name"
                value={firstname}
                setValue={setFirstName}
         
            />
            {firstnameError ? <Text style={styles.errorText} accessibilityLiveRegion="polite">{firstnameError}</Text> : null}


            <CustomInput
                placeholder="Enter your last name"
                value={lastname}
                setValue={setLastName}
         
            />


          { /* <CustomInput
                placeholder="Enter your home address"
                value={address}
                setValue={setAddress}
         
            />
*/}
            <CustomInput
                placeholder="Enter your email address"
                value={email}
                setValue={setEmail}
       
            />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}


                <View style={styles.phoneContainer}>
                    <View style={styles.phoneInputContainer}>
                        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.countrySelector}>
                            <Text style={styles.countryText}>{selectedCountryCode}</Text>
                        </TouchableOpacity>
                        <TextInput
                            style={styles.phoneInput}
                            placeholder="Enter your phone number"
                            placeholderTextColor="#5D5757"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="numeric"
                        />
                    </View>
                    {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
                </View>


                <CountrySelectorModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onSelect={(countryCode) => setSelectedCountryCode(countryCode)}
                    selectedCountryCode={selectedCountryCode}
                />
               { /* <Text style={styles.textstyle}> Date of Birth</Text>
                <TouchableOpacity onPress={showDatePickerHandler} style={styles.datePicker}accessibilityLabel="Select Date of Birth"
                accessibilityHint="Opens a date picker to select your date of birth">
                <Text style={styles.datePickerText}>{dob ? dob.toDateString() : 'Select Date'}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={dob}
                        mode="date"
                        display="default"
                        onChange={onDateChange}
                           accessibilityLabel="Date Picker"
                    accessibilityHint="Use this picker to select your date of birth"
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
*/}
                <LabeledInput
                    label="Current Work Authorization?"
                    placeholder="Your answer"
                    value={workauth}
                    setValue={setWorkAuth}
                />
                {workAuthError ? <Text style={styles.errorText}>{workAuthError}</Text> : null}
               


                { /*    <BooleanCustomInput
                        label="Do you have a US visa?"
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
                        options={optionsyesno}
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
                    label="Additional Information"
                    placeholder="Any additional information"
                    value={additional}
                    setValue={setAdditional}
                    accessibilityLabel="Additional Information"
    accessibilityHint="Double-tap to enter any additional information"
                />*/}


                <CustomButton
                    text="Sign Up"
                    onPress={onRegisterPressed}
                />
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
        padding: 20,
        backgroundColor: '#1E1E20',
        borderTopLeftRadius:200,
        height: 1000,
    },
        title: {
            marginBottom: 5,
            fontFamily:'Montserrat-Bold',
            fontSize:34,
            color:'#FFFFFF',
            textAlign: 'center',
            paddingTop:50,
       
        },
    errorText: {
         color: '#811111',
        fontSize: 12,
        marginBottom: 10,
    },
    phoneContainer: {
        marginBottom: 20,
    },
    phoneInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    countrySelector: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#B1662F',
        borderRadius: 5,
        backgroundColor: '#B1662F',
    },
    countryText: {
        color:'black',
        fontSize: 16,
    },
    phoneInput: {
        flex: 1,
        padding: 13,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        marginLeft: 10,
        color:'#000',
    },
    textstyle:{
        fontFamily:'Montserrat-Bold',
        color:'#FFFF',
        fontSize: 16,
        marginBottom:20,
    },
    datePicker: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
        justifyContent: 'center',
        backgroundColor:'#ffff',
   
    },
    datePickerText: {
        fontSize: 16,
      color: '#000000'
       
    },
    label: {
        fontFamily:'Montserrat-Bold',
        color:'#FFFF',
        fontSize: 16,
        marginBottom: 10,
    },
    question: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    radioGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
});


export default RegistrationForm;





