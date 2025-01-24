// src/components/EmployeeComponents/LogoutButton.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomButton from '../CustomButton';

const LogoutButton = ({ onLogout }) => {
  return (
    <View style={styles.logoutContainer}>
      <CustomButton 
        text="Logout" 
        onPress={onLogout} 
        type="SECONDARY" 
        style={styles.signout} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logoutContainer: {
    alignItems: 'center',
  },
  signout: {
    backgroundColor: '#F5802C',
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});

export default LogoutButton;
