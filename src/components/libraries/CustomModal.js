import React from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from 'react-native';

const DynamicModal = ({
    isVisible,
    onClose,
    heading,
    message,
    primaryButtonText,
    onPrimaryButtonPress,
    secondaryButtonText,
    onSecondaryButtonPress,
}) => {
    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={isVisible}
            onRequestClose={onClose}
        >
           
                <View style={styles.modalBackground}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContainer}>
                            {heading && <Text style={styles.heading}>{heading}</Text>}
                            {message && <Text style={styles.message}>{message}</Text>}
                            <View style={styles.buttonContainer}>
                                {secondaryButtonText && (
                                    <TouchableOpacity
                                        onPress={() => {
                                            onSecondaryButtonPress();
                                            onClose(); // Hide the modal after the secondary button is pressed
                                        }}
                                        style={styles.secondaryButton}
                                        accessibilityLabel={secondaryButtonText}
                                    >
                                        <Text style={styles.buttonText}>{secondaryButtonText}</Text>
                                    </TouchableOpacity>
                                )}
                                {primaryButtonText && (
                                    <TouchableOpacity
                                        onPress={() => {
                                            onPrimaryButtonPress();
                                            onClose(); // Hide the modal after the primary button is pressed
                                        }}
                                        style={styles.primaryButton}
                                        accessibilityLabel={primaryButtonText}
                                    >
                                        <Text style={styles.buttonText}>{primaryButtonText}</Text>
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity
                                    onPress={onClose} // Hide the modal on pressing OK
                                    style={styles.okButton}
                                    accessibilityLabel="OK"
                                >
                                    <Text style={styles.buttonText}>OK</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
         
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        height: '40%', // Adjust height as needed
        backgroundColor: 'white',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    heading: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        marginBottom: 10,
        color: '#0000',
        textAlign: 'center',
    },
    message: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: '#000',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around', // Distribute buttons evenly
        marginTop: 20,
    },
    primaryButton: {
        backgroundColor: '#B35715',
        height: 48,  // Set height to 48dp
        paddingVertical: 10,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5, // Add margin to separate from other buttons
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondaryButton: {
        backgroundColor: '#B35715',
        height: 48,  // Set height to 48dp
        paddingVertical: 10,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5, // Add margin to separate from other buttons
        alignItems: 'center',
        justifyContent: 'center',
    },
    okButton: {
        backgroundColor: '#B35715',
        height: 48,  // Set height to 48dp
        paddingVertical: 10,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,  // Add margin to separate from other buttons
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
       color: '#000',
        fontSize: 16,
        fontFamily:'Montserrat-Bold',
        textAlign: 'center',
    },
});

export default DynamicModal;
