// ProfileButton.js
import React from 'react';
import {  Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ProfileButton = ({ onPress, text, imageSource }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
  
        <Image source={imageSource} style={styles.image} />
     
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    backgroundColor: '#E3DCCA', // Light orange background
    borderRadius: 15, // Rounded corners
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginVertical: 10,
   
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 25,
  },
  text: {
    color: '#191918', // White text
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
  },
});

export default ProfileButton;
