import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Text, TextInput, TouchableOpacity, Modal, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderWithBackButton from '../../components/HeaderWithBackButton';
import GreenTick from '../../../assets/images/green-tick.png'; // Ensure this path is correct
import { deactivateAccount } from '../../api/deleteCRMlogic';
import { useAuth } from '../../components/libraries/AuthContext';
import { deleteToken, retrieveUserInfo } from '../../api/tokenManager';
import { useModal } from '../../components/libraries/ModalContext';

const { width, height } = Dimensions.get('window');

const RewritePasswordScreen = ({route}) => {
  const navigation = useNavigation();
  const { handleAuthChange } = useAuth();
  const { candidate } = route.params;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const { showModal } = useModal();


const handleSubmit = async() => {
  if (password === confirmPassword) {
    // Compare with candidate's password
    if (password === candidate.cygni_pwd) {
      try {
        const response = await deactivateAccount(candidate.cygni_candidatesid);
        console.log('Account deactivation response:', response);
        setModalVisible(true);
      } catch (error) {
        console.error('Error deactivating account:', error);
        showModal({
          heading: 'Error',
          message: 'Error Deactivating your Account! Try again in some time.',  
      });
      }
    } else {
      console.log('Passwords do not match with candidate password');
      showModal({
        heading: 'Error',
        message: 'Passwords do not match with candidate password!',  
    });
    }
  } else {
    console.log('Passwords do not match');
    showModal({
      heading: 'Error',
      message: 'Passwords do not match!',
  });
  }
};

  const handleCloseModal = async() => {
    setModalVisible(false);
    await deleteToken();
    handleAuthChange(false);
    navigation.navigate('CandidateEmployee');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.root}>
        <HeaderWithBackButton showTitle={true} title="Confirm Deletion" />
        <View style={styles.spacer} />
        <View style={styles.contentContainer}>
          <View style={styles.containerinnr}>
          <Text style={styles.label}>Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter new password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Text style={styles.label}>Confirm Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm new password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>

          </View>
        </View>
      </View>

      {/* Full-Screen Success Modal */}
      <Modal
        transparent={false}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.fullScreenModal}>
          <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>
          <Image source={GreenTick} style={styles.tickImage} />
          <Text style={styles.modalText}>Your account has been successfully deleted.</Text>
          <TouchableOpacity style={styles.okButton} onPress={handleCloseModal}>
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>         
          </View>
      </Modal>
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
  },
  contentContainer: {
    flex: 1,
    paddingTop: height * 0.2,
    backgroundColor: '#1E1E20',
    borderTopLeftRadius: 20,
    marginTop: 30,
  },
  containerinnr:{
    margin:30,
  },
  label: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#2E2E2E',
    color: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: '#F5802C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#000',
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
  },
  fullScreenModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  closeButton: {
    position: 'absolute',
    top: 70,
    right: 30 ,
  },
  closeText: {
    fontSize: 30, // Increase font size for better visibility
    color: '#FFFFFF', // Text color
    textAlign: 'center', // Center the text
    fontWeight: 'bold', // Make the text bold
  },
  modalText: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  tickImage: {
    width: 100, // Adjust size as needed
    height: 100, // Adjust size as needed
    marginBottom: 20,
  },
  okButton: {
    backgroundColor: '#F5802C', // Use your app's primary color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  okButtonText: {
    color: '#000',
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
  },
});

export default RewritePasswordScreen;
