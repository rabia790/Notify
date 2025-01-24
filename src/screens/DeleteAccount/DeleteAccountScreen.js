import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import HeaderWithBackButton from '../../components/HeaderWithBackButton';

const { width, height } = Dimensions.get('window');

const DeleteAccountScreen = ({route}) => {
  const navigation = useNavigation(); // Initialize navigation
  
  const { candidate } = route.params;


  const handleDelete = () => {
    // Add your delete logic here
    navigation.navigate("RewritePassword", {candidate});
  };

  const handleCancel = () => {
    // Navigate back to the previous screen
    navigation.goBack();
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
   
      <View style={styles.root}>
        <HeaderWithBackButton showTitle={true} title="Delete Account" />
        <View style={styles.spacer} />
        
        <View style={styles.imageContainer}>
          {/* Optional: Add an image or illustration */}
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.confirmationTextHead}>
            Are you sure you want to delete this account?
          </Text>
          
          <Text style={styles.confirmationText}>
            Deleting this account will permanently remove all your data, including personal information and settings.
            {'\n'}{'\n'}
            This process is irreversible, and you will lose access to all associated services and features.
            {'\n'}{'\n'}
            If you have any doubts, consider contacting support for assistance.
            {'\n'}{'\n'}
            Please confirm your choice to proceed with the deletion.
          </Text>
          
          <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
              <Text style={styles.buttonText}>Delete Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
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
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20, // Ensure some padding at the bottom to avoid content getting cut off
  },
  spacer: {
    height: height * 0.05,
  },
  scrollContainer: {
    flexGrow: 1,

  },
  imageContainer: {
    position: 'absolute', // This allows the image to overlap other elements
    top: height * 0.1, // Position it above the content container
    left: (width / 2) - 60, // Center the image horizontally (adjust 60 based on image size)
    zIndex: 10, // Ensure the image stays on top
  },
  contentContainer: {
    flex: 1,
    paddingTop: height * 0.12, // Add padding to make space for the profile image
    backgroundColor: '#1E1E20',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20, // Added padding for better spacing
  },
  confirmationText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  confirmationTextHead: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginTop: 'auto', 
  paddingBottom: 20, 
    
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#F5802C',
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
    marginTop:10,
    width: '100%', // Full width
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%', // Full width
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DeleteAccountScreen;
