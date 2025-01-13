import { Box, Button,Divider,TextField, Container, Grid, Paper, Table, TableBody, StyledTableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../../utils/api";
import Cookies from "js-cookie";
import { ArrowBack } from "@mui/icons-material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import Link from "next/link";
import Modal from '@mui/material/Modal';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import Alert from '@mui/material/Alert';


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

const AddMoneyRequestTransactions = ({ showServiceTrans }) => {

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
    const [rowsPerPage, setRowsPerPage] = useState(100);


    const onPageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 100));
        setPage(0);
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: '#ccc',
          color: theme.palette.common.black,
          fontSize: 12,
          linHeight: 15,
          padding: 7,
          borderRight: "1px solid rgba(224, 224, 224, 1)"
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 12,
            linHeight: 15,
            padding: 7,
            borderRight: "1px solid rgba(224, 224, 224, 1)"
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

      const [searchTerm, setSearchTerm] = useState('');

      const filteredRows = rows.filter(row => {
        return (
            (row.first_name && row.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (row.last_name && row.last_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (row.username && row.username.includes(searchTerm)) ||
            (row.mobile && row.mobile.includes(searchTerm)) ||
            (row.trans_no && row.trans_no.includes(searchTerm)) 
          // Add conditions for other relevant columns
        );
    });


      const handleLinkClick = (img) => {
        window.open(img, '_blank', 'noopener,noreferrer');
      };
    
 
  
    const [openModal1, setOpenModal1] = React.useState(false);
    const [openModal2, setOpenModal2] = React.useState(false);
    const [addMoneyReqId, setAddMoneyReqId] = React.useState(null);
    const [status, setStatus] = React.useState(null);
    const [rejectionReason, setRejectionReason] = useState(null);

    const handleOpenModal1 = (addMoneyReqId,status) => {
        setAddMoneyReqId(addMoneyReqId);
        setStatus(status);
        setOpenModal1(true);
      };
    
      const handleCloseModal1 = () => {
        setAddMoneyReqId(null);
        setStatus(null);
        setOpenModal1(false);
      };
    
      const handleOpenModal2 = (addMoneyReqId,status) => {
        setAddMoneyReqId(addMoneyReqId);
       
        setStatus(status);
        setOpenModal2(true);
      };
    
      const handleTextareaChange = (event) => {
        setRejectionReason(event.target.value);
      };

      const handleCloseModal2 = () => {
        setOpenModal2(false);
      };

      const handleOKButtonClick = async () => {
        

        if (!addMoneyReqId) {
          console.error('addMoneyReqId is missing.');
          return;
        }
        alert(rejectionReason);
        let note = '';
        let action='';
        if (status === 1) {
            note = 'Approve';
            action='Approve';
          } else if (status === 2) {
            note = rejectionReason; // Use the rejectionReason state
            action='Reject';
          } else {
            note='';
            action='';
          }
        
        const requestData = {
          status: status,
          note: note,
          add_money_req_id: addMoneyReqId,
          action:action
        };

       
        try {

            const response = await api.post("/api/add_money/update-add-money", requestData);
              
            if (response.data.status === 200) {
                location.reload();
             
            }else{
               console.log('Failed to update status.');
                
            }

        } catch (error) {
            console.error("Error:", error);
            // if (error?.response?.data?.error) {
            //     dispatch(callAlert({ message: error.response.data.error, type: 'FAILED' }))
            // } else {
            //     dispatch(callAlert({ message: error.message, type: 'FAILED' }))
            // }

        }
       
        handleCloseModal1();
        handleCloseModal2();
      };

    return (

        <main className="p-6 space-y-6">
            <Grid
                container
                spacing={4}
            >
                <Grid item={true} xs={12}   >
                    <TableContainer component={Paper} className="table_container">
                        {/* <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mt={2} mb={2} sx={{ padding: 2 }}>
                            <TextField id="standard-basic" label="Search" variant="standard" style={{width: '50%'}} />
                        </Box>
                        <Divider /> */}
                        <Table aria-label="Otp Report" stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Sl No.</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>User Name</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap> User Id</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Mobile</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Amount</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>UTR No</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Image</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Date</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Reason</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Status</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                
                                {showServiceTrans.length > 0 ? (rowsPerPage > 0
                                    ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : filteredRows
                                ).map((row, index) => (

                                    <StyledTableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >

                                        <StyledTableCell>{index + 1 + page * rowsPerPage}</StyledTableCell>
                                        <StyledTableCell>{row.first_name +' '+ row.last_name}</StyledTableCell> 
                                        <StyledTableCell>{row.username}</StyledTableCell>
                                        <StyledTableCell>{row.mobile}</StyledTableCell>
                                        <StyledTableCell>{row.amount}</StyledTableCell>
                                        <StyledTableCell>{row.trans_no}</StyledTableCell>
                                        <StyledTableCell><Link href="#" onClick={() => handleLinkClick(row.img)}>View Image</Link></StyledTableCell>
                                        <StyledTableCell>{row.request_date}</StyledTableCell>
                                        <StyledTableCell>{row.rejection_reason}</StyledTableCell>
                                        <StyledTableCell style={{ color:row.status === 1 ? 'Green' : row.status === 2 ? 'Red' : 'blue' }} > {row.status === 1 ? 'Approved' : row.status === 2 ? 'Rejected' : 'Pending'}</StyledTableCell>
                                        <StyledTableCell sx={{ '& button': { m: 1 } }}>
                                         

                                            {row.status === 0 ? (
                                            <>
                                                <Button variant="contained" size="small" color="success" onClick={() => handleOpenModal1(row.id, 1)}>
                                                Approve
                                                </Button>
                                                <Button variant="contained" size="small" color="error" onClick={() => handleOpenModal2(row.id, 2)}>
                                                Reject
                                                </Button>
                                            </>
                                            ) : null}
                                         
                                            <Modal 
                                                    open={openModal1} 
                                                    onClose={handleCloseModal1}
                                                    aria-labelledby="modal-modal-title"
                                                    aria-describedby="modal-modal-description"
                                                >
                                                    <Box sx={style} alignItems={'center'}  justifyContent={'space-between'}>
                                                        <HelpOutlineOutlinedIcon sx={{ fontSize: 40 ,marginLeft:20}} color="warning" alignItems={'center'} />
                                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                                     Are you sure to approve the money request?
                                                    </Typography>
                                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}  alignItems={'center'} >
                                                        <Button variant="contained" size="large" color="success" onClick={handleOKButtonClick} sx={{ marginLeft: 12, marginLeft:20 }}>OK</Button>
                                                        
                                                    </Typography>
                                                  
                                                    </Box>
                                                </Modal>

                                                <Modal
                                                    open={openModal2} 
                                                    onClose={handleCloseModal2}
                                                    aria-labelledby="modal-modal-title"
                                                    aria-describedby="modal-modal-description"
                                                >
                                                    <Box sx={style} alignItems={'center'}  justifyContent={'space-between'}>
                                                        <HelpOutlineOutlinedIcon sx={{ fontSize: 40 ,marginLeft:20}} color="warning" alignItems={'center'} />
                                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                                     Are you sure to Reject the money request?
                                                    </Typography>
                                                    <TextareaAutosize 
                                                            aria-label="minimum height" 
                                                            minRows={10} 
                                                            placeholder="Enter Rejection Reason" 
                                                            style={{ width: 400}} 
                                                            value={rejectionReason}
                                                            onBlur={handleTextareaChange}
                                                            
                                                    />
                                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}  alignItems={'center'} >
                                                        <Button variant="contained" size="large" color="success" onClick={handleOKButtonClick} sx={{ marginLeft: 12 ,marginLeft:20}}>OK</Button>
                                                        
                                                    </Typography>
                                                  
                                                    </Box>
                                                </Modal>
                                          


                                        </StyledTableCell>
                                      
                                            
                                            
                                        

                                    </StyledTableRow>
                                  
                                )) : (
                                    
                                    <TableRow>
                                        <TableCell colSpan={11} component="th" scope="row">
                                            <Typography color={'error'}>No Records Found.</Typography>
                                        </TableCell>
                                    
                                    </TableRow>
                                  
                                  

                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        rowsPerPageOptions={{}}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={onPageChange}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
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
export default AddMoneyRequestTransactions;