import React from 'react';
import { Text, StyleSheet, SafeAreaView, NativeModules } from 'react-native';
import { AuthProvider } from './src/components/libraries/AuthContext';
import { ModalProvider } from './src/components/libraries/ModalContext';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigation from './src/components/navigation';
console.log("Available Native Modules:", NativeModules);
export default function App() {
return (
<GestureHandlerRootView style={styles.root}>
<SafeAreaView style={styles.safeArea}>
<AuthProvider>
<ModalProvider>
<Navigation/>
</ModalProvider>
</AuthProvider>
</SafeAreaView>
</GestureHandlerRootView>
);
}




const styles = StyleSheet.create({
safeArea: {
flex: 1,
backgroundColor: '#FFF', // Updated from 'backfaceVisibility' to 'backgroundColor'
},
root: {
flex: 1,
},
});













