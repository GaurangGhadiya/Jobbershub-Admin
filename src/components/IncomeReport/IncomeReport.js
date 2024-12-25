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

const IncomeTransactions = ({ showServiceTrans }) => {

    const getDate = (timeZone) => {
        const dateString = timeZone;
        const dateObject = new Date(dateString);

        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, "0");
        const day = String(dateObject.getDate()).padStart(2, "0");
        const hours = String(dateObject.getHours()).padStart(2, "0");
        const minutes = String(dateObject.getMinutes()).padStart(2, "0");

        // Determine if it's AM or PM
        const amOrPm = hours >= 12 ? "PM" : "AM";

        // Convert hours to 12-hour format
        const formattedHours = hours % 12 === 0 ? "12" : String(hours % 12);

        const formattedDateTime = `${day}-${month}-${year} ${formattedHours}:${minutes} ${amOrPm}`;
        const from_date=`01-${month}-${year}`;
        const to_date=`${day}-${month}-${year}`;
        return formattedDateTime;
    };


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
    const [searchTerm, setSearchTerm] = useState('');

    const filteredRows = rows.filter(row => {
      return (
      (row.first_name && row.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (row.mlm_id && row.mlm_id.includes(searchTerm)) ||
      (row.mobile && row.mobile.includes(searchTerm)) ||
      (row.email && row.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (row.sub_type && row.sub_type.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (row.recharge_type && row.recharge_type.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (row.reference_no && row.reference_no.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (row.transaction_id && row.transaction_id.toLowerCase().includes(searchTerm.toLowerCase()))
      // Add conditions for other relevant columns
      );
  });


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

    const [from_date, setFromDate] = React.useState(dayjs(getDate.dateObject));
    const [to_date, setToDate] = React.useState(dayjs(getDate.dateObject));


    const [formattedDate, setFormattedDate] = useState('');

  
    const [openModal1, setOpenModal1] = React.useState(false);
    const [openModal2, setOpenModal2] = React.useState(false);
    const [openModal3, setOpenModal3] = React.useState(false);
    const [Id, setId] = React.useState(null);
    const [status, setStatus] = React.useState(null);
    // const [rejectionReason, setRejectionReason] = useState(null);

    const handleOpenModal1 = (Id,status) => {
        setId(Id);
        setStatus(status);
        setOpenModal1(true);
      };

      const handleOpenModal3 = (Id,status) => {
        setId(Id);
        setStatus(status);
        setOpenModal3(true);
      };
    
      const handleCloseModal1 = () => {
        setId(null);
        setStatus(null);
        setOpenModal1(false);
      };
    
      const handleOpenModal2 = (Id,status) => {
        setId(Id);
       
        setStatus(status);
        setOpenModal2(true);
      };
    
      const handleCloseModal2 = () => {
        setOpenModal2(false);
      };

      const handleCloseModal3 = () => {
        setOpenModal3(false);
      };

      const handleOKButtonClick = async () => {
        // alert(status);
        if (!Id) {
          console.error('Id is missing.');
          return;
        }
        let note = '';
        let action='';
        if (status === 0) {
            // note = 'Approve';
            action='Delete';
          } else if (status === 1) {
            // note = rejectionReason; 
            action='Resolve';
          } 
            else if (status === 3) {
            // note = rejectionReason; 
            action='Hold';
          } 
          else {
            // note='';
            action='Pending';
          }
        
        const requestData = {
          status: status,
        //   note: note,
          id: Id,
          action:action
        };

       
        try {

            const response = await api.post("/api/feedback/update-feedback", requestData);
              
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
        handleCloseModal3();
      };

    return (

        <main className="p-6 space-y-6">
            <Grid
                container
                spacing={4}
                sx={{ padding: '0px 16px' }}
            >
                <Grid item={true} xs={12}   >

                    <TableContainer component={Paper} className="table_container">
                        
                        <Table aria-label="Otp Report" stickyHeader>

                            <TableHead>
                                <TableRow>

                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Sl No.</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Registration Date</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>User Name</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>User. Id</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Mobile</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Transaction Id</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Type</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Transaction For</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Wallet</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Details</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Product and Category</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Level</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Opening Balance</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Credit</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Debit</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Closing Balance</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Income Date</StyledTableCell>
                                   
                                    
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
                                        <StyledTableCell>{row.registration_date}</StyledTableCell>
                                        <StyledTableCell>{row.name}</StyledTableCell> 
                                        <StyledTableCell>{row.mlm_id}</StyledTableCell>
                                        <StyledTableCell>{row.mobile}</StyledTableCell>
                                        <StyledTableCell>{row.transaction_id}</StyledTableCell>
                                        <StyledTableCell>{row.type}</StyledTableCell>
                                        <StyledTableCell>{row.tran_for}</StyledTableCell>
                                        <StyledTableCell>{row.sub_type}</StyledTableCell>
                                        <StyledTableCell>{row.details}</StyledTableCell>
                                        <StyledTableCell>{row.sub_type === 'Mobile' ? 'Mobile Recharge' : row.sub_type === 'Bill Payment' ? 'Bill Payment' : row.lead_name + '(' + row.category_name + ')'}</StyledTableCell>
                                        <StyledTableCell >{row.level}</StyledTableCell>
                                        <StyledTableCell>{row.opening_balance}</StyledTableCell>
                                        <StyledTableCell>{row.credit}</StyledTableCell>
                                        <StyledTableCell>{row.debit}</StyledTableCell>
                                        <StyledTableCell>{row.closing_balance}</StyledTableCell>
                                        <StyledTableCell >{row.income_date}</StyledTableCell>
                                            
                                            
                                        

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
export default IncomeTransactions;