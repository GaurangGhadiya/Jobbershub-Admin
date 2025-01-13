import { Box, Button,Divider,TextField, Container, Grid, Paper, Table, TableBody, StyledTableCell, TableContainer, TableHead, TablePagination, TableRow, Typography ,Link} from "@mui/material";
import { useEffect, useState } from "react";
import * as React from 'react';
import api from "../../../../utils/api";
import Cookies from "js-cookie";
import { ArrowBack } from "@mui/icons-material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
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
    const [rowsPerPage, setRowsPerPage] = useState(100);

    const [searchTerm, setSearchTerm] = useState('');

    const filteredRows = rows.filter(row => {
        return (
          (row.first_name && row.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (row.mlm_id && row.mlm_id.includes(searchTerm)) ||
          (row.mobile && row.mobile.includes(searchTerm)) ||
          (row.email && row.email.includes(searchTerm)) ||
          (row.ref_first_name && row.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (row.ref_mlm_id && row.mlm_id.includes(searchTerm)) ||
          (row.ref_mobile && row.mobile.includes(searchTerm)) ||
          (row.ref_email && row.email.includes(searchTerm))
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

      const [openModal1, setOpenModal1] = React.useState(false);
      const [openModal2, setOpenModal2] = React.useState(false);
      const [Id, setId] = React.useState(null);
      const [status, setStatus] = React.useState(null);
      const [rejectionReason, setRejectionReason] = useState(null);

      const handleOpenModal1 = (Id,status) => {
        setId(Id);
        setStatus(status);
        setOpenModal1(true);
      };

      const handleTextareaChange = (event) => {
        setRejectionReason(event.target.value);
      };

      const handleOpenModal2 = (Id,status) => {
        setId(Id);
        setStatus(status);
        setOpenModal2(true);
      };
    
      const handleCloseModal1 = () => {
        setOpenModal1(false);
      };

      const handleCloseModal2 = () => {
        setOpenModal2(false);
      };
      const handleOKButtonClick = async () => {
        // alert(status);
        if (!Id) {
          console.error('Id is missing.');
          return;
        }
      
        let action='';
            if (status === 0) {
                action='Inactive';
            } else {
                action='Active';
          }
        
        const requestData = {
          status: status,
          id: Id,
          action:action,
          reason:rejectionReason
        };

       
        try {
         
            const response = await api.post("/api/users/update-user-status", requestData);
              
            if (response.data.status === 200) {
                alert(response.data.message);
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
                    <TableContainer component={Paper}  className="table_container">
                        <Table aria-label="User Details" sx={{ size: 2 }} mt={2} stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Sr No.</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Registration Date</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >User name</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >User Id</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Mobile number</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Email</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Education</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Profession</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Exprience</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Experience Fields</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Monthly Earning(Previous)</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Monthly Earning(Expected)</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Having Two Wheeler</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Vehicle No. & Budget</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Having Car</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Car Vehicle No. & Budget</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Own House & Budget</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >State</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >City</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Marital Status</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Having Child</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Insurance</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Mutual Fund(SIP)</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Amount Investment</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Target Wealth</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Status</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Activation Date</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Instagram Id</StyledTableCell>
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
                                        <StyledTableCell>{row.joining_date}</StyledTableCell>
                                        <StyledTableCell>{row.first_name + ' ' + row.last_name}</StyledTableCell>
                                        <StyledTableCell>{row.mlm_id}</StyledTableCell>
                                        <StyledTableCell>{row.mobile}</StyledTableCell>
                                        <StyledTableCell>{row.email}</StyledTableCell>
                                        <StyledTableCell>{row.education }</StyledTableCell>
                                        <StyledTableCell>{row.profession}</StyledTableCell>
                                        <StyledTableCell>{row.product_selling_exprience}</StyledTableCell>
                                        <StyledTableCell>
                                        {row.experience_fields != null && Array.isArray(row.experience_fields)
                                            ? row.experience_fields.map(item => item.title).join(', ')
                                            : ''}
                                        </StyledTableCell>
                                        <StyledTableCell>{row.previous_monthly_earning}</StyledTableCell>
                                        <StyledTableCell>{row.expected_monthly_earning}</StyledTableCell>
                                        <StyledTableCell>{row.having_two_wheeler === 1? 'Yes' : 'No'}</StyledTableCell>
                                        <StyledTableCell>{row.vehicle_no + ' | ' + row.vehicle_budget}</StyledTableCell>
                                        <StyledTableCell >{row.having_car == "1"? 'Yes' : 'No'}</StyledTableCell>
                                        <StyledTableCell>{row.car_vehicle_no + ' | ' + row.car_purchase_budget}</StyledTableCell>
                                        <StyledTableCell >{row.own_house == "1"? 'Yes' : 'No' + ' | ' + row.house_budget}</StyledTableCell>
                                        <StyledTableCell>{row.state}</StyledTableCell>
                                        <StyledTableCell>{row.city}</StyledTableCell>
                                        <StyledTableCell >{row.married == "1"? 'Yes' : 'No'}</StyledTableCell>
                                        <StyledTableCell >{row.child == "1"? 'Yes' : 'No'}</StyledTableCell>
                                        <StyledTableCell>
                                        {row.insurance != null && Array.isArray(row.insurance)
                                            ? row.insurance.map(item => item.title).join(', ')
                                            : ''}
                                        </StyledTableCell>
                                        <StyledTableCell >{row.sip_mutual_fund == "1"? 'Yes' : 'No'}</StyledTableCell>
                                        <StyledTableCell>{row.amount_investment}</StyledTableCell>
                                        <StyledTableCell>{row.target_wealth}</StyledTableCell>
                                        <StyledTableCell>{row.user_status}</StyledTableCell>
                                        <StyledTableCell>{row.activation_date}</StyledTableCell>
                                        <StyledTableCell>{row.instagram_id}</StyledTableCell>

                                    </StyledTableRow >
                                )) : (

                                    <TableRow>
                                        <TableCell colSpan={30} component="th" scope="row">
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
export default Transactions;