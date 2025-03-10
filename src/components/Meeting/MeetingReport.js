import { Box, Button,Divider,TextField, Container, Grid, Paper, Table, TableBody, StyledTableCell, TableContainer, TableHead, Link,TablePagination, TableRow, Typography } from "@mui/material";
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

import Modal from '@mui/material/Modal';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import AddIcon from '@mui/icons-material/Add';
 
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

const MeetingTransactions = ({ showServiceTrans }) => {

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


    const onPageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
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

  
    const handleLinkClick = (img) => {
        window.open(img, '_blank', 'noopener,noreferrer');
    };

    const [openModal1, setOpenModal1] = React.useState(false);
    const [openModal2, setOpenModal2] = React.useState(false);
    const [openModal3, setOpenModal3] = React.useState(false);
    const [Id, setId] = React.useState(null);
    const [status, setStatus] = React.useState(null);

    const handleCloseModal1 = () => {
        setId(null);
        setStatus(null);
        setOpenModal1(false);
    };
    
    const handleOpenModal1 = (Id,status) => {
        setId(Id);
        setStatus(status);
        setOpenModal1(true);
      };
      const handleCloseModal2 = () => {
        setId(null);
        setStatus(null);
        setOpenModal2(false);
    };
    
    const handleOpenModal2 = (Id,status) => {
        setId(Id);
        setStatus(status);
        setOpenModal2(true);
      };


      const handleCloseModal3 = () => {
        setId(null);
        setStatus(null);
        setOpenModal2(false);
    };
    
    const handleOpenModal3 = (Id,status) => {
        setId(Id);
        setStatus(status);
        setOpenModal3(true);
      };
    

    const handleOKButtonClick = async () => {
        

        if (!Id) {
          console.error('Id is missing.');
          return;
        }
       
        // let note = '';
        // let action='';
        // if (status === 1) {
        //     note = 'Approve';
        //     action='Approve';
        //   } else if (status === 2) {
        //     note = rejectionReason; // Use the rejectionReason state
        //     action='Reject';
        //   } else {
        //     note='';
        //     action='';
        //   }
        
        const requestData = {
          status: status,
          meeting_id: Id
        };

       
        try {

            const response = await api.post("/api/meeting/update-meeting-status", requestData); 
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
            >
                <Grid item={true} xs={12}   >
                    
                            

                    <TableContainer component={Paper} className="table_container">

                        <Table aria-label="Meeting Report" stickyHeader>

                            <TableHead>
                                <TableRow>
                            
    
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Sl No.</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Meeting Name</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Description</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Meeting Date</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Meeting Time</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Meeting End Date</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Meeting End Time</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Image</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Link</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Created Date</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Status</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Action</StyledTableCell>
                                   
                                    
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
                                        <StyledTableCell>{row.name}</StyledTableCell> 
                                        <StyledTableCell>{row.description}</StyledTableCell>
                                        <StyledTableCell>{row.meeting_date_f}</StyledTableCell>
                                        <StyledTableCell>{row.meeting_time}</StyledTableCell>
                                        <StyledTableCell>{row.emeeting_date_f}</StyledTableCell>
                                        <StyledTableCell>{row.emeeting_time}</StyledTableCell>

                                        <StyledTableCell><Link href="#" onClick={() => handleLinkClick(row.image)}>View Image</Link></StyledTableCell>
                                        <StyledTableCell><Link href="#" onClick={() => handleLinkClick(row.meeting_link)}>View Link</Link></StyledTableCell>    
                                        <StyledTableCell>{row.created_on}</StyledTableCell>
                                        <StyledTableCell style={{ color:row.status === 1 ? 'Green' : row.status === 2 ? 'Warning' : 'Red' }} > 
                                                         {row.status === 1 ? 'Active' :  row.status === 2 ? 'Inactive':
                                                        'Delete' }
                                        </StyledTableCell>
                                       
                                        <StyledTableCell sx={{ '& button': { m: 1 } }}>
                                         
                                                                                {
                                            row.status === 1 ? (
                                                <>
                                                <Link href={`/update-meeting/?id=${row.id}`}>
                                                        <a>
                                                            <Button 
                                                                variant="contained" 
                                                                size="small" 
                                                                color="success" 
                                                                style={{ fontWeight: 'bold' }}
                                                            >
                                                                Update
                                                            </Button>
                                                        </a>
                                                    </Link>
                                                  
                                                    <Button 
                                                        variant="contained" 
                                                        size="small" 
                                                        color="warning" 
                                                        style={{ fontWeight: 'bold' }}
                                                        onClick={() => handleOpenModal2(row.id, 2)}
                                                    >
                                                        Inactive
                                                    </Button>

                                                    <Button 
                                                        variant="contained" 
                                                        size="small" 
                                                        color="error" 
                                                        style={{ fontWeight: 'bold' }}
                                                        onClick={() => handleOpenModal1(row.id, 0)}
                                                    >
                                                        Delete
                                                    </Button>
                                                    
                                                </>
                                            ) : row.status === 2 ? (
                                                <>
                                                  <Link href={`/update-meeting/?id=${row.id}`}>
                                                        <a>
                                                            <Button 
                                                                variant="contained" 
                                                                size="small" 
                                                                color="success" 
                                                                style={{ fontWeight: 'bold' }}
                                                            >
                                                                Update
                                                            </Button>
                                                        </a>
                                                    </Link>
                                                    <Button 
                                                        variant="contained" 
                                                        size="small" 
                                                        color="success" 
                                                        style={{ fontWeight: 'bold' }}
                                                        onClick={() => handleOpenModal3(row.id, 1)}
                                                    >
                                                        Active
                                                    </Button>
                                                    <Button 
                                                        variant="contained" 
                                                        size="small" 
                                                        color="error" 
                                                        style={{ fontWeight: 'bold' }}
                                                        onClick={() => handleOpenModal1(row.id, 0)}
                                                    >
                                                        Delete
                                                    </Button>
                                                   
                                                  
                                                </>
                                            ) : null
                                        }


                                            <Modal 
                                                    open={openModal1} 
                                                    onClose={handleCloseModal1}
                                                    aria-labelledby="modal-modal-title"
                                                    aria-describedby="modal-modal-description"
                                                >
                                                    <Box sx={style} alignItems={'center'}  justifyContent={'space-between'}>
                                                        <HelpOutlineOutlinedIcon sx={{ fontSize: 40 ,marginLeft:20}} color="warning" alignItems={'center'} />
                                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                                     Are you sure you want to Delete this Meeting?
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
                                                    Are you sure you want to inactive this Meeting?
                                                    </Typography>
                                                   
                                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}  alignItems={'center'} >
                                                        <Button variant="contained" size="large" color="success" onClick={handleOKButtonClick} sx={{ marginLeft: 12 ,marginLeft:20}}>OK</Button>
                                                        
                                                    </Typography>
                                                  
                                                    </Box>
                                                </Modal>

                                                <Modal
                                                    open={openModal3} 
                                                    onClose={handleCloseModal3}
                                                    aria-labelledby="modal-modal-title"
                                                    aria-describedby="modal-modal-description"
                                                >
                                                    <Box sx={style} alignItems={'center'}  justifyContent={'space-between'}>
                                                        <HelpOutlineOutlinedIcon sx={{ fontSize: 40 ,marginLeft:20}} color="warning" alignItems={'center'} />
                                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                                    Are you sure you want to Active this Meeting?
                                                    </Typography>
                                                   
                                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}  alignItems={'center'} >
                                                        <Button variant="contained" size="large" color="success" onClick={handleOKButtonClick} sx={{ marginLeft: 12 ,marginLeft:20}}>OK</Button>
                                                        
                                                    </Typography>
                                                  
                                                    </Box>
                                                </Modal>

                                        </StyledTableCell>
                                            
                                            
                                        

                                    </StyledTableRow>
                                  
                                )) : (
                                    
                                    <TableRow>
                                        <TableCell colSpan={12} component="th" scope="row">
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
export default MeetingTransactions;