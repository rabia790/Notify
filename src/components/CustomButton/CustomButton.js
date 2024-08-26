import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

const CustomButton = ({ onPress, text, type = "PRIMARY", bgColor, fgColor }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? { backgroundColor: bgColor } : {}
      ]}
    >
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? { color: fgColor } : {}
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 15,
  },
  container_PRIMARY: {
    backgroundColor: '#F5802C',
    borderWidth: 2,
    
  },
  container_SECONDARY: {
    borderColor: "#F5802C",
    borderWidth: 2,
    
  },
  container_TERTIARY: {},
  text: {
    fontFamily: 'Montserrat-Bold', // Ensure the font name matches exactly
    
    
    
  },
  text_PRIMARY: {
    color: "#000",
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
  },
  text_SECONDARY: {
    color: "#F5802C",
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
  },
  text_TERTIARY: {
    color: '#f5802c',
    fontFamily: 'Montserrat-Bold',
    fontSize: 20, 
  },
  text_QUATERNARY: {
    color: '#1E1E20',
    fontFamily: 'Montserrat-Bold',
    fontSize: 20, 
  },
});

export default CustomButton;
