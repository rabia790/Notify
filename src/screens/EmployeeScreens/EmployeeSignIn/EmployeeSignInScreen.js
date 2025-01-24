import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Image, useWindowDimensions, ScrollView, Text } from 'react-native';
import Logo from '../../../../assets/images/unnamed.png';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { fetchAllActiveEmployees } from '../../../api/EmployeeCRM';
import { getToken } from '../../../api/auth';
import { storeToken, storeUserInfo } from '../../../api/tokenManager';
import { useAuth } from '../../../components/libraries/AuthContext';
import { useRoute } from '@react-navigation/native';
import { useModal } from '../../../components/libraries/ModalContext';

const EmployeeSignInScreen = ({ clientId, tenantId, clientSecret }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const { width, height } = useWindowDimensions(); 
    const navigation = useNavigation();
    const { handleAuthChange } = useAuth();
    const route = useRoute();
    const { showModal } = useModal();
  
    const userType = route.params?.userType || null; 


    const scaleFontSize = (size) => {
        const baseWidth = 375; // Base width for scaling
        return (size / baseWidth) * width;
    };

    const togglePasswordVisibility = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const onSignInPressed = async () => {

        const normalizedEmail = email.trim().toLowerCase();
        if (!normalizedEmail || !password) {
            showModal({
                heading: 'Error',
                message: !normalizedEmail ? 'Email is required' : 'Password is required',
            });
            return;
        }
    

        try {
            //const accessToken = await getToken(clientId, tenantId, clientSecret);
            const response = await fetchAllActiveEmployees();
            console.log(response);
            const employees = response;
            const user = employees.find(employee => employee.cygni_emailaddress === normalizedEmail);
            if (user) {
                if (user.cygni_pwd === password) {
                    await storeToken(accessToken);
                    await storeUserInfo(user);
                    handleAuthChange(true);
                    navigation.navigate('EmployeeHome', { email: user.cygni_emailaddress, userDetails: user });
                } else {
                    showModal({ heading: 'Error', message: 'Incorrect password' });
                }
            } else {
                showModal({ heading: 'Error', message: 'User is not in our Database' });
            }
        } catch (error) {
            console.error('Error during sign-in:', error);
            showModal({ heading: 'Error', message: 'Failed to sign in. Please try again later.' });
        }
    };

    const onForgotPasswordPressed = () => {
        navigation.navigate('ForgotPassword', { userType });
    };

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Image source={Logo} style={[styles.logo, { height: height * 0.2 }]} resizeMode="contain" />
                    <Text style={[styles.logotext, { fontSize: scaleFontSize(18) }]}>Applicant Tracking System</Text>
                    <Text style={[styles.logintext, { fontSize: scaleFontSize(42) }]}>Employee Login</Text>
                    <Text style={[styles.plaintext, { fontSize: scaleFontSize(18) }]}>Sign In to Continue.</Text>
                  
                    <CustomInput placeholder="Email" placeholderTextColor="gray" value={email} setValue={setEmail} />
                   
                    <CustomInput
                        placeholder="Password"
                        placeholderTextColor="gray"
                        value={password}
                        setValue={setPassword}
                        secureTextEntry={secureTextEntry}
                        rightIcon={secureTextEntry ? require('../../../../assets/images/passwordnot.png') : require('../../../../assets/images/password.png')}
                        onRightIconPress={togglePasswordVisibility}
                    />
                    <CustomButton text="Sign In" onPress={onSignInPressed} type="SECONDARY" />
                    <CustomButton text="Forgot Password?" onPress={onForgotPasswordPressed} type="TERTIARY" />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: '#1E1E20', // Match background color to SignInScreen
    },
    scrollView: {
        flexGrow: 1,
        backgroundColor: '#1E1E20', // Match background color to SignInScreen
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#1E1E20', 
        paddingHorizontal: 34,
    },
    logo: {
        maxHeight: '20%',
        width: '30%',
    },
    logotext: {
        fontFamily: 'Montserrat-Regular',
        color: '#F1F0EF', // Match text color to SignInScreen
        textAlign: 'center',
    },
    logintext: {
        padding:12,
        fontFamily: 'Montserrat-Bold',
        color: '#F5802C', // Match accent color to SignInScreen
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 7,
    },
    plaintext: {
        color: '#F1F0EF',
        fontFamily: 'Montserrat-Regular',
        paddingTop: 9,
        fontWeight: '100',
    },
    label: {
        color: 'white', // Match label color to SignInScreen
        textAlign: 'left',
        width: '100%',
        paddingTop: 10,
        fontFamily: 'Montserrat-Regular',
    },
});

export default EmployeeSignInScreen;
