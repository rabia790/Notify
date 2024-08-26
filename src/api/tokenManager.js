import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Store the access token securely
export const storeToken = async (token) => {
    try {
      await Keychain.setGenericPassword('username', token);
      console.log('Token stored successfully');
      return token;
    } catch (error) {
      console.error('Error storing token:', error);
    }
  };
// Retrieve the access token
export const retrieveToken = async () => {
  const credentials = await Keychain.getGenericPassword();
  return credentials ? credentials.password : null;
};





// Delete the access token
export const deleteToken = async () => {
  await Keychain.resetGenericPassword();
};


// Store User Info
export const storeUserInfo = async (userInfo) => {
    try {
        await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        return userInfo;
    } catch (error) {
        console.error('Error storing user info:', error);
    }
};

// Retrieve User Info
export const retrieveUserInfo = async () => {
    try {
        const userInfo = await AsyncStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo) : null;
    } catch (error) {
        console.error('Error retrieving user info:', error);
    }
};


export const clearStorage = async () => {
  await AsyncStorage.clear();
  console.log("Storage cleared");
};
