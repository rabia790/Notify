import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { fetchJobStatus } from '../../api/GenrealCRM';


const JobDetailsModal = ({
    selectedJob,
    visible,
    onClose,
    JobTypeMapping,
    RemoteMapping,
    stripHtmlTags,
    handleApplyJob,
    appliedJobs,
    candidate,
}) => {
    if (!selectedJob || !visible) return null;


    const isApplied = appliedJobs.includes(`cygni_currentopenings(${selectedJob.cygni_currentopeningid})`);

    const handleApplyClick = async () => {
        if (!selectedJob) {
            console.error("No selected job found.");
            return;
        }
       
        try {
            await handleApplyJob(selectedJob);
            onClose(); 
        } catch (error) {
            console.error("Error applying for job:", error);
            setButtonDisabled(false);
        }
        setButtonDisabled(true);
    };
     const [isButtonDisabled, setButtonDisabled] = useState(false);
            const [jobStatus, setJobStatus] = useState('');
   
            useEffect(() => {
                const getJobStatus = async () => {
                    try {
                        const statuses = await fetchJobStatus(candidate.cygni_candidatesid);
                        if (statuses && statuses.length > 0) {
                            const jobStatus = statuses.find(status => status._cr7e9_jobapplied_value === selectedJob.cygni_currentopeningid);
                           
                            if (jobStatus) {
                                setJobStatus(statusMapping[jobStatus.cr7e9_status] || 'Unknown Status');
                            } else {
                                setJobStatus('Not Applied Yet');
                            }
                        } else {
                            setJobStatus('No Active Status');
                        }
                    } catch (error) {
                        setJobStatus('Error fetching status');
                    }
                };
            
                if (selectedJob && candidate) {
                    getJobStatus();
                }
            }, [selectedJob, candidate]);
            

    const statusMapping = {
        770030000: 'Applied',  // Example of mapping status '777' to 'Interview Scheduled'
        770030001: 'Waiting for Interview',    
        770030002: 'Interview Scheduled',
        770030003: 'Rejected',
        770030004: 'Hired',
        770030005: 'On hold',
        770030006: 'Candidate Declined'
        }


    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    {/* Close Button */}
                    <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
                        <Text style={{ fontSize: 18, fontFamily: 'Montserrat-Bold', color: '#000' }}>X</Text>
                    </TouchableOpacity>


                    <ScrollView contentContainerStyle={styles.modalContent} showsVerticalScrollIndicator={false}>
                        <View style={styles.fullJobCard}>
                            <Text style={styles.fullJobTitle}>{selectedJob.cygni_name}</Text>
                            <Text style={styles.fullJobDescription}>
                                {stripHtmlTags(selectedJob.cr7e9_description)}
                            </Text>
                            <Text style={styles.fullJobLocation}>{selectedJob.cr7e9_location}</Text>
                            <Text style={styles.fullJobType}>Job Type: {JobTypeMapping[selectedJob.cygni_jobtype]}</Text>
                            <Text style={styles.fullJobType}>Remote: {RemoteMapping[selectedJob.cygni_remote]}</Text>


                            {isApplied ? (
                   
                    <Text style={styles.appliedText}>{jobStatus}</Text> // Display applied text
                ) : (
                    <TouchableOpacity
                        style={[styles.applyButton, isButtonDisabled && styles.buttonDisabled]} // Apply disabled style if button is disabled
                        onPress={handleApplyClick} // Use handleApply instead of onApply
                        disabled={isButtonDisabled} // Disable button if state is true
                    >
                        <Text style={styles.applyButtonText}>Apply</Text>
                    </TouchableOpacity>
                )}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add semi-transparent background
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        zIndex: 1, // Ensure this modal is behind others
      },
    closeIcon: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 10,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 10,
        elevation: 5,
    },
    modalContent: {
        flexGrow: 1,
        padding: 20,
    },
    fullJobCard: {
        flex: 1, // This makes the card take up the available space
        backgroundColor: '#FFFCFC',
        borderRadius: 10,
        padding: 20,
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
        color: '#000',
        marginLeft: 20,
    },
    fullJobDescription: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
        marginBottom: 10,
        color: '#000',
    },
    fullJobLocation: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        marginBottom: 20,
        color: '#000',
    },
    fullJobType: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        marginBottom: 20,
        color: '#000',
    },
    applyButton: {
        backgroundColor: '#F5802C',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    applyButtonText: {
        fontFamily: 'Montserrat-Bold',
        color: '#000',
        fontSize: 16,
    },
    appliedText: {
        fontFamily: 'Montserrat-Bold',
        color: '#28A745', // Green color for "Applied"
        fontSize: 18, // Increased font size for visibility
        textAlign: 'center',
        backgroundColor: '#DFF2BF', // Light green background for contrast
        padding: 10, // Add some padding for better spacing
        borderRadius: 5, // Rounded corners
    },
});


export default JobDetailsModal;





