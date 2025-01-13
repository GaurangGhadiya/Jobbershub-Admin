import { Box, Button,Divider,TextField, Container, Grid, Paper, Table, TableBody, StyledTableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, TextareaAutosize } from "@mui/material";
import { useEffect, useState } from "react";
import * as React from 'react';
import api from "../../utils/api";
import Cookies from "js-cookie";
import { ArrowBack } from "@mui/icons-material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { useRouter } from 'next/router';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const Transactions = ({ showServiceTrans }) => {

    let rows;

    if (showServiceTrans && showServiceTrans.length > 0) {
        rows = [
            ...showServiceTrans
        ];
    } else {
        rows = [];
    }


    const rowsPerPageOptions = [5, 10, 25];

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [title, setTitle] = useState('');
    const [about_caredit_card, setabout_caredit_card] = useState('');
    const [self_benefits, setself_benefits] = useState('');
    const [referral_benefits, setreferral_benefits] = useState('');
    const [document_requireds, setdocument_requireds] = useState('');

    const router = useRouter();
    const role = Cookies.get('employee_role');
    
    useEffect(() => {
        const getMenus = JSON.parse(localStorage.getItem('menu'));
        const page_url = 'credit-card';
        let foundMenu = false;
        

        for (const item of getMenus) {
            if (item.menu_url === page_url && item._insert == 1) {
                foundMenu = true;
                break; 
            }
            
        }
        if (!foundMenu) {
            window.location.href = '/dashboard'; 
        }
    }, []);



       const handleSubmit = async () => {

        const requestData = {
            name: title,
            about: about_caredit_card,
            self_benefits: self_benefits,
            refarral_benefits: referral_benefits,
            document_required: document_requireds
          };

    

        try {

            const response = await api.post("/api/leads/add-credit-card", requestData);
        
          if (response.status === 200) {
             window.history.back();

            alert('Credit card Added successfully');
          } else {
            console.error('Failed to upload graphics');
          }

        } catch (error) {
          console.error('Error uploading file:', error);
        }
        
      };
      

    return (
        <main className="p-6 space-y-6">
            <Grid
                container
                spacing={4}
                sx={{ padding: '0px 16px' }}
            >
                <Grid item={true} xs={12}   >


                <TableContainer component={Paper} >



                    <Box display={'inline-block'} justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '30%', verticalAlign: 'top'}} >
                        <Typography variant="h5"  sx={{ padding: 2 }}>Add New Credit Card</Typography>
                    </Box>


                    <Grid spacing={2}   sx={{ padding: 2 }} container>

                    <Box justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >
                        
                        <TextField required  fullWidth label="Credit card Name" variant="outlined" display={'inline-block'}
                        value={title} onChange={(e) => setTitle(e.target.value)}  />
                    </Box>

                    <Box justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >
                    <TextareaAutosize  fullWidth
                                label="About Caredit card" 
                                minRows={3}
                                size="normal"
                                variant="outlined"
                                placeholder="About Caredit card" 
                                style={{height: '90px', width:'968px', border: '1px solid #ced4da', borderRadius: '4px', padding: '10px' }}
                                value={about_caredit_card}
                                onChange={(e) => setabout_caredit_card(e.target.value)}
                        /> 
                        
                    </Box>

                    <Box justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >
                        <TextareaAutosize  fullWidth
                                label="Self Benefits" 
                                minRows={3}
                                size="normal"
                                variant="outlined"
                                placeholder="Self Benefits" 
                                style={{height: '90px', width:'968px', border: '1px solid #ced4da', borderRadius: '4px', padding: '10px' }}
                                value={self_benefits}
                                onChange={(e) => setself_benefits(e.target.value)}
                        /> 
                        
                    </Box>

                    <Box justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >
                        <TextareaAutosize  fullWidth
                                label="Referral Benefits" 
                                minRows={3}
                                size="normal"
                                variant="outlined"
                                placeholder="Referral Benefits" 
                                style={{height: '90px', width:'968px', border: '1px solid #ced4da', borderRadius: '4px', padding: '10px' }}
                                value={referral_benefits}
                                onChange={(e) => setreferral_benefits(e.target.value)}
                        />
                        
                    </Box>

                    <Box justifyContent={'space-between'} alignItems={'right'} mt={1} mb={1} style={{width: '50%', verticalAlign: 'top', padding: '0 10px'}} >
                        <TextareaAutosize  fullWidth
                                label="Documents Required" 
                                minRows={3}
                                size="normal"
                                variant="outlined"
                                placeholder="Documents Required" 
                                style={{height: '90px', width:'968px', border: '1px solid #ced4da', borderRadius: '4px', padding: '10px' }}
                                value={document_requireds}
                                onChange={(e) => setdocument_requireds(e.target.value)}
                        />
                        
                    </Box>
                    </Grid>
                    <Grid item>
                            <Box display="flex" justifyContent="flex-start" mr={2}  mt={1} ml={2} mb={1} >
                                <Button variant="contained" color="primary" style={{ marginRight: '8px' }} size="medium" onClick={handleSubmit}>
                                Submit
                                </Button>
                            
                            </Box>
                    </Grid>


                    </TableContainer>
                </Grid>

                <Grid
                    container
                // sx={{ background: "#FFF" }}
                >



                </Grid>
            </Grid>
        </main>
    )
}
export default Transactions;