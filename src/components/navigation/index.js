import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../../screens/SignInScreen";
import SignUpScreen from "../../screens/SignUpScreen";
import ConfirmEmailScreen from "../../screens/ConfirmEmailScreen";
import ForgotPasswordScreen from "../../screens/ForgotPasswordScreen";
import NewPasswordScreen from "../../screens/NewPasswordScreen";
import HomeScreen from "../../screens/HomeScreen";
import ProfileDetailsScreen from "../../screens/ProfileDetailsScreen";
import Contact from "../../screens/Contact";
import { retrieveToken, retrieveUserInfo } from '../../api/tokenManager';
import { useAuth } from "../libraries/AuthContext";
import { checkEmailExists } from "../../api/dynamicsCRM";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { isAuthenticated, handleAuthChange } = useAuth();
  const [loading, setLoading] = useState(true);

 

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Retrieve the token
        const token = await retrieveToken();
        
        if (!token) {
          // No token found
          handleAuthChange(false);
          return;
        }
  
        // Retrieve user info
        const info = await retrieveUserInfo();
        
        if (!info || Object.keys(info).length === 0) {
          // Info is either null, empty, or invalid
          handleAuthChange(false);
          return;
        }
  
        const email = info.cygni_emailaddress;
  
        // Check if email exists
        const emailExists = await checkEmailExists(email, token);
  
        if (Array.isArray(emailExists) && emailExists.length > 0) {
          // Email exists and the array is not empty
          handleAuthChange(true, info);
        } else {
          // Handle the case where the email does not exist
          handleAuthChange(false);
        }
      } catch (error) {
        // Log and handle errors
        console.error('Error checking authentication status:', error);
        handleAuthChange(false);
      } finally {
        // Set loading state to false
        setLoading(false);
      }
    };
  
    checkAuthStatus();
  }, [handleAuthChange]);
  
  
  
  if (loading) {
    return null; // Or a loading spinner
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
            />
            <Stack.Screen
              name="ProfileDetails"
              component={ProfileDetailsScreen}
              options={{ title: 'Profile Details' }}
            />
            <Stack.Screen
              name="Contact"
              component={Contact}
              options={{ title: 'Contact Us' }}
            />
          </>
        ) : (
          <>
          
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{ title: 'Sign In' }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{ title: 'Sign Up' }}
            />
            <Stack.Screen
              name="ConfirmEmail"
              component={ConfirmEmailScreen}
              options={{ title: 'Confirm Email' }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
              options={{ title: 'Forgot Password' }}
            />
            <Stack.Screen
              name="NewPassword"
              component={NewPasswordScreen}
              options={{ title: 'New Password' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
