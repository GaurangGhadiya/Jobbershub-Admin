import { Box, Button,Divider,TextField, Container, Grid, Paper, Table, TableBody, StyledTableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, Link,Menu,MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import * as React from 'react';
import Cookies from "js-cookie";
import { ArrowBack } from "@mui/icons-material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
// import Link from "next/link";
import api from "../../../utils/api";
import { relative } from "path";


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

    const [searchTerm, setSearchTerm] = useState('');

    const filteredRows = rows.filter(row => {
        return (
          (row.category_name && row.category_name.toLowerCase().includes(searchTerm.toLowerCase()))
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
      const [openModal3, setOpenModal3] = React.useState(false);
      const [status, setStatus] = React.useState(null);
      const [Id, setAddMoneyReqId] = React.useState(null);

      const handleOpenModal1 = (addMoneyReqId,status) => {
        setAddMoneyReqId(addMoneyReqId);
        setStatus(status);
        setOpenModal1(true);
      };
      const handleOpenModal2 = (addMoneyReqId,status) => {
        setAddMoneyReqId(addMoneyReqId);
        setStatus(status);
        setOpenModal2(true);
      };
      const handleOpenModal3 = (addMoneyReqId,status) => {
        setAddMoneyReqId(addMoneyReqId);
        setStatus(status);
        setOpenModal3(true);
      };
      const handleCloseModal1 = () => {
        setAddMoneyReqId(null);
        setStatus(null);
        setOpenModal1(false);
      };
      const handleCloseModal2 = () => {
        setAddMoneyReqId(null);
        setStatus(null);
        setOpenModal2(false);
      };
      const handleCloseModal3 = () => {
        setAddMoneyReqId(null);
        setStatus(null);
        setOpenModal3(false);
      };
      
      const handleOKButtonClick = async () => {
        // alert(status);
        if (!Id) {
          console.error('Id is missing.');
          return;
        }
      
        let action='';
            if (status === 0) {
                action='Delete';
            } else if(status === 1) {
                action='Active';
            }else if(status === 2) {
                action='Inactive';
            }
        
        const requestData = {
          status: status,
          video_id: Id,
          action:action
        };

        try {

            const response = await api.post("/api/miscellaneous/update-course-status", requestData);
              
            if (response.data.status === 200) {
                alert(`${action} successfully.`);
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

      const handleLinkClick = (img) => {
      
        window.open(img, '_blank', 'noopener,noreferrer');
      };

      const [selectedOption, setSelectedOption] = useState({});

      const handleOptionChange = (event, rowId) => {
        setSelectedOption((prevSelectedOption) => ({
          ...prevSelectedOption,
          [rowId]: event.target.value,
        }));
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
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Title</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Category Name</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Video Link</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Thumbnail Image</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Status</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Action</StyledTableCell>
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
                                        className="position-relative-row"
                                    >

                                        <StyledTableCell>{index + 1 + page * rowsPerPage}</StyledTableCell>
                                        <StyledTableCell>{row.title}</StyledTableCell>
                                        <StyledTableCell>{row.category_name}</StyledTableCell>
                                        <StyledTableCell>{row.video_link}</StyledTableCell>
                             
                                        <StyledTableCell> {row.img !== '' ? (
                                            <Link href="#" onClick={() => handleLinkClick(row.img)}>
                                                View Image
                                            </Link>
                                        ) : (
                                            ''
                                        )}
                                       </StyledTableCell>
                                       <StyledTableCell style={{ color:row.status === 1 ? 'Green' : 'Red' }} > 
                                                         {row.status === 1 ? 'Active' : 
                                                        'Inactive' }
                                        </StyledTableCell>

                                       <StyledTableCell sx={{ '& button': { m: 1 } }}>
                                                <Select
                                                        
                                                        onChange={(event) => handleOptionChange(event, index)}
                                                        style={{'width': '100px'}}
                                                    >
                                                        {/* <MenuItem value="active"><Link style={{'text-decoration': 'none'}}>Active</Link></MenuItem>
                                                        <MenuItem value="inactive"><Link style={{'text-decoration': 'none'}}>Inactive</Link></MenuItem> */}
                                                        <MenuItem value="edit"><Link href={`/edit-marketing-video/?id=${row.id}`} style={{'text-decoration': 'none'}}>Edit</Link></MenuItem>
                                                        <MenuItem value="delete"><Link style={{'text-decoration': 'none'}} onClick={() => handleOpenModal1(row.id, 0)}>Delete</Link></MenuItem>
                                                        
                                                    </Select>
                                                                                
                                            
                                                <Modal 
                                                    open={openModal1} 
                                                    onClose={handleCloseModal1}
                                                    aria-labelledby="modal-modal-title"
                                                    aria-describedby="modal-modal-description"
                                                >
                                                    <Box sx={style} alignItems={'center'}  justifyContent={'space-between'}>
                                                        <HelpOutlineOutlinedIcon sx={{ fontSize: 40 ,marginLeft:20}} color="warning" alignItems={'center'} />
                                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                                     Are you sure to Delete this Course ?
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
                                                     Are you sure to Inactive this Course ?
                                                    </Typography>
                                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}  alignItems={'center'} >
                                                        <Button variant="contained" size="large" color="success" onClick={handleOKButtonClick} sx={{ marginLeft: 12, marginLeft:20 }}>OK</Button>
                                                        
                                                    </Typography>
                                                  
                                                    </Box>
                                                </Modal>
                                                <Modal 
                                                    open={openModal3} 
                                                    onClose={handleCloseModal1}
                                                    aria-labelledby="modal-modal-title"
                                                    aria-describedby="modal-modal-description"
                                                >
                                                    <Box sx={style} alignItems={'center'}  justifyContent={'space-between'}>
                                                        <HelpOutlineOutlinedIcon sx={{ fontSize: 40 ,marginLeft:20}} color="warning" alignItems={'center'} />
                                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                                     Are you sure to Active this Course ?
                                                    </Typography>
                                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}  alignItems={'center'} >
                                                        <Button variant="contained" size="large" color="success" onClick={handleOKButtonClick} sx={{ marginLeft: 12, marginLeft:20 }}>OK</Button>
                                                        
                                                    </Typography>
                                                  
                                                    </Box>
                                                </Modal>
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