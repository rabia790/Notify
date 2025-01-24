import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';


const LabeledTextArea = ({ label, placeholder, value, setValue }) => {
  return (
    <View style={styles.container}>
      {/* Label with accessibility properties */}
      <Text style={styles.label} accessible={true} accessibilityLabel={label}>
        {label}
      </Text>


      {/* TextInput with accessibility properties */}
      <TextInput
        style={styles.textArea}
        placeholder={placeholder}
        multiline={true}
        numberOfLines={4}
        textAlignVertical="top" // Ensures text starts at the top
        value={value}
        onChangeText={setValue}  // Correctly update the value using setValue
        accessible={true} // This tells the screen reader to treat this as an accessible component
        accessibilityLabel={placeholder} // This helps the screen reader describe the input field
        accessibilityHint={`Type your ${label.toLowerCase()} here`} // Tells the user what to do
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FFFF',
    fontFamily: 'Montserrat-Bold',
  },
  textArea: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#f9f9f9',
    fontFamily: 'Montserrat-Regular',
  },
});


export default LabeledTextArea;





