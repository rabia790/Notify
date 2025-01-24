import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useModal } from '../libraries/ModalContext';
import { downloadFileFromDynamics, fetchJob, fetchCompany } from '../../api/EmployeeCRM';
import { fetchManager } from '../../api/TimeSheetCRM';
import EmployeeStageButton from './EmployeeStageButton';
import { format } from 'date-fns';


const JobDetailsEmployeeForm = ({ employee, stageText }) => {
    const [cygniName, setCygniName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [managerName, setManagerName] = useState('');
    const { showModal } = useModal();
console.log(stageText);

    const jobMapping = {
        814740000: 'Full Time',
        814740001: 'Part Time',
        814740002: 'Contractual',
    };


    useEffect(() => {
        if (employee && employee._cygni_reportingmanager_value) {
            fetchManager(employee._cygni_reportingmanager_value)
                .then((manager) => {
                    if (manager && manager.fullname) {
                        const managerName = manager.fullname;
                        setManagerName(managerName);
                    }
                })
                .catch((error) => {
                    console.error('Error in fetching manager details:', error);
                });
        }
    }, [employee]);


    useEffect(() => {
        if (employee && employee._cygni_job_value) {
            fetchJob(employee._cygni_job_value)
                .then((jobName) => {
                    if (jobName) {
                        setCygniName(jobName);
                    }
                })
                .catch((error) => {
                    console.error('Error in fetching job name:', error);
                });
        }
    }, [employee]);


    useEffect(() => {
        if (employee && employee._cygni_company_value) {
            fetchCompany(employee._cygni_company_value)
                .then((companyData) => {
                    if (companyData) {
                        setCompanyName(companyData.name || 'Unknown Company');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching company:', error);
                    setCompanyName('Unknown Company');
                });
        }
    }, [employee]);


    const handleDownload = async () => {
        try {
            await downloadFileFromDynamics(employee.cygni_employeeid);
            showModal({
                heading: 'Success',
                message: 'Successfully Downloaded on your Device!',
            });
        } catch (error) {
            console.error('Download error:', error);
        }
    };


    const jobText = employee ? jobMapping[employee.cygni_type] || 'Unknown Stage' : 'Unknown Stage';


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.contentWrapper}>
                <View style={styles.stageButtonWrapper}>
                    <EmployeeStageButton stageText={stageText} />
                </View>
               
                <View style={styles.columnsWrapper}>
                    <View style={styles.column}>
                        <Text style={styles.label}>Job Type</Text>
                        <Text style={styles.text}>{jobText}</Text>


                        <Text style={styles.label}>Joining Date</Text>
                        <Text style={styles.text}>{format(new Date(employee.cygni_joiningdate), 'dd MMM yyyy')}</Text>


                        <Text style={styles.label}>Probation Days</Text>
                        <Text style={styles.text}>{employee.cygni_probationmonths}</Text>


                        <Text style={styles.label}>Probation Completion</Text>
                        <Text style={styles.text}>{format(new Date(employee.cygni_probationcompletion), 'dd MMM yyyy')}</Text>
                    </View>
                   
                    <View style={styles.column}>
                        <Text style={styles.label}>Onboarding Completed</Text>
                        <Text style={styles.text}>{employee.cygni_onboardingcompleted ? "True" : "False"}</Text>


                        <Text style={styles.label}>Pay Rate</Text>
                        <Text style={styles.text}>CAD ${employee.cygni_payrate}</Text>


                        <Text style={styles.label}>Job</Text>
                        <Text style={styles.text}>{cygniName}</Text>


                        <Text style={styles.label}>Company</Text>
                        <Text style={styles.text}>{companyName}</Text>


                        <Text style={styles.label}>Reporting Manager</Text>
                        <Text style={styles.text}>{managerName}</Text>
                    </View>
                </View>
               
                <View style={styles.resumeDetails}>
                    <Text style={styles.label}>Employment Contract</Text>
                    {employee.cygni_employmentcontract_name ? (
                        <TouchableOpacity onPress={handleDownload} style={styles.downloadButton}>
                            <Text style={styles.downloadButtonText}>Download {employee.cygni_employmentcontract_name}</Text>
                        </TouchableOpacity>
                    ) : (
                        <Text style={styles.text}>Your Employment Contract will be uploaded soon!</Text>
                    )}
                </View>
            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    contentWrapper: {
        width: '90%',
        alignItems: 'center',
    },
    stageButtonWrapper: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 20,
    },
    columnsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    column: {
        flex: 1,
        marginHorizontal: 10,
    },
    label: {
        fontFamily: 'Montserrat-Bold',
        color: '#FF9A52',
        marginBottom: 5,
        fontSize: 18,
        marginTop: 20,
    },
    text: {
        fontFamily: 'Montserrat-Regular',
        color: '#EAEAEA',
        marginBottom: 20,
        fontSize: 20,
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    resumeDetails: {
        marginVertical: 20,
        alignItems: 'center',
    },
    downloadButton: {
        backgroundColor: '#E28F46',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    downloadButtonText: {
        color: '#000000',
        fontSize: 16,
    },
});


export default JobDetailsEmployeeForm;





