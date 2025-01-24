// src/components/EmployeeComponents/EmployeeStageButton.js
import React from 'react';
import CustomButton from '../CustomButton';


const ReportStageButton = ({ stageReportText }) => {
  return (
    <CustomButton
      text={stageReportText}
      onPress={() => {}}
      type="PRIMARY"
      bgColor="#F5802C"
      fgColor="#000000"
    />
  );
};


export default ReportStageButton;





