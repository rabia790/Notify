import React, {useState} from 'react';
import { TouchableOpacity, StyleSheet, Image, View, Text } from 'react-native';
import Collapsible from 'react-native-collapsible';
import LabeledTextArea from '../LabeledTextArea';


 const ProfileTechnicalTab = ({ education, setEducation, infoadditional, setInfoadditional, expwork, setExpwork, prof, setProf}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);


  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };




  return (
    <View>
    <TouchableOpacity onPress={toggleCollapse} style={styles.accordionHeaderContainer}  >
    <Text style={styles.accordionHeader}>TECHNICAL DETAILS</Text>
    {/* Conditionally render the down or up arrow based on collapse state */}
    <Image
    source={isCollapsed ? require('../../../assets/images/downarrow.png') : require('../../../assets/images/uparrow.png')}                  
    style={styles.arrowImage}
    />
        </TouchableOpacity>


        <Collapsible collapsed={isCollapsed}>
        <LabeledTextArea
        label="Educational Background"
        placeholder="Enter your educational background here"
        value={education}
        setValue={setEducation}
       
      />


<LabeledTextArea
        label="Additional Information"
        placeholder="Enter your additional information here"
        value={infoadditional}
        setValue={setInfoadditional}
      />


<LabeledTextArea
        label="Work Experience"
        placeholder="Enter your work experience here"
        value={expwork}
        setValue={setExpwork}
      />




<LabeledTextArea
        label="Technical Proficiencies"
        placeholder="Enter your technical proficiencies here"
        value={prof}
        setValue={setProf}
      />
                </Collapsible>
        </View>
  );
};
const styles = StyleSheet.create({
  accordionHeaderContainer: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor:'#9B9896',
    marginTop:40,
},
accordionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFF',
},
arrowImage: {
    width: 50,
    height: 24,
},
});


export default ProfileTechnicalTab;





