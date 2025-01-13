import { Box, Button,Divider,TextField, Container, Grid, Paper,selectedRow , Table, TableBody, StyledTableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, Link } from "@mui/material";
import { useEffect, useState } from "react";
import * as React from 'react';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import AddVendorForm  from '@/components/userManagement/update-role'; 


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

    console.log(rows);

    const rowsPerPageOptions = [5, 10, 25];

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openForm, setOpenForm] = useState(false);

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

      const handleOpenForm = () => setOpenForm(true);
      const handleCloseForm = () => setOpenForm(false);

    return (
        <main className="p-6 space-y-6">
            <Grid
                container
                spacing={4}
                sx={{ padding: '0px 16px' }}
            >
                <Grid item={true} xs={12}   >


                    <TableContainer component={Paper} >    

                        <Divider />
                        <Table aria-label="User Details" sx={{ size: 2 }} mt={2}>
                            <TableHead>
                                <TableRow>

                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Sr No.</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Assets id  </StyledTableCell>
                                   
                                   
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Employee Id</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Assets Name  </StyledTableCell>
                                   
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Model No</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >EMEI  </StyledTableCell>
                                   
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >assetno</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Handover Date</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Handover Person  </StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Action  </StyledTableCell>
                                   
                              
                              
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
                                        <StyledTableCell>{row.asset_id}</StyledTableCell>

                                        <StyledTableCell>{row.employee_id}</StyledTableCell>
                                        <StyledTableCell>{row.assetname}</StyledTableCell>
                                        <StyledTableCell>{row.modelno}</StyledTableCell>
                                        <StyledTableCell>{row.emei}</StyledTableCell>
                                        <StyledTableCell>{row.assetno}</StyledTableCell>
                                        <StyledTableCell>{row.hand_over_date}</StyledTableCell>
                                        <StyledTableCell>{row.hand_over_person}</StyledTableCell>
                                       
                                        <StyledTableCell sx={{ '& button': { m: 1 } }} style={{whiteSpace: 'nowrap' }} >
                                           

                                            
                                                <Button variant="contained" size="small" color="success" style={{ fontWeight: 'bold' }} onClick={handleOpenForm}>Update</Button>
                                            
                                            <Button variant="contained" size="small" color="error"
                                                    style={{ fontWeight: 'bold' }}
                                                    onClick={() => handleOpenModal3(row.id, 0)}>
                                                        Delete
                                                </Button>
                                           
                                        </StyledTableCell>

                                    </StyledTableRow >
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
            <AddVendorForm 
                open={openForm} 
                onClose={handleCloseForm} 
                initialData={selectedRow} // Pass selected row data
            />
        </main>
    )
}
export default Transactions;