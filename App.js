import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';

import Navigation from './src/components/navigation';


export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.root}>
        <Navigation />  
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backfaceVisibility:"white",
  },
  root: {
    margin:20 ,
    flex: 1,
    backgroundColor: '#FFF',
  },
});
