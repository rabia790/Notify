// NoDataMessage.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';

const NoDataMessage = ({ message }) => {
  return <Text style={styles.noDataText}>{message}</Text>;
};

const styles = StyleSheet.create({
  noDataText: {
    fontSize: 16,
    color: '#ff0000', // Red color to indicate no data
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default NoDataMessage;
