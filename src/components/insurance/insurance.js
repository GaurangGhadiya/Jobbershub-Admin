import { Box, Button,Divider,TextField, Container, Grid, Paper, Table, TableBody, StyledTableCell, TableContainer, TableHead, TablePagination, TableRow, Typography ,Link} from "@mui/material";
import { useEffect, useState } from "react";
import * as React from 'react';
import api from "../../../utils/api";
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
      const [isButtonClicked, setIsButtonClicked] = useState(false);

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
        setIsButtonClicked(true);
        if (!Id) {
          console.error('Id is missing.');
          return;
        }
      
        let action='';
            if (status === 1) {
                action='Accept';
            } else {
                action='Reject';
          }
        
        const requestData = {
          status: status,
          insurance_id: Id,
          action: action,
          reason: rejectionReason
        };

       
        try {
         
            const response = await api.post("/api/report/update-insurance", requestData);
              
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
      const filteredRows = rows.filter(row => {
        return (
            (row.first_name && row.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (row.last_name && row.last_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (row.mlm_id && row.mlm_id.includes(searchTerm)) ||
            (row.mobile && row.mobile.includes(searchTerm)) ||
            (row.email && row.email.includes(searchTerm)) ||
            (row.ins_no && row.ins_no.includes(searchTerm)) ||
            (row.ins_type && row.ins_type.includes(searchTerm)) 
            // Add conditions for other relevant columns
        );
    });

    return (
        <main className="p-6 space-y-6">
            <Grid
                container
                spacing={4}
                sx={{ padding: '0px 16px' }}
            >
                <Grid item={true} xs={12}   >


                    <TableContainer component={Paper} className="table_container">
                        
                        <Table aria-label="User Details" sx={{ size: 2 }} mt={2} stickyHeader>
                            <TableHead>
                                <TableRow>

                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Sr No.</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Lead Date</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Lead No.</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >User name</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >User Id</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Mobile number</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Email</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Lead Type</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Category</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Product</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Distribution Amount</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Status</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Reject Reason</StyledTableCell>
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
                                    >

                                        <StyledTableCell>{index + 1 + page * rowsPerPage}</StyledTableCell>
                                        <StyledTableCell>{row.entry_date}</StyledTableCell>
                                        <StyledTableCell>{row.ins_no}</StyledTableCell>
                                        <StyledTableCell>{row.first_name + ' ' + row.last_name}</StyledTableCell>
                                        <StyledTableCell>{row.mlm_id}</StyledTableCell>
                                        <StyledTableCell>{row.mobile}</StyledTableCell>
                                        <StyledTableCell>{row.email}</StyledTableCell>
                                        <StyledTableCell>{row.ins_type}</StyledTableCell>
                                        <StyledTableCell>{row.category_name}</StyledTableCell>
                                        <StyledTableCell>{row.lead_name}</StyledTableCell>
                                        <StyledTableCell>{row.distribution_amount}</StyledTableCell>
                                        <StyledTableCell style={{ color:row.action_status === 0 ? 'Blue' : row.action_status === 1 ? 'Green' :  row.action_status === 2 ? 'Red' :'Orange'  }} > {row.action_status === 0 ? 'Pending' : row.action_status === 1 ? 'Accepted' :  row.action_status === 2 ? 'Rejected':'' }</StyledTableCell>
                                        <StyledTableCell>{row.reason}</StyledTableCell>
                                        <StyledTableCell sx={{ '& button': { m: 1 } }} style={{whiteSpace: 'nowrap' }} >

                                            <Link href={`/view-insurance-details/?id=${row.id}`}>
                                            <a>
                                                <Button variant="contained" size="small" color="primary" style={{ fontWeight: 'bold' }}>View</Button>
                                            </a>
                                            </Link>

                                            {(row.status === 1 && row.action_status == 0) ? (

                                                //onClick={() => handleOpenModal1(row.id, 1)}
                                                <>

                                                    <Button variant="contained" size="small" color="success" 
                                                        style={{ fontWeight: 'bold' }}
                                                    onClick={() => handleOpenModal1(row.id, 1)} >
                                                    Accept
                                                    </Button>

                                                    <Button variant="contained" size="small" color="error" 
                                                        style={{ fontWeight: 'bold' }}
                                                    onClick={() => handleOpenModal2(row.id, 2)} >
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
                                                        Are you sure you want to Accept?
                                                    </Typography>
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
                                                    Are you sure you want to reject?
                                                    </Typography>
                                                    <TextField required size="normal"
                                                        fullWidth label="Reject Reson" 
                                                        variant="outlined" display={'inline-block'}
                                                        value={rejectionReason} 
                                                        mr={3}
                                                        onChange={(e) => handleTextareaChange(e.target.value)}  />
                                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}  alignItems={'center'} >
                                                        <Button variant="contained" size="small" color="error" onClick={handleOKButtonClick} sx={{ marginLeft: 12 ,marginLeft:20}}>OK</Button>
                                                        
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