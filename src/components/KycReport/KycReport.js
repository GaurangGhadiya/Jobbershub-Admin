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

const KycTransactions = ({ showServiceTrans }) => {


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
    const [addMoneyReqId, setAddMoneyReqId] = React.useState(null);
    const [status, setStatus] = React.useState(null);
    const [rejectionReason, setRejectionReason] = React.useState(null);

    
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


      const [searchTerm, setSearchTerm] = useState('');

      const filteredRows = rows.filter(row => {
        return (
            (row.name && row.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
              (row.mlm_id && row.mlm_id.includes(searchTerm)) ||
              (row.mobile && row.mobile.includes(searchTerm))||
              (row.pan_number && row.pan_number===searchTerm) ||
            (row.aadhar_number && row.aadhar_number===searchTerm) ||
            (row.account_number && row.account_number===searchTerm)  ||
              (row.ifsc_code && row.ifsc_code===searchTerm) ||
              (row.nominee_name && row.nominee_name.includes(searchTerm)) ||
              (row.nominee_relation && row.nominee_relation.includes(searchTerm)) ||
              (row.nominee_aadhaar_no && row.nominee_aadhaar_no.includes(searchTerm)) ||
              (row.nominee_pan_no && row.nominee_pan_no.includes(searchTerm)) ||
              (row.nominee_account_no && row.nominee_account_no.includes(searchTerm)) ||
              (row.nominee_bank_name && row.nominee_bank_name.includes(searchTerm)) ||
              (row.nominee_ifsc_code && row.nominee_ifsc_code.includes(searchTerm)) ||
              (row.nominee_branch_name && row.nominee_branch_name.includes(searchTerm))
           
        );
    });


  
    

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
    
      const handleTextareaChange = useCallback((event) => {
        console.log('Textarea Change Event Triggered');
        setRejectionReason(event.target.value);
      }, []);

      const handleOpenModal2 = (addMoneyReqId,status) => {
        setAddMoneyReqId(addMoneyReqId);
       
        setStatus(status);
        setOpenModal2(true);
      };
    
      const handleCloseModal2 = () => {
        setOpenModal2(false);
      };

      
      const handleLinkClick = (img) => {
        window.open(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${img}`, '_blank', 'noopener,noreferrer');
      };
    

      const handleOKButtonClick = async () => {
        // alert(status);
        if (!addMoneyReqId) {
          console.error('kycReqId is missing.');
          return;
        }
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
          id: addMoneyReqId,
          action:action
        };
        try {

            const response = await api.post("/api/users/update-kyc-status", requestData);
              
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
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>PAN Number</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>Name As On PAN</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>Aadhaar Number</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>Name As On Aadhaar</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>Account Number</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>Account holder Name</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>IFSC Code</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>Address</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>PAN Image</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>Aadhaar Front Image</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>Aadhar Back Image</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>Passbook Image</StyledTableCell>

                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>Nominee Name</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>Nominee Relation</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>Nominee aadhaar no</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>Nominee pan no</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>Nominee account no</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>Precentage of transfer</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>Nominee bank name</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>Nominee ifsc code</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>Nominee branch name</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>Kyc Date</StyledTableCell>

                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>Action Date</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>Status</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>Action</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} nowrap>Rejection Reason</StyledTableCell>
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
                                        <StyledTableCell>{row.pan_number}</StyledTableCell>
                                        <StyledTableCell>{row.name_as_on_pan}</StyledTableCell>
                                        <StyledTableCell>{row.aadhar_number}</StyledTableCell>
                                        <StyledTableCell>{row.name_as_on_aadhar}</StyledTableCell>
                                        <StyledTableCell>{row.account_number}</StyledTableCell>
                                        <StyledTableCell>{row.name_as_on_bank}</StyledTableCell>
                                        <StyledTableCell>{row.ifsc_code}</StyledTableCell>
                                        <StyledTableCell>{row.address}</StyledTableCell>
                                        <StyledTableCell> {row.panImage !== '' ? (
                                            <Link href="#" onClick={() => handleLinkClick(row.panImage)}>View PAN</Link>
                                        ) : (
                                            ''
                                        )}
                                       </StyledTableCell>
                                       <StyledTableCell> {row.aadharImage !== '' ? (
                                            <Link href="#" onClick={() => handleLinkClick(row.aadharImage)}>View AADHAR(Front)</Link>
                                        ) : (
                                            ''
                                        )}
                                       </StyledTableCell>
                                       <StyledTableCell> {row.aadharBackImage !== '' ? (
                                            <Link href="#" onClick={() => handleLinkClick(row.aadharBackImage)}>View AADHAR(Back)</Link>
                                        ) : (
                                            ''
                                        )}
                                       </StyledTableCell>
                                       <StyledTableCell> {row.checkbookImage !== '' ? (
                                            <Link href="#" onClick={() => handleLinkClick(row.checkbookImage)}>View CHECKBOOK</Link>
                                        ) : (
                                            ''
                                        )}
                                       </StyledTableCell>

                                        <StyledTableCell>{row.nominee_name}</StyledTableCell>
                                        <StyledTableCell>{row.nominee_relation}</StyledTableCell>
                                        <StyledTableCell>{row.nominee_aadhaar_no}</StyledTableCell>
                                        <StyledTableCell>{row.nominee_pan_no}</StyledTableCell>
                                        <StyledTableCell>{row.nominee_account_no}</StyledTableCell>
                                        <StyledTableCell>{row.precentage_of_transfer}</StyledTableCell>
                                        <StyledTableCell>{row.nominee_bank_name}</StyledTableCell>
                                        <StyledTableCell>{row.nominee_ifsc_code}</StyledTableCell>
                                        <StyledTableCell>{row.nominee_branch_name}</StyledTableCell>
                                        <StyledTableCell>{row.kyc_date}</StyledTableCell>
                                        <StyledTableCell>{row.modified_on}</StyledTableCell>

                                        <StyledTableCell style={{ color:row.status === 1 ? 'Green' : row.status === 2 ? 'Red' : 'Orange' }} > {row.status === 1 ? 'Approved' : row.status === 2 ? 'Rejected' : 'Pending'}</StyledTableCell>
                                        <StyledTableCell sx={{ '& button': { m: 1 } }}>
                                            <Link href={`/update-kyc/?id=${row.user_id}&kyc_id=${row.id}`}>
                                            <a>
                                                <Button variant="contained" size="small" color="success" style={{ fontWeight: 'bold' }}>Update</Button>
                                            </a>
                                            </Link>
                                        {row.status === 0 && (
                                            <>
                                            <Button variant="contained" size="small" color="success" onClick={() => handleOpenModal1(row.id,1)}>Approve</Button> 
                                            <Button variant="contained" size="small" color="error" onClick={()=> handleOpenModal2(row.id,2)}>Reject</Button>  
                                            
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
                                                     Are you sure to approve the KYC?
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
                                                     Are you sure to Reject Kyc request?
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
                                        <StyledTableCell>{row.rejection_reason}</StyledTableCell>
                                    </StyledTableRow>
                                  
                                )) : (
                                    
                                    <TableRow>
                                        <TableCell colSpan={27} component="th" scope="row">
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
export default KycTransactions;