// CountrySelector.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CountrySelectorModal from './CountrySelectorModal';

const CountrySelector = ({ selectedCountryCode, onSelect, onShow }) => (
    <View style={styles.container}>
        <TouchableOpacity onPress={onShow} style={styles.countrySelector}>
            <Text style={styles.countryText}>{selectedCountryCode}</Text>
        </TouchableOpacity>
        <CountrySelectorModal
            visible={true}
            onClose={onShow}
            onSelect={onSelect}
            selectedCountryCode={selectedCountryCode}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    countrySelector: {
        padding: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
    },
    countryText: {
        fontSize: 16,
    },
});

export default CountrySelector;
