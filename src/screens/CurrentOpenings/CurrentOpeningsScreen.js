import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, ScrollView, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import HeaderWithBackButton from '../../components/HeaderWithBackButton';
import { fetchJobOpenings } from '../../api/GenrealCRM';
import { Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';




const { width, height } = Dimensions.get('window');


const CurrentOpeningsScreen = () => {
    const [jobOpenings, setJobOpenings] = useState([]);
    const [sortedJobOpenings, setSortedJobOpenings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const getJobOpenings = async () => {
            try {
                const openings = await fetchJobOpenings();
                setJobOpenings(openings);
            } catch (err) {
                setError('Failed to load job openings. Please try again later.');
            } finally {
                setLoading(false);
            }
        };


        getJobOpenings();
    }, []);




    const handleSignIn = () => {
        navigation.navigate('SignIn'); // Replace 'SignIn' with the name of your sign-in route
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
   
   
    const formatDateString = (dateString) => {
        if (!dateString) {
            return ''; // Return an empty string if dateString is null or undefined
        }
       
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
   
        // Check if the date is valid
        if (isNaN(date.getTime())) {
            return ''; // Return empty if the date is invalid
        }
   
        return date.toLocaleDateString('en-US', options);
    };




    const truncateDescription = (description) => {
        // Check if description is null, undefined, or an empty string
        if (!description || typeof description !== 'string' || description.trim() === '') {
            return ''; // Return empty string if description is null, undefined, or empty
        }
       
        const words = description.split(' '); // Split by spaces
        // Return original description if less than or equal to 30 words
        if (words.length <= 15) {
            return description;
        }
       
        // Join the first 30 words and add ellipsis
        return words.slice(0, 15).join(' ') + '...';
    };


    const timeAgo = (dateString) => {
        if (!dateString) {
            return ''; // Return an empty string if dateString is null or undefined
        }


        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000); // Get the difference in seconds
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);


        if (days > 0) {
            return `Posted ${days} day${days > 1 ? 's' : ''} ago`;
        }
        if (hours > 0) {
            return `Posted ${hours} hour${hours > 1 ? 's' : ''} ago`;
        }
        if (minutes > 0) {
            return `Posted ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        }
        return 'Posted just now'; // If less than a minute ago
    };


    const handleCardClick = (job) => {
        setSelectedJob(job); // Set the clicked job as selected
    };
   
    const JobTypeMapping = {
        814740000: 'Full Time',
        814740001: 'Part Time',
        814740002: 'Contract',
        814740003: 'Co-op',
        814740004: 'Temp-Hire',
        814740005: 'Temporary',
        814740006: 'Freelance',
      };


      const RemoteMapping = {
        true: "Remote",  
        false: "Onsite",
     
      };


    useEffect(() => {
        // Sort jobOpenings by creadon in descending order
        const sortedJobs = [...jobOpenings].sort((a, b) => new Date(b.createdon) - new Date(a.createdon));
        
        // Update state with sorted jobs
        setSortedJobOpenings(sortedJobs);
        
        // Log the names of sorted jobs to the console
        const jobNames = sortedJobs.map(job => job.createdon);
        console.log('Sorted Job Names by Created Date:', jobNames);
    }, [jobOpenings]);
        
      // Log the names of sorted jobs to the console
   
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
                        sortedJobOpenings.map((job, index) => {
                            const hasJobType = job.cygni_jobtype in JobTypeMapping;
                            const hasRemoteType = job.cygni_remote in RemoteMapping;
   
                            return (
                                <TouchableOpacity key={index} style={styles.jobCard} onPress={() => handleCardClick(job)}>
                                    <Text style={styles.jobTitle}>{job.cygni_name}</Text>
                                    <Text style={styles.jobComp}>CygniSoft Inc.</Text>
                                    <Text style={styles.jobLocation}>{job.cr7e9_location}</Text>

                                    <Text style={styles.jobDescription}>{truncateDescription(stripHtmlTags(job.cr7e9_description))}</Text>    
   
                                    <View style={styles.jobTypeContainer}>
                                        {hasJobType && (
                                            <Text style={styles.jobTypeLeft}>
                                                <Text style={styles.jobTypeValue}>{JobTypeMapping[job.cygni_jobtype]}</Text>
                                            </Text>
                                        )}
   
                                        {hasRemoteType && (
                                            <Text style={styles.jobTypeRight}>
                                                <Text style={styles.remoteValue}>{RemoteMapping[job.cygni_remote]}</Text>
                                            </Text>
                                        )}
                                    </View>
   
   
                                    <TouchableOpacity
                                        style={styles.buttonCurrent}
                                        onPress={handleSignIn}>
                                        <Text style={styles.buttonText}>Login To Apply</Text>
                                    </TouchableOpacity>
   
                                    <Text style={styles.jobCreated}>{timeAgo(job.createdon)}</Text>
                                </TouchableOpacity>
                            );
                        })
                    )}
                </View>
            </ScrollView>
   
            <Modal
                visible={!!selectedJob}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setSelectedJob(null)}
            >
                <View style={styles.modalContainer}>
                    <ScrollView contentContainerStyle={styles.modalContent} showsVerticalScrollIndicator={false}>
                        {selectedJob && (
                            <View style={styles.fullJobCard}>
                                <Text style={styles.fullJobTitle}>{selectedJob.cygni_name}</Text>
                                <Text style={styles.fullJobDescription}>{stripHtmlTags(selectedJob.cr7e9_description)}</Text>
                                <Text style={styles.fullJobLocation}>{selectedJob.cr7e9_location}</Text>
                                <TouchableOpacity
                                    onPress={() => setSelectedJob(null)}
                                    style={styles.closeButton}
                                >
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
        backgroundColor: '#1E1E20', // Background color for the content area
        borderTopLeftRadius: 200,
        minHeight: height - (height * 0.1 + height * 0.05), // Adjust minimum height
    },
    jobCard: {
        backgroundColor: '#FFFCFC', // Set to white
        padding: 20,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'rgba(245, 128, 44, 0.5)', // Light orange border color
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3, // For Android shadow
        overflow: 'hidden',
    },
    jobCreated:{
        fontFamily:'Montserrat-Bold',
        fontSize: 13,
        marginTop:15,
   
    },
    jobTitle: {
        fontFamily:'Montserrat-Bold',
        fontSize: 23,
        color: '#000',
        marginBottom: 15,
    },
    jobComp:{
        fontFamily:'Montserrat-Bold',
        fontSize:14,
        marginBottom: 15,
    },
    jobDescription: {
        fontFamily:'Montserrat-Regular',
        fontSize: 15,
        color: '#000',
        marginVertical: 5,
    },
    jobLocation: {
        fontFamily:'Montserrat-Bold',
        fontSize: 16,
        color: '#000',
        marginTop: 3,
    },
    jobTypeContainer: {
        flexDirection: 'row', // Align items horizontally
        justifyContent: 'flex-start', // Align to the left
        padding: 0, // Add some padding for better spacing
        borderRadius: 10, // Rounded corners for the background
        marginBottom: 5, // Space below
        width: '100%', // Ensure it takes full width
        alignItems: 'center', // This can help center items vertically
    },
    jobTypeLeft: {
        backgroundColor: '#F1CDB3', // Light orange background color for left
        padding: 10, // Add some padding for better spacing
        borderRadius: 10, // Rounded corners for the background
        marginTop: 10, // Space above
        marginBottom: 20, // Space below
        width: '45%', // Width for left container
        textAlign:'center',
       
    },
    jobTypeValue: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        color: '#000', // Color to highlight the job type
    },
    jobTypeRight: {
        backgroundColor: '#F1CDB3', // Different background color for right
        padding: 10, // Add some padding for better spacing
        borderRadius: 10, // Rounded corners for the background
        marginTop: 10, // Space above
        marginBottom: 20, // Space below
        width: '45%', // Width for right container
        marginLeft: 10, // Small left margin for spacing between left and right
        textAlign:'center',


    },
    remoteValue: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        color: '#000', // Color to highlight the remote status
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    buttonCurrent: {
        backgroundColor: '#F5802C', // Orange background
        borderRadius: 10,
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        paddingVertical: 12, // Increased vertical padding for a more substantial button
        marginTop: 12, // Slightly more space from the content above
        shadowColor: '#000', // Add shadow for depth
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // Enhance elevation for Android
    },
    buttonText: {
        fontFamily: 'Montserrat-Bold',
        color: '#000', // Change text color to white for better contrast
        fontSize: 18, // Increase font size for better readability
        textAlign: 'center', // Center align the text
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dimmed background
    },
    modalContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20, // Ensure some padding inside the modal
    },
    fullJobCard: {
        backgroundColor: '#FFFCFC',
        padding: 20,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'rgba(245, 128, 44, 0.5)',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 4,
        elevation: 3,
        width: width * 0.85, // Adjust width to avoid content being too close to the edges
        marginBottom: 20, // Give some space between card and button
    },
   
    fullJobTitle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 28,
        color: '#000',
        marginBottom: 10,
    },
    fullJobDescription: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        color: '#000',
        marginBottom: 10,
    },
    fullJobLocation: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 17,
        color: '#000',
        marginBottom: 10,
    },
    closeButton: {
        backgroundColor: '#F5802C',
        borderRadius: 10,
        paddingVertical: 12, // Add vertical padding to make it more clickable
        paddingHorizontal: 40, // Add some horizontal padding for a nicer button
        alignItems: 'center',
        marginTop: 20, // Ensure the button is separated from the content
        alignSelf: 'center', // Center the button horizontally
    },
    closeButtonText: {
        color: '#000',
        fontFamily: 'Montserrat-Bold',
        fontSize: 18, // Make the text size bigger for better readability
    },
});


export default CurrentOpeningsScreen;



