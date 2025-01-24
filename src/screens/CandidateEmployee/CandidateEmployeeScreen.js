import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logo from '../../../assets/images/unnamed.png';


const CandidateEmployeeScreen = () => {
    const { width, height } = useWindowDimensions();
    const navigation = useNavigation();


    const handleCandidatePress = () => {
        navigation.navigate('SignIn', { userType: 'candidate' });
    };


    const handleEmployeePress = () => {
        navigation.navigate('EmployeeSignIn', { userType: 'employee' });
    };


    const handleCurrentOpeningsPress = () => {
        navigation.navigate('CurrentOpenings', { userType: 'candidate' });
    };


   
    return (
        <View style={[styles.root, { paddingHorizontal: width * 0.05 }]}>
            <View style={[styles.cygni_logo, { marginTop: height * 0.17, marginBottom: height * 0.03 }]}>
                <Image
                    source={Logo}
                    style={[styles.logo, { height: height * 0.2, width: width * 0.5 }]}
                    resizeMode="contain"
                />
            </View>
            <Text style={[styles.title, { fontSize: width * 0.06, marginBottom: height * 0.02 }]}>Are You?</Text>
            <TouchableOpacity
                style={[styles.button, { padding: height * 0.02, marginVertical: height * 0.01 }]}
                onPress={handleCandidatePress}
            >
                <Text style={[styles.buttonText, { fontSize: width * 0.05 }]}>Candidate</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, { padding: height * 0.02, marginVertical: height * 0.015 }]}
                onPress={handleEmployeePress}
            >
            <Text style={[styles.buttonText, { fontSize: width * 0.05 }]}>Employee</Text>
            </TouchableOpacity>


            <TouchableOpacity
                style={[styles.buttonCurrent, { padding: height * 0.02, marginVertical: height * 0.015 }]}
                onPress={handleCurrentOpeningsPress}
            >
            <Text style={[styles.bannerText, { fontSize: width * 0.05 }]}>Current Openings</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#1E1E20',
        alignItems: 'center',
        justifyContent: 'flex-start', // Align content at the top
    },
    cygni_logo: {
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Montserrat-Bold',
        color: '#fff',
    },
    button: {
        backgroundColor: '#F5802C',
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonCurrent: {
        backgroundColor: '#E79E00',
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 50, // Fixed position at the bottom
        left: '5%',
        right: '5%',
    },
    buttonText: {
        fontFamily: 'Montserrat-Bold',
        color: '#080808',
    },
    bannerText: {
        fontFamily: 'Montserrat-Bold',
        color: '#080808',
        fontSize: 18, // Set the font size for the banner text
        textAlign: 'center', // Center the text
    },
});


export default CandidateEmployeeScreen;





