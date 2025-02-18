"use client"
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import api from "../../utils/api";
import withAuth from "../../utils/withAuth";
import { callAlert } from "../../redux/actions/alert";
import Layout from "@/components/Dashboard/layout";
import { Grid,Paper,TableContainer, FormControl, InputLabel, Select, MenuItem,Button,Link } from "@mui/material";
import { Typography,Divider,Box,TextField} from "@mui/material";
import { useRouter } from 'next/router';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { DataEncrypt, DataDecrypt } from '../../utils/encryption';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

function TransactionHistory(props) {
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 10,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 10,
      });
    const [showServiceTrans, setShowServiceTrans] = useState({});
    const dispatch = useDispatch();
    const router = useRouter();
    const { id,kyc_id } = router.query;

    const [pan, setPan] = useState('');
    const [aadhar_number, setaadhar_number] = useState('');
    const [aadhar_name, setaadhar_name] = useState('');
    const [account_number, setaccount_number] = useState('');
    const [status, setstatus] = useState('');
    const [account_holder, setaccount_holder] = useState('');
    const [ifsc_code, setifsc_code] = useState('');
    const [nominee_name, setnominee_name] = useState('');
    const [nominee_relation, setnominee_relation] = useState('');
    const [address, setaddress] = useState('');
    const [bank_name, setbank_name] = useState('');

    const [panImage, setPanImage] = useState('');
    const [aadhaarFImage, setAadhaarFImage] = useState('');
    const [aadhaarBImage, setAadhaarBImage] = useState('');
    const [passbookImage, setPassbookImage] = useState('');

    const [selectedPanFile, setSelectedPanFile] = useState(null);
    const [selectedAadharFFile, setSelectedAadharFFile] = useState(null);
    const [selectedAadharBFile, setSelectedAadharBFile] = useState(null);
    const [selectedPassbookFile, setSelectedPassbookFile] = useState(null);
    
    let rows;

    if (showServiceTrans && showServiceTrans.length > 0) {
        rows = [
            ...showServiceTrans
        ];
    } else {
        rows = [];
    }

    const handlePanFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedPanFile(file);
    };
    const handleAadharFFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedAadharFFile(file);
    };
    const handleAadharBFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedAadharBFile(file);
    };
    const handlePassbookFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedPassbookFile(file);
    };

    const handleLinkClick = (img) => {
        window.open(`${process.env.NEXT_PUBLIC_API_BASE_URL}${img}`, '_blank', 'noopener,noreferrer');
      };

    useEffect(() => {
       
        const all_parameters = {
            "user_id": id
        }
        const encryptedData = DataEncrypt(JSON.stringify(all_parameters));

        const getTnx = async () => {
          const reqData = {
            encReq: encryptedData
          };
          try {
            const response = await api.post('/api/users/get-kyc', reqData);
            if (response.status === 200) {
                const decryptedObject = DataDecrypt(response.data);
              
                setPan(decryptedObject.data.pan_number);
                setaadhar_number(decryptedObject.data.aadhar_number);
                setaccount_number(decryptedObject.data.account_number);
                setaccount_holder(decryptedObject.data.account_holder);
                setifsc_code(decryptedObject.data.ifsc_code);
                setaadhar_name(decryptedObject.data.name_as_on_aadhar)
                //setnominee_name(decryptedObject.data.nominee_name);
                setstatus(decryptedObject.data.status);
                //setnominee_relation(decryptedObject.data.nominee_relation);
                setaddress(decryptedObject.data.address);
                setbank_name(decryptedObject.data.bank_name);
                setPanImage(decryptedObject.data.panImage)
                setAadhaarFImage(decryptedObject.data.aadharImage)
                setAadhaarBImage(decryptedObject.data.aadharBackImage)
                setPassbookImage(decryptedObject.data.checkbookImage)
           
            }
          } catch (error) {
            if (error?.response?.data?.error) {
              dispatch(callAlert({ message: error.response.data.error, type: 'FAILED' }));
            } else {
              dispatch(callAlert({ message: error.message, type: 'FAILED' }));
            }
          }
        };
    
        if (id) {
          getTnx();
        }
      }, [id, dispatch]);

    const handleSubmit = async () => {
        // alert(status);
        
            // const formData = new FormData();
            // formData.append('img', selectedFile);
            // formData.append('title', title);
            // formData.append('categoryId',transactionType);

            const formData ={
                'kyc_id': kyc_id,
                'user_id':id,
                'pan':pan,
                'aadhar_number':aadhar_number,
                'account_number':account_number,
                'account_holder':account_holder,
                'ifsc_code':ifsc_code,
                'nominee_name':nominee_name,
                'nominee_relation':nominee_relation,
                'address':address,
                'bank_name': bank_name,
                'name_as_on_aadhar': aadhar_name,
                'panImage': selectedPanFile,
                'aadharImage': selectedAadharFFile,
                'aadharBackImage': selectedAadharBFile,
                'chequeBookImage': selectedPassbookFile,
            }

        try {
            const response = await api.post("/api/users/update-kyc", formData,{

                headers:{'content-type': 'multipart/form-data'}
              
              
              });
            
            if (response) {
                window.history.back();
                alert('Updated successfully');
            } 

        } catch (error) {
            console.error('Error updating :', error);
        }
        
        };
          
        // const priorityhandleChange = (event) => {
        //     setpriority(event.target.value);
        // };
    
        const statushandleChange = (event) => {
            setstatus(event.target.value);
        };


    return (

        <Layout>
            <Grid
                container
                spacing={4}
                sx={{ padding: 2 }}
            >
            
            <Grid item={true} xs={12}   >
              <TableContainer component={Paper} >
                <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '40%', verticalAlign: 'top'}} >
                    <Typography variant="h5"  sx={{ padding: 2 }}>KYC [Update] </Typography>
                </Box>
                </TableContainer>
            </Grid>
            
            
                <Grid item={true} xs={12}   >
                    <TableContainer component={Paper} >
                        <Box justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >
                            
                            <TextField required  fullWidth label="Aadhar Full Name" variant="outlined" display={'inline-block'}
                            value={aadhar_name} onChange={(e) => setaadhar_name(e.target.value)}  />
                        </Box>
                        <br/>
                        <Box justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >
                            
                            <TextField required  fullWidth label="Aadhar Number" variant="outlined" display={'inline-block'}
                            value={aadhar_number} onChange={(e) => setaadhar_number(e.target.value)}  />
                        </Box>
                        <br/>

                        <Box justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >
                            
                            <TextField required  fullWidth label="Pan Number" variant="outlined" display={'inline-block'}
                            value={pan}   onChange={(e) => setPan(e.target.value)} />
                        </Box>
                        
                        <br/>
                        <Box justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >
                            
                            <TextField required  fullWidth label="Account Number" variant="outlined" display={'inline-block'}
                            value={account_number} onChange={(e) => setaccount_number(e.target.value)}  />
                        </Box>
                        <br/>
                        <Box justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >
                            
                            <TextField required  fullWidth label="Account Holder" variant="outlined" display={'inline-block'}
                            value={account_holder} onChange={(e) => setaccount_holder(e.target.value)}  />
                        </Box>
                        <br/>
                        <Box justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >
                            
                            <TextField required  fullWidth label=" Ifsc Code" variant="outlined" display={'inline-block'}
                            value={ifsc_code} onChange={(e) => setifsc_code(e.target.value)}  />
                        </Box>
                        <br/>
                        {/* <Box justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >
                            
                            <TextField required  fullWidth label="Nominee Name" variant="outlined" display={'inline-block'}
                            value={nominee_name} onChange={(e) => setnominee_name(e.target.value)}  />
                        </Box> */}

                        <Box justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >
                            
                            <TextField required  fullWidth label="Bank Name" variant="outlined" display={'inline-block'}
                            value={bank_name} onChange={(e) => setbank_name(e.target.value)}  />
                        </Box>
                        <br/>
                        
                        <Box justifyContent={'space-between'} alignItems={'right'} mt={3} ml={2} mb={0} style={{width: '50%', verticalAlign: 'top'}} >
                        
                        <TextareaAutosize  fullWidth
                                label="Address" 
                                minRows={1}
                                size="normal"
                                variant="outlined"
                                placeholder="Address" 
                                style={{height: '90px', width:'968px', border: '1px solid #ced4da', borderRadius: '4px', padding: '10px' }}
                                value={address}
                                onChange={(e) => setaddress(e.target.value)}
                        /> 
                        </Box>

                        <br />
                        
                        <Box display="inline-block" justifyContent="space-between" alignItems="right" mt={3} ml={2} mb={2} sx={{ width: '70%',      verticalAlign: 'top' }}>
                                
                                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                Pan Image
                                <VisuallyHiddenInput type="file" onChange={(event) => handlePanFileChange(event)} />
                                </Button>
                                {selectedPanFile && (
                                <Typography variant="body2" sx={{ marginTop: 1, width: 'auto', display: 'inline-block', marginLeft: '10px' }}>
                                    {selectedPanFile.name}
                                </Typography>
                                )}
                                {panImage && (
                                    <Link href="#" onClick={() => handleLinkClick(panImage)} ml={2}>View</Link>
                                )}
                                
                        </Box>

                        <Box display="inline-block" justifyContent="space-between" alignItems="right" mt={3} ml={2} mb={2} sx={{ width: '70%',      verticalAlign: 'top' }}>
                                
                                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                AADHAR(Front)
                                <VisuallyHiddenInput type="file" onChange={(event) => handleAadharFFileChange(event)} />
                                </Button>
                                {selectedAadharFFile && (
                                <Typography variant="body2" sx={{ marginTop: 1, width: 'auto', display: 'inline-block', marginLeft: '10px' }}>
                                    {selectedAadharFFile.name}
                                </Typography>
                                )}
                                {aadhaarFImage && (
                                    <Link href="#" onClick={() => handleLinkClick(aadhaarFImage)} ml={2}>View</Link>
                                )}
                                
                        </Box>

                        <Box display="inline-block" justifyContent="space-between" alignItems="right" mt={3} ml={2} mb={2} sx={{ width: '70%',      verticalAlign: 'top' }}>
                                
                                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                AADHAR(Back)
                                <VisuallyHiddenInput type="file" onChange={(event) => handleAadharBFileChange(event)} />
                                </Button>
                                {selectedAadharBFile && (
                                <Typography variant="body2" sx={{ marginTop: 1, width: 'auto', display: 'inline-block', marginLeft: '10px' }}>
                                    {selectedAadharBFile.name}
                                </Typography>
                                )}
                                {aadhaarBImage && (
                                    <Link href="#" onClick={() => handleLinkClick(aadhaarBImage)} ml={2}>View</Link>
                                )}
                                
                        </Box>

                        <Box display="inline-block" justifyContent="space-between" alignItems="right" mt={3} ml={2} mb={2} sx={{ width: '70%',      verticalAlign: 'top' }}>
                                
                                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                PASSBOOK
                                <VisuallyHiddenInput type="file" onChange={(event) => handlePassbookFileChange(event)} />
                                </Button>
                                {selectedPassbookFile && (
                                <Typography variant="body2" sx={{ marginTop: 1, width: 'auto', display: 'inline-block', marginLeft: '10px' }}>
                                    {selectedPassbookFile.name}
                                </Typography>
                                )}

                                {passbookImage && (
                                    <Link href="#" onClick={() => handleLinkClick(passbookImage)} ml={2}>View</Link>
                                )}
                                
                        </Box>
                        

                        <br /><br />
                        <Grid item>
                            <Box display="flex" justifyContent="flex-first" mr={2}  mt={1} ml={2} mb={1} >
                            <Button variant="contained" color="success" size="medium" onClick={handleSubmit}>
                                Update
                            </Button>
                            </Box>   
                        </Grid>
                        <br /><br /><br /><br /><br />
                    </TableContainer>
                </Grid>
            </Grid>
        </Layout>


    );
}
export default withAuth(TransactionHistory);

