import React, {useState} from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const ConfirmEmailScreen = () => {
    const [code, setCode] = useState('');
    const navigation = useNavigation();

const onConfirmPressed =() =>{
  console.warn("Confirm your Code!");
  navigation.navigate('NewPassword');
}


const onHaveAccountPressed =() =>{
  console.warn("Go To Sign IN!");
  navigation.navigate('SignIn')
}
const onResendPressed =() =>{
  console.warn("Send me code!");
}



  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.root}>
     <Text style={styles.title}>Confirm Your Email</Text>

       <CustomInput placeholder="Enter Your Confirmation Code" value={code} setValue={setCode}/>
      
       <CustomButton text="Confirm" onPress={onConfirmPressed}/>

       <CustomButton text="Resend Code" onPress={onResendPressed} type="SECONDARY"/>


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

export default ConfirmEmailScreen;
