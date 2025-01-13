"use client"
import { Box, Button,Divider,TextField,InputLabel,Select,MenuItem, Container, Grid, Paper, Table, TableBody, StyledTableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, FormControl } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie";
import withAuth from "../../utils/withAuth";
import { callAlert } from "../../redux/actions/alert";
import Layout from "@/components/Dashboard/layout";
import { useRouter } from 'next/router';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { read, utils } from 'xlsx';
const { sheet_to_json } = utils;
import api from "../../utils/api";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


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

function AddLeads(props) {

    const router = useRouter();
    const  attr  = router.query;
    const dispatch = useDispatch();
    const uid = Cookies.get('uid');

    const [narration, setNarration] = useState('');
    const [amount, setAmount] = useState('');
    const [updata, setUpdata] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedValue, setSelectedValue] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };


    
    const handleSubmit = async() => {
    if (selectedFile) {
        const reader = new FileReader();
    
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const excelData = sheet_to_json(sheet, { header: 1 });

            const headers = excelData[0];
            const jsonData = excelData.slice(1).map(row => {
                const obj = {};
                headers.forEach((header, index) => {
                    obj[header] = row[index];
                });
                return obj;
            });

            setUpdata(jsonData);

        };
    
        reader.readAsArrayBuffer(selectedFile);

        
    }else{
        alert('Please Upload excel file with proper format');
    }

        try {

            const formData = {
                'walletType':selectedValue,
                'narration': narration,
                'amount':amount,
                'uploadedData':updata,
                'action': attr.action,
                'sender_id': uid
            }
            if(updata)
            {
                const response = await api.post('/api/wallet/bulk-credit-debit-income', formData);
            
                if (response.status==200) {
                    window.history.back();
                    alert(attr.action+'ed successfully');
                } else {
                    console.error('Failed to ' + attr.action);
                    alert(response.data.error);
                }
            }else{
                alert('Are you sure to submit income');
            }
        } catch (error) {
            alert('Are you sure to submit income');
        }
    
    };


    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleCancel = async () => {
        window.history.back();
      };
    
    return (


        <Layout>
            <main className="p-6 space-y-6">
          
          <Grid
              container
              spacing={4}
          >
          
          <Grid item={true} xs={12}   >
                <Grid className="page-header" item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={10}>
                            <Typography variant="h5"  >Bulk income {attr.action}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Button href={`/credit-balance-to-user?action=${attr.action}`} variant="contained" className="white-button"><ArrowBackIcon /> Back</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={0}>
                    <Grid item md={12}>
                        <Box mt={1} mb={1} sx={{width: '50%'}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Wallet Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedValue}
                                    label="Wallet"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">Please Select</MenuItem>
                                    <MenuItem value="income">Income Wallet</MenuItem>
                                    <MenuItem value="Royality">Royality</MenuItem>
                                    <MenuItem value="Reward">Reward</MenuItem>
                                    <MenuItem value="SIP">SIP</MenuItem>
                                    <MenuItem value="MF">MF</MenuItem>
                                    <MenuItem value="Laptop">Laptop</MenuItem>
                                    <MenuItem value="Bike">Bike</MenuItem>
                                    <MenuItem value="Car">Car</MenuItem>
                                    <MenuItem value="House">House</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>

                    <Grid item md={12}>
                        <Box mt={1} mb={1} sx={{width: '50%'}}>
                            <TextField required size="normal"
                            fullWidth label="Narration" 
                            variant="outlined" display={'inline-block'}
                            value={narration} 
                            onChange={(e) => setNarration(e.target.value)} sx={{
                                '& .MuiOutlinedInput-root': {
                                  height: '45px', 
                                },
                              }} />
                        </Box>
                    </Grid>

                    <Grid item md={12}>
                        <Box mt={1} mb={1} sx={{width: '50%'}}>
                            <TextField required size="normal"
                            fullWidth label="Amount" 
                            variant="outlined" display={'inline-block'}
                            value={amount} 
                            onChange={(e) => setAmount(e.target.value)}  sx={{
                                '& .MuiOutlinedInput-root': {
                                  height: '45px', 
                                },
                              }}/>
                        </Box>
                    </Grid>

                    <Grid item md={12}>
                        <Box mt={1} mb={1} sx={{width: '50%'}}>
                            <Typography variant="p"  sx={{ padding: '0 5px 0 0' }}>Upload CSV file</Typography>
                              <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                Upload file
                              <VisuallyHiddenInput type="file" onChange={(event) => handleFileChange(event)} />
                              </Button>
                              {selectedFile && (
                              <Typography variant="body2" sx={{ marginTop: 1 }}>
                                  {selectedFile.name}
                              </Typography>
                              )}
                        </Box>
                    </Grid>
                    <Grid item md={12}>
                        <Box mt={1} mb={1} sx={{width: '100%'}}>
                            <Button variant="contained" className="btn-secondry" style={{ marginRight: '8px' }} size="large" onClick={handleSubmit}>
                              Submit
                              </Button>
                              <Button variant="contained" className="btn-secondry" size="large" onClick={handleCancel} >Cancel</Button>
                        </Box>
                    </Grid>
                    
                </Grid> 
          </Grid>
          
      </Grid>
            
  </main>
        </Layout>


    );
}
export default withAuth(AddLeads);

