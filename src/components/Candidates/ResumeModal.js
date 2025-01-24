import React from 'react';
import { Modal, View, Text, Button, StyleSheet, Image, TouchableOpacity} from 'react-native';
import ProfileUploadTab from '../libraries/ProfileUploadTab';
import Logo from '../../../assets/images/unnamed.png';


const ResumeModal = ({
    showResumeModal,
    setShowResumeModal,
    candidate,
    uploadResumeAndApply,
    selectedJob,
    onClose,
    progress = 70
  }) => {
    if (!showResumeModal || !selectedJob || selectedJob === false) return null;
 
    const handleResumeUpload = () => {
      if (!selectedJob) {
        console.error('No job selected for application');
        return;
      }
      uploadResumeAndApply();
    };
 
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showResumeModal}
        onRequestClose={() => {
          setShowResumeModal(false);
          onClose();
        }}
      >
        <View style={styles.modalContainer}>
          {/* Cancel Button */}
          <View style={styles.cancelButtonContainer}>


            <TouchableOpacity style={styles.button}  onPress={() => {
                setShowResumeModal(false);
                onClose();
              }}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
           
          </View>
 
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image source={Logo} style={styles.logo} resizeMode="contain" />
            </View>
            <View style={styles.jobInfo}>
              <Text style={styles.jobName}>{selectedJob.cygni_name}</Text>
              <Text style={styles.companyName}>CygniSoft Inc.</Text>
              <Text style={styles.location}>{selectedJob.cr7e9_location}</Text>
            </View>
          </View>
 
          {/* Progress Bar Section */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[styles.progressFill, { width: `${progress}%` }]}
              />
            </View>
            <Text style={styles.progressPercentage}></Text>
          </View>
 
          <Text style={styles.resumePrompt}>Add your resume for the employer. Please upload a PDF file.</Text>
          <ProfileUploadTab candidate={candidate} />
 
          <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonS}  onPress={handleResumeUpload}>
                    <Text style={styles.buttonText}>Continue</Text>
                  </TouchableOpacity>
         
          </View>
        </View>
      </Modal>
    );
  };
 
  const styles = StyleSheet.create({
    buttonS: {
        backgroundColor: '#F5802C', // Orange color for the button
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        elevation: 5, // Add shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        alignItems: 'center',
      },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      marginTop: '5%',
    },
    cancelButtonContainer: {
      position: 'absolute',
      top: 0,
      right: 20,
      zIndex: 1, // Ensure the cancel button stays above other elements
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: 15,
      borderRadius: 10,
      marginBottom: 20,
      width: '100%',
      marginTop:20,
    },
    logoContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: 50,
      height: 50,
    },
    jobInfo: {
      flex: 3,
      justifyContent: 'center',
    },
    jobName: {
      fontSize: 18,
      fontFamily: 'Montserrat-Bold',
      color: '#000',
    },
    companyName: {
      fontSize: 14,
      fontFamily: 'Montserrat-Regular',
      color: '#000',
    },
    location: {
      fontSize: 12,
      fontFamily: 'Montserrat-Regular',
      color: '#888',
    },
    resumePrompt: {
      fontSize: 16,
      fontFamily: 'Montserrat-Regular',
      color: '#000',
      marginBottom: 20,
    },
    buttonContainer: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems:'center'
    },
    progressContainer: {
      marginVertical: 20,
      width: '100%',
      alignItems: 'center',
    },
    progressBar: {
      width: '80%',
      height: 10,
      backgroundColor: '#E0E0E0',
      borderRadius: 5,
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#F5802C',
      borderRadius: 5,
    },
    progressPercentage: {
      fontSize: 16,
      color: '#000',
      fontFamily: 'Montserrat-Regular',
      marginTop: 5,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
      },
      buttonText: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'Montserrat-Bold', // You can change the font if you want
        textAlign: 'center',
      },
  });
 
  export default ResumeModal;





