import { Box, Button,Divider,TextField, Container, Grid, Paper, Table,Menu, MenuItem, ListItemIcon, ListItemText, IconButton, TableBody, StyledTableCell, TableContainer, TableHead, TablePagination, TableRow, Typography ,Link} from "@mui/material";
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
import { useRouter } from 'next/router';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit'; // For 'Update' option
import CreditScoreIcon from '@mui/icons-material/CreditScore'; // For 'Income Credit'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // For 'Activate'
import CancelIcon from '@mui/icons-material/Cancel'; // For 'Deactivate'



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

const Transactions = ({ showServiceTrans}) => {
    const router = useRouter(); 
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

    const filteredRows = rows
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        //setPage(1);
    };

    const onPageChange = (event, newPage) => {
        //console.log(newPage);
        setPage(newPage);

        //router.push(`/user-details?page=${newPage}`); // Update the URL with the new page number
    };

    

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: '#ccc',
          color: theme.palette.common.black,
          fontSize: 12,
          linHeight: 15,
          padding: 7,
          borderRight: "1px solid rgba(224, 224, 224, 1)",
          position: 'relative'
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
      const [buttonHidden, setButtonHidden] = useState(false);

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
        setButtonHidden(true);
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

     
      const [menuVisible, setMenuVisible] = useState(false);
      const [selectedUser, setSelectedUser] = useState(null);
    
      const handleMenuOpen = (user) => {
        setMenuVisible(true);
        setSelectedUser(user);
      };
    
      const handleMenuClose = () => {
        setMenuVisible(false);
        setSelectedUser(null);
      };
  
    
      const handleEdit = () => {
        console.log('Edit action for:', selectedUser);
        handleMenuClose();
      };
    
      const handleUpdate = () => {
        console.log('Update action for:', selectedUser);
        handleMenuClose();
      };
    
      const handleDelete = () => {
        console.log('Delete action for:', selectedUser);
        handleMenuClose();
      };


    return (
        <main className="p-6 space-y-6">
            <Grid
                container
                spacing={0}
            >
                <Grid item={true} xs={12}   >


                    <TableContainer component={Paper} className="table_container">
                        
                        <Table aria-label="User Details" sx={{ size: 2 }} mt={2} stickyHeader>
                            <TableHead>
                                <TableRow>

                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Sr No.</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Onboarding Date</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Employee Name</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Employee Id</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} > Personal Mobile Number</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Company Mobile number</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Personal Email Id</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Company Email Id</StyledTableCell>
                                    {/* <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Referral name</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Referral Id</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Referral Mobile</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Referral Email</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Referral Plan</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >City</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >State</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Pincode</StyledTableCell> */}

                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Birth Date</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Blood Group</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >10th Mark</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Final Qualification</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Last Job Company Name</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Temporary Address</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Permanant Address</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Employee Role</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Offered Salary</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Company Name</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Department</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Reporting To</StyledTableCell>
                                   
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Level In Company</StyledTableCell>
                                   
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Allocated States</StyledTableCell>
                                   
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Allocated District</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Allocated Taluka</StyledTableCell>
                                   
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Annual KPI</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Monthly KPI</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Registration Date & Time</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Termination Date & Time</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Employee Status</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Reason</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Action</StyledTableCell>
                                    <StyledTableCell style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >Onboarded by</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {showServiceTrans.length > 0 ? (rowsPerPage > 0
                                    ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : filteredRows
                                ).map((row, index) => (

                                    <StyledTableRow 
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >

                                        <StyledTableCell>{index + 1 + (page * rowsPerPage)}</StyledTableCell>
                                        {/* Actions to manage user */}
                                     
                                        <StyledTableCell>{row.entry_date}</StyledTableCell>
                                        <StyledTableCell>{row.first_name}</StyledTableCell>
                                        <StyledTableCell>{row.employee_code}</StyledTableCell>
                                        <StyledTableCell>{row.mobile}</StyledTableCell>
                                        <StyledTableCell>{row.company_mobile_number}</StyledTableCell>
                                        <StyledTableCell>{row.email}</StyledTableCell>
                                        {/* <StyledTableCell>{row.ref_first_name + ' ' + row.ref_last_name}</StyledTableCell>
                                        <StyledTableCell>{row.ref_mlm_id}</StyledTableCell>
                                        <StyledTableCell>{row.ref_mobile}</StyledTableCell>
                                        <StyledTableCell>{row.ref_email}</StyledTableCell>
                                        <StyledTableCell>{row.ref_plan_name ? row.ref_plan_name + '('+ row.ref_plan_amount+')': ''}</StyledTableCell>
                                        <StyledTableCell>{row.circle}</StyledTableCell>
                                        <StyledTableCell>{row.region}</StyledTableCell>
                                        <StyledTableCell>{row.pincode}</StyledTableCell> */}

                                        <StyledTableCell style={{ textAlign: 'center' }}>{row.company_email}</StyledTableCell>
                                        <StyledTableCell style={{ textAlign: 'center' }}>{row.birth_date}</StyledTableCell>
                                        <StyledTableCell style={{ textAlign: 'center' }}>{row.blood_group}</StyledTableCell>

                                        <StyledTableCell style={{ textAlign: 'center' }}>{row.tenth_marks}</StyledTableCell>
                                        <StyledTableCell style={{ textAlign: 'center' }}>{row.final_qualification}</StyledTableCell>
                                        <StyledTableCell style={{ textAlign: 'center' }}>{row.last_job_company_name}</StyledTableCell>
                                        <StyledTableCell style={{ textAlign: 'center' }}>{row.temporary_detail_address}</StyledTableCell>
                                        <StyledTableCell style={{ textAlign: 'center' }}>{row.address}</StyledTableCell>
                                        <StyledTableCell style={{ textAlign: 'center' }}>{row.role_name}</StyledTableCell>
                                        <StyledTableCell style={{ textAlign: 'center' }}>{row.offered_salary}</StyledTableCell>
                                        <StyledTableCell style={{ textAlign: 'center' }}>{row.company_name}</StyledTableCell>
                                        <StyledTableCell style={{ textAlign: 'center' }}>{row.department_name}</StyledTableCell>
                                        <StyledTableCell style={{ textAlign: 'center' }}>{row.reporting_name}</StyledTableCell>
                                        <StyledTableCell style={{ textAlign: 'center' }}>{row.designation_name}</StyledTableCell>
                                        <StyledTableCell style={{ textAlign: 'center' }}>{row.allocated_state}</StyledTableCell>
                                        <StyledTableCell style={{ textAlign: 'center' }}>{row.allocated_district}</StyledTableCell>
                                        <StyledTableCell style={{ textAlign: 'center' }}>{row.allocated_taluka}</StyledTableCell>
                                        <StyledTableCell style={{ textAlign: 'center' }}>{row.annual_kpi}</StyledTableCell>
                                        <StyledTableCell style={{ textAlign: 'center' }}>{row.monthly_kpi}</StyledTableCell>
                                        <StyledTableCell style={{ textAlign: 'center' }}>{row.resignation_date}</StyledTableCell>
                                        <StyledTableCell style={{ textAlign: 'center' }}>{row.termination_date}</StyledTableCell>
                                        <StyledTableCell > {row.employee_status}</StyledTableCell>
                                        <StyledTableCell style={{ textAlign: 'center' }}>{row.reason}</StyledTableCell>
                                        <StyledTableCell style={{ textAlign: 'center' }}>
                                          <div style={{ position: 'relative', display: 'inline-block' }}>
                                            <IconButton 
                                              aria-controls={`user-menu-${row.id}`}
                                              aria-haspopup="true"
                                              onClick={() => handleMenuOpen(row)}>
                                              <MoreVertIcon />
                                            </IconButton>
                                            {menuVisible && selectedUser?.id === row.id && (
                                              <div
                                                style={{
                                                  position: 'absolute',
                                                  top: '90%',
                                                  right: '30px',
                                                  background: '#fff',
                                                  boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                                                  zIndex: 10,
                                                  minWidth: '150px',
                                                }}
                                              >
                                              <MenuItem onClick={handleMenuClose}>Close</MenuItem>
                                              <MenuItem ><Link href={`/add-employee?action=Update&employee_id=${row.employee_id}`} className="default-link">Edit</Link></MenuItem>
                                              <MenuItem onClick={handleUpdate}>Login User</MenuItem>
                                              <MenuItem onClick={handleDelete}>Change Password</MenuItem>
                                              <MenuItem onClick={handleEdit}>Terminate</MenuItem>
                                              <MenuItem onClick={handleUpdate}>Resigned</MenuItem>
                                              <MenuItem onClick={handleDelete}>Block</MenuItem>
                                              <MenuItem onClick={handleDelete}>On Hold</MenuItem>
                                            </div>
                                            )}
                                          </div>
                                        </StyledTableCell>
                                        <StyledTableCell style={{ textAlign: 'center' }}>{row.onboard_by}</StyledTableCell>
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