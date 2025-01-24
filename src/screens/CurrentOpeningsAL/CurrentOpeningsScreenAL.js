import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, ScrollView, Modal, Text, Button, TouchableOpacity } from 'react-native';
import HeaderWithBackButton from '../../components/HeaderWithBackButton';
import { fetchJobOpenings, fetchAppliedJobsFromCRM, applyForJob } from '../../api/GenrealCRM'; // Import the fetch function
import { useModal } from '../../components/libraries/ModalContext';
import JobList from '../../components/Candidates/JobList';
import JobDetailsModal from '../../components/Candidates/JobDetailsModal';
import ResumeModal from '../../components/Candidates/ResumeModal';


const { width, height } = Dimensions.get('window');


const CurrentOpeningsScreenAL = ({ route, navigation }) => {
    const [jobOpenings, setJobOpenings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);
    const [appliedJobs, setAppliedJobs] = useState([]);
    const { showModal } = useModal();
    const [showResumeModal, setShowResumeModal] = useState(false); // State for resume modal
    const { candidate } = route.params;
    const [modalVisible, setModalVisible] = useState(false);    




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
        setModalVisible(true); 
   
    };


    const handleApplyJob = async (job) => {
       
   
        if (appliedJobs.includes(`cygni_currentopenings(${job.cygni_currentopeningid})`)) {
            showModal({
                heading: 'Info',
                message: 'You have already applied for this job.',
            });
            return;
        }
        setSelectedJob(job);  
      
    // Delay the modal opening until the state update is complete
    setTimeout(() => {
        setShowResumeModal(true);
    }, 30); 
     
     


    };
   

   
    const uploadResumeAndApply = async () => {
        if (!selectedJob) {
            console.error("No job selected for application");
            return;
        }
   


        const candidateId = candidate.cygni_candidatesid;
        const openingId = selectedJob.cygni_currentopeningid;
        try {
                await applyForJob(candidateId, openingId);
                setAppliedJobs((prev) => [...prev, openingId]); // Update applied jobs
                setShowResumeModal(false); // Hide the modal
                showModal({
                    heading: 'Success',
                    message: 'Application Submitted Successfully!',
                });
                navigation.navigate('HomeScreen');
           
        } catch (error) {
            showModal({
                heading: 'Error',
                message: 'Failed!',
            });
        }
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


    return (
        <View style={styles.root}>
        <HeaderWithBackButton />
        <ScrollView contentContainerStyle={styles.scrollView}>
            <JobList
                jobOpenings={jobOpenings}
                appliedJobs={appliedJobs}
                loading={loading}
                error={error}
                handleCardClick={handleCardClick}
                handleApplyJob={handleApplyJob}
                candidate ={candidate}
            />
        </ScrollView>
        <ResumeModal
                showResumeModal={showResumeModal}
                setShowResumeModal={setShowResumeModal}
                candidate={candidate}
                uploadResumeAndApply={uploadResumeAndApply}
                jobOpenings={jobOpenings}
                selectedJob={selectedJob || {}}  // Ensure it's an object, even if it's null
                onClose={() => {
                    setShowResumeModal(false);
                }}
               
            />
       
        <JobDetailsModal
           jobOpenings={jobOpenings}
            selectedJob={selectedJob}
            visible={modalVisible}
            onClose={() => {
                setModalVisible(false); 
             }}
            JobTypeMapping={JobTypeMapping}
            RemoteMapping={RemoteMapping}
            stripHtmlTags={stripHtmlTags}
            handleApplyJob={handleApplyJob}
            handleCardClick={handleCardClick}
            appliedJobs={appliedJobs}
            candidate ={candidate}
        />
    </View>
    );
};


const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F5802C',
    },
    scrollView: {
        flexGrow: 1,
        padding: width * 0.01,
        backgroundColor: '#1E1E20',
        borderTopLeftRadius: 200,
    },
});


export default CurrentOpeningsScreenAL;





