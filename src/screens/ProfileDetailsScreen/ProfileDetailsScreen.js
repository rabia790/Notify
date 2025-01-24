import React, { useState } from 'react';
import { View,StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import ProfileDetailsForm from '../../components/libraries/ProfileDetailsForm';
import { updateCandidateDetails } from '../../api/dynamicsCRM';
import { getToken } from '../../api/auth';
import { useModal } from '../../components/libraries/ModalContext';


const ProfileDetailsScreen = ({ route, navigation, clientId, tenantId, clientSecret }) => {
    const [loading, setLoading] = useState(false);
    const { candidate } = route.params;
    const { showModal } = useModal();


    const handleSave = async (details) => {
        console.log('Profile saved:', details);
        setLoading(true);
        try {
            const accessToken = await getToken(clientId, tenantId, clientSecret);


            const {
                firstname,
                lastname,
                address,
                email,
                phone,
                workauth,
                password,
                dob,
                additional,
                auth,
                usVisa,
                lift,
                crime,
                glicense,
                shiftprefered,
                azdz ,
                resumeBase64,
                resumeName,
                education,
                infoadditional,
                expwork,
                prof,
            } = details;


            const newCandidateData = {
                cygni_firstname: firstname,
                cygni_lastname: lastname,
                cygni_homeaddress: address,
                cygni_emailaddress: email,
                cygni_phonenumber: phone,
                cygni_currentworkauthorization: workauth,
                cygni_pwd: password,
                cygni_birthday: dob.toISOString(),
                cygni_notes: additional,
                cygni_authorizetoworkincanada: auth,
                cygni_usvisa: usVisa,
                cygni_lbslift: lift,
                cygni_criminalconvictions: crime,
                cygni_glicense: glicense,
                cygni_shift: shiftprefered,
                cygni_dzorazlicense: azdz,
                cygni_resume: resumeBase64,
                cygni_resume_name: resumeName,
                cygni_educationalbackground: education,
                cygni_additionalinformation: infoadditional,
                cygni_workexperience: expwork,
                cygni_technicalproficiencies: prof,
            };


            console.log('Updating candidate with data:', newCandidateData);
            const response = await updateCandidateDetails(accessToken, email, newCandidateData);
         
           showModal({
            heading: 'Success',
            message: 'Successfully Updated!',
       
        });
            navigation.navigate('HomeScreen', { updatedCandidate: newCandidateData });


        } catch (error) {
            if (error.message === 'Candidate not found.') {
                showModal({
                    heading: 'Error',
                    message: 'A candidate with this email not found.',
               
                });
            } else {
                console.error('Error handling password action:', error);
                showModal({
                    heading: 'Error',
                    message: 'An error occurred. Please try again.',
               
                });
            }
        } finally {
            setLoading(false);
        }
    };






    return (
        <View
       
        style={styles.background}
    >
       
       
            <ProfileDetailsForm candidate={candidate} onSave={handleSave} />
     
    </View>
    );
};


const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        backgroundColor:'#A4683F'
    },
   
    text: {
        marginTop: 10,
        fontSize: 18,
        color: '#333',
    },
});




export default ProfileDetailsScreen;





