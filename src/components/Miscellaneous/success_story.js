import { Box, Button,Divider,TextField, Container, Grid, Paper, Table, TableBody, StyledTableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, Link, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import * as React from 'react';
import api from "../../../utils/api";
import Cookies from "js-cookie";
import { ArrowBack } from "@mui/icons-material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';


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

      const handleOpenModal1 = (Id,status) => {
        setId(Id);
        setStatus(status);
        setOpenModal1(true);
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
      
        // let action='';
        //     if (status === 0) {
        //         action='Inactive';
        //     } else {
        //         action='Active';
        //   }
        
        // const requestData = {
        //   status: status,
        //   id: Id,
        //   action:action
        // };

       
        // try {
         
        //     const response = await api.post("/api/setting/get-setting", requestData);
              
        //     if (response.data.status === 200) {
        //         location.reload();
             
        //     }else{
        //        console.log('Failed to update status.');
                
        //     }

        // } catch (error) {
        //     console.error("Error:", error);
           
        // }
       
        handleCloseModal1();
        handleCloseModal2();
       

        
      };
      const handleLinkClick = (img) => {
        window.open(img, '_blank', 'noopener,noreferrer');
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

                        <Divider />
                        <Table aria-label="User Details" sx={{ size: 2 }} mt={2} stickyHeader>
                            <TableHead>
                                <TableRow>

                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Sr No.</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Person Name</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Story</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Banner/Image</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Link</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Address</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Entry date</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Action</StyledTableCell>
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
                                        <StyledTableCell>{row.person_name}</StyledTableCell>
                                        <StyledTableCell>{row.story}</StyledTableCell>
                                        <StyledTableCell> {row.image !== '' ? (
                                            <Link href="#" onClick={() => handleLinkClick(process.env.NEXT_PUBLIC_API_BASE_URL+'/'+row.image)}>View Image</Link>
                                        ) : (
                                            ''
                                        )}
                                       </StyledTableCell>
                                        <StyledTableCell>{row.link}</StyledTableCell>
                                        <StyledTableCell>{row.address}</StyledTableCell>
                                        <StyledTableCell>{row.entry_date}</StyledTableCell>
                                        <StyledTableCell sx={{ '& button': { m: 1 } }}>
                                            
                                            <Select
                                                    onChange={(event) => handleOptionChange(event, index)}
                                                    style={{'width': '100px'}}
                                                >
                                                    <MenuItem value="edit"><Link href={`/add-success-story/?id=${row.id}&action=edit`} style={{'text-decoration': 'none'}}>Edit</Link></MenuItem>
                                                </Select>
                                                                            
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
        </main>
    )
}
export default Transactions;