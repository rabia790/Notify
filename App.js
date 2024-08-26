import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { AuthProvider } from './src/components/libraries/AuthContext';
import { ModalProvider } from './src/components/libraries/ModalContext';
import Navigation from './src/components/navigation';


export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.root}>
      <AuthProvider>
      <ModalProvider>
      <Navigation />
      </ModalProvider>
    </AuthProvider>
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
   
    flex: 1,
    backgroundColor: '#FFF',
  },
});
