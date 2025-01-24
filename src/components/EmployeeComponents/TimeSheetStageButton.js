// src/components/EmployeeComponents/EmployeeStageButton.js
import React from 'react';
import CustomButton from '../CustomButton';


const TimeSheetStageButton = ({ stageTimeText }) => {
  return (
    <CustomButton
      text={stageTimeText}
      onPress={() => {}}
      type="PRIMARY"
      bgColor="#F5802C"
      fgColor="#000000"
    />
  );
};


export default TimeSheetStageButton;





