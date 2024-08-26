import React from 'react';
import { StyleSheet, View, Dimensions, ScrollView, Text, Image, TouchableOpacity, Alert, Linking } from 'react-native';
import HeaderWithBackButton from '../../components/HeaderWithBackButton';

const { width, height } = Dimensions.get('window');

const Contact = () => {
    const handleOpenURL = async (url) => {
        try {
            console.log(`Checking if URL can be opened: ${url}`);
            const supported = await Linking.canOpenURL(url);
            console.log(`Can open URL: ${supported}`);
            if (supported) {
                await Linking.openURL(url);
            } else {
                Alert.alert("URL Not Supported", `Don't know how to open URL: ${url}`);
            }
        } catch (error) {
            Alert.alert("Error", 'Error opening URL: ' + error.message);
        }
    };

    const handleOpenURLmaps = () => {
        const address = '204-19 Woodbine Downs Blvd, Etobicoke, ON M9W 6N5';
        const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        Linking.openURL(url).catch(err => console.error("Failed to open URL: ", err));
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <HeaderWithBackButton />
                <View style={styles.spacer} />
                <View style={styles.contentContainer}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Connect {'\n'} with Us</Text>
                    </View>

                    <View style={styles.contactSection}>
                        <Image source={require('../../../assets/images/location.png')} style={styles.icon} />
                        <TouchableOpacity onPress={handleOpenURLmaps} style={styles.touchable}>
                            <Text style={styles.contactText}>Our Location: 204-19 Woodbine Downs Blvd, Etobicoke, ON M9W 6N5</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.contactSection}>
                        <Image source={require('../../../assets/images/link.png')} style={styles.icon} />
                        <TouchableOpacity onPress={() => handleOpenURL('https://www.cygnisoft.com/')} style={styles.touchable}>
                            <Text style={styles.contactText}>Website: www.cygnisoft.com</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.contactSection}>
                        <Image source={require('../../../assets/images/mail.png')} style={styles.icon} />
                        <TouchableOpacity onPress={() => handleOpenURL('mailto:info@cygnisoft.com')} style={styles.touchable}>
                            <Text style={styles.contactText}>Mail: info@cygnisoft.com</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.contactSection}>
                        <Image source={require('../../../assets/images/phone.png')} style={styles.icon} />
                        <TouchableOpacity onPress={() => handleOpenURL('tel:9057822002')} style={styles.touchable}>
                            <Text style={styles.contactText}>Phone: 905-782-2002</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F5802C',
    },
    spacer: {
        height: height * 0.05,
    },
    contentContainer: {
        flex: 1,
        padding: width * 0.09,
        backgroundColor: '#F1F1F1',
        borderTopLeftRadius: 200,
    },
    header: {
        alignItems: 'center',
        marginBottom: height * 0.03,
        marginTop: height * 0.03,
    },
    headerText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: width * 0.08,
        color: 'black',
    },
    contactSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: height * 0.02,
        paddingVertical: height * 0.01,
        paddingHorizontal: width * 0.05,
    },
    icon: {
        width: width * 0.1,
        height: width * 0.1,
        marginRight: width * 0.02,
        resizeMode: 'contain',
    },
    contactText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: width * 0.035,
        color: '#000',
        flex: 1,
        textAlign: 'left',
        paddingTop: 10,
    },
    touchable: {
        minHeight: 48, // Ensure the touchable area is at least 48dp
        justifyContent: 'center',
        flex: 1, // Take up the remaining space in contactSection
    },
});

export default Contact;
