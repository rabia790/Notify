import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ProfilePhoto = ({ source }) => {
  return (
    <View style={styles.container}>
      <Image source={source} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  image: {
    width: 120, // Adjust the size as needed
    height: 120, // Adjust the size as needed
    borderRadius: 60, // Half of the width/height to make it round
    borderWidth: 3,
    borderColor: '#FFFFFF', // Optional: add a border color
  },
});

export default ProfilePhoto;
