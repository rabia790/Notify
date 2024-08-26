// components/BooleanInput.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const BooleanCustomInput = ({ label, value, setValue, options, accessibilityLabel, accessibilityHint   }) => {
    const handleValueChange = (itemValue) => {
        setValue(itemValue);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={value}
                    onValueChange={handleValueChange}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                    accessibilityLabel={accessibilityLabel}
                    accessibilityHint={accessibilityHint}
                >
                    {options.map((option) => (
                        <Picker.Item 
                            key={option.value} 
                            label={option.label} 
                            value={option.value} 
                            color={'white'} // Set text color for the picker items
                        />
                    ))}
                </Picker>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        width: '100%',
    },
    label: {
        fontFamily: 'Montserrat-Bold',
        color: '#FFFF',
        marginBottom: 10,
        fontSize: 16,
    },
    pickerContainer: {
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        overflow: 'hidden',
    },
    picker: {
        height: 60,
        width: '100%',
        paddingHorizontal: 10,
        color: 'black', // Set text color for the selected item
        backgroundColor: 'white', // Set the background color for the Picker
    },
    pickerItem: {
        color: 'black', // Set text color for the picker items
    },
});

export default BooleanCustomInput;
