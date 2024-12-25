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
import Image from 'next/image';

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
          id: Id,
          action:action
        };

        try {

            const response = await api.post("/api/leads/update-status-category", requestData);
              
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
      
        window.open(process.env.NEXT_PUBLIC_API_BASE_URL +'/'+img, '_blank', 'noopener,noreferrer');
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
            >
                <Grid item={true} xs={12}   >
                    <TableContainer component={Paper} className="table_container">
                        <Divider />
                        <Table aria-label="User Details" sx={{ size: 2 }} mt={2} stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Sr No.</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Category Name</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Parent Category</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Discount Upto</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Category Image</StyledTableCell>
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
                                        <StyledTableCell>{row.category_name}</StyledTableCell>
                                        <StyledTableCell>{row.parent_category}</StyledTableCell>
                                        <StyledTableCell>{row.discount_upto}</StyledTableCell>
                                        <StyledTableCell>{row.category_image !== '' ? (<Link href="#" onClick={() => handleLinkClick(row.category_image)}><Image
                                                src={row.category_image}
                                                alt="Category Image"
                                                width={300}
                                                height={200}
                                            />
                                            </Link>
                                            ) : (
                                                ''
                                            )}
                                        </StyledTableCell>
                                        {/* <StyledTableCell> {row.category_image !== '' ? (
                                            <Link href="#" onClick={() => handleLinkClick(row.category_image)}>
                                                View Image
                                            </Link>
                                        ) : (
                                            ''
                                        )}
                                       </StyledTableCell> */}
                                       <StyledTableCell sx={{ '& button': { m: 1 } }}>
                                            {/* <div className="row-content">

                                                <Button variant="outlined" color="inherit" size="small" onClick={(event) => handleMenuClick(event, row.id)}>...</Button>
                                            </div>
                                                
                                                <div
                                                    onClose={handleClose}
                                                    rowEl={rowEl && rowEl[row.id]}
                                                    open={Boolean(rowEl && rowEl[row.id])}
                                                    anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right', // Adjust as needed
                                                    }}
                                                    transformOrigin={{
                                                    vertical: 'inherit',
                                                    horizontal: 'inherit', // Adjust as needed
                                                    }}
                                                >
                                                    <p onClick={handleClose}><Link style={{'text-decoration': 'none'}}>Active</Link></p>
                                                    <p onClick={handleClose}><Link style={{'text-decoration': 'none'}}>Inactive</Link></p>
                                                    <p ><Link href={`/edit-leads-category/?id=${row.id}`} style={{'text-decoration': 'none'}}>
                                                    Edit
                                                    </Link></p>
                                                    <p onClick={() => handleOpenModal1(row.id, 0)}><Link style={{'text-decoration': 'none'}}>Delete</Link></p>
                                                </div> */}

                                                <Select
                                                        
                                                        onChange={(event) => handleOptionChange(event, index)}
                                                        style={{'width': '100px'}}
                                                    >
                                                        <MenuItem value="active"><Link style={{'text-decoration': 'none'}} onClick={() => handleOpenModal3(row.id, 1)}>Active</Link></MenuItem>
                                                        <MenuItem value="inactive"><Link style={{'text-decoration': 'none'}} onClick={() => handleOpenModal2(row.id, 2)}>Inactive</Link></MenuItem>
                                                        <MenuItem value="edit"><Link href={`/edit-leads-category/?id=${row.id}`} style={{'text-decoration': 'none'}}>Edit</Link></MenuItem>
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
                                                     Are you sure to Delete this category ?
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
                                                     Are you sure to Inactive this category ?
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
                                                     Are you sure to Active this category ?
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