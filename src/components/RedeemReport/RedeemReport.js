import { Box, Button,Divider,TextField, Container, Grid, Paper, Table, TableBody, StyledTableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../../utils/api";
import Cookies from "js-cookie";
import { ArrowBack } from "@mui/icons-material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import dayjs from 'dayjs';
import Modal from '@mui/material/Modal';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
 
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

const IncomeTransactions = ({ showServiceTrans }) => {

    


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
          padding: 7
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 12,
            linHeight: 15,
            padding: 7
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


  
    const [openModal1, setOpenModal1] = React.useState(false);
    const [openModal2, setOpenModal2] = React.useState(false);
    const [UserId, setUserId] = React.useState(null);
    const [status, setStatus] = React.useState(null);
    const [amount, setAmount] = React.useState(null);
    const [TransNo, setTransNo] = React.useState(null);
   
    const [rejectionReason, setRejectionReason] = useState(null);
    
    const handleOpenModal1 = (status,user_id,amount,trans_no) => {
        setUserId(user_id);
        setStatus(status);
        setAmount(amount);
        setTransNo(trans_no);
        setOpenModal1(true);
      };

      const handleCloseModal1 = () => {
        setUserId(null);
        setStatus(null);
        setAmount(null);
        setTransNo(null);
        setOpenModal1(false);
      };
    
      const handleTextareaChange = (event) => {
        setRejectionReason(event.target.value);
      };

      const handleOpenModal2 = (status,user_id,amount,trans_no) => {
        setUserId(user_id);
        setStatus(status);
        setAmount(amount);
        setTransNo(trans_no);
        setOpenModal2(true);
      };
    
      const handleCloseModal2 = () => {
        setOpenModal2(false);
      };

     

      const handleOKButtonClick = async () => {
     
        if (!UserId) {
          console.error('UserId is missing.');
          return;
        }
        let remark = '';

       
        
        let action='';
        if (status === 1) {
            remark = 'Approve';
            action='Approve';
          } else if (status === 2) {
            remark = rejectionReason; 
            action='Reject';
          } 
        
          else {
            remark='';
            action='Pending';
          }
        
        const requestData = {
          
          user_id:UserId,
          sender_user_id:2,
          amount:amount,
          trans_no:TransNo,
          remarks: remark,
         
        };
    
        try {
            
            let response=[];
            if(status===1) {
                response = await api.post("/api/referral/plan/approve-redeem", requestData) ;
            }else{
                response = await api.post("/api/referral/plan/reject-redeem", requestData) ;
            }

            if (response.data.status===200) {
                alert(response.data.message)
                location.reload();
             
            }else{
                alert('Failed to update status.');
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

                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Sr No.</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >User Name</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >User Id</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Mobile</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Requested Amount</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >TDS Rate</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >TDS Amount</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Withdrawal Rate</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Withdrawal Amount</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Credit Amount</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Transaction No</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Approval Remarks</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >created date</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Status</StyledTableCell>
                                 
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Action</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Approve Date</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Account No.</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Account holder name</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >IFSC Code</StyledTableCell>
                                    
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                
                                {showServiceTrans.length > 0 ? (rowsPerPage > 0
                                    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : rows
                                ).map((row, index) => (

                                    <StyledTableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >

                                        <StyledTableCell>{index + 1 + page * rowsPerPage}</StyledTableCell>
                                        <StyledTableCell>{row.first_name +' '+ row.last_name }</StyledTableCell>
                                        <StyledTableCell>{row.mlm_id}</StyledTableCell>
                                        <StyledTableCell>{row.mobile}</StyledTableCell>
                                        <StyledTableCell>{row.amount}</StyledTableCell>
                                        <StyledTableCell>{row.tds_rate}</StyledTableCell>
                                        <StyledTableCell>{row.tds_charge}</StyledTableCell>
                                        <StyledTableCell>{row.withdrawal_rate}</StyledTableCell>
                                        <StyledTableCell>{row.withdrawal_charge}</StyledTableCell>
                                        <StyledTableCell>{row.payout}</StyledTableCell>
                                        <StyledTableCell>{row.trans_no}</StyledTableCell>
                                        <StyledTableCell >{row.approval_remarks}</StyledTableCell>
                                        <StyledTableCell>{row.redeem_date}</StyledTableCell>
                                        <StyledTableCell style={{ color:row.status === 1 ? 'Green' : row.status === 2 ? 'Red' : 'blue' }} >
                                                     {row.status === 1 ? 'Approved' : row.status === 2 ? 'Rejected' : 'Pending'}
                                        </StyledTableCell>
                                        <StyledTableCell sx={{ '& button': { m: 1 } }}>
                                         

                                         {row.status === 0 ? (
                                         <>

                                        
                                             <Button variant="contained" size="small" color="success" onClick={() => handleOpenModal1(1,row.user_id,row.amount, row.trans_no)}>
                                             Approve
                                             </Button>
                                             <Button variant="contained" size="small" color="error" onClick={() => handleOpenModal2(2,row.user_id,row.amount, row.trans_no)}>
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
                                                  Are you sure to approve the Redeem request?
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
                                                  Are you sure to Reject the Redeem Request?
                                                 </Typography>
                                                 <TextareaAutosize 
                                                         aria-label="minimum height" 
                                                         minRows={10} 
                                                         placeholder="Enter Rejection Reason" 
                                                         style={{ width: 400}} 
                                                         value={rejectionReason }
                                                         onChange={handleTextareaChange}
                                                         
                                                 />
                                                 <Typography id="modal-modal-description" sx={{ mt: 2 }}  alignItems={'center'} >
                                                     <Button variant="contained" size="large" color="success" onClick={handleOKButtonClick} sx={{ marginLeft: 12 ,marginLeft:20}}>OK</Button>
                                                     
                                                 </Typography>
                                               
                                                 </Box>
                                             </Modal>
                                       


                                     </StyledTableCell>

                                     <StyledTableCell>{}</StyledTableCell>
                                     <StyledTableCell>{row.account_no}</StyledTableCell>
                                     <StyledTableCell>{row.account_holder_name}</StyledTableCell>
                                     <StyledTableCell>{row.bank_name}</StyledTableCell>
                                    </StyledTableRow>
                                  
                                )) : (
                                    
                                    <TableRow>
                                        <TableCell colSpan={19} component="th" scope="row">
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
export default IncomeTransactions;