import React  from 'react';
import { useEffect, useState,useCallback  } from "react";
import api from "../../../utils/api";
import Cookies from "js-cookie";
import { ArrowBack } from "@mui/icons-material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { Box, Modal, Button,Divider,TextField, Container, Grid, Paper, Table, TableBody, StyledTableCell, TableContainer, TableHead, TablePagination, TableRow, Typography,Link } from "@mui/material";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import Link from "next/link";
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import TextareaAutosize from '@mui/material/TextareaAutosize';
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

const PaymentData = ({ showServiceTrans }) => {


    let rows;

    if (showServiceTrans && showServiceTrans.length > 0) {
        rows = [
            ...showServiceTrans
        ];
    } else {
        rows = [];
    }
   
    const rowsPerPageOptions = [5, 10, 25];

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(100);
    const [openModal1, setOpenModal1] = React.useState(false);
    const [openModal2, setOpenModal2] = React.useState(false);
    const [reqId, setReqId] = React.useState(null);
    const [status, setStatus] = React.useState(null);
    const [rejectionReason, setRejectionReason] = React.useState(null);

    const [distribd_amount, setdistributed_amount] = useState(null);
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    
    const onPageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 100));
        setPage(1);
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


      const filteredRows = rows


  
    

    const handleOpenModal1 = (reqId,status, distribd_amount) => {
        setReqId(reqId);
        setStatus(status);
        setOpenModal1(true);
        setdistributed_amount(distribd_amount);
      };
    
      const handleCloseModal1 = () => {
        setReqId(null);
        setStatus(null);
        setOpenModal1(false);
      };
    
      const handleTextareaChange = useCallback((event) => {
        console.log('Textarea Change Event Triggered');
        setRejectionReason(event.target.value);
      }, []);

      const handleOpenModal2 = (reqId,status, distribd_amount) => {
        setReqId(reqId);
       
        setStatus(status);
        setOpenModal2(true);
        setdistributed_amount(distribd_amount);
      };
    
      const handleCloseModal2 = () => {
        setOpenModal2(false);
      };

      
      const handleLinkClick = (img) => {
        window.open(`${process.env.NEXT_PUBLIC_API_BASE_URL}${img}`, '_blank', 'noopener,noreferrer');
      };
    

      const handleOKButtonClick = async () => {
        setIsButtonClicked(true);
        // alert(status);
        if (!reqId) {
          console.error('ReqId is missing.');
          return;
        }
        let remarks = '';
        let action='';
        if (status === 1) {
            remarks = 'Approve';
            action='Approve';
          } else if (status === 3) {
            remarks = rejectionReason; // Use the rejectionReason state
            action='Reject';
          } 
        
        const requestData = {
          status: status,
          remarks: remarks,
          payment_request_id: reqId,
          action:action,
          distribution_amount: distribd_amount
        };
        try {

            const response = await api.post("/api/leads/update-purchase-request", requestData);
              
            if (response.data.status === 200) {
                location.reload();
             
            }else{
               console.log('Failed to update status.');
                
            }

        } catch (error) {
            console.error("Error:", error);
           
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
                        
                        <Table aria-label="Otp Report" stickyHeader>

                            <TableHead>
                                <TableRow>

                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>Sl No.</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>Username</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>Email</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>Transaction no</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>Amount</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>Product</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>Distribution Amount</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>Request Type</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>Request Date</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>View Image</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>Status</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>Action</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>Remarks</StyledTableCell>
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
                                        <StyledTableCell>{row.first_name + ' ' + row.last_name + ' | '+ row.mlm_id +' | '+ row.mobile}</StyledTableCell> 
                                        <StyledTableCell>{row.email}</StyledTableCell>
                                        <StyledTableCell>{row.transaction_id}</StyledTableCell>
                                        <StyledTableCell>{row.amount}</StyledTableCell>
                                        <StyledTableCell>{row.lead_name +'|'+row.category_name}</StyledTableCell>
                                        <StyledTableCell>{row.distribution_amount}</StyledTableCell>
                                        <StyledTableCell>{row.description}</StyledTableCell>
                                        <StyledTableCell>{row.requested_on}</StyledTableCell>
                                        <StyledTableCell> {row.payment_image !== '' ? (
                                            <Link href="#" onClick={() => handleLinkClick(row.payment_image)}>View</Link>
                                        ) : (
                                            ''
                                        )}
                                       </StyledTableCell>

                                        <StyledTableCell style={{ color:row.status === 1 ? 'Green' : row.status === 2 ? 'Orange' : 'Orange' }} > {row.status === 1 ? 'Approved' : row.status === 2 ? 'Pending' : 'Rejected'}</StyledTableCell>
                                        <StyledTableCell sx={{ '& button': { m: 1 } }}>
                                        {row.status === 2 && (
                                            <>
                                            <Button variant="contained" size="small" color="success" onClick={() => handleOpenModal1(row.id,1, row.distribution_amount)}>Approve</Button> 
                                            <Button variant="contained" size="small" color="error" onClick={()=> handleOpenModal2(row.id,3, row.distribution_amount)}>Reject</Button>  
                                            
                                            </>
                                            )}
                                            <Modal 
                                                    open={openModal1} 
                                                    onClose={handleCloseModal1}
                                                    aria-labelledby="modal-modal-title"
                                                    aria-describedby="modal-modal-description"
                                                >
                                                    <Box sx={style} alignItems={'center'}  justifyContent={'space-between'}>
                                                        <HelpOutlineOutlinedIcon sx={{ fontSize: 40 ,marginLeft:20}} color="warning" alignItems={'center'} />
                                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                                     Are you sure want to approve?
                                                    </Typography>
                                                    <br/>
                                                    <TextField required size="normal"
                                                        fullWidth label="Distributed Amount" 
                                                        variant="outlined" display={'inline-block'}
                                                        value={distribd_amount} 
                                                        mr={3}
                                                        onChange={(e) => setdistributed_amount(e.target.value)}  />
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
                                                     Are you sure to Reject?
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
                                                    {!isButtonClicked && (
                                                        <Button variant="contained" size="large" color="success" onClick={handleOKButtonClick} sx={{ marginLeft: 12 ,marginLeft:20}}>OK</Button>
                                                    )}
                                                    </Typography>
                                                  
                                                    </Box>
                                                </Modal>
                                          


                                        </StyledTableCell>
                                        <StyledTableCell>{row.remarks}</StyledTableCell>
                                    </StyledTableRow>
                                  
                                )) : (
                                    
                                    <TableRow>
                                        <TableCell colSpan={20} component="th" scope="row">
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
export default PaymentData;