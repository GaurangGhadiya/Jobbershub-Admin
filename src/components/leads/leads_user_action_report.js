import { Box, Button,Divider,Modal, Grid, Paper, Table, TableBody, StyledTableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, Link, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import * as React from 'react';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import api from "../../../utils/api";

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
    // console.log(showServiceTrans);
    const rowsPerPageOptions = [5, 10, 25];

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [searchTerm, setSearchTerm] = useState('');

    // const filteredRows = rows.filter(row => {
    //     return (
    //       (row.first_name && row.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    //       (row.mlm_id && row.mlm_id.includes(searchTerm)) ||
    //       (row.mobile && row.mobile.includes(searchTerm)) ||
    //       (row.email && row.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    //       (row.ref_first_name && row.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    //       (row.ref_mlm_id && row.mlm_id.includes(searchTerm)) ||
    //       (row.ref_mobile && row.mobile.includes(searchTerm)) ||
    //       (row.ref_email && row.email.toLowerCase().includes(searchTerm.toLowerCase()))
    //       // Add conditions for other relevant columns
    //     );
    // });

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

      
      const handleLinkClick = (img) => {
        window.open(img, '_blank', 'noopener,noreferrer');
      };
    
      const [openModal1, setOpenModal1] = React.useState(false);
      const [openModal2, setOpenModal2] = React.useState(false);
      const [openModal3, setOpenModal3] = React.useState(false);


      const [Id, setId] = React.useState(null);
      const [status, setStatus] = React.useState(null);
      const [distribd_amount, setdistributed_amount] = useState(null);
      const [isButtonClicked, setIsButtonClicked] = useState(false);

      const handleOpenModal1 = (Id,status, distribd_amount) => {
        setId(Id);
        setStatus(status);
        setOpenModal1(true);
        setdistributed_amount(distribd_amount);
      };

      const handleOpenModal2 = (Id,status, distribd_amount) => {
        setId(Id);
        setStatus(status);
        setOpenModal2(true);
      };

      const handleOpenModal3 = (Id,status, distribd_amount) => {
        setId(Id);
        setStatus(status);
        setOpenModal3(true);
      };
    
      const handleCloseModal1 = () => {
        setOpenModal1(false);
      };

      const handleCloseModal2 = () => {
        setOpenModal2(false);
      };

      const handleCloseModal3 = () => {
        setOpenModal3(false);
      };

      const handleOKButtonClick = async () => {
        setIsButtonClicked(true);
        if (!Id) {
          console.error('Id is missing.');
          return;
        }

        let action = '';
        if(status === 2){
            action = 'Accept';
        }else if(status === 3){
            action = 'Hold';
        }else if(status === 4){
            action = 'Reject';
        }

        
        const requestData = {
          status: status,
          user_action_id: Id,
          action: action,
          distribd_amount: distribd_amount
        };

       
        try {
         
            const response = await api.post("/api/leads/update-user-action-status", requestData);
              
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
                        <Table aria-label="User Details" sx={{ size: 2 }} mt={2} stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Sr No.</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Name</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >User Id</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Mobile</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Product Name</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Product Category</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Primary Product Category</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Amount</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Total Earning</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Distribution Amount</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >created Date</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Status</StyledTableCell>
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
                                        <StyledTableCell>{row.first_name + ' ' + row.last_name}</StyledTableCell>
                                        <StyledTableCell>{row.mlm_id}</StyledTableCell>
                                        <StyledTableCell>{row.mobile}</StyledTableCell>
                                        <StyledTableCell>{row.lead_name}</StyledTableCell>
                                        <StyledTableCell>{row.category_name}</StyledTableCell>
                                        <StyledTableCell>{row.parent_category_name}</StyledTableCell>
                                        <StyledTableCell>{row.specification}</StyledTableCell>
                                        <StyledTableCell>{row.total_earning}</StyledTableCell>
                                        <StyledTableCell>{row.distributed_amount?row.distributed_amount:row.distribution_amount}</StyledTableCell>
                                        <StyledTableCell>{row.entry_date}</StyledTableCell>
                                        <StyledTableCell style={{ color:row.status === 1 ? 'Blue' : row.status === 2 ? 'Green' :  row.status === 3 ? 'Orange' : row.status === 4 ? 'Red':'Red'  }} > {row.status === 1 ? 'Pending' : row.status === 2 ? 'Accepted' :  row.status === 3 ? 'Hold' : row.status === 4 ? 'Rejected':'Inactive' }</StyledTableCell>
                                        
                                        <StyledTableCell sx={{ '& button': { m: 1 } }}>
                                        {(row.status === 1 && row.is_accepted == 0) ? (

                                            //onClick={() => handleOpenModal1(row.id, 1)}
                                            <>
                                            
                                                <Button variant="contained" size="small" color="success" 
                                                    style={{ fontWeight: 'bold' }}
                                                onClick={() => handleOpenModal1(row.id, 2, row.distributed_amount?row.distributed_amount:row.distribution_amount)} >
                                                Accept
                                                </Button>

                                                <Button variant="contained" size="small" color="warning" 
                                                    style={{ fontWeight: 'bold' }}
                                                onClick={() => handleOpenModal2(row.id, 3, null)} >
                                                Hold
                                                </Button>

                                                <Button variant="contained" size="small" color="error" 
                                                    style={{ fontWeight: 'bold' }}
                                                onClick={() => handleOpenModal3(row.id, 4, null)} >
                                                Reject
                                                </Button>
                                                
                                            </>
                                            ) : (
                                                <>

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
                                                    Are you sure you want to Accept this Product?
                                                </Typography>
                                                <TextField required size="normal"
                                                fullWidth label="Distributed Amount" 
                                                variant="outlined" display={'inline-block'}
                                                value={distribd_amount} 
                                                mr={3}
                                                onChange={(e) => setdistributed_amount(e.target.value)}  />
                                                <Typography id="modal-modal-description" sx={{ mt: 2 }}  alignItems={'center'} >
                                                {!isButtonClicked && (
                                                    <Button variant="contained" size="small" color="success" onClick={handleOKButtonClick} sx={{ marginLeft: 12, marginLeft:20 }}>OK</Button>
                                                )}
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
                                                Are you sure you want to Hold on this user request?
                                                </Typography>
                                                
                                                <Typography id="modal-modal-description" sx={{ mt: 2 }}  alignItems={'center'} >
                                                    <Button variant="contained" size="small"  onClick={handleOKButtonClick} sx={{ marginLeft: 12 ,marginLeft:20}}>OK</Button>
                                                    
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
                                                Are you sure you want to reject this user request?
                                                </Typography>
                                                
                                                <Typography id="modal-modal-description" sx={{ mt: 2 }}  alignItems={'center'} >
                                                    <Button variant="contained" size="small" color="error" onClick={handleOKButtonClick} sx={{ marginLeft: 12 ,marginLeft:20}}>OK</Button>
                                                    
                                                </Typography>
                                                
                                                </Box>
                                            </Modal>
                                        </StyledTableCell>

                                    </StyledTableRow >
                                )) : (

                                    <TableRow>
                                        <TableCell colSpan={15} component="th" scope="row">
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