import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView, Dimensions } from 'react-native';
import CustomButton from '../CustomButton';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import HeaderWithoutBackButton from '../HeaderWithoutBackButton';
import { updateProfilePictureURL, getCandidateProfile} from '../../api/dynamicsCRM';
import { getToken } from '../../api/auth';
import { useNavigation } from '@react-navigation/native';
import NoDataMessage from '../libraries/NoDataMessage';
import useFetchCandidateProfile from '../../hooks/useFetchProfile';
import { useModal } from '../libraries/ModalContext';
import { uploadImageToSharePoint } from '../../api/sharepoint';

const defaultProfilePicture = require('../../../assets/images/profile.png');

const { width, height } = Dimensions.get('window');

const clientId = 'e6af3ca0-2d80-4bec-9797-f20f3d63c17a';
const tenantId = 'c2883102-3f8d-4e6f-b65a-df3518b3b0f3';
const clientSecret = 'i3L8Q~1bfRsN8_5xVXLllm4z1TlNLdSHi3su9ady';

const CandidateDetails = ({ candidate, onLogout, onUpdatePressed, email }) => {
  
    const navigation = useNavigation(); 
    const { showModal } = useModal();

    const { profilePicture: fetchedProfilePicture, status, loading, error } = useFetchCandidateProfile(email);
    

    // Initialize the profile picture state
    const [profilePicture, setProfilePicture] = useState(defaultProfilePicture);

    useEffect(() => {
      if (fetchedProfilePicture) {
        setProfilePicture(fetchedProfilePicture);
      }
    }, [fetchedProfilePicture]);


    const contactPressed = () => {
      navigation.navigate('Contact');
    };
  
    if (loading) {
      return <Text>Loading...</Text>;
    }
  
    if (error) {
      return <Text>Error: {error}</Text>;
    }
  
    

    
  if (!candidate) {
    return <NoDataMessage message="No candidates available for this email" />;
  }

  const handleImagePicker = () => {
    showModal({
      heading: 'Select Image Source',
      message: 'Choose an option to select your profile picture:',
      primaryButtonText: 'Camera',
      onPrimaryButtonPress: openCamera,
      secondaryButtonText: 'Gallery',
      onSecondaryButtonPress: openGallery,
  
    });
  };

  const openCamera = () => {
    const options = { mediaType: 'photo', quality: 1 };
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
        showModal({
          heading: 'Error',
          message: 'Failed to open camera. Please try again.'
      
        });
      } else {
        const { uri } = response.assets[0];
        setProfilePicture({ uri });
        updateProfilePictureInCRM(uri);
      }
    });
  };

  const openGallery = () => {
    const options = { mediaType: 'photo', quality: 1 };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
        showModal({
          heading: 'Error',
          message: 'Failed to open gallery. Please try again.'
      
        });
      } else {
        const { uri } = response.assets[0];
        setProfilePicture({ uri });
        updateProfilePictureInCRM(uri);
      }
    });
  };

  const updateProfilePictureInCRM = async (uri) => {

    const accessToken = await getToken(clientId, tenantId, clientSecret);
    updateProfilePictureURL(accessToken, candidate.cygni_emailaddress)
      .then((data) => {
        showModal({
          heading: 'Success',
          message: 'Profile picture updated successfully.'
      
        });
      })
      .catch((error) => {
        console.error('Error updating profile picture URL:', error);
        showModal({
          heading: 'Error',
          message: 'Failed to update profile picture. Please try again.'
      
        });
      });
  };





  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <HeaderWithoutBackButton />
        <View style={styles.spacer} />
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>My Cygni</Text>
            <View style={styles.profileContainer}>
              <TouchableOpacity onPress={handleImagePicker}>
              <Image
                  source={profilePicture}
                  style={styles.profilePicture}
                  onError={() => setProfilePicture(defaultProfilePicture)}
                  resizeMode="cover"
                  accessibilityLabel="Profile picture" 
                />
              </TouchableOpacity>
          
            </View>
           
          </View>
        
          <View style={styles.detailBloc}>
  <Text style={styles.detailText}>{status}</Text>
</View>
         
          <View style={styles.buttonContainer}>
            <Text style={styles.textStyle}>Personal Details Section</Text>
            <CustomButton text="Click to View/Edit Details" onPress={onUpdatePressed} type="TERTIARY" style={styles.button} />
          </View>
          <View style={styles.buttonContainer}>
         <CustomButton text="Connect with Us" onPress={contactPressed} type="PRIMARY"  />
         <CustomButton text="Logout" onPress={onLogout} style={styles.signout} type="SECONDARY" />
 
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
    padding: width * 0.05,
    backgroundColor: '#1E1E20', 
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
    color: '#FFFF',
  },
  textStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: width * 0.05,
    color: '#FFFF',
    textAlign: 'center',
  },
  
  
  profileContainer: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: width * 0.125,
    overflow: 'hidden',
    backgroundColor: 'lightgray',
    marginTop: height * 0.015,
    position: 'relative',
  },
  profilePicture: {
    width: '100%',
    height: '100%',
    borderRadius: width * 0.125,
    resizeMode: 'cover',
  },
  logoutButton: {
    position: 'absolute',
    right: 10, // Adjust based on your layout needs
    top: width * 0.08,   // Adjust based on your layout needs
    padding: 5,
    borderRadius: 5,
  
  },
  signout: {
    // Ensure the CustomButton styles match or adjust as needed
    backgroundColor: '#F5802C', // Example color
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  
  noDataText: {
    fontSize: width * 0.04,
    color: 'gray',
    textAlign: 'center',
  },
  button: {
    marginVertical: height * 0.015,
    borderRadius: 25,
    paddingVertical: height * 0.015,
  },
  buttonContainer: {
    marginTop: height * 0.1,
  },
  detailBloc: {
    marginBottom: height * 0.01,
    paddingHorizontal: width * 0.03, // Decrease padding to reduce width
    paddingVertical: height * 0.015,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignSelf: 'center', // Center the block horizontally
    width: width * 0.5, 
    alignItems:'center',
  },
  detailText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: width * 0.04,
    color: '#333',
  },
});

export default CandidateDetails;
