// components/LabeledInput.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomInput from '../CustomInput';

const LabeledInput = ({ label, placeholder, value, setValue, secureTextEntry, accessibilityHint  }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label} accessibilityLabel={label} 
         
             accessibilityState={{ value: value }}
            accessibilityHint={accessibilityHint || `Label  for ${label}`}
            >
                {label} 
                </Text>
            <CustomInput
                placeholder={placeholder}
                value={value}
                setValue={setValue}
                secureTextEntry={secureTextEntry}
                accessibilityLabel={label}
        accessibilityHint={`Enter ${label.toLowerCase()}`}
        
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        width: '100%',
    },
    label: {
        marginBottom: 5,
        fontFamily:'Montserrat-Bold',
        fontSize: 16,
        color: '#FFFF',

        textAlign: 'left',
    },
});

export default LabeledInput;
