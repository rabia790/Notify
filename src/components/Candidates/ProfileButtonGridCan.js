import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import ProfileButton from '../EmployeeComponents/ProfileButton';
import Profile from '../../../assets/images/profilepic.png';
import JobDetails from '../../../assets/images/currento.png';
import MyJobs from '../../../assets/images/myjobss.png';
import Vacation from '../../../assets/images/news.png';




const { width, height } = Dimensions.get('window');


const ProfileButtonGridCan = ({ onProfilePress, onOpeningsPress, OnMyJobsPress, onContactPress }) => {
  return (
    <View style={styles.buttonGrid}>
      <View style={styles.buttonRow}>
        <ProfileButton
          text="Profile  Details"
          imageSource={Profile}
          onPress={onProfilePress}
          containerStyle={styles.buttonItem}
        />
        <ProfileButton
          text="Job Openings"
          imageSource={JobDetails}
          onPress={onOpeningsPress}
          containerStyle={styles.buttonItem}
        />
      </View>
      <View style={styles.buttonRow}>
        <ProfileButton
          text="My Jobs"
          imageSource={MyJobs}
          onPress={OnMyJobsPress}
          containerStyle={styles.buttonItem}
        />
        <ProfileButton
          text="Latest Updates     "
          imageSource={Vacation}
          onPress={onContactPress}
          containerStyle={styles.buttonItem}
        />
      </View>
     
    </View>
  );
};


const styles = StyleSheet.create({
  buttonGrid: {
    flex: 1,  // Take up the full height
    marginTop: height * 0.04,
    marginBottom: height * 0.001,


  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: height * 0.02,  // Adjust vertical spacing between rows
  },
  buttonItem: {
    width: '50%', // Each button takes exactly half of the row
    height: height * 0.15, // Adjust button height as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default ProfileButtonGridCan;





