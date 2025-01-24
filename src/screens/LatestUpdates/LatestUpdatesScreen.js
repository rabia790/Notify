import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, ScrollView, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import HeaderWithBackButton from '../../components/HeaderWithBackButton';
import { fetchLatestUpdates } from '../../api/GenrealCRM';
import { Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const { width, height } = Dimensions.get('window');


const LatestUpdatesScreen = () => {
    const [updates, setUpdates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUpdate, setSelectedUpdate] = useState(null);
    const [showFullDescription, setShowFullDescription] = useState(false);


    const navigation = useNavigation();


    // Fetch latest updates on component mount
    useEffect(() => {
        const getLatestUpdates = async () => {
            try {
                const response = await fetchLatestUpdates();
                setUpdates(response); // Assuming response is an array of updates
            } catch (error) {
                console.error("Failed to fetch updates", error);
                console.log("Error", "Failed to fetch the latest updates.");
            } finally {
                setLoading(false);
            }
        };


        getLatestUpdates();
    }, []);


    const truncateDescription = (description) => {
        if (!description || typeof description !== 'string' || description.trim() === '') {
            return ''; // Return empty string if description is null, undefined, or empty
        }
       
        const words = description.split(' '); // Split by spaces
        if (words.length <= 15) {
            return description;
        }
       
        return words.slice(0, 15).join(' ') + '...';
    };


    const stripHtmlTags = (html) => {
        if (typeof html === 'string') {
            let listCount = 0; // Initialize a counter for list items
            return html
                .replace(/<ol>/g, '') // Remove opening <ol> tag
                .replace(/<\/ol>/g, '') // Remove closing </ol> tag
                .replace(/<li>(.*?)<\/li>/g, (match, content) => {
                    listCount++; // Increment the list counter
                    return `${listCount}. ${content.trim()}\n`; // Number the <li> items correctly
                })
                .replace(/<[^>]*>/g, ''); // Remove any remaining HTML tags
        }
        return ''; // Return empty string if html is null or not a string
    };


    const handleViewFullClick = (news) => {
        setSelectedUpdate(news); // Set the clicked news as selected
        setShowFullDescription(true); // Set full description visibility to true
    };


    return (
        <View style={styles.root}>
            <HeaderWithBackButton />
            <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.spacer} />
                <View style={styles.contentContainer}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : error ? (
                        <Text style={styles.errorText}>{error}</Text>
                    ) : (
                        updates.map((news, index) => (
                            <View key={index} style={styles.newsCard}>
                                <Text style={styles.newsTitle}>{news.cygni_title}</Text>
                                <Text style={styles.newsDescription}>
                                    {truncateDescription(stripHtmlTags(news.cygni_description))}
                                </Text>
                               
                                {/* View Full Update Button */}
                                <TouchableOpacity
                                    onPress={() => handleViewFullClick(news)}
                                    style={styles.viewFullButton}
                                >
                                    <Text style={styles.buttonText}>View Full Update</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    )}
                </View>
            </ScrollView>


            <Modal
                visible={!!selectedUpdate} // Modal is visible when an update is selected
                animationType="slide"
                transparent={true} // Makes the modal cover the entire screen
                onRequestClose={() => {
                    setSelectedUpdate(null); // Close modal on back button press
                    setShowFullDescription(false); // Reset full description visibility
                }}
            >
                <View style={styles.modalContainer}>
                <ScrollView
            contentContainerStyle={styles.modalContent}
            showsVerticalScrollIndicator={false}
        >
                    {selectedUpdate && (
                        <View style={styles.fullNewsCard}>
                            <Text style={styles.newsTitle}>{selectedUpdate.cygni_title}</Text>
                           
                            {/* Full Description */}
                            <Text style={styles.newsDescription}>
                                {stripHtmlTags(selectedUpdate.cygni_description)}
                            </Text>


                            <TouchableOpacity onPress={() => {
                                setSelectedUpdate(null); // Close modal on button press
                                setShowFullDescription(false); // Reset full description visibility
                            }} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
};


const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F5802C', // Top orange area color
    },
    spacer: {
        height: height * 0.05,
    },
    contentContainer: {
        flex: 1,
        padding: width * 0.09,
        backgroundColor: '#1E1E20', // Lighter background color for the content area
        borderTopLeftRadius: 200, // Rounded top left corner
        minHeight: height - (height * 0.1 + height * 0.05), // Adjust minimum height
        elevation: 5, // Slight shadow for content area
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    newsCard: {
        backgroundColor: '#FFFFFF', // Keep card background white
        padding: 20,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'rgba(245, 128, 44, 0.5)', // Light orange border color
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3, // For Android shadow
        overflow: 'hidden',
    },
    newsTitle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 22,
        color: '#333333', // Darker gray for titles
        marginBottom: 10,
    },
    newsDescription: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        color: '#666666', // Lighter gray for descriptions
        marginVertical: 5,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    viewFullButton: {
        marginTop: 10,
        backgroundColor: '#F5802C',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: 'Montserrat-Bold',
        color: '#000', // White text for contrast
        fontSize: 16,
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent background for modal
        justifyContent: 'center', // Center modal content
        alignItems: 'center',
    },
    modalContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20, // Ensure some padding inside the modal
    },
    fullNewsCard: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'rgba(245, 128, 44, 0.5)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 3,
        width: '85%', // Slightly wider modal
    },
    closeButton: {
        marginTop: 15,
        backgroundColor: '#F5802C',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#000',
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
    },
});


export default LatestUpdatesScreen;





