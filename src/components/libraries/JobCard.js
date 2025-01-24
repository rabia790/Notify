    // JobCard.js


    import React, {useState, useEffect} from 'react';
    import { StyleSheet,View, Text, TouchableOpacity} from 'react-native';
    import { fetchJobStatus } from '../../api/GenrealCRM';




    const JobCard = ({ job,candidate, onClick, onApply, isApplied, }) => {


        const [isButtonDisabled, setButtonDisabled] = useState(false);
        const [jobStatus, setJobStatus] = useState('');


        useEffect(() => {
            const getJobStatus = async () => {
                try {
                    const statuses = await fetchJobStatus(candidate.cygni_candidatesid); // Pass the candidate ID if needed
             
                    // Filter the statuses based on the current job's ID
                 
                    if (statuses && statuses.length > 0) {
                        // Find the status for the specific job ID
                        const jobStatus = statuses.find(status => status._cr7e9_jobapplied_value === job.cygni_currentopeningid);
                        if (jobStatus) {
                            setJobStatus(jobStatus);
                        } else {
                            setJobStatus('No Active Status');
                        }
                    } else {
                        setJobStatus('No Active Status');
                    }
                } catch (error) {
                    setJobStatus('Error fetching status');
                }
            };
       
            getJobStatus();
        }, );
   
       
        // Access the status code
       
        const statusMapping = {
            770030000: 'Applied',  // Example of mapping status '777' to 'Interview Scheduled'
            770030001: 'Waiting for Interview',    
            770030002: 'Interview Scheduled',
            770030003: 'Rejected',
            770030004: 'Hired',
            770030005: 'On hold',
            770030006: 'Candidate Declined'
            }
   
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






        const handleApply = async () => {
            // Disable the button immediately
            setButtonDisabled(true);
       
           
            try {
                // Call the onApply function (which should contain your backend logic)
                await onApply();
            } catch (error) {
                console.error('Error applying for job:', error);
                // You can re-enable the button here if needed
                setButtonDisabled(false);
            }
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


        const hasJobType = job.cygni_jobtype in JobTypeMapping;
        const hasRemoteType = job.cygni_remote in RemoteMapping;


        return (
            <TouchableOpacity
                style={[
                    styles.jobCard,
                    !hasJobType && styles.noBorder, // Apply noBorder style if job type does not exist
                ]}
                onPress={onClick}
            >    
           
                <Text style={styles.jobTitle}>{job.cygni_name}</Text>
                <Text style={styles.jobComp}>CygniSoft Inc.</Text>
                {/*<Text style={styles.jobDescription}>{truncateDescription(stripHtmlTags(job.cr7e9_description))}</Text> */}
                <Text style={styles.jobLocation}>{job.cr7e9_location}</Text>


                <View style={styles.jobTypeContainer}>
                {hasJobType && (
                        <>
                <Text style={styles.jobTypeLeft}><Text style={styles.jobTypeValue}>{JobTypeMapping[job.cygni_jobtype]}</Text>
                </Text>
                </>
                    )}


                    {hasRemoteType && (
                        <>
                <Text style={styles.jobTypeRight}> <Text style={styles.remoteValue}>{RemoteMapping[job.cygni_remote]}</Text>
                </Text>
                </>
                    )}


                </View>


            {/*


                {isApplied ? (
                   
                    <Text style={styles.appliedText}>{statusMapping[jobStatus.cr7e9_status]}</Text> // Display applied text
                ) : (
                    <TouchableOpacity
                        style={[styles.buttonCurrent, isButtonDisabled && styles.buttonDisabled]} // Apply disabled style if button is disabled
                        onPress={handleApply} // Use handleApply instead of onApply
                        disabled={isButtonDisabled} // Disable button if state is true
                    >
                        <Text style={styles.buttonText}>Apply</Text>
                    </TouchableOpacity>
                )}*/}
                <Text style={styles.jobCreated}>{timeAgo(job.createdon)}</Text>
            </TouchableOpacity>
        );
    };


    const styles = StyleSheet.create({
        jobCard: {
            backgroundColor: '#FFFCFC', // Set to white
            padding: 15, // Reduced padding for less height
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
        jobCreated: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 13,
            marginTop:10,
       
        },
        jobTitle: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 23,
            color: '#000',
            marginBottom: 15,
        },
        jobComp: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 14,
       
        },
        jobDescription: {
            fontFamily: 'Montserrat-Regular',
            fontSize: 16,
            color: '#000',
            marginVertical: 5,
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
        jobLocation: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 14,
            color: '#000',
            marginTop: 5,
        },
        buttonCurrent: {
            backgroundColor: '#F5802C', // Orange background
            borderRadius: 10,
            width: '90%',
            alignSelf: 'center',
            alignItems: 'center',
            paddingVertical: 12, // Increased vertical padding for a more substantial button
            marginTop: 5, // Slightly more space from the content above
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


    export default JobCard;





