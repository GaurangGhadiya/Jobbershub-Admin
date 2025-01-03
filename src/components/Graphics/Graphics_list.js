import { Box, Button,Divider,TextField, Container, Grid, Paper, Table, TableBody, StyledTableCell, TableContainer, TableHead, TablePagination, TableRow, Typography,Link } from "@mui/material";
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

const GraphicsTransactions = ({ showServiceTrans }) => {

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

    const [from_date, setFromDate] = React.useState(dayjs(getDate.dateObject));
    const [to_date, setToDate] = React.useState(dayjs(getDate.dateObject));
   
    const [formattedDate, setFormattedDate] = useState('');

    const [searchTerm, setSearchTerm] = useState('');

    const filteredRows = rows.filter(row => {
      return (
          (row.cat_group && row.cat_group.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (row.graphics_name && row.graphics_name.includes(searchTerm)) ||
          (row.category_name && row.category_name.includes(searchTerm)) 
        
        // Add conditions for other relevant columns
      );
  });
  const [openModal1, setOpenModal1] = React.useState(false);
  const [addMoneyReqId, setAddMoneyReqId] = React.useState(null);
  const [status, setStatus] = React.useState(null);

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

  
  const handleOKButtonClick = async () => {
    // alert(status);
    if (!addMoneyReqId) {
      console.error('addMoneyReqId is missing.');
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
        const response = await api.post("/api/graphics/update-graphics-status", requestData);
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
  };


     
     


    const handleLinkClick = (img) => {
      
        window.open(img, '_blank', 'noopener,noreferrer');
      };
    
    return (

        <main className="p-6 space-y-6">
            <Grid
                container
                spacing={4}
            >
                <Grid item={true} xs={12}   >
                    <TableContainer component={Paper} className="table_container" >
                        <Table aria-label="Banners Report" stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Sl No.</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Category Name</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Category Group</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Graphics Name</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Image</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Like Count</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold' }} nowrap>Share Count</StyledTableCell>
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
                                        <StyledTableCell>{row.category_name}</StyledTableCell> 
                                        <StyledTableCell>{row.cat_group}</StyledTableCell>
                                        <StyledTableCell>{row.graphics_name}</StyledTableCell>
                                        <StyledTableCell><Link href="#" onClick={() => handleLinkClick(row.image)}>View Image</Link></StyledTableCell>
                                        <StyledTableCell>{row.like_count}</StyledTableCell>
                                        <StyledTableCell>{row.share_count}</StyledTableCell>
                                        <StyledTableCell>{row.created_on}</StyledTableCell>
                                        <StyledTableCell style={{ color:row.status === 1 ? 'Green' : 'Red' }} > 
                                                         {row.status === 1 ? 'Active' : 
                                                        'Inactive' }
                                        </StyledTableCell>
                                        <StyledTableCell sx={{ '& button': { m: 1 } }}>
                                            <Link href={`/update-graphics/?id=${row.id}`}>
                                            <a>
                                                <Button variant="contained" size="small" color="success" style={{ fontWeight: 'bold' }}>Update</Button>
                                            </a>
                                            </Link>
                                            {row.status === 1 && (
                                            <>
                                            <Button variant="contained" size="small" color="error"  style={{ fontWeight: 'bold' }} onClick={() => handleOpenModal1(row.id,0)}>Delete</Button> 
                                            {/* <Button variant="contained" size="small" color="error" onClick={()=> handleOpenModal2(row.id,2)}>Reject</Button>   */}
                                            
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
                                                     Are you sure to Delete this post?
                                                    </Typography>
                                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}  alignItems={'center'} >
                                                        <Button variant="contained" size="large" color="success" onClick={handleOKButtonClick} sx={{ marginLeft: 12, marginLeft:20 }}>OK</Button>
                                                        
                                                    </Typography>
                                                  
                                                    </Box>
                                                </Modal>

                                                
                                          


                                        </StyledTableCell>

                                       
                                      
                                            
                                            
                                        

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
export default GraphicsTransactions;