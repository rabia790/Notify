import React from 'react';
import { StyleSheet, View, Modal, ScrollView, Text, TouchableOpacity } from 'react-native';
import countries from './countries';

const CountrySelectorModal = ({ visible, onClose, onSelect, selectedCountryCode }) => {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <ScrollView contentContainerStyle={styles.scrollViewContent}>
                        {countries.map((country, index) => (
                            <TouchableOpacity
                                key={`${country.code}-${index}`}
                                style={styles.countryOption}
                                onPress={() => {
                                    onSelect(country.code);
                                    onClose();
                                }}
                            >
                                <Text style={styles.countryText}>
                                    {country.name} ({country.code})
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%', // Increase width
        maxHeight: '70%', // Increase height
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    scrollViewContent: {
        flexGrow: 1, // Ensure scroll view expands to fill modal content
    },
    countryOption: {
        paddingVertical: 20, // Increase vertical padding for each item
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    countryText: {
        fontSize: 18,
        color:'#000',
    },
});

export default CountrySelectorModal;
