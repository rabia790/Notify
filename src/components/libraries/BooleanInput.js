// components/BooleanInput.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const BooleanInput = ({ label, value, setValue }) => {
    const handleValueChange = (itemValue) => {
        setValue(itemValue === 'no');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <Picker
                selectedValue={value ? 'yes' : 'no'}
                onValueChange={handleValueChange}
                style={styles.picker}
            >
                <Picker.Item label="Select an option" value="" />
                <Picker.Item label="Yes" value="yes" />
                <Picker.Item label="No" value="no" />
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        width: '100%',
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    picker: {
        backgroundColor: 'white',
        width: '100%',
        height: 60,
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
    },
});

export default BooleanInput;
