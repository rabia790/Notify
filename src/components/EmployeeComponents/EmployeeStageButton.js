// src/components/EmployeeComponents/EmployeeStageButton.js
import React from 'react';
import CustomButton from '../CustomButton';

const EmployeeStageButton = ({ stageText }) => {
  return (
    <CustomButton 
      text={stageText} 
      onPress={() => {}} 
      type="PRIMARY" 
      bgColor="#FFFFFF" 
      fgColor="#000000" 
    />
  );
};

export default EmployeeStageButton;
