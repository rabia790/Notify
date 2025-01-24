import React from 'react';
import { View, Text, TouchableOpacity, ActionSheetIOS, Dimensions, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const { width } = Dimensions.get('window');

const BooleanCustomInput = ({ label, value, setValue, options, accessibilityLabel, accessibilityHint }) => {
    const handleValueChange = (itemValue) => {
        console.log('Picker value changed to:', itemValue); 
        setValue(itemValue);
    };

    const showIOSPicker = () => {
        const optionLabels = options.map(option => option.label);
        
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: [...optionLabels, 'Cancel'], // Add 'Cancel' as a separate option
                cancelButtonIndex: optionLabels.length, // Set 'Cancel' as the last option
            },
            (buttonIndex) => {
                if (buttonIndex !== optionLabels.length) {
                    setValue(options[buttonIndex].value); // Only set value if it's not the Cancel button
                }
            }
        );
    };

    return (
        <View style={{ marginVertical: 10, 
            width: width * 0.9, // Set consistent width
            alignSelf: 'center' }}>
            <Text style={{ fontFamily: 'Montserrat-Bold', color: '#FFFF', marginBottom: 10, fontSize: 16 }}>
                {label}
            </Text>
            {Platform.OS === 'ios' ? (
                <TouchableOpacity 
                    onPress={showIOSPicker} 
                    accessibilityLabel={accessibilityLabel} 
                    accessibilityHint={accessibilityHint}
                    style={{
                        borderRadius: 10,  // Apply border radius for rounded corners
                        overflow: 'hidden', // Ensure text does not overflow
                        borderWidth: 1,
                        borderColor: '#ccc',
                        backgroundColor: '#fff'
                    }}
                >
                    <Text style={{ padding: 15, color: '#000' }}>
                        {options.find(option => option.value === value)?.label || 'Select an option'}
                    </Text>
                </TouchableOpacity>
            ) : (
                <Picker
                    selectedValue={value}
                    onValueChange={handleValueChange}
                    accessibilityLabel={accessibilityLabel}
                    accessibilityHint={accessibilityHint}
                    style={{
                        borderRadius: 10, // Apply border radius for Android as well (if needed)
                    }}
                >
                    {options.map((option) => (
                        <Picker.Item key={option.value} label={option.label} value={option.value} />
                    ))}
                </Picker>
            )}
        </View>
    );
};

export default BooleanCustomInput;