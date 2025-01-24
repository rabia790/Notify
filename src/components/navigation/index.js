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
import { checkEmailExistsEmployee } from "../../api/EmployeeCRM";
import { enableScreens } from "react-native-screens";
import CandidateEmployeeScreen from "../../screens/CandidateEmployee/CandidateEmployeeScreen";
import EmployeeSignInScreen from "../../screens/EmployeeScreens/EmployeeSignIn";
import EmployeeHomeScreen from "../../screens/EmployeeScreens/EmployeeHome/EmployeeHomeScreen";
import EmployeeProfileScreen from "../../screens/EmployeeScreens/EmployeeProfile/EmployeeProfileScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EmployeeJobDetailsScreen from "../../screens/EmployeeScreens/EmployeeJobDetails/EmployeeJobDetailsScreen";
//import PreviewScreen from "../../screens/EmployeeScreens/PreviewScreen";
import TimeSheetDetailsScreen from "../../screens/EmployeeScreens/TimeSheetDetails/TimeSheetDetailsScreen";
import CreateTimesheetScreen from "../../screens/EmployeeScreens/CreateTimeSheet/CreateTimesheetScreen";
import VacationDetailsScreen from "../../screens/EmployeeScreens/VacationDetails/VacationDetailsScreen";
import CreateVacationScreen from "../../screens/EmployeeScreens/CreateVacation/CreateVacationScreen";
import ReportDetailsScreen from "../../screens/EmployeeScreens/ReportDetails/ReportDetailsScreen";
import CreateReportIssueScreen from "../../screens/EmployeeScreens/CreateReportIssue/CreateReportIssueScreen";
import DeleteAccountScreen from "../../screens/DeleteAccount/DeleteAccountScreen";
import RewritePasswordScreen from "../../screens/RewritePassword/RewritePasswordScreen";
import CurrentOpeningsScreen from "../../screens/CurrentOpenings/CurrentOpeningsScreen";
import CurrentOpeningsScreenAL from "../../screens/CurrentOpeningsAL/CurrentOpeningsScreenAL";
import MyJobsScreen from "../../screens/MyJobs/MyJobsScreen";
import LatestUpdatesScreen from "../../screens/LatestUpdates/LatestUpdatesScreen";

enableScreens();


const Stack = createNativeStackNavigator();


const Navigation = () => {
const { isAuthenticated, handleAuthChange } = useAuth();
const [loading, setLoading] = useState(true);
const [initialState, setInitialState] = useState(undefined);


useEffect(() => {
const checkAuthStatus = async () => {
try {
const token = await retrieveToken();
if (!token) {
handleAuthChange(false);
return;
}


const info = await retrieveUserInfo();
if (!info || Object.keys(info).length === 0) {
handleAuthChange(false);
return;
}


const email = info.cygni_emailaddress;


const emailExistsInEmployees = await checkEmailExistsEmployee(email, token);
if (Array.isArray(emailExistsInEmployees) && emailExistsInEmployees.length > 0) {
    handleAuthChange(true, info);
    return;
}


const emailExistsInCandidates = await checkEmailExists(email, token);
if (Array.isArray(emailExistsInCandidates) && emailExistsInCandidates.length > 0) {
    handleAuthChange(true, info);
    return;
}




handleAuthChange(false);


} catch (error) {
console.error('Error checking authentication status:', error);
handleAuthChange(false);
} finally {
setLoading(false);
}
};


const getInitialState = async () => {
try {
const state = await AsyncStorage.getItem('navState');
return state ? JSON.parse(state) : undefined;
} catch (error) {
console.error('Error retrieving navigation state:', error);
return undefined;
}
};


// Call `getInitialState` and set the `initialState`
getInitialState().then(state => setInitialState(state));
checkAuthStatus();
}, [handleAuthChange]);


const handleStateChange = async (state) => {
try {
await AsyncStorage.setItem('navState', JSON.stringify(state));
} catch (error) {
console.error('Error saving navigation state:', error);
}
};


if (loading) {
return null; // Or a loading spinner
}


return (
<NavigationContainer
onStateChange={handleStateChange}
initialState={initialState} // Use state here
>
<Stack.Navigator screenOptions={{ headerShown: false }}>
{isAuthenticated ? (
<>
<Stack.Screen
name="EmployeeHome"
component={EmployeeHomeScreen}
/>
<Stack.Screen
name="HomeScreen"
component={HomeScreen}
/>

<Stack.Screen
name="DeleteAccount"
component={DeleteAccountScreen}
options={{ title: 'DeleteAccount Details' }}
/>

<Stack.Screen
name="RewritePassword"
component={RewritePasswordScreen}
options={{ title: 'Rewrite Password' }}
/>

<Stack.Screen
name="ProfileDetails"
component={ProfileDetailsScreen}
options={{ title: 'Profile Details' }}
/>

<Stack.Screen
name="EmployeeProfile"
component={EmployeeProfileScreen}
options={{ title: 'Employee Profile' }}
/>

<Stack.Screen
name="EmployeeJobDetails"
component={EmployeeJobDetailsScreen}
options={{ title: 'Employee JobDetails' }}
/>

<Stack.Screen
name="TimeSheetDetails"
component={TimeSheetDetailsScreen}
options={{ title: 'TimeSheet Details' }}
/>

<Stack.Screen
name="VacationDetails"
component={VacationDetailsScreen}
options={{ title: 'Vacation Details' }}
/>

<Stack.Screen
name="ReportDetails"
component={ReportDetailsScreen}
options={{ title: 'Report Details' }}
/>

<Stack.Screen
name="CreateTimeSheet"
component={CreateTimesheetScreen}
options={{ title: 'CreateTime Details' }}
/>

<Stack.Screen
name="CreateVacation"
component={CreateVacationScreen}
options={{ title: 'CreateVacation Details' }}
/>

<Stack.Screen
name="CreateReportIssue"
component={CreateReportIssueScreen}
options={{ title: 'CreateReport Details' }}
/>

<Stack.Screen
name="CurrentOpeningsAL"
component={CurrentOpeningsScreenAL}
options={{ title: 'CurrentOpeningAL Screen' }}
/>

<Stack.Screen
name="MyJobs"
component={MyJobsScreen}
options={{ title: 'MyJobs Screen' }}
/>

<Stack.Screen
name="Latest Updates"
component={LatestUpdatesScreen}
options={{ title: 'LatestUpdates Screen' }}
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
name="CandidateEmployee"
component={CandidateEmployeeScreen}
options={{ title: 'Candidate Employee' }}
/>
<Stack.Screen
name="EmployeeSignIn"
component={EmployeeSignInScreen}
options={{ title: 'Employee Sign In' }}
/>
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

<Stack.Screen
name="Contact"
component={Contact}
options={{ title: 'Contact Us' }}
/>

<Stack.Screen
name="CurrentOpenings"
component={CurrentOpeningsScreen}
options={{ title: 'CurrentOpenings Screen' }}
/>
</>
)}
</Stack.Navigator>
</NavigationContainer>
);
};


export default Navigation;



