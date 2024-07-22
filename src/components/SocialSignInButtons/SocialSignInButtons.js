import React from 'react';
import { View, Text } from 'react-native';
import CustomButton from '../CustomButton';
const SocialSignInButtons = () => {





const onFacebookPressed = () =>{
  console.warn("Sign In with Facebook!");
}
const onGooglePressed = () =>{
  console.warn("Sign In with Google!");
}
const onApplePressed = () =>{
  console.warn("Sign In with Apple!");
}



  return (
   <>
  
     
       <CustomButton text="Sign In with Facebook" onPress={onFacebookPressed}
       bgColor="#E7EAF4" fgColor="#4765A9"/>
       <CustomButton text="Sign In with Google" onPress={onGooglePressed}
       bgColor="#FAE9EA" fgColor="#DD4D44"/>
       <CustomButton text="Sign In with Apple" onPress={onApplePressed}
       bgColor="#e3e3e3" fgColor="#363636"/>

      
 
    </>
    
  );
}


export default SocialSignInButtons;
