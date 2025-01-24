import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, TouchableOpacity, Linking } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { getToken } from '../../api/auth';
import axios from 'axios';
import RNFS from 'react-native-fs';
import { WebView } from 'react-native-webview'; // For other formats
import PDFView from 'react-native-pdf'; // For PDF preview


const baseURL = 'https://cygnisoft.crm3.dynamics.com/api/data/v9.1/annotations';
const baseURL1 = 'https://cygnisoft.crm3.dynamics.com/api/data/v9.1';


const ProfileUploadTab = ({ candidate }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewUri, setPreviewUri] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);



  const pickFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });


      const destPath = `${RNFS.DocumentDirectoryPath}/${res.name}`;
      let uri;


      if (res.uri.startsWith('content://')) {
        await RNFS.copyFile(res.uri, destPath);
        uri = `file://${destPath}`;
      } else {
        uri = res.uri;
      }


      const selectedFile = {
        name: res.name,
        size: res.size,
        uri,
        type: res.type,
      };


      setFile(selectedFile);
      console.log(selectedFile);
      setPreviewUri(selectedFile.uri); // Set the URI for preview
      console.log('File URI:', uri);
      console.log('File type:', selectedFile.type);
      console.log('Preview URI:', selectedFile.uri); // Check if it's set properly


      // Automatically call uploadFile after selecting a file
      uploadFile(selectedFile);


    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the file picker');
      } else {
        console.error('Unknown error:', err);
      }
    }
  };


  const convertToBase64 = async (uri) => {
    try {
      return await RNFS.readFile(uri, 'base64');
    } catch (error) {
      console.error('Error converting file to Base64:', error);
      throw error;
    }
  };


  const uploadFile = async (selectedFile) => {
    if (!selectedFile) {
      Alert.alert('Error', 'Please select a file first.');
      return;
    }


    if (!candidate || !candidate.cygni_candidatesid) {
      Alert.alert('Error', 'Candidate ID is missing.');
      return;
    }


    try {
      setLoading(true);
      const accessToken = await getToken();
      const base64File = await convertToBase64(selectedFile.uri);
      const annotationPayload = {
        subject: "Resume Upload",
        filename: selectedFile.name,
        documentbody: base64File,
        mimetype: selectedFile.type || 'application/octet-stream',
        "objectid_cygni_candidates@odata.bind": `/cygni_candidateses(${candidate.cygni_candidatesid})`,
      };


      const annotationResponse = await axios.post(baseURL, annotationPayload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });


      Alert.alert('Success', 'Resume uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error.response?.data || error.message);
      Alert.alert('Error', 'Failed to upload file. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (previewUri) {
      console.log('Updated Preview URI:', previewUri); // Log the updated preview URI
    }
  }, [previewUri]);


  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickFile}>
        <Text style={styles.buttonText}>Select Your Resume</Text>
      </TouchableOpacity>


      {file && (
        <Text style={styles.fileDetails}>
          File: {file.name} | Size: {file.size} bytes
        </Text>
      )}


      {loading && <Text>Uploading...</Text>}




      {previewUri && (
        <>
          {file?.type?.includes('pdf') ? (
            <PDFView
              source={{ uri: previewUri, cache: true }}
              style={styles.pdfPreview}
              onLoad={() => console.log('PDF loaded successfully')}
              onError={(error) => {
                console.error('Error loading PDF: ', error);
                Alert.alert('Error', 'Failed to load PDF');
              }}
            />
          ) : (
            <WebView
              source={{ uri: previewUri }}
              style={styles.webViewPreview}
              onLoad={() => console.log('WebView loaded successfully')}
              onError={(error) => {
                console.error('Error loading WebView: ', error);
                Alert.alert('Error', 'Failed to load file preview');
              }}
            />
          )}
        </>
      )}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
  },
  fileDetails: {
    marginVertical: 10,
    fontSize: 16,
    fontFamily:'Montserrat-Regular',
    color:'#000',
  },
  button: {
    backgroundColor: '#F5802C', // Orange color for the button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 5, // Add shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold', // You can change the font if you want
    textAlign: 'center',
  },
  pdfPreview: {
    height: 400,
    width: '100%',
  },
  webViewPreview: {
    height: 400,
    width: '100%',
  },
});


export default ProfileUploadTab;





