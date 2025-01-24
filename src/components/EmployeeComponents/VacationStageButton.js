// src/components/EmployeeComponents/EmployeeStageButton.js
import React from 'react';
import CustomButton from '../CustomButton';


const VacationStageButton = ({ stageVacationText }) => {
  return (
    <CustomButton
      text={stageVacationText}
      onPress={() => {}}
      type="PRIMARY"
      bgColor="#F5802C"
      fgColor="#000000"
    />
  );
};


export default VacationStageButton;





