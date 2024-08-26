import React from 'react';
import { View, TextInput, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';


const { width } = Dimensions.get('window');

const CustomInput = ({value, setValue, placeholder, secureTextEntry,  rightIcon,
  onRightIconPress, accessibilityLabel }) => {
  
  return (
    <View style={styles.container}>
      <TextInput placeholder={placeholder} 
       placeholderTextColor="#5D5757"
      value={value}
      onChangeText={setValue}
      style={styles.input}
      secureTextEntry={secureTextEntry}
      accessibilityLabel={accessibilityLabel || `${placeholder} input field`}
       
        
         />
      {rightIcon && (
        <TouchableOpacity onPress={onRightIconPress} style={styles.iconContainer}
        accessibilityLabel={secureTextEntry ? "Show password" : "Hide password"}
        accessibilityHint="Toggles password visibility"
        >
    
          <Image source={rightIcon} style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      
     
      fontSize: 16, 
      color: '#000', 
    },
    input: {
      backgroundColor: 'white',
    width: width * 0.9,
    height: 60,
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    fontFamily:'Montserrat-Regular',
    color: 'black',
    marginBottom:30,
    },
    iconContainer: {
      position: 'absolute',
      right: 10,
      top: '40%', // Adjust this to move the icon up or down
      transform: [{ translateY: -12 }], // Adjust this value to fine-tune the vertical position
      width: 48,
  height: 48,
    },
    icon: {
      width: 24,
      height: 24,
   
    },
  });

export default CustomInput;
