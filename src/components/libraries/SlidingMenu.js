import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Animated, Easing, Alert, Linking } from 'react-native';
import { useModal } from './ModalContext';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from './AuthContext';


const SlidingMenu = ({ visible, onClose, candidate = null }) => {
    const { showModal } = useModal();
    const navigation = useNavigation();
    const { isAuthenticated } = useAuth(); 


    const [scaleAnim] = useState(new Animated.Value(0)); // Initial scale
    const [translateXAnim] = useState(new Animated.Value(300)); // Initial X position (off-screen to the right)
    const [translateYAnim] = useState(new Animated.Value(-300)); // Initial Y position (off-screen to the top)
    
    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(translateXAnim, {
                    toValue: 0, // Slide in from right
                    duration: 300,
                    easing: Easing.out(Easing.quad), // Smoother easing
                    useNativeDriver: true,
                }),
                Animated.timing(translateYAnim, {
                    toValue: 0, // Slide down from top
                    duration: 300,
                    easing: Easing.out(Easing.quad), // Smoother easing
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1, // Scale up
                    duration: 300,
                    easing: Easing.out(Easing.quad), // Smoother easing
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(translateXAnim, {
                    toValue: 300, // Slide out to right
                    duration: 300,
                    easing: Easing.in(Easing.quad), // Smoother easing
                    useNativeDriver: true,
                }),
                Animated.timing(translateYAnim, {
                    toValue: -300, // Slide up out of view
                    duration: 300,
                    easing: Easing.in(Easing.quad), // Smoother easing
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 0, // Scale down
                    duration: 300,
                    easing: Easing.in(Easing.quad), // Smoother easing
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [visible]);
    
    const handleOpenURL = (url) => {
        try {
            console.log(`Checking if URL can be opened: ${url}`);
            const supported = Linking.canOpenURL(url);
            console.log(`Can open URL: ${supported}`);
            if (supported) {
                Linking.openURL(url);
            } else {
                Alert.alert("URL Not Supported", `Don't know how to open URL: ${url}`);
            }
        } catch (error) {
            Alert.alert("Error", 'Error opening URL: ' + error.message);
        }
    };

 



    return (
        <Modal
            transparent={true}
            animationType="none"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <Animated.View
                    style={[
                        styles.modalContainer,
                        {
                            transform: [
                                { translateX: translateXAnim },
                                { translateY: translateYAnim },
                                { scale: scaleAnim },
                            ],
                        },
                    ]}
                >
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}
                        >
                        <Text style={styles.closeText}>✕</Text>
                    </TouchableOpacity>
                    <View style={styles.menuItems}>
                        <TouchableOpacity style={styles.menuItem} onPress={() => handleOpenURL('https://www.cygnisoft.com/faq')}
                           >
                            <Text style={styles.menuText}>FAQ</Text>
                        </TouchableOpacity>

                      

                        {isAuthenticated && (
                        <TouchableOpacity style={styles.menuItem} onPress={() => handleOpenURL('https://www.cygnisoft.com/work-attire')}
                       >
                            <Text style={styles.menuText}>WORK ATTIRE</Text>
                        </TouchableOpacity>
                         )}

                        <TouchableOpacity style={styles.menuItem} onPress={() => handleOpenURL('https://www.cygnisoft.com')}
                      >
                            <Text style={styles.menuText}>CONTACT US</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => handleOpenURL('https://www.cygnisoft.com/eula')}
                           >
                            <Text style={styles.menuText}>END USER LICENSE AGREEMENT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => handleOpenURL('https://www.cygnisoft.com/privacy-policy')}
                           >
                            <Text style={styles.menuText}>PRIVACY POLICY</Text>
                        </TouchableOpacity>
                       
                        <TouchableOpacity style={styles.menuItem} onPress={() => handleOpenURL('https://www.cygnisoft.com/ios')}>
                            <Text style={styles.menuText}>VERSION NUMBER {'\n'}Cygni_1.2.1</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-start',
        alignItems: 'flex-end', // Align to the right
    },
    modalContainer: {
        width: 250,
        height: '70%',
        minHeight: 300,
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute', // Make sure the modal is positioned absolutely
        top: 0, // Align to the top
        right: 0, // Align to the right
    },
    closeButton: {
        alignSelf: 'flex-end',
        marginTop:20,
        marginBottom: 20,
        width: 48, height: 48, justifyContent: 'center', alignItems: 'center',
    },
    closeText: {
        fontSize: 24,
        fontFamily: 'Montserrat-Bold',
      color: '#D3601C',
    },
    menuItems: {
        flex: 1,
    },
    menuItem: {
        minHeight: 48, // Ensure touch target height is at least 48dp
        paddingVertical: 15,
        paddingHorizontal: 20, // Ensure touch target width is at least 48dp
        borderBottomWidth: 1,
        borderBottomColor: '#B0B0B0',
        justifyContent: 'center', // Center text vertically
    },
    menuText: {
        fontSize: 18,
        color: '#333',
        fontFamily: 'Montserrat-Regular',
    },
});

export default SlidingMenu;
