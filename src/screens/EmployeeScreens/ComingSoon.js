import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import HeaderWithBackButton from '../../components/HeaderWithBackButton';

const { width, height } = Dimensions.get('window');

const ComingSoonScreen = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <HeaderWithBackButton showTitle={true} title="Coming Soon" />
        <View style={styles.contentContainer}>
          <Text style={styles.comingSoonText}>Coming Soon</Text>
          <Text style={styles.bugText}>We're working on this feature!</Text>
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
  contentContainer: {
    flex: 1,
    paddingTop: height * 0.25, // Adjust to position the text appropriately
    backgroundColor: '#1E1E20',
    borderTopLeftRadius: 200,
    alignItems: 'center', // Center the text horizontally
    justifyContent: 'center', // Center the text vertically
  },
  comingSoonText: {
    color: 'white',
    fontSize: 36,
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  bugText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
  },
});

export default ComingSoonScreen;