import React, {useState} from 'react';
import { StyleSheet, View, Image, useWindowDimensions, ScrollView } from 'react-native';
import Logo from '../../../assets/images/unnamed.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const {height} =useWindowDimensions();
    const navigation = useNavigation();

const onSignInPressed = () =>{
    console.warn("Sign In");
    navigation.navigate('HomeScreen');
}

const onForgotPasswordPressed = () =>{
    console.warn("Forgot Password!");
    navigation.navigate('ForgotPassword');
}

const onFacebookPressed = () =>{
  console.warn("Sign In with Facebook!");
}
const onGooglePressed = () =>{
  console.warn("Sign In with Google!");
}
const onApplePressed = () =>{
  console.warn("Sign In with Apple!");
}

const onCreatePressed = () =>{
  console.warn("Go to Create Account screen!");
  navigation.navigate('SignUp');
}



  return (
    <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
      <Image source={Logo} style={[styles.logo, {height: height *0.3}]}
       resizeMode="contain" />
       <CustomInput placeholder="Username" value={username} setValue={setUsername}/>
       <CustomInput placeholder="Password" value={password} setValue={setPassword}
       secureTextEntry={true} />
       <CustomButton text="Sign In" onPress={onSignInPressed}/>
       <CustomButton text="Forgot Password" onPress={onForgotPasswordPressed} type="TERTIARY"/>

       <CustomButton text="Sign In with Facebook" onPress={onFacebookPressed}
       bgColor="#E7EAF4" fgColor="#4765A9"/>
       <CustomButton text="Sign In with Google" onPress={onGooglePressed}
       bgColor="#FAE9EA" fgColor="#DD4D44"/>
       <CustomButton text="Sign In with Apple" onPress={onApplePressed}
       bgColor="#e3e3e3" fgColor="#363636"/>

      <CustomButton text="Don't have an Account? Create One!" onPress={onCreatePressed} type="TERTIARY"/>
    </View>
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#FCFCFC', // Set the background color for ScrollView content area
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    
  },
  logo: {
    maxHeight: 400, // 40% of the screen height
    width: 150,        // Adjust width to cover the width of the container
  },
});

export default SignInScreen;
