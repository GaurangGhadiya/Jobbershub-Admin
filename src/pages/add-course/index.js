import Layout from '@/components/Layout/Layout'
import { Box, CircularProgress, StepConnector, styled, Typography } from '@mui/material'
import Cookies from "js-cookie";

import React, { useEffect, useState } from 'react'
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
import { useRouter } from 'next/router';
import axios from 'axios';
// import {objectToFormData} from '../../../utils/JsonToFormData';
import toast from 'react-hot-toast';
import objectToFormData from '../../../utils/JsonToFormData';


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
    [`& .MuiStepConnector-line`]: {
        borderColor: "#FFE4D0", // Default color for inactive
        borderWidth: 2,
    },
    [`&.Mui-active .MuiStepConnector-line`]: {
        borderColor: "#FF8C38", // Active color
    },
    [`&.Mui-completed .MuiStepConnector-line`]: {
        borderColor: "#FF8C38", // Completed color
    },
}));

const AddCourse = () => {
    const route = useRouter()
    const [step, setStep] = useState(0)
    const [formData, setFormData] = useState({
        category_id: 4
    })
    const [loading, setLoading] = useState(false)
console.log('formData', formData)
    useEffect(() => {
        Cookies.get('category_id') && Cookies.get('uid') && setFormData({ ...formData, category_id: Cookies.get('category_id'),seller_id : Cookies.get('uid') })
    }, [route])


    const finalSubmit = async (body) => {

        console.log('body', body)
        setLoading(true)

        let newData = await objectToFormData({...body, category_id: Cookies.get('category_id'),seller_id : Cookies.get('uid')})

        await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/course/add-course-leads`, newData).then(async(res) => {
            console.log('api response', res?.data?.data)
            setLoading(false)
            setFormData({ category_id: Cookies.get('category_id') || 4 })
            toast.success(res?.data?.message || 'Course Added Successfully')
            let redirect = await Cookies.get("employee_role")
            if(redirect == "Admin"){

                route.push("/admin-course-list")
            }else{

                route.push("/course")
            }

        }).catch(e => {
            setLoading(false)
            toast.error(e.response?.data?.message || 'Something went wrong')
            console.log('erro', e)
        })

    }

    console.log('formDataMain', formData)

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
                                fontWeight: 600,
                            },
                            '.MuiStepIcon-root.Mui-completed': {
                                color: '#FF8C38', // Completed step color
                            },
                            '.MuiStepLabel-label.Mui-completed': {
                                color: '#FF8C38', // Text color for completed steps
                                fontWeight: 600,

                            },

                        }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <Box backgroundColor="#A2A1A833" height={"1px"} mt={1}></Box>


                    {loading ?
                        < Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"60vh"}><CircularProgress /></Box>
                        : <Box mt={3}>
                            {step == 0 && <Step1 formDataMain={formData} setFormDataMain={setFormData} step={step} setStep={setStep} />}
                            {step == 1 && <Step2 formDataMain={formData} setFormDataMain={setFormData} step={step} setStep={setStep} />}
                            {step == 2 && <Step3 formDataMain={formData} setFormDataMain={setFormData} step={step} setStep={setStep} />}
                            {step == 3 && <Step4 formDataMain={formData} setFormDataMain={setFormData} step={step} setStep={setStep} />}
                            {step == 4 && <Step5 formDataMain={formData} setFormDataMain={setFormData} step={step} setStep={setStep} />}
                            {step == 5 && <Step6 formDataMain={formData} setFormDataMain={setFormData} step={step} setStep={setStep} />}
                            {step == 6 && <Step7 formDataMain={formData} setFormDataMain={setFormData} step={step} setStep={setStep} />}
                            {step == 7 && <Step8 formDataMain={formData} setFormDataMain={setFormData} step={step} setStep={setStep} />}
                            {step == 8 && <Step9 formDataMain={formData} setFormDataMain={setFormData} step={step} setStep={setStep} finalSubmit={finalSubmit} />}
                        </Box>}
                    {/* <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} my={5}>

                    <Box border={"1px solid #A2A1A8"} style={{cursor : "pointer"}} onClick={() => {step == 0 ? route.push("/course") :setStep(step-1)}} borderRadius={"10px"}><Typography fontSize={"16px"} color={"black"} px={3} py={1}>Back</Typography></Box>
                    <Box backgroundColor={"#FF8C38"} style={{cursor : "pointer"}} onClick={() => {step == 8 ? {} : setStep(step+1)}} borderRadius={"10px"}><Typography fontSize={"16px"} color={"white"} px={3} py={1}>Next</Typography></Box>
                </Box> */}
                </Box>


            </Box>
        </Layout>
    )
}

export default AddCourse
