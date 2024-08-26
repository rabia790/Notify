// Import necessary libraries
import React, { useState } from 'react';

// Function to generate a 6-digit OTP
export const generateOTP = () => {
    const digits = '0123456789';  // Digits to choose from
    return Array.from({ length: 6 }, () => digits[Math.floor(Math.random() * 10)]).join('');
};

// Function to send OTP to a specified email address
export const sendOTP = async (otp, email, showModal) => {
    const url = 'https://prod2-04.canadacentral.logic.azure.com:443/workflows/4fa4cb21746044b383eca6d9087034a3/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=g2WIUiEk_errmy0baSjKUdj48pZM3gUnLlOhSyv-QJI';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ otp, email }),  // Sending OTP and email as JSON
        });

        if (response.ok) {
            console.log('OTP email sent successfully');  // Log success message
            showModal({
                heading: 'Success',
                message: 'OTP has been sent to your email',
            
            });
            return true;  // Return true indicating success
        } else {
            console.error('Failed to send OTP email');  // Log error if response is not ok
            showModal({
                heading: 'Error',
                message: 'Failed to send OTP. Please try again.',
            
            });
            return false;  // Return false indicating failure
        }
    } catch (error) {
        console.error('Error:', error);  // Log error if there was a problem with the fetch request
        showModal({
            heading: 'Error',
            message: 'An error occurred. Please try again later.',
        
        });        return false;  // Return false indicating failure
    }
};
