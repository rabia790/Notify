// src/components/EmployeeComponents/ProfileButtonGrid.js
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import ProfileButton from './ProfileButton';
import Profile from '../../../assets/images/profilepic.png';
import JobDetails from '../../../assets/images/jobdetails.png';
import TimeSheet from '../../../assets/images/timesheet.png';
import Vacation from '../../../assets/images/vacation.png';
import Report from '../../../assets/images/report.png';

const { width, height } = Dimensions.get('window');

const ProfileButtonGrid = ({ onProfilePress, onJobDetailsPress, onTimeSheetPress, onVacationPress, onReportPress }) => {
  return (
    <View style={styles.buttonGrid}>
      <View style={styles.buttonItem}>
        <ProfileButton  
          text="My Profile"
          imageSource={Profile}
          onPress={onProfilePress}
        />
      </View>
      <View style={styles.buttonItem}>
        <ProfileButton
          text="Job Details"
          imageSource={JobDetails}
          onPress={onJobDetailsPress}
        />
      </View>
      <View style={styles.buttonItem}>
        <ProfileButton
          text="TimeSheet"
          imageSource={TimeSheet}
          onPress={onTimeSheetPress}
        />
      </View>
      <View style={styles.buttonItem}>
        <ProfileButton
          text="Vacation"
          imageSource={Vacation}
          onPress={onVacationPress}
        />
      </View>
      <View style={styles.buttonItem}>
        <ProfileButton
          text="Report Issue"
          imageSource={Report}
          onPress={onReportPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: height * 0.03,
    marginLeft: width * 0.05, // Shift the grid right
  },
  buttonItem: {
    width: (width - width * 0.2) / 2,
    marginBottom: height * 0.02,
  },
});

export default ProfileButtonGrid;
