// components/LabeledInput.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomInput from '../CustomInput';

const LabeledInput = ({ label, placeholder, value, setValue, secureTextEntry }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <CustomInput
                placeholder={placeholder}
                value={value}
                setValue={setValue}
                secureTextEntry={secureTextEntry}
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
        fontSize: 16,
        color: 'black',
        fontWeight: '600',
        textAlign: 'left',
    },
});

export default LabeledInput;
