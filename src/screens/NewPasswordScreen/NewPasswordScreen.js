import React, {useState} from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const NewPasswordScreen = () => {
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const navigation = useNavigation();

const onSendPressed =() =>{
  console.warn("Send Code!");
  navigation.navigate('SignIn');
}


const onHaveAccountPressed =() =>{
  console.warn("Go To Sign IN!");
  navigation.navigate('SignIn');

}


  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.root}>
     <Text style={styles.title}>Reset Your Password</Text>

       <CustomInput placeholder="Code" value={code} setValue={setCode}/>
       <CustomInput placeholder="Enter your New Password" value={newPassword} setValue={setNewPassword}/>
      
       <CustomButton text="Submit" onPress={onSendPressed}/>

       
      <CustomButton text="Back to Sign In" onPress={onHaveAccountPressed} type="TERTIARY"/>
    </View>
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text:{
    color:'gray',
    marginVertical:10,
  },
  link:{
    color: "orange"
  },
});

export default NewPasswordScreen;
