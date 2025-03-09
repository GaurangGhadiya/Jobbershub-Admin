import Layout from '@/components/Layout/Layout'
import TextFieldComponent from '@/components/TextFieldComponent'
import Title from '@/components/Title'
import { Box, Grid, styled, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useState } from 'react'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import toast from 'react-hot-toast'
import Cookies from "js-cookie";
import objectToFormData from '../../utils/JsonToFormData'
import axios from 'axios'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useRouter } from 'next/router'


const IconWrapper = styled('div')(({ theme }) => ({
    textAlign: 'center',
    width: '100%',
    height: '100%',
    border: "2px dotted #FF9F59",
    cursor: 'pointer',
    // paddingTop: "30px"
    display: "flex",
    alignItems : "center",
    justifyContent: "center",
    flexDirection: "column"
}));

const HiddenInput = styled('input')({
    display: 'none',
});


const UpdateKYC = () => {
    const router = useRouter()
    const [viewData, setViewData] = React.useState({})
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        console.log(e)
        if (e.target.type == "file") {
            const { name } = e.target
            console.log('name', name)
            const file = event.target.files[0];
            if (file) {
                setViewData({ ...viewData, [name]: file })
            }
        } else {
            const { name, value } = e.target

            setViewData({ ...viewData, [name]: value })
        }
    }

    console.log('viewData', viewData)

    const onUpdateKYC =async () => {
        await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/seller/7375d0556b4fdfc776b111b0e396a13cd2a59bb9`, objectToFormData({...viewData, seller_id : Cookies.get('uid')})).then(async (res) => {
            console.log('api response', res?.data?.data)
            setLoading(false)
            setViewData({})
router.push("/seller")
            toast.success(res?.data?.message || 'Course Added Successfully')

        }).catch(e => {
            setLoading(false)
            toast.error(e.response?.data?.error || 'Something went wrong')
            console.log('erro', e)
        })
    }
    return (
        <Layout>
            <Box p={2} style={{ backgroundColor: "#fff" }}>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} width={"100%"}>
                        <Typography color={'#464646'} fontSize={"18px"} fontWeight={600}>Update Your KYC</Typography>
                    </Box>
                </Box>

                <>
                    {/* <Typography color={'#464646'} fontSize={"16px"} mt={2}>Personal KYC Detail</Typography> */}
                    <Grid container spacing={2} mt={0} p={2}>
                        <Grid item sx={12} sm={3} boxShadow={'0px 2px 10px 0px #00000040'} borderRadius={"6px"}>
                            <Typography color={'#464646'} fontSize={"16px"} >Identity information</Typography>
                            <Grid container spacing={2} mt={0} pr={2} pb={2}>
                                <Grid sm={12} item>
                                    <Title title={"Pan Card "} />
                                    <TextFieldComponent
                                        name="pan_number"
                                        value={viewData?.pan_number || ""}
                                        onChange={handleChange}

                                        placeholder=''
                                    />
                                </Grid>
                                <Grid sm={12} item>
                                    <Title title={"Aadhar Card"} />
                                    <TextFieldComponent
                                        name="aadhar_number"
                                        value={viewData?.aadhar_number || ""}
                                        onChange={handleChange}

                                        placeholder=''
                                    />
                                </Grid>
                                <Grid sm={12} item>
                                    <Title title={"Name As Per Aadhar Card"} />
                                    <TextFieldComponent
                                        name="name_as_on_aadhar"
                                        value={viewData?.name_as_on_aadhar || ""}
                                        onChange={handleChange}

                                        placeholder=''
                                    />
                                </Grid>
                            </Grid>


                        </Grid>
                        <Grid item sx={12} sm={0.3}></Grid>
                        <Grid item sx={12} sm={8.7} boxShadow={'0px 2px 10px 0px #00000040'} borderRadius={"6px"}>
                            <Typography color={'#464646'} fontSize={"16px"} >Bank information</Typography>
                            <Box>
                                <Grid container spacing={2} mt={0} pr={2} pb={2}>
                                    <Grid sm={4} item>
                                        <Title title={"Account Holder Name "} />
                                        <TextFieldComponent
                                            name="account_holder"
                                            value={viewData?.account_holder || ""}
                                            onChange={handleChange}

                                            placeholder=''
                                        />
                                    </Grid>
                                    <Grid sm={4} item >
                                        <Title title={"Account Number"} />
                                        <TextFieldComponent
                                            name="account_number"
                                            value={viewData?.account_number || ""}
                                            onChange={handleChange}

                                            placeholder=''
                                        />
                                    </Grid>
                                    <Grid sm={4} item >
                                        <Title title={"Account Type"} />
                                        <TextFieldComponent
                                            name="account_type"
                                            value={viewData?.account_type || ""}
                                            onChange={handleChange}

                                            placeholder=''
                                        />
                                    </Grid>
                                    <Grid sm={4} item >
                                        <Title title={"IFSC Code"} />
                                        <TextFieldComponent
                                            name="ifsc_code"
                                            value={viewData?.ifsc_code || ""}
                                            onChange={handleChange}

                                            placeholder=''
                                        />
                                    </Grid>
                                    <Grid sm={4} item >
                                        <Title title={"Bank Name"} />
                                        <TextFieldComponent
                                            name="bank_name"
                                            value={viewData?.bank_name || ""}
                                            onChange={handleChange}

                                            placeholder=''
                                        />
                                    </Grid>
                                    <Grid sm={4} item >
                                        <Title title={"Bank Branch"} />
                                        <TextFieldComponent
                                            name="bank_branch"
                                            value={viewData?.bank_branch || ""}
                                            onChange={handleChange}

                                            placeholder=''
                                        />
                                    </Grid>
                                    <Grid sm={4} item>
                                    <Title title={"Birth Date"} />
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DesktopDatePicker format='DD-MM-YYYY'
                                      slotProps={{
                                        textField: {
                                          sx: { 
                                            borderRadius : "10px", // Adjust border radius
                                            width: "100%",  // Adjust width
                                            height: "40px",  // Adjust height (use inside inputProps)
                                            "& .MuiInputBase-root": { height: "40px", borderRadius : "10px" }, 
                                            "& input": { height: "40px", padding: "10px" , borderRadius : "10px" }, 
                                          },
                                        },
                                      }}
                                 value={viewData?.date_of_birth ? dayjs(viewData?.date_of_birth) :dayjs('2025-01-01')}
                                onChange={(newValue) => setViewData({ ...viewData, date_of_birth : dayjs(newValue).format("YYYY-MM-DD")})}
                                />
                                </LocalizationProvider>
                                </Grid>
                                    <Grid sm={8} item>
                                    <Title title={"Address"} />
                                    <TextFieldComponent
                                        name="address"
                                        value={viewData?.address  || ""}
                                        onChange={handleChange}

                                        placeholder=''
                                    />
                                </Grid>
                                </Grid>
                            </Box>
                        </Grid>        </Grid>



                    <Grid container spacing={2} mt={0} p={2}>
                        <Grid item sx={12} sm={12} boxShadow={'0px 2px 10px 0px #00000040'} borderRadius={"6px"} >
                            <Box display={"flex"} mb={2}>
                                <Box width={"25%"}>

                                    <Typography color={'#464646'} fontSize={"16px"} >Pan Card Image</Typography>
                                    <Box
                                        backgroundColor={'#F7F5DD'}
                                        borderRadius={"6px"}
                                        height={226}
                                        width={"90%"}
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <HiddenInput
                                            type="file"
                                            id="file-upload"
                                            name='panImage'
                                            onChange={handleChange}
                                        /> 
                                          <label htmlFor="file-upload" style={{ width: "100%",height : "100%", display: "block", position: "relative" }}>
                                            {!viewData?.panImage ? <IconWrapper>
                                                <Image src="/Button.png" width={50} height={50} />
                                                <Typography color={"#FF9F59"} fontSize={"14px"} fontWeight={300} mt={1}>choose image to upload</Typography>
                                            </IconWrapper> :
                                                <IconWrapper >
                                                    {viewData?.panImage instanceof File && <Image src={URL.createObjectURL(viewData?.panImage)} width={250} height={145} style={{ height: "100%",width :"100%", marginTop: "0px", padding: "5px" }} />}
                                                    <Box position="absolute" top={80} left={"20%"} backgroundColor="white" borderRadius={"4px"} display={"flex"} alignItems={"center"} justifyContent={"center"} p={2}>
                                                        <FileUploadIcon style={{ fontSize: '30px', color: '#FF9F59' }} />
                                                        <Typography color={"#FF9F59"}>Change image</Typography>

                                                    </Box>
                                                </IconWrapper>}
                                        </label>
                                        {/* <Image
                                            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${viewData?.panimage}`}
                                            height={100}
                                            width={100}
                                            style={{ objectFit: "contain", height: "100%", width: "100%" }}
                                        /> */}
                                    </Box>

                                </Box>
                                <Box width={"25%"}>

                                    <Typography color={'#464646'} fontSize={"16px"} >Aadhar Card Image</Typography>
                                    <Box
                                        backgroundColor={'#F7F5DD'}
                                        borderRadius={"6px"}
                                        height={226}
                                        width={"90%"}
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                       <HiddenInput
                                            type="file"
                                            id="file-upload2"
                                            name='aadharImage'
                                            onChange={handleChange}
                                        /> 
                                          <label htmlFor="file-upload2" style={{ width: "100%",height : "100%", display: "block", position: "relative" }}>
                                            {!viewData?.aadharImage ? <IconWrapper>
                                                <Image src="/Button.png" width={50} height={50} />
                                                <Typography color={"#FF9F59"} fontSize={"14px"} fontWeight={300} mt={1}>choose image to upload</Typography>
                                            </IconWrapper> :
                                                <IconWrapper >
                                                    {viewData?.aadharImage instanceof File && <Image src={URL.createObjectURL(viewData?.aadharImage)} width={250} height={145} style={{ height: "100%",width :"100%", marginTop: "0px", padding: "5px" }} />}
                                                    <Box position="absolute" top={80} left={"20%"} backgroundColor="white" borderRadius={"4px"} display={"flex"} alignItems={"center"} justifyContent={"center"} p={2}>
                                                        <FileUploadIcon style={{ fontSize: '30px', color: '#FF9F59' }} />
                                                        <Typography color={"#FF9F59"}>Change image</Typography>

                                                    </Box>
                                                </IconWrapper>}
                                        </label>
                                    </Box>

                                </Box>
                                <Box width={"25%"}>

                                    <Typography color={'#464646'} fontSize={"16px"} >Aadhar Card back Image</Typography>
                                    {/* <Image src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${viewData?.checkbookimage}`} height={100} width={100} /> */}
                                    <Box
                                        backgroundColor={'#F7F5DD'}
                                        borderRadius={"6px"}
                                        height={226}
                                        width={"90%"}
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                      <HiddenInput
                                            type="file"
                                            id="file-upload3"
                                            name='aadharBackImage'
                                            onChange={handleChange}
                                        /> 
                                          <label htmlFor="file-upload3" style={{ width: "100%",height : "100%", display: "block", position: "relative" }}>
                                            {!viewData?.aadharBackImage ? <IconWrapper>
                                                <Image src="/Button.png" width={50} height={50} />
                                                <Typography color={"#FF9F59"} fontSize={"14px"} fontWeight={300} mt={1}>choose image to upload</Typography>
                                            </IconWrapper> :
                                                <IconWrapper >
                                                    {viewData?.aadharBackImage instanceof File && <Image src={URL.createObjectURL(viewData?.aadharBackImage)} width={250} height={145} style={{ height: "100%",width :"100%", marginTop: "0px", padding: "5px" }} />}
                                                    <Box position="absolute" top={80} left={"20%"} backgroundColor="white" borderRadius={"4px"} display={"flex"} alignItems={"center"} justifyContent={"center"} p={2}>
                                                        <FileUploadIcon style={{ fontSize: '30px', color: '#FF9F59' }} />
                                                        <Typography color={"#FF9F59"}>Change image</Typography>

                                                    </Box>
                                                </IconWrapper>}
                                        </label>
                                    </Box>
                                </Box>
                                <Box width={"25%"}>

                                    <Typography color={'#464646'} fontSize={"16px"} >Bank Passbook Image</Typography>
                                    {/* <Image src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${viewData?.checkbookimage}`} height={100} width={100} /> */}
                                    <Box
                                        backgroundColor={'#F7F5DD'}
                                        borderRadius={"6px"}
                                        height={226}
                                        width={"90%"}
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                      <HiddenInput
                                            type="file"
                                            id="file-upload4"
                                            name='chequeBookImage'
                                            onChange={handleChange}
                                        /> 
                                          <label htmlFor="file-upload4" style={{ width: "100%",height : "100%", display: "block", position: "relative" }}>
                                            {!viewData?.chequeBookImage ? <IconWrapper>
                                                <Image src="/Button.png" width={50} height={50} />
                                                <Typography color={"#FF9F59"} fontSize={"14px"} fontWeight={300} mt={1}>choose image to upload</Typography>
                                            </IconWrapper> :
                                                <IconWrapper >
                                                    {viewData?.chequeBookImage instanceof File && <Image src={URL.createObjectURL(viewData?.chequeBookImage)} width={250} height={145} style={{ height: "100%",width :"100%", marginTop: "0px", padding: "5px" }} />}
                                                    <Box position="absolute" top={80} left={"20%"} backgroundColor="white" borderRadius={"4px"} display={"flex"} alignItems={"center"} justifyContent={"center"} p={2}>
                                                        <FileUploadIcon style={{ fontSize: '30px', color: '#FF9F59' }} />
                                                        <Typography color={"#FF9F59"}>Change image</Typography>

                                                    </Box>
                                                </IconWrapper>}
                                        </label>
                                    </Box>
                                </Box>
                            </Box>

                        </Grid>
                    </Grid>
                </>
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} width={"100%"} my={1}>
                    <Box backgroundColor="#FE9204" borderRadius={"6px"} px={1} py={0.5} mx={2} style={{ cursor: "pointer" }} onClick={onUpdateKYC}>
                        <Typography color={"white"} fontSize={16}>Update KYC</Typography>
                    </Box>
                </Box>
            </Box>
        </Layout>
    )
}

export default UpdateKYC
