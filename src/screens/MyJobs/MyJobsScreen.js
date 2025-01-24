import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, ScrollView, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import HeaderWithBackButton from '../../components/HeaderWithBackButton';
import { fetchJobOpenings, fetchAppliedJobsFromCRM } from '../../api/GenrealCRM'; // Import the fetch function
import { Modal } from 'react-native';
import { applyForJob } from '../../api/GenrealCRM';
import { useModal } from '../../components/libraries/ModalContext';
import JobCard from '../../components/libraries/JobCard';


const { width, height } = Dimensions.get('window');


const MyJobsScreen = ({ route, navigation }) => {
    const [jobOpenings, setJobOpenings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);
    const [appliedJobs, setAppliedJobs] = useState([]);
    const { showModal } = useModal();
    const { candidate } = route.params;


    useEffect(() => {
        const getJobOpenings = async () => {
            setLoading(true); // Reset loading state
            try {
                const openings = await fetchJobOpenings();
                setJobOpenings(openings);
            } catch (err) {
                setError('Failed to load job openings. Please try again later.');
            } finally {
                setLoading(false);
            }
        };


        const getAppliedJobs = async () => {
            try {
                const jobsResponse = await fetchAppliedJobsFromCRM(candidate.cygni_candidatesid);


                // Check if the response has a 'value' property and it's an array
                if (jobsResponse && Array.isArray(jobsResponse.value)) {
                    // Extract job IDs from the 'value' array
                    const appliedJobIds = jobsResponse.value.map(job => {
                        // Extract the job ID from the @odata.id
                        const idMatch = job["@odata.id"].match(/\/([^\/]+)$/);
                        return idMatch ? idMatch[1] : null; // Return job ID or null if not found
                    }).filter(id => id !== null); // Filter out any null values
                   
                    setAppliedJobs(appliedJobIds);


                } else {
                    console.warn('Fetched jobs response does not contain a valid array:', jobsResponse);
                    setAppliedJobs([]); // Default to empty array if not valid
                }
            } catch (err) {
                console.error('Failed to load applied jobs:', err);
                setError('Failed to load applied jobs. Please try again later.');
            }
        };
       
        getJobOpenings();
        getAppliedJobs(); // Fetch applied jobs
    }, [candidate]); // Re-fetch if candidate changes


    const handleCardClick = (job) => {
        setSelectedJob(job);
    };


    const handleApplyJob = async (job) => {
        const candidateId = candidate.cygni_candidatesid;
        const openingId = job.cygni_currentopeningid;
       
        if (appliedJobs.includes(`cygni_currentopenings(${job.cygni_currentopeningid})`)) {
            showModal({
                heading: 'Info',
                message: 'You have already applied for this job.',
            });
            return;
        }


        try {
            await applyForJob(candidateId, openingId);
            setAppliedJobs((prev) => [...prev, openingId]); // Update applied jobs
            showModal({
                heading: 'Success',
                message: 'Application Submitted Successfully! Please send your resume to hr@cygnisoft.com.',
            });
        } catch (error) {
            showModal({
                heading: 'Error',
                message: 'Failed to apply for the job. Please try again later.',
            });
        }
    };


   


    // Filter jobOpenings to only show applied jobs
    const appliedJobOpenings = jobOpenings.filter((job) =>
        appliedJobs.includes(`cygni_currentopenings(${job.cygni_currentopeningid})`)
    );


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
                    ) : appliedJobOpenings.length > 0 ? (
                        appliedJobOpenings.map((job, index) => (
                            <JobCard
                                key={index}
                                job={job}
                                candidate={candidate}
                                onClick={() => handleCardClick(job)}
                                onApply={() => handleApplyJob(job)}
                                isApplied={appliedJobs.includes(`cygni_currentopenings(${job.cygni_currentopeningid})`)}
                            />
                        ))
                    ) : (
                        <Text style={styles.errorText}>You have not applied for any jobs yet.</Text>
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
                    {selectedJob && (
                        <View style={styles.fullJobCard}>
                            <Text style={styles.fullJobTitle}>{selectedJob.cygni_name}</Text>
                            <Text style={styles.fullJobDescription}>{selectedJob.cr7e9_description}</Text>
                            <Text style={styles.fullJobLocation}>{selectedJob.cr7e9_location}</Text>
                            <TouchableOpacity onPress={() => setSelectedJob(null)} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </Modal>
        </View>
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
        backgroundColor: '#1E1E20',
        borderTopLeftRadius: 200,
        minHeight: height - (height * 0.1 + height * 0.05),
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: height * 0.2,
    },
    fullJobCard: {
        backgroundColor: '#FFFCFC',
        borderRadius: 10,
        padding: 20,
        width: '90%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    fullJobTitle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 24,
        marginBottom: 10,
        color:'#000',
    },
    fullJobDescription: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        marginBottom: 10,
        color:'#000',
    },
    fullJobLocation: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        marginBottom: 20,
        color:'#000',
    },
    closeButton: {
        backgroundColor: '#F5802C',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        color:'#000',
    },
    closeButtonText: {
        fontFamily: 'Montserrat-Bold',
        color: '#000',
        fontSize: 16,
    },
});


export default MyJobsScreen;



