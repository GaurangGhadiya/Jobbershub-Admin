import Layout from '@/components/Layout/Layout'
import { Box, StepConnector, styled, Typography } from '@mui/material'
import React, { useState } from 'react'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Step1 from './Step1';
import Step9 from './Step9';
import Step8 from './Step8';
import Step7 from './Step7';
import Step6 from './Step6';
import Step5 from './Step5';
import Step4 from './Step4';
import Step3 from './Step3';
import Step2 from './Step2';


const steps = [
    'Course Info',
    'Edit Price',
    'Coupon',
    'Introductory Video',
    'Details',
    'Marketing',
    'FAQ',
    'Course Video',
    'Study material',
];

const CustomConnector = styled(StepConnector)(({ theme }) => ({
    '& .MuiStepConnector-line': {
        borderColor: '#FF8C38', // Change the color of the connector line
    },
}));

const AddCourse = () => {
    const [step, setStep] = useState(0)
    return (
        <Layout>
            <Box p={2} style={{ backgroundColor: "white" }}>
                <Typography fontSize={"20px"} fontWeight={600} color={"#16151C"}>Add New Course</Typography>
                <Typography fontSize={"14px"} fontWeight={300} color={"#16151C"}>All Course &gt; Add New Course</Typography>
                <Box width={"100%"} mt={3}>
                    <Stepper activeStep={step} alternativeLabel
                        connector={<CustomConnector />}

                        sx={{
                            '.MuiStepIcon-root': {
                                color: '#FFE4D0', // Inactive step color
                            },
                            '.MuiStepIcon-text': {
                                fill: 'black', // Step number color for inactive steps
                              },
                              '.MuiStepIcon-text.Mui-active': {
                                fill: 'white', // Step number color for the active step
                              },
                              '.MuiStepIcon-text.Mui-completed': {
                                fill: 'white', // Step number color for completed steps
                              },
                            '.MuiStepIcon-root.Mui-active': {
                                color: '#FF8C38', // Active step color
                            },
                            '.MuiStepLabel-label.Mui-active': {
                                color: '#FF8C38', // Text color for active step
                                fontWeight : 600,
                            },
                            '.MuiStepIcon-root.Mui-completed': {
                                color: '#FF8C38', // Completed step color
                            },
                            '.MuiStepLabel-label.Mui-completed': {
                                color: '#FF8C38', // Text color for completed steps
                                fontWeight : 600,

                            },

                        }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    

                    <Box mt={4}>
                        {step == 0 && <Step1 />}
                        {step == 1 && <Step2 />}
                        {step == 2 && <Step3 />}
                        {step == 3 && <Step4 />}
                        {step == 4 && <Step5 />}
                        {step == 5 && <Step6 />}
                        {step == 6 && <Step7 />}
                        {step == 7 && <Step8 />}
                        {step == 8 && <Step9 />}
                    </Box>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} my={5}>

                    <Box border={"1px solid #A2A1A8"} style={{cursor : "pointer"}} onClick={() => setStep(step-1)} borderRadius={"10px"}><Typography fontSize={"16px"} color={"black"} px={3} py={1}>Back</Typography></Box>
                    <Box backgroundColor={"#FF8C38"} style={{cursor : "pointer"}} onClick={() => setStep(step+1)} borderRadius={"10px"}><Typography fontSize={"16px"} color={"white"} px={3} py={1}>Next</Typography></Box>
                </Box>
                </Box>


            </Box>
        </Layout>
    )
}

export default AddCourse
