import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CustomLabeledRadioButton = ({ label, selected, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.radioButton}>
        <View
          style={[
            styles.radioOuterCircle,
            {
              backgroundColor: selected ? '#4CAF50' : '#A9A9A9', // Example colors for selected and unselected states
            },
          ]}
        >
          <View
            style={[
              styles.radioInnerCircle,
              {
                display: selected ? 'flex' : 'none',
              },
            ]}
          />
        </View>
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  radioButton: {
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
  },
  radioOuterCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#A9A9A9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInnerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
  },
});

export default CustomLabeledRadioButton;
