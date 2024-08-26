import React, {useState} from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import SlidingMenu from '../libraries/SlidingMenu';

const HeaderWithoutBackButton = () => {
    const [isMenuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(prevState => !prevState);
    };

    return (
        <View style={styles.container}>
            {/* Extra background with a bottom-left outward curve effect */}
            <View style={styles.extraBackground} />
            
            {/* Back button */}
            <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}
              accessibilityLabel="Gear "
              accessibilityRole="button">
                <View style={styles.menuLines}>
                    <View style={styles.menuLine} />
                    <View style={styles.menuLine} />
                    <View style={styles.menuLine} />
                </View>
            </TouchableOpacity>
            <SlidingMenu visible={isMenuVisible} onClose={() => setMenuVisible(false)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5802C',
        height: 90,
   
    },
    
    button: {
        position: 'absolute',
        top: 50,
        left: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
       
    },
    logo: {
        width: 30,
        height: 30,
    },
    menuButton: {
        position: 'absolute',
        right: 15,
        top: 20,
        width: 48, // Increase width to 48dp
        height: 48, // Increase height to 48dp
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
        backgroundColor: '#1E1E20', // Line color
        height: 4, // Thickness of each line
        width: 35, // Length of each line
        marginVertical: 5,
    },
});

export default HeaderWithoutBackButton;
