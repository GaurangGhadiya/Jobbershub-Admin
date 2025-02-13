import { Box, Button,Divider,TextField, Container, Grid, Paper, Table, TableBody, StyledTableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import * as React from 'react';
import api from "../../../../utils/api";
import Cookies from "js-cookie";
import { ArrowBack } from "@mui/icons-material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';


const CreditTransactions = ({ showServiceTrans }) => {
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
          (row.recharge_type && row.recharge_type.toLowerCase().includes(searchTerm.toLowerCase()))
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
      
      
      

    return (
        <main className="p-6 space-y-6">
            <Grid
                container
                spacing={4}
            >
                <Grid item={true} xs={12}   >
                    <TableContainer component={Paper} exportButton={true} style={{height: '450px'}}>
                        <Divider />
                        <Table aria-label="User Transaction Summary Table" exportButton={true} stickyHeader>
                            <TableHead>
                                <TableRow>

                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Sl No.</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>User Name</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>MR. Id</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Mobile No.</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Email</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Wallet Type</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Transaction Type</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Transaction Id</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Amount</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Date</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Discription</StyledTableCell>
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
                                        <StyledTableCell>{row.first_name + ' ' + (row.last_name?row.last_name:'')}</StyledTableCell>
                                        <StyledTableCell>{row.mlm_id}</StyledTableCell>
                                        <StyledTableCell>{row.mobile}</StyledTableCell>
                                        <StyledTableCell>{row.email}</StyledTableCell>
                                        <StyledTableCell>{row.wallet_type}</StyledTableCell>
                                        <StyledTableCell>{row.transaction_type}</StyledTableCell>
                                        <StyledTableCell>{row.transaction_id}</StyledTableCell>
                                        <StyledTableCell>{row.amount}</StyledTableCell>
                                        <StyledTableCell>{row.entry_date}</StyledTableCell>
                                        <StyledTableCell>{row.details}</StyledTableCell>
                                        
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
export default CreditTransactions;