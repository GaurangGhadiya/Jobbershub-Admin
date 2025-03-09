import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box, Grid } from '@mui/material';
import TextFieldComponent from '../TextFieldComponent';
import Title from '../Title';
import TextAreaComponent from '../TextAreaComponent';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import Image from 'next/image';
import ApproveRejectActionModal from './approveRejectActionModal';
import toast from 'react-hot-toast';

import moment from 'moment-timezone';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function KYCActionModal({ kycModal, KycClose, actionData, handleBlockUnblock,getTableData }) {

  const [viewData, setViewData] = React.useState({})
  const [nomineeData, setNomineeData] = React.useState([])
  const [approveRejectModal, setApproveRejectModal] = React.useState(false)
  const [actionType, setActionType] = React.useState("")
  console.log('viewData', {viewData,actionData})
  React.useEffect(() => {
    // actionData?.user_id
    if(actionData?.user_id){

      axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/users/get-user-kyc`, { user_id: actionData?.user_id }).then(res => {
        console.log('api response', res)
        setViewData(res?.data?.data)
        setNomineeData(res?.data?.nominee)
  
      }).catch(e => {
        toast.error(e?.response?.data?.message)
        console.log('e', e)
      })
    }
  }, [actionData])

  const handleApproveReject = (formData, setFormData) => {
    const body = {
      id : viewData?.id,
      action : actionType,
      note : formData?.reason || "-",
      status : actionType == "Approve" ? 1 : 2
    }
    axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/users/update-kyc-status`, body).then(res => {
      console.log('api response', res)
      setApproveRejectModal(false)
      KycClose()
      setFormData("")
      getTableData()
      toast.success(res?.data?.message || "KYC status update sucessfully")

    }).catch(e => {
      toast.error("Failed to Update data")
      setApproveRejectModal(false)
      KycClose()
      setFormData("")
      console.log('e', e)
    })
  }

  if(Object.keys(viewData)?.length > 0){

  }else{
    return
  }


  return (
    <React.Fragment>

      <BootstrapDialog
        onClose={KycClose}
        aria-labelledby="customized-dialog-title"
        // open={true}
        open={kycModal}
        fullWidth={true}
        maxWidth={"md"}
      >
        {/* <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Block Reason
        </DialogTitle> */}
        {/* <IconButton
          aria-label="close"
          onClick={KycClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton> */}
        <DialogContent dividers>
          <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
              <Typography color={'#464646'} fontSize={"18px"}>KYC Details :</Typography>
              <Box backgroundColor={'#69B899'} borderRadius={"4px"} px={1} py={0.5} ml={2}>
                <Typography color={'#fff'} fontSize={"16px"}>Auto Approved </Typography>

              </Box>
              <Typography color={'#464646'} fontSize={"16px"} ml={3}>
              {moment.utc(viewData?.created_on).tz('Asia/Kolkata').format('DD-MM-YYYY, hh:mm A')}
                </Typography>
            </Box>
            <Box style={{ cursor: "pointer" }} onClick={KycClose}>
              <CloseIcon />
            </Box>
          </Box>
      {Object.keys(viewData)?.length > 0 && <>    <Typography color={'#464646'} fontSize={"16px"} mt={2}>Personal KYC Detail</Typography>
          <Grid container spacing={2} mt={0} p={2}>
            <Grid item sx={12} sm={3} boxShadow={'0px 2px 10px 0px #00000040'} borderRadius={"6px"}>
              <Typography color={'#464646'} fontSize={"16px"} >Identity information</Typography>
              <Grid container spacing={2} mt={0} pr={2} pb={2}>
                <Grid sm={12} item>
                  <Title title={"Pan Card "} />
                  <TextFieldComponent
                    name="pan_number"
                    value={viewData?.pan_number}
                    // onChange={handleChange}
                    disabled
                    placeholder=''
                  />
                </Grid>
                <Grid sm={12} item>
                  <Title title={"Aadhar Card"} />
                  <TextFieldComponent
                    name="aadhar_number"
                    value={viewData?.aadhar_number}
                    // onChange={handleChange}
                    disabled
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
                      value={viewData?.account_holder}
                      // onChange={handleChange}
                      disabled
                      placeholder=''
                    />
                  </Grid>
                  <Grid sm={4} item >
                    <Title title={"Account Number"} />
                    <TextFieldComponent
                      name="account_number"
                      value={viewData?.account_number}
                      // onChange={handleChange}
                      disabled
                      placeholder=''
                    />
                  </Grid>
                  <Grid sm={4} item >
                    <Title title={"Account Type"} />
                    <TextFieldComponent
                      name="account_type"
                      value={viewData?.account_type}
                      // onChange={handleChange}
                      disabled
                      placeholder=''
                    />
                  </Grid>
                  <Grid sm={4} item >
                    <Title title={"IFSC Code"} />
                    <TextFieldComponent
                      name="ifsc_code"
                      value={viewData?.ifsc_code}
                      // onChange={handleChange}
                      disabled
                      placeholder=''
                    />
                  </Grid>
                  <Grid sm={4} item >
                    <Title title={"Bank Name"} />
                    <TextFieldComponent
                      name="bank_name"
                      value={viewData?.bank_name}
                      // onChange={handleChange}
                      disabled
                      placeholder=''
                    />
                  </Grid>
                  <Grid sm={4} item >
                    <Title title={"Bank Branch"} />
                    <TextFieldComponent
                      name="bank_branch"
                      value={viewData?.bank_branch}
                      // onChange={handleChange}
                      disabled
                      placeholder=''
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>        </Grid>



          <Grid container spacing={2} mt={0} p={2}>
            <Grid item sx={12} sm={12} boxShadow={'0px 2px 10px 0px #00000040'} borderRadius={"6px"} >
              <Box display={"flex"} mb={2}>
                <Box width={"33%"}>

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
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${viewData?.panimage}`}
                      height={100}
                      width={100}
                      style={{ objectFit: "contain", height: "100%", width: "100%" }}
                    />
                  </Box>

                </Box>
                <Box width={"33%"}>

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
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${viewData?.aadharimage}`}
                      height={100}
                      width={100}
                      style={{ objectFit: "contain", height: "100%", width: "100%" }}
                    />
                  </Box>

                </Box>
                <Box width={"33%"}>

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
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${viewData?.checkbookimage}`}
                      height={100}
                      width={100}
                      style={{ objectFit: "contain", height: "100%", width: "100%" }}
                    />
                  </Box>
                </Box>
              </Box>

            </Grid>
          </Grid>
          </>
}


          {nomineeData?.length > 0 && <Typography color={'#464646'} fontSize={"16px"} mt={2}>Nominee KYC Detail </Typography>}
          {nomineeData?.map((v, i) => (<>
            <Typography color={'#464646'} fontSize={"16px"} mt={2}>Nominee: {i + 1} </Typography>
            <Typography color={'#464646'} fontSize={"16px"} mt={1}>Nominee Relation: {v?.relation} </Typography>
            <Typography color={'#464646'} fontSize={"16px"} mt={1}>Percentage Share With Nominee: {v?.precentage_of_transfer}{"%  "} </Typography>

            <Grid container spacing={2} mt={0} p={2}>
              <Grid item sx={12} sm={3} boxShadow={'0px 2px 10px 0px #00000040'} borderRadius={"6px"}>
                <Typography color={'#464646'} fontSize={"16px"} >Identity information</Typography>
                <Grid container spacing={2} mt={0} pr={2} pb={2}>
                  <Grid sm={12} item>
                    <Title title={"Pan Card "} />
                    <TextFieldComponent
                      name="pan_number"
                      value={v?.pan_no}
                      // onChange={handleChange}
                      disabled
                      placeholder=''
                    />
                  </Grid>
                  <Grid sm={12} item>
                    <Title title={"Aadhar Card"} />
                    <TextFieldComponent
                      name="aadhar_number"
                      value={v?.aadhaar_no}
                      // onChange={handleChange}
                      disabled
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
                        value={v?.account_holder}
                        // onChange={handleChange}
                        disabled
                        placeholder=''
                      />
                    </Grid>
                    <Grid sm={4} item >
                      <Title title={"Account Number"} />
                      <TextFieldComponent
                        name="account_number"
                        value={v?.account_no}
                        // onChange={handleChange}
                        disabled
                        placeholder=''
                      />
                    </Grid>
                    <Grid sm={4} item >
                      <Title title={"Account Type"} />
                      <TextFieldComponent
                        name="account_type"
                        value={v?.account_type}
                        // onChange={handleChange}
                        disabled
                        placeholder=''
                      />
                    </Grid>
                    <Grid sm={4} item >
                      <Title title={"IFSC Code"} />
                      <TextFieldComponent
                        name="ifsc_code"
                        value={v?.ifsc_code}
                        // onChange={handleChange}
                        disabled
                        placeholder=''
                      />
                    </Grid>
                    <Grid sm={4} item >
                      <Title title={"Bank Name"} />
                      <TextFieldComponent
                        name="bank_name"
                        value={v?.bank_name}
                        // onChange={handleChange}
                        disabled
                        placeholder=''
                      />
                    </Grid>
                    <Grid sm={4} item >
                      <Title title={"Bank Branch"} />
                      <TextFieldComponent
                        name="bank_branch"
                        value={v?.branch_name}
                        // onChange={handleChange}
                        disabled
                        placeholder=''
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>        </Grid>



            <Grid container spacing={2} mt={0} p={2}>
              <Grid item sx={12} sm={12} boxShadow={'0px 2px 10px 0px #00000040'} borderRadius={"6px"} >
                <Box display={"flex"} mb={2}>
                  <Box width={"33%"}>

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
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${v?.panimage}`}
                        height={100}
                        width={100}
                        style={{ objectFit: "contain", height: "100%", width: "100%" }}
                      />
                    </Box>

                  </Box>
                  <Box width={"33%"}>

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
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${v?.aadharimage}`}
                        height={100}
                        width={100}
                        style={{ objectFit: "contain", height: "100%", width: "100%" }}
                      />
                    </Box>

                  </Box>
                  <Box width={"33%"}>

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
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${v?.checkbookimage}`}
                        height={100}
                        width={100}
                        style={{ objectFit: "contain", height: "100%", width: "100%" }}
                      />
                    </Box>
                  </Box>
                </Box>

              </Grid>
            </Grid>
          </>))}

         {Object.keys(viewData)?.length > 0 && <Box display={"flex"} justifyContent={"center"} alignItems={"center"} width={"100%"}>
            <Box backgroundColor="#D3606F" borderRadius={"6px"} px={1} py={0.5} onClick={() => { setApproveRejectModal(true); setActionType('Reject') }} style={{ cursor: "pointer" }}>
              <Typography color={"white"} fontSize={16}>Reject</Typography>
            </Box>
            <Box backgroundColor="#FE9204" borderRadius={"6px"} px={1} py={0.5} mx={2} onClick={() => { setApproveRejectModal(true); setActionType('Approve') }} style={{ cursor: "pointer" }}>
              <Typography color={"white"} fontSize={16}>Approve</Typography>
            </Box>
          </Box>}
          <ApproveRejectActionModal approveRejectModal={approveRejectModal} approveRejectModalClose={() => setApproveRejectModal(false)} actionType={actionType} handleApproveReject={handleApproveReject} />

        </DialogContent>

      </BootstrapDialog>
    </React.Fragment>
  );
}
