import React, { useState } from 'react';
import { View, Image, StyleSheet, Pressable, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Back from '../../../assets/images/back_btn.png';
import SlidingMenu from '../libraries/SlidingMenu';

const HeaderWithBackButton = ({ showTitle, title  }) => {
    const navigation = useNavigation();
    const [isMenuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(prevState => !prevState);
    };

    return (
        <View style={styles.container}>
            {/* Extra background with a bottom-left outward curve effect */}
            <View style={styles.extraBackground} />

            {/* Back button with increased touchable area */}
            <View style={styles.backButtonContainer}>
                <Pressable onPress={() => navigation.goBack()} style={styles.button}>
                    <Image source={Back} style={styles.logo} resizeMode="contain"
                        accessibilityLabel="Back"
                        accessibilityRole="button"/>
                </Pressable>
            </View>

            <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}
                accessibilityLabel="Gear"
                accessibilityRole="button">
                <View style={styles.menuLines}>
                    <View style={styles.menuLine} />
                    <View style={styles.menuLine} />
                    <View style={styles.menuLine} />
                </View>
            </TouchableOpacity>

            <SlidingMenu visible={isMenuVisible} onClose={() => setMenuVisible(false)} />

            {showTitle && (
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{title}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5802C',
        height: 90,
    },
    backButtonContainer: {
        position: 'absolute',
        top: 20, // Position it according to your layout
        left: 15,
        width: 80,  // Increase the width to expand touchable area
        height: 60, // Increase the height to expand touchable area
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 30,
        height: 30,
        tintColor: '#1E1E20',
    },
    menuButton: {
        position: 'absolute',
        right: 15,
        top: 20,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
    },
    menuLines: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 25,
    },
    menuLine: {
        backgroundColor: '#1E1E20',
        height: 4,
        width: 35,
        marginVertical: 5,
    },
    titleContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 50,
        alignItems: 'center',
    },
    titleText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        color: '#000',
    },
});

export default HeaderWithBackButton;