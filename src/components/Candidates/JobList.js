import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import JobCard from '../libraries/JobCard';




const JobList = ({ jobOpenings, candidate, appliedJobs, loading, error, handleCardClick, handleApplyJob }) => {
const [sortedJobOpenings, setSortedJobOpenings] = useState([]);




useEffect(() => {
// Sort jobOpenings by creadon in descending order
const sortedJobs = [...jobOpenings].sort((a, b) => new Date(b.createdon) - new Date(a.createdon));
// Update state with sorted jobs
setSortedJobOpenings(sortedJobs);
// Log the names of sorted jobs to the console
const jobNames = sortedJobs.map(job => job.createdon);
}, [jobOpenings]);




if (loading) {
return <ActivityIndicator size="large" color="#0000ff" />;
}




if (error) {
return <Text style={styles.errorText}>{error}</Text>;
}




return (    
<View style={styles.container}>
{sortedJobOpenings.map((job, index) => (
<JobCard
key={index}
job={job}
onClick={() => handleCardClick(job)}
onApply={() => handleApplyJob(job)}
isApplied={appliedJobs.includes(`cygni_currentopenings(${job.cygni_currentopeningid})`)}
candidate={candidate}
/>
))}
</View>
);
};




const styles = StyleSheet.create({
container: {
padding: 20,
marginLeft: 13,
},
errorText: {
color: 'red',
textAlign: 'center',
marginTop: 20,
},
});




export default JobList;








 

