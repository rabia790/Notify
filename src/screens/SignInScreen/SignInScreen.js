import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Image, useWindowDimensions, ScrollView, Text, TouchableOpacity } from 'react-native';
import Logo from '../../../assets/images/unnamed.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { fetchAllActiveCandidates } from '../../api/dynamicsCRM';
import { getToken } from '../../api/auth';
import { storeToken } from '../../api/tokenManager';
import { storeUserInfo } from '../../api/tokenManager';
import { useAuth } from '../../components/libraries/AuthContext';
import { useModal } from '../../components/libraries/ModalContext';
import { useRoute } from '@react-navigation/native';
import { Platform } from 'react-native';

const SignInScreen = ({ clientId, tenantId, clientSecret }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const { width, height } = useWindowDimensions(); 
    const navigation = useNavigation();
    const { handleAuthChange } = useAuth();
    const { showModal } = useModal();
    const route = useRoute();
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
            // Retrieve the access token
            const accessToken = await getToken(clientId, tenantId, clientSecret);
            // Fetch all active candidates
            const response = await fetchAllActiveCandidates(accessToken);
           // console.log('API Response:', response);
            const candidates = response;
           
            //console.log('Active Candidates:', candidates);
    
            // Find the user with the provided email and password
            const user = candidates.find(candidate => candidate.cygni_emailaddress === normalizedEmail );
    
            // Navigate to HomeScreen if the user is found, else show an error alert
            if (user) {
                if (user.cygni_pwd === password) {
                    await storeToken(accessToken);
                    await storeUserInfo(user);
                    handleAuthChange(true);
                    navigation.navigate('HomeScreen', { email: user.cygni_emailaddress, userDetails: user });
                } else {
                    showModal({
                        heading: 'Error',
                        message: 'Incorrect password',
                    
                    });
                }
            } else {
                showModal({
                    heading: 'Error',
                    message: 'User is not in our Database',
             
                });
            }
        } catch (error) {
            console.error('Error during sign-in:', error);
            showModal({
                heading: 'Error',
                message: 'Failed to sign in. Please try again later.',
            
            });
        }
    };
    

    const onForgotPasswordPressed = () => {
        
        navigation.navigate('ForgotPassword', { userType });
    };

    const onCreatePressed = () => {
        
        navigation.navigate('SignUp');
    };

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Image source={Logo} style={[styles.logo, { height: height * 0.2 }]} resizeMode="contain" />
                    <Text style={[styles.logotext, { fontSize: scaleFontSize(18) }]}>Applicant Tracking System </Text>
                    <Text style={[styles.logintext, { fontSize: scaleFontSize(42) }]}>Candidate Login</Text>
                    <Text style={[styles.plaintext, { fontSize: scaleFontSize(18) }]}>Sign In to Continue.</Text>
                    <CustomInput placeholder="Email"  value={email} setValue={setEmail} />

                  
                    <CustomInput 
                        placeholder="Password" 
                    
                        value={password} 
                        setValue={setPassword} 
                        secureTextEntry={secureTextEntry}
                        rightIcon={secureTextEntry ? require('../../../assets/images/passwordnot.png') : require('../../../assets/images/password.png')}
                        onRightIconPress={togglePasswordVisibility}
                    />


                        
                    <CustomButton text="Sign In" onPress={onSignInPressed} type="SECONDARY"/>
                    <CustomButton text="Forgot Password?" onPress={onForgotPasswordPressed} type="TERTIARY" />
                    <Text style={[styles.plaintext, { fontSize: scaleFontSize(16) }]}>Don't have an Account? </Text>
                    <CustomButton text="Create One!" onPress={onCreatePressed} type="TERTIARY" />
                </View>
            </ScrollView>


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: '#F4F4F4', // Set background color here
    },
    scrollView: {
        flexGrow: 1,
        backgroundColor: '#F4F4F4', // Set background color here
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
        color: '#F1F0EF',
        textAlign: 'center',
   
    },
    logintext: {
       padding:12,
        fontFamily: 'Montserrat-Bold', 
        color: '#F5802C', 
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 7, 
    },
    plaintext:{
        color:'#F1F0EF',
        fontFamily: 'Montserrat-Regular',
        paddingTop: 9,
        fontWeight: '100', 
    },
    label:{
        color: 'white',
        textAlign: 'left',
        width: '100%', 
        paddingTop: 10,
        fontFamily: 'Montserrat-Regular',
    },
 
  iconContainer: {
    paddingLeft: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default SignInScreen;
